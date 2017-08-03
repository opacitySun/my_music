module.exports = {
	data() {
		return {
			sendCodeSpaceTime:60,
			timeId:function(){}
		}
	},
	created(){
		
	},
	methods:{
		//发送验证码
		sendCode:function(){
			var mobile = $("#reg-mobile").val();
			if(mobile == '' || mobile.length < 11){
				$.alert("您填写的手机号不合法");
				return false;
			}
			this.$http.jsonp(ResourcePath+'/smsCodeAction?mobile='+mobile);
			$("#sendCodeBtn").addClass("hidden");
			$("#sendCodeSpaceBtn").removeClass("hidden");
			this.timeId = setInterval(this.codeSpace, 1000);
		},
		//发送验证码的间隔计时
		codeSpace:function(){
			this.sendCodeSpaceTime -= 1;
			if(this.sendCodeSpaceTime <= 0){
				clearInterval(this.timeId);
				$("#sendCodeBtn").removeClass("hidden");
				$("#sendCodeSpaceBtn").addClass("hidden");
				this.sendCodeSpaceTime = 60;
			}else{
				$("#sendCodeSpaceBtn").text(this.sendCodeSpaceTime+"s");
			}
		},
		//注册
		regFn:function(){
			var mobile = $("#reg-mobile").val(),
				pwd = $("#reg-pwd").val(),
				mcode = $("#reg-mcode").val();
			if(mobile == '' || mobile.length < 11){
				$.alert("您填写的手机号不合法");
				return false;
			}
			if(pwd.length < 6){
				$.alert("密码不能少于6位");
				return false;
			}
			this.$http.jsonp(ResourcePath+'/registerAction?mobile='+mobile+'&pwd='+pwd+'&mcode='+mcode).then(function(res){
				if(res.body.success == 1){
					res = res.body.result[0];
					window.localStorage.setItem("userUUID",res.uuid);
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