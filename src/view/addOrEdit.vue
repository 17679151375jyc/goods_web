<template>
  <div>
    <el-dialog
      :title="`${title}货品`"
      :visible.sync="show"
      width="800px"
      top="30px"
      :append-to-body="true"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form
        label-width="130px"
        :inline="true"
        :model="form"
        ref="formData"
        :rules="rules"
        class="demo-form-inline"
      >
        <el-form-item label="类别：" prop="goodsType">
          <el-select
            v-model="form.goodsType"
            placeholder="请选择类别"
            style="width: 200px"
            size="small"
          >
            <el-option
              v-for="item in goodsTypeList"
              :key="item.goodsType"
              :label="item.goodsTypename"
              :value="item.goodsType"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="brandName" label="品牌：">
          <el-input
            clearable
            maxlength="30"
            style="width: 200px"
            v-model="form.brandName"
            placeholder="请输入品牌名称"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="modelName" label="型号：">
          <el-input
            clearable
            maxlength="30"
            style="width: 200px"
            v-model="form.modelName"
            placeholder="请输入型号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="specifications" label="规格：">
          <el-input
            clearable
            maxlength="50"
            style="width: 200px"
            v-model="form.specifications"
            placeholder="请输入规格"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="color" label="颜色代码：">
          <div class="dis_row_between_center" style="width: 200px">
            <el-input
              clearable
              maxlength="7"
              style="width: 150px"
              v-model="form.color"
              placeholder="请输入颜色"
              size="small"
            ></el-input>
            <span
              class="span_color"
              :style="{ 'background-color': form.color }"
            ></span>
          </div>
        </el-form-item>
        <el-form-item prop="goodsName" label="货品名称：">
          <el-input
            clearable
            maxlength="50"
            style="width: 200px"
            v-model="form.goodsName"
            placeholder="请输入货品名称"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="purchasePrice0" label="一级进货价：">
          <el-input
            clearable
            type="number"
            style="width: 200px"
            v-model="form.purchasePrice0"
            placeholder="请输入一级进货价"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="purchasePrice1" label="二级进货价：">
          <el-input
            clearable
            type="number"
            style="width: 200px"
            v-model="form.purchasePrice1"
            placeholder="请输入二级进货价"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="purchasePrice2" label="三级进货价：">
          <el-input
            clearable
            type="number"
            style="width: 200px"
            v-model="form.purchasePrice2"
            placeholder="请输入三级进货价"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="purchasePrice3" label="四级进货价：">
          <el-input
            clearable
            type="number"
            style="width: 200px"
            v-model="form.purchasePrice3"
            placeholder="请输入四级进货价"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="marketPrice" label="市场价：">
          <el-input
            clearable
            type="number"
            style="width: 200px"
            v-model="form.marketPrice"
            placeholder="请输入市场价"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="expressPrice" label="一件代发邮费：">
          <el-input
            clearable
            type="number"
            maxlength="20"
            style="width: 200px"
            v-model="form.expressPrice"
            placeholder="请输入一件代发邮费"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="buyerName" label="进货商家名称：">
          <el-input
            clearable
            maxlength="30"
            style="width: 200px"
            v-model="form.buyerName"
            placeholder="请输入进货商家名称"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="samplePrice" label="样品拿货价：">
          <el-input
            clearable
            type="number"
            style="width: 200px"
            v-model="form.samplePrice"
            placeholder="请输入样品拿货价"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="sampleSpecifications" label="样品规格：">
          <el-input
            clearable
            maxlength="30"
            style="width: 200px"
            v-model="form.sampleSpecifications"
            placeholder="请输入样品规格"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="stockNum" label="库存数量：">
          <el-input
            clearable
            type="number"
            maxlength="10"
            style="width: 200px"
            v-model="form.stockNum"
            placeholder="请输入库存数"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="已售数量：" v-if="title === '编辑'">
          <el-input
            clearable
            type="number"
            maxlength="10"
            style="width: 200px"
            v-model="form.soldNum"
            placeholder="请输入已售数量"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="goodsRemark" label="文案：">
          <el-input
            clearable
            rows="4"
            show-word-limit
            resize="none"
            style="width: 540px"
            maxlength="500"
            v-model="form.goodsRemark"
            placeholder="请输入文案"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="货品图片：">
          <div style="width: 540px">
            <div
              class="img_tupian"
              v-for="(item, index) in imgList"
              :key="index"
            >
              <el-image
                v-if="imgList.length > 0"
                ref="img_tupian"
                style="width: 100%; height: 100%"
                :src="item"
                :preview-src-list="imgList"
              ></el-image>
              <i
                class="el-icon-circle-close del_css"
                @click="delImgClick(index)"
              ></i>
            </div>
            <div class="img_tupian">
              <i class="el-icon-plus addimg_css" @click="updateClick"></i>
              <input
                ref="res_imginput"
                multiple
                @change="fileChange"
                type="file"
                style="display: none"
                accept="image/gif, image/jpeg, image/png, image/jpg"
              />
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">关闭</el-button>
        <el-button size="small" @click="downloadColor">下载取色器</el-button>
        <el-button size="small" type="primary" @click="addComfirm"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDetailData,
  updataData,
  addData,
  updataImg,
  delImg,
  getTypelist,
} from "@/axios/api";
import { storage_get } from "@/common/storage.js";
export default {
  name: "",
  data() {
    return {
      goodsTypeList: [
        {
          goodsTypename: "其他",
          goodsType: "99",
        },
      ],
      imgList: [],
      form: {
        goodsType: "",
        brandName: "",
        modelName: "",
        specifications: "",
        color: "",
        goodsName: "",
        purchasePrice0: "",
        purchasePrice1: "",
        purchasePrice2: "",
        purchasePrice3: "",
        marketPrice: "",
        expressPrice: "",
        buyerName: "",
        samplePrice: "",
        sampleSpecifications: "",
        stockNum: "99",
        soldNum: 0,
        goodsRemark: "",
        goodsImg: "",
      },
      userData: {
        accountName: null,
        userType: null,
        accountPhone: null,
      },
    };
  },
  props: {
    title: {
      default: "编辑",
    },
    show: { default: false },
    goodsId: { default: "" },
    goodsType: { default: "" },
  },
  watch: {
    show: function (val, oldVal) {
      if (val) {
        this.userData = storage_get("userdata");
        this.getGoodsTypeList();
        if (this.title === "编辑") {
          this.getData();
        } else {
          this.$nextTick(() => {
            this.$refs["formData"].resetFields();
          });
          this.form.goodsType = this.goodsType;
        }
      }
    },
  },
  methods: {
    //下载取色器
    downloadColor() {
      let that = this;
      that
        .$confirm("确定要下载软件【取色器】吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          window.location.href =
            "http://49.234.22.146:8081/staticFile/getColor.zip";
        })
        .catch((err) => {});
    },
    //获取类型
    getGoodsTypeList() {
      getTypelist()
        .then((res) => {
          if (res.code === 0) {
            this.goodsTypeList = res.data;
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
    updateClick() {
      this.$refs.res_imginput.click();
    },
    //上传图片
    fileChange(e) {
      let file = e.target.files;
      file.forEach((item) => {
        let formData = new FormData();
        formData.append("file", item);
        updataImg(formData).then((res) => {
          if (res.code === 0) {
            this.imgList.push(res.msg);
          }
        });
      });
    },
    //删除图片
    delImgClick(index) {
      let key = this.imgList[index];
      key = key.substring(55, key.length);
      delImg(key).then((res) => {
        this.imgList.splice(index, 1);
      });
    },
    //编辑获取数据
    getData() {
      getDetailData(this.goodsId).then((res) => {
        if (res.code === 0) {
          if (res.data.goodsImg) {
            if (res.data.goodsImg.indexOf(",")) {
              this.imgList = res.data.goodsImg.split(",");
            } else {
              this.imgList = res.data.goodsImg.split(" ");
            }
          } else {
            this.imgList = [];
          }
          this.form = res.data;
        }
      });
    },
    //关闭按钮
    handleClose() {
      this.$emit("handleClose");
    },
    //确定按钮
    addComfirm() {
      let that = this;
      this.$refs["formData"].validate(async (valid) => {
        if (valid) {
          if (!this.form.stockNum) {
            this.form.stockNum = 0;
          }
          if (!this.form.soldNum) {
            this.form.soldNum = 0;
          }
          if (this.title === "编辑") {
            this.form.updateName = this.userData.accountName;
            this.form.goodsImg = this.imgList.toString();
            delete this.form.updateTime;
            delete this.form.createTime;
            delete this.form.startTime;
            delete this.form.endTime;
            updataData(this.form).then((res) => {
              if (res.code === 0) {
                that.$message({
                  type: "success",
                  message: "编辑成功!",
                  duration: 1000,
                });
                this.$emit("comfirm");
              }
            });
          } else {
            delete this.form.updateTime;
            delete this.form.createTime;
            delete this.form.startTime;
            delete this.form.endTime;
            this.form.createName = this.userData.accountName;
            this.form.goodsImg = this.imgList.toString();
            addData(this.form).then((res) => {
              if (res.code === 0) {
                that.$message({
                  type: "success",
                  message: "添加成功!",
                  duration: 1000,
                });
                this.$emit("comfirm");
              }
            });
          }
        }
      });
    },
  },
};
</script>
<style scoped>
>>> .el-upload--picture-card {
  width: 80px;
  height: 80px;
  line-height: 90px;
}
>>> .el-upload-list__item {
  width: 80px;
  height: 80px;
}
>>> .myimgbox .el-upload-list__item-preview:first-child {
  display: none !important;
}
>>> .el-upload-list--picture-card .el-upload-list__item-actions span + span {
  margin-left: 0 !important;
}
.myimgbox,
.myimgbox div:first-child {
  width: 200px !important;
}
>>> .el-form-item {
  margin-bottom: 15px;
}
.img_tupian {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  float: left;
  margin-bottom: 10px;
  position: relative;
  background-color: #fafafa;
  cursor: pointer;
}
.del_css {
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 20px;
  color: red;
  background-color: #fff;
  border-radius: 50%;
}
.addimg_css {
  font-size: 80px;
  width: 100%;
  color: #c7c6c5;
  cursor: pointer;
}
</style>