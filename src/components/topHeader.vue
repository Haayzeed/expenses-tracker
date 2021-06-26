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
                    <span><img :src="userDetails.photoURL" alt="" class="avatar"></span>
                    <span class="">{{userDetails.displayName}}</span><button @click="logout()">Logout</button>
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
<style scoped lang="scss">
.main-content{
    margin-left: 280px;
    transition: margin-left 300ms;
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
        left: 280px;
        width: calc(100% - 280px);
        z-index: 20;
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
                &:hover{
                    background: #efefef;
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