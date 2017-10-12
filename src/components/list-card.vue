<template>
    <div class="row">
        <div class="col s12">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">Base Recipe </span> <br/>
                    <strong>VG : {{totalVG}} ml - [ {{totalVGW}} g ]</strong> <br/>
                    <strong>PG : {{totalPG}} ml - [ {{totalPGW}} g ]</strong> <br/>
                    <strong>Flavour : {{totalFlavour}} ml - [ {{totalFlavourW}} g ]</strong> <br/>
                    <strong>Nicotine : {{TotalNicotine}} ml - [ {{TotalNicotineW}} g ]</strong> <br/>
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
                            <th>g</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="concentrate in recipe.concentrates">
                            <td>{{concentrate.concentrate}}</td>
                            <td>{{concentrate.perc}}</td>
                            <td>{{concentrate.total}} ml</td>
                            <td>{{concentrate.weight}} g</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </li>
        </ul>
        </div>
        <!-- Modal Structure -->
        <div id="modal1" class="modal modal-fixed-footer">
            <div class="modal-content">
                <add-new-recipe :count="rawData"></add-new-recipe>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Save</a>
            </div>
        </div>
    </div>
</template>
<script>
    //import data from '../data/recipes.json';
    import * as RecipeFormula from '../services/RecipeFormulas';
    import { SettingEvents,RecipeEvents } from '../Events';
    import * as firebase from 'firebase'
    import AddNewRecipe from './add-new-recipe.vue';

    export default {
        name: 'list-card',
        components: { AddNewRecipe },
        data() {
            return {
                title : 'list-card from title',
                recipes : [],
                rawData : [],
                activeIndex : null,
                nicotineStrength:0,
                nicotineTarget : 0,
                batchTotal : 0,
                TotalNicotine : 0,
                totalPG : 0,
                totalVG : 0,
                totalFlavour : 0,
                totalPGW : 0,
                totalVGW : 0,
                totalFlavourW : 0,
                TotalNicotineW : 0
            }
        },
        methods: {
            onSettingsUpdated(nicS, nicT, bSize){
                const batchSize = bSize;
                const vm = this;
                vm.recipes = [];
                //vm.rawData = ;
                vm.rawData.forEach(function(recipe, index){
                    vm.recipes.push({"name" : recipe.name,
                        "credit" : recipe.credit,
                        "favourite" : recipe.favourite,
                        "category": recipe.category,
                        "concentrates" : []});

                    recipe.concentrates.forEach(function(c, i){
                        let perc = recipe.concentrates[i].perc;
                        let total = RecipeFormula.GetConcentrates(perc, batchSize);
                        let con = {
                            "concentrate" : c.concentrate,
                            "perc" : c.perc,
                            "total" : total,
                            "weight": RecipeFormula.GetConcentratesW(total).toFixed(2)
                        };
                        vm.recipes[index].concentrates.push(con);
                        //console.log(con);
                        //console.log('Total : '+RecipeFormula.GetConcentrates(perc, batchSize));
                    });
                });
            },
            getSelectedRecipe(el){
                const index = el.index();
                //alert(el);

                let totalFlavour = 0;

                this.recipes[index].concentrates.forEach(function(item){
                      //console.log(item);
                    if (item.total > 0)
                      totalFlavour += Number(item.total);
                });

                //console.log(vg);
                let pg = RecipeFormula.GetTotalBaseVgOrPg(this.batchTotal, 20);
                let vg = RecipeFormula.GetTotalBaseVgOrPg(this.batchTotal, 80);

                let totalpg = pg - (Number(this.TotalNicotine) + totalFlavour);
                if (totalpg < 0)
                {
                    pg = RecipeFormula.GetTotalBaseVgOrPg(this.batchTotal, 30);
                    vg = RecipeFormula.GetTotalBaseVgOrPg(this.batchTotal, 70);
                    totalpg = pg - (Number(this.TotalNicotine) + totalFlavour);
                }

                this.totalVGW = RecipeFormula.GetTotalBaseVgW(vg).toFixed(2);
                this.totalPGW = RecipeFormula.GetTotalBasePgW(totalpg).toFixed(2);
                this.totalFlavour =  totalFlavour.toFixed(2);
                this.totalPG =  totalpg.toFixed(2);
                this.totalVG = vg;
                this.TotalNicotineW = RecipeFormula.GetNicotineW(this.TotalNicotine);
                this.totalFlavourW = RecipeFormula.GetConcentratesW(totalFlavour);
            },
            getData(){
              const vm = this;
              firebase.database().ref().once('value').then((snapshot) => {
                  console.log(snapshot.val());
                  const res = snapshot.val();
                  res.forEach(function(r){
                      vm.rawData.push(r);
                  });

                  vm.onSettingsUpdated(0, 0, 0);
                  //console.log(snapshot.val());
              });

            },
//            save(){
//                firebase.database().ref().set({
//                    "name" : "Blue Voodoo",
//                    "credit" : "http://url.com",
//                    "favourite" : false,
//                    "category": "fruity",
//                    "concentrates" : [
//                    {
//                        "concentrate" : "TFA Juicy Peach",
//                        "perc" : "10",
//                        "total" : 0
//                    },
//                    {
//                        "concentrate" : "TFA Raspberry Sweet",
//                        "perc" : "5",
//                        "total" : 0
//                    },
//                    {
//                        "concentrate" : "Sweetner",
//                        "perc" : "2",
//                        "total" : 0
//                    }
//                ]
//            });
//            }
        },
        mounted : function(){
            const vm = this;
            vm.getData();

            $('.modal').modal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 200, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '10%',
                complete : function(){
                    RecipeEvents.SaveRecipes(null);
                }
            });
            SettingEvents.$on('settings-update', (nicotineStrength, targetStrength, batchSize) => {
                vm.batchTotal = batchSize;
                vm.nicotineStrength = nicotineStrength;
                vm.nicotineTarget = targetStrength;
                vm.TotalNicotine = RecipeFormula.GetNicotine(nicotineStrength, targetStrength, batchSize);
                vm.onSettingsUpdated(nicotineStrength, targetStrength, batchSize);

                $('.collapsible').collapsible({
                    onOpen: function(el){
                       // alert(el.index());
                        vm.getSelectedRecipe(el);
                    }
                });

            });
        }

    }
</script>