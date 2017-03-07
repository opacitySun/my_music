<template>
    <div>
        <h1>List</h1>
		<hr/>
		<p>Hello List Page!</p>
		<ul>
		    <li v-for="(item,index) in items">
		         {{item.id}} : {{item.name}}
		    </li>
		</ul>
    </div>
</template>

<script>
import MusicList from '/src/js/music-list';

export default MusicList;
</script>