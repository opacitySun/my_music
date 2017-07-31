module.exports = {
	data() {
		return {
			user:{
				"name":'未知 <a href="javascript:void(0)" v-on:click="goLogin()">登录</a>',
				"img":ResourcePath + "/files/default.png",
				"points":0
			},
			loginBtnClass:""
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
			},function(err){
				console.log(err);
			});
		}else{
			this.user.name = '未知';
			this.user.img = ResourcePath + "/files/default.png";
			this.user.points = 0;
			this.loginBtnClass = "";
		}
	},
	methods:{
		//登录
		goLogin:function(){
			this.$router.push({ path: '/login' });
		},
		//注册
		goRegister:function(){
			this.$router.push({ path: '/reg' });
		}
	}
};