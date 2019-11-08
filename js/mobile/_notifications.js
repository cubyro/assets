$('document').ready(function() {
	$('body').on('click', '.notifications-common .-notify-handler', function(event) {
		let parentWrap = $(this).parents('.notifications-common').eq(0);
		let dropInner = $('.dropdown__inner', parentWrap);		
		
		if (dropInner.hasClass('-showed')) {
			dropInner.addClass('-hidden').removeClass('-showed');
		} else {
			if (dropInner.hasClass('-inited')) {
				dropInner.removeClass('-hidden').addClass('-showed');
//				dropInner.css('left', '-212.45px');
				dropInner.css('left', '-295.45px');
			} else {
				dropInner.removeClass('-hidden').addClass('-showed');
//				dropInner.css('left', '-212.45px');
				dropInner.css('left', '-295.45px');
				loadLoader(dropInner, null, null, true);
				$.post('/api/notifications_common', {}, function(r) {
					if (typeof(r.data) !== 'undefined') {
						$('.badge-counter', parentWrap).addClass('-hided');
						let unreadNumber = parseInt($('.badge-counter span', parentWrap).text());
						$('.dd-notification-list', dropInner).html(r.data);
						$(".timeago", dropInner).timeago();
						setTimeout(function() {
							$(".timeago", dropInner).show();
						}, 300);
						var loadPages = true;
						var nextPage = 2;
						var toFollowContainer = $('.notificationscommon', dropInner);
						$('.dd-notification-list', dropInner).antiscroll({initialDisplay: true, infinitescroll: function() {
							if (loadPages === true && nextPage <= 30) {
								loadPages = false;
								var parentGroup = toFollowContainer.parents('.subgroup').eq(0);
								var parentSubGroup = toFollowContainer.parents('.subgroup__content').eq(0);
								parentGroup.addClass('-loading');
								$.post('/api/notifications_common', {'p' : nextPage, 't': 'next'}, function(r) {
									if (typeof(r.data) !== 'undefined') {
										toFollowContainer.append(r.data);
										notificationItemsAnim($('.dd-notification-list li:not(.animate-swing-in__item-showed)', dropInner));
										$(".timeago", toFollowContainer).timeago();
										setTimeout(function() {
											$(".timeago", toFollowContainer).show();
										}, 300);
										loadPages = true;
										nextPage++;
										if (nextPage >= 30) {
											loadPages = false;
//											parentSubGroup.append('<div class="subgroup__load-more hbold -hidedx" item-list-load=""><a href="/cont/notificari">Vezi toate notificarile</a></div>');
										}
									} else {
//										 parentSubGroup.append('<div class="subgroup__load-more hbold -hidedx" item-list-load=""><a href="/cont/notificari">Vezi toate notificarile</a></div>');
									}
									parentGroup.removeClass('-loading');
								});	
							}
						}});						
						notificationItemsAnim($('.dd-notification-list li:not(.animate-swing-in__item-showed)', dropInner));
						// mark read
						if (unreadNumber > 0) {
							$.post('/api/notifications_common_mark', {}, function(){});
						}
						
					} else {
						$('.dd-notification-list', dropInner).removeClass('pb-45');
						$('.dd-notification-list', dropInner).html('<ul class="list list--selectable"><li class="notification-list__empty"> Nu ai nici o notificare </li></ul>');
					}
					dropInner.addClass('-inited');
					removeLoader(dropInner);
				});
			}
		}
	});
});