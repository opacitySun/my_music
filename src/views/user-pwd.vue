<template>
    <div>
    	<div class="weui-page__head div-box">
    		<i class="fa fa-chevron-left" v-on:click="goback()"></i>
    		<h4 class="div-box-flex1">修改密码</h4>
    	</div>
		<div class="weui-cells weui-cells_form">
	        <div class="weui-cell">
	            <div class="weui-cell__hd"><label class="weui-label">新密码</label></div>
	            <div class="weui-cell__bd weui-cell_primary"><input type="password" v-model="newPwd" class="weui-input" /></div>
	        </div>
	        <div class="weui-cell">
	            <div class="weui-cell__hd"><label class="weui-label">确认密码</label></div>
	            <div class="weui-cell__bd weui-cell_primary"><input type="password" v-model="confirmPwd" class="weui-input" /></div>
	        </div>
	        <div class="weui-cell weui-cell_vcode">
	            <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
	            <div class="weui-cell__bd weui-cell_primary"><input type="text" v-model="vcode" class="weui-input" maxlength="4"></div>
	            <div class="weui-cell__ft" v-html="codeImg" @click="getCodeFn()">{{codeImg}}</div>
	        </div>
	    </div>
	    <div class="weui-cells__tips">提示：如验证码失效，点击验证码图片，即可重新生成验证码</div>
	    <div class="weui-btn-area">
	        <a href="javascript:void(0)" class="weui-btn weui-btn_primary" @click="submitFn()">提交</a>
	    </div>
    </div>
</template>

<script>
import UserPwd from '../js/user-pwd';

export default UserPwd;
</script>