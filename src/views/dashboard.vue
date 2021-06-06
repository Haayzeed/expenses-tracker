<template>
  <div class="dashboard">
      <top-header></top-header>
      <sidebar></sidebar>
      <div class="content-page">
        <div class="content">
            <!-- Start Content-->
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div>
                            <h4 class="page-title">Dashboard</h4>
                        </div>
                    </div>
                </div>     
                <!-- end page title --> 
                <div class="row">
                    <div class="col-xl-4">
                        <div class="card-box">
                            <div class="float-left">
                                <i class="dripicons-user"></i>
                            </div>
                            <div class="widget-chart-one-content text-right" style="">
                                <p class=" mb-0 mt-2">Budget</p>
                                <h3 class="">&#8358;{{Number(sum).toLocaleString()}}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4">
                        <div class="card-box">
                            <div class="float-left">
                                <i class="dripicons-user"></i>
                            </div>
                            <div class="widget-chart-one-content text-right" style="">
                                <p class=" mb-0 mt-2">Expenses</p>
                                <h3 class="">&#8358;{{Number(expensesSum).toLocaleString()}}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4">
                        <div class="card-box">
                            <div class="float-left">
                                <i class="dripicons-user"></i>
                            </div>
                            <div class="widget-chart-one-content text-right" style="">
                                <p class=" mb-0 mt-2">Balance</p>
                                <h3 class="">&#8358;{{Number(this.sum - this.expensesSum).toLocaleString()}}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- container -->
        </div> <!-- content -->
  <main-footer></main-footer>

    </div>
    <h1>{{use.email}}</h1>
    <button @click="logout">Sign Out</button>
    <br>
    <!-- <p v-for="(tot, index) in totals" :key="index">&#8358;{{Number(tot.new).toLocaleString()}}-({{tot.category}})-{{new Date(tot.date).toLocaleString()}}</p> -->

  </div>
</template>

<script>
import topHeader from '@/components/topHeader.vue'
import sidebar from '@/components/sidebar.vue'
import mainFooter from '@/components/mainFooter.vue'
import firebase from 'firebase/app'
import 'firebase/auth'
const db = firebase.firestore();
export default {
  name: 'signup',
  components: {
      topHeader,
      sidebar,
      mainFooter
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
    }
}
</script>

<style scoped lang="scss">

</style>