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
Vue.prototype.userTypeList = [{
    name: '超级管理员',
    userType: "0"
}, {
    name: '总管理员',
    userType: "1"
}, {
    name: '团队精英',
    userType: "2"
}, {
    name: '团队骨干',
    userType: "3"
}, {
    name: '团队成员',
    userType: "4"
}]