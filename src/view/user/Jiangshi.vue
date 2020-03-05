<template>
  <div>
    <el-button
      icon="el-icon-circle-plus-outline"
      type="primary"
      style="margin:10px 0;"
      @click="addteacher"
    >添加讲师</el-button>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="img" align="center" label="头像" width="180">
        <template slot-scope="scope">
          <img :src="imageurl+scope.row.img" alt style="width:60px" />
        </template>
      </el-table-column>

      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button
            @click="handleDetail(row)"
            plain
            icon="el-icon-search"
            size="mini"
            type="primary"
          >详情</el-button>
          <el-button
            @click="handleEdilt(row)"
            icon="el-icon-edit"
            size="mini"
            plain
            type="warning"
          >编辑</el-button>
          <el-button
            @click="handleDelete(row)"
            plain
            size="mini"
            icon="el-icon-delete"
            type="danger"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content:center;padding: 20px 0;">
      <el-pagination
        :page-size="pageSize"
        :current-page.sync="pageIndex"
        background
        layout="prev, pager, next"
        :total="count"
      ></el-pagination>
    </div>
    <!-- 弹框 -->
    <el-dialog :title="mode" @close="handleCloseModal" :visible.sync="dialogVisible" width="30%">
      <el-form :model="jiangshi" :rules="rules" ref="dialogForm">
        <el-form-item label="头像" prop="img" label-width="70px">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            action="http://47.92.50.43:8888/user/uploadimg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="jiangshi.img" :src="imageurl+jiangshi.img" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="昵称" prop="nickname" label-width="70px">
          <el-input v-model="jiangshi.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" label-width="70px">
          <el-input v-model="jiangshi.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="方向" prop="fangxiang" label-width="70px">
          <el-input v-model="jiangshi.fangxiang" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc" label-width="70px">
          <el-input v-model="jiangshi.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

  <span slot="footer" class="dialog-footer" v-show="mode==='添加讲师' || mode==='编辑讲师'">
        <el-button type="primary" @click="save">保 存</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import {
  getJiangshiList,
  getJiangshiCount,
  delJiangshi,
  savejiangshi,
  Ediltjsinfo
} from "@/api/index.js";
export default {
  data() {
    return {
       mode: "",
      imageurl: "http://47.92.50.43:8888/static/",
      tableData: [],
      count: 0,
      pageIndex: 1,
      pageSize: 10,
      dialogVisible: false,
      jiangshi: {
        img: "",
        nickname: "",
        fangxiang: "",
        name: "",
        desc: ""
      },
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 7, max: 20, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        nafangxiang: [
          { required: true, message: "请输入方向", trigger: "blur" },
          { min: 7, max: 20, message: "长度在 7 到 20 个字符", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "请输入描述", trigger: "blur" },
          { min: 7, max: 20, message: "长度在 7 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getJiangshiList();
  },
  methods: {
    async getJiangshiList() {
      this.getJiangshiCount();
      let res = await getJiangshiList(this.pageIndex, this.pageSize);
      // console.log(res.data);
      this.tableData = res.data;
    },
    async getJiangshiCount() {
      let res = await getJiangshiCount();
      // console.log(res)
      this.count = res.data.count;
    },
   
    // 添加讲师
    //清楚弹框内容
    addteacher(){
      this.dialogVisible=true
        this.mode = "添加讲师";
    },
    handleCloseModal() {
      this.jiangshi = {
        img: "",
        nickname: "",
        fangxiang: "",
        name: "",
        desc: ""
      };
      // 对整个表单进行重置
      this.$refs.dialogForm.resetFields();
      this.$refs.upload.clearFiles();
    },
    // 头像获取
    handleAvatarSuccess(res) {
      // this.jiangshi.img = URL.createObjectURL(file.raw);
      this.jiangshi.img = res;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      // console.log(111);
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    save() {
      //   console.log(this.$refs);
      this.$refs.dialogForm.validate(async valid => {
        if (valid) {
          let res = await savejiangshi(this.jiangshi);
          if (res.data.success) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.getJiangshiList();
          } else {
            this.$message({
              message: "保存失败！",
              type: "success"
            });
          }

          this.dialogVisible = false;
        } else {
          this.$message.error("请输入完整信息！");
          return false;
        }
      });
    },
    // 详情
     async handleDetail(rowData) {
      this.dialogVisible = true;
      this.mode = `${rowData.name}的详情`;
      // console.log(rowData.name)
      let res = await Ediltjsinfo(rowData.id);
      this.jiangshi = res.data;
      // console.log(res);
    },
    // 编辑
    async handleEdilt(rowData) {
      this.dialogVisible = true;
      this.mode = "编辑讲师";
      let res = await Ediltjsinfo(rowData.id);
      this.jiangshi = res.data;
      console.log(res);
    },

    // 删除
    async handleDelete(rowData) {
      await this.$confirm(`此操作将永久删除此条信息`, "是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      let res = await delJiangshi(rowData.id);
      if (res.data.success) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.getJiangshiList();
      } else {
        this.$message({
          type: "error",
          message: "删除失败!"
        });
      }
    }
  },

  watch: {
    pageIndex() {
      this.getJiangshiList(this.pageIndex, this.pageSize);
    }
  }
};
</script>

<style scoped>
.avatar-uploader {
  z-index: 999;
  border: 1px dotted #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
  text-align: center;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>