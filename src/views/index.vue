<template>
    <div>
        <h1>Index</h1>
		<hr/>
		<p>Hello Index Page!</p>
		<ul>
		    <li v-for="(item,index) in items">
		         {{item.id}} : {{item.name}}
		    </li>
		</ul>
    </div>
</template>

<script>
import Index from '../../js/index';

export default Index;
</script>