<template>
  <div class="home">
    <!-- login
    <form action="" @submit.prevent="login">
      <input type="email" name="" id="" v-model="email">
      <input type="password"  v-model="password">
      <button>Login</button>
      <br>
    <button @click="googleSignUp()">sign in with google</button>
    </form> -->
    <div class=" d-flex align-items-center">        
        <div class="account-pages w-100">
            <div class="">
                <!-- <img src="@/assets/images/FPI--Logo1.png" class="d-block mx-auto mb-2"> -->
                <div class="row">
                    <div class="col-md-4 d-flex align-items-center justify-content-center bg-white">
                        <div class="card w-100">
                            <div class="card-text pt-3">
                                <h3 class="text-center">Budget Tracker</h3>
                            </div>
                            <div class="card-body px-4 pb-4">
                                <form @submit.prevent="login">
                                    <div class="form-group mb-2">
                                        <label for="emailaddress" class="font-weight-bold d-flex justify-content-start">Email Address</label>
                                        <input class="form-control" type="text" placeholder="Enter your Username" v-model="email">
                                    </div>

                                    <div class="form-group mb-2">
                                        <label for="password" class="font-weight-bold d-flex justify-content-start">Password</label>
                                        <input class="form-control" type="password" placeholder="Enter your password" v-model="password">
                                    </div>
                                    <div class="form-group mb-0 text-center">
                                        <button class="btn btn-dark btn-block" type="submit"> Log In </button>
                                    </div>
                                </form>
                                <p class="mt-2"><a href="" @click.prevent="googleSignUp()">Login with Google</a></p>
                            </div>
                        </div>
                    </div> 
                    <div class="col-md-8 authentication-bg authentication-bg-pattern">

                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// import firebase from '@/firebase'
import firebase from "firebase/app"
// import 'firebase/auth'
// const db = firebase.firestore();
export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods: {
    login(){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user)=>{
        console.log(user)
        this.$router.push({name: 'dashboard'})
      })
    },
    googleSignUp(){
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(()=>{
        this.$router.push({name: 'dashboard'})
        console.log("Signed In!")
      }).catch(err =>{
        alert(err)
      })
    }
  }
}
</script>
<style>
body{
    padding-bottom: 0 !important;
}
div.authentication-bg-pattern{
    background-position: center !important;
    background-color: rgba(0,0,0,0.6);
    background-blend-mode: overlay;
    height: 100vh;
}
</style>
