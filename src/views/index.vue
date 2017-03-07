<template>
    <div>
    	<div class="weui_cells_title">推荐歌单</div>
		<div class="weui_cells weui_cells_access">
			<router-link :to="item.href" v-for="(item,index) in musics" class="weui_cell">
				<div class="weui_cell_hd">
		            <img src="" alt="icon" style="width:20px;margin-right:5px;display:block">
		        </div>
		        <div class="weui_cell_bd weui_cell_primary">
		            <p>{{item.name}}</p>
		        </div>
		        <div class="weui_cell_ft">
		            {{item.desc}}
		        </div>
			</router-link>
		</div>
    </div>
</template>

<script>
import Index from '../js/index';

export default Index;
</script>