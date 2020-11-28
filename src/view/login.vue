<template>
  <div class="div_page">
    <div class="dis_row_center_center puple_css">
      <img :src="require('@/img/logo.png')" class="img_css" />
      <el-form ref="form" :model="form" label-width="80px" :rules="addrules">
        <el-form-item>
          <div class="title_css">JYCYL商品仓库</div>
        </el-form-item>
        <el-form-item label="账号：" prop="account">
          <el-input
            @keyup.enter.native="onSubmit"
            clearable
            maxlength="20"
            style="width: 250px"
            placeholder="请输入账号"
            v-model="form.account"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码：" prop="password">
          <el-input
            clearable
            @keyup.enter.native="onSubmit"
            type="password"
            maxlength="20"
            placeholder="请输入密码"
            style="width: 250px"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="dis_row_between_center" style="width: 100%">
            <el-button
              style="width: 45%"
              :loading="loading"
              @click="youkeClick"
              >游客</el-button
            >
            <el-button
              style="width: 45%"
              :loading="loading"
              type="primary"
              @click="onSubmit"
              >登录</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/axios/api";
import { storage_set, storage_get } from "@/common/storage.js";
export default {
  name: "",
  data() {
    return {
      loading: false,
      form: {
        account: "",
        password: "",
      },
    };
  },
  created() {
    console.log(storage_get("userdata"));
    this.form = {
      account: storage_get("userdata").account,
      password: storage_get("userdata").password,
    };
  },
  methods: {
    youkeClick(){
      let data = {
        accountId: 'youke12321',
        accountName: "游客",
        userType: "5",
        accountPhone: null,
        account: null
      }
      storage_set("userdata", data);
      this.$router.push({ path: "/index" });
    },
    onSubmit() {
      let that = this;
      that.$refs["form"].validate(async (valid) => {
        if (valid) {
          let data = {
            account: that.form.account,
            password: that.form.password,
          };
          that.loading = true;
          login(data)
            .then((res) => {
              if (res.code === 0) {
                storage_set("userdata", res.data);
                that.$router.push({ path: "/index" });
                that.$message({
                  type: "success",
                  message: "登录成功!",
                  duration: 1000,
                });
              } else {
                that.loading = false;
                that.$message.error(res.msg);
              }
            })
            .catch((err) => {
              this.loading = false;
              this.$message.error("登陆失败！");
            });
        }
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
.title_css {
  font-size: 27px;
  font-weight: bold;
  color: #38f;
}
</style>