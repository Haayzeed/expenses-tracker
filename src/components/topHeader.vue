<template>
    <div class="header">
        <div class="main-content">
            <header>
                <div class="menu-toggle">
                    <label for="sidebar-toggle">
                        <span class="fas fa-bars"></span>
                    </label>
                </div>
                <div class="header-icons">
                    <span>
                        <img :src="userDetails.photoURL" alt="" class="avatar" v-if="userDetails.photoURL">
                        <img src="@/assets/avatar.png" alt="" class="avatar" v-else>
                    </span>
                    <span v-if="userDetails.displayName">{{userDetails.displayName}}</span>
                    <span v-else>{{userDetails.email}}</span>
                    <button @click="logout()">Logout</button>
                </div>
            </header>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    data(){
        return{
            userDetails: {}
        }
    },
    methods: {
        fetchUserData(){
            var user = firebase.auth().currentUser;
            this.userDetails = user;
        },
        logout(){
            firebase.auth().signOut().then(() =>{
                this.$router.push('/')
            })
        }
    },
    mounted(){
        this.fetchUserData()
    }
}
</script>
<style lang="scss">
.main-content{
    margin-left: 240px;
    transition: 300ms;
    &.main-content-out{
        transition: 300ms;
        margin-left: 0;
    }
    @media (max-width: 1124px){
        margin-left: 0;
    }
    header{
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2.5rem 1rem 1.5rem;
        background: var(--dark-blue);
        position: fixed;
        top: 0;
        left: 240px;
        width: calc(100% - 240px);
        z-index: 20;
        transition: 300ms;
        &.header-out{
            left: 0;
            width: 100%;
            transition: 300ms;
        }
        @media (max-width: 1124px){
            left: 0%;
            width: 100%;
        }
        .menu-toggle{
            color: var(--primary);
            @media (min-width: 1124px){
                display: block;
            }
            label{ 
                width: 48px;
                height: 48px;
                font-size: 1.2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                cursor: pointer;
                transition: 300ms;
                &:hover{
                    background: #efefef;
                    .fas{
                        color: var(--dark-blue);
                    }
                }
            }
        }
        .header-icons{
            display: flex;
            align-items: center;
            color: var(--primary);
            span{
                display: inline-block;
                margin-left: 1rem;
                font-size: 16px;
            }
            .avatar{
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }
            button{
                background: var(--primary);
                color: var(--dark-blue);
                padding: 10px;
                border: none;
                outline: none;
                border-radius: 5px;
                cursor: pointer;
                margin-left: 10px;
                &:focus{
                    border: none;
                }
            }
        }
    }
}
</style>