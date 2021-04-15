<template>
  <div id="app">
    <div>
      <p>{{ $t('main.welcome', {company: 'Pokedex'}) }}</p>
      <div>
        <b-form-input id="input-small" size="sm" type="text" placeholder="Search pokemon by name" v-model="search"></b-form-input>
        <div class="mt-2 mb-4"> {{ $t('main.pokemon')}} "{{ search }}"</div>
        <div v-if="this.infoPokemon">
          <b-modal v-model="infoPokemon">{{ $t('main.evolutionChain')}} {{ evolution.firstEvolution }} {{ evolution.secondEvolution }} {{ evolution.thirdEvolution }} </b-modal>
        </div>
      </div>
      <b-card-group deck>
        <div v-for="poke in searchResult" :key="poke.url">
          <Pokemon :name="poke.name" :url="poke.url"/>
        </div>
    </b-card-group>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import Pokemon from './components/Pokemon'
import EventBus from '../src/components/utils/eventBus'


export default {
  name: 'App',
  data(){
    return{
      pokemons: [],
      search: '',
      modal: '',
      evolution: {
        firstEvolution: '',
        secondEvolution: '',
        thirdEvolution: ''
      },
      infoPokemon: false
    }
  },
  created: function(){
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then(res => {
      console.log("List of Pokemons");
      this.pokemons = res.data.results;
    })
  },
  components: {
    Pokemon
  },
  computed: {
    searchResult: function(){
      if(this.search == '' || this.search == ''){
        return this.pokemons; 
      }else{
        return this.pokemons.filter(pokemon => pokemon.name.includes(this.search.toLowerCase()));
      }
    }
  },
  mounted(){
    EventBus.$on('pokemon', (value) => { 
      axios.get(value).then(res => {
          if(this.evolution.firstEvolution !== undefined){
            this.evolution.firstEvolution =  ''
            this.evolution.secondEvolution =  ''
            this.evolution.thirdEvolution = ''
          }
          this.infoPokemon = true;
          this.evolution.firstEvolution = res.data.chain.species.name;
          this.evolution.secondEvolution = res.data.chain.evolves_to[0].species.name;
          this.evolution.thirdEvolution = res.data.chain.evolves_to[0].evolves_to[0].species.name;

      }).catch(error => {
        console.log(error.response);
      });
    })
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#searchBtn{
  margin-top: 2%;
}
</style>
