<template>
  <div>
    <el-dialog
      title="账号管理"
      :visible.sync="show"
      width="1000px"
      top="50px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form
        :inline="true"
        :model="form"
        ref="formData"
        class="demo-form-inline"
      >
        <el-form-item label="账号：">
          <el-input
            style="width: 180px"
            clearable
            v-model="form.account"
            placeholder="请输入账号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input
            style="width: 180px"
            clearable
            v-model="form.account_phone"
            placeholder="请输入手机号"
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
      <div class="dis_row_end_center but_box_css">
        <el-button
          size="small"
          icon="el-icon-plus"
          type="primary"
          @click="
            addAdminShow = true;
            title = '添加账号';"
          >添加账号</el-button
        >
      </div>
      <el-table
        ref="multipleTable"
        :data="data"
        stripe
        border
        v-loading="tableLoading"
        ><el-table-column
          label="序号"
          type="index"
          align="center"
          width="50px"
        ></el-table-column>
        <el-table-column
          label="账号身份"
          prop="level"
          align="center"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="account"
          label="账号"
          align="center"
          width="130px"
        ></el-table-column>
        <el-table-column
          label="密码"
          prop="password"
          align="center"
          width="120px"
        ></el-table-column>
        <el-table-column
          label="持有者"
          prop="accountName"
          align="center"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="手机号"
          prop="account_phone"
          align="center"
          width="120px"
        ></el-table-column>

        <!-- <el-table-column
          label="操作时间"
          prop="operationTime"
          align="center"
          width="100px"
        ></el-table-column> -->
        <el-table-column
          prop="remark"
          label="备注"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template slot-scope="scope">
            <div class="dis_row_around_center">
              <el-button
                v-if="scope.row.status === '0'"
                type="success"
                size="mini"
                @click="enableConfirm(scope.row)"
                >启用</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="detailClick(scope.row)"
                >编辑</el-button
              >
              <el-button
                v-if="scope.row.status === '1'"
                type="warning"
                size="mini"
                @click="disConfirm(scope.row)"
                >禁用</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="delConfirm(scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>

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
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
    <add
      :title="title"
      :show="addAdminShow"
      @handleClose="addAdminHandleClose"
      @comfirm="addAdminComfirm"
    />
  </div>
</template>

<script>
export default {
  name: "",
  components: {
    add: () => import("./add"),
  },
  data() {
    return {
      title: "添加账号",
      addAdminShow: false,
      form: {
        account: "",
        account_phone: "",
      },
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      },
      data: [
        {
          status: "1",
          level: "超级管理员",
          account: "jyc17679151375",
          password: "q123456",
          accountName: "蒋雨成",
          account_phone: "17679151375",
          remark: "无",
          operationTime: "2020-11-08 15:00",
        },
      ],
      tableLoading: false,
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
    detailClick(row) {
      this.title = "编辑账号";
      this.addAdminShow = true;
    },
    //确认添加
    addAdminHandleClose() {
      this.addAdminShow = false;
    },
    //取消添加
    addAdminComfirm() {
      this.addAdminShow = false;
    },
    //查询
    onSubmit() {},
    //重置
    resetForm() {},
    //翻页
    handleCurrentChange(page) {
      this.pagination.page = page;
    },
    //一页多条
    handleCurrentChange1(size) {
      this.pagination.size = size;
    },
    getData() {},
    //关闭按钮
    handleClose() {
      this.$emit("handleClose");
    },
    //确认删除
    delConfirm(row) {
      console.log(row);
      let that = this;
      that
        .$confirm("确定要删除该账号吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          that.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {});
    },
    //禁用
    disConfirm() {
      console.log(row);
    },
    //启用
    enableConfirm() {},
  },
};
</script>
<style scoped>
.but_box_css {
  width: 100%;
  height: 50px;
}
.footer {
  padding: 15px 20px 10px 30px;
  text-align: right;
}
</style>