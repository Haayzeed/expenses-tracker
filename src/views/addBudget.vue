<template>
  <div class="about">
    <!-- <top-header :use="use" :logout="logout"></top-header> -->
    <!-- <sidebar></sidebar> -->
    <h3>{{user.email}}</h3>
    <button @click="logout">Sign Out</button>
    <br>
    <h3>Budget</h3>
    <p>&#8358;{{Number(sum).toLocaleString()}}</p>
    <p v-for="(to, index) in total" :key="index">&#8358;{{Number(to.new).toLocaleString()}} - {{new Date(to.date).toLocaleString()}}</p>
    <form action="">
        <input type="text" v-model="money">
        <button @click="addBudget">Add Budget</button>
    </form>
    <br>
    <!-- <main-footer></main-footer>  -->
  </div>
</template>

<script>
// import topHeader from '@/components/topHeader.vue'
// import sidebar from '@/components/sidebar.vue'
// import mainFooter from '@/components/mainFooter.vue'
import firebase from 'firebase/app'
// import firestore from 'firebase/firestore'
import 'firebase/auth'
const db = firebase.firestore();
export default {
  name: 'signup',
  // props: {
  //     logout: Function,
  //     use: Object
  //   },
  // components: {
  //     topHeader,
  //     sidebar,
  //     mainFooter
  // },
  data(){
    return{
      email: '',
      user: '',
    //   username: '',
    //   password: '',
      feedback: '',
      total: [],
      money: '',
      sum: '',
      budget: [],
      interval: null
    }
  },
  methods: {
    logout(){
        firebase.auth().signOut().then(() =>{
            this.$router.push('/')
        })
    },
    fetchdata(){
      var user = firebase.auth().currentUser;
      this.user = user;
        db.collection('users').doc(user.uid).collection('budget')
        .onSnapshot(querySnap=>{
          this.total = [];
          this.budget = [];
            querySnap.forEach(doc =>{
                let result = doc.data()
                this.budget.unshift(result.new)
                this.total.push(result)
                console.log(this.budget)
                this.sum = this.budget.reduce(function(a, b){
                return a + b;
              }, 0);
            })
        })
            
      },
        addBudget(e){
            e.preventDefault()
            var user = firebase.auth().currentUser;
            db.collection('users').doc(user.uid).collection('budget').add({
                new: parseInt(this.money),
                date: new Date().getTime()
            }).then(()=>{
                alert("added successfully")
            })
        },
    },
  mounted(){
this.fetchdata()
  }
}
</script>