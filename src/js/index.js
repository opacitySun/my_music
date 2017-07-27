module.exports = {
	data() {
		return {
			musics:[]
		}
	},
	created(){
		$.ajax({
			type:'get',
			url:ResourcePath+'/getMusicList',
			data:{},
			dataType:'json',
			success:function(res){
				$.each(res,function(key,obj){
					obj["href"] = "/music-detail/"+obj.id;
					this.musics.push(obj);
				});
			}
		});
		// this.$http({
		// 	method:'POST',
  //           url:ResourcePath+'/getMusicList',
  //           data:{},
  //           headers: {"Content-Type":"application/json;charset=UTF-8"}
		// }).then(function(res){
		// 	$.each(res,function(key,obj){
		// 		obj["href"] = "/music-detail/"+obj.id;
		// 		this.musics.push(obj);
		// 	});
		// },function(err){
		// 	console.log(err);
		// });
	}
};