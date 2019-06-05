// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import hotfix from 'h5plus-hotfix';
import "./utils/common";
import App from "./App";
import {
	request
} from "@/utils/request";

function downWgt(downpath) {
	plus.nativeUI.showWaiting("下载热更新文件...");
	plus.downloader.createDownload(downpath, {
		filename: "_doc/update/"
	}, function(d, status) {
		if (status == 200) {
			console.log("下载热更新成功：" + d.filename);

			installWgt(d.filename); // 安装wgt包
		} else {
			console.log("下载热更新失败！");
			plus.nativeUI.alert("下载热更新失败！");
		}
		plus.nativeUI.closeWaiting();
	}).start();
}

function installWgt(path) {
	plus.nativeUI.showWaiting("安装wgt文件...");
	plus.runtime.install(path, {}, function(e) {
		// console.log(JSON.stringify(e))
		plus.nativeUI.closeWaiting();
		console.log("安装热更新文件成功！");
		plus.nativeUI.alert("应用资源更新完成！", function() {
			// plus.runtime.restart();
			plus.runtime.quit();
		});
	}, function(e) {
		plus.nativeUI.closeWaiting();
		console.log("安装热更新文件失败[" + e.code + "]：" + e.message);
		// plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
	});
};

// if (window.plus){
// 	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
// 		//获取当前版本号
// 		var version=inf.version;
// 		console.log(version)
// 		console.log(process.env.VER_API)
// 		request({
// 				url: process.env.VER_API,
// 				params: {},
// 				method: 'get'
// 			})
// 			.then(res => {
// 				console.log(res.data)
// 				
// 				if(version != res.data.version){
// 					// downWgt(res.data.downpath)
// 					downWgt('http://hbuilder.573q3.cn/H5DD6010E.wgt')
// 					// console.log('gengxin')
// 				}
// 			})
// 			.catch(err => {
// 				console.log(err)
// 			});
// 	})
// }


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: "#app",
	components: {
		App
	},
	template: "<App/>"
});


