<template>
    <div class="home">
        <div class="login-wrapper">
            <div class="login-section">
                <h2>Budget Tracker</h2>
                <div class="card-body">
                    <form @submit.prevent="login">
                        <div class="form-group">
                            <input class="form-control" type="text" placeholder="Enter your Username" v-model="email">
                        </div>

                        <div class="form-group">
                            <input class="form-control" type="password" placeholder="Enter your password" v-model="password">
                        </div>
                        <div class="form-group mb-0 text-center">
                            <button class="btn btn-dark btn-block" type="submit"> Log In </button>
                        </div>
                    </form>
                    <p class="google-link"><a href="" @click.prevent="googleSignUp()">Login with Google</a></p>
                    <p class="register">Don't have an account? <router-link :to="{name: 'signup'}">Register</router-link></p>
                </div>
            </div>
            <div class="login-banner"></div>
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
<style lang="scss" scoped>
body{
    height: 100vh;
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
        @media(max-width: 991px){
            width: 40%;
        }
        @media(max-width: 600px){
            width: 100%;
            height: 100vh;
        }
        .card-body{
            width: 100%;
            padding: 50px;
            @media(max-width: 991px){
                padding: 30px;
            }
        }
        .form-group{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: 15px;
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
            margin-bottom: 10px;
            a{
                color: var(--dark-blue);
                text-decoration: none;
                font-size: 14px;
                
                &:hover{
                    text-decoration: underline;
                }
            }
        }
        .register{
            font-size: 14px;
            color: var(--dark-blue);

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
