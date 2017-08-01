module.exports = {
	data() {
		return {
			codeImg:'<img class="weui-vcode-img" src="">',
			vcode:''
		}
	},
	created(){
		this.getCodeFn();
	},
	methods:{
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
				console.log(err);
			});
		},
		//登录
		loginFn:function(){
			var name = $("#login-name").val(),pwd = $("#login-pwd").val(),vcode = this.vcode;
			this.$http.jsonp(ResourcePath+'/loginAction?name='+name+'&pwd='+pwd+'&vcode='+vcode).then(function(res){
				var success = res.body.success;
				if(success == 1){
					var result = res.body.result;
					window.localStorage.setItem("userUuid",result.uuid);
					this.$router.push({ path: '/user' });
				}else{
					$.alert(res.body.flag);
				}
			},function(err){
				console.log(err);
			});
		}
	}
};