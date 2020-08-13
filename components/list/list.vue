<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item v-for="(item ,index) in tabList" :key="index" class="swiper-item">
			<list-item :list="listCacheData[index]" :load="load[index]" @loadmore="loadmore"></list-item>
		</swiper-item>

	</swiper>
</template>

<script>
	import ListItem from './list-item.vue'
	export default {
		components: {
			ListItem
		},
		props: {
			tabList: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				// 缓存数据，避免每次切换时都闪一下
				listCacheData: {},
				load: {},
				pageSize: 10
			};
		},
		watch: {
			tabList(newVal) {
				if (newVal.length === 0) return
				this.listCacheData = {}
				this.load = {}
				this.getList(this.activeIndex)
			}
		},
		created() {
			uni.$on('update_article', () => {
				this.listCacheData = {}
				this.load = {}
				this.getList(this.activeIndex)
			})
		},
		methods: {
			loadmore() {
				if (this.load[this.activeIndex].loading === 'noMore') return
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			},
			change(e) {
				const {
					current
				} = e.detail
				this.$emit('change', current)
				if (!this.listCacheData[current] || this.listCacheData[current].length === 0) {
					this.getList(current)
				}

			},
			getList(current) {
				if (!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				this.$api.get_list({
					name: this.tabList[current].name,
					page: this.load[current].page,
					pageSize: this.pageSize
				}).then(res => {
					const {
						data
					} = res
					if (data.length === 0) {
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						this.$set(this.load, current, oldLoad)
						// 强制渲染页面
						this.$forceUpdate()
						return
					}
					let oldList = this.listCacheData[current] || []
					oldList.push(...data)
					// 懒加载
					this.$set(this.listCacheData, current, oldList)
				})
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
