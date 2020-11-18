//保存数据到本地
export const storage_set = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
}
//获取保存到本地的数据
export const storage_get = (key) => {
	return JSON.parse(localStorage.getItem(key));
}
//清空一个本地的数据
export const storage_remove = (key) => {
	localStorage.removeItem(key);
}
// 清楚所有数据
export const storage_clear = () => {
	localStorage.clear();
}
// 查看全部数据
export const storage_valueOf = () => {
	localStorage.valueOf();
}
// 读取指定键值的数据名称
export const storage_key = (Number) => {
	localStorage.key(Number);
}
// 判断localstorage库是否含有某个属性
export const hasOwnProperty = (key) => {
	localStorage.hasOwnProperty(key);
}