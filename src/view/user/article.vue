<template>
  <div>
    <el-button
      icon="el-icon-circle-plus-outline"
      type="primary"
      style="margin:10px 0;"
   class="addarticle"
    >添加文章</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="sectionname" label="所属分类"></el-table-column>
      <el-table-column prop="username" label="作者"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button
            @click="handleDetail(row)"
            plain
            icon="el-icon-search"
            size="mini"
            type="primary"
          >详情</el-button>
          <el-button icon="el-icon-edit" size="mini" plain type="warning">编辑</el-button>
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
    <!-- 富文本 -->
  </div>
</template>

<script>


import { getArticlelist,delarticle } from "@/api/index.js";
export default {

  methods: {
    async getArticlelist() {
      let res = await getArticlelist(this.pageIndex, this.pageSize);
      // console.log(res.data);
      this.tableData = res.data;
    },

    handleDetail(rowData) {
      console.log(rowData.id);
    },
    // 删除
    async handleDelete(rowData) {
      await this.$confirm(
        `此操作将永久删除${rowData.title}`,
        "是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      );
        let res = await delarticle(rowData.id);
        if (res.data.success) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getArticlelist();
        } else {
          this.$message({
            type: "error",
            message: "删除失败!"
          });
        }
    }
  },

  data() {
    return {
      tableData: [],
      count: 0,
      pageIndex: 1,
      pageSize: 10
    };
  },
  created() {
    this.getArticlelist();
  },
  watch: {
    pageIndex() {
      this.getArticlelist(this.pageIndex, this.pageSize);
    }
  }
};
</script>

<style scoped>

</style>