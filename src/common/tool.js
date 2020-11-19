import Vue from "vue"
Vue.prototype.downloadIamge = (imgsrc, name) => {
    if(!name){
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

function toEmotion(text, isNoGif){
    var list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '愉快', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极', '嘿哈', '捂脸', '奸笑', '机智', '皱眉', '耶', '红包', '鸡'];
    if (!text) {
        return text;
    }

    text = text.replace(/\[[\u4E00-\u9FA5]{1,3}\]/gi, function(word){
        var newWord = word.replace(/\[|\]/gi,'');
        var index = list.indexOf(newWord);
        var backgroundPositionX = -index * 24
        var imgHTML = '';
        if(index<0){
            return word;
        }

        if (isNoGif) {
            if(index>104){
                return word;
            }
            imgHTML = `<i class="static-emotion" style="background:url(https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/default218877.gif) ${backgroundPositionX}px 0;"></i>`
        } else {
            var path = index>104 ? '/img' : 'https://res.wx.qq.com/mpres/htmledition/images/icon';
            imgHTML = `![](${path}/emotion/${index}.gif)`
        }
        return imgHTML;
    });
    return text;
}


Vue.directive('emotion', {
    bind: function (el, binding) {
        el.innerHTML = toEmotion(binding.value)
    }
});