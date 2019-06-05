<template>
	<div>

	</div>
</template>
<script>
	import Vue from "vue";
	import Rem from "@/utils/rem";
	import {
		request
	} from "@/utils/request";
	import {
		QYC
	} from "@/QYC/QYC";
	import {
		Toast,
	} from "vant";
	export default {
		components: {
			[Toast.name]: Toast,
		},
		data() {
			return {
				QYC: null,
				jwt: "",
			};
		},
		beforeCreate() {
			Rem.init(750);
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
				self.jwt = self.QYC.getItem("jwt");
			},
			on_vue_mounted() {
				var self = this;
				
				self.QYC.openWebview({
					url: './king.login.html',
					id: 'king.login'
				}, {
					titleNView: null
				})
				

			}
		}
	};
</script>

<style lang="less">
</style>
