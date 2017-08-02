

module.exports = {
	data(){
		return {
			myMusics:[]
		};
	},
	created(){
		this.getListAsUuid();
	},
	methods:{
		//根据uuid获取列表数据
		getListAsUuid:function(){
			var userUuid = window.localStorage.getItem("userUuid");
			if(userUuid){
				this.$http.jsonp(ResourcePath+'/getUserMusicList?uuid='+userUuid).then(function(res){
					res = res.body.result;
					for(var k in res){
						res[k]["href"] = "/music-detail/"+res[k].id;
						this.myMusics.push(res[k]);
					}
				},function(err){
					console.log(err);
				});
			}else{
				this.$router.push({ path: '/login' });
			}
		}
	}
};