import Vue from "vue"
Vue.prototype.rules = {
    goodsType: [
        {
            required: true,
            message: "货品类别不能为空！",
            trigger: "blur",
        }
    ],
    brandName: [
        {
            required: true,
            message: "货品品牌不能为空！",
            trigger: "blur",
        }
    ],
    modelName: [
        {
            required: true,
            message: "货品型号不能为空！",
            trigger: "blur",
        }
    ],
    specifications: [
        {
            required: true,
            message: "货品规格不能为空！",
            trigger: "blur",
        }
    ],
    color: [
        {
            required: true,
            message: "货品颜色不能为空！",
            trigger: "blur",
        },
        {
            validator: (rule, value, callback) => {
                let err = [];
                let reg = /^#[\da-f]{3}([\da-f]{3})?$/i
                if (!reg.test(value)) {
                    err = "颜色代码格式错误！";
                }
                callback(err);
            },
        },
    ],
    goodsName:[
        {
            required: true,
            message: "货品名称不能为空！",
            trigger: "blur",
        }
    ],
    purchasePrice0: [
        {
            required: true,
            message: "一级进货价不能为空！",
            trigger: "blur",
        }
    ],
    purchasePrice1: [
        {
            required: true,
            message: "二级进货价不能为空！",
            trigger: "blur",
        }
    ],
    purchasePrice2: [
        {
            required: true,
            message: "三级进货价不能为空！",
            trigger: "blur",
        }
    ],
    purchasePrice3: [
        {
            required: true,
            message: "四级进货价不能为空！",
            trigger: "blur",
        }
    ],
    marketPrice: [
        {
            required: true,
            message: "货品官方指导价不能为空！",
            trigger: "blur",
        }
    ],
}
Vue.prototype.addrules = {
    userType: [{
        required: true,
        message: "账号身份不能为空！",
        trigger: "change",
    }],
    account: [{
        required: true,
        message: "账号不能为空！",
        trigger: "blur",
    }],
    password: [{
        required: true,
        message: "密码不能为空！",
        trigger: "blur",
    }],
    accountName: [{
        required: true,
        message: "账号持有者不能为空！",
        trigger: "blur",
    }],
    accountPhone: [{
        required: true,
        message: "持有者电话不能为空！",
        trigger: "blur",
    }, {
        validator: (rule, value, callback) => {
            let err = [];
            let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
            if (!reg.test(value)) {
                err = "电话格式错误！";
            }
            callback(err);
        },
    }],
}