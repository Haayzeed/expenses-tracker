<template>
    <div class="about">
        <top-header></top-header>
        <sidebar></sidebar>
        <div class="content-section budget">
            <h3 class="total">Total Budget: &#8358;{{new Intl.NumberFormat().format(sum)}}</h3>
            <div class="budget-tab">
                <div class="add-budget">
                    <h3>Add Budget</h3>
                    <form action="">
                        <input type="text" v-model="money">
                        <button @click="addBudget">Add Budget</button>
                    </form>
                </div>
                <div class="budget-table">
                    <table>
                        <tr>
                            <th>S/N</th>
                            <th>Amount</th>
                            <th>Date/Time</th>
                            <th>Action</th>
                        </tr>
                        <tr v-for="(to, index) in total" :key="index">
                            <td>{{index+1}}</td>
                            <td>&#8358;{{new Intl.NumberFormat().format(to.money)}}</td>
                            <td>{{new Date(to.date).toLocaleString()}}</td>
                            <td><button>Delete</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <main-footer></main-footer> 
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
      feedback: '',
      total: [],
      money: '',
      sum: '',
      budget: [],
    }
  },
  methods: {
    fetchdata(){
      var user = firebase.auth().currentUser;
      this.user = user;
        db.collection('users').doc(user.uid).collection('budget')
        .onSnapshot(querySnap=>{
          this.total = [];
          this.budget = [];
            querySnap.forEach(doc =>{
                let result = doc.data()
                this.budget.unshift(result.money)
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
            if(this.money){
                db.collection('users').doc(user.uid).collection('budget').add({
                    money: Number(this.money),
                    date: Date.now()
                }).then(()=>{
                    alert("added successfully")
                })
                this.money = ''
            }
            else{
                alert("check input field")
            }
        },
    },
    mounted(){
        this.fetchdata()
    }
}
</script>
<style lang="scss" scoped>
    .budget{
        padding: 20px;
        display: flex;
        flex-direction: column;
        background: var(--primary);
        h3.total{
            align-self: flex-end;
        }
        .budget-tab{
            display: flex;
            margin-top: 30px;
        }
        .add-budget{
            width: 40%;
            padding: 20px;
            form{
                display: flex;
                flex-direction: column;
                input{
                    width: 100%;
                    height: 40px;
                    margin: 10px 0;
                    padding: 14px;
                }
                button{
                    background: var(--dark-blue);
                    border: none;
                    color: var(--primary);
                    height: 40px;
                }
            }
        }
        .budget-table{
            width: 60%;
            table, th, td{
                border: 1px solid #ccc;
            }
            table{
                width: 100%;
                border-collapse: collapse;
                th, td{
                    height: 50px;
                }
                button{
                    background: red;
                    color: var(--primary);
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                }
                
            }
        }
    }
</style>