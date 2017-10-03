<template>
    <div class="row">
        <form class="col s12">
            <!--<div class="row">-->
                <!--<div class="col s4"><p>-->
                    <!--<input name="group1" type="radio" id="test1" />-->
                    <!--<label for="test1">80/20</label>-->
                <!--</p></div>-->
                <!--<div class="col s4"><p>-->
                    <!--<input name="group1" type="radio" id="test2" />-->
                    <!--<label for="test2">70/30</label>-->
                <!--</p></div>-->
                <!--<div class="col s4"><p>-->
                    <!--<input name="group1" type="radio" id="test3" />-->
                    <!--<label for="test3">50/50</label>-->
                <!--</p></div>-->
            <!--</div>-->
            <div class="row">
                <div class="input-field col s12">
                    <input placeholder="Total (10ml - 100ml)" v-model="batchSize" id="volume" type="text" class="validate">
                    <label for="volume">Batch Size</label>
                </div>
            </div>

                <div class="row">
                <div class="input-field col s12">
                    <select name="strength" v-model="nicotineStrength"  @change="updateValue($event.target.value)">
                        <option value="0" disabled selected>Choose nicotine strength</option>
                        <option value="24">24 g/ml</option>
                        <option value="36">36 g/ml</option>
                        <option value="48">48 g/ml</option>
                    </select>
                    <label>Nicotine Base</label>
                </div>
                </div>

                <div class="row">
                <div class="input-field col s12">
                    <input placeholder="Target Strength (2ml)" id="target_strength" type="text" class="validate" v-model="nicotineTarget">
                    <label for="target_strength">Target Strength</label>
                </div>
                    </div>
        </form>
        <div class="row">
            <div class="col s12">
               <a class="waves-effect amber darker-1 waves-light btn right" @click="updateSettings">Update</a>
            </div>
        </div>
    </div>
</template>
<script>
    import { SettingEvents } from '../Events';
    export default {
        data(){
          return {
              batchSize : 100,
              nicotineTarget : 2,
              nicotineStrength : ''
          }
        },
        methods:{

          updateValue(value){
              this.nicotineStrength = value;
          },

          updateSettings(){
              console.log('Using bus/click to send event settings update');
              SettingEvents.SettingsUpdated(this.nicotineStrength,this.nicotineTarget,this.batchSize);
          }
        },
        mounted:function() {
            const vm = this;

            $('select').material_select();

            $('select').change((event)=>{
                vm.updateValue(event.target.value);
            })

        }
    }
</script>