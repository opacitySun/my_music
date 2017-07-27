<template>
    <div class="music_player">
		<input type="file" id="file" accept="audio/mp3,audio/ogg" multiple>
	    <div id="music-player">
	        <div class="player_header">
	            <div class="playing_info div-box">
	            	<i class="fa fa-chevron-left" v-on:click="goback()"></i>
	                <marquee scrollamount="1" behavior="alternate" direction="left" class="div-box-flex1">
	                    <span class="songName">{{musicTitle}}</span>  <span class="singer" id="music-singer">作者：{{musicAuthor}}</span>
	                </marquee>
	            </div>
	        </div>
	        <div class="player_content">
	            <div class="panel cd">
	            	<div class="cd_this rotation" id="cd-this">
	            		<img src="" />
	            	</div>
	            	<div class="cd_img"></div>
	            </div>
	            <div class="panel lyric hidden"></div>
	        </div>
	        <div class="player_footer">
	            <audio></audio>
	            <div id="playerProgress">
	                <div class="time currentTime" id="current-time">{{currentTime}}</div>
	                <div class="progressbar" v-on:click="progressClick($event)"><span class="bar" v-bind:style="progressBtnStyle"></span></div>
	                <div class="time totalTime" id="duration">{{duration}}</div>
	            </div>
	            <div id="playerCtrl">
	                <div>
	                    <a class="button loop" v-on:click="playerLoop($event)" title="顺序播放"></a>
	                    <a class="button random hidden" v-on:click="playerRandom($event)" title="随机播放"></a>
	                    <a class="button single hidden" v-on:click="playerSingle($event)" title="单曲循环"></a>
	                </div>
	                <div><a class="button prev" v-on:click="playerPre()"></a></div>
	                <div><a v-bind:class="playerIcon" v-on:click="musicControl()"></a></div>
	                <div><a class="button next" v-on:click="playerNext()"></a></div>
	                <div>
	                	<a class="button collect" v-on:click="addLikeMusic($event)" title="添加喜欢"></a>
	                	<a class="button collected hidden" v-on:click="cancelLikeMusic($event)" title="取消喜欢"></a>
	                </div>
	            </div>
	        </div>
	    </div>

        <!-- <h1>Music Detail</h1>
		<hr/>

		<p>Hello Detail page!</p>

		<p>id:{{msg.id}}</p>
		<p>name:{{msg.name}}</p>
		<p>age:{{msg.age}}</p> -->
    </div>
</template>

<script>
export default {
	data(){
		return {
			msg:{},
			index:-1,
			musics:[],
			loop:true,
			timeId:function(){},
			timeDuration:function(){},
			isPlaying:true,
			player:{},
			playerIcon:"button pause",
			loopStatus:"loop",
			musicTitle:"",
			musicAuthor:"",
			playerPicSrc:"",
			duration:"00:00",
			currentTime:"00:00",
			progressBtnStyle:"width:0%",
			fileElement:$("#file"),
			albumPicElment:$("#picture"),
			musicPlayer:$("#music-player")
		}
	},
	created(){
		//获取params的参数ID
		var id = this.$route.params.id;
		id = Number(id);

		//根据获取的参数ID，返回不同的data对象（真实业务中，这里应该是Ajax获取数据）
		if(id === 1){
			this.msg = {
				"id":id,
				"name":"hello111",
				"age":24
			};
		}else{
			this.msg = {"id":id,"name":"hello222","age":28};
		}

		$("main").addClass("h100");
		$("footer").addClass("hidden");
	},
	mounted() {
		this.$nextTick(function () {
			// 代码保证 this.$el 在 document 中
			this.player = this.$el.getElementsByTagName('audio')[0];
			this.init();
		});
	},
	methods: {
		//返回上一页
		goback:function(){
			$("main").removeClass("h100");
			$("footer").removeClass("hidden");
			//clearInterval(this.timeId);
			clearInterval(this.timeDuration);
			this.$router.push({ path: '/' });
		},
		MusicQueue:function(){
			var musics = this.$data.musics;
			var index = this.$data.index;
			var loop = this.$data.loop;

			var setLoop = function(){
				loop = true;
			};

			var setRandom = function(){
				loop = false;
			};

			var addMusic = function(music){
				musics.push(music);
			};

			var addList = function(list){
				var length = list.length;

				for(var i = 0; i < length; i++) {
					addMusic(list[i]);
				}
			};

			var getMusic = function(){
				if(loop === true) {
					if(index >= musics.length - 1) {
						index = -1;
					}
					index += 1;
					return musics[index];
				} else {
					index = Math.floor(Math.random() * musics.length);
					return musics[index];
				}
			};

			var getPreMusic = function(){
				if(loop) {
					if(index === 0) {
						return musics[0];
					} else {
						index -= 1;
						return musics[index];
					}
				} else {
					return getMusic();
				}
			};

			var getIndexByName = function(name) {
				for(var i = 0; i < musics.length; i++) {
					if(musics[i].name === name) {
						return i;
					}
				}
			};

			var getMusicByName = function(name) {
				index = getIndexByName(name);
				return musics[index];
			};

			var getAllMusic = function() {
				return musics;
			};

			var pushMusics = function(ms) {
				musics = ms;
			};

			return {
				setLoop:setLoop,
				setRandom:setRandom,
				addMusic:addMusic,
				addList:addList,
				getMusic:getMusic,
				getPreMusic:getPreMusic,
				getMusicByName:getMusicByName,
				getIndexByName:getIndexByName,
				getAllMusic:getAllMusic,
				pushMusics:pushMusics
			};
		},
		init:function(){
			var id = this.$route.params.id;
			id = Number(id);
			this.$http.jsonp(ResourcePath+'/getMusicList?id='+id).then(function(res){
				res = res.body.result[0];
				var musicQueue = new this.MusicQueue();
				var music = new this.Music(res.name,res.author,res.url);
				musicQueue.addMusic(music);
				this.musicTitle = music.name;
				this.musicAuthor = music.author;
				this.player.src = music.src;
				$("#cd-this").find("img").attr("src",res.img);
				this.timeDuration = setInterval(this.setDuration, 500);
				this.playerStart();
			},function(err){
				console.log(err);
			});
		},
		musicControl:function(){
			if (this.isPlaying) {
				this.playerPause();
			} else {
				this.playerStart();
			}
		},
		playerStart:function(){
			this.player.play();
			this.isPlaying = true;
			clearInterval(this.timeId);
			this.timeId = setInterval(this.playerChange, 500);
			this.playerIcon = "button pause";
			this.setDuration();

			var cdThis = $("#cd-this");
			var deg = eval('this.get'+cdThis.css('transform'));//构造getmatrix函数,返回上次旋转度数
			var style = $("style");
			style.html('@-webkit-keyframes rotation {from {-webkit-transform: rotate('+deg+'deg);}to {-webkit-transform: rotate('+parseInt(deg+360)+'deg);}}');
			cdThis.addClass("rotation");
		},
		playerPause:function(){
			this.player.pause();
			this.isPlaying = false;
			clearInterval(this.timeId);
			this.playerIcon = "button play";
			
			var cdThis = $("#cd-this");
			var deg = eval('this.get'+cdThis.css('transform'));//构造getmatrix函数,返回上次旋转度数
			cdThis.css("-webkit-transform","rotate("+deg+"deg)");
			cdThis.removeClass("rotation");
		},
		playerChange:function(){
			this.setCurrentTime();
			var currentTime = this.player.currentTime,
				duration = this.player.duration;
			var progress = (currentTime / duration).toFixed(2) * 100;
			progress = progress <= 100 ? progress : 100;
			this.progressBtnStyle = "width:"+progress+"%";

			if(currentTime == duration){
				var style = $("style");
				style.html('@-webkit-keyframes rotation {from {-webkit-transform: rotate(0deg);}to {-webkit-transform: rotate(360deg);}}');
				if(this.loopStatus == 'loop' || this.loopStatus == 'random'){
					var musicQueue = new this.MusicQueue();
					this.preparePlay(musicQueue.getMusic());
				}
			}
		},
		setDuration:function(){
			var total = this.player.duration;
			total = total ? total : 0;
			this.duration = this.timeFormat(total);
		},
		timeFormat:function(total){
			var minute = parseInt(total / 60),
				second = parseInt(total - minute * 60),
				result;

			second = (second >= 10) ? second : '0' + second;
			result = minute + ":" + second;
			return result;
		},
		setCurrentTime:function(){
			var total = this.player.currentTime;
			this.currentTime = this.timeFormat(total);
		},
		Music:function(name,author,src){
			return {
				"name":name,
				"author":author,
				"src":src
			};
		},
		playerLoop:function(event){
			this.player.loop = false;
			this.loopStatus = "random";
			var musicQueue = new this.MusicQueue();
			musicQueue.setRandom();
			var _this = event.target;
			$(_this).addClass("hidden");
			$(_this).parent().find("a.random").removeClass("hidden");
		},
		playerRandom:function(event){
			this.player.loop = true;
			this.loopStatus = "single";
			var _this = event.target;
			$(_this).addClass("hidden");
			$(_this).parent().find("a.single").removeClass("hidden");
		},
		playerSingle:function(event){
			this.player.loop = false;
			this.loopStatus = "loop";
			var musicQueue = new this.MusicQueue();
			musicQueue.setLoop();
			var _this = event.target;
			$(_this).addClass("hidden");
			$(_this).parent().find("a.loop").removeClass("hidden");
		},
		playerNext:function(){
			var musicQueue = new this.MusicQueue();
			this.preparePlay(musicQueue.getMusic());
		},
		playerPre:function(){
			var musicQueue = new this.MusicQueue();
			this.preparePlay(musicQueue.getPreMusic());
		},
		preparePlay:function(music){
			this.musicTitle = music.name;
			this.musicAuthor = music.author;
			this.player.src = music.src;

			this.playerStart();
			// this.changeImage();
			this.setCurrentTime();

			this.player.play();
			setInterval(this.setDuration, 500);
			clearInterval(this.timeId);
			this.timeId = setInterval(this.playerChange, 500);

			var musicQueue = new this.MusicQueue();
			this.index = musicQueue.getIndexByName(music.name);
		},
		changeImage:function(){
			var num = parseInt(Math.random() * 16),
				src;

			num = (num > 0) ? num : num + 1;
			src = "raw/" + num + ".jpg";
			this.playerPicSrc = src;
		},
		progressClick:function(event){
			var screenWidth = $(window).width();
			var screenWidthprocess = screenWidth * 0.56;
			var t = (event.offsetX / screenWidthprocess).toFixed(2);
			var currentTime = this.player.duration * t;
			this.player.currentTime = currentTime;
			this.playerChange();
		},
		/* 
	     * 解析matrix矩阵，0°-360°，返回旋转角度 
	     * 当a=b||-a=b,0<=deg<=180 
	     * 当-a+b=180,180<=deg<=270 
	     * 当a+b=180,270<=deg<=360 
	     * 
	     * 当0<=deg<=180,deg=d; 
	     * 当180<deg<=270,deg=180+c; 
	     * 当270<deg<=360,deg=360-(c||d); 
	     * */
		getmatrix:function(a,b,c,d,e,f){
			var aa=Math.round(180*Math.asin(a)/ Math.PI);
	        var bb=Math.round(180*Math.acos(b)/ Math.PI);
	        var cc=Math.round(180*Math.asin(c)/ Math.PI);
	        var dd=Math.round(180*Math.acos(d)/ Math.PI);
	        var deg=0;
	        if(aa==bb||-aa==bb){
	            deg=dd;
	        }else if(-aa+bb==180){
	            deg=180+cc;
	        }else if(aa+bb==180){
	            deg=360-cc||360-dd;
	        }
	        return deg>=360?0:deg;
		},
		//添加喜欢
		addLikeMusic:function(event){
			var _this = event.target;
			$(_this).addClass("hidden");
			$(_this).parent().find("a.collected").removeClass("hidden");
		},
		//取消喜欢
		cancelLikeMusic:function(event){
			var _this = event.target;
			$(_this).addClass("hidden");
			$(_this).parent().find("a.collect").removeClass("hidden");
		}
	}
}
</script>

<style>

</style>