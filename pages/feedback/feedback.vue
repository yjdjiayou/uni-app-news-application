<template>
	<view>
		<view class="feedback-title">
			意见反馈
		</view>

		<view class="feedback-content">
			<textarea class="feeback-textarea" v-model="content" placeholder="请输入您要反馈的问题" />
			</view>
		<view class="feedback-title">反馈图片：</view>
		
		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item,index) in imgList" :key="index" >
				<view class="close-icon" @click="onDelBtnClick(i)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<view v-if="imgList.length < 5" class="feedback-image-item" @click="onAddImageBtnClick">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		
		<button type="primary" class="feedback-button" @click="onSubmitBtnClick">提交反馈意见</button>
	</view>
</template>

<script>
	import { routerTree}  from "../../common/js/router-tree.js"
	export default {
		data() {
			return {
				content:'',
				imgList:[]
			}
		},
		methods: {
			onAddImageBtnClick(){
				const count = 5 - this.imgList.length;
				uni.chooseImage({
					// count 字段对 h5端无效
					count,
					success:(res)=> {
						const {tempFilePaths,tempFiles} =res;
						tempFilePaths.forEach((it,i)=>{
							// 兼容处理 h5端多选的问题
							if(i<count){
								this.imgList.push({
									url:it
								})
							}
							
						})
					}
				})
			},
			onDelBtnClick(i){
				this.imgList.splice(i,1);
			},
			async onSubmitBtnClick(){
				const imgPath = [];
					uni.showLoading()
				for(let i = 0;i<this.imgList.length;i++){
					let filePath = this.imgList[i].url;
					filePath = await this.uploadFiles(filePath)
					imgPath.push(filePath)
				}
				this.updateFeedback({
					content:this.content,
					feedbackImages:imgPath
				});
			},
			async uploadFiles(filePath){
				  const dir = 'feedback/';
				  const fileExt = '.'+filePath.substr(filePath.lastIndexOf('.') + 1);
				  const randName = (
				    new Date().getTime() * 10000 +
				    Math.floor(Math.random() * 10000)
				  ).toString(32);
				const result = await uniCloud.uploadFile({
					filePath,
					// 文件存放地址
					cloudPath:dir + randName + fileExt,
					fileType:'image'
				})
				return result.fileID
			},
			updateFeedback({content,feedbackImages}){
				this.$api.update_feedback({content,feedbackImages}).then((res)=>{
					uni.hideLoading()
					uni.showToast({
						title:'反馈提交成功',
						icon:'none'
					})
					setTimeout(()=>{
						uni.switchTab({
							url:routerTree.mine
						})
					},2000)
				}).catch(()=>{
					uni.hideLoading()
					uni.showToast({
						title:'反馈提交失败',
						icon:'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.feedback-title{
		margin: 15px 15px 0 15px;
		color: #666;
		font-size: 14px;
	}
	.feedback-content{
		margin: 15px;
		padding: 10px;
		box-sizing: border-box;
		border: 1px solid #eee;
		.feeback-textarea{
			width: 100%;
			height: 100px;
			font-size: 12px;
		}
	}
	
	.feedback-image-box{
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
		.feedback-image-item{
			box-sizing: border-box;
			position: relative;
			padding-top: 33.33%;
			width: 33.33%;
			height: 0;
			.close-icon{
				position: absolute;
				right: 0;
				top: 0;
				z-index: 2;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 22px;
				height: 22px;
				border-radius: 50%;
				background-color: #ff5a5f;
			}
			.image-box{
				position: absolute;
				top: 5px;
				right: 5px;
				left: 5px;
				bottom: 5px;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1px solid #eee;
				border-radius: 5px;
				overflow: hidden;
				.image{
					width: 100%;
					height: 100%;
				}
			}
		}
		
	}
	
	.feedback-button{
		margin: 0 15px;
		background-color: $mk-base-color!important;
	}
</style>
