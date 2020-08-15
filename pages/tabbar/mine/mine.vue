<template>
	<view>
		<view class="my-header">
			<view class="my-header__bg">
				<image :src="userinfo.avatar" mode="aspectFill"></image>
			</view>

			<view class="my-header__logo">
				<view class="my-header__logo-box">
					<image :src="userinfo.avatar" mode="aspectFill"></image>
				</view>
				<text class="my-header__name">{{userinfo.author_name}}</text>
			</view>

			<view class="my-header__info">
				<view class="my-header__info-box">
					<text class="my-header__info-title">被关注</text>
					<text class="my-header__name">{{userinfo.follow_count}}</text>
				</view>
				<view class="my-header__info-box">
					<text class="my-header__info-title">粉丝</text>
					<text class="my-header__name">{{userinfo.fans_count}}</text>
				</view>
				<view class="my-header__info-box">
					<text class="my-header__info-title">积分</text>
					<text class="my-header__name">{{userinfo.integral_count || 0}}</text>
				</view>
			</view>

		</view>


		<view class="my-content">
			<view class="my-content__list" @click="onMyArticleClick">
				<view class="my-content__list-title">
					<uni-icons class="icons" type="contact" size="14" color="#666"></uni-icons>
					<text>我的文章</text>
				</view>
			</view>
			<view class="my-content__list" @click="onFeedbackClick">
				<view class="my-content__list-title">
					<uni-icons class="icons" type="help" size="14" color="#666"></uni-icons>
					<text>意见反馈</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		routerTree
	} from '../../../common/js/router-tree.js'

	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState(['userinfo'])
		},
		methods: {
			onMyArticleClick() {
				uni.navigateTo({
					url: routerTree.myArticle
				})
			},
			onFeedbackClick() {
				uni.navigateTo({
					url: routerTree.feedback
				})
			},
		},
		onLoad() {}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.my-header {
		position: relative;
		padding-bottom: 15px;


		.my-header__bg {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			filter: blur(8px);
			opacity: 0.3;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.my-header__logo {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 30px;

			.my-header__logo-box {
				border-radius: 50%;
				width: 60px;
				height: 60px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.my-header__name {
				margin-top: 15px;
				font-size: 16px;
				font-weight: bold;
			}
		}

		.my-header__info {
			display: flex;
			margin-top: 15px;

			.my-header__info-box {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100%;
				font-size: 12px;
				color: #999;

				.my-header__info-title {
					font-size: 14px;
					color: #333;
				}
			}
		}
	}

	.my-content {
		.my-content__list {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;
			padding: 15px;
			background-color: #fff;
			color: #333;
			font-size: 14px;

			.my-content__list-title {
				display: flex;
				align-items: center;

				.icons {
					margin-right: 5px;
				}
			}
		}
	}
</style>
