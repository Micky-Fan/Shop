<template>
    <div id="app">
     <loading :active.sync="isLoading"></loading>
      <div class="row mt-4">
          <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
                <div class="card border-0 shadow-sm">
                    <div style="height: 200px; background-size: cover; background-position: center"
                     :style="{backgroundImage:`url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{item.title}}</a>
                    </h5>
                    <p class="card-text">{{item.content}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="!item.price">{{item.origin_price}}</div>
                        <del class="h6" v-if="item.price">原價{{item.origin_price}}</del>
                        <div class="h5" v-if="item.price">特價{{item.price}}</div>
                    </div>
                    </div>
                    <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.fileloading===item.id"></i>
                      詳細資料  {{item.description}}
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.fileloading===item.id"></i>
                        加到購物車
                    </button>
                    </div>
                </div>
            </div>
      </div>
        <div class="mx-5 row justify-content-center">
            <div class="mx-5 row justify-content-center"> 
                     <table class="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th >商品名稱</th>
                                <th  class="text-right" >數量</th>
                                <th  class="text-right">價錢</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cart in carts" :key="cart.id">
                                <td>
                                     <button type="button" class="btn btn-outline-danger"
                                     @click="removeCart(cart.id)">
                                     <i class="far fa-trash-alt"></i></button>
                                </td>
                                <td class="align-middle">{{cart.product.title}}
                                  <div class="text-success" v-if="cart.coupon">
                                    已套用優惠券
                                  </div>
                                </td>
                                <td class="text-right align-middle">{{cart.qty}}</td>
                                <td class="text-right align-middle">{{cart.final_total}}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr >
                                <td colspan="3" class="text-right">總額 </td>        
                                <td class="text-right" >{{total}}</td>           
                            </tr> 
                            <tr v-if="final_total !==total">
                                <td colspan="3" class="text-right text-success">折扣價</td>
                                <td class="text-right text-success">{{final_total}}</td>
                            </tr>                        
                         </tfoot>
                    </table>
                    <div class="input-group mb-4 input-group-sm">
                        <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="couponCode.code">
                        <div class="input-group-append">
                           <button type="button" class="btn btn-outline-success" @click="useCoupon">套用優惠碼</button>
                        </div>
                    </div>    
            </div>
        </div>
       <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md" role="document">
                 <div class="modal-content border-0">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{product.title}}</h5>             
                   </div>
                         <div class="modal-body">
                                     <img :src="product.imageUrl" alt="" class="img-fluid">
                                     <blockquote>
                                         <p class="">{{product.comtent}}</p>
                                         <footer>{{product.description}}</footer>
                                     </blockquote>
                                     <div class="d-flex justify-content-between align-items-baseline">
                                         <div class="h5" v-if="!product.price">{{product.origin_price}}</div>
                                         <del class="h6" v-if="product.price">原價{{product.origin_price}}</del>
                                         <div class="h5" v-if="product.price">特價{{product.price}}</div>
                                     </div>
                          </div>    

                        <select name="" id="" class="form-control" v-model="product.num">
                            <option :value="num" v-for="num in 10" :key="num">選購{{num}}件</option>
                        </select>                

                        <div class="modal-footer">
                            <div class="text-muted text-nowrap mr-3"> 
                                <strong>小計 {{product.num * product.price}}</strong>
                            </div>
                            <button type="buttom" class="btn btn-outline-primary" @click="addtoCart(product.id,product.num)">
                                加到購物車
                            </button>
                        </div>
                
                 </div>
            </div>
      
    </div>
                <div class="my-5 row justify-content-center">
                        <form class="col-md-6" @submit.prevent="creatOrders">
                            <div class="form-group">
                                <label for="useremail">Email</label>
                                <input type="email" class="form-control" name="email" id="useremail"
                                  v-model="form.user.email" placeholder="請輸入 Email" required>
                                <span class="text-danger"></span>
                            </div>
                        
                            <div class="form-group">
                                <label for="username">收件人姓名</label>
                                <input type="text" class="form-control" name="name" id="username"
                                    v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
                                <span class="text-danger" >{{errors.has("name")}}</span>
                            </div>
                        
                            <div class="form-group">
                                <label for="usertel">收件人電話</label>
                                <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
                            </div>
                        
                            <div class="form-group">
                                <label for="useraddress">收件人地址</label>
                                <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                                    placeholder="請輸入地址">
                                <span class="text-danger">地址欄位不得留空</span>
                            </div>
                        
                            <div class="form-group">
                                <label for="comment">留言</label>
                                <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                            </div>
                            <div class="text-right">
                               <button class="btn btn-danger">送出訂單</button>
                            </div>
                        </form>
                 </div>
 </div>
</template>
<script>
import $ from 'jquery';
export default {
    data(){
        return{
            products:{},
            isLoading:false,
            status:{
                fileloading:false,
            },
            product:{},
            carts:{},
            total:'',
            final_total:'',
            couponCode:{
               code:''
           },
           form:{
            user:{
            name: "",
            email: "",
            tel: "",
            address: ""
             }
           }
           
        }
    },
    methods:{
        getProducts(){
            const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
            console.log(response.data);
            vm.isLoading = false;
            vm.products=response.data.products;
                    });
        },
        getProduct(id){           
            const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${id}`;
            const vm = this;
            vm.status.fileloading = id;
            this.$http.get(api).then((response) => {
            console.log(response.data);
           vm.status.fileloading = '';
            vm.product=response.data.product;
            this.openModal();
                    });
        },
        addtoCart(id,qty=1){
            const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            let cartData = {
                "product_id":id,
                qty
            }
            vm.status.fileloading = id;
            this.$http.post(api,{"data":cartData}).then((response) => {
            console.log(response.data);
            vm.status.fileloading = '';
            $('#productModal').modal('hide');
            this.getCart();
                    });
        },
        getCart(){
            const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            this.$http.get(api).then((response) => {
            console.log(response.data);
            vm.carts=response.data.data.carts;
            vm.total=response.data.data.total;
            vm.final_total=response.data.data.final_total;
                    });
        },
        openModal(){         
            $('#productModal').modal('show');
        },
        removeCart(id){
            const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;
            const vm = this;
            vm.isLoading = true;
            this.$http.delete(api).then((response) => {
            console.log(response.data.message);
            vm.getCart();
            vm.isLoading = false;
                    });
            
        },
        useCoupon(){
            const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/coupon`;
            const vm = this;
            vm.isLoading = true;
            this.$http.post(api,{data:vm.couponCode}).then((response) => {
            console.log(response.data.message);
            vm.getCart();
            vm.isLoading = false;
                    });
        },
        creatOrders(){
            const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order`;
            const vm = this;
            const order =vm.form
            this.$http.post(api,{data:order}).then((response) => {
            console.log(response.data);
           
                    });
        }
},
created(){
    this.getProducts();
    this.getCart();
}
}
</script>