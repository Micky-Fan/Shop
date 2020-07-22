<template>
  <div class="hello">
   <button class="btn btn-primary" @click.prevent="logout">Log Out</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
     
    }
  },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
