// From表单的使用
// From里ref的作用
// 规则
// 二次登录的验证
// 判断是否登录，看cookies或者storage里是否有缓存，但作为重要的网页登录界面，需要在关闭页面时，账号密码丢失
// sessionStorage.setItem("key", "value") 用途：将value存储到key字段
// 在钩子函数中可以拦截所有的路由
<template>
  <div class="box">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h1 style="margin:20px 0;width: 600px;text-align:center">后台管理系统登录</h1>
      <!-- ref属性是用来标记的，可以在mounted周期里通过this.$refs把带有ref属性的获取到 -->
      <el-form-item label="账号" prop="nickname">
        <el-input type="text" v-model="ruleForm.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" style="letter-spacing:20px;width:300px">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      ruleForm: {
        nickname: "",
        pwd: ""
      },
      rules: {
        nickname: [{ required: true, message: "请输入名称", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },

  methods: {
    login() {
      //   console.log(this.$refs);
      // 找到当前登录的表单loginFrom  validate再次验证输入内容是否合法
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$message({
            message: "登陆成功！",
            type: "success",
            duration:1500,
            onClose:()=>{
                // 当登录成功后，把当前用户信息寄存在sessionStorage中，用来后续判断是否登录
                sessionStorage.setItem('loginuser',this.ruleForm.nickname)
                this.$router.push('/')
            }
          });
        } else {
          this.$message.error("输入有误！");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>

.demo-ruleForm {
  width: 600px;
  margin: 200px auto;
  text-align: center;
}
</style>