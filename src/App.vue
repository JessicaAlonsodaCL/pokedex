<template>
  <div id="app">
    <div class="column is-half is-offset-one-quarter">
      <input class="input is-rounded" type="text" placeholder="Search pokemon by name" v-model="search">
      <!-- <button id="searchBtn" class="button is-fullwidth is-success">Normal</button> -->
      <div v-for="(poke,index) in searchResult" :key="index">
        <Pokemon :name="poke.name" :url="poke.url" :num="index+1"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Pokemon from './components/Pokemon'

export default {
  name: 'App',
  data(){
    return{
      pokemons: [],
      search: ''
    }
  },
  created: function(){
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then(res => {
      console.log("Lista de Pokemons");
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
        return this.pokemons.filter(pokemon => pokemon.name === this.search.toLowerCase());
      }
    }
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
