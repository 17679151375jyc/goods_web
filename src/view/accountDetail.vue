<template>
  <div>
    <el-dialog
      title="账号详情"
      :visible.sync="show"
      width="500px"
      top="50px"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <el-form
        label-width="130px"
        :inline="true"
        :model="form"
        ref="formData"
        class="demo-form-inline"
      >
        <el-form-item label="账号编号：">
          <div class="div_width">{{form.accountId}}</div>
        </el-form-item>
        <el-form-item label="账号身份：">
          <div class="div_width">{{form.userType?userTypeList[Number(form.userType)].name:'未知身份'}}</div>
        </el-form-item>
        <el-form-item label="账号状态：">
          <div class="div_width">{{form.status === "0"?'禁用':'正常'}}</div>
        </el-form-item>
        <el-form-item label="账号：">
          <div class="div_width">{{form.account}}</div>
        </el-form-item>
        <el-form-item label="密码：">
          <div class="div_width">{{form.password}}</div>
        </el-form-item>
        <el-form-item label="持有人：">
          <div class="div_width">{{form.accountName}}</div>
        </el-form-item>
        <el-form-item label="电话号码：">
          <div class="div_width">{{form.accountPhone}}</div>
        </el-form-item>
        <el-form-item label="创建时间：">
          <div class="div_width">{{form.createTime}}</div>
        </el-form-item>
        <el-form-item label="备注：">
          <div class="div_width">{{form.remark}}</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { detailUser } from "@/axios/api";
export default {
  name: "",
  data() {
    return {
      form: {},
    };
  },
  props: {
    show: { default: false },
    accountId: { default: "" },
  },
  watch: {
    show: function (val, oldVal) {
      if (val) {
        this.getData();
      }
    },
  },
  methods: {
    //获取数据
    getData() {
      detailUser(this.accountId).then((res) => {
        if (res.code === 0) {
          this.form = res.data;
        }
      });
    },
    //关闭按钮
    handleClose() {
      this.$emit("handleClose");
    },
  },
};
</script>
<style scoped>
>>> .el-dialog__body {
  padding-top: 0;
}
>>> .el-form-item {
  margin-bottom: 5px;
}
.div_width {
  width: 200px;
}
</style>