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
			this.$router.go(-1);
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
			var name = $("#login-name").val(),pwd = $("#login-pwd").val(),vcode = $("#login-vcode").val();
			if(name == '' || pwd == '' || vcode == ''){
				$.toptip('请将信息填写完整', 'warning');
				return false;
			}
			this.$http.jsonp(ResourcePath+'/loginAction?name='+name+'&pwd='+pwd+'&vcode='+vcode).then(function(res){
				var success = res.body.success;
				if(success == 1){
					var result = res.body.result[0];
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