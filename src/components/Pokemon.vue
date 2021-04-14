<template>
    <div id="pokemon">

        <div style="width: 12rem;">
        <b-card 
            :img-src="img"
            img-alt="Placeholder image"
            img-top
            tag="article"
            style="max-width: 18rem;"
            header-variant="img"
            class=" mb-3"
        >
            <b-card-text >
                        <span id="title">{{ pokemon.id }} {{ name | upper}}</span><br>
                        <span> {{ pokemon.type }} </span>            
            </b-card-text>

            <div>
                <div>
                    <img src="https://img.icons8.com/fluent/48/000000/pokeball.png" style="width: 2rem" alt="Pokebola image"/> 
                </div>
                <div id="colorPokemon">
                    {{ pokemon.captureRate }}
                </div>
                <div>
                    <b-button id="changeSprite" size="sm" :style= "{ background: pokemon.color } " @click="changeSprite">Turn Pokemon</b-button>
                </div>
            </div>
        </b-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        // Presented data should contain at least: id, name, species, color, weight, type and evolution chain.
        created: function(){
            axios.get(this.url).then(res => {
                this.pokemon.type = res.data.types[0].type.name;    
                this.pokemon.front = res.data.sprites.front_default;
                this.pokemon.back = res.data.sprites.back_default;
                this.pokemon.id = res.data.id;
                axios.get(res.data.species.url).then(res => {
                    this.pokemon.captureRate = res.data.capture_rate;
                    this.pokemon.color = res.data.color.name;
                    console.log(this.pokemon.color);
                    axios.get(res.data.evolution_chain.url).then(res => {
                        this.pokemon.evolution = res.data.chain.evolves_to[0].species.name;
                        console.log('evolution', this.pokemon.evolution);
                    }).catch(error => {
                        console.log(error.response)
                    });
                })
                this.pokemon.weight = res.data.weight;
                this.currentImg = this.pokemon.front;
            })
   
        },
        data() {
            return {
                isFront: true,
                currentImg: '',
                pokemon: {
                    type: '',
                    front: '',
                    back: '',
                    id: '',
                    captureRate: '',
                    weight: '',
                    color: '',
                    evolution: '',
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
            }
        }
    }
</script>

<style>
#pokemon{
    margin-top:2%;
}

#colorPokemon{
    opacity: 0.4; 
    color: black;
    font-weight: bold;
}

#title{
    font-weight: bold;
}

#changeSprite{
    opacity: 0.7; 
    color: black;
    font-weight: bold;
}
</style>