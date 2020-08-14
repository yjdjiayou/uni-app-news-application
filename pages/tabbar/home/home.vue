<template>
	<view class="home ">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<!--自定义 tab  -->
		<tab :list="tabList" :tabIndex="tabIndex" @tab="tab"></tab>
		<view class="home-list">
			<list :tabList="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/navbar/navbar.vue';
	import Tab from '../../../components/tab/tab.vue';
	import List from '../../../components/list/list.vue';
	export default {
		components: {
			NavBar,
			Tab,
			List,
		},
		data() {
			return {
				title: 'Hello',
				tabList: [],
				tabIndex: 0,
				activeIndex: 0
			}
		},
		methods: {
			change(current) {
				this.tabIndex = current
				this.activeIndex = current
			},
			tab({
				data,
				index
			}) {
				this.activeIndex = index
			},
			getLabel() {
				// 调用云函数方法
				this.$api.get_label(
				// {
				// 	type: 'all'
				// }
				).then((res) => {
					const {
						data
					} = res
					data.unshift({
						name: '全部'
					})
					this.tabList = data
				})

			}
		},
		onLoad() {
			// 监听全局的事件，发布订阅模式
			uni.$on('labelChange', (res) => {
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel()
			})
			this.getLabel()
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}


	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;

		.home-list {
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
