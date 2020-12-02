<template>
  <div>
    <div class="dis_row_between_center my_box" v-if="userData.userType !== '5'">
      <span @click="showStatusClick"
        ><i class="iconfont icongerenmingpian"></i>
        {{ userTypeList[Number(userData.userType)].name }}</span
      >
      <span class="phone_css"
        >{{ userData.accountName }} / {{ userData.accountPhone }}</span
      >
    </div>
    <div class="dis_row_between_center my_box">
      <span class="phone_css" @click="logouts" v-if="userData.userType !== '5'"
        ><i class="iconfont icon084tuichu"></i>退出</span
      >
      <span v-if="userData.userType === '5'" @click="showStatusClick"
        ><i class="iconfont icongerenmingpian" style="margin-right: 0.5vw"></i
        >{{ userData.accountName }}</span
      >
      <div v-if="userData.userType === '0' || userData.userType === '1'">
        <el-button
          size="mini"
          plain
          v-if="userData.userType === '0'"
          @click="accountPath"
          >账号管理</el-button
        >
        <el-button size="mini" plain @click="goodsPath">添加货品</el-button>
      </div>
      <el-button size="mini" plain v-else @click="caigouClick"
        >联系采购</el-button
      >
      <span @click="resetForm"><i class="iconfont iconshuaxin"></i>刷新</span>
    </div>
    <div>
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
            <div class="dis_row_between_center sousuo_css" v-if="data.length>0">                
              <input
                clearable
                v-model="form.goodsName"
                placeholder="请输入货品名称"
                size="small"
                class="input_css"/>
              <span
                type="primary"
                class="button_css"
                @click="search"
                >搜索</span
              >
            </div>
            <div class="sco_css">
              <table class="table_width_css" v-if="showStatus === 'table'">
                <tr>
                  <td style="width: 9vw">序号</td>
                  <td style="width: 13vw">品牌</td>
                  <td>型号</td>
                  <td style="width: 12vw">颜色</td>
                  <td style="width: 15vw">拿货价</td>
                  <td
                    v-if="shows"
                    style="width: 12vw; padding: 1vw; font-size: 3.74vw"
                  >
                    操作
                  </td>
                </tr>
                <tr v-if="data.length === 0 && !loading">
                  <td colspan="6">暂无数据</td>
                </tr>
                <tbody v-if="data.length > 0">
                  <tr v-for="(item, index) in data" :key="index">
                    <td @click="detailClick(item)">{{ index + 1 }}</td>
                    <td @click="detailClick(item)">{{ item.brandName }}</td>
                    <td @click="detailClick(item)">{{ item.goodsName }}</td>
                    <td @click="detailClick(item)">
                      <span :style="{ 'background-color': item.color }"></span>
                    </td>
                    <td>
                      {{
                        item[
                          `purchasePrice${
                            userData.userType === "0"
                              ? 0
                              : Number(
                                  userData.userType === "5"
                                    ? "4"
                                    : userData.userType
                                ) - 1
                          }`
                        ]
                      }}
                    </td>
                    <td
                      style="width: 10vw; padding: 0vw; font-size: 3.74vw"
                      v-if="shows"
                    >
                      <div style="color: #38f" @click="caozuoClick(item)">
                        操作
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tr v-if="loading">
                  <td colspan="6">加载中...</td>
                </tr>
                <tr
                  v-if="pagination.total !== data.length && !loading"
                  @click="pageClick"
                >
                  <td colspan="6">点击加载更多</td>
                </tr>
              </table>
              <div v-if="showStatus === 'div'">
                <div class="zhuang_css" v-if="data.length === 0 && !loading">
                  暂无数据
                </div>
                <div
                  class="dis_row_between_center shangpin_css"
                  v-for="(item, index) in data"
                  :key="index"
                >
                  <img
                    :src="require('@/img/logo1.png')"
                    class="shangpin_css_img_css"
                    style="width:27vw"
                    v-if="item.goodsImg.length === 0"
                  />
                  <el-image
                    v-if="item.goodsImg.length > 0"
                    class="shangpin_css_img_css"
                    :src="item.goodsImg[0]"
                    :preview-src-list="item.goodsImg"
                    @click.stop="handleClickItem"
                  >
                  </el-image>
                  <div class="shangpin_css_neirongbox_css">
                    <div
                      class="dis_row_between_center"
                      style="width: 60vw;margin-bottom: 1vw;"
                      @click="detailClick(item)"
                    >
                      <div class="goodsName_css">{{ item.goodsName }}</div>
                    </div>
                    <div>
                      <div
                        class="dis_row_start_center"
                        @click="detailClick(item)"
                      >
                        <span class="span_lable_css" style="width:15vw">品牌：</span>
                        <span style="width:42vw;color:#AFB40B" >{{
                          item.brandName
                        }}</span>
                      </div>
                      <div
                        class="dis_row_start_center"
                        @click="detailClick(item)"
                      >
                        <span class="span_lable_css" style="width:15vw">型号：</span>
                        <span style="width:42vw!important;color:#AFB40B">{{
                          item.modelName
                        }}</span>
                      </div>
                      <div
                        class="dis_row_start_center"
                        @click="detailClick(item)"
                      >
                        <span class="span_lable_css">市场价：</span>
                        <span class="span_lable_css" style="color:#AFB40B">{{
                          item.marketPrice ? item.marketPrice : "—"
                        }}</span>
                        <span class="span_lable_css">拿货价：</span>
                        <span
                          class="span_lable_css"
                          style="
                            color: red !important;
                            font-size: 3.4vw;
                            font-weight: bold;
                          "
                          >{{
                            item[
                              `purchasePrice${
                                userData.userType === "0"
                                  ? 0
                                  : Number(
                                      userData.userType === "5"
                                        ? "4"
                                        : userData.userType
                                    ) - 1
                              }`
                            ]
                          }}</span
                        >
                      </div>
                      <div class="dis_row_between_center">
                        <div
                          class="dis_row_start_center"
                          style="width:75vw"
                          @click="detailClick(item)"
                        >
                          <span style="width:15vw;color:#AFAEAE">规格：</span>
                          <span  style="color:#AFB40B">{{
                            item.specifications
                          }}</span>
                        </div>
                        <div
                          class="dis_row_end_center"
                          style="width: 100%"
                          v-if="shows"
                        >
                          <span class="butt_css" @click="delGoods(item)"
                            >删除</span
                          >
                          <span class="butt_css" @click="editClick(item)"
                            >编辑</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="zhuang_css"
                  style="margin-bottom: 20vw"
                  v-if="loading"
                >
                  加载中...
                </div>
                <div
                  class="zhuang_css"
                  v-if="pagination.total !== data.length && !loading"
                  style="margin-bottom: 20vw"
                  @click="pageClick"
                >
                  点击加载更多
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <span id="spanid">{{ wechatMumber }}</span>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { storage_get, storage_set, storage_remove } from "@/common/storage.js";
import { getList, getTypelist, delData } from "@/axios/api";
export default {
  name: "",
  data() {
    return {
      showStatus: "div",
      goodsTypeList: [],
      userData: {
        accountName: null,
        userType: null,
        accountPhone: null,
      },
      loading: false,
      pagination: {
        page: 1,
        size: 20,
        total: 0,
      },
      form: {
        brandName: "",
        goodsName: "",
        goodsType: "",
        purchasePrice0: "",
        purchasePrice1: "",
        purchasePrice2: "",
        purchasePrice3: "",
      },
      data: [],
    };
  },
  computed: {
    shows: function () {
      let show = false;
      if (this.userData.userType === "0" || this.userData.userType === "1") {
        show = true;
      }
      return show;
    },
  },
  methods: {
    //展示形式
    showStatusClick() {
      if (this.showStatus === "table") {
        this.showStatus = "div";
      } else {
        this.showStatus = "table";
      }
      this.loading = false;
      this.resetForm();
    },
    //删除货品
    delGoods(row) {
      let that = this;
      that
        .$confirm(
          `確定要删除货品【${row.brandName}/${row.modelName}】吗？`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            customClass: "el-message-box1",
          }
        )
        .then(() => {
          delData(row.goodsId).then((res) => {
            if (res.code === 0) {
              that.$message({
                type: "success",
                message: "删除成功!",
                customClass: "myalert_css1",
              });
              this.pagination.page = 1;
              this.data = [];
              this.getData();
            }
          });
        })
        .catch(() => {});
    },
    //双击事件
    dbClick(row) {
      console.log(row);
    },
    //编辑
    editClick(row) {
      let that = this;
      that.$router.push({
        path: "/indexApp/addGoods",
        query: {
          goodsType: row.goodsType,
          goodsId: row.goodsId,
        },
      });
    },
    //表格形式的操作按钮
    caozuoClick(row) {
      let that = this;
      that
        .$confirm(
          `你要对货品【${row.brandName}/${row.modelName}】操作是？`,
          "选择",
          {
            confirmButtonText: "编辑",
            cancelButtonText: "删除",
            type: "warning",
            customClass: "el-message-box1",
            // showClose: false,
            distinguishCancelAndClose: true,
          }
        )
        .then(() => {
          this.editClick(row);
          return;
        })
        .catch((err) => {
          if (err === "cancel") {
            that.delGoods(row);
          }
        });
    },
    //添加货品
    goodsPath() {
      this.$router.push({
        path: "/indexApp/addGoods",
        query: {
          goodsType: this.form.goodsType,
        },
      });
    },
    //账号管理
    accountPath() {
      this.$router.push({ path: "/indexApp/adminApp" });
    },
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
            res.data = this.getOrders(res.data);
            this.goodsTypeList = res.data;
            let SgoodsType = storage_get("goodsType");
            this.form.goodsType = SgoodsType
              ? SgoodsType
              : res.data[0].goodsType;
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
      this.form.goodsName = "";
      this.form.brandName = "";
      this.form.purchasePrice0 = "";
      this.form.purchasePrice1 = "";
      this.form.purchasePrice2 = "";
      this.form.purchasePrice3 = "";
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
        path: "/indexApp/detailApp",
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
              if (this.userData.userType === "5") {
                item.purchasePrice3 = Number(item.purchasePrice3) + 10;
              }
              if (item.goodsImg) {
                if (item.goodsImg.indexOf(",")) {
                  item.goodsImg = item.goodsImg.split(",");
                } else {
                  item.goodsImg = item.goodsImg.split(" ");
                }
              } else {
                item.goodsImg = [];
              }
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
      storage_set("goodsType", tab.name);
      this.form.goodsName = "";
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
>>> .el-image-viewer__actions {
  display: none;
}
#spanid {
  position: absolute;
  left: -10000px;
  opacity: 0;
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
  background-color: #fb1099;
  color: #fff;
  width: 10vw;
  text-align: center;
  font-weight: bold;
  z-index: 100;
  animation: dong 1s infinite;
  transition: 0.3s;
}
@keyframes dong {
  0% {
    font-size: 3.74vw;
  }
  50% {
    font-size: 5vw;
  }
  100% {
    font-size: 3.74vw;
  }
}
>>> .el-tabs--border-card {
  border: 0;
}
>>> .el-button--primary {
  color: #fff !important;
  background-color: #fb1099 !important;
  border: 0 !important;
}
>>> .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background-color: #fddbef;
  font-weight: bold;
  color: #fb1099 !important;
  padding-left: 10px;
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
>>> .el-tabs__item {
  padding: 0 10px;
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
  user-select: none;
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
}
.table_width_css td span {
  display: block;
  width: 6vw;
  height: 6vw;
  border-radius: 0.8vw;
  margin: 0 auto;
}
.sousuo_css {
  width: 96vw;
  height: 7vw;
  text-align: center;
  color: #000;
  padding: 2vw 2vw;
  border-bottom: 1px solid #fb1099;
  background-color: #fddbef;
}
.input_css{
  width: 72vw;
  height: 7.5vw;
  padding: 0 2vw;
  border: 0;
  font-size: 3.3vw;
  outline: none;
  border-radius: 1vw;
}
.button_css {
  display: block;
  width: 18vw;
  height: 7.5vw;
  line-height: 7.5vw;
  border-radius: 1vw;
  font-size: 3.3vw;
  background-color:  #fb1099;
  color:#ffffff;
}
.my_box {
  width: 94vw;
  height: 6vw;
  background-color: #fb1099;
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
.sco_css {
  width: 100vw;
  height: calc(100vh - 35vw);
  overflow-y: scroll;
  background-color: #fdf2f9;
  overflow-x: hidden;
}
.shangpin_css {
  width: 98vw;
  min-height: 34vw;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 2vw;
  margin-top: 3vw;
}
.shangpin_css:last-child {
  margin-bottom: 20vw;
}
.shangpin_css_img_css {
  width: 28vw;
  height: 28vw;
  margin: 2vw;
  margin-right: 0;
  border: 1px solid #fff;
}
.shangpin_css_neirongbox_css {
  width: 63vw;
  margin: 1vw;
  min-height: 24vw;
  border-radius: 2vw;
  font-size: 3.74vw;
  color: #555;
  padding: 1vw;
}
.span_lable_css {
  display: block;
  width: 30vw;
  height: 6vw;
  line-height: 6vw;
  font-size: 3vw;
  color: #AFAEAE;
}
.butt_css {
  width: 10vw;
  font-size: 3vw;
  line-height: 5vw;
  text-align: center;
  border-radius: 1vw;
  color: #fff;
  margin-right: 3vw;
}
.butt_css:first-child {
  background-color: red;
}
.butt_css:last-child {
  background-color: #38f;
}
.color_css {
  width: 5vw;
  height: 5vw;
  border-radius: 1vw;
}
.zhuang_css {
  width: 98vw;
  height: 10vw;
  line-height: 10vw;
  text-align: center;
  background-color: #fff;
  margin: 1vw auto;
  border-radius: 2vw;
  font-size: 3.74vw;
  color: #555;
}
.title_css {
  font-size: 3.7vw;
  width: 22vw;
  max-height: 10vw;
}
.shangpin_css_neirongbox_css .goodsName_css {
  width: 60vw;
  max-height: 10vw;
  font-size: 3.3vw;
  font-weight: bold;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-line-clamp: 2; /* 控制最多显示几行 */
  -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
}
</style>