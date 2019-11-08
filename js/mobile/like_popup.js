$('document').ready(function() {
	var likesDrop = [];
	$('.recipe_likes_wr').each(function(i, ele) {
		let element = $(ele);
		let itemID = element.data('id');
		let parentEle = element.parents('.cook__like-button').eq(0);
		let rType = parentEle.data('itemtype');
		let thepos = element.data('pos');
		let position = '5px -115px';
		if (thepos == 'toright') {
			position = '5px 65px'
		}
		if (typeof(itemID) !== 'undefined' && typeof(rType) !== 'undefined') {
			likesDrop[i] = new Drop({
				target: ele,
				position: 'bottom center',
				constrainToWindow: false,
				constrainToScrollParent: false,
				openOn: 'click',
				content: '<div class="recipe-likes-list-drop"></div>',
				tetherOptions: {offset: '-5px 0', targetOffset: position}
		  });
			likesDrop[i].on('close', function(ele) {
	    		  setTimeout(function() {
	    			  likesDrop[i].remove();
	    		  }, 50);
	    	  });
			likesDrop[i].on('open', function() {
			  let parentWrapper = $('.drop .recipe-likes-list-drop');
		    	let dropContent = ' \
		    		  <div class="dropdown -below">\
		    		  	<div class="dropdown__layer -fill"></div>\
		    		  	<div class="dropdown__content">\
		      		<div class="dd-channel-list list-wrap antiscroll-wrap niceScroller vertical recipes-like-popup">\
		      		<div class="antiscroll-inner" style="overflow-y: scroll;">\
		      			<ul class="list list--selectable recipelikeslist">\ ' + loadLoader(null, null, null, true, true , true) + '\
		      			</ul>\
		      		</div>\
		      		</div>\
		    		</div>\
		    	</div>';
		    	
			  parentWrapper.html(dropContent);
			  likesDrop[i].position();
			  
			  var parentDropWrapper = $('.dropdown .recipes-like-popup');
			  let likesList = $('.recipelikeslist', parentDropWrapper);
		    	
			  $.post('/api/get-likes', {'id': itemID, 'rType' : rType}, function(r) {
				  removeLoaderSimple(likesList);
				if (typeof(r.data) !== 'undefined') {					
					likesList.append(r.data);
					likesDrop[i].position();
					var loadPages = true;
					var nextPage = 2;
					if ($('.list__item', likesList).length > 4) {
						$('.recipes-like-popup .antiscroll-inner').height(250);
					  parentDropWrapper.antiscroll({initialDisplay: true, infinitescroll: function() {
						if (loadPages === true) {
								loadPages = false;
								likesList.append(loadLoader(null, null, null, true, true , true));
								$.post('/api/get-likes', {'id' : itemID, 'p': nextPage, 'rType' : rType}, function(r) {
									if (typeof(r.data) !== 'undefined') {
										likesList.append(r.data);
										loadPages = true;
										nextPage++;
									} else {
//										 
									}
									removeLoaderSimple(likesList);
								});	
							}
					  }});
					} else {
						$('.recipes-like-popup .antiscroll-inner').height(78 * $('.list__item', likesList).length);
					}
				  } else {
					  likesList.html('<li class="notification-list__empty"> Nu exista date </li>');
				  }
			  });
		  });
		}
	});

});