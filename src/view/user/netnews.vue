 <template>
  <div>
    <div style="margin: 20px;width:500px; ">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.title"></el-input>
        </el-form-item>
        <el-form-item label="固定电话">
          <el-input v-model="formLabelAlign.tel"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formLabelAlign.tel2"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formLabelAlign.address"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formLabelAlign.email"></el-input>
        </el-form-item>
        <el-form-item label="网址">
          <el-input v-model="formLabelAlign.siteurl"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="formLabelAlign.qq"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-input v-model="formLabelAlign.year"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
   
   <script>
import axios from "axios";
import { getSiteinfo } from "@/api/index.js";

export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {}
    };
  },
  created() {
    this.getSiteinfo();
  },
  methods: {
    async getSiteinfo() {
      let res = await getSiteinfo();
      console.log(res.data)
      this.formLabelAlign = res.data;
    },
    submitForm() {
      let f = this.formLabelAlign;
      axios({
        method: "post",
        url: "http://47.92.50.43:8888/sys/savesiteinfo",
        headers: {
          "Content-Type": "application/json"
        },
        data: f
      }).then(res => {
        console.log(res.data)
        if (res.data) {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.getSiteinfo();
        } else {
          this.$message({
            type: "error",
            message: "保存失败!"
          });
        }
      });
    }
  }
};
</script>
   
   <style scoped>
</style>