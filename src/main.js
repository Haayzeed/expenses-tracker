import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'

import '@/assets/css/bootstrap.min.css'
import '@/assets/css/app.css'
import '@/assets/css/icons.min.css'
import '@/assets/libs/datatables/dataTables.bootstrap4.min.css'
import '@/assets/libs/datatables/responsive.bootstrap4.min.css'
import '@/assets/libs/datatables/buttons.bootstrap4.min.css'
import '@/assets/libs/datatables/select.bootstrap4.min.css'
    // <!-- <link href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />  -->
    // import '@/https://cdn.datatables.net/buttons/1.6.2/css/buttons.dataTables.min.css'
import '@/assets/libs/rwd-table/rwd-table.min.css'
    // import '@/assets/libs/dropify/css/dropify.min.css" rel="stylesheet" type="text/css" />
    // import '@/assets/libs/select2/select2.min.css" rel="stylesheet" type="text/css" />
    
    // <link href="assets/libs/bootstrap-select/bootstrap-select.min.css" rel="stylesheet" />

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
