module.exports = {
	data() {
		return {
			codeImg:'<img class="weui-vcode-img" src="">',
			vcode:''
		}
	},
	created(){
		$("main").addClass("h100");
		$("footer").addClass("hidden");
		this.getCodeFn();
	},
	methods:{
		//返回
		goback:function(){
			this.$router.push({ path: '/user' });
		},
		//注册
		goRegister:function(){
			this.$router.push({ path: '/reg' });
		},
		//获取验证码
		getCodeFn:function(){
			this.$http.jsonp(ResourcePath+'/getVerificationCodeAction').then(function(res){
				this.codeImg = res.body.imghtml;
				this.vcode = res.body.vcode;
			},function(err){
				$.toptip(err, 'error');
			});
		},
		//登录
		loginFn:function(){
			let name = $("#login-name").val(),pwd = $("#login-pwd").val(),vcode = $("#login-vcode").val();
			if(name == '' || pwd == '' || vcode == ''){
				$.toptip('请将信息填写完整', 'warning');
				return false;
			}
			let requestUrl = `${ResourcePath}/loginAction?name=${name}&pwd=${pwd}&vcode=${vcode}`;
			this.$http.jsonp(requestUrl).then(function(res){
				let success = res.body.success;
				if(success == 1){
					let result = res.body.result[0];
					window.localStorage.setItem("userUUID",result.uuid);
					this.$router.push({ path: '/user' });
				}else{
					$.toptip(res.body.flag, 'error');
				}
			},function(err){
				$.toptip(err, 'error');
			});
		}
	}
};