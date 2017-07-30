module.exports = {
	data() {
		return {
			user:{
				"name":'未知 <a href="javascript:void(0)" v-on:click="goLogin()">登录</a>',
				"img":ResourcePath + "/files/default.png",
				"points":0
			}
		}
	},
	created(){
		// var userUuid = window.localStorage.getItem("userUuid");
		var userUuid = 'caaafcd9-736d-11e7-a4b9-00163e0007a6';
		if(userUuid){
			this.$http.jsonp(ResourcePath+'/getUserInfoAction?uuid='+userUuid).then(function(res){
				res = res.body.result;
				this.user.name = res.name;
				this.user.img = ResourcePath + res.img;
				this.user.points = res.points;
			},function(err){
				console.log(err);
			});
		}else{
			this.user.name = '未知 <a href="javascript:void(0)" v-on:click="goLogin()">登录</a>';
			this.user.img = ResourcePath + "/files/default.png";
			this.user.points = 0;
		}
	},
	methods:{
		//登录
		goLogin:function(){
			console.log("登录");
		}
	}
};