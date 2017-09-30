<template>
        <ul class="collapsible popout" data-collapsible="accordion">
            <li v-for="(recipe, index) in recipes">
                <div class="collapsible-header" :click=""><i class="material-icons"><img src="./../assets/chemistry.png" width="32px" height="32px" alt="" /></i>{{recipe.name}}</div>
                <div class="collapsible-body">
                    <table class="bordered striped">
                        <thead>
                        <tr>
                            <th>Flavour</th>
                            <th>Percentage</th>
                            <th>Total</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="concentrate in recipe.concentrates">
                            <td>{{concentrate.concentrate}}</td>
                            <td>{{concentrate.perc}}</td>
                            <td>0</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </li>
        </ul>

</template>
<script>
    import data from '../data/recipes.json';

    export default {
        name: 'list-card',
        data() {
            return {
                title : 'list-card from title',
                recipes : data,
                activeIndex : null
            }
        },
        methods: {
            isActive(i){
                //if (this.isactive){
                    alert(i);
                    console.log(i);
                //}

            },
            setActiveIndex(i) {
                this.activeIndex = i;
            }
        },
        mounted : function(){
            var vm = this;
            $('.collapsible').collapsible({
                onOpen: function(el){
                    vm.isActive(el);
                }
            });

        }

    }
</script>