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
        title: "口红",
        value: "0",
    },
    {
        title: "化妆品",
        value: "1",
    },
    {
        title: "护肤品",
        value: "2",
    },
    {
        title: "包包",
        value: "3",
    },
    {
        title: "手表",
        value: "4",
    },
    {
        title: "鞋子",
        value: "5",
    },
    {
        title: "衣服",
        value: "6",
    },
    {
        title: "裤子",
        value: "7",
    },
    {
        title: "其他",
        value: "8",
    },
]
Vue.prototype.levelList = [{
    name: '超级管理员',
    level: "1"
},{
    name: '总管理员',
    level: "1"
},{
    name: '一级管理员',
    level: "2"
},{
    name: '二级管理员',
    level: "3"
},{
    name: '代理成员',
    level: "4"
}]