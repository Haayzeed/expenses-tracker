<template>
  <div class="home">
      <!-- sign up
    <form action="" @submit.prevent="register">
      <input type="email" v-model="email" placeholder="email">
      <input type="text" name="" id="" v-model="username" placeholder="username">
      <input type="password"  v-model="password" placeholder="password">
      <button>Sign Up</button>
    </form> -->

    <div class="login-wrapper">
      <div class="login-section">
        <h2>Budget Tracker</h2>
        <h5>Sign Up</h5>
        <div class="card-body">
          <p class="feedback" v-if="feedback">{{feedback}}</p>
          <form @submit.prevent="register">
            <div class="form-group">
              <input class="form-control" type="text" placeholder="Email Address" v-model="email">
            </div>
            <div class="form-group">
              <input class="form-control" type="text" placeholder="Username" v-model="username">
            </div>
            <div class="form-group">
                <input class="form-control" type="password" placeholder="Password" v-model="password">
            </div>
            <div class="form-group text-center">
                <button class="btn btn-dark btn-block" type="submit"> Register </button>
            </div>
          </form>
          <p class="register">Already have an account? <router-link :to="{name: 'home'}">Login</router-link></p>
        </div>
      </div>
      <div class="login-banner"></div>
  </div>
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
      // if(this.username){
      //   db.collection('users').doc(this.username).get().then(doc =>{
      //     if(doc.exists){
      //       this.feedback = "this username already exist"
      //     }
      //     else{
      //       this.feedback = "it doesnt exit"
      //     }
      //   })
      // }
      // else{
      //   this.feedback = "You must enter a username"
      // }
    }
  }
}
</script>
<style lang="scss">
.feedback {
  color: #f20;
  font-size: 12px;
  text-align: center;
  margin-bottom: 10px;

}
.login-wrapper{
    display: flex;
    height: 100%;
    .login-section{
        width: 30%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        h5{
          font-size: 20px;
          margin-top: 10px;   
        }
        @media(max-width: 991px){
            width: 40%;
        }
        @media(max-width: 600px){
            width: 100%;
            height: 100vh;
        }
        .card-body{
            width: 100%;
            padding: 30px 50px;
            @media(max-width: 991px){
              padding: 20px 30px;
            }
        }
        .form-group{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            input{
              width: 100%;
              height: 40px;
              padding: 10px;
            }
            button{
              background: var(--dark-blue);
              color: var(--primary);
              width: 100%;
              height: 40px;
            }
        }
        .google-link{
          margin: 30px 0 10px 0;
          height: 40px;
          width: 100%;
          border-radius: 3px;
          color: var(--dark-blue);
          border: 1px solid var(--dark-blue);
          background: unset;
        }
        .register{
            font-size: 14px;
            color: var(--dark-blue);
            text-align: center;
            margin-top: 20px;
            a{
              color: var(--dark-blue);
              font-weight: 600;
            }
        }
    }
    .login-banner{
        background-image: url('../assets/images/background.jpg');
        background-color: rgba(25, 26, 53,0.8);
        background-blend-mode: overlay;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 70%;
        height: 100vh;
        @media(max-width: 991px){
            width: 60%;
        }
        @media(max-width: 600px){
            display:none;
        }
    }
}
</style>
