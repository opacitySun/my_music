module.exports = {
	data() {
		return {
			
		}
	},
	created(){
		
	},
	methods:{
		//跳转到用户中心
		goUser:function(){
			this.$router.push({ path: '/user' });
		},
		//提交
		submitFn:function(){
			var name = $("#login-name").val(),pwd = $("#login-pwd").val(),vcode = $("#login-vcode").val();
			this.$http.jsonp(ResourcePath+'/loginAction?name='+name+'&pwd='+pwd+'&vcode='+vcode).then(function(res){
				var success = res.body.success;
				if(success == 1){
					var result = res.body.result[0];
					window.localStorage.setItem("userUUID",result.uuid);
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