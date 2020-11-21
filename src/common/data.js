import Vue from 'vue'
Vue.prototype.pickerOptions = {
    shortcuts: [
        {
            text: "最近一周",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
            },
        },
        {
            text: "最近一个月",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
            },
        },
        {
            text: "最近三个月",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
            },
        },
    ],
};
Vue.prototype.leftList = [
    {
        statusname: "口红",
        goodsType: "0",
    },
    {
        statusname: "护肤品",
        goodsType: "2",
    },
    {
        statusname: "化妆品",
        goodsType: "1",
    },
    {
        statusname: "包包",
        goodsType: "3",
    },
    {
        statusname: "手表",
        goodsType: "4",
    },
    {
        statusname: "鞋子",
        goodsType: "5",
    },
    {
        statusname: "衣服",
        goodsType: "6",
    },
    {
        statusname: "裤子",
        goodsType: "7",
    },
    {
        statusname: "玩具",
        goodsType: "8",
    },
    {
        statusname: "其他",
        goodsType: "999",
    },
]
Vue.prototype.userTypeList = [{
    name: '超级管理员',
    userType: "0"
}, {
    name: '团队统领',
    userType: "1"
}, {
    name: '团队长老',
    userType: "2"
}, {
    name: '团队骨干',
    userType: "3"
}, {
    name: '团队成员',
    userType: "4"
}]