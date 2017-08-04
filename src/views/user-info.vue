<template>
    <div>
    	<h2 class="weui-page__title">完善信息</h2>
    	<div class="weui-cells__title">基本信息</div>
		<div class="weui-cells weui-cells_form">
	        <div class="weui-cell">
	            <div class="weui-cell__hd"><label class="weui-label">昵称</label></div>
	            <div class="weui-cell__bd weui-cell_primary"><input type="text" id="userinfo-name" class="weui-input" /></div>
	        </div>
	        <div class="weui-cell">
	            <div class="weui-cell__hd"><label class="weui-label">积分</label></div>
	            <div class="weui-cell__bd weui-cell_primary">{{points}}</div>
	        </div>
			<div class="weui-cell weui-cell_vcode">
	            <div class="weui-cell__hd"><label class="weui-label">头像</label></div>
	            <div class="weui-cell__bd weui-cell_primary"><img src="" class="weui-head_img" /></div>
	            <div class="weui-cell__ft">
	            	<a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="uploadImgFn()">上传</a>
	            </div>
	        </div>
	    </div>
	    <div class="weui-cells__title">性别</div>
	    <div class="weui-cells weui-cells_radio">
			<label class="weui-cell weui-check__label" for="userinfo-sex1">
				<div class="weui-cell__bd">
					<p>正太</p>
				</div>
				<div class="weui-cell__ft">
					<input type="radio" value="1" class="weui-check" name="userinfo-sex" id="userinfo-sex1">
					<span class="weui-icon-checked"></span>
				</div>
			</label>
			<label class="weui-cell weui-check__label" for="userinfo-sex2">
				<div class="weui-cell__bd">
					<p>猛男</p>
				</div>
				<div class="weui-cell__ft">
					<input type="radio" value="2" name="userinfo-sex" class="weui-check" id="userinfo-sex2" checked="checked">
					<span class="weui-icon-checked"></span>
				</div>
			</label>
			<label class="weui-cell weui-check__label" for="userinfo-sex3">
				<div class="weui-cell__bd">
					<p>萝莉</p>
				</div>
				<div class="weui-cell__ft">
					<input type="radio" value="3" name="userinfo-sex" class="weui-check" id="userinfo-sex3" checked="checked">
					<span class="weui-icon-checked"></span>
				</div>
			</label>
			<label class="weui-cell weui-check__label" for="userinfo-sex4">
				<div class="weui-cell__bd">
					<p>御姐</p>
				</div>
				<div class="weui-cell__ft">
					<input type="radio" value="4" name="userinfo-sex" class="weui-check" id="userinfo-sex4" checked="checked">
					<span class="weui-icon-checked"></span>
				</div>
			</label>
			<label class="weui-cell weui-check__label" for="userinfo-sex5">
				<div class="weui-cell__bd">
					<p>东方不败</p>
				</div>
				<div class="weui-cell__ft">
					<input type="radio" value="0" name="userinfo-sex" class="weui-check" id="userinfo-sex5" checked="checked">
					<span class="weui-icon-checked"></span>
				</div>
			</label>
		</div>
	    <div class="weui-btn-area">
	        <a href="javascript:void(0)" class="weui-btn weui-btn_primary" v-on:click="submitFn()">提交</a>
	    </div>
    </div>
</template>

<script>
import UserInfo from '../js/user-info';

export default UserInfo;
</script>