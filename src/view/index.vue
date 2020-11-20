<template>
  <div>
    <div class="dis_row_between_center header_box">
      <span class="color_text">JYCYL微商货源管理系统 </span>
      <div class="dis_row_between_center out_box_css">
        <span><i class="iconfont icongerenmingpian" style="margin-right:.5vw"></i>{{levelList[Number(userData.userType)].name}}</span>
        <span class="phone_css">{{userData.accountName}} / {{userData.accountPhone}}</span>
        <el-button type="primary" @click.stop="logouts" size="mini" plain>退出系统</el-button>
      </div>
    </div>
    <div class="dis_row_between_center">
      <div class="left_box">
        <el-menu
          :default-active="form.statusid"
          @select="butClick"
          class="el-menu-demo"
        >
        <div class="dis_row_end_center but_addsplb_css" v-if="userData.userType === '0'">
          <el-button type="primary" size="mini" @click="addLbClick">添加类别</el-button>
          <el-button type="danger" size="mini" @click="delLbShow = !delLbShow">删除类别</el-button>
        </div>
          <el-menu-item
            :index="item.statuaid"
            v-for="(item, index) in leftList"
            :key="index"
            >
            <div class="dis_row_between_center">
              <span>{{ item.statusname }}</span>
              <i v-if="delLbShow && index+1 != leftList.length"  class="el-icon-error" style="color:red" @click="delLbClick(index, item.statusname)"></i>
            </div>
            </el-menu-item
          >
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
            <el-form-item label="品牌：">
              <el-input
                clearable
                @keyup.enter.native="onSubmit"
                v-model="form.brandName"
                placeholder="请输入品牌名称"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="型号：">
              <el-input
                clearable
                @keyup.enter.native="onSubmit"
                v-model="form.modelName"
                placeholder="请输入型号名称"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="货品名称：">
              <el-input
                clearable
                @keyup.enter.native="onSubmit"
                type="number"
                v-model="form.goodsName"
                placeholder="请输入货品名称"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="进货价(元)：">
              <el-input
                clearable
                @keyup.enter.native="onSubmit"
                type="number"
                :maxlength="4"
                v-model="form.purchasePrice"
                placeholder="请输入拿货价"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="市场价(元)：">
              <el-input
                clearable
                @keyup.enter.native="onSubmit"
                type="number"
                v-model="form.marketPrice"
                placeholder="请输入市场价"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="添加时间：">
              <el-date-picker
                clearable
                v-model="form.createTime"
                type="datetimerange"
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
          <el-button v-if="userData.userType === '0'" type="primary" plain @click="adminShow = true;delLbShow = false">账号管理</el-button>
          <h2>{{ leftName }}</h2>
          <el-button v-if="userData.userType === '0'" type="primary" icon="el-icon-plus" @click="addClick"
            >添加商品</el-button
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
              prop="brandName"
              label="品牌"
              align="center"
              width="100px"
            ></el-table-column>
            <el-table-column
              prop="modelName"
              label="型号"
              align="center"
              width="100px"
            ></el-table-column>
            <el-table-column
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
                  <span :style="{'background-color': scope.row.color}"></span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="货品名称"
              align="center"
              width="110px"
            ></el-table-column>
            <el-table-column
              label="进货价"
              :prop="`purchasePrice${userData.userType}`"
              align="center"
              width="100px"
            ></el-table-column>
            <el-table-column
              label="市场价"
              prop="marketPrice"
              align="center"
              width="100px"
            >
            </el-table-column>
            <el-table-column
              prop="buyerName"
              label="进货商家名称"
              align="center"
              width="110px"
            ></el-table-column>
            <!-- <el-table-column
              prop="stockNum"
              label="库存"
              align="center"
              width="100px"
            ></el-table-column> -->
            <!-- <el-table-column
              label="已售数量"
              prop="soldNum"
              align="center"
              width="100px">
            </el-table-column> -->
            <!-- <el-table-column
              label="样品拿货价"
              prop="samplePrice"
              align="center"
              width="95px">
            </el-table-column> -->
            <!-- <el-table-column
              label="样品规格"
              prop="sampleSpecifications"
              align="center"
              width="100px">
            </el-table-column> -->
            <el-table-column
              prop="goodsRemark"
              label="货品文案"
              align="center"
            ></el-table-column>
            <el-table-column width="100px" label="货品图片" align="center">
              <template slot-scope="scope">
                <div>
                  <el-image
                  ref="img_tupian"
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
              </template></el-table-column>
            <el-table-column
              prop="createTime"
              label="添加时间"
              align="center"
              width="100px"
            ></el-table-column>
            <!-- <el-table-column
              prop="updateTime"
              label="更新时间"
              align="center"
              width="100px"
            ></el-table-column> -->
            <!-- <el-table-column
              prop="updateName"
              label="最后操作人"
              align="center"
              width="100px"
            ></el-table-column> -->
            <el-table-column
              label="操作"
              align="center"
              width="220px"
            >
              <template slot-scope="scope">
                <div class="dis_row_around_center">
                  <el-button v-if="userData.userType === '0'" type="primary" size="mini" @click="editClick(scope.row)"
                    >编辑</el-button
                  >
                  <el-button v-if="userData.userType === '0'" type="danger" size="mini" @click="delConfirm(scope.row)">删除</el-button>
                  <el-button
                    type="success"
                    @click="detailClick(scope)"
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
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pagination.size"
            layout="prev, pager, next, sizes, jumper"
            :total="pagination.total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <detail @handleClose="handleClose" :show="detailShow" />
    <addOrEdit
      @comfirm="addComfirm"
      @handleClose="addHandleClose"
      :show="addShow"
      :title="title"
    />
    <admin :show="adminShow" @handleClose="adminHandleClose"/>
  </div>
</template>

<script>
import { storage_get, storage_remove } from "@/common/storage.js"
import { getList } from "@/axios/api";
export default {
  name: "",
  components: {
    detail: () => import("./detail"),
    addOrEdit: () => import("./addOrEdit"),
    admin: () => import("./admin"),
  },
  data() {
    return {
      userData: {
        accountName: null,
        userType: null,
        accountPhone: null
      },
      delLbShow: false,
      leftName: "口红类货品列表",
      title: "编辑货品",
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
        statusid: "0",
        brandName: "",
        modelName: "",
        expressPrice: "",
        purchasePrice0: "",
        marketPrice: "",
        startTime: "",
        endTime: "",
      },
      data: [
        // {
        //   goodsId: "000001",//货品编号
        //   goodsStatus: "0",//货品类型
        //   brandName: "mac", //品牌名称
        //   modelName: "小辣椒",//品牌型号
        //   goodsName: "mac口红",//货品名称
        //   specifications: "200g",//货品规格
        //   color: "#3388ff",//货品颜色
        //   stockNum: "99",//库存
        //   expressPrice: "10",//一件代发邮费
        //   buyerName: "彩妆店",//进货商家名称
        //   purchasePrice0: "150",//进货价
        //   purchasePrice1: "160",//进货价
        //   purchasePrice2: "170",//进货价
        //   purchasePrice3: "180",//进货价
        //   marketPrice: "189",//市场价
        //   samplePrice: "12",//样品拿货价
        //   soldNum: 8,//已售数量
        //   sampleSpecifications: "15g",//样品规格
        //   goodsRemark: "max小辣椒，库存充足",//货品文案
        //   createTime: "2020-11-08 15:00",//创建时间
        //   updateTime: "2020-11-11 15:00",//更新时间
        //   updateName: "蒋雨成", //操作人
        //   goodsImg: [
        //     "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1912478382,2180969249&fm=26&gp=0.jpg",
        //     "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=320079281,4280095860&fm=26&gp=0.jpg",
        //     "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1371154128,299347645&fm=26&gp=0.jpg",
        //   ],//商品图片
        // },
      ],
    };
  },
  methods: {
    //获取列表
    getData(){
      this.tableLoading = true
      getList(this.form).then(res=>{
        this.tableLoading = false
        if(res.code === 0){
          if(res.data.length === 0){
            this.data = [];
            return;
          }
          res.data.forEach(item=>{
            item.goodsImg = item.goodsImg.split(' ')
          })
          this.data = res.data
        }
      })
    },
    //删除类别
    delLbClick(index, title){
      console.log(index, title)
      let that = this
      that.$confirm(`删除【${title}】类后该类别里的所有商品都将转入【其他】类别，是否继续该操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
          location.reload()
        }).catch(() => {
          this.delLbShow = true
        });
    },
    //添加类别弹窗
    addLbClick(){
        this.delLbShow = false
        this.$prompt('请输入类别名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          inputPattern: /^[\u4e00-\u9fa5]{1,4}$/,
          inputErrorMessage: '类别名称为1到4个汉字！'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '添加类别成功！'
          });
          location.reload()
        }).catch(() => {});
    },
    //关闭账号弹窗
    adminHandleClose(){
      this.adminShow = false
    },
    //侧边导航
    butClick(index) {
      this.delLbShow = false;
      this.leftName = this.leftList[index].statusname + "类货品列表";
      this.form.statusid = index;
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
    editClick() {
      this.delLbShow = false
      this.title = "编辑货品";
      this.addShow = true;
    },
    //点击添加按钮
    addClick() {
      this.delLbShow = false
      this.title = "添加货品";
      this.addShow = true;
    },
    //删除货品
    delConfirm(row) {
      this.delLbShow = false
      let that = this
      that.$confirm( `確定要删除货品【${row.brandName}/${row.modelName}】吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
          location.reload();
        }).catch(() => {});
    },
    //退出
    logouts(){
      let that = this
      this.delLbShow = false
      that.$confirm('確定要退出系统吗吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          storage_remove('userdata')
          that.$router.replace({path: "/login"})
          that.$message({
            type: 'success',
            message: '退出成功!'
          })
        }).catch(() => {});
    },
    //详情按钮
    detailClick(row){
      this.delLbShow = false
      this.detailShow = true
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
      this.getData();
    },
    //重置
    resetForm() {
      this.delLbShow = false;
      this.pagination.page = 1;
      this.pagination.size = 10;
      this.form.brandName = "";
      this.form.brandName = "";
      this.form.modelName = "";
      this.form.expressPrice = "";
      this.form.marketPrice = "";
      this.form.startTime = "";
      this.form.endTime = "";
      this.getData();
    },
    //翻页
    handleCurrentChange(page) {
      this.delLbShow = false
      this.pagination.page = page;
      this.getData();
    },
    //一页多条
    handleCurrentChange1(size) {
      this.delLbShow = false
      this.pagination.size = size;
      this.getData();
    },
  },
  created(){
    if(!storage_get('userdata').accountId){
      this.$router.replace({path: "/login"})
    }    
    this.userData = storage_get('userdata');
    this.getData();
  }
};
</script>
<style scoped>
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
  margin-left: 5px;
}
.dian_css {
  margin-left: 5px;
  font-size: 18px;
  font-weight: bold;
}
.but_addsplb_css{
  height: 30px;
  padding: 5%;
  border-bottom: 1px solid#E6E6E6;
}
.out_box_css{
  min-width: 200px;
  margin-right: 15px;
}
.out_box_css .phone_css{
  font-size: 12px;
  margin:0 10px;
  display: block;
  line-height: 20px;
}
</style>