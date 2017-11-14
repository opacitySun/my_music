module.exports = {
	data() {
		return {
			musics:[]
		}
	},
	created(){
		$("main").removeClass("h100");
		$("footer").removeClass("hidden");
		this.$http.jsonp(ResourcePath+'/getMusicList').then(function(res){
			res = res.body.result;
			for(var k in res){
				res[k]["href"] = `/music-detail/${res[k].id}`;
				this.musics.push(res[k]);
			}
		},function(err){
			console.log(err);
		});
	}
};