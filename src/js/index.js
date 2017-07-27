module.exports = {
	data() {
		return {
			musics:[]
		}
	},
	created(){
		var jsonStr = {};
		jsonStr = JSON.stringify(jsonStr);
		this.$http.jsonp(ResourcePath+'/getMusicList').then(function(res){
			$.each(res,function(key,obj){
				obj["href"] = "/music-detail/"+obj.id;
				this.musics.push(obj);
			});
		},function(err){
			console.log(err);
		});
	}
};