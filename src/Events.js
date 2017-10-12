import Vue from 'vue';

export const SettingEvents = new Vue({
    methods: {
       SettingsUpdated(nicotineStrength, targetStrength, batchSize){
          this.$emit('settings-update', nicotineStrength, targetStrength, batchSize);
      }
    }
});

export const RecipeEvents = new Vue({
    methods:{
        SaveRecipes(recipes){
            this.$emit('save-recipe', recipes);
        }
    }
});