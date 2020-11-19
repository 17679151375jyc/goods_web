<template>
  <div>
    <el-tabs
      v-model="form.goodsStatus"
      @tab-click="handleClick"
      type="border-card"
    >
      <el-tab-pane
        :label="item.title"
        :name="item.value"
        v-for="(item, index) in leftList"
        :key="index"
      >
        <div>
          <div class="sousuo_css">
            <div
              @click="searchShow = true"
              v-if="form.brandName || form.modelName || form.purchasePrice"
            >
                <span v-if="form.brandName">{{ form.brandName }}-</span>
                <span v-if="form.modelName">{{ form.modelName }} <span v-if="form.purchasePrice">-</span></span>
                <span v-if="form.purchasePrice">{{ form.purchasePrice }}</span>
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
              <td>{{ item.purchasePrice }}</td>
            </tr>
            <tr v-if="data.length === 0" && !loading>
              <td colspan="5">暂无数据</td>
            </tr>
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
          <el-form-item label="拿货价：">
            <el-input
              clearable
              type="number"
              :maxlength="4"
              v-model="dataForm.purchasePrice"
              placeholder="请输入拿货价"
              size="small"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="button_css" @click="search"
          >确认搜索</el-button
        >
        <el-button plain class="button_css" @click="searchShow = false"
          >取消</el-button
        >
      </div>
    </div>
        <div class="dis_row_between_center but_box_css">
          <span @click="$router.back()">返回</span>
          <span class="active" @click="$router.push({path:'/myInfo'})">账号信息</span>
        </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      searchShow: false,
      loading: false,
      pagination: {
        page: 1,
        size: 10,
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
        purchasePrice: "",
        goodsStatus: "0",
      },
      data: [
        {
          goodsId: "commodity000001", //货品编号
          goodsStatus: "0", //货品类型
          brandName: "mac", //品牌名称
          modelName: "小辣椒", //品牌型号
          specifications: "200g", //货品规格
          color: "#3388ff", //货品颜色
          stockNum: "99", //库存
          expressPrice: "10", //一件代发邮费
          buyerName: "彩妆店", //进货商家名称
          purchasePrice: "150", //进货价
          marketPrice: "189", //市场价
          minPrice: "170", //最低出售价
          maxPrice: "180", //最高出售价
          samplePrice: "12", //样品拿货价
          soldNum: 8, //已售数量
          sampleSpecifications: "15g", //样品规格
          goodsRemark: "max小辣椒，库存充足", //货品文案
          operationTime: "2020-11-08 15:00", //创建时间
          updateTime: "2020-11-11 15:00", //更新时间
          updateName: "蒋雨成", //操作人
          goodsImg: [
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1912478382,2180969249&fm=26&gp=0.jpg",
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=320079281,4280095860&fm=26&gp=0.jpg",
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1371154128,299347645&fm=26&gp=0.jpg",
          ], //商品图片
        },
      ],
    };
  },
  methods: {
    myInfo(){

    },
    //点击搜索
    search() {
      this.form.brandName = this.dataForm.brandName;
      this.form.modelName = this.dataForm.modelName;
      this.form.purchasePrice = this.dataForm.purchasePrice;
      this.searchShow = false;
    },
    //弹出搜索条件
    handleClose() {
      this.handleClose = true;
    },
    //详情
    detailClick(data) {
      this.$router.push({ path: "/detailApp" });
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
      setTimeout(() => {
        that.loading = false;
      }, 2000);
    },
    //tab页切换
    handleClick(tab) {
      this.form.goodsStatus = tab.name;
      this.getData();
    },
  },
};
</script>
<style scoped>
>>> .el-tabs__header {
  margin: 0;
}
>>> .el-tabs__nav-scroll {
  margin: 0 4vw;
}
>>> .el-tabs__item {
  line-height: 10vw;
}
>>> .el-tabs__nav-prev,
>>> .el-tabs__nav-next {
  line-height: 10vw;
  background-color: #fafafa;
  color: #000000;
  width: 10vw;
  text-align: center;
}
>>> .el-tabs__item.is-active {
  font-weight: bold;
}
>>> .el-tabs__content {
  padding: 0;
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
  height: 100vw;
  background-color: #fff;
  margin: 0 auto;
  padding: 2vw;
  border-radius: 2vw;
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
  width: 78vw;
  margin: 0 auto;
  margin-bottom: 3vw;
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