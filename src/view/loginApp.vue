<template>
  <div>
    <div class="dis_column_center_center box_loginPage_css">
      <img class="logo_css" :src="require('@/img/logo.png')" alt="" />
      <div class="dis_column_center_center input_box_css">
        <el-form ref="form" :model="form" label-width="21vw" :rules="addrules">
          <el-form-item label="账号：" prop="account">
            <el-input
              clearable
              maxlength="12"
              v-model="form.account"
              placeholder="请输入账号"
              class="input_css"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input
              clearable
              v-model="form.password"
              type="password"
              maxlength="12"
              placeholder="请输入密码"
              show-password
              class="input_css"
            ></el-input>
          </el-form-item>
          <div class="but_box_css">
            <el-button
              type="primary"
              :loading="loading"
              style="width: 100%"
              @click="onSubmit"
              >登录</el-button
            >
          </div>
        </el-form>
      </div>
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
      form: {
        account: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    onSubmit() {
      let that = this;
      this.$refs["form"].validate(async (valid) => {
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
                storage_set("accountinfo", data);
                that.$router.push({ path: "/indexApp" });
                that.$message({
                  type: "success",
                  message: "登录成功!",
                  duration: 1000,
                  customClass: 'myalert_css'
                });
              } else {
                that.loading = false;
                that.$message.error(res.msg);
              }
            })
            .catch((err) => {
              that.loading = false;
              that.$message.error("登陆失败！");
            });
        }
      });
    },
  },
  created(){
    if(storage_get('accountinfo')){
      this.form = {
        account: storage_get('accountinfo').account,
        password: storage_get('accountinfo').password,
      }
    }    
  }
};
</script>
<style scoped>
>>> .el-input__inner{
  height: 10vw;
  line-height: 10vw;
}
>>> label{
  border: 1px solid #DCDFE6;
  height: 10vw;
  line-height: 10vw;
}
>>>.el-form-item__content{
  height: 10vw;
  line-height: 10vw;
}
>>> .el-form-item {
  margin-bottom: 5vw;
}
.box_loginPage_css {
  width: 96vw;
  margin: 0 auto;
  margin-top: 10vw;
}
.logo_css {
  width: 35vw;
  height: 38vw;
}
.input_box_css {
  margin-top: 10vw;
}
.input_css {
  width: 60vw;
}
.but_box_css {
  width: 81vw;
  margin: 10vw auto;
}
</style>