/**
 * 创建vue路由
 *
 * Created by sunbowei on 17-1-7.
 */

var Routes = {
	'/': {
		component: require('./modules/index')
	},
	'/music-list': {
		name: 'music-list',
		component: require('./modules/music/list')
	},
	'/music-detail/:id': {
		name: 'music-detail',
		component: require('./modules/music/detail')
	},
	'*': {
		component: require('../modules/not-found')
	}
};

module.exports = Routes;