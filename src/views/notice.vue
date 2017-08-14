<template>
    <div>
    	<div class="weui-cells">
    		<router-link :to="item.href" v-for="(item,index) in notices" class="weui-cell">
				<div class="weui-cell__bd">
					<p>{{item.title}}</p>
				</div>
			</router-link>
		</div>
    </div>
</template>

<script>
import Notice from '../js/notice';

export default Notice;
</script>