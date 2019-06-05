import {
	openWebview,
	openWebviewFast,
	preLoad,
	showWebviewById,
	showWebviewFastById,
	closeCurrentWebview,
	getCurrentWebviewId
} from "@/utils/webview";


class qycview {
	constructor(handler) {
		this.hasplus = false;
	}

	isphone() {
		if(window.plus){
			this.hasplus = true;
		}
		return this.hasplus;
	}


	openWebview(config, style, extra) {
		var self = this;
		if (self.isphone()) {
			openWebview(config, style, extra)
		} else {
			window.location.href = config.url;
		}
	}

	showWebviewById(id) {
		var self = this;
		if (self.isphone()) {
			showWebviewById(id);
		} else {
			window.location.href = id + '.html';
		}
	}

	showWebviewFastById(id) {
		var self = this;
		if (self.isphone()) {
			showWebviewFastById(id);
		} else {
			window.location.href = id + '.html';
		}
	}

	preLoad(webviews = []) {
		var self = this;
		if (self.isphone()) {
			preLoad(webviews)
		} else {
			console.log('网页暂不支持预加载...');
		}
	}

	closeCurrentWebview() {
		var self = this;
		if (self.isphone()) {
			closeCurrentWebview();
		} else {
			console.log('网页暂不支持关闭...')
		}
	}
	
	getCurrentWebviewId() {
		var self = this;
		if (self.isphone()) {
			return getCurrentWebviewId();
		} else {
			return window.location.href;
		}
	}

}

export {
	qycview
};
