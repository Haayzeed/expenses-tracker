<template>
    <div>
        <input type="checkbox" id="sidebar-toggle" class="checker" @click="sidebarSwitcher()">
        <div class="sidebar">
            <div class="sidebar-brand">
                <div class="brand-flex">
                    <h3><i class="fas fa-dice"></i> Budget-it</h3>
                </div>
            </div>
            <div class="sidebar-main">
                <div class="sidebar-menu">
                    <ul>
                        <li><router-link to="/dashboard" exact><span class="fas fa-tachometer-alt"></span> Dashboard</router-link></li>
                        <li><router-link to="/add-budget"><span class="fas fa-chart-bar"></span> Budget</router-link></li>
                        <li><router-link to="/expenses"><span class="fas fa-chess-queen"></span> Expenses</router-link></li>
                        <li><router-link to="/report"><span class="fas fa-filter"></span> Report</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
        <label for="sidebar-toggle" class="body-label"></label>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods: {
        sidebarSwitcher(){
           var checker = document.querySelector('.checker')
           if(checker.checked){
               console.log('checked')
               document.querySelector('header').classList.add('header-out')
               document.querySelector('.main-content').classList.add('main-content-out')
               document.querySelector('.content-section').classList.add('content-section-out')
           }
           else{
                document.querySelector('header').classList.remove('header-out')
                document.querySelector('.main-content').classList.remove('main-content-out')
                document.querySelector('.content-section').classList.remove('content-section-out')
           }
        }
    }
}

</script>

<style lang="scss">
    :root{
        --primary: #fff;
        --gray: #f2f2f2;
        --secondary: #333;
        --dark-blue: #191a35;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #sidebar-toggle{
    display: none;
    &:checked ~ .sidebar{
        left: -100%;
        @media (max-width: 1124px){
            left: 0;
        }
    }
    &:checked ~ .body-label{
        right: 0%;
    }
}
.body-label{
    position: fixed;
    width: calc(100% - 240px);
    height: 100%;
    z-index: 30;
    right: -100%;   
    top: 0;
}
.sidebar{
    width: 240px;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    padding: 1rem 0;
    background: var(--dark-blue);
    color: var(--primary);
    z-index: 20;
    transition: left 300ms;
    @media (max-width: 1124px){
        left: -100%;
        z-index: 30;
    }
    &-brand{
        height: 70px;
    }
    .brand-flex{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        h3{
            color: var(--primary);
        }
    }
    &-main{
        ul{
            list-style-type: none;
            margin-bottom: 1.5rem;
            li{
                height: 50px;
                cursor: pointer;
                a{
                    color: var(--primary);
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    height: 100%;
                    padding: 0 10px;
                    span{
                        font-size: 18px;
                        margin-right: .8rem;
                        font-weight: 600;
                    }
                    &.router-link-exact-active, &:hover{
                        background: var(--primary);
                        color: var(--dark-blue);
                    }
                }
            }
        }
    }
}

</style>