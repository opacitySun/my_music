<template>
    <div>
		<input type="file" id="file" accept="audio/mp3,audio/ogg" multiple>
	    <div id="music-player">
	        <audio id="player">
	        </audio>
	        <header>
	            <div class="playing_info">
	                <marquee scrollamount="1" behavior="alternate" direction= left width="100%" height="20px">
	                    <span class="songName" id="music-title">HTML5</span>  <span class="singer" id="music-singer">music player</span>
	                </marquee>
	            </div>
	        </header>
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
	        <footer>
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
	                <div id="music-stop"><a class="button play" id="control-icon"></a></div>
	                <div id="music-next"><a class="button next"></a></div>
	                <div><a class="button collect"></a></div>
	            </div>
	        </footer>
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
import style from "../lib/HTML5MusicPlayer/style.css";

export default {
	data(){
		return {
			msg:{}
		};
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
	},
	mounted() {
		this.$nextTick(function () {
			// 代码保证 this.$el 在 document 中
			//console.log(this.$data);
		});
	},
	style
}
</script>

<style>

</style>