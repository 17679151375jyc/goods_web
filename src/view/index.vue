<template>
  <div>
    <div class="dis_row_between_center header_box">
      <span class="color_text">JYCYL微商货源管理系统 </span>
      <div @click.stop="logouts" style="width: 80px; cursor: pointer">
        退出系统
      </div>
    </div>
    <div class="dis_row_between_center">
      <div class="left_box">
        <el-menu
          :default-active="indexval"
          @select="butClick"
          class="el-menu-demo"
        >
          <el-menu-item index="0">口红</el-menu-item>
          <el-menu-item index="1">护肤品</el-menu-item>
          <el-menu-item index="2">化妆品</el-menu-item>
          <el-menu-item index="3">鞋子</el-menu-item>
          <el-menu-item index="4">衣服</el-menu-item>
          <el-menu-item index="5">裤子</el-menu-item>
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
                v-model="form.name"
                placeholder="请输入品牌名称"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="型号名称：">
              <el-input
                v-model="form.name"
                placeholder="请输入型号名称"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="拿货价：">
              <el-input
                v-model="form.name"
                placeholder="请输入拿货价"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="市场价：">
              <el-input
                v-model="form.name"
                placeholder="请输入市场价"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="出手价：">
              <el-input
                v-model="form.name"
                placeholder="请输入出手价"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="操作时间：">
              <el-input
                v-model="form.name"
                placeholder="请输入操作时间"
                size="small"
              ></el-input>
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
          <el-button type="primary" plain>账号管理</el-button
          >
          <h3>口红</h3>
          <el-button type="primary" icon="el-icon-plus" @click="addClick"
            >添加商品</el-button
          >
        </div>
        <div class="form_box_css table_height_css">
          <el-table
            ref="multipleTable"
            :data="data"
            stripe
            border
            v-loading="tableLoading"
          >
            <el-table-column
              label="序号"
              type="index"
              align="center"
              width="100px"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="品牌"
              align="center"
              width="150px"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="型号"
              align="center"
              width="150px"
            ></el-table-column>
            <el-table-column
              label="拿货价(元/件)"
              prop="name"
              align="center"
              width="150px"
            ></el-table-column>
            <el-table-column
              label="市场价(元/件)"
              prop="name"
              align="center"
              width="150px"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="出手价范围(元/件)"
              align="center"
              width="200px"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="描述"
              align="center"
            ></el-table-column>
            <el-table-column
              width="250px"
              prop="name"
              label="货物图片"
              align="center"
            >
              <template>
                <div class="dis_row_center_center">
                  <img class="img_tupian" :src="require('@/img/1.jpg')" />
                  <img class="img_tupian" :src="require('@/img/1.jpg')" />
                  <span class="dian_css">...</span>
                </div>
              </template></el-table-column
            >
            <el-table-column
              type="index"
              label="操作"
              align="center"
              width="220px"
            >
              <template>
                <div class="dis_row_around_center">
                  <el-button type="primary" size="mini" @click="editClick"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    title="确定删除该商品吗？"
                    @confirm="delConfirm"
                  >
                    <el-button
                      slot="reference"
                      type="danger"
                      size="mini"
                      @cancel="delCancel"
                      >删除</el-button
                    >
                  </el-popconfirm>
                  <el-button
                    type="success"
                    @click="detailShow = true"
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
      @addComfirm="addComfirm"
      @handleClose="addHandleClose"
      :show="addShow"
      :title="title"
    />
  </div>
</template>

<script>
export default {
  name: "",
  components: {
    detail: () => import("./detail"),
    addOrEdit: () => import("./addOrEdit"),
  },
  data() {
    return {
      indexval: "0",
      form: {
        name: "",
      },
      data: [
        {
          name: "1",
        },
      ],
      tableLoading: false,
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      },
      detailShow: false,
      addShow: false,
      title: "编辑货物",
    };
  },
  methods: {
    //侧边导航
    butClick(index) {
      this.indexval = index;
    },
    //详情关闭按钮
    handleClose() {
      this.detailShow = false;
    },
    //新增关闭按钮
    addHandleClose() {
      this.addShow = false;
    },
    //新增确定
    addComfirm() {
      this.addShow = false;
    },
    //点击编辑按钮
    editClick() {
      this.title = "编辑货物";
      this.addShow = true;
    },
    //点击添加按钮
    addClick() {
      this.title = "添加货物";
      this.addShow = true;
    },
    onSubmit() {},
    resetForm() {},
    handleCurrentChange(page) {
      this.pagination.page = page;
    },
    handleCurrentChange1(size) {
      this.pagination.size = size;
    },
    delConfirm() {},
    delCancel() {},
  },
};
</script>
<style scoped>
>>> .el-menu-item.is-active {
  border-right: 2px solid #38f;
}
.header_box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #2658ed;
  color: #ffffff;
}
.color_text {
  min-width: 260px;
  font-size: 17px;
  margin-left: 15px;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
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
  height: 56vh;
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
</style>