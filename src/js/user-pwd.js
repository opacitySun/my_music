module.exports = {
	data() {
		return {
			codeImg:'<img class="weui-vcode-img" src="">',
			vcode:'',
			newPwd:'',
			confirmPwd:''
		}
	},
	created(){
		var userUUID = window.localStorage.getItem("userUUID");
		if(userUUID){
			$("main").addClass("h100");
			$("footer").addClass("hidden");
			this.getCodeFn();
		}else{
			this.goLogin();
		}
	},
	methods:{
		//返回
		goback:function(){
			this.$router.go(-1);
		},
		//登录
		goLogin:function(){
			this.$router.push({ path: '/login' });
		},
		//获取验证码
		getCodeFn:function(){
			this.$http.jsonp(ResourcePath+'/getVerificationCodeAction').then(function(res){
				this.codeImg = res.body.imghtml;
			},function(err){
				$.toptip(err, 'error');
			});
		},
		//提交修改
		submitFn:function(){
			var userUUID = window.localStorage.getItem("userUUID");
			if(userUUID){
				var newPwd = this.newPwd,confirmPwd = this.confirmPwd,vcode = this.vcode;
				if(newPwd == '' || confirmPwd == '' || vcode == ''){
					$.toptip('请将信息填写完整', 'warning');
					return false;
				}
				if(confirmPwd != newPwd){
					$.toptip('两次密码输入不一致', 'warning');
					return false;
				}
				var data = {
					"uuid":userUUID,
					"pwd":confirmPwd,
					"vcode":vcode
				};
				this.$http.post(ResourcePath+'/editPwdAction',data).then(function(res){
					var success = res.body.success;
					if(success == 1){
						$.toptip('修改成功', 'success');
						this.$router.push({ path: '/user' });
					}else{
						$.toptip(res.body.flag, 'error');
					}
				},function(err){
					$.toptip(err, 'error');
				});
			}else{
				$.alert('您未登录，请先登录账户');
			}
		}
	}
};