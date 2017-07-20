<template>
    <div class="music_player">
		<input type="file" id="file" accept="audio/mp3,audio/ogg" multiple>
	    <div id="music-player">
	        <audio id="player"></audio>
	        <div class="player_header">
	            <div class="playing_info">
	            	<i class="fa fa-chevron-left" v-on:click="goback()"></i>
	                <marquee scrollamount="1" behavior="alternate" direction= left width="100%" height="20px">
	                    <span class="songName" id="music-title">HTML5</span>  <span class="singer" id="music-singer">music player</span>
	                </marquee>
	            </div>
	        </div>
	        <div class="content">
	            <div class="panelGroup">
	                <div class="panel playlist">
	                    <ul class="music_list" id="music_list">
	                        <li style="text-align: center;display: block;">加载音乐列表...</li>
	                    </ul>
	                </div>
	                <div class="panel lyric">
	                    <div class="lyric_wrap">
	                        <ul id="lyric">
	                            <li>HTML5 music player</li>
	                        </ul>
	                    </div>
	                </div>
	                <div class="panel album">
	                    <div class="album_art">
	                        <img class="cover"/>
	                    </div>
	                    <div class="music_info"></div>
	                </div>
	            </div>
	        </div>
	        <div class="player_footer">
	            <audio id="player" preload="auto"></audio>
	            <div id="playerProgress">
	                <div class="time currentTime" id="current-time">00:00</div>
	                <div class="progressbar" id="music-progress"><span class="bar" id="music-progress-btn"></span></div>
	                <div class="time totalTime" id="duration">00:00</div>
	            </div>
	            <div id="playerCtrl">
	                <div>
	                    <a class="button loop" id="play-style-loop" title="顺序播放"></a>
	                    <a class="button random hidden" id="play-style-random" title="随机播放"></a>
	                </div>
	                <div id="music-pre"><a class="button prev"></a></div>
	                <div v-on:click="musicControl()"><a class="button play" id="control-icon"></a></div>
	                <div id="music-next"><a class="button next"></a></div>
	                <div><a class="button collect"></a></div>
	            </div>
	        </div>
	    </div>

	    <ul class="hidden" id="musics"></ul>


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
			index:0,
			timeId:function(){},
			player:document.getElementById("player"),
			controlIcon:$("#control-icon"),
			durationElement:$("#duration"),
			currentTimeElement:$("#current-time"),
			progressElement:$("#music-progress"),
			progressBtnElement:$("#music-progress-btn"),
			fileElement:$("#file"),
			musicTitleElement:$("#music-title"),
			albumPicElment:$("#picture"),
			musicPlayer:$("#music-player"),
			musicUL:$("#musics"),
			liElementsCache:[]
		}
	},
	created(){
		//获取params的参数ID
		var id = this.$route.params.id;
		id = Number(id);

		this.init();

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
			//console.log(this.$data);
		});
	},
	methods: {
		//返回上一页
		goback:function(){
			$("main").removeClass("h100");
			$("footer").removeClass("hidden");
			this.$router.push({ path: '/' });
		},
		MusicQueue:function(){
			var musics = [];
			var index = -1;
			var loop = true;

			this.setLoop = function() {
				loop = true;
			};

			this.setRandom = function() {
				loop = false;
			};

			this.addMusic = function(music) {
				musics.push(music);
			};

			this.addList = function(list) {
				var length = list.length;

				for(var i = 0; i < length; i++) {
					this.addMusic(list[i]);
				}
			};

			this.getMusic = function() {
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

			this.getPreMusic = function() {
				if(loop) {
					if(index === 0) {
						return musics[0];
					} else {
						index -= 1;
						return musics[index];
					}
				} else {
					return this.getMusic();
				}
			};

			this.getMusicByName = function(name) {
				index = this.getIndexByName(name);
				return musics[index];
			};

			this.getIndexByName = function(name) {
				for(var i = 0; i < musics.length; i++) {
					if(musics[i].name === name) {
						return i;
					}
				}
			}

			this.getAllMusic = function() {
				return musics;
			};

			this.pushMusics = function(ms) {
				musics = ms;
			};
		},
		init:function(){
			var musicQueue = new this.MusicQueue();
			var music = new Music("风筝误", "../files/fly.ogg");
			musicQueue.addMusic(music);
			this.musicTitleElement.innerHTML = music.name;
			this.player.src = music.src;
			setTimeout(this.setDuration, 500);
			this.appendMusicToDOM("风筝误");
			this.setSelected(this.index);
		},
		musicControl:function(){
			if (this.player.paused) {
				this.player.play();
				this.playerStart();
				this.timeId = setTimeout(this.change(), 500);
			} else {
				this.player.pause();
				this.playerPause();
				clearTimeout(this.timeId);
			}
		},
		playerStart:function(){
			this.controlIcon.removeClass("play");
			this.controlIcon.addClass("pause");
			this.setDuration();
		},
		playerPause:function(){
			this.controlIcon.removeClass("pause");
			this.controlIcon.addClass("play");
		},
		playerChange:function(){
			this.setCurrentTime();
			var currentTime = this.player.currentTime,
				duration = this.player.duration;

			var progress = (currentTime / duration).toFixed(2) * 100;
			progress = progress <= 100 ? progress : 100;
			this.progressBtnElement.style.width = progress+"%";

			this.timeId = setTimeout(this.playerChange(), 500);
		},
		setDuration:function(){
			var total = this.player.duration;
			total = total ? total : 0;
			this.durationElement.html(this.timeFormat(total));
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
			this.currentTimeElement.html(this.timeFormat(total));
		},
		appendMusicToDOM:function(name){
			var li = '<li>'+name+'</li>';
			this.liElementsCache.push(li);
			this.musicUL.append(li);
		},
		setSelected:function(index){
			this.liElementsCache[index].addClass("selected");
			this.liElementsCache[index].scrollIntoView(false);
		},
		removeSelected:function(index){
			this.liElementsCache[index].removeClass("selected");
		},
		Music:function(name, src){
			return {
				"name":name,
				"src":src
			};
		}
	}
}
</script>

<style>

</style>