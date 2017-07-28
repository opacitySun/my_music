

module.exports = {
	data(){
		return {
			myMusics:[]
		};
	},
	created(){
		var userId = this.$route.params.id;
		this.$http.jsonp(ResourcePath+'/getMyMusicList').then(function(res){
			res = res.body.result;
			for(var k in res){
				res[k]["href"] = "/music-detail/"+res[k].id;
				this.musics.push(res[k]);
			}
		},function(err){
			console.log(err);
		});
	}
};