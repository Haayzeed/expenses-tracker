<template>
  <div class="about">
    <top-header></top-header>
      <sidebar></sidebar>
        <div class="content-section budget">
            <h3 class="total">Total Expenses: &#8358;{{Number(expensesSum).toLocaleString()}}</h3>
            <div class="budget-tab">
                <div class="add-budget card">
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
                <div class="budget-table card">
                    <h4 class="header-title">Modify Expenses</h4>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Category</th>
                                <td>Amount</td>
                                <!-- <td>Date/Time</td> -->
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(tot, index) in totals" :key="index">
                                <td>{{index+1}}</td>
                                <td>{{tot.category}}</td>
                                <td>&#8358;{{Number(tot.money).toLocaleString()}}</td>
                                <!-- <td>{{new Date(tot.date).toLocaleString()}}</td> -->
                                <td> <button class="btn btn-danger" @click="deleteExpenses(tot.id)">Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import topHeader from '@/components/topHeader.vue'
import sidebar from '@/components/sidebar.vue'
import firebase from 'firebase/app'
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
        total: [],
        money: null,
        sum: '',
        category: '',
        expenses: '',
        totals: [],
        cat: '',
        expensesSum: '',
        userId: firebase.auth().currentUser.uid
    }
  },
  methods: {
    addExpenses(e){
        e.preventDefault()
        let convert = Number(this.expenses).toFixed(2);
        if(this.expenses){
            db.collection('expenses').add({
                money: Number(convert),
                date: new Date().getTime(),
                category: this.cat,
                userId: this.userId
            }).then(()=>{
                alert("added successfully")
            })
            this.expenses = ''
        }
        else{
            alert("check input field")
        }
    },
      // fetch expenses
    fetchExpenses(){
        db.collection('expenses').where('userId', '==', this.userId).onSnapshot(acc1=>{
            this.totals = [];
            this.totalExpenses = []
            acc1.forEach(doc =>{
                let result = doc.data()
                this.totals.push(result)
                result.id = doc.id
                this.totalExpenses.unshift(result.money)
                this.expensesSum = this.totalExpenses.reduce(function(a, b){
                return a + b;
              }, 0);
            })
        })
    },
    deleteExpenses(id){
        db.collection('expenses').doc(id).delete().then(()=>{
            this.totals = this.totals.filter(total =>{
                return total.id != id;
            });
        })
    }
  },
  mounted(){
        this.fetchExpenses()
    }
}
</script>
<style lang="scss">
form{
    display: flex;
    flex-direction: column;
    .form-control {
        width: 100%;
        height: 40px;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 3px;
        border: 1px solid var(--dark-blue);
    }
    button{
        background: var(--dark-blue);
        border: none;
        color: var(--primary);
        height: 40px;
        width: 100%;
        border-radius: 3px;
    }
}
</style>