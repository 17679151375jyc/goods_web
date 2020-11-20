<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="show"
      width="500px"
      top="50px"
      :append-to-body="true"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form
        label-width="120px"
        :inline="true"
        :model="form"
        ref="formData"
        :rules="addrules"
        class="demo-form-inline"
      >
        <el-form-item label="账号身份：" prop="level">
          <el-select
            clearable
            v-model="form.level"
            placeholder="请选择账号身份"
            style="width: 220px"
            size="small"
          >
            <el-option
              v-for="item in levelList"
              :key="item.level"
              :label="item.name"
              :value="item.level"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号：" prop="account">
          <el-input
            clearable
            v-model="form.account"
            placeholder="请输入账号"
            size="small"
            maxlength="12"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            clearable
            v-model="form.password"
            placeholder="请输入密码"
            style="width: 220px"
            size="small"
            maxlength="12"
          ></el-input>
        </el-form-item>
        <el-form-item label="持有者：" prop="accountName">
          <el-input
            clearable
            v-model="form.accountName"
            style="width: 220px"
            placeholder="请输入持有者"
            size="small"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input
            clearable
            v-model="form.phone"
            style="width: 220px"
            placeholder="请输入手机号"
            size="small"
            maxlength="12"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            clearable
            rows="4"
            resize="none"
            show-word-limit
            style="width: 220px"
            maxlength="35"
            v-model="form.remark"
            placeholder="请输入备注"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">关闭</el-button>
        <el-button size="small" type="primary" @click="comfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      form: {
        id: "",
        level: "",
        account: "",
        password: "",
        accountName: "",
        phone: "",
        remark: "",
      },
    };
  },
  props: {
    show: { default: false },
    title: { default: "添加账号" },
  },
  watch: {
    show: function (val, oldVal) {
      if (val) {
        this.getData();
      }
    },
  },
  methods: {
    getData() {},
    //关闭按钮
    handleClose() {
      this.$emit("handleClose");
    },
    //确定按钮
    comfirm() {
      console.log(this.form);
      let that = this;
      this.$refs["formData"].validate(async (valid) => {
        if (valid) {
          this.$message({
            type: "success",
            message: "新账号添加成功!",
          });
          this.$emit("comfirm");
        }
      });
    },
  },
};
</script>
<style scoped>
>>> .el-form-item {
  display: block;
}
.but_box_css {
  width: 100%;
  height: 50px;
}
.footer {
  padding: 15px 20px 10px 30px;
  text-align: right;
}
</style>