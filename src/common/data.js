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
        statuaid: "0",
    },
    {
        statusname: "化妆品",
        statuaid: "1",
    },
    {
        statusname: "护肤品",
        statuaid: "2",
    },
    {
        statusname: "包包",
        statuaid: "3",
    },
    {
        statusname: "手表",
        statuaid: "4",
    },
    {
        statusname: "鞋子",
        statuaid: "5",
    },
    {
        statusname: "衣服",
        statuaid: "6",
    },
    {
        statusname: "裤子",
        statuaid: "7",
    },
    {
        statusname: "玩具",
        statuaid: "8",
    },
    {
        statusname: "其他",
        statuaid: "999",
    },
]
Vue.prototype.levelList = [{
    name: '超级管理员',
    level: "0"
}, {
    name: '团队统领',
    level: "1"
}, {
    name: '团队长老',
    level: "2"
}, {
    name: '团队骨干',
    level: "3"
}, {
    name: '团队成员',
    level: "4"
}]