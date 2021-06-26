<template>
  <div class="about">
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
                        <h4 class="page-title">School</h4>
                    </div>
                </div>
            </div>     
            <!-- end page title --> 
            <div class="row">
                <div class="col-md-4">
                    <div class="card-box">
                        <div class="row">
                            <div class="col-md-12">
                                <h4 class="header-title">Add Expenses</h4>
                                <form class="">
                                    <div class="form-group">
                                        <select name="" id="" class="form-control" v-model="cat">
                                            <option value="">--Select category--</option>
                                            <option value="Food">Food</option>
                                            <option value="Cloth">Cloth</option>
                                            <option value="Transport">Transport</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <input type="number" class="form-control" placeholder="Expenses" v-model="expenses">
                                    </div>
                                    <div class="form-group">
                                        <button class="btn btn-block btn-dark" @click="addExpenses">Add Expenses</button>
                                    </div>
                                </form> 
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card-box">
                        <h4 class="header-title">Modify School</h4>
                        <table id="datatable" class="table table-bordered nowrap">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Category</th>
                                    <td>Amount</td>
                                    <td>Date/Time</td>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(tot, index) in totals" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{tot.category}}</td>
                                    <td>&#8358;{{Number(tot.new).toLocaleString()}}</td>
                                    <td>{{new Date(tot.date).toLocaleString()}}</td>
                                    <td> <a href="" class="btn btn-danger">Delete</a></td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div> <!-- end card-box -->
</div>
  </div>
</template>

<script>
import topHeader from '@/components/topHeader.vue'
import sidebar from '@/components/sidebar.vue'
import firebase from 'firebase/app'
import JQuery from 'jquery'
// import '@/assets/libs/datatables/jquery.dataTables.min.js'
//         import '@/assets/libs/datatables/dataTables.bootstrap4.min.js'
//         import '@/assets/libs/datatables/dataTables.responsive.min.js'
//         import '@/assets/libs/datatables/responsive.bootstrap4.min.js'
//         import '@/assets/libs/datatables/dataTables.buttons.min.js'
//         import '@/assets/libs/datatables/buttons.bootstrap4.min.js'
//         import '@/assets/libs/datatables/buttons.html5.min.js'
//         import '@/assets/libs/datatables/buttons.flash.min.js'
//         import '@/assets/libs/datatables/dataTables.keyTable.min.js'
//         import '@/assets/libs/datatables/dataTables.select.min.js'
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
    JQuery('#datatable').dataTable();
  }
}
</script>