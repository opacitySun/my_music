<template>
    <div>
    	<div class="weui-page__head div-box">
    		<i class="fa fa-chevron-left" v-on:click="goback()"></i>
    		<h4 class="div-box-flex1">个人信息</h4>
    	</div>
    	<form id="userinfo-form" enctype="multipart/form-data">
	    	<div class="weui-cells__title">基本信息</div>
			<div class="weui-cells weui-cells_form">
		        <div class="weui-cell">
		            <div class="weui-cell__hd"><label class="weui-label">昵称</label></div>
		            <div class="weui-cell__bd weui-cell_primary"><input type="text" v-model="userinfoName" class="weui-input" placeholder="无" /></div>
		        </div>
		        <div class="weui-cell">
		            <div class="weui-cell__hd"><label class="weui-label">积分</label></div>
		            <div class="weui-cell__bd weui-cell_primary">{{points}}</div>
		        </div>
		    </div>
		    <div class="weui-cells__title">性别</div>
		    <div class="weui-cells weui-cells_radio">
				<label class="weui-cell weui-check__label" for="userinfo-sex1">
					<div class="weui-cell__bd">
						<p>正太</p>
					</div>
					<div class="weui-cell__ft">
						<input type="radio" value="1" class="weui-check" name="userinfo-sex" id="userinfo-sex1" v-model="userinfoSex">
						<span class="weui-icon-checked"></span>
					</div>
				</label>
				<label class="weui-cell weui-check__label" for="userinfo-sex2">
					<div class="weui-cell__bd">
						<p>猛男</p>
					</div>
					<div class="weui-cell__ft">
						<input type="radio" value="2" name="userinfo-sex" class="weui-check" id="userinfo-sex2" v-model="userinfoSex">
						<span class="weui-icon-checked"></span>
					</div>
				</label>
				<label class="weui-cell weui-check__label" for="userinfo-sex3">
					<div class="weui-cell__bd">
						<p>萝莉</p>
					</div>
					<div class="weui-cell__ft">
						<input type="radio" value="3" name="userinfo-sex" class="weui-check" id="userinfo-sex3" v-model="userinfoSex">
						<span class="weui-icon-checked"></span>
					</div>
				</label>
				<label class="weui-cell weui-check__label" for="userinfo-sex4">
					<div class="weui-cell__bd">
						<p>御姐</p>
					</div>
					<div class="weui-cell__ft">
						<input type="radio" value="4" name="userinfo-sex" class="weui-check" id="userinfo-sex4" v-model="userinfoSex">
						<span class="weui-icon-checked"></span>
					</div>
				</label>
				<label class="weui-cell weui-check__label" for="userinfo-sex5">
					<div class="weui-cell__bd">
						<p>东方不败</p>
					</div>
					<div class="weui-cell__ft">
						<input type="radio" value="0" name="userinfo-sex" class="weui-check" id="userinfo-sex5" v-model="userinfoSex">
						<span class="weui-icon-checked"></span>
					</div>
				</label>
			</div>
			<div class="weui-cells__title">头像</div>
			<div class="weui-cells weui-cells_form">
				<div class="weui-cell">
		            <div class="weui-cell__bd">
		            	<div class="weui-uploader">
		            		<div id="upload-img" class="weui-uploader__file weui-uploader__file_status" :style="uploadImgStyle">
	            				<div class="weui-uploader__file-content">50%</div>
	            			</div>
	            			<div class="weui-uploader__input-box">
								<input id="uploader-input" name="userinfo-img" class="weui-uploader__input" type="file" accept="image/*" />
							</div>
		            	</div>
		            </div>
		        </div>
			</div>
		</form>
	    <div class="weui-btn-area">
	        <a href="javascript:void(0)" class="weui-btn weui-btn_primary" @click="submitFn()">提交</a>
	    </div>
    </div>
</template>

<script>
import UserInfo from '../js/user-info';

export default UserInfo;
</script>