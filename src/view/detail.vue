<template>
  <div>
    <el-dialog
      title="货物详情"
      :visible.sync="show"
      width="60%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
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
    getData() {},
    //关闭按钮
    handleClose() {
      this.$emit("handleClose");
    },
  },
};
</script>
<style scoped>
</style>