module.exports = {
	data() {
		return {
			
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
				res = res.body.result;
				
			},function(err){
				console.log(err);
			});
		}
	}
};