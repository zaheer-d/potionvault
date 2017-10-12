<template>
    <div class="row">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <input placeholder="Placeholder" id="recipe_name" v-model="recipeName" type="text" class="validate">
                    <label for="recipe_name">Recipe Name</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="concentrate" v-model="flavour" type="text" class="validate">
                    <label for="concentrate">Flavour</label>
                </div>
                <div class="input-field col s6">
                    <input id="percent" type="text" v-model="percent" class="validate">
                    <label for="percent">Percent</label>
                </div>
            </div>
            <div class="row">
                <div class="col s12">
                    <a class="waves-effect amber darker-1 waves-light btn right" @click="updateRecipes">Add Recipe</a>
                </div>
            </div>
            <div class="row">
                <div class="col s12">
                    <table class="bordered striped">
                        <thead>
                        <tr>
                            <th>Flavour</th>
                            <th>%</th>
                        </tr>
                        </thead>
                       <tbody>
                        <tr v-for="c in recipes">
                            <td>{{c.concentrate}}</td>
                            <td>{{c.perc}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    import { RecipeEvents } from '../Events';
    import * as firebase from 'firebase';
    export default{
        props: ['count'],
        data() {
            return {
                 recipeName: '',
                 flavour: '',
                 percent: '',
                 recipes: []
            }
        },
        methods: {
           updateRecipes() {
               this.recipes.push({
                   recipeName: this.recipeName,
                   concentrate: this.flavour,
                   perc: this.percent
               });
           },
           saveRecipes(){
               const vm = this;

               firebase.database().ref(`/${vm.count.length}`).set({
                   "name" : vm.recipeName,
                   "credit" : "http://url.com",
                   "favourite" : false,
                   "category": "fruity",
                   "concentrates" : vm.recipes
               });
               this.recipes = [];
               this.recipeName = '';
           }
        },
        mounted: function() {
            const vm = this;
            RecipeEvents.$on('save-recipe', () => {
                if (vm.recipeName === '') return;
                vm.saveRecipes();
                alert('saved');
            });
            console.log('count--->',this.count.length);
        }

    }
</script>
<style scoped>

</style>