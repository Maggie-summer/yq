<template>
    <div>
         <el-button
      icon="el-icon-circle-plus-outline"
      type="primary"
      style="margin:10px 0;"
      @click="addlesson"
    >添加课程</el-button>
           <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="pname" label="所属分类"></el-table-column>

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
    <!-- 弹框 -->
    <el-dialog :title="mode" @close="handleCloseModal" :visible.sync="dialogVisible" width="30%">
      <el-form :model="lesson" :rules="rules" ref="dialogForm">
        <el-form-item label="名称" prop="name" label-width="80px">
          <el-input v-model="lesson.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属分类" prop="name" label-width="80px">
          <el-select v-model="lesson.name" placeholder="请选择">
        <el-option label="" value="雅思"></el-option>
        <el-option label="" value="托福"></el-option>
      </el-select>
          <!-- <el-input v-model="lesson.pname" autocomplete="off"></el-input> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-show="mode==='添加课程' || mode==='编辑课程'">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save" >保 存</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
import { getSubject,delSubject,savesubject,Ediltsubject} from "@/api/index.js";
export default {
 
  data() {
    return {
      mode:"",
      tableData: [],
      dialogVisible: false,
      navmenu: { name: "", creator: "" },
      lesson:{
        name:'',
        pname:''
      },
       rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ]
      }

    };
  },
  created() {
    this.getSubject()
  },
  methods: {

    addlesson(){
      this.dialogVisible=true
      this.mode ="添加课程"
    },
      //清楚弹框内容
    handleCloseModal() {
      this.lesson = {
        name:'',
        pname:''
      };
      // 对整个表单进行重置
      this.$refs.dialogForm.resetFields();
    },
      save() {
      //   console.log(this.$refs);
      this.$refs.dialogForm.validate(async valid => {
        if (valid) {
          let res = await savesubject(this.lesson);
          if (res.data.success)
          {
       
            this.$message({
              message: "保存成功！",
              type: "success"
            });
             this.getSubject()     
          }
          else {
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
    async getSubject() {
      let res = await getSubject();
      // console.log(res.data);
      this.tableData = res.data;
    },
      // 详情
     async handleDetail(rowData) {
      this.dialogVisible = true;
      this.mode = `${rowData.name}的详情`;
      // console.log(rowData.name)
      let res = await Ediltsubject(rowData.id);
      this.lesson = res.data;
      // console.log(res);
    },
    // 编辑
     async handleEdilt(rowData) {
      this.dialogVisible = true;
      this.mode = "编辑课程";
      let res = await Ediltsubject(rowData.id);
      this.lesson = res.data;
      console.log(res);
    },
    // 删除
    async handleDelete(rowData) {
      await this.$confirm(
        `此操作将永久删除此条数据`,
        "是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      );
        let res = await delSubject(rowData.id);
      if (res.data.success) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.getSubject();
      } else {
        this.$message({
          type: "error",
          message: "删除失败!"
        });
      }
   
    }
  },
};
</script>

<style scoped>


</style>