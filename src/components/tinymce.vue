<template>
  <div>
    <el-form ref="form"   :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.sectionname" placeholder="请选择">
          <el-option label="" value="托福"></el-option>
          <el-option label="" value="雅思"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="tinymce" style="display:flex;">
      <div style="margin-left: 40px;">内容</div>
      <div style="margin-left: 10px; width:92%;">
        <editor 
          v-model="content"
          :init="init"
          initialValue="<p>This is the initial content of the editor</p>"
        ></editor>
      </div>
    </div>
      <el-button
      type="primary"
      style="text-align: center;"
      @click="save"
    >保 存</el-button>
  </div>
</template>

<script>
import {saveArticle} from "@/api/index.js";

import Editor from "@tinymce/tinymce-vue";
import axios from "axios";

export default {
  data() {
    return {
      form: {
        title: "",
        sectionname: ""
      },
      content: "",
      init: {
        language_url: "tinymce/langs/zh_CN.js",
        language: "zh_CN",
        height: 500,
        async images_upload_handler(blobInfo, success, failure) {
          // let str = "data:image/jpg;base64," + blobInfo.base64();
          let formData = new FormData();
          formData.append("file", blobInfo.blob(), blobInfo.filename());
          let { data } = await axios.post(
            "http://47.92.50.43:8888/user/uploadimg",
            formData
          );
          success("http://47.92.50.43:8888/static/" + data);
        },
        menubar: true,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount"
        ],
        toolbar:
          "undo redo | formatselect |image bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help"
      }
    };
  },
  methods: {
      save() {
      //   console.log(this.$refs);
      this.$refs.form.validate(async valid => {
        if (valid) {
          let res = await saveArticle(this.lesson);
          if (res.data.success)
          {
       
            this.$message({
              message: "保存成功！",
              type: "success"
            });
             this.getArticlelist()     
          }
          else {
            this.$message({
              message: "保存失败！",
              type: "success"
            });
          }
        } else {
          this.$message.error("请输入完整信息！");
          return false;
        }
      });
    },
  },
  components: {
    editor: Editor
  }
};
</script>

<style scoped>

</style>