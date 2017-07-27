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
			res = res.substr(1,res.length-2);
			res = JSON.parse(res);
			$.each(res.result,function(key,obj){
				obj["href"] = "/music-detail/"+obj.id;
				this.musics.push(obj);
			});
		},function(err){
			console.log(err);
		});
	}
};