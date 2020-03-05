<template>
    <div class="header">
    <div class="logo">我的商城管理平台</div>
    <el-menu
  :default-active="index"
  class="el-menu-demo"
  mode="horizontal"
  background-color="#545c64"
  text-color="#fff"
  router
  active-text-color="#ffd04b">
  <el-submenu index="1">
    <template slot="title">我的工作台</template>
    <el-menu-item index="1-1">选项1</el-menu-item>
    <el-menu-item index="1-2">选项2</el-menu-item>
    <el-menu-item index="1-3" route="/login">退出登录</el-menu-item>
  </el-submenu>
</el-menu>
 </div>
</template>

<script>
 export default {
data() {
    return {
      index: "1"
    };
 }
 }
</script>

<style scoped>
.header{
  background: #545c64;
  display:flex;
  justify-content:space-between;
  align-items: center;
  color: #fff;
  padding: 0 20px;
}
.logo{
  font-size: 24px;
}

</style>