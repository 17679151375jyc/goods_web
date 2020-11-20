<template>
  <div>
    <el-dialog
      :title="title"
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
        <el-form-item label="类别：" prop="goodsStatus">
          <el-select
            v-model="form.goodsStatus"
            placeholder="请选择类别"
            style="width: 200px"
            size="small"
          >
            <el-option
              v-for="item in leftList"
              :key="item.value"
              :label="item.title"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="brandName" label="品牌：">
          <el-input
            clearable
            maxlength="20"
            style="width: 200px"
            v-model="form.brandName"
            placeholder="请输入品牌名称"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="modelName" label="型号：">
          <el-input
            clearable
            maxlength="20"
            style="width: 200px"
            v-model="form.modelName"
            placeholder="请输入型号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="specifications" label="规格：">
          <el-input
            clearable
            maxlength="20"
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
              @focus="colorClick"
            ></el-input>
            <span
              class="span_color"
              :style="{ 'background-color': form.color }"
            ></span>
          </div>
        </el-form-item>
        <el-form-item prop="purchasePrice" label="一级进货价：">
          <el-input
            clearable
            type="number"
            style="width: 200px"
            v-model="form.purchasePrice0"
            placeholder="请输入进货价"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="purchasePrice" label="二级级进货价：">
          <el-input
            clearable
            type="number"
            style="width: 200px"
            v-model="form.purchasePrice1"
            placeholder="请输入进货价"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="purchasePrice" label="三级级进货价：">
          <el-input
            clearable
            type="number"
            style="width: 200px"
            v-model="form.purchasePrice2"
            placeholder="请输入进货价"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="purchasePrice" label="四级级进货价：">
          <el-input
            clearable
            type="number"
            style="width: 200px"
            v-model="form.purchasePrice3"
            placeholder="请输入进货价"
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
        <el-form-item label="一件代发邮费：">
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
        <el-form-item label="进货商家名称：">
          <el-input
            clearable
            maxlength="20"
            style="width: 200px"
            v-model="form.buyerName"
            placeholder="请输入进货商家名称"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="样品拿货价：">
          <el-input
            clearable
            type="number"
            style="width: 200px"
            v-model="form.samplePrice"
            placeholder="请输入样品拿货价"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="样品规格：">
          <el-input
            clearable
            style="width: 200px"
            v-model="form.sampleSpecifications"
            placeholder="请输入样品规格"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存数量：">
          <el-input
            clearable
            type="number"
            maxlength="20"
            style="width: 200px"
            v-model="form.stockNum"
            placeholder="请输入库存"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="已售数量：">
          <el-input
            clearable
            type="number"
            style="width: 200px"
            v-model="form.soldNum"
            placeholder="请输入已售数量"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="文案：">
          <el-input
            clearable
            rows="4"
            show-word-limit
            resize="none"
            style="width: 540px"
            maxlength="35"
            v-model="form.goodsRemark"
            placeholder="请输入文案"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="货品图片：">
          <div style="width: 540px">
            <div
              class="img_tupian"
              v-for="(item, index) in form.goodsImg"
              :key="index"
            >
              <el-image
                ref="img_tupian"
                style="width: 100%; height: 100%"
                :src="item"
                :preview-src-list="form.goodsImg"
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
        <el-button size="small" type="primary" @click="addComfirm"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      form: {
        goodsId: "commodity000001", //货品编号
        goodsStatus: "0", //货品类型
        brandName: "mac", //品牌名称
        modelName: "小辣椒", //品牌型号
        specifications: "200g", //货品规格
        color: "#3388ff", //货品颜色
        goodsName: "111", //货品名称
        stockNum: "99", //库存
        expressPrice: "10", //一件代发邮费
        buyerName: "彩妆店", //进货商家名称
        purchasePrice0: "150", //一级进货价
        purchasePrice1: "160", //二级进货价
        purchasePrice2: "170", //三级进货价
        purchasePrice3: "180", //四级进货价
        marketPrice: "189", //市场价
        samplePrice: "12", //样品拿货价
        soldNum: 8, //已售数量
        sampleSpecifications: "15g", //样品规格
        operationTime: "2020-11-08 15:00",
        updateTime: "2020-11-11 15:00",
        updateName: "蒋雨成",
        goodsRemark: "max小辣椒，库存充足",
        goodsImg: [
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1912478382,2180969249&fm=26&gp=0.jpg",
        ],
      },
    };
  },
  props: {
    title: {
      default: "编辑货物",
    },
    show: { default: false },
  },
  watch: {
    show: function (val, oldVal) {
      if (val) {
        this.getData();
      }
    },
  },
  methods: {
    updateClick() {
      this.$refs.res_imginput.click();
    },
    fileChange(e) {
      let file = e.target.files[0];
      console.log(file);
    },
    delImgClick(index) {
      this.form.goodsImg.splice(index, 1);
    },
    getData() {},
    //关闭按钮
    handleClose() {
      this.$emit("handleClose");
    },
    //确定按钮
    addComfirm() {
      console.log(this.form);
      let that = this;
      this.$refs["formData"].validate(async (valid) => {
        if (valid) {
          this.$emit("comfirm");
        }
      });
    },
    //颜色
    colorClick(e) {
      console.log(e);
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