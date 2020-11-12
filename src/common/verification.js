import Vue from "vue"
Vue.prototype.rules = {
    goodsStatus: [
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
    purchasePrice: [
        {
            required: true,
            message: "货品进货价不能为空！",
            trigger: "blur",
        }
    ],
    marketPrice: [
        {
            required: true,
            message: "货品市场价不能为空！",
            trigger: "blur",
        }
    ],
    minPrice: [
        {
            required: true,
            message: "货品最低出售价不能为空！",
            trigger: "blur",
        }
    ]
}