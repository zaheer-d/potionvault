import Vue from 'vue';

export const SettingEvents =new Vue({
  data(){
      return {
          nicotineStrength : 0,
          targetStrength : 0,
          batchSize : 0
      }
  },
    methods:{
      SettingsUpdated(nicotineStrength, targetStrength, batchSize){
          console.log('B='+nicotineStrength+' T'+targetStrength+' V'+batchSize);
          this.$emit('settings-update', nicotineStrength, targetStrength, batchSize);
          console.log('Emmitting event settings update');
      }
    }
});