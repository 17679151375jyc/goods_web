<template>
  <div>
    <el-dialog
      title="添加账号"
      :visible.sync="show"
      width="500px"
      top="50px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form
        label-width="120px"
        :inline="true"
        :model="form"
        ref="formData"
        class="demo-form-inline"
      >
        <el-form-item label="账号级别：">
          <el-select
            v-model="form.level"
            placeholder="请选择账号级别"
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
        <el-form-item label="账号：">
          <el-input
            v-model="form.account"
            placeholder="请输入账号"
            size="small"
            maxlength="12"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input
            v-model="form.account"
            placeholder="请输入密码"
            style="width: 220px"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input
            v-model="form.phone"
            style="width: 220px"
            placeholder="请输入手机号"
            size="small"
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
        phone: "",
      },
    };
  },
  props: {
    show: { default: false },
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
      this.$emit("comfirm");
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