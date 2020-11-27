<template>
  <div>
    <div class="dis_row_between_center header_box">
      <span class="color_text">JYCYL货源仓库 </span>
      <div class="dis_row_between_center out_box_css">
        <span v-if="userData.userType != '5'"
          ><i class="iconfont icongerenmingpian" style="margin-right: 0.5vw"></i
          >{{ userTypeList[Number(userData.userType)].name }}</span
        >
        <span class="phone_css" v-if="userData.userType != '5'"
          >{{ userData.account }} / {{ userData.accountName }} /{{
            userData.accountPhone
          }}</span
        >
        <span v-if="userData.userType === '5'"
          ><i class="iconfont icongerenmingpian" style="margin-right: 0.5vw"></i
          >{{ userData.accountName }}</span
        >
        <el-button type="primary" @click.stop="logouts" size="mini" plain
          >退出系统</el-button
        >
      </div>
    </div>
    <div class="dis_row_between_center">
      <div class="left_box">
        <el-menu
          :default-active="goodsTypeList[0].goodsType"
          @select="butClick"
          class="el-menu-demo"
        >
          <div
            class="dis_row_end_center but_addsplb_css"
            v-if="userData.userType === '0' || userData.userType === '1'"
          >
            <el-button type="primary" size="mini" @click="addLbClick"
              >添加类型</el-button
            >
            <el-button
              v-if="goodsTypeList.length > 1"
              type="danger"
              size="mini"
              @click="delLbShow = !delLbShow"
              >删除类型</el-button
            >
          </div>
          <el-menu-item
            :index="item.goodsType"
            v-for="(item, index) in goodsTypeList"
            :key="index"
          >
            <div class="dis_row_between_center">
              <span>{{ item.goodsTypename }}</span>
              <i
                v-if="delLbShow && item.goodsTypename !== '其他'"
                class="el-icon-error"
                style="color: red"
                @click="delLbClick(item.goodsType, item.goodsTypename)"
              ></i>
            </div>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="rigth_css">
        <div class="form_box_css">
          <el-form
            :inline="true"
            :model="form"
            ref="formData"
            class="demo-form-inline"
          >
            <el-form-item label="品牌：" prop="brandName">
              <el-input
                clearable
                @keyup.enter.native="onSubmit"
                v-model="form.brandName"
                placeholder="请输入品牌名称"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="型号：" prop="modelName">
              <el-input
                clearable
                @keyup.enter.native="onSubmit"
                v-model="form.modelName"
                placeholder="请输入型号名称"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="货品名称：" prop="goodsName">
              <el-input
                clearable
                @keyup.enter.native="onSubmit"
                v-model="form.goodsName"
                placeholder="请输入货品名称"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="进货价(元)："
              :prop="`purchasePrice${
                userData.userType === '0' ? 0 : Number(userData.userType==='5'?'4':userData.userType) - 1
              }`"
            >
              <el-input
                clearable
                @keyup.enter.native="onSubmit"
                type="number"
                :maxlength="4"
                v-model="
                  form[
                    `purchasePrice${
                      userData.userType === '0'
                        ? 0
                        : Number(userData.userType==='5'?'4':userData.userType) - 1
                    }`
                  ]
                "
                placeholder="请输入进货价"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="官方指导价(元)：" prop="marketPrice">
              <el-input
                clearable
                @keyup.enter.native="onSubmit"
                type="number"
                v-model="form.marketPrice"
                placeholder="请输入官方指导价"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="添加时间：" prop="times">
              <el-date-picker
                v-model="times"
                clearable
                @change="timeChange"
                type="daterange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="请选择开始日期"
                end-placeholder="请选择结束日期"
                align="right"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" size="small"
                >查询</el-button
              >
              <el-button size="small" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="dis_row_between_center form_box_css">
          <el-button
            v-if="userData.userType === '0'"
            type="primary"
            plain
            @click="
              adminShow = true;
              delLbShow = false;
            "
            >账号管理</el-button
          >
          <h2>{{ leftName }}</h2>
          <el-button
            v-if="userData.userType === '0' || userData.userType === '1'"
            type="primary"
            icon="el-icon-plus"
            @click="addClick"
            >添加货品</el-button
          >
        </div>
        <div class="form_box_css table_height_css">
          <el-table
            ref="multipleTable"
            :data="data"
            stripe
            height="53vh"
            border
            v-loading="tableLoading"
          >
            <el-table-column
              label="序号"
              type="index"
              align="center"
              width="50px"
              :index="indexMethod"
            ></el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="brandName"
              label="品牌"
              align="center"
              width="100px"
            ></el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="modelName"
              label="型号"
              align="center"
              width="100px"
            ></el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="specifications"
              label="规格"
              align="center"
              width="100px"
            ></el-table-column>
            <el-table-column
              prop="color"
              label="颜色"
              align="center"
              width="100px"
            >
              <template slot-scope="scope">
                <div class="dis_row_center_center wid">
                  <span :style="{ 'background-color': scope.row.color }"></span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="goodsName"
              label="货品名称"
              align="center"
              width="150px"
            ></el-table-column>
            <el-table-column
              label="进货价"
              :prop="`purchasePrice${
                userData.userType === '0' ? 0 : Number(userData.userType==='5'?'4':userData.userType) - 1
              }`"
              align="center"
              width="100px"
            ></el-table-column>
            <el-table-column
              label="官方指导价"
              prop="marketPrice"
              align="center"
              width="100px"
            >
            </el-table-column>
            <el-table-column
              v-if="userData.userType === '0' || userData.userType === '1'"
              :show-overflow-tooltip="true"
              prop="buyerName"
              label="进货商家名称"
              align="center"
              width="130px"
            ></el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="goodsRemark"
              label="货品文案"
              align="center"
            ></el-table-column>
            <el-table-column width="100px" label="货品图片" align="center">
              <template slot-scope="scope">
                <div>
                  <img
                    :src="require('@/img/zanwu.jpg')"
                    class="img_tupian"
                    v-if="scope.row.goodsImg.length === 0"
                  />
                  <el-image
                    v-if="scope.row.goodsImg.length > 0"
                    class="img_tupian"
                    :src="scope.row.goodsImg[0]"
                    :preview-src-list="scope.row.goodsImg"
                  >
                  </el-image>
                  <span class="dian_css" v-if="scope.row.goodsImg.length > 1"
                    >...</span
                  >
                </div>
              </template></el-table-column
            >
            <el-table-column
              prop="createTime"
              label="添加时间"
              align="center"
              width="100px"
            ></el-table-column>
            <el-table-column label="操作" align="center" width="220px">
              <template slot-scope="scope">
                <div class="dis_row_around_center">
                  <el-button
                    v-if="
                      userData.userType === '0' || userData.userType === '1'
                    "
                    type="primary"
                    size="mini"
                    @click="editClick(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    v-if="
                      userData.userType === '0' || userData.userType === '1'
                    "
                    type="danger"
                    size="mini"
                    @click="delConfirm(scope.row)"
                    >删除</el-button
                  >
                  <el-button
                    type="success"
                    @click="detailClick(scope.row)"
                    size="mini"
                    >详情</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="footer">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            @size-change="handleCurrentChange1"
            :current-page.sync="pagination.page"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="pagination.size"
            layout="prev, pager, next, sizes, jumper"
            :total="pagination.total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <detail @handleClose="handleClose" :show="detailShow" :goodsId="goodsId" />
    <addOrEdit
      @comfirm="addComfirm"
      @handleClose="addHandleClose"
      :show="addShow"
      :title="title"
      :goodsType="form.goodsType"
      :goodsId="goodsId"
    />
    <admin :show="adminShow" @handleClose="adminHandleClose" />
  </div>
</template>

<script>
import { storage_get, storage_remove } from "@/common/storage.js";
import {
  getList,
  delData,
  getTypelist,
  delGoodsType,
  addGoodsType,
} from "@/axios/api";
export default {
  name: "",
  components: {
    detail: () => import("./detail"),
    addOrEdit: () => import("./addOrEdit"),
    admin: () => import("./admin"),
  },
  data() {
    return {
      goodsTypeList: [
        {
          goodsTypename: "其他",
          goodsType: "99",
        },
      ],
      goodsId: "",
      times: [],
      userData: {
        accountId: null,
        accountName: null,
        userType: null,
        accountPhone: null,
        account: null,
      },
      delLbShow: false,
      leftName: "",
      title: "编辑",
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      },
      detailShow: false,
      addShow: false,
      adminShow: false,
      tableLoading: false,
      form: {
        goodsType: "",
        brandName: "",
        modelName: "",
        goodsName: "",
        purchasePrice0: "",
        purchasePrice1: "",
        purchasePrice2: "",
        purchasePrice3: "",
        marketPrice: "",
        startTime: "",
        endTime: "",
        size: 10,
      },
      data: [],
    };
  },
  methods: {
    //时间选择
    timeChange(val) {
      this.form.startTime = this.getTimeToDate(val[0].getTime(), "D");
      this.form.endTime = this.getTimeToDate(val[1].getTime(), "D");
    },
    //获取货品类型
    getGoodsTypeList() {
      getTypelist()
        .then((res) => {
          if (res.code === 0) {
            this.goodsTypeList = res.data;
            this.form.goodsType = res.data[0].goodsType;
            this.butClick(res.data[0].goodsType);
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
    //获取列表
    getData() {
      this.tableLoading = true;
      this.form.size = this.pagination.size;
      this.form.current = this.pagination.page;
      getList(this.form)
        .then((res) => {
          this.tableLoading = false;
          if (res.code === 0) {
            if (res.data.length === 0) {
              this.data = [];
              return;
            }
            res.data.records.forEach((item) => {
              if(this.userData.userType === '5'){
                item.purchasePrice3 = Number(item.purchasePrice3) + 10
              };
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
            this.data = res.data.records;
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          this.pagination.total = 0;
          this.$message.error("网络错误，请稍后重试！");
        });
    },
    //删除类型
    delLbClick(id, title) {
      let that = this;
      that
        .$confirm(
          `删除【${title}】类后该类里的所有货品都将自动放入【其他】类，是否继续该操作?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
        .then(() => {
          delGoodsType(id)
            .then((res) => {
              if (res.code === 0) {
                that.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getGoodsTypeList();
              }
            })
            .catch((err) => {
              this.delLbShow = true;
              this.$message.error("类型删除失败！");
            });
        })
        .catch(() => {
          this.delLbShow = true;
        });
    },
    //添加类型弹窗
    addLbClick() {
      this.delLbShow = false;
      this.$prompt("请输入类型名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        inputPattern: /^.{1,6}$/,
        inputErrorMessage: "类型名称长度为1到6！",
      })
        .then(({ value }) => {
          let bold = false;
          this.goodsTypeList.forEach((item) => {
            if (item.goodsTypename === value) {
              bold = true;
              return;
            }
          });
          if (bold) {
            this.$message.error("已存在该类型，请勿重复添加！");
            return;
          }
          let data = {
            goodsTypename: value,
          };
          addGoodsType(data)
            .then((res) => {
              if (res.code === 0) {
                this.$message({
                  type: "success",
                  message: "添加类型成功！",
                });
                this.getGoodsTypeList();
              }
            })
            .catch((err) => {
              this.$message.error("类型添加失败！");
            });
        })
        .catch(() => {});
    },
    //关闭账号弹窗
    adminHandleClose() {
      this.adminShow = false;
    },
    //侧边导航
    butClick(id) {
      this.delLbShow = false;
      let index = this.goodsTypeList[0].goodsType;
      let title = this.goodsTypeList[0].goodsTypename;
      this.goodsTypeList.forEach((item) => {
        if (item.goodsType === id) {
          index = item.goodsType;
          title = item.goodsTypename;
        }
      });
      this.leftName = title + "类货品列表";
      this.form.goodsType = index;
      this.getData();
    },
    //关闭新增
    addHandleClose() {
      this.addShow = false;
    },
    //新增确定
    addComfirm() {
      this.addShow = false;
      this.getData();
    },
    //点击编辑按钮
    editClick(row) {
      this.delLbShow = false;
      this.title = "编辑";
      this.goodsId = row.goodsId;
      this.addShow = true;
    },
    //点击添加按钮
    addClick() {
      this.delLbShow = false;
      this.title = "添加";
      this.addShow = true;
    },
    //删除货品
    delConfirm(row) {
      this.delLbShow = false;
      let that = this;
      that
        .$confirm(
          `確定要删除货品【${row.brandName}/${row.modelName}】吗？`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
        .then(() => {
          delData(row.goodsId).then((res) => {
            if (res.code === 0) {
              that.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getData();
            }
          });
        })
        .catch(() => {});
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
        })
        .then(() => {
          storage_remove("userdata");
          that.$router.replace({ path: "/login" });
          that.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {});
    },
    //详情按钮
    detailClick(row) {
      this.delLbShow = false;
      this.detailShow = true;
      this.goodsId = row.goodsId;
    },
    //关闭详情
    handleClose() {
      this.detailShow = false;
    },
    //自定义序号
    indexMethod(index) {
      return index + 1 + (this.pagination.page - 1) * this.pagination.size;
    },
    //搜索
    onSubmit() {
      this.delLbShow = false;
      console.log(this.form)
      if(this.userData.userType === '5'){
        this.form.purchasePrice3 = Number(this.form.purchasePrice3) - 10
      }
      this.getData();
    },
    //重置
    resetForm() {
      this.delLbShow = false;
      this.pagination.page = 1;
      this.pagination.size = 10;
      this.$refs["formData"].resetFields();
      this.form.startTime = "";
      this.form.endTime = "";
      this.times = [];
      this.getData();
    },
    //翻页
    handleCurrentChange(page) {
      this.delLbShow = false;
      this.pagination.page = page;
      this.getData();
    },
    //一页多条
    handleCurrentChange1(size) {
      this.delLbShow = false;
      this.pagination.size = size;
      this.getData();
    },
  },
  created() {
    if (!storage_get("userdata")) {
      this.$router.replace({ path: "/login" });
    }
    this.userData = storage_get("userdata");
    this.getGoodsTypeList();
  },
};
</script>
<style scoped>
>>> .el-image-viewer__close {
  color: #fff;
}
>>> .el-menu-item.is-active {
  border-right: 2px solid #38f;
}
>>> .el-image-viewer__close {
  color: #ffffff;
}
.header_box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #2658ed;
  color: #ffffff;
  z-index: 100;
}
.color_text {
  min-width: 260px;
  font-size: 17px;
  margin-left: 15px;
  font-weight: bold;
  color: #ffffff;
}
.left_box {
  width: 200px;
  background-color: #fafafa;
  height: calc(100vh - 50px);
  margin-top: 50px;
}
.rigth_css {
  width: calc(100vw - 200px);
  background-color: #ffffff;
  height: calc(100vh - 50px);
  margin-top: 50px;
}
.form_box_css {
  padding: 15px 20px 10px 30px;
  border-bottom: 1px solid #ccc;
}
.table_height_css {
  width: calc(100vw - 250px);
  height: 53vh;
}
.footer {
  padding: 15px 20px 10px 30px;
  text-align: right;
}
.img_tupian {
  width: 50px;
  height: 50px;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 5px;
}
.dian_css {
  margin-left: 5px;
  font-size: 18px;
  font-weight: bold;
}
.but_addsplb_css {
  height: 30px;
  padding: 5%;
  border-bottom: 1px solid#E6E6E6;
}
.out_box_css {
  min-width: 150px;
  margin-right: 15px;
}
.out_box_css .phone_css {
  font-size: 12px;
  margin: 0 10px;
  display: block;
  line-height: 20px;
}
</style>