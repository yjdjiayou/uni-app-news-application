<template>
	<view class="follow">
		<!-- 导航栏 -->
		<view class="follow-tab">
			<view class="follow-tab__box">
				<view class="follow-tab__item" :class="{active:activeIndex === 0}" @click="onTabClick(0)">文章</view>
				<view class="follow-tab__item" :class="{active:activeIndex === 1}" @click="onTabClick(1)">作者</view>
			</view>
		</view>

		<!-- 关注列表 -->
		<view class="follow-list">
			<swiper class="follow-list__swiper" :current="activeIndex" @change="onSwiperChange">
				<swiper-item>
					<list-scroll>
						<uni-load-more v-if="articleList.length === 0 && !articleShow" status="loading" iconType="snow"></uni-load-more>
						<list-card v-for="item in articleList" :key="item._id" :item="item" types="follow"></list-card>
						<view v-if="articleShow" class="no-data">暂无数据</view>
					</list-scroll>
				</swiper-item>
				<swiper-item>
					<list-scroll>
						<list-author  v-for="item in authorList" :key="item.id" :item="item"></list-author>
					</list-scroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				articleShow: false,
				articleList: [],
				authorList:[]
			}
		},
		onLoad() {
			// 自定义事件：$on 只能在已经打开的页面触发
			uni.$on('update_article', () => {
				this.getFollow()
			})
			uni.$on('update_author', () => {
				this.getAuthor()
			})
			this.getFollow()
			this.getAuthor()
		},
		methods: {
			onTabClick(index) {
				this.activeIndex = index;
			},
			onSwiperChange(e) {
				this.activeIndex = e.detail.current;
			},
			getFollow() {
				this.$api.get_follow().then(res => {
					this.articleList = res.data;
					this.articleShow = this.articleList.length === 0;
				})
			},
			getAuthor() {
				this.$api.get_author().then(res => {
					this.authorList = res.data;
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		height: 100%;
	}

	.follow {
		display: flex;
		flex-direction: column;
		flex: 1;
		box-sizing: border-box;
		height: 100%;

		.follow-tab {
			border-bottom: 1px solid #f5f5f5;
			padding: 10px 20px;
			height: 30px;

			.follow-tab__box {
				display: flex;
				border-radius: 5px;
				border: 1px solid $mk-base-color;
				height: 100%;

				.follow-tab__item {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #666;
					font-size: 14px;

					&:first-child {
						border-right: 1px solid $mk-base-color;
					}

					&.active {
						color: $mk-base-color;
					}
				}
			}


		}

		.follow-list {
			flex: 1;

			.follow-list__swiper {
				height: 100%;

				.swiper-item {
					height: 100%;
				}
			}
		}
	}

	.no-data {
		padding: 50px;
		text-align: center;
		font-size: 14px;
		color: #999;
	}
</style>
