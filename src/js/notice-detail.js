module.exports = {
	data() {
		return {
			title:'',
			content:''
		}
	},
	created(){
		let id = this.$route.params.id;
		let requestUrl = `${ResourcePath}/getNoticeByIdActive?id=${id}`;
		this.$http.jsonp(requestUrl).then(function(res){
			if(res.body.success == 1){
				res = res.body.result[0];
				this.title = res.title;
				this.content = res.content;
			}else{
				$.toptip(res.body.flag, 'error');
			}
		},function(err){
			console.log(err);
		});
	}
};