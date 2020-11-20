<template>
  <div>
    <el-dialog
      title="货品详情"
      :visible.sync="show"
      width="800px"
      top="50px"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <el-form
        label-width="130px"
        :inline="true"
        :model="form"
        ref="formData"
        class="demo-form-inline"
      >
        <el-form-item label="货品编号：">
          <div class="div_width">{{ form.goodsId }}</div>
        </el-form-item>
        <el-form-item label="类别：">
          <div class="div_width">{{ leftList[Number(form.goodsStatus)].title }}</div>
        </el-form-item>
        <el-form-item label="品牌：">
          <div class="div_width">{{ form.brandName }}</div>
        </el-form-item>
        <el-form-item label="型号：">
          <div class="div_width">{{ form.modelName }}</div>
        </el-form-item>
        <el-form-item label="规格：">
          <div class="div_width">{{ form.specifications }}</div>
        </el-form-item>
        <el-form-item label="颜色：">
          <div class="dis_row_between_center" style="width:90px">
            <span>{{ form.color }}</span>
            <span class="span_color" :style="{'background-color': form.color}"></span>
          </div>
        </el-form-item>
        <el-form-item label="一级进货价：">
          <div class="div_width">{{ form.purchasePrice0 }}（元/件）</div>
        </el-form-item>
        <el-form-item label="二级进货价：">
          <div class="div_width">{{ form.purchasePrice1 }}（元/件）</div>
        </el-form-item>
        <el-form-item label="三级进货价：">
          <div class="div_width">{{ form.purchasePrice2 }}（元/件）</div>
        </el-form-item>
        <el-form-item label="四级进货价：">
          <div class="div_width">{{ form.purchasePrice3 }}（元/件）</div>
        </el-form-item>
        <el-form-item label="市场价：">
          <div class="div_width">{{ form.marketPrice }}（元/件）</div>
        </el-form-item>
        <el-form-item label="价格出售范围：">
          <div class="div_width">
            <span>{{ form.maxPrice }}</span>
            <span style="margin: 0 5px">~</span>
            <span>{{ form.maxPrice }}（元/件）</span>
          </div>
        </el-form-item>
        <el-form-item label="一件代发邮费：">
          <div class="div_width">{{ form.expressPrice }}（元/件）</div>
        </el-form-item>
        <el-form-item label="货品名称：">
          <div class="div_width">{{ form.goodsName }}</div>
        </el-form-item>
        <el-form-item label="进货商家名称：">
          <div class="div_width">{{ form.buyerName }}</div>
        </el-form-item>
        <el-form-item label="样品拿货价：">
          <div class="div_width">{{ form.samplePrice }}（元/件）</div>
        </el-form-item>
        <el-form-item label="样品规格：">
          <div class="div_width">{{ form.sampleSpecifications }}</div>
        </el-form-item>
        <el-form-item label="已售数量：">
          <div class="div_width">{{ form.stockNum }}（件）</div>
        </el-form-item>
        <el-form-item label="库存数量：">
          <div class="div_width">{{ form.soldNum }}（件）</div>
        </el-form-item>
        <el-form-item label="添加时间：">
          <div class="div_width">{{ form.operationTime }}</div>
        </el-form-item>
        <el-form-item label="更新时间：">
          <div class="div_width">{{ form.updateTime }}</div>
        </el-form-item>
        <el-form-item label="最后更新人：">
          <div class="div_width">{{ form.updateName }}</div>
        </el-form-item>
        <el-form-item label="文案：">
          <div class="myimgbox">{{ form.goodsRemark }}</div>
        </el-form-item>
        <el-form-item label="货品图片：">
          <div class="myimgbox">
            <el-image class="myimg_css" :src="item" :preview-src-list="form.goodsImg" v-for="(item, index) in form.goodsImg" :key="index"></el-image>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">关闭</el-button>
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
        stockNum: "99", //库存
        expressPrice: "10", //一件代发邮费
        goodsName: "货品1", //货品名称
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
          "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=320079281,4280095860&fm=26&gp=0.jpg",
          "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1371154128,299347645&fm=26&gp=0.jpg",
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1912478382,2180969249&fm=26&gp=0.jpg",
          "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=320079281,4280095860&fm=26&gp=0.jpg",
          "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1371154128,299347645&fm=26&gp=0.jpg",
        ],
      },
    };
  },
  props: {
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log("file", file);
      this.form.imgList = file.url;
    },
    getData() {},
    //关闭按钮
    handleClose() {
      this.$emit("handleClose");
    },
    //确定按钮
    addComfirm() {
      console.log(this.form);
      this.$emit("addComfirm");
    },
  },
};
</script>
<style scoped>
>>>.el-dialog__body{
  padding-top: 0;
}
>>> .el-form-item {
  margin-bottom: 10px;
}
.myimgbox {
  width: 540px;
}
.div_width{
  width: 200px;
}
.myimg_css{  
  width: 80px;
  height: 80px;
  margin:10px 10px 0 0;
}
</style>