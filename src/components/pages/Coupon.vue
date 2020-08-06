<template>
    <div id="app">
        <button type="button" class="btn btn-outline-info mt-4" @click="openCoupon(true)">新增優惠卷</button>
           <div class="mx-5 row justify-content-center">
            <div class="mx-5 row justify-content-center"> 
                     <table class="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th mr-4>優惠卷</th>
                                <th class="text-right" >優惠折扣</th>
                                <th class="text-right">到期日</th>
                                <th class="text-right">是否啟用</th>
                                <th class="text-right">編輯</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in coupons" :key="item.id">
                                <td>
                                    <button type="button" class="btn btn-outline-danger"
                                    @click="opendelCouon(item)">
                                        <i class="far fa-trash-alt"></i></button>
                                </td>
                                <td class="align-middle mr-4" >{{item.title}}</td>                             
                                <td class="text-right align-middle">{{item.percent}}％ off</td>
                                <td class="text-right align-middle">{{item.due_date|date}}</td>
                                <td class="text-right align-middle"><span v-if="item.is_enabled === 1" class="text-success">啟用</span>
                                 <span v-else class="text-muted text-right">未起用</span></td>
                                <td class="text-right align-middle"><button type="button" class="btn btn-outline-secondary" 
                                @click="openCoupon(false,item)"
                                >編輯</button></td>
                            </tr>
                        </tbody>                      
                    </table>
                     
                      
            </div>
        </div>
        <div class="modal fade" id="coupontModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md" role="document">
                 <div class="modal-content border-0">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">新增優惠卷</h5>             
                   </div>
                         <div class="modal-body">
                             <div class="form">
                                 <div class="form-group row ">
                                    <label for="" class="col-3 mt-2 pl-2 text-right" >優惠卷名稱 :</label>  
                                    <div class="col-8 px-0">
                                        <input type="text" class="form-control" placeholder="請輸入名稱" v-model="tempCoupon.title">
                                    </div>      

                                 </div>
                                    <div class="form-group row ">
                                    <label for="" class="col-3 mt-2 pl-2 text-right" >優惠折數 :</label>  
                                    <div class="col-8 px-0">
                                        <input type="text" class="form-control" placeholder="請輸入百分比" v-model="tempCoupon.percent">
                                    </div>                                  
                                 </div>

                                 <div class="form-group row ">
                                    <label for="" class="col-3 mt-2 pl-2 text-right" >優惠代碼 :</label>  
                                    <div class="col-8 px-0">
                                        <input type="text" class="form-control" placeholder="請用英文加數字" v-model="tempCoupon.code">
                                    </div>                                  
                                 </div>
                                 <div class="form-group row ">
                                    <label for="" class="col-3 mt-2 pl-2 text-right" >到期日 :</label>  
                                    <div class="col-8 px-0">
                                        <input type="date" class="form-control" id="due_date" v-model="due_date">
                                    </div>                                  
                                 </div>

                                 <div class="form-group row ">
                                    <label for="" class="col-3 mt-2 pl-2 text-right" >是否啟用 :</label>  
                                    <div class="col-8 px-0">
                                        <input type="checkbox" class="form-control"
                                         :true-value="1"
                                         :false-value="0"
                                         id="is_enabled"
                                         v-model="tempCoupon.is_enabled">
                                    </div>                                  
                                 </div>
                             </div>
                             
                          </div>    

                        <div class="modal-footer">
                            
                            <button type="buttom" class="btn btn-outline-primary" @click="updateCoupon(tempCoupon.id)">
                                確認
                            </button>
                        </div>
            
                 </div>
            </div>
      
    </div>
            <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>刪除優惠卷</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠卷(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" @click="deletCoupon">確認刪除</button>
                </div>
                </div>
            </div>
            </div>    

    </div>
</template>
<script>
import $ from 'jquery';
export default {
    
    data() {
        return{
            coupons:{},
            tempCoupon:{
                title: '',
                is_enabled: 0,
                percent: 100,
                due_date: 0,
                code: '',
            },
            isLoading:false,
            due_date:'',
            isNew:false,
        }
    },
    watch:{
       due_date(){
            const vm =this;
            const timestamp = Math.floor(new Date(vm.due_date) / 1000);
            vm.tempCoupon.due_date = timestamp;
       }    
   },
   methods:{
       updateCoupon(){
            let api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon`;
            const vm = this;
            let httpMethod = "post"
            vm.isLoading = true;

            if(!this.isNew) {
                httpMethod="put";
                api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
            }
            this.$http[httpMethod](api,{data:vm.tempCoupon}).then((response) => {
            console.log(response.data);
            vm.isLoading = false;
             $('#coupontModal').modal('hide');
            vm.getCoupon();
                    });
       },
       getCoupon(){
            const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupons/`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
            console.log(response.data);
            vm.isLoading = false;
            vm.coupons=response.data.coupons;
            
                    });
       },
       deletCoupon(){
            const vm = this;
            const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;        
            vm.isLoading = true;
            this.$http.delete(api).then((response) => {
            console.log(response.data);
            vm.isLoading = false;
            vm.getCoupon();
            $('#delCouponModal').modal('hide');
                    });
       },
       openCoupon(newOrnot,item){
           const vm =this;
           if(newOrnot){
               vm.tempCoupon={};
               vm.due_date='';
               vm.isNew=true;
               $('#coupontModal').modal('show');
           }else{
               vm.tempCoupon=Object.assign({},item);
               const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T');
               vm.due_date = dateAndTime[0];
               vm.isNew=false;
               $('#coupontModal').modal('show');
           }
           
       },
       opendelCouon(item){
           this.tempCoupon=item;
           $('#delCouponModal').modal('show');
       }
   },
   created(){
       this.getCoupon();
   }
   
}
</script>