<template>
  <div class="div_page">
    <div class="dis_row_center_center puple_css">
      <img :src="require('@/img/logo.png')" class="img_css" />
      <el-form ref="form" :model="form" label-width="80px" :rules="addrules">
        <el-form-item>
          <div class="title_css">JYCYL货源管理系统</div>
        </el-form-item>
        <el-form-item label="账号：" prop="account">
          <el-input
            clearable
            maxlength="12"
            style="width: 250px"
            placeholder="请输入账号"
            v-model="form.account"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码：" prop="password">
          <el-input
            clearable
            type="password"
            maxlength="12"
            placeholder="请输入密码"
            style="width: 250px"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            :loading="loading"
            type="primary"
            @click="onSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/axios/api";
export default {
  name: "",
  data() {
    return {
      loading: false,
      form: {
        account: "jyc123",
        password: "q123456",
      },
    };
  },
  methods: {
    onSubmit() {
      let that = this;
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          let data = {
            account: this.form.account,
            password: this.form.password,
          };
          this.loading = true;
          login(data)
            .then((res) => {     
              this.$router.push({ path: "/index" });
              this.$message({
                type: "success",
                message: "登录成功!",
              });
            })
            .catch((err) => {
              this.loading = false;
              this.$message.error("登陆失败！");
              this.$router.push({ path: "/index" });
            });
        }
      });
    },
  },
  created() {},
};
</script>
<style scoped>
.div_page {
  width: 100vw;
  height: 100vh;
  background: url("~@/img/login.png");
}
.puple_css {
  width: 500px;
  height: 300px;
  position: fixed;
  left: calc(50% - 250px);
  top: 220px;
}
.img_css {
  width: 150px;
  margin-top: -30px;
}
.title_css {
  font-size: 27px;
  font-weight: bold;
  color: #38f;
}
</style>