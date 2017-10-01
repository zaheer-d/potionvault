<template>
    <div class="row">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <input placeholder="Total (10ml - 100ml)" v-model="batchSize" id="volume" type="text" class="validate">
                    <label for="volume">Batch Size</label>
                </div>
            </div>

                <div class="row">
                <div class="input-field col s12">
                    <select v-model="nicotineStrength">
                        <option value="0" disabled selected>Choose your option</option>
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
              nicotineStrength : '36'
          }
        },
        methods:{
          updateSettings(){
              console.log('Using bus/click to send event settings update');
//              SettingEvents.nicotineStrength = this.nicotineStrength;
//              SettingEvents.nicotineTarget = this.nicotineTarget;
//              SettingEvents.batchSize = this.batchSize;
              SettingEvents.SettingsUpdated(this.nicotineStrength,this.nicotineTarget,this.batchSize);
          }
        },
        mounted:function() {
            $('select').material_select();
        }
    }
</script>