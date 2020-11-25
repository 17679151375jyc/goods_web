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
      <el-form-item label="账号ID：">
        <el-input
          disabled
          size="small"
          class="input_css"
          v-model="form.accountId"
          placeholder="请输入账号"
        />
      </el-form-item>
      <el-form-item label="账号状态：">
        <el-input
          disabled
          size="small"
          class="input_css"
          :value="getStatus(form.status)"
          placeholder="请输入账号"
        />
      </el-form-item>
      <el-form-item label="账号身份：" prop="userType">
        <el-select
          v-model="form.userType"
          placeholder="请选择"
          class="input_css"
          size="small"
          :disabled="Isreadonly || form.accountId === '000001'"
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
          :disabled="Isreadonly"
          size="small"
          class="input_css"
          v-model="form.account"
          placeholder="请输入账号"
        />
      </el-form-item>

      <el-form-item label="密码：" prop="password">
        <el-input
          :disabled="Isreadonly"
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
          :disabled="Isreadonly"
          v-model="form.accountName"
          placeholder="请输入持有者"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话号码：" prop="accountPhone">
        <el-input
          :disabled="Isreadonly"
          size="small"
          class="input_css"
          v-model="form.accountPhone"
          placeholder="请输入电话号码"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          :disabled="Isreadonly"
          size="small"
          class="input_css"
          v-model="form.remark"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="dis_row_between_center box_but_css">
      <el-button :loading="loading" class="but_css" @click="closeClick" round>{{
        butName1
      }}</el-button>
      <el-button
        class="but_css"
        type="primary"
        @click="comfirm"
        round
        :loading="loading"
        >{{ butName2 }}</el-button
      >
    </div>
  </div>
</template>

<script>
import { storage_get } from "@/common/storage.js";
import { addUser, detailUser, editUser } from "@/axios/api";
export default {
  name: "",
  data() {
    return {
      butName1: "返回",
      butName2: "编辑",
      Isreadonly: false,
      loading: false,
      accountId: null,
      form: {
        // userType: "4",
        // status: "1",
        // account: "",
        // password: "",
        // accountName: "",
        // accountPhone: "",
        // remark: "",
        // createName: storage_get("userdata").accountName,
      },
    };
  },
  methods: {
    getStatus(value) {
      let statuaName = value === "0" ? "禁用" : "正常";
      return statuaName;
    },
    //获取数据
    getData() {
      detailUser(this.accountId).then((res) => {
        if (res.code === 0) {
          this.form = res.data;
          this.Isreadonly = true;
        }
      });
    },
    comfirm() {
      let that = this;
      if (that.butName2 === "编辑") {
        that.Isreadonly = false;
        that.butName1 = "取消";
        that.butName2 = "确认编辑";
      } else {
        that.form.updateName = storage_get("userdata").accountName;
        delete that.form.updateTime;
        delete that.form.createTime;
        editUser(that.form)
          .then((res) => {
            if (res.code === 0) {
              that.$message({
                type: "success",
                message: "账号编辑成功!",
                customClass: "myalert_css1",
              });
              that.Isreadonly = true;
              that.loading = false;
              that.butName1 = "返回";
              that.butName2 = "编辑";
              that.$emit("comfirm");
            }
          })
          .catch((err) => {
            that.$message({
              type: "error",
              message: "账号编辑失败!",
              customClass: "myalert_css1",
            });
            that.loading = false;
          });
      }
    },
    closeClick() {
      if (this.butName1 === "返回") {
        this.butName2 = "编辑";
        this.$router.back();
        return;
      }
      this.butName1 = "返回";
      this.butName2 = "编辑";
      this.getData();
    },
  },
  created() {
    this.accountId = this.$route.query.accountId;
    this.getData();
  },
};
</script>
<style scoped>
>>>.el-input.is-disabled .el-input__inner{
    color: #555;
}
>>> .el-form-item {
  margin-bottom: 3.5vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.input_css {
  width: 65vw;
  height: 9vw;
}
.box_but_css {
  position: fixed;
  bottom: 0;
  height: 15vw;
  width: 92vw;
  padding: 0 4vw;
  background-color: #fafafa;
  z-index: 10000;
  border-top: 1px solid #e7e7e8;
  font-size: 3.74vw;
}
.but_css {
  width: 50%;
}
.but1_css {
  width: 50%;
  margin: 3vw 0 0 0;
}
.form-css {
  width: 96vw;
  padding: 0 2vw;
  margin: 2vw auto;
}
</style>