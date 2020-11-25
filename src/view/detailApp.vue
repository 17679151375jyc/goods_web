<template>
  <div>
    <transition name="slide-fade">
      <div v-if="show" class="page_css">
        <div class="dis_row_between_center box_css">
          <span>货品编号：</span>
          <span>{{ form.goodsId }}</span>
        </div>
        <div class="dis_row_between_center box_css">
          <span>类别：</span>
          <span>{{ goodsTypename }}</span>
        </div>
        <div class="dis_row_between_center box_css">
          <span>品牌：</span>
          <span>{{ form.brandName }}</span>
        </div>
        <div class="dis_row_between_center box_css">
          <span>型号：</span>
          <span>{{ form.modelName }}</span>
        </div>
        <div class="dis_row_between_center box_css">
          <span>规格：</span>
          <span>{{ form.specifications }}</span>
        </div>
        <div class="dis_row_between_center box_css">
          <span>颜色：</span>
          <p class="span_color" :style="{ 'background-color': form.color }"></p>
        </div>
        <div class="dis_row_between_center box_css" v-if="userData.userType === '0'">
          <span>一级进货价：</span>
          <span>{{ form.purchasePrice0 }}（元/件）</span>
        </div>
        <div class="dis_row_between_center box_css" v-if="userData.userType === '0'">
          <span>二级进货价：</span>
          <span>{{ form.purchasePrice1 }}（元/件）</span>
        </div>
        <div class="dis_row_between_center box_css" v-if="userData.userType === '0'">
          <span>三级进货价：</span>
          <span>{{ form.purchasePrice2 }}（元/件）</span>
        </div>
        <div class="dis_row_between_center box_css" v-if="userData.userType === '0'">
          <span>四级进货价：</span>
          <span>{{ form.purchasePrice3 }}（元/件）</span>
        </div>
        <div class="dis_row_between_center box_css" v-if="userData.userType !== '0'">
          <span>进货价：</span>
          <span>{{ form[`purchasePrice${(userData.userType === '0')?0:Number(userData.userType==='5'?'4':userData.userType)-1}`] }}（元/件）</span>
        </div>
        <div class="dis_row_between_center box_css">
          <span>官方指导价：</span>
          <span>{{ form.marketPrice }}（元/件）</span>
        </div>
        <div class="dis_row_between_center box_css">
          <span>货品名称：</span>
          <span>{{ form.goodsName }}</span>
        </div>
        <div class="dis_row_between_center box_css" v-if="userData.userType === '0'">
          <span>邮费：</span>
          <span>{{ form.expressPrice }}</span>
        </div>
        <div class="dis_row_between_center box_css" v-if="userData.userType === '0' || userData.userType === '1'">
          <span>进货商家名称：</span>
          <span>{{ form.buyerName }}</span>
        </div>
        <div class="dis_row_between_center box_css" v-if="userData.userType === '0' || userData.userType === '1'">
          <span>样品拿货价：</span>
          <span>{{ form.samplePrice }}（元/件）</span>
        </div>
        <div class="dis_row_between_center box_css" v-if="userData.userType === '0' || userData.userType === '1'">
          <span>样品规格：</span>
          <span>{{ form.sampleSpecifications }}</span>
        </div>
        <div class="dis_row_between_center box_css">
          <span>库存数量：</span>
          <span>{{ form.stockNum }}（件）</span>
        </div>
        <div class="dis_row_between_center box_css">
          <span>已售数量：</span>
          <span>{{ form.soldNum }}（件）</span>
        </div>
        <div class="dis_row_between_center box_css">
          <span>添加时间：</span>
          <span>{{ form.createTime }}</span>
        </div>
        <div class="dis_row_between_center box_css">
          <span>更新时间：</span>
          <span>{{ form.updateTime }}</span>
        </div>
        <div class="dis_row_between_center box_css" v-if="userData.userType === '0' || userData.userType === '1'">
          <span>最后更新人：</span>
          <span>{{ form.updateName }}</span>
        </div>
        <div class="dis_row_between_center box_css">
          <span>文案：</span>
          <span id="remark">{{ form.goodsRemark }}</span>
        </div>
        <div class="dis_row_between_center box_css" style="margin-bottom:15vw">
          <span>货品图片：</span>
          <div class="myimgbox">
            <div
              class="myimg_css dis_row_center_center"
              v-for="(item, index) in form.goodsImg"
              :key="index"
            >
              <el-image
                :src="item"
                fit="scale-down"
                :preview-src-list="form.goodsImg"
              ></el-image>
            </div>
          </div>
        </div>
        <div class="dis_row_between_center but_box_css">
          <span @click="$router.back()">返回</span>
          <span class="active" @click="wenanClick">复制文案</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { storage_get } from "@/common/storage.js";
import { getDetailData, getTypelist } from "@/axios/api";
export default {
  name: "",
  data() {
    return {
      goodsTypeList: [],
      goodsTypename: null,
      userData: {
        accountName: null,
        userType: null,
        accountPhone: null
      },
      show: false,
      form: {
        goodsId: "000001", //货品编号
        goodsStatus: "0", //货品类型
        brandName: "mac", //品牌名称
        modelName: "小辣椒", //品牌型号
        goodsName: "mac口红",  //  商品名称
        specifications: "200g", //货品规格
        color: "#3388ff", //货品颜色
        stockNum: "99", //库存
        expressPrice: "10", //邮费
        buyerName: "彩妆店", //进货商家名称
        purchasePrice0: "150", //进货价
        purchasePrice1: "160", //进货价
        purchasePrice2: "170", //进货价
        purchasePrice3: "180", //进货价
        marketPrice: "189", //官方指导价
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
  methods: {
    //获取类型
    getGoodsTypeList(goodsType) {
      getTypelist()
        .then((res) => {
          if (res.code === 0) {
            this.goodsTypeList = res.data;
            res.data.forEach(item=>{
              if(item.goodsType === goodsType){
                this.goodsTypename = item.goodsTypename
              }
            })
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
      let goodsId = this.$route.query.goodsId
      getDetailData(goodsId).then(res=>{
        if(res.code === 0){
          if (res.data.goodsImg) {
            if (res.data.goodsImg.indexOf(",")) {
              res.data.goodsImg = res.data.goodsImg.split(",");
            } else {
              res.data.goodsImg = res.data.goodsImg.split(" ");
            }
          } else {
            res.data.goodsImg = [];
          }
          if (this.userData.userType === "5") {
            res.data.purchasePrice3 = Number(res.data.purchasePrice3) + 10;
          }
          this.form = res.data
          this.getGoodsTypeList(this.form.goodsType);
        }
      })
    },
    wenanClick() {
      if (this.form.goodsRemark) {
        var val = document.getElementById("remark");
        window.getSelection().selectAllChildren(val);
        document.execCommand("Copy");
        this.$message({
          message: "文案已复制到剪切板!",
          type: "success",
          duration: 1000,
          customClass: "myalert_css1",
        });
      }
      if (!this.form.goodsRemark) {
        this.$message({
          message: "文案是空的哦！",
          type: "error",
          duration: 1000,
          customClass: "myalert_css1",
        });
        return;
      }
    },
  },
  mounted() {
    this.show = true;
    this.userData = storage_get("userdata");
    this.getData()
  },
};
</script>
<style scoped>
>>> .el-message {
  min-width: 70vw !important;
  top: 60vh !important;
}
>>> .el-image-viewer__close {
  color: #fff;
  top: 10px;
  right: 10px;
}
>>> .el-image-viewer__prev {
  left: 5px;
  opacity: 0.3;
}
>>> .el-image-viewer__next {
  right: 5px;
  opacity: 0.3;
}
>>> .el-image-viewer__actions {
  display: none;
}
.box_css {
  width: 92vw;
  padding: 2vw 4vw;
  min-height: 8vw;
  border-bottom: 1px solid #e7e7e8;
  font-size: 3.74vw;
  color: #555;
}
.box_css span:first-child {
  width: 30vw;
  height: 8vw;
  line-height: 8vw;
  display: block;
}
.box_css span:last-child {
  width: 65vw;
  display: block;
  text-align: right;
}
.span_color {
  width: 30px;
  height: 30px;
  display: block;
  border-radius: 5px;
}
.myimgbox {
  width: 100%;
}
.myimg_css {
  width: 30vw;
  height: 30vw;
  margin: 2vw;
  overflow: hidden;
  float: left;
  box-sizing: border-box;
  background-color: #fafafa;
}
.myimg_css img {
  max-width: 100%;
  max-height: 100%;
}
.but_box_css {
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
.but_box_css span {
  width: 40vw;
  height: 10vw;
  border-radius: 10vw;
  display: block;
  line-height: 10vw;
  text-align: center;
  background-color: #fff;
  color: #888;
  border: 1px solid #888;
}
.but_box_css .active {
  border: 0;
  background-color: #3388ff;
  color: #fff;
}
</style>