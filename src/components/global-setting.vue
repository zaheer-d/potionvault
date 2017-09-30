<template>
    <div class="row">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <input placeholder="Total (10ml - 100ml)" id="volume" type="text" class="validate">
                    <label for="volume">Batch Size</label>
                </div>
            </div>

                <div class="row">
                <div class="input-field col s12">
                    <select>
                        <option value="" disabled selected>Choose your option</option>
                        <option value="1">24 g/ml</option>
                        <option value="2">36 g/ml</option>
                        <option value="3">48 g/ml</option>
                    </select>
                    <label>Nicotine Base</label>
                </div>
                </div>

                <div class="row">
                <div class="input-field col s12">
                    <input placeholder="Target Strength (2ml)" id="target_strength" type="text" class="validate">
                    <label for="target_strength">Target Strength</label>
                </div>
                    </div>
        </form>

    </div>
</template>
<script>
    export default {
        data(){
          return {
            title: 'test'
          }
        },
        mounted:function() {
            $('select').material_select();
        }
    }
</script>