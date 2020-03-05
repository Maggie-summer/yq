<template>
    <div class="container">
 <Header></Header>
    <div style="display:flex;flex:1;">
      <Left></Left>
      <div style="flex:1;padding:10px;">
        <el-breadcrumb separator=">" style="padding:10px 0;">

           <el-breadcrumb-item :to="{ path: '/' }" >首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="title">
            <a href="javascript:;" >{{title}}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <router-view>
          <Userlist></Userlist>
        </router-view>
     
      </div>
    </div>
    </div>
</template>

<script>

import Header from "@/components/header";
import Left from "@/components/left";
 export default {
  components: {
    Header,
    Left,
  },
     data() {
          return {
              title:''
          }
      },
   methods: {
          setBread(){
              this.title = this.$route.meta.title
          }
      },
      created() {
          this.setBread()
      },
      watch: {
          $route(){
              this.setBread()
          }
      }
 }
</script>

<style scoped>
.container{
    display: flex;
  flex-direction: column;
  height: 100vh;
}

</style>