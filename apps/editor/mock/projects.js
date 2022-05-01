const mocker = function (req) {
	return {
		code: 0,
		success: true,
		data: 'success',
	};
};

// 请求类型， 默认为 'GET'
// mocker.methods = 'get';
// 请求响应延迟时间，单位ms
mocker.delay = 3000;

module.exports = mocker;
