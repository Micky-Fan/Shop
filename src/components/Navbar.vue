<template>
     <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Micky商城</a>
                    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
                <ul class="navbar-nav px-3">
                    <li class="nav-item text-nowrap">
                        <button class="btn btn-primary" @click.prevent="logout">Log out</button>
                    </li>
                </ul>
         </nav> 
         
              
</template>
<script>
export default {
    methods:{
        logout(){
                const api=`${process.env.APIPATH}logout`;//api伺服器路徑
                const vm = this;        
                this.$http.post(api).then((response) => {
                console.log(response.data)
                if(response.data.success){
                        vm.$router.push('/Login');
                    }
                    });
             }
    }
}
</script>