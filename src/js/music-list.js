

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
			var userUUID = window.localStorage.getItem("userUUID");
			if(userUUID){
				this.$http.jsonp(ResourcePath+'/getUserMusicList?uuid='+userUUID).then(function(res){
					if(res.body.success == 1){
						res = res.body.result;
						for(var k in res){
							res[k]["href"] = "/music-detail/"+res[k].id;
							this.myMusics.push(res[k]);
						}
					}else{
						$.alert(res.body.flag);
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