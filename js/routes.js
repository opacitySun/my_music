/**
 * 创建vue路由
 *
 * Created by sunbowei on 17-1-7.
 */

const Routes = {
	//配置路由模式
	mode: 'history',
	//应用的基路径
	base: __dirname,
	routes: [
		{
			path: '/',
			component: require('./modules/layout/index')
		},
		{
			path: '/music-list',
			name: 'music-list',
			component: require('./modules/music/list')
		},
		{
			path: '/music-detail/:id',
			name: 'music-detail',
			component: require('./modules/music/detail')
		},
		{
			path: '*',
			component: require('./modules/not-found')
		},
	]
};

module.exports = Routes;