import store from '../store/index.js'

export default function $http(options) {
	const {
		url,
		data
	} = options
	const dataObj = {
		// 因为没有实现登录功能，所以这里直接使用云数据库中的数据模拟实现
		user_id: store.state.userinfo._id,
		...data
	}
	return new Promise((reslove, reject) => {
		uniCloud.callFunction({
			name: url,
			data: dataObj
		}).then((res) => {

			if (res.result.code === 200) {
				reslove(res.result)
			} else {
				reject(res.result)
			}

		}).catch((err) => {
			reject(err)
		})
	})
}
