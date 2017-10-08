import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import * as firebase from 'firebase'
//import 'firebase/database'

Vue.use(VueResource);

var config = {
    apiKey: "AIzaSyBshNoPDKos9vv4nJ1dQdEMTEkrPuu6SAI",
    authDomain: "potion-vault.firebaseapp.com",
    databaseURL: "https://potion-vault.firebaseio.com",
    projectId: "potion-vault",
    storageBucket: "potion-vault.appspot.com",
    messagingSenderId: "12383245774"
};

firebase.initializeApp(config);

new Vue({
  el: '#app',
  render: h => h(App)
})
