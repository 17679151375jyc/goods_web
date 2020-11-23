<template>
  <div>
    <div class="dis_row_between_center my_box">
      <span
        ><i class="iconfont icongerenmingpian"></i>
        {{ userTypeList[Number(userData.userType)].name }}</span
      >
      <span class="phone_css"
        >{{ userData.accountName }} / {{ userData.accountPhone }}</span
      >
    </div>
    <div class="dis_row_between_center my_box">
      <span class="phone_css" @click="logouts"
        ><i class="iconfont icon084tuichu"></i>退出</span
      >
      <el-button size="mini" plain v-if="false">账号管理</el-button>
      <el-button size="mini" plain v-else @click="caigouClick"
        >联系采购</el-button
      >
      <span @click="resetForm"><i class="iconfont iconshuaxin"></i>刷新</span>
    </div>
    <el-tabs
      v-model="form.goodsType"
      @tab-click="handleClick"
      type="border-card"
    >
      <el-tab-pane
        :label="item.goodsTypename"
        :name="item.goodsType"
        v-for="(item, index) in goodsTypeList"
        :key="index"
      >
        <div>
          <div class="sousuo_css">
            <div
              @click="searchShow = true"
              v-if="form.brandName || form.modelName"
            >
              <span v-if="form.brandName">{{ form.brandName }}</span>
              <span v-if="form.brandName && form.modelName">-</span>
              <span v-if="form.modelName">{{ form.modelName }}</span>
            </div>
            <span v-else @click="searchShow = true">点击搜索</span>
          </div>
          <table class="table_width_css">
            <tr>
              <td style="width: 10vw">序号</td>
              <td>品牌</td>
              <td>型号</td>
              <td style="width: 12vw">颜色</td>
              <td style="width: 15vw">拿货价</td>
            </tr>
            <tr v-if="data.length === 0 && !loading">
              <td colspan="5">暂无数据</td>
            </tr>
            <tbody v-if="data.length > 0">
              <tr
                v-for="(item, index) in data"
                :key="index"
                @click="detailClick(item)"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ item.brandName }}</td>
                <td>{{ item.modelName }}</td>
                <td>
                  <span :style="{ 'background-color': item.color }"></span>
                </td>
                <td>
                  {{
                    item[
                      `purchasePrice${
                        userData.userType === "0"
                          ? 0
                          : Number(userData.userType) - 1
                      }`
                    ]
                  }}
                </td>
              </tr>
            </tbody>
            <tr v-if="loading">
              <td colspan="5">加载中...</td>
            </tr>
            <tr
              v-if="pagination.total !== data.length && !loading"
              @click="pageClick"
            >
              <td colspan="5">点击加载更多</td>
            </tr>
          </table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="mengceng_css dis_row_center_center" v-if="searchShow">
      <div class="neirong_box_css">
        <span class="cha_css">货品查询</span>
        <el-form
          ref="formData"
          label-width="20vw"
          :inline="true"
          :model="dataForm"
          class="demo-form-inline"
        >
          <el-form-item label="品牌：">
            <el-input
              clearable
              v-model="dataForm.brandName"
              placeholder="请输入品牌名称"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="型号：">
            <el-input
              clearable
              v-model="dataForm.modelName"
              placeholder="请输入型号名称"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="进货价：">
            <el-input
              clearable
              type="number"
              :maxlength="4"
              v-model="dataForm.purchasePrice"
              placeholder="请输入进货价"
              size="small"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="button_css" @click="search"
          >确认搜索</el-button
        >
        <div class="dis_row_between_center button_css">
          <el-button class="bottom_but_css" plain @click="searchShow = false"
            >关闭</el-button
          >
          <el-button class="bottom_but_css" plain @click="resetForm"
            >重置</el-button
          >
        </div>
      </div>
    </div>
    <span id="spanid">{{wechatMumber}}</span>
  </div>
</template>

<script>
import { storage_get, storage_remove } from "@/common/storage.js";
import { getList, getTypelist } from "@/axios/api";
export default {
  name: "",
  data() {
    return {
      goodsTypeList: [],
      userData: {
        accountName: null,
        userType: null,
        accountPhone: null,
      },
      searchShow: false,
      loading: false,
      pagination: {
        page: 1,
        size: 20,
        total: 0,
      },
      dataForm: {
        brandName: "",
        modelName: "",
        purchasePrice: "",
      },
      form: {
        brandName: "",
        modelName: "",
        goodsType: "",
        purchasePrice0: "",
        purchasePrice1: "",
        purchasePrice2: "",
        purchasePrice3: "",
      },
      data: [],
    };
  },
  methods: {
    //复制微信号
    caigouClick() {
      let txt = "";
      var val = document.getElementById("spanid");
      window.getSelection().selectAllChildren(val);
      document.execCommand("Copy");
      this.$message({
        message: "已复制微信号到剪切板!",
        type: "success",
        duration: 1000,
        customClass: "myalert_css1",
      });
    },
    //退出
    logouts() {
      let that = this;
      this.delLbShow = false;
      that
        .$confirm("確定要退出系统吗吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          customClass: "el-message-box1",
        })
        .then(() => {
          storage_remove("userdata");
          that.$router.replace({ path: "/loginApp" });
          that.$message({
            type: "success",
            message: "退出成功!",
            customClass: "myalert_css",
          });
        })
        .catch(() => {});
    },
    getGoodsTypeList() {
      getTypelist()
        .then((res) => {
          if (res.code === 0) {
            this.goodsTypeList = res.data;
            this.form.goodsType = res.data[0].goodsType;
            this.getData();
          } else {
            this.goodsTypeList = [
              {
                goodsTypename: "其他",
                goodsType: "99",
              },
            ];
          }
        })
        .catch((err) => {
          this.goodsTypeList = [
            {
              goodsTypename: "其他",
              goodsType: "99",
            },
          ];
        });
    },
    //点击搜索
    search() {
      this.searchShow = false;
      this.form.brandName = this.dataForm.brandName;
      this.form.modelName = this.dataForm.modelName;
      this.form[
        `purchasePrice${
          this.userData.userType === "0"
            ? 0
            : Number(this.userData.userType) - 1
        }`
      ] = this.dataForm.purchasePrice;
      this.pagination.page = 1;
      this.data = [];
      this.getData();
    },
    //重置
    resetForm() {
      this.data = [];
      this.pagination.page = 1;
      this.pagination.size = 20;
      this.form.brandName = "";
      this.form.modelName = "";
      this.form.brandName = "";
      this.form.purchasePrice0 = "";
      this.form.purchasePrice1 = "";
      this.form.purchasePrice2 = "";
      this.form.purchasePrice3 = "";
      this.dataForm = {
        brandName: "",
        modelName: "",
        purchasePrice: "",
      };
      this.searchShow = false;
      this.getData();
    },
    //弹出搜索条件
    handleClose() {
      this.handleClose = true;
    },
    //详情
    detailClick(data) {
      this.$router.push({
        path: "/detailApp",
        query: {
          goodsId: data.goodsId,
        },
      });
    },
    //分页
    pageClick() {
      this.pagination.page = this.pagination.page + 1;
      this.getData();
    },
    //获取数据
    getData() {
      let that = this;
      that.loading = true;
      this.form.size = this.pagination.size;
      this.form.current = this.pagination.page;
      getList(this.form).then((res) => {
        that.loading = false;
        if (res.code === 0) {
          if (res.data.records.length > 0) {
            res.data.records.forEach((item) => {
              item.goodsImg = item.goodsImg.split(" ");
            });
            this.pagination.total = res.data.total;
            this.data = this.data.concat(res.data.records);
          } else {
            this.pagination.total = 0;
            this.data = this.data;
          }
        }
      });
    },
    //tab页切换
    handleClick(tab) {
      this.data = [];
      this.pagination.page = 1;
      this.form.goodsType = tab.name;
      this.getData();
    },
  },
  created() {
    if (!storage_get("userdata")) {
      this.$router.replace({ path: "/loginApp" });
    }
    this.userData = storage_get("userdata");
    this.getGoodsTypeList();
  },
};
</script>
<style scoped>
#spanid{
  position: absolute;
  left: -10000px;
}
>>> .el-form-item__label {
  font-size: 3.74vw;
}
>>> .el-message {
  min-width: 70vw !important;
  top: 60vh !important;
}
>>> .el-tabs__header {
  margin: 0;
}
>>> .el-tabs__nav-scroll {
  margin: 0 4vw;
}
>>> .el-tabs__item {
  line-height: 12vw;
}
>>> .el-tabs__nav-prev,
>>> .el-tabs__nav-next {
  line-height: 12vw;
  background-color: #000;
  color: #fff;
  width: 10vw;
  text-align: center;
  font-weight: bold;
  z-index: 100;
}
>>> .el-tabs--border-card {
  border: 0;
}
>>> .el-tabs__item.is-active {
  font-weight: bold;
}
>>> .el-tabs__content {
  padding: 0;
}
>>> .el-input--small .el-input__inner {
  width: 56vw;
}
>>> .el-form-item {
  margin-bottom: 2vw;
}
.table_width_css {
  width: calc(100vw - 15px);
  border-collapse: collapse;
  margin: 2vw auto;
}
.table_width_css td {
  border: 1px solid #cbcbcb;
  height: 8vw;
  font-size: 3.7vw;
  padding: 1vw 2vw;
  word-break: break-all;
  text-align: center;
  color: #555;
}
.table_width_css td span {
  display: block;
  width: 6vw;
  height: 6vw;
  border-radius: 0.8vw;
  margin: 0 auto;
}
.sousuo_css {
  width: 100vw;
  height: 7vw;
  text-align: center;
  color: #38f;
  margin: 2vw 0;
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
.my_box {
  width: 94vw;
  height: 6vw;
  background-color: #000;
  padding: 3vw;
  text-align: right;
  font-size: 3.74vw;
  color: #fff;
}
.my_box span:last-child {
  margin-left: 5vw;
}
.bottom_but_css {
  border-radius: 10vw;
  width: 35vw;
}
</style>