<template>
    <div class="about">
        <top-header></top-header>
        <sidebar></sidebar>
        <div class="content-section budget">
            <h3 class="total">Total Budget: &#8358;{{Number(sum).toLocaleString()}}</h3>
            <div class="budget-tab">
                <div class="add-budget card">
                    <h4 class="card-title">Add Budget</h4>
                    <form action="">
                        <input type="text" v-model="money" placeholder="Budget">
                        <button @click="addBudget">Add Budget</button>
                    </form>
                </div>
                <div class="budget-table card">
                    <table>
                        <tr>
                            <th>S/N</th>
                            <th>Amount</th>
                            <!-- <th>Date/Time</th> -->
                            <th>Action</th>
                        </tr>
                        <tr v-for="(totalBudget, index) in totalBudgets" :key="totalBudget.id">
                            <td>{{index+1}}</td>
                            <td>&#8358;{{Number(totalBudget.money).toLocaleString()}}</td>
                            <!-- <td>{{new Date(totalBudget.date).toLocaleString()}}</td> -->
                            <td><button @click="deleteBudget(totalBudget.id)">Delete</button></td>
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
        totalBudgets: [],
        userId: firebase.auth().currentUser.uid
        }
    },
    methods: {
        fetchBudget(){
            db.collection('budget').where('userId', '==', this.userId).onSnapshot(querySnap=>{
            this.totalBudgets = [];
            this.budget = [];
                querySnap.forEach(doc =>{
                    let result = doc.data()
                    this.budget.unshift(result.money)
                    result.id = doc.id
                    this.totalBudgets.push(result)
                    this.sum = this.budget.reduce(function(a, b){
                    return a + b;
                }, 0);
                })
            })
        },
        addBudget(e){
            e.preventDefault()
            let convert = Number(this.money).toFixed(2);
            if(this.money){
                db.collection('budget').add({
                    budget_id: this.budget.length + 1,
                    money: Number(convert),
                    date: Date.now(),
                    userId: this.userId
                }).then(()=>{
                    alert("added successfully")
                })
                this.money = ''
            }
            else{
                alert("check input field")
            }
        },
        deleteBudget(id){
            db.collection('budget').doc(id).delete().then(()=>{
            this.totalBudgets = this.totalBudgets.filter(budget =>{
                return budget.id != id;
            });
            })
        }
    },
    mounted(){
        this.fetchBudget()
    }
}
</script>
<style lang="scss">
    .budget{
        padding: 20px;
        display: flex;
        flex-direction: column;
        h3.total{
            align-self: flex-end;
        }
        .card{
            background: var(--primary);
            padding: 20px;
        }
        .budget-tab{
            display: flex;
            justify-content: space-between;
            @media(max-width: 767px){
                flex-direction: column;
            }
        }
        .add-budget{
            width: calc(40% - 10px);
            padding: 20px;
            @media(max-width: 767px){
                width: 100%;
                margin-bottom: 10px;
            }
            form{
                display: flex;
                flex-direction: column;
                input{
                    width: 100%;
                    height: 40px;
                    margin: 10px 0;
                    padding: 14px;
                    border-radius: 3px;
                    border: 1px solid var(--dark-blue);
                }
                button{
                    background: var(--dark-blue);
                    border: none;
                    color: var(--primary);
                    height: 40px;
                    border-radius: 3px;
                }
            }
        }
        .budget-table{
            width: calc(60% - 10px);
            @media(max-width: 767px){
                width: 100%;
            }
            table, th, td{
                border: 1px solid #ccc;
            }
            table{
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
                th, td{
                    height: 50px;
                    text-align: center;
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