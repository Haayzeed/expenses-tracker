<template>
  <div class="home">
      sign up
      <p v-if="feedback">{{feedback}}</p>
    <form action="" @submit.prevent="register">
      <input type="email" v-model="email" placeholder="email">
      <input type="text" name="" id="" v-model="username" placeholder="username">
      <input type="password"  v-model="password" placeholder="password">
      <button>Sign Up</button>
    </form>
  </div>
</template>

<script>
import firebase from '@/firebase'
import 'firebase/auth'
const db = firebase.firestore();
export default {
  name: 'signup',
  components: {
  },
  data(){
    return{
      email: '',
      username: '',
      password: '',
      feedback: ''
    }
  },
  methods: {
    register(){
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user =>{
      db.collection('users').doc(user.user.uid).set({
        email: this.email,
        password: this.password,
        username: this.username
      })
      this.$router.push('/')
      }).catch(err =>{
        console.log(err)
        this.feedback = err.message
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
    }
  }
}
</script>
