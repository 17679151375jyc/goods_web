<template>
  <div>
    <el-dialog
      :title="`${title}账号`"
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
        <el-form-item label="账号身份：" prop="userType">
          <el-select
            clearable
            v-model="form.userType"
            placeholder="请选择账号身份"
            style="width: 220px"
            size="small"
          >
            <el-option
              v-for="item in userTypeList"
              :key="item.userType"
              :label="item.name"
              :value="item.userType"
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
            maxlength="20"
            style="width: 225px"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            clearable
            v-model="form.password"
            placeholder="请输入密码"
            style="width: 220px"
            size="small"
            maxlength="20"
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
        <el-form-item label="手机号：" prop="accountPhone" v-if="form.userType!=='5'">
          <el-input
            clearable
            v-model="form.accountPhone"
            style="width: 220px"
            placeholder="请输入手机号"
            size="small"
            maxlength="11"
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
        <el-button size="small" @click="handleClose" :loading="loading"
          >关闭</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="comfirm"
          :loading="loading"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addUser, detailUser, editUser } from "@/axios/api";
import { storage_get } from "@/common/storage.js";
export default {
  name: "",
  data() {
    return {
      loading: false,
      form: {
        userType: "4",
        status: "1",
        account: "",
        password: "",
        accountName: "",
        accountPhone: "",
        remark: "",
        createName: storage_get("userdata").accountName,
      },
    };
  },
  props: {
    show: { default: false },
    title: { default: "添加" },
    accountId: { default: "" },
  },
  watch: {
    show: function (val, oldVal) {
      if (val) {
        if (this.title === "编辑") {
          this.getData();
        } else {
          this.$nextTick(() => {
            this.$refs["formData"].resetFields();
          });
        }
      }
    },
  },
  methods: {
    storage_get,
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
    //确定按钮
    comfirm() {
      let that = this;
      this.$refs["formData"].validate(async (valid) => {
        if (valid) {
          that.loading = true;
          if (that.title === "添加") {
            addUser(that.form)
              .then((res) => {
                that.loading = false;
                if (res.code === 0) {
                  that.$message({
                    type: "success",
                    message: "新账号添加成功!",
                  });
                  that.loading = false;
                  that.$emit("comfirm");
                }
              })
              .catch((err) => {
                that.$message("新增失败!");
                that.loading = false;
              });
          } else {
            this.form.updateName = storage_get("userdata").accountName;
            delete this.form.updateTime;
            delete this.form.createTime;
            editUser(this.form)
              .then((res) => {
                if (res.code === 0) {
                  that.$message({
                    type: "success",
                    message: "账号编辑成功!",
                  });
                  that.loading = false;
                  that.$emit("comfirm");
                }
              })
              .catch((err) => {
                that.$message("编辑失败!");
                that.loading = false;
              });
          }
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