<template>
	<div class="mask">
		<van-loading type="spinner" color="white" id='waiting'/>
	</div>
</template>
<script>
	import Vue from "vue";
	import Rem from "@/utils/rem";
	import {
		Toast,
		Loading
	} from "vant";
	import {
		QYC
	} from "@/QYC/QYC";
	Vue.use(Toast);
	Vue.use(Loading);
	export default {
		data() {
			return {

			};
		},
		beforeCreate() {
			Rem.init(750)
		},
		created() {
			var self = this;
			self.QYC = new QYC(this);
			self.QYC.created();
		},
		mounted() {
			var self = this;
			self.QYC.mounted();
		},
		methods: {
			on_vue_created() {
				var self = this;
			},
			on_vue_mounted() {
				var self = this;
			},
		}
	};
</script>
<style lang="less">
	html,
	body {
		width: 100%;
		height: 100%;
	}
	.mask {
		width: 100%;height: 100%;background: rgba(0,0,0,.1);
		position: fixed;left: 0;top: 0;z-index: 999;
	}
	#waiting{
		position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin: auto;
	}
</style>
