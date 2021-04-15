<template>
    <div id="pokemon">
        <div>
            <b-card 
                :img-src="img"
                img-alt="Placeholder image" 
                img-top
                tag="article"
                style="max-width: 18rem;"
                header-variant="img"
                class=" mb-3"
            >
                <b-card-text id="card-text">
                            <span id="title">{{ pokemon.id }} {{ name | upper}}</span><br>
                            <div v-for="(type, index) in pokemon.type" :key="index">
                                <span> {{ type }} </span>   
                            </div>
                            <div v-on:click="getEvolution(pokemon.url)">
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
        created: function(){
            this.getPokemon();
        },
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
        props: {
            name: String, 
            url: String
        },
        filters: {
            upper: function(value){
                var newName = value[0].toUpperCase() + value.slice(1);
                return newName;
            }
        },
        computed: {
            img(){
                return this.currentImg;
            }
        },
        methods: {
            changeSprite: function() {
                if(this.isFront){
                    this.isFront = false;
                    this.currentImg = this.pokemon.back;
                }else{
                    this.isFront = true;
                    this.currentImg = this.pokemon.front;
                }
            },
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

            getEvolution: function (message) {
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