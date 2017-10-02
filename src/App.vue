<template>
  <div id="app">
    <ul id="slide-out" class="side-nav fixed">
      <li><div class="user-view">
        <div class="background">
          <img src="./assets/summer.jpg">
        </div>
        <a href="#!user"><img class="circle" src="./assets/flask.png"></a>
        <a href="#!name"><h4 class="white-text">Potion Vault</h4></a>
      </div></li>
      <li><a class="subheader">Recipe Categories</a></li>
      <li><a href="sass.html">Fruity</a></li>
      <li><a href="badges.html">Desserts</a></li>
      <li><a href="collapsible.html">Experimental</a></li>
      <li><div class="divider"></div></li>
      <li><a class="subheader">Settings</a></li>
      <li>
        <global-setting></global-setting>
      </li>
    </ul>

    <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>

    <div class="container main">
      <div class="s12"><list-card></list-card></div>
    </div>
  </div>
</template>

<script>
    import ListCard from './components/list-card.vue';
    import RecipeCard from './components/recipe-card.vue';
    import GlobalSetting from './components/global-setting.vue';
export default {
  name: 'app',
    components : {
        ListCard,
        RecipeCard,
        GlobalSetting
    },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
  body{
    background-color: #fbf6fd;
  }
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/

}

h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}

.brand-logo {
  margin-left : 0.2em;
}

.header, .main, .footer {
  padding-left: 300px;
}

@media only screen and (max-width : 992px) {
  .header, .main, .footer {
    padding-left: 0;
  }
}
</style>
