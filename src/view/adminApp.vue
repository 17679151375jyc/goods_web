<template>
  <div class="page_css">
    <div class="dis_row_between_center my_box">
      <div class="dis_row_between_center" style="width: 26vw">        
        <span @click="$router.back()"><i class="iconfont iconzuo"></i></span>
        <span>{{ userTypeList[Number(userData.userType)].name }}</span>
      </div>
      <span @click="resetForm"><i class="iconfont iconshuaxin"></i>刷新</span>
      <span @click="addPath"><i class="el-icon-plus"></i> 添加账号</span>
    </div>

    <div class="sousuo_css">
      <div @click="searchShow = true" v-if="form.account || form.accountPhone">
        <span v-if="form.account" class="span_sou_css">{{ form.account }}</span>
        <span>-</span>
        <span v-if="form.accountPhone" class="span_sou_css">{{
          form.accountPhone
        }}</span>
      </div>
      <span v-else @click="searchShow = true">点击搜索</span>
    </div>
    <table class="table_width_css">
      <tr style="background-color: #fafafa">
        <td style="width: 8vw">序号</td>
        <td>账号</td>
        <td style="width: 24vw">手机号</td>
        <td style="width: 15vw">持有者</td>
      </tr>
      <tr v-if="data.length === 0 && !loading">
        <td colspan="5">暂无数据</td>
      </tr>
      <tbody v-if="data.length > 0">
        <tr
          v-for="(item, index) in data"
          :key="index"
          @touchstart="start(item)"
          @touchend="end(item)"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ item.account }}</td>
          <td>{{ item.accountPhone }}</td>
          <td>{{ item.accountName }}</td>
        </tr>
      </tbody>
      <tr v-if="loading">
        <td colspan="4">加载中...</td>
      </tr>
      <tr
        v-if="pagination.total !== data.length && !loading"
        @click="pageClick"
      >
        <td colspan="5">点击加载更多</td>
      </tr>
    </table>
    <div class="mengceng_css dis_row_center_center" v-if="searchShow">
      <div class="neirong_box_css">
        <span class="cha_css">账号查询</span>
        <el-form
          ref="formData"
          label-width="20vw"
          :inline="true"
          :model="dataForm"
          class="demo-form-inline"
        >
          <el-form-item label="账号：">
            <el-input
              clearable
              v-model="dataForm.account"
              placeholder="请输入账号"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input
              clearable
              v-model="dataForm.accountPhone"
              placeholder="请输入手机号"
              size="small"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="button_css but_color_css" @click="search"
          >确认搜索</el-button
        >
        <div class="dis_row_between_center button_css">
          <el-button class="bottom_but_css" plain @click="searchShow = false"
            >关闭</el-button
          >
          <el-button class="bottom_but_css but_color_css" plain @click="resetForm"
            >重置</el-button
          >
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getUserInfo, delUser, editUser } from "@/axios/api";
import { storage_get } from "@/common/storage.js";
export default {
  name: "",
  data() {
    return {
      userData: {},
      pagination: {
        page: 1,
        size: 50,
        total: 0,
      },
      dataForm: {
        account: "",
        accountPhone: "",
      },
      data: [],
      searchShow: false,
      loading: false,
      form: {
        account: "",
        accountPhone: "",
      },
      loop: null,
      time: 0,
    };
  },
  methods: {
    search() {
      this.data = [];
      this.searchShow = false;
      this.pagination.page = 1;
      this.form.account = this.dataForm.account;
      this.form.accountPhone = this.dataForm.accountPhone;
      this.getData();
    },
    //重置
    resetForm() {
      this.data = [];
      this.pagination.page = 1;
      this.form.account = "";
      this.form.accountPhone = "";
      this.dataForm = {
        account: "",
        accountPhone: "",
      };
      this.searchShow = false;
      this.getData();
    },
    //删除账号
    delAccount(row) {
      let that = this;
      console.log(row.userType);
      if (row.accountId === "000001") {
        that.$message({
          type: "warning",
          message: "该账号不可删除！",
          customClass: "myalert_css1",
        });
        return;
      }
      that
        .$confirm(`确定要删除【${row.accountName}】的账号【${row.account}】吗？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          customClass: "el-message-box1",
        })
        .then(() => {
          delUser(row.accountId).then((res) => {
            if (res.code === 0) {
              that.$message({
                type: "success",
                message: "删除成功!",
                customClass: "myalert_css1",
              });
            }
            this.pagination.page = 1;
            that.data = [];
            that.getData();
          });
        })
        .catch((err) => {});
    },
    //长按事件
    start(row) {
      let that = this;
      this.loop = setTimeout(() => {
        that.time = 1;
        that.delAccount(row);
      }, 600);
    },
    //模拟点击
    end(row) {
      clearTimeout(this.loop);
      if (this.time === 0) {
        let accountId = row.accountId;
        this.addAdminShow = true;
        this.$router.push({ path: "/indexApp/adminApp/accountEdit", query: { accountId } });
      }
      this.time = 0;
    },
    //跳转到添加账号
    addPath() {
      this.$router.push({ path: "/indexApp/addApp" });
    },
    getData() {
      this.loading = true;
      this.form.size = this.pagination.size;
      this.form.current = this.pagination.page;
      getUserInfo(this.form)
        .then((res) => {
          this.loading = false;
          if (res.code === 0) {
            this.pagination.total = res.data.total;
            this.data = this.data.concat(res.data.records);
          }
        })
        .catch((err) => {
          this.data = [];
        });
    },
    //分页
    pageClick() {
      this.pagination.page = this.pagination.page + 1;
      this.getData();
    },
  },
  created() {
    this.userData = storage_get("userdata");
    this.getData();
  },
};
</script>
<style scoped>
.my_box {
  width: 94vw;
  height: 6vw;
  background-color:  #FB1099;
  padding: 3vw;
  text-align: right;
  font-size: 3.74vw;
  color: #fff;
}
.table_width_css {
  width: calc(100vw - 15px);
  border-collapse: collapse;
  margin: 2vw auto;
  margin-bottom: 20vw;
}
.table_width_css td {
  border: 1px solid #cbcbcb;
  height: 8vw;
  font-size: 3.7vw;
  padding: 1vw 2vw;
  word-break: break-all;
  text-align: center;
  color: #555;
	user-select:none;
	-webkit-touch-callout:none;  /*系统默认菜单被禁用*/
	-webkit-user-select:none; /*webkit浏览器*/
	-khtml-user-select:none; /*早期浏览器*/
	-moz-user-select:none; /*火狐*/
	-ms-user-select:none;  /*IE10*/
}
.sousuo_css {
  width: 100vw;
  height: 7vw;
  text-align: center;
  color: #000;
  padding: 2vw 0;
  border-bottom: 1px solid #FB1099;
  background-color: #FDDBEF;
}
.mengceng_css {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 3000;
  background: rgba(0, 0, 0, 0.5);
}
.neirong_box_css {
  width: 80vw;
  height: 95vw;
  background-color: #fff;
  margin: 0 auto;
  padding: 2vw;
  border-radius: 4vw;
}
.cha_css {
  width: 100%;
  border-bottom: 1px solid #e7e7e7;
  margin: 3vw auto;
  display: block;
  height: 10vw;
  text-align: center;
}
.button_css {
  width: 72vw;
  margin: 1vw 4vw;
  margin-bottom: 3vw;
  border-radius: 10vw;
  font-size: 3.74vw;
}
.bottom_but_css {
  border-radius: 10vw;
  width: 35vw;
}
</style>