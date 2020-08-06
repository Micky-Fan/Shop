<template>
    <div id="app">
        <loading :active.sync="isLoading"></loading>
        <table class="table my-3">
            <thead>
                <tr>
                    <th>購買時間</th>
                    <th>Email</th>
                    <th>購買商品</th>
                    <th>應付金額</th>
                    <th>是否付款</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="item in orders" :key="item.id">
                <td>{{item.create_at}}</td>
                <td>{{item.email}}</td>
                <td>{{item.products}}</td>
                <td>{{item.total}}</td>
                <td>{{item.is_paid}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            orders:{},
            isLoading:false,
            status:{
                fileloading:false,
            },
           
        }
    },
    methods:{
        getOrders(){
            const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/orders`;
            const vm = this;
            vm.isLoading = true;
            // console.log(process.env.CUSTOMPATH);
            this.$http.get(api).then((response) => {
            console.log(response.data);
            vm.isLoading = false;
            vm.orders=response.data.orders;
                    });
        },
},
created(){
    this.getOrders();
}
}
</script>