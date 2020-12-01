<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {};
  },
  created() {
    //禁用f12
    document.oncontextmenu = new Function("return false;");
    //禁用浏览器右键
    document.onkeydown = document.onkeyup = document.onkeypress = function (
      event
    ) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 123) {
        e.returnValue = false;
        return false;
      }
    };
    //禁止浏览器缩放
    window.addEventListener(
      "mousewheel",
      function (event) {
        if (event.ctrlKey === true || event.metaKey) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
    //firefox
    window.addEventListener(
      "DOMMouseScroll",
      function (event) {
        if (event.ctrlKey === true || event.metaKey) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
  },
};
</script>

<style>
#app {
  width: 100vw;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  overflow-y: hidden;
  overflow-x: hidden;
  z-index: 1;
}
</style>
