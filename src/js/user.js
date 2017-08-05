module.exports = {
	data() {
		return {
			user:{
				"name":'未知',
				"img":ResourcePath + "/files/default.png",
				"points":0
			},
			loginBtnClass:"",
			outloginBtnClass:"hidden"
		}
	},
	created(){
		$("main").removeClass("h100");
		$("footer").removeClass("hidden");
		this.getPageInfoAsUuid();
	},
	methods:{
		//登录
		goLogin:function(){
			this.$router.push({ path: '/login' });
		},
		//退出登录
		outLogin:function(){
			var getPageInfoAsUuid = this.getPageInfoAsUuid;
			$.confirm("您确定退出登录吗？", function() {
				//点击确认后的回调函数
				window.localStorage.removeItem("userUUID");
				getPageInfoAsUuid();
			}, function() {
				//点击取消后的回调函数
				$.closeModal();
			});
		},
		//注册
		goRegister:function(){
			this.$router.push({ path: '/reg' });
		},
		//完善个人信息
		goUserInfo:function(){
			this.$router.push({ path: '/user-info' });
		},
		//判断是否存在用户uuid
		getPageInfoAsUuid:function(){
			var userUUID = window.localStorage.getItem("userUUID");
			if(userUUID){
				this.$http.jsonp(ResourcePath+'/getUserInfoAction?uuid='+userUUID).then(function(res){
					if(res.body.success == 1){
						res = res.body.result[0];
						this.user.points = res.points;
						this.loginBtnClass = "hidden";
						this.outloginBtnClass = "";
						if(res.img){
							this.user.img = ResourcePath + res.img;
						}
						if(res.name){
							this.user.name = res.name;
						}else{
							this.$http.jsonp(ResourcePath+'/getUserAction?uuid='+userUUID).then(function(res2){
								if(res2.body.success == 1){
									res2 = res2.body.result[0];
									this.user.name = res2.name;
									this.loginBtnClass = "hidden";
									this.outloginBtnClass = "";
									$.alert('HI~朋友，你还没有完善个人信息，大家都还不知道你是谁，快去完善吧~');
								}else{
									$.alert(res2.body.flag);
								}
							});
						}
					}
				},function(err){
					console.log(err);
				});
			}else{
				this.user.name = '未知';
				this.user.img = ResourcePath + "/files/default.png";
				this.user.points = 0;
				this.loginBtnClass = "";
				this.outloginBtnClass = "hidden";
			}
		}
	}
};