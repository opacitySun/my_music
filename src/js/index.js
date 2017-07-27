module.exports = {
	data() {
		return {
			musics:[]
		}
	},
	created(){
		this.$http.post(ResourcePath+'/getMusicList').then(function(res){
			$.each(res,function(key,obj){
				obj["href"] = "/music-detail/"+obj.id;
				this.musics.push(obj);
			});
		},function(err){
			console.log(err);
		});
	}
};