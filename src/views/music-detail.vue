<template>
	<div>
		<music-player></music-player>
	</div>
</template>

<script>
import MusicPlayer from '../components/music-player';

module.exports = {
    components : {
        'music-player' : MusicPlayer
    }
};
</script>