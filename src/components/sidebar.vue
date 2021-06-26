<template>
    <div>
        <input type="checkbox" id="sidebar-toggle">
        <div class="sidebar">
            <div class="sidebar-brand">
                <div class="brand-flex">
                    <h3><i class="fas fa-dice"></i> Bluecube</h3>
                </div>
            </div>
            <div class="sidebar-main">
                <div class="sidebar-menu">
                    <ul>
                        <li><router-link to="/dashboard" exact><span class="fas fa-tachometer-alt"></span> Dashboard</router-link></li>
                        <li><router-link to="/budget"><span class="fas fa-chart-bar"></span> Budget</router-link></li>
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
    }
}
</script>

<style lang="scss">
    :root{
        --primary: #fff;
        --gray: #f2f2f2;
        --secondary: #333;
        --dark-blue: #191A35;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        background: var(--gray);
        font-family: 'Poppins', sans-serif;
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
    width: calc(100% - 280px);
    height: 100%;
    z-index: 30;
    right: -100%;   
    top: 0;
}
.sidebar{
    width: 280px;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    padding: 1rem 1.5rem;
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
        padding-top: 20px;
        h3{
            color: var(--primary);
        }
    }
    &-main{
        ul{
            list-style-type: none;
            margin-bottom: 1.5rem;
            li{
                margin-bottom: .3rem;
                cursor: pointer;
                
                a{
                    color: var(--primary);
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    padding: 10px;
                    span{
                        font-size: 20px;
                        margin-right: .8rem;
                    }
                    &.router-link-exact-active, &:hover{
                        background: var(--primary);
                        color: var(--dark-blue);
                        border-radius: 5px;
                    }
                }
            }
        }
    }
}

</style>