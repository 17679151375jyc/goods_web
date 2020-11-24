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
          <div class="div_width">{{ goodsTypename }}</div>
          <!-- <div class="div_width">{{ form.goodsType }}</div> -->
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
          <div class="dis_row_between_center" style="width: 100px">
            <span>{{ form.color }}</span>
            <span
              class="span_color"
              :style="{ 'background-color': form.color }"
            ></span>
          </div>
        </el-form-item>
        <el-form-item label="一级进货价：" v-if="userData.userType === '0'">
          <div class="div_width">{{ form.purchasePrice0 }}（元/件）</div>
        </el-form-item>
        <el-form-item label="二级进货价：" v-if="userData.userType === '0'">
          <div class="div_width">{{ form.purchasePrice1 }}（元/件）</div>
        </el-form-item>
        <el-form-item label="三级进货价：" v-if="userData.userType === '0'">
          <div class="div_width">{{ form.purchasePrice2 }}（元/件）</div>
        </el-form-item>
        <el-form-item label="四级进货价：" v-if="userData.userType === '0'">
          <div class="div_width">{{ form.purchasePrice3 }}（元/件）</div>
        </el-form-item>
        <el-form-item label="进货价：" v-if="userData.userType !== '0'">
          <div class="div_width">
            {{
              form[
                `purchasePrice${
                  userData.userType === "0" ? 0 : Number(userData.userType) - 1
                }`
              ]
            }}（元/件）
          </div>
        </el-form-item>
        <el-form-item label="官方指导价：">
          <div class="div_width">{{ form.marketPrice }}（元/件）</div>
        </el-form-item>
        <el-form-item label="邮费：">
          <div class="div_width">{{ form.expressPrice }}（元/件）</div>
        </el-form-item>
        <el-form-item label="货品名称：">
          <div class="div_width">{{ form.goodsName }}</div>
        </el-form-item>
        <el-form-item label="进货商家名称：" v-if="userData.userType === '0' || userData.userType === '1'">
          <div class="div_width">{{ form.buyerName }}</div>
        </el-form-item>
        <el-form-item label="样品拿货价：" v-if="userData.userType === '0' || userData.userType === '1'">
          <div class="div_width">{{ form.samplePrice }}（元/件）</div>
        </el-form-item>
        <el-form-item label="样品规格：" v-if="userData.userType === '0' || userData.userType === '1'">
          <div class="div_width">{{ form.sampleSpecifications }}</div>
        </el-form-item>
        <el-form-item label="库存数量：">
          <div class="div_width">{{ form.stockNum }}（件）</div>
        </el-form-item>
        <el-form-item label="已售数量：">
          <div class="div_width">{{ form.soldNum }}（件）</div>
        </el-form-item>
        <el-form-item label="添加时间：">
          <div class="div_width">{{ form.createTime }}</div>
        </el-form-item>
        <el-form-item label="添加人：">
          <div class="div_width">{{ form.createName }}</div>
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
          <div class="myimgbox" v-if="form.goodsImg && form.goodsImg.length > 0">
            <el-image
              class="myimg_css"
              :src="item"
              :preview-src-list="form.goodsImg"
              v-for="(item, index) in form.goodsImg"
              :key="index"
            ></el-image>
          </div>
          <img
            :src="require('@/img/zanwu.jpg')"
            class="myimg_css"
            v-else
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDetailData, getTypelist } from "@/axios/api";
import { storage_get } from "@/common/storage.js";
export default {
  name: "",
  data() {
    return {
      goodsTypeList: [],
      goodsTypename: null,
      userData: {
        accountName: null,
        userType: null,
        accountPhone: null,
      },
      form: {},
    };
  },
  props: {
    show: { default: false },
    goodsId: { default: "" },
  },
  watch: {
    show: function (val, oldVal) {
      if (val) {
        this.userData = storage_get("userdata");
        this.getData();
      }
    },
  },
  methods: {
    //获取类型
    getGoodsTypeList(goodsType) {
      getTypelist()
        .then((res) => {
          if (res.code === 0) {
            this.goodsTypeList = res.data;
            this.goodsTypeList.forEach((item) => {
              if (item.goodsType === goodsType) {
                this.goodsTypename = item.goodsTypename;
              }
            });
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
    //获取数据
    getData() {
      getDetailData(this.goodsId).then((res) => {
        if (res.code === 0) {
          if (res.data.goodsImg) {
            if (res.data.goodsImg.indexOf(",")) {
              res.data.goodsImg = res.data.goodsImg.split(",");
            } else {
              res.data.goodsImg = res.data.goodsImg.split(" ");
            }
          } else {
            res.data.goodsImg = [];
          }
          this.form = res.data;
          this.getGoodsTypeList(this.form.goodsType);
        }
      });
    },
    //关闭按钮
    handleClose() {
      this.$emit("handleClose");
    },
  },
};
</script>
<style scoped>
>>> .el-dialog__body {
  padding-top: 0;
}
>>> .el-image-viewer__close {
  color: #fff;
}
>>> .el-form-item {
  margin-bottom: 10px;
}
.myimgbox {
  width: 540px;
}
.div_width {
  width: 200px;
}
.myimg_css {
  width: 80px;
  height: 80px;
  margin: 10px 10px 0 0;
}
</style>