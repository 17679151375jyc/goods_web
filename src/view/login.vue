<template>
  <div class="div_page">
    <div class="dis_row_center_center puple_css">
      <img :src="require('@/img/logo.png')" class="img_css" />
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号：">
          <el-input
            clearable
            maxlength="12"
            style="width: 250px"
            placeholder="请输入账号"
            v-model="form.name"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码：">
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
          <el-button style="width: 100%" type="primary" @click="onSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$router.push({ path: "/index" });
      this.$message({
        type: "success",
        message: "登录成功!",
      });
    },
  },
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
</style>