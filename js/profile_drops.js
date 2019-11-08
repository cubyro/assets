$('document').ready(function() {
	$('body').on('click', '.hero-cover__content-box-inner .channel__relationships .dropdown__handler', function() {
		let ele = this;
		let thisBtn = $(ele);
		let uid = thisBtn.data('id');
		let type = thisBtn.data('type');
		let currentVal = $('strong', thisBtn).text();
		
		if (typeof(uid) !== 'undefined' && typeof(type) !== 'undefined') {
			if (typeof(currentVal) !== 'undefined' && parseInt(currentVal) > 0) {
			let profileFriendsDrops = new Drop({
				target: ele,
				position: 'bottom center',
				constrainToWindow: false,
				constrainToScrollParent: false,
				openOn: 'click',
				hoverCloseDelay: 130,
				hoverOpenDelay: 132,
				content: '<div class="profile-list-drop"></div>',
				tetherOptions: {offset: '-5px 0'}
			});
			profileFriendsDrops.on('close', function(ele) {
	    		  setTimeout(function() {
	    			  profileFriendsDrops.remove();
	    			  profileFriendsDrops.destroy();
	    		  }, 50);
	    	  });
			profileFriendsDrops.on('open', function() {
				  let parentWrapper = $('.drop .profile-list-drop');
			    	let dropContent = ' \
			    		  <div class="dropdown  -below" style="">\
			    		  	<div class="dropdown__layer -fill"></div>\
			    		  	<div class="dropdown__content">\
			      		<div class="dd-channel-list list-wrap antiscroll-wrap niceScroller vertical profile-friends-popup">\
			      		<div class="antiscroll-inner" style="overflow-y: scroll;">\
			      			<ul class="list list--selectable profileFriendsList">\ ' + loadLoader(null, null, null, true, true , true) + '\
			      			</ul>\
			      		</div>\
			      		</div>\
			    		</div>\
			    	</div>';
			    	
				  parentWrapper.html(dropContent);
				  profileFriendsDrops.position();
				  
				  var parentDropWrapper = $('.dropdown .profile-friends-popup');
				  let list = $('.profileFriendsList', parentDropWrapper);
			    	
				  
				  $.post('/api/friends', {'id': uid, 'type': type}, function(r) {
					  removeLoaderSimple(list);
					if (typeof(r.data) !== 'undefined') {
						list.append(r.data);
						profileFriendsDrops.position();
						var loadPages = true;
						var nextPage = 2;
						if ($('.list__item', list).length > 4) {
							
							$('.profile-friends-popup .antiscroll-inner').height(250);
						  parentDropWrapper.antiscroll({initialDisplay: true, infinitescroll: function() {
							if (loadPages === true) {
									loadPages = false;
									list.append(loadLoader(null, null, null, true, true , true));
									$.post('/api/friends', {'id': uid, 'type': type, 'p': nextPage}, function(r) {
										if (typeof(r.data) !== 'undefined') {
											list.append(r.data);
											loadPages = true;
											nextPage++;
										}
										removeLoaderSimple(list);
									});	
								}
						  }});
						} else {
							$('.profile-friends-popup .antiscroll-inner').height(78 * $('.list__item', list).length);
						}
					  } else {
						  list.html('<li class="notification-list__empty"> Nu exista date </li>');
					  }
				  });
			  });			
			profileFriendsDrops.open();
		  }
		}
	});

});