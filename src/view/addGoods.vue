<template>
  <div class="page_css">
    <el-form
      label-width="35vw"
      :inline="true"
      :model="form"
      ref="formData"
      :rules="rules"
      class="demo-form-inline form-css"
    >
      <el-form-item label="类别：" prop="goodsType">
        <el-select
          v-model="form.goodsType"
          placeholder="请选择类别"
          class="input_css"
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
          class="input_css"
          v-model="form.brandName"
          placeholder="请输入品牌名称"
          size="small"
        ></el-input>
      </el-form-item>

      <el-form-item prop="modelName" label="型号：">
        <el-input
          clearable
          maxlength="30"
          class="input_css"
          v-model="form.modelName"
          placeholder="请输入型号"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="specifications" label="规格：">
        <el-input
          clearable
          maxlength="50"
          class="input_css"
          v-model="form.specifications"
          placeholder="请输入规格"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="color" label="颜色代码：">
        <div class="dis_row_between_center input_css" id="myInput">
          <el-input
            clearable
            maxlength="7"
            v-model="form.color"
            placeholder="请输入颜色"
            size="small"
          ></el-input>
          <el-color-picker v-model="form.color"></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item prop="goodsName" label="货品名称：">
        <el-input
          clearable
          maxlength="50"
          class="input_css"
          v-model="form.goodsName"
          placeholder="请输入货品名称"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="purchasePrice0" label="一级拿货价：">
        <el-input
          clearable
          type="number"
          class="input_css"
          v-model="form.purchasePrice0"
          placeholder="请输入一级拿货价"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="purchasePrice1" label="二级拿货价：">
        <el-input
          clearable
          type="number"
          class="input_css"
          v-model="form.purchasePrice1"
          placeholder="请输入二级拿货价"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="purchasePrice2" label="三级拿货价：">
        <el-input
          clearable
          type="number"
          class="input_css"
          v-model="form.purchasePrice2"
          placeholder="请输入三级拿货价"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="purchasePrice3" label="四级拿货价：">
        <el-input
          clearable
          type="number"
          class="input_css"
          v-model="form.purchasePrice3"
          placeholder="请输入四级拿货价"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="marketPrice" label="官方指导价：">
        <el-input
          clearable
          type="number"
          class="input_css"
          v-model="form.marketPrice"
          placeholder="请输入官方指导价"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="expressPrice" label="邮费：">
        <el-input
          clearable
          type="number"
          maxlength="20"
          class="input_css"
          v-model="form.expressPrice"
          placeholder="请输入邮费"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="buyerName" label="进货商家名称：">
        <el-input
          clearable
          maxlength="30"
          class="input_css"
          v-model="form.buyerName"
          placeholder="请输入进货商家名称"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="samplePrice" label="样品拿货价：">
        <el-input
          clearable
          type="number"
          class="input_css"
          v-model="form.samplePrice"
          placeholder="请输入样品拿货价"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="sampleSpecifications" label="样品规格：">
        <el-input
          clearable
          maxlength="30"
          class="input_css"
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
          class="input_css"
          v-model="form.stockNum"
          placeholder="请输入库存数"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="goodsRemark" label="文案：">
        <el-input
          class="input_css"
          clearable
          rows="6"
          show-word-limit
          resize="none"
          maxlength="500"
          v-model="form.goodsRemark"
          placeholder="请输入文案"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="货品图片：">
        <div class="input_css" style="width:45vw">
          <div class="img_tupian" v-for="(item, index) in imgList" :key="index">
            <el-image
              v-if="imgList.length > 0"
              ref="img_tupian"
              style="width: 100%; height: 100%"
              :src="item"
              :preview-src-list="imgList"
              @click.stop="handleClickItem"
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
      <el-form-item>
        <div class="dis_column_center_center box_but_css">
          <el-button
            class="but_css but_color_css"
            type="primary"
            @click="comfirm"
            round
            :loading="loading"
            >{{butName}}</el-button
          >
          <el-button
            :loading="loading"
            class="but1_css"
            @click="$router.back()"
            round
            >返回</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { storage_get } from "@/common/storage.js";
import {
  addUser,
  updataImg,
  delImg,
  getTypelist,
  addData,
  getDetailData,
  updataData,
} from "@/axios/api";
export default {
  name: "",
  data() {
    return {
      butName: "确认添加",
      goodsId: null,
      goodsTypeList: [],
      loading: false,
      imgList: [],
      form: {
        goodsType: "",
        brandName: "",
        modelName: "",
        specifications: "",
        color: "#CE192A",
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
    };
  },
  methods: {
    //获取类型
    getGoodsTypeList() {
      getTypelist()
        .then((res) => {
          if (res.code === 0) {
            this.goodsTypeList = res.data;
          } else {
            this.goodsTypeList = [];
          }
        })
        .catch((err) => {
          this.goodsTypeList = [];
        });
    },
    //删除图片
    delImgClick(index) {
      let key = this.imgList[index];
      key = key.substring(55, key.length);
      this.loading = true;
      delImg(key).then((res) => {
        this.imgList.splice(index, 1);
        this.loading = false;
      });
    },
    //上传图片
    fileChange(e) {
      let that = this;
      let file = e.target.files;
      file.forEach((item) => {
        let formData = new FormData();
        formData.append("file", item);
        that.loading = true;
        updataImg(formData).then((res) => {
          if (res.code === 0) {
            that.imgList.push(res.msg);
          }
          setTimeout(() => {
            that.loading = false;
          }, 200);
        });
      });
    },
    updateClick() {
      this.$refs.res_imginput.click();
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
    comfirm() {
      let that = this;
      this.$refs["formData"].validate(async (valid) => {
        if (valid) {
          if (this.goodsId) {
            this.form.updateName = storage_get("userdata").accountName;
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
                  customClass: "myalert_css1",
                  duration: 1000,
                });
                that.$router.back();
              }
            });
          } else {
            this.form.createName = storage_get("userdata").accountName;
            this.form.goodsImg = this.imgList.toString();
            addData(this.form).then((res) => {
              if (res.code === 0) {
                that.$message({
                  type: "success",
                  message: "添加成功!",
                  duration: 1000,
                  customClass: "myalert_css1",
                });
                that.$refs["formData"].resetFields();
                that.$router.back();
              }
            });
          }
        }
      });
    },
  },
  created() {
    this.form.goodsType = this.$route.query.goodsType;
    this.getGoodsTypeList();
    if (this.$route.query.goodsId) {
      this.goodsId = this.$route.query.goodsId;
      this.butName = "确认编辑"
      this.getData();
    }
  },
};
</script>
<style scoped>
.page_css{
  z-index: 100000;
}
>>> .el-form-item {
  margin-bottom: 3.5vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
>>> .el-textarea .el-input__count {
  bottom: -3vw;
}
>>> .el-image-viewer__actions {
  display: none;
}
>>>.el-input__suffix{
  right: 20px;
}
>>>#myInput .el-input__inner{
  width:45vw
}
.box_but_css {
  width: 90vw;
}
.but_css {
  width: 100%;
}
.but1_css {
  width: 100%;
  margin: 3vw 0 0 0;
}
.form-css {
  width: 96vw;
  padding: 0 2vw;
  margin: 2vw auto;
}
.img_tupian {
  width: 17vw;
  height: 17vw;
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
  font-size: 17vw;
  width: 100%;
  color: #c7c6c5;
  cursor: pointer;
}
</style>