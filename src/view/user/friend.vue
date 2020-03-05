<template>
  <div>
    <el-button
      icon="el-icon-circle-plus-outline"
      type="primary"
      style="margin:10px 0;"
      @click="addfriend"
    >添加友情链接</el-button>
    <el-table :data="tableData" border style="width: 100%;">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="name" label="网站名称" width="180"></el-table-column>
      <el-table-column prop="path" label="网站地址"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="{row}">
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
    <!-- 弹框 -->
    <el-dialog :title="mode" @close="handleCloseModal" :visible.sync="dialogVisible" width="30%">
      <el-form :model="friend" :rules="rules" ref="dialogForm">
        <el-form-item label="名称" prop="name" label-width="80px">
          <el-input v-model="friend.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="path" label-width="80px">
          <el-input v-model="friend.path" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer" v-show="mode==='添加友情链接' || mode==='编辑友情链接'">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getFriend,
  delFriend,
  Ediltdetailfl,
  saveFriend
} from "@/api/index.js";
export default {
  data() {
    return {
      mode: "",
      tableData: [],
      dialogVisible: false,
      navmenu: { name: "", path: "" },
      friend: {
        name: "",
        path: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        path: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addfriend() {
      this.dialogVisible = true;
      this.mode = "添加友情链接";
    },
    //清楚弹框内容
    handleCloseModal() {
      this.friend = {
        name: "",
        path: ""
      };
      // 对整个表单进行重置
      this.$refs.dialogForm.resetFields();
    },
    save() {
      //   console.log(this.$refs);
      this.$refs.dialogForm.validate(async valid => {
        if (valid) {
          let res = await saveFriend(this.friend);
          if (res.data.success) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.getFriend();
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
    async getFriend() {
      let res = await getFriend();
      console.log(res.data);
      this.tableData = res.data;
    },

    async handleEdilt(rowData) {
      this.dialogVisible = true;
      this.mode = "编辑友情链接";
      let res = await Ediltdetailfl(rowData.id);
      this.friend = res.data;
      console.log(res);
    },
    // 删除
    async handleDelete(rowData) {
      await this.$confirm(
        `此操作将永久删除${rowData.name}`,
        "是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      );
      let res = await delFriend(rowData.id);
      if (res.data.success) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.getFriend();
      } else {
        this.$message({
          type: "error",
          message: "删除失败!"
        });
      }
    }
  },

  created() {
    this.getFriend();
  }
};
</script>

<style scoped>
</style>