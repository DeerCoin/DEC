/**
 * 本地存储
 */
class plusStorage {
	constructor(handler) {
		this.hasplus = false;
	}

	isphone() {
		if (window.plus) {
			this.hasplus = true;
		}
		return this.hasplus;
	}

	setItem(k, v) {
		var v = JSON.stringify(v)
		if (this.isphone()) {
			plus.storage.setItem(k, v);
		} else {
			localStorage.setItem(k, v);
		}
	}

	getItem(k) {
		var v = null;
		if (this.isphone()) {
			v = plus.storage.getItem(k);
		} else {
			v = localStorage.getItem(k);
		}
		if(v==null){
			return ""
		}
		return JSON.parse(v);
	}

	removeItem(k) {
		if (this.isphone()) {
			plus.storage.removeItem(k);
		} else {
			localStorage.removeItem(k);
		}
	}

	clear() {
		if (this.isphone()) {
			plus.storage.clear();
		} else {
			localStorage.clear();
		}
	}
}

export {
	plusStorage
};
