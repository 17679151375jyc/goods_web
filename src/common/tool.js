import Vue from "vue"
//时间格式转换
Vue.prototype.getTimeToDate = (timestamp, type) => {
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
  let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());          // eslint-disable-line no-unused-vars
  let ii = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());    // eslint-disable-line no-unused-vars
  let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());          // eslint-disable-line no-unused-vars
  if (type == 'D') {
    return Y + M + D;
  } else if (type == 'H') {
    return Y + M + D + ' ' + hh
  } else if (type == 'M') {
    return Y + M + D + ' ' + hh + ':' + ii
  } else {
    return Y + M + D + ' ' + hh + ':' + ii + ':' + ss;
  }
}
Vue.prototype.downloadIamge = (imgsrc, name) => {
  if (!name) {
    name = imgsrc.substring(imgsrc.lastIndexOf("/") + 1, imgsrc.lastIndexOf("."));
  }
  //下载图片地址和图片名
  let image = new Image();
  // 解决跨域 Canvas 污染问题
  image.setAttribute("crossOrigin", "anonymous");
  image.onload = function () {
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);
    let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
    let a = document.createElement("a"); // 生成一个a元素
    let event = new MouseEvent("click"); // 创建一个单击事件
    a.download = name || "photo"; // 设置图片名称
    a.href = url; // 将生成的URL设置为a.href属性
    a.dispatchEvent(event); // 触发a的单击事件
  };
  image.src = imgsrc;
}
Vue.prototype.handleClickItem = () => {
  setTimeout(() => {
    let domImageMask = document.querySelector(".el-image-viewer__mask");
    console.log(domImageMask)
    if (!domImageMask) {
      return;
    }
    domImageMask.addEventListener("click", () => {
      // 点击遮罩层时调用关闭按钮的 click 事件
      document.querySelector(".el-icon-circle-close").click();
    });
  }, 100);
}