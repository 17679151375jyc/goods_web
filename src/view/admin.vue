<template>
  <div>
    <el-dialog
      title="账号管理"
      :visible.sync="show"
      width="1000px"
      top="50px"
      :append-to-body="true"
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
            @keyup.enter.native="onSubmit"
            style="width: 180px"
            clearable
            v-model="form.account"
            placeholder="请输入账号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input
            @keyup.enter.native="onSubmit"
            style="width: 180px"
            clearable
            v-model="form.accountPhone"
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
            title = '添加';
          "
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
          prop="userType"
          align="center"
          width="100px"
        >
          <template slot-scope="scope">
            <div>
              {{ userTypeList[Number(scope.row.userType)].name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="账号"
          align="center"
          width="130px"
        ></el-table-column>
        <!-- <el-table-column
          label="密码"
          prop="password"
          align="center"
          width="120px"
        ></el-table-column> -->
        <el-table-column
          label="持有者"
          prop="accountName"
          align="center"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="手机号"
          prop="accountPhone"
          align="center"
        ></el-table-column>
        <!-- <el-table-column
          prop="remark"
          label="备注"
          align="center"
        ></el-table-column> -->
        <el-table-column label="操作" align="center" width="300px">
          <template slot-scope="scope">
            <div class="dis_row_center_center">
              <el-button
                v-if="scope.row.status === '0'"
                type="success"
                size="mini"
                :loading="butLoading"
                @click="enableConfirm(scope.row)"
                >启用</el-button
              >
              <el-button
                v-if="scope.row.status === '1' && scope.row.accountId != '000001'"
                type="warning"
                size="mini"
                :loading="butLoading"
                @click="disConfirm(scope.row)"
                >禁用</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="detailClick(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="mini"
                v-if="scope.row.accountId != '000001'"
                @click="delConfirm(scope.row)"
                >删除</el-button
              >
              <el-button
                type="success"
                size="mini"
                @click="detailConfirm(scope.row)"
                >详情</el-button
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
      :accountId="accountId"
      @handleClose="addAdminHandleClose"
      @comfirm="addAdminComfirm"
    />
    <accountDetail
      :accountId="accountId"
      @handleClose="detailHandleClose"
      :show="accountDetailShow"/>
  </div>
</template>

<script>
import { getUserInfo, delUser, editUser } from "@/axios/api";
import { storage_get } from "@/common/storage.js";
export default {
  name: "",
  components: {
    add: () => import("./add"),
    accountDetail: () => import("./accountDetail"),
  },
  data() {
    return {
      accountDetailShow: false,
      butLoading: false,
      accountId: "",
      userData: {
        accountName: null,
        userType: null,
        accountPhone: null,
      },
      title: "添加",
      addAdminShow: false,
      form: {
        account: "",
        accountPhone: "",
      },
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      },
      data: [],
      tableLoading: false,
    };
  },
  props: {
    show: { default: false },
  },
  watch: {
    show: function (val, oldVal) {
      if (val) {
        this.userData = storage_get("userdata");
        this.resetForm();
      }
    },
  },
  methods: {
    detailClick(row) {
      this.title = "编辑";
      this.accountId = row.accountId;
      this.addAdminShow = true;
    },
    //取消添加
    addAdminHandleClose() {
      this.addAdminShow = false;
    },
    //确认添加
    addAdminComfirm() {
      this.addAdminShow = false;
      this.getData();
    },
    //查询
    onSubmit() {
      this.getData();
    },
    //重置
    resetForm() {
      this.pagination.page = 1;
      this.pagination.size = 10;
      this.form.account = "";
      this.form.accountPhone = "";
      this.getData();
    },
    //翻页
    handleCurrentChange(page) {
      this.pagination.page = page;
      this.getData();
    },
    //一页多条
    handleCurrentChange1(size) {
      this.pagination.size = size;
      this.getData();
    },
    //获取数据
    getData() {
      this.tableLoading = true;
      this.form.size = this.pagination.size;
      this.form.current = this.pagination.page;
      getUserInfo(this.form)
        .then((res) => {
          this.tableLoading = false;
          if (res.code === 0) {
            this.data = res.data.records;
            this.pagination.total = res.data.total
          }
        })
        .catch((err) => {
          this.data = [];
        });
    },
    //关闭弹窗按钮
    handleClose() {
      this.$emit("handleClose");
    },
    //详情
    detailConfirm(row){
      this.accountId = row.accountId;
      this.accountDetailShow = true
    },
    detailHandleClose(){
      this.accountDetailShow = false
    },
    //确认删除
    delConfirm(row) {
      let that = this;
      if (row.accountId === "000001") {
        that.$message({
          type: "warning",
          message: "该账号不可删除！",
        });
        return;
      }
      that
        .$confirm("确定要删除该账号吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          delUser(row.accountId).then((res) => {
            if (res.code === 0) {
              that.$message({
                type: "success",
                message: "删除成功!",
              });
            }
            that.getData();
          });
        })
        .catch((err) => {});
    },
    //禁用
    disConfirm(row) {
      if (row.accountId === "000001") {
        this.$message({
          type: "warning",
          message: "该账号不可禁用！",
        });
        return;
      }
      let data = {
        accountId: row.accountId,
        status: "0",
      };
      this.butLoading = true
      editUser(data).then((res) => {
        this.butLoading = false
        this.$message({
          type: "success",
          message: "禁用成功!",
        });
        this.getData();
      });
    },
    //启用
    enableConfirm(row) {
      let data = {
        accountId: row.accountId,
        status: "1",
      };
      this.butLoading = true
      editUser(data).then((res) => {
        this.butLoading = false
        this.$message({
          type: "success",
          message: "启用成功!",
        });
        this.getData();
      });
    },
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