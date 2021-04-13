<template>
    <div id="pokemon">
        <h1></h1>
        <div class="card">
            <div class="card-image">
                <figure>
                <img :src="currentImg" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                <div class="media-left">
                </div>
                <div class="media-content">
                    <p class="title is-4">{{ num }} {{ name | upper}}</p>
                    <p class="subtitle is-6"> {{ pokemon.type }} </p>
                </div>
                </div>

                <div class="content">
                    <button class="button is-medium is-fullwidth" @click="changeSprite">Virar Pokemon</button>
                </div>
            </div>
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
                axios.get(res.data.species.url).then(res => {
                    this.pokemon.captureRate = res.data.capture_rate;
                    this.pokemon.color = res.data.color;
                    axios.get(res.data.evolution_chain.url).then(res => {
                        this.pokemon.evolution = res.data.chain.evolves_to[0].species.name;
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
                    captureRate: '',
                    weight: '',
                    color: '',
                    evolution: '',
                }
            }
        },
        props: {
            num: Number,
            name: String, 
            url: String
        },
        filters: {
            upper: function(value){
                var newName = value[0].toUpperCase() + value.slice(1);
                return newName;
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
</style>