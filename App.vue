<script>
	export default {
		onLaunch: function() {
			this.$api.get_user({
				user_id: "5f320096f4cba60001aa8b7e"
			}).then(res => {
				const {
					data
				} = res;
				this.$store.dispatch('set_userinfo', data);
			})
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style>
	/*每个页面公共css */
</style>
