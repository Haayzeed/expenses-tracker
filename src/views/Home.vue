<template>
    <div class="home">
        <div class="login-wrapper">
            <div class="login-section">
                <h2>Budget Tracker</h2>
                <div class="card-body">
                    <form @submit.prevent="login">
                        <div class="form-group">
                            <label for="emailaddress" class="font-weight-bold d-flex justify-content-start">Email Address</label>
                            <input class="form-control" type="text" placeholder="Enter your Username" v-model="email">
                        </div>

                        <div class="form-group">
                            <label for="password" class="font-weight-bold d-flex justify-content-start">Password</label>
                            <input class="form-control" type="password" placeholder="Enter your password" v-model="password">
                        </div>
                        <div class="form-group mb-0 text-center">
                            <button class="btn btn-dark btn-block" type="submit"> Log In </button>
                        </div>
                    </form>
                    <p class="google-link"><a href="" @click.prevent="googleSignUp()">Login with Google</a></p>
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
        .card-body{
            width: 100%;
            padding: 50px;
        }
        .form-group{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: 20px;
            input{
                width: 100%;
                height: 40px;
                padding: 14px;
            }
            button{
                background: var(--dark-blue);
                color: var(--primary);
                width: 100%;
                height: 40px;
            }
        }
        .google-link a{
            color: var(--dark-blue);
            text-decoration: none;
            &:hover{
                text-decoration: underline;
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
    }
}

</style>
