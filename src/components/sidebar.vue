<template>
    <div class="sidebar">
        <!-- ========== Left Sidebar Start ========== -->
        <div class="left-side-menu">
            <div class="slimscroll-menu">
                <!--- Sidemenu -->
                <div id="sidebar-menu">
                    <ul class="metismenu" id="side-menu">
                        <li class="menu-title">Navigation</li>
                        <li>
                            <router-link exact to="/dashboard">
                                <i class="dripicons-meter"></i>
                                <span> Dashboard </span>
                            </router-link>
                        </li>
                        <li>
                            <router-link exact to="/expenses">
                                <i class="dripicons-user"></i>
                                <span> Expenses </span>
                            </router-link>
                        </li>
                        <li>
                            <router-link exact to="/budget">
                                <i class="dripicons-document"></i>
                                <span> Budget </span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <!-- End Sidebar -->
                <div class="clearfix"></div>
            </div>
        </div>
<!-- Left Sidebar End -->
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