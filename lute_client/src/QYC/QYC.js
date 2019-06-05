import {
	request
} from "@/utils/request";

import {
	websocket
} from "@/QYC/network";

import {
	qycview
} from "@/QYC/qycview";

import {
	login
} from "@/QYC/login";

import {
	plusStorage
} from "@/QYC/plusStorage";

class QYC {
	constructor(handler) {
		this._queues = [];
		this.handler = handler;
		this.looptimerid = null;
		this.httplock = false;
		this.ws = null;
		this.qycview = new qycview();
		this.lg = null;
		this.ps = new plusStorage();
	}
	
	loginInit(){
		this.lg = new login(this.handler);
		this.lg.init();
	}
	
	loginById(id){
		this.lg.loginById(id);
	}
	
	click(name,data){
		var self = this;
		var fname = "on_click" + "_" + name;
		
		var f = self.handler[fname];
		if (f) {
			f(data);
		} else {
			console.error("没有找到该方法:" + fname)
		}
	}
	
	openWebview(config, style, extra) {
		var self = this;
		self.qycview.openWebview(config, style, extra);
	}
	
	showWebviewById(id){
		var self = this;
		self.qycview.showWebviewById(id);
	}
	
	showWebviewFastById(id){
		var self = this;
		self.qycview.showWebviewFastById(id);
	}
	
	preLoad(webviews = []){
		var self = this;
		self.qycview.preLoad(webviews);
	}
	
	closeCurrentWebview(){
		var self = this;
		self.qycview.closeCurrentWebview();
	}
	
	getCurrentWebviewId(){
		var self = this;
		return self.qycview.getCurrentWebviewId();
	}
	
	getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	  }

	openwebsocket(url) {
		this.url = url;
		this.ws = new websocket();
		this.ws.init(this.url, this);
		this.ws.connect();
	}

	closewebsocket() {
		if (this.ws) {
			this.ws.close()
			this.ws = null
		}
	}

	wssend(data) {
		if (this.ws.readyState() == "OPEN") {
			this.ws.send(data)
		}
	}

	get(config) {
		var self = this;
		if (self.httplock) {
			return
		}
		self.httplock = true;
		request({
				url: config.url,
				params: config.params,
				method: 'get'
			})
			.then(res => {
				self.httplock = false;
				self._queues.push({
					data: res.data,
					event_type: "http",
					name: config.name,
					err: 0
				});
			})
			.catch(err => {
				self.httplock = false;
				self._queues.push({
					data: err,
					event_type: "http",
					name: config.name,
					err: 404
				});
			});
	}

	wsonopen() {
		// console.error("wsonopen")
		this._queues.push({
			data: {},
			event_type: "ws",
			name: "open",
			err: 0
		})

	}

	wsonclose() {
		// console.error("___ssswsclose")
		// console.log(JSON.stringify(this))
		this._queues.push({
			data: {},
			event_type: "ws",
			name: "close",
			err: 0
		})
	}

	wsonerror() {
		// console.error("wsonerror")
		this._queues.push({
			data: {},
			event_type: "ws",
			name: "error",
			err: 0
		})
	}

	wsonmessage(data) {
		this._queues.push({
			data: data,
			event_type: "ws",
			name: "message",
			err: 0
		})
	}

	post(config) {
		var self = this;
		if (self.httplock) {
			return
		}
		self.httplock = true;
		request({
				url: config.url,
				method: 'post',
				data: config.params,
			})
			.then(res => {
				self.httplock = false;
				self._queues.push({
					data: res.data,
					event_type: "http",
					name: config.name
				});
			})
			.catch(err => {
				self.httplock = false;
				self._queues.push({
					data: err,
					event_type: "http",
					name: config.name,
					err: 404
				});
			});
	}

	created() {
		var f = this.handler['on_vue_created'];
		if (f) {
			f();
		}
		this.start();
	}

	mounted() {
		var f = this.handler['on_vue_mounted'];
		if (f) {
			f();
		}
	}

	loop() {
		var self = this;
		if (self._queues.length > 0 && !self.locked && !self.httplock) {
			var cmd = self._queues.shift();
			self.locked = true;
			var fname = "on_" + cmd['event_type'] + "_" + cmd['name'];


			switch (fname) {
				case "on_ws_message":
					fname = "on_wsdata" + "_" + cmd['data']["name"];
					var f = self.handler[fname];
					if (f) {
						f(cmd["data"]);
					} else {
						console.error("没有找到数据命令的处理接口1:" + fname)
					}
					break;
				case "on_ws_close":
				case "on_ws_open":
				case "on_ws_error":
					var f = self.handler[fname];
					if (f) {
						f();
					}
					break;
				default:
					var f = this.handler[fname];
					if (f) {
						f(cmd);
					} else {
						console.error("没有找到命令的处理接口:" + fname)
					}
					break;
			}
			self.locked = false;
		}
	}

	start() {
		var self = this;
		self.locked = false;
		self.looptimerid = setInterval(function() {
			self.loop();
		}, 50);
	}

	stop() {
		var self = this;
		if (self.looptimerid) {
			clearInterval(self.looptimerid);
			self.looptimerid = null;
			self._queues.length = 0;
		}
	}
	
	setItem(k,v) {
		this.ps.setItem(k,v);
	}
	
	getItem(k) {
		return this.ps.getItem(k);
	}
	
	removeItem(k) {
		this.ps.removeItem(k);
	}
	
	clear() {
		this.ps.clear();
	}

}

export {
	QYC
};
