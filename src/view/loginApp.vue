<template>
  <div>
    <div class="dis_column_center_center box_loginPage_css">
      <img class="logo_css" :src="require('@/img/logo.png')" alt="" />
      <div class="title_css">JYCYL商品仓库</div>
      <div class="dis_column_center_center input_box_css">
        <el-form ref="form" :model="form" label-width="21vw" :rules="addrules">
          <el-form-item label="账号：" prop="account">
            <el-input
              clearable
              maxlength="20"
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
              maxlength="20"
              placeholder="请输入密码"
              show-password
              class="input_css"
              @keyup.enter.native="onSubmit"
            ></el-input>
          </el-form-item>
          <div class="but_box_css">
            <div class="dis_row_between_center" style="width: 100%">
              <el-button
                :loading="loading"
                style="width: 47%"
                @click="youkeClick"
                >游客</el-button
              >
              <el-button
                type="primary"
                :loading="loading"
                style="width: 47%"
                @click="onSubmit"
                >登录</el-button
              >
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/axios/api";
import { storage_set, storage_get, storage_remove } from "@/common/storage.js";
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
    youkeClick(){
      let data = {
        accountId: 'youke12321',
        accountName: "游客",
        userType: "5",
        accountPhone: null,
        account: null
      }
      storage_remove('goodsType');
      storage_set("userdata", data);
      this.$router.push({ path: "/indexApp" });
    },
    onSubmit() {
      let that = this;
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          storage_remove('goodsType');
          let data = {
            account: that.form.account,
            password: that.form.password,
          };
          that.loading = true;
          login(data)
            .then((res) => {
              if (res.code === 0) {
                storage_set("userdata", res.data);
                that.$router.push({ path: "/indexApp" });
                that.$message({
                  type: "success",
                  message: "登录成功!",
                  duration: 1000,
                  customClass: "myalert_css",
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
  created() {
    if (storage_get("userdata")) {
      this.form = {
        account: storage_get("userdata").account,
        password: storage_get("userdata").password,
      };
    }
  },
};
</script>
<style scoped>
>>> .el-input__inner {
  height: 10vw;
  line-height: 10vw;
}
>>> label {
  border: 1px solid #dcdfe6;
  height: 10vw;
  line-height: 10vw;
}
>>> .el-form-item__content {
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
.title_css {
  width: 100%;
  font-size: 5vw;
  font-weight: bold;
  color: #38f;
  text-align: center;
  margin-top: 3vw;
}
</style>