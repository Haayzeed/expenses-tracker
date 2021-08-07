<template>
  <div class="dashboard">
        <top-header></top-header>
        <sidebar></sidebar>
        <div class="content-section">
            <main>
                <div class="content">
                    <div class="card">
                        <p class=" mb-0 mt-2">Budget</p>
                        <h3 class="">&#8358;{{Number(sum).toLocaleString()}}</h3>
                    </div>
                    <div class="card">
                        <p class=" mb-0 mt-2">Expenses</p>
                        <h3 class="">&#8358;{{Number(totalExpenses).toLocaleString()}}</h3>
                    </div>
                    <div class="card">
                        <p class=" mb-0 mt-2">Balance</p>
                        <h3 class="">&#8358;{{Number(this.sum - this.totalExpenses).toLocaleString()}}</h3>
                    </div>
                </div>
            </main>
        </div>
        <main-footer></main-footer> 
    
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
        money: '',
        sum: '',
        allBudget: [],
        userDetails:{},
        allExpenses: [],
        totalExpenses: [],
        cat: '',
        userId: firebase.auth().currentUser.uid
    }
  },
  methods: {
    fetchBudget(){
        db.collection('budget').where('userId', '==', this.userId).get()
        .then(acc=>{
            acc.forEach(doc =>{
                let result = doc.data()
                this.allBudget.push(result.money)
                this.sum = this.allBudget.reduce(function(a, b){
                    return a + b;
                }, 0);
            })
        })
    },
    // addBudget(e){
    //     e.preventDefault()
    //     var user = firebase.auth().currentUser;
    //     db.collection('users').doc(user.uid).collection('budget').add({
    //         new: parseInt(this.money),
    //         date: new Date().getTime()
    //     }).then(()=>{
    //         alert("added successfully")
    //         location.reload()
    //     })
    // },
    // addExpenses(e){
    //     e.preventDefault()
    //     var user = firebase.auth().currentUser;
    //     db.collection('users').doc(user.uid).collection('expenses').add({
    //         new: parseInt(this.expenses),
    //         date: new Date().getTime(),
    //         category: this.cat
    //     }).then(()=>{
    //         alert("added successfully")
    //         location.reload()
    //     })
    // },
    // addCategory(e){
    //     e.preventDefault()
    //     var user = firebase.auth().currentUser;
    //     db.collection('users').doc(user.uid).collection('category').add({
    //         name: this.category,
    //         id: this.category.length - 1
    //         // date: new Date().getTime()
    //     }).then(()=>{
    //         alert("added successfully")
    //         // console.log()
    //     })
    // },
    // fetch expenses
    fetchExpenses(){
        db.collection('expenses').where('userId', '==', this.userId).get()
        .then(acc1=>{
            acc1.forEach(doc =>{
                let result = doc.data()
                this.allExpenses.push(result.money)
                this.totalExpenses = this.allExpenses.reduce(function(a, b){
                    return a + b;
                }, 0);
            })
        })       
    }
  },
    mounted(){
        this.fetchBudget()
        this.fetchExpenses()
    }
}
</script>

<style lang="scss">
    #sidebar-toggle{
        &:checked ~ .body-label{
            right: 0;
        }
        &:checked ~ .main-content{
            margin-left: 0%;
        }
    }
    .content-section{
        margin-left: 240px;
        transition: 300ms;
        margin-top: 80px;
        height: calc(100vh - 100px);
        background: var(--gray);
        &.content-section-out{
            transition: 300ms;
            margin-left: 0;
        }
        @media (max-width: 1124px){
            margin-left: 0;
        }
        main{
            padding: 1.5rem 2.5rem;
            background: var(--light-gray);
            margin-top: 70px;
            .content{
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-column-gap: 30px;
                @media (max-width: 1124px){
                    grid-template-columns: repeat(3, 1fr);
                }
                @media (max-width: 600px){
                    grid-template-columns: repeat(1, 1fr);
                }
                @media (min-width: 601px) and (max-width: 768px){
                    grid-template-columns: repeat(2, 1fr);
                }
                .card{
                    height: 150px;
                    margin-bottom: 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: var(--primary);
                }
            }
        }
    }
</style>