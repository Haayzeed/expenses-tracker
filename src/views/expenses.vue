<template>
  <div class="about">
    <top-header></top-header>
      <sidebar></sidebar>
    <h1>{{use.email}}</h1>
    <button @click="logout">Sign Out</button>
    <br>
    <h3>Budget</h3>
    <p>&#8358;{{Number(sum).toLocaleString()}}</p>
  
    <br>
    <form>
      <select name="" id="" v-model="cat">
        <option value="">--Select category--</option>
        <option value="Food">Food</option>
        <option value="Cloth">Cloth</option>
        <option value="Transport">Transport</option>

      </select>
      <input type="text" v-model="expenses">
      <button @click="addExpenses">Add Expenses</button>
    </form>
    <br>
    <p>All category</p>
    <form action="">
        <input type="text" v-model="category">
        <button @click="addCategory">Add Category</button>
    </form>
    <hr>
    <h2>All budgets</h2>
    <p>&#8358;{{Number(expensesSum).toLocaleString()}}</p>
    <p v-for="(tot, index) in totals" :key="index">&#8358;{{Number(tot.new).toLocaleString()}}-({{tot.category}})-{{new Date(tot.date).toLocaleString()}}</p>


    <br><br>
    <h2>Balance: &#8358;{{Number(this.sum - this.expensesSum).toLocaleString()}}</h2>
  </div>
</template>

<script>
import topHeader from '@/components/topHeader.vue'
import sidebar from '@/components/sidebar.vue'
import firebase from 'firebase/app'
// import firestore from 'firebase/firestore'
import 'firebase/auth'
const db = firebase.firestore();
export default {
  name: 'signup',
  components: {
    topHeader,
      sidebar
  },
  data(){
    return{
      email: '',
      username: '',
      password: '',
      feedback: '',
      total: [],
      money: '',
      sum: '',
      me: [],
      use:'',
      category: '',
      expenses: '',
      expensesSum: [],
      mee: [],
      totals: [],
      cat: '',
      interval: null
    }
  },
  methods: {
    logout(){
    firebase.auth().signOut().then(() =>{
      this.$router.push('/')
    })
    //   if(this.username){
    //       db.collection('users').doc(this.username).get().then(doc =>{
    //           if(doc.exists){
    //               this.feedback = "this username already exist"
    //           }
    //           else{
    //               this.feedback = "it doesnt exit"
    //           }
    //       })
    //   }
    //   else{
    //       this.feedback = "You must enter a username"
    //   }
    },
    fetchdata(){
      var user = firebase.auth().currentUser;
      this.use = user;
        db.collection('users').doc(user.uid).collection('budget').get()
        .then(acc=>{
            acc.forEach(doc =>{
                let tt = doc.data()
                this.me.push(tt.new)
                this.total.push(tt)
                console.log(this.me)
                this.sum = this.me.reduce(function(a, b){
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
                location.reload()
            })
        },
        addExpenses(e){
            e.preventDefault()
            var user = firebase.auth().currentUser;
            db.collection('users').doc(user.uid).collection('expenses').add({
                new: parseInt(this.expenses),
                date: new Date().getTime(),
                category: this.cat
            }).then(()=>{
                alert("added successfully")
                location.reload()
            })
        },
        addCategory(e){
            e.preventDefault()
            var user = firebase.auth().currentUser;
            db.collection('users').doc(user.uid).collection('category').add({
                name: this.category,
                id: this.category.length - 1
                // date: new Date().getTime()
            }).then(()=>{
                alert("added successfully")
                // console.log()
            })
        },
      // fetch expenses
        fetchExpenses(){
      var user = firebase.auth().currentUser;
      this.use = user;
        db.collection('users').doc(user.uid).collection('expenses').get()
        .then(acc1=>{
            acc1.forEach(doc =>{
                let ttw = doc.data()
                this.mee.push(ttw.new)
                this.totals.push(ttw)
                console.log(this.totals)
                this.expensesSum = this.mee.reduce(function(a, b){
                return a + b;
              }, 0);
              console.log(this.mee)
            })
        })
            
      },
  },
  mounted(){
      this.fetchdata()
      this.fetchExpenses()
        var user = firebase.auth().currentUser;
       db.collection('users').doc(user.uid).get().then(response =>{
         console.log(response)
       })
  }
}
</script>