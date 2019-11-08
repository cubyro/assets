(function() {
//$('document').ready(function() {
	var _UserDrop = Drop.createContext({
		classPrefix: 'drop'
	});
	var userDrop = new _UserDrop({
		target: $('.header-channel__avatar')[0],
		position: 'bottom right',
		constrainToWindow: true,
		constrainToScrollParent: false,
		openOn: 'hover',
		content: $('.usermenu').html(),
		hoverCloseDelay: 380,
        hoverOpenDelay: 62,
		tetherOptions: {offset: '-5px 0'}
	});
	userDrop.on('open', function(ele) {
		var userScroll = $('.drop .channel-menu-dropdown .antiscroll-wrap').antiscroll({initialDisplay: true});
	});
	
//});
}).call(this);