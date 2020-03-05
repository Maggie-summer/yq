<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "./assets/css/common.css";
import Main from "@/view/user/main"
export default {
  name: "app",
  components: {
   Main
   }
};
</script>

<style>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>