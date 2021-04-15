<template>
    <div id="pokemon">
        <div>
            <b-card 
                :img-src="img"
                img-alt="Pokemon image" 
                img-top
                tag="article"
                style="max-width: 18rem;"
                header-variant="img"
                class=" mb-3"
            >
                <b-card-text id="card-text">
                            <!-- filter used when displaying the name of the pokemon -->
                            <span id="title">{{ pokemon.id }} {{ name | upper}}</span><br>
                            <div v-for="(type, index) in pokemon.type" :key="index">
                                <span> {{ type }} </span>   
                            </div>
                            <div v-on:click="emitEvolutionData(pokemon.url)">
                                <img src="https://img.icons8.com/bubbles/50/000000/info.png" style="width: 2rem" alt="Info Pokemon"/>
                            </div>
                </b-card-text>
                <div class="col"> 
                    <div class="row">
                        <div class="col">
                            <div>
                                <img src="https://img.icons8.com/fluent/48/000000/pokeball.png" style="width: 1rem" alt="Pokebola image"/> 
                            </div>
                            <div id="colorPokemon">
                                {{ pokemon.captureRate }}%
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <img src="https://img.icons8.com/cotton/50/000000/weight-1--v1.png" style="width: 1rem" alt="Weight Pokemon"/>
                            </div>
                            <div id="colorPokemon">
                                {{ pokemon.weight }}
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                    <div class="row">
                            <b-button id="changeSprite" size="sm" :style= "{ background: pokemon.color } " @click="changeSprite">{{ $t('main.turnPokemon')}}</b-button>
                    </div>
                </div>
            </b-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import EventBus from './utils/eventBus'

    export default {
        // method called whenever the component is created inside an html page
        created: function(){
            this.getPokemon();
        },
        // data() is a function so that each instance can maintain an independent copy of the returned object data.
        data() {
            return {
                isFront: true,
                currentImg: '',
                dataPokemonType: {},
                pokemon: {
                    type: [],
                    front: '',
                    back: '',
                    id: '',
                    captureRate: '',
                    weight: '',
                    color: '',
                    evolution: '',
                    url: ''
                }
            }
        },
        //declared type of props received by data binding
        props: {
            name: String, 
            url: String
        },
        // function that filters the Pokémon name and changes the first letter in the string to uppercase
        filters: {
            upper: function(value){
                var newName = value[0].toUpperCase() + value.slice(1);
                return newName;
            }
        },
        //computed properties define a property that is used the same way as data , but can also have some custom logic that is cached based on its dependencies.
        computed: {
            img(){
                return this.currentImg;
            }
        },
        methods: {
            //changes the pokemon's display image, fonr 
            changeSprite: function() {
                if(this.isFront){
                    this.isFront = false;
                    this.currentImg = this.pokemon.back;
                }else{
                    this.isFront = true;
                    this.currentImg = this.pokemon.front;
                }
            },
            // request pokemon api
            getPokemon: function() {
                axios.get(this.url).then(res => {
                    this.dataPokemonType = res.data.types;    
                    this.dataPokemonType.map(data => {
                        this.pokemon.type.push(data.type.name);
                    });
                    this.pokemon.front = res.data.sprites.front_default;
                    this.pokemon.back = res.data.sprites.back_default;
                    this.pokemon.id = res.data.id;
                    this.pokemon.weight = res.data.weight;
                    this.currentImg = this.pokemon.front;
                    axios.get(res.data.species.url).then(res => {
                        this.pokemon.captureRate = res.data.capture_rate;
                        this.pokemon.color = res.data.color.name;
                        this.pokemon.url = res.data.evolution_chain.url;
                    })
                }).catch(error => {
                    console.log(error.response);
                })
            },
            //emit value for another component to hear
            emitEvolutionData: function (message) {
                EventBus.$emit('pokemon', message);
            }
        }
    }
</script>

<style>
#pokemon{
    margin-top: 0.4rem;
    width: 12rem; 
    margin-left: 0.6rem;
}

#colorPokemon{
    opacity: 0.4; 
    color: black;
    font-weight: bold;
    font-size: 0.7rem;
}

#title{
    font-weight: bold;
}

#changeSprite{
    opacity: 0.7; 
    color: black;
    font-weight: bold;
}

#card-text{
    height: 6rem;
}
</style>