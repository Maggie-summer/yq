<template>
  <el-menu
    style="min-width:201px;"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    router
    active-text-color="gold"
  >
    
    <el-menu-item index="/">
      <i class="el-icon-phone"></i>
      <span slot="title">试听管理</span>
    </el-menu-item>
    <el-menu-item index="/jiangshi">
      <i class="
      el-icon-star-off"></i>
      <span slot="title">讲师管理</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-document"></i>
      <span slot="title">文章管理</span>
    </el-menu-item>
    <el-menu-item index="/navigation">
      <i class="el-icon-menu"></i>
      <span slot="title">导航菜单管理</span>
    </el-menu-item>
    <el-menu-item index="/lesson">
      <i class="el-icon-menu"></i>
      <span slot="title">课程栏目管理</span>
    </el-menu-item>
    <el-menu-item index="/friend">
      <i class="el-icon-share"></i>
      <span slot="title">友情链接管理</span>
    </el-menu-item>
    <el-menu-item index="/news">
      <i class="el-icon-setting"></i>
      <span slot="title">网站信息管理</span>
    </el-menu-item>
     <el-menu-item index="/detial">
      <i class="el-icon-setting"></i>
      <span slot="title">用户详情</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    
  },
};
</script>

<style scoped>
.el-icon-phone,
.el-icon-star-off{
  font-size: 20px;
  padding-right: 10px;
}
</style>