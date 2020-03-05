<template>
  <div>
  
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="realname" label="姓名" width="180"></el-table-column>
      <el-table-column prop="tel" label="电话"></el-table-column>
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
  </div>
</template>

<script>

import { getShitingList, getShitingCount, delShiting } from "@/api/index.js";
export default {
 
  methods: {
    async getShitingList() {
      this.getShitingCount();
      let res = await getShitingList(this.pageIndex,this.pageSize);
      // console.log(res.data);
      this.tableData = res.data;
    },
    async getShitingCount() {
      let res = await getShitingCount();
      console.log(res)
      this.count = res.data.count;
    },
    handleDetail(rowData) {
      // console.log(rowData.id);
    },
    // 删除
    async handleDelete(rowData) {
      await this.$confirm(
        `此操作将永久删除${rowData.realname}`,
        "是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      );
      let res = await delShiting(rowData.id);
      if (res.data.success) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.getShitingList();
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
      pageIndex:1,
      pageSize:10
    };
  },
  created() {
    this.getShitingList()
  },
  watch: {
    pageIndex(){
      this.getShitingList(this.pageIndex,this.pageSize)
    }
  },
};
</script>

<style scoped>
</style>