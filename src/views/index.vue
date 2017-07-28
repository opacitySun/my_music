<template>
    <div>
		<div class="weui-cells__title" style="padding-top: .77em;margin-top:0;">推荐歌单</div>
        <div class="weui-cells">
        	<router-link :to="item.href" v-for="(item,index) in musics" class="weui-cell weui-cell_access">
				<div class="weui-cell__hd">
                	<img :src="item.img" style="width:1.6rem;margin-right:1rem;display:block"></div>
                <div class="weui-cell__bd">
                    <p style="margin:0;">{{item.name}}</p>
                </div>
                <!-- <div class="weui-cell__ft text-ellipsis">{{item.desc}}</div> -->
        	</router-link>
        </div>
    </div>
</template>

<script>
import Index from '../js/index';

export default Index;
</script>