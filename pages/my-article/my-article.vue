<template>
	<view>
		<uni-load-more v-if="lists.length === 0 " status="loading" iconType="snow"></uni-load-more>
		<list-card v-for="item in lists" :key="item.id" :item="item"></list-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: []
			};
		},
		methods: {
			getMyArtcile() {
				this.$api.get_my_article().then(res => {
					const {
						data
					} = res;
					this.lists = data;
				})
			}
		},
		onLoad() {
			this.getMyArtcile()
		}
	}
</script>

<style lang="scss">

</style>
