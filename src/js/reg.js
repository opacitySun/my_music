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
		//登录
		sendCode:function(){
			var mobile = $("#user-mobile").val();
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
			}else{
				$("#sendCodeSpaceBtn").text(sendCodeSpaceTime+"s");
			}
		}
	}
};