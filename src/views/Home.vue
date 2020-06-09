<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import User from "../gloabl/request/user";
export default {
  name: "Home",
  components: {
    HelloWorld
  },
  created() {
    const code = this.$route.query.code
    console.log(code)
    if(code){
      User.wechat({code}).then(res =>{
        console.log(res)
      })
    }
    const user = localStorage.getItem("pro_userinfo");
    console.log(user);
  }
};
</script>
