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
		//判断是否存在用户uuid
		getPageInfoAsUuid:function(){
			var userUUID = window.localStorage.getItem("userUUID");
			if(userUUID){
				this.$http.jsonp(ResourcePath+'/getUserInfoAction?uuid='+userUUID).then(function(res){
					if(res.body.success == 1){
						res = res.body.result;
						this.user.name = res.name;
						this.user.img = ResourcePath + res.img;
						this.user.points = res.points;
						this.loginBtnClass = "hidden";
						this.outloginBtnClass = "";
					}else{
						$.alert(res.body.flag);
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