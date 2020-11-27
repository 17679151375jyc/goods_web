<template>
  <div class="page_css">
    <el-form
      label-width="25vw"
      :inline="true"
      :model="form"
      ref="formData"
      :rules="addrules"
      class="demo-form-inline form-css"
    >
      <el-form-item label="账号身份：" prop="userType">
        <el-select
          v-model="form.userType"
          placeholder="请选择"
          class="input_css"
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
          size="small"
          class="input_css"
          v-model="form.account"
          placeholder="请输入账号"
        />
      </el-form-item>

      <el-form-item label="密码：" prop="password">
        <el-input
          size="small"
          class="input_css"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="持有者：" prop="accountName">
        <el-input
          size="small"
          class="input_css"
          v-model="form.accountName"
          placeholder="请输入持有者"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话号码：" prop="accountPhone">
        <el-input
          size="small"
          class="input_css"
          v-model="form.accountPhone"
          placeholder="请输入电话号码"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          size="small"
          class="input_css"
          v-model="form.remark"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="dis_column_center_center box_but_css">
          <el-button
            class="but_css but_color_css"
            type="primary"
            @click="comfirm"
            round
            :loading="loading"
            >确认添加</el-button
          >
          <el-button class="but1_css" @click="$router.back()" round
            >返回</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { storage_get } from "@/common/storage.js";
import { addUser } from "@/axios/api";
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
  methods: {
    comfirm() {
      let that = this;
      this.$refs["formData"].validate(async (valid) => {
        if (valid) {
          console.log(this.form);
          addUser(this.form)
            .then((res) => {
              that.loading = false;
              if (res.code === 0) {
                that.$message({
                  type: "success",
                  message: "新账号添加成功!",
                  customClass: "myalert_css1",
                });
                that.loading = false;
                that.$router.back();
              }
            })
            .catch((err) => {
              that.$message("新增失败!");
              that.loading = false;
            });
        }
      });
    },
  },
};
</script>
<style scoped>
>>> .el-form-item {
  margin-bottom: 3.5vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
>>>#shenfen .el-input__suffix{
  right: 40px!important;
}
.input_css {
  width: 65vw;
  height: 9vw;
}
.box_but_css {
  width: 90vw;
}
.but_css {
  width: 100%;
}
.but1_css {
  width: 100%;
  margin: 3vw 0 0 0;
}
.form-css {
  width: 96vw;
  padding: 0 2vw;
  margin: 2vw auto;
}
</style>