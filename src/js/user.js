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
		var userUuid = window.localStorage.getItem("userUuid");
		if(userUuid){
			this.$http.jsonp(ResourcePath+'/getUserInfoAction?uuid='+userUuid).then(function(res){
				res = res.body.result;
				this.user.name = res.name;
				this.user.img = ResourcePath + res.img;
				this.user.points = res.points;
				this.loginBtnClass = "hidden";
				this.outloginBtnClass = "";
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
	},
	methods:{
		//登录
		goLogin:function(){
			this.$router.push({ path: '/login' });
		},
		//退出登录
		outLogin:function(){
			window.localStorage.removeItem("userUuid");
			this.$router.router.go(this.$route.path);
		},
		//注册
		goRegister:function(){
			this.$router.push({ path: '/reg' });
		}
	}
};