<template>
    <div class="row">
        <div class="col s12">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">Base Recipe </span>
                    <strong>VG : {{totalVG}} ml</strong>
                    <strong>PG : {{totalPG}} ml</strong>
                    <strong>Nicotine : {{TotalNicotine}} ml</strong> <br/>
                    <strong>Strength : {{nicotineStrength}} g/ml</strong>
                </div>
                <!--<div class="card-action">-->
                    <!--<a href="#">This is a link</a>-->
                    <!--<a href="#">This is a link</a>-->
                <!--</div>-->
            </div>

    <br>
        <ul class="collapsible" data-collapsible="accordion">
            <li v-for="(recipe, index) in recipes">
                <div class="collapsible-header"><i class="material-icons"><img src="./../assets/chemistry.png" width="32px" height="32px" alt="" /></i>{{recipe.name}}</div>
                <div class="collapsible-body">
                    <table class="bordered striped">
                        <thead>
                        <tr>
                            <th>Flavour</th>
                            <th>%</th>
                            <th>ml</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="concentrate in recipe.concentrates">
                            <td>{{concentrate.concentrate}}</td>
                            <td>{{concentrate.perc}}</td>
                            <td>{{concentrate.total}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </li>
        </ul>
        </div>
    </div>
</template>
<script>
    import data from '../data/recipes.json';
    import * as RecipeFormula from '../services/RecipeFormulas';
    import { SettingEvents } from '../Events';

    export default {
        name: 'list-card',
        data() {
            return {
                title : 'list-card from title',
                recipes : [],
                activeIndex : null,
                nicotineStrength:0,
                nicotineTarget : 0,
                batchTotal : 0,
                TotalNicotine : 0
            }
        },
        methods: {
            onSettingsUpdated(nicS, nicT, bSize){
                const batchSize = bSize;
                const vm = this;
                vm.recipes = [];
                data.forEach(function(recipe, index){
                    vm.recipes.push({"name" : recipe.name,
                        "credit" : recipe.credit,
                        "favourite" : recipe.favourite,
                        "category": recipe.category,
                        "concentrates" : []});

                    data[index].concentrates.forEach(function(c, i){
                        let perc = data[index].concentrates[i].perc;
                        let total = RecipeFormula.GetConcentrates(perc, batchSize);
                        let con = {
                            "concentrate" : c.concentrate,
                            "perc" : c.perc,
                            "total" : total +" ml"
                        };
                        vm.recipes[index].concentrates.push(con);
                        console.log(con);
                        console.log('Total : '+RecipeFormula.GetConcentrates(perc, batchSize));
                    });
                });
            },

            isActive(el){
                alert(el);
            }
        },
        mounted : function(){
            var vm = this;

            $('.collapsible').collapsible({
                onOpen: function(el){
                    vm.isActive(el);
                }
            });

            SettingEvents.$on('settings-update', (nicotineStrength, targetStrength, batchSize) => {
                vm.batchTotal = batchSize;
                vm.nicotineStrength = nicotineStrength;
                vm.nicotineTarget = targetStrength;
                var nic = RecipeFormula.GetNicotine(nicotineStrength, targetStrength, batchSize);
                vm.TotalNicotine = nic;
                vm.onSettingsUpdated(nicotineStrength, targetStrength, batchSize);
            });
            //const batchSize = vm.batchTotal;
            vm.onSettingsUpdated(0, 0, 0);
        }

    }
</script>