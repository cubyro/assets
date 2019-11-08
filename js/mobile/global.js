$('document').ready(function() {
	
	insertRecipeWinnerSvgs();
	
	var mobileMenu = new Mmenu("#mobilem", {
		extensions 	: [ "border-none", "fullscreen", "position-bottom" ],
		navbar: {title: 'Cuby'},
		backButton: {close: true},
		hooks: {
            "close:start": function() {
            	$('.mm_m_l').removeClass('opened');
            }
        },
		navbars:[{position:"top",content:['<div class="mmenu_c_search pl-15 pr-15 pt-2"><div class="qws header__search pl-left"><form action="/cautare" accept-charset="UTF-8" method="get"><input type="text" name="q" id="q" value="" class="query input-field " placeholder="Cautare..." data-input="true" autocomplete="off"></form></div></div>', "close"]}, {content : [ "prev", "title", "close"]}],
		offCanvas: {page: 'body > .mainc_c'}}, {});
	
	 var mobileMapi = mobileMenu.API;
	  
	  $('body').on('click', '.mm_m_search', function() {
		  $('#mobilem .mm-navbar').eq(0).show();
		  $('#mobilem .mm-navbar').eq(1).hide();
		  $('.mm_m_l').removeClass('opened');
		  let ele = $(this);
		  let panel = document.querySelector("#mobilem_search");
		  if ($(panel).hasClass('mm-panel_opened')) {
			  mobileMapi.close();
		  } else {
			  ele.addClass('opened');
			  mobileMapi.openPanel( panel );  
		  }
	  });
	  
	  $('body').on('click', '.mm_m_list', function() {
		  $('#mobilem .mm-navbar').eq(0).hide();
		  $('#mobilem .mm-navbar').eq(1).show();
		  let ele = $(this);
		  $('.mm_m_l').removeClass('opened');
		  let panel = document.querySelector("#mobilem_list");
		  if ($(panel).hasClass('mm-panel_opened')) {
			  mobileMapi.close();
		  } else {
			  ele.addClass('opened');
			  mobileMapi.openPanel( panel );  
		  }
	  });
	  
	  $('body').on('click', '.mm_m_add', function() {
		  $('#mobilem .mm-navbar').eq(0).hide();
		  $('#mobilem .mm-navbar').eq(1).show();
		  $('.mm_m_l').removeClass('opened');
		  let ele = $(this);
		  let panel = document.querySelector("#mobilem_add");
		  if ($(panel).hasClass('mm-panel_opened')) {
			  mobileMapi.close();
		  } else {
			  ele.addClass('opened');
			  mobileMapi.openPanel( panel );  
		  }
	  });
	  $('body').on('click', '.mm_m_profile', function() {
		  $('#mobilem .mm-navbar').eq(0).hide();
		  $('#mobilem .mm-navbar').eq(1).show();
		  $('.mm_m_l').removeClass('opened');
		  let ele = $(this);
		  let panel = document.querySelector("#mobilem_profile");
		  if ($(panel).hasClass('mm-panel_opened')) {
			  mobileMapi.close();
		  } else {
			  ele.addClass('opened');
			  mobileMapi.openPanel( panel );  
		  }
	  });
	  
	$('.lz-img').lazy();
	$('.cook__tags').each(function(i, ele) {
		new ListTags({el: $(ele)});
	})
	if (typeof($('.ing_wrap')) !== 'undefined' && $('.ing_wrap').length > 0) {
    	  $('body').on('click', '.ing_wrap ul li', function() {
    		  $(this).toggleClass('iactive');
    	  })
	}

	clipElements = new ClipboardJS('.copyElement');
	
	clipElements.on('success', function(e) {
		let ele = $(e.trigger);
		
		if (ele.hasClass('sharing__dropdown__item')) {
			let cliptext = $('.cliptext', ele);
			cliptext.text('Copiat');
			setTimeout(function() {
				cliptext.text('Copiaza linkul');
			}, 1000);
		} else {
			ele.addClass('done');
			setTimeout(function() {
				ele.removeClass('done');
			}, 1000);	
		}
		
		
	    e.clearSelection();
	});
	
	jQuery(".timeago").timeago();
	setTimeout(function() {
		$('.timeago').show();
	}, 500);
		
	  $('body').on('click', '.viewer__share', function() {
		  parent = $(this).parents('.cook');
		  $('.viewer__sharing', parent).toggleClass('-hidden');
	  });
	  $('body').on('mouseenter', '.viewer ', function() {
//		  console.log('qq');
		  $('.viewer__controls__right-top', this).removeClass('-hidden');
	  });
	  $('body').on('mouseout', '.viewer ', function() {
//		  console.log('qq');
//		  $('.viewer__controls__right-top', this).addClass('-hidden');
	  });
	  
	  $('body').on('click', '.recipefav', function() {
		  let ele = $(this);
		  let recipeID = ele.data('recipe-id');
		  if (parseInt(recipeID) > 0) {
			  $.post('/api/manage-favorites', {'id' : recipeID}, function(response) {
				  if (typeof(response.data) !== 'undefined') {
					  if (ele.hasClass('-added')) {
						  ele.removeClass('-added');
						  ele.attr('data-tooltip', 'Adauga la favorite &nbsp;');
						  toolID = ele.attr('aria-describedby');
						  toolID = ele.attr('aria-describedby');
						  if (typeof(toolID) !== 'undefined') {
							  $('#'+toolID).html('Adauga la favorite &nbsp;');
						  }
					  } else {
						  ele.addClass('-added');
						  ele.attr('data-tooltip', 'Sterge de la favorite');
						  toolID = ele.attr('aria-describedby');
						  if (typeof(toolID) !== 'undefined') {
							  $('#'+toolID).html('Sterge de la favorite');
						  }	  
					  }
				  }
			  });
		  }
	  });
	  

	  
	  $('body').on('click', '.cook__like-button .onlike', function() {
		  let ele = $(this);
		  let recipeWrap = ele.parents('.cook__inner').eq(0);
		  let itemID = ele.data('item-id');
		  let parentEle = ele.parents('.cook__like-button').eq(0);
		  let rType = parentEle.data('itemtype');
		  console.log(itemID);
		  if (parseInt(itemID) > 0) {
			  $.post('/api/manage-likes', {'id' : itemID, 'rtype': rType}, function(response) {
				  if (typeof(response.data) !== 'undefined') {
					  let parent = ele.parents('.cook__like-button').eq(0);
					  parent.toggleClass('-on');
					  console.log(parent);
					  let currentVal = $('[counter-value]', parent).data('val');
					  if (parent.hasClass('-on')) {
						  if (parseInt(currentVal) > 0) {
							  currentVal = currentVal + 1;
						  } else {
							  currentVal = 1;
						  }
						  $('.cook__like-banner', recipeWrap).addClass('-showed');
//						  setTimeout(function() {
//							  $('.cook__like-banner', recipeWrap).removeClass('-showed');
//						  }, 4000);
					  } else {
						  if (parseInt(currentVal) > 0) {
							  currentVal = currentVal - 1;
						  } else {
							  currentVal = 0;
						  }
						  $('.cook__like-banner', recipeWrap).removeClass('-showed');
					  }
					  $('[counter-value]', parent).data('val', currentVal);
					  if (parseInt(currentVal) > 0) {
						  $('[counter-value]', parent).text(currentVal);  
					  } else {
						  $('[counter-value]', parent).text('');
					  }
				  }
			  });
		  }
	  });

      
      $('body').on('click', '.follow-btn .-follow-active', function() {
    	  let ele = $(this);
  		  profileID = ele.data('profile-id');
  		  let allEle = $('.follow-btn .-follow-active[data-profile-id="'+profileID+'"]');
		  if (parseInt(profileID) > 0) {
    		  $.post('/api/manage-follows', {'id' : profileID}, function(response) {
    			  if (typeof(response.data) !== 'undefined') {
    				  let parentWrap = ele.parents('.channel__relationships').eq(0);
    				  let followersEle = $('button[data-type="followers"][data-id="'+profileID+'"] strong');
    				  let followingEle = $('button[data-type="following"][data-id="'+userID+'"] strong');
    				  let currentVal = followersEle.text();
    				  let currentValFollowing = followingEle.text();
	    			  if (ele.hasClass('following')) {
	    				  allEle.removeClass('following');
	    				  allEle.removeClass('unfollow');
	    				  allEle.removeClass('-on');
	    	        	  $('.text', allEle).text('Urmareste');
	    	        	  $('.usermini--profile[data-uid="'+profileID+'"]').attr('following', '0');
	    	        	  if (typeof(parentWrap) !== 'undefined') {
	    	        		  if (parseInt(currentVal) > 0) {
	    	        			  currentVal = parseInt(currentVal) - 1;
	    	        		  } else {
	    	        			  currentVal = 0;
	    	        		  }
	    	        		  if (parseInt(currentValFollowing) > 0) {
	    	        			  currentValFollowing = parseInt(currentValFollowing) - 1;
	    	        		  } else {
	    	        			  currentValFollowing = 0;
	    	        		  }
	    	        		  followersEle.text(currentVal);
	    	        		  followingEle.text(currentValFollowing);
	    	        	  }
	    	    	  } else {
	    	    		  allEle.addClass('following');
	    	    		  allEle.addClass('-on');
	    	        	  $('.text', allEle).text('');
	    	        	  $('.usermini--profile[data-uid="'+profileID+'"]').attr('following', '1');
	    	        	  if (typeof(parentWrap) !== 'undefined') {
	    	        		  if (parseInt(currentVal) > 0) {
	    	        			  currentVal = parseInt(currentVal) + 1;
	    	        		  } else {
	    	        			  currentVal = 1;
	    	        		  }
	    	        		  if (parseInt(currentValFollowing) > 0) {
	    	        			  currentValFollowing = parseInt(currentValFollowing) + 1;
	    	        		  } else {
	    	        			  currentValFollowing = 1;
	    	        		  }
	    	        		  followersEle.text(currentVal);
	    	        		  followingEle.text(currentValFollowing);
	    	        	  }
	    	    	  }
    			  }
    		  });
		  }
    	  
      });
      $('body').on('mouseenter', '.sb.-follow', function() {
    	  let btn = $(this);
    	  if (btn.hasClass('following')) {
    		  btn.addClass('unfollow');  
    		  $('.text', btn).text('Nu mai urmarii');
    	  }    	  
      });
      $('body').on('mouseleave', '.sb.-follow', function() {    	  
//    	  let btn = $('.-follow', $(this));
    	  let btn = $(this);
    	  if (btn.hasClass('following')) {
    		  btn.removeClass('unfollow');
    		  $('.text', btn).text('');
    	  }
      });
      
      $('body').on('click', '.viewSelector', function() {
    	 let type = $(this).attr('view');
    	 $.post('/api/change-grid-view', {'rlist' : type}, function(r) {
    		 if (typeof(r.success) !== 'undefined') {
    			 window.location.reload();
    		 }
    	 });
      });
      
  	$('body').on('click', '.goh', function() {
		 window.open($(this).attr('href') , "_blank");
		 setTimeout(function() {
			 location.reload();
		 }, 550);
		return false;
	});
  	

	$('body').on('change', '#mobilesfilterchange', function() {
		let thisEl = $(this);
		let sorter = thisEl.val();
		if (typeof(sorter) !== 'undefined') {
			let params = utils.getPageRequestData(window.location.href);
			params.ordonare = sorter;
			window.location = window.location.href.split('?')[0] + utils.makeUrlParams(params);
		}
	});
	$('body').on('change', '#mobilesfiltertypechange', function() {
		let thisEl = $(this);
		let sorter = thisEl.val();
		if (typeof(sorter) !== 'undefined') {
			let params = utils.getPageRequestData(window.location.href);
			params.tp = sorter;
			window.location = window.location.href.split('?')[0] + utils.makeUrlParams(params);
		}
	});
	$('body').on('change', '#mobileurlchange', function() {
		let thisEl = $(this);
		let sorter = thisEl.val();
		if (typeof(sorter) !== 'undefined') {
			window.location = sorter;
		}
	});
	
	
	
	if (typeof($('.dropdown--select-weeks .-toggle')) !== 'undefined' && $('.dropdown--select-weeks .-toggle').length > 0) {
		var ContestWinnerWeekFilterDrop = new Drop({
			target: $('.dropdown--select-weeks .-toggle')[0],
			position: 'bottom right',
			constrainToWindow: true,
			constrainToScrollParent: false,
			openOn: 'click',
			content: $('.dropdown--select-weeks .dropdown__inner').html(),
			hoverCloseDelay: 380,
	        hoverOpenDelay: 62,
			tetherOptions: {offset: '-5px 0'}
		});
		ContestWinnerWeekFilterDrop.on('open', function(ele) {
			var userScroll = $('.drop .dropdowncontestweekfilter-wr .antiscroll-wrap').antiscroll({initialDisplay: true});
		});
//		$('body').on('click', '.dropdownfilter-wr .list--selectable li a', function() {
//			let thisEl = $(this);
//			let sorter = thisEl.parents('li').eq(0).data('val');
//			$('.dropdown--select .-toggle span').text(thisEl.text());
//			if (typeof(sorter) !== 'undefined') {
//				let params = utils.getPageRequestData(window.location.href);
//				params.ordonare = sorter;
//				window.location = window.location.href.split('?')[0] + utils.makeUrlParams(params);
//			}
//			filterDrop.close();
//			return false;
//		});
	}
	
	if (typeof($('.categoriesdrp .-toggle')) !== 'undefined' && $('.categoriesdrp .-toggle').length > 0) {
		var categoriesDrop = new Drop({
			target: $('.categoriesdrp .-toggle')[0],
			position: 'bottom right',
			constrainToWindow: true,
			constrainToScrollParent: false,
			openOn: 'click',
			content: $('.categoriesdrp .dropdown__inner').html(),
			hoverCloseDelay: 380,
	        hoverOpenDelay: 62,
			tetherOptions: {offset: '-5px 0'}
		});
		categoriesDrop.on('open', function(ele) {
			var userScroll = $('.drop .categoriesview-scroller').antiscroll({initialDisplay: false});
		});
		$('body').on('change', '.mobilepicker #popular', function() {
			window.location = $(this).val();
		});
	}
	
//	var searchDrop = new Drop({
//		target: $('.search-popup')[0],
//		position: 'bottom right',
//		constrainToWindow: false,
//		constrainToScrollParent: false,
//		openOn: 'click',
//		content: $('.search-popup .dropdown__inner').html(),
//		hoverCloseDelay: 380,
//        hoverOpenDelay: 62,
//		tetherOptions: {offset: '-5px 0'}
//	});
//	$('body').on('focus', '.search-popup #q', function() {
//		let searchWrap = $('.search-popup');
//		let inputEle = $(this);
//		searchWrap.addClass('-visible-popup');
//		if (inputEle.val().length > 2) {			
//			$('.dropdown__inner', searchWrap).addClass('-showed');
//			$('.dropdown__inner', searchWrap).removeClass('-hidden');	
//		}
//	});
//	$('body').on('blur', '.search-popup #q', function() {
//		let searchWrap = $('.search-popup');
//		let inputEle = $(this);
//
//		setTimeout(function() {
//			searchWrap.removeClass('-visible-popup');
//			$('.dropdown__inner', searchWrap).addClass('-hidden');
//			$('.dropdown__inner', searchWrap).removeClass('-showed');
//			if (inputEle.val().length <= 2) {
//				$('.search-popup .search-popup__results').html('');	
//			}
//		}, 200);
//	});
	$('body').on('keyup', '.mobile_search_p #q', function(e) {
		clearTimeout($.data(this, 'stimer'));
		let searchWrap = $('.search-popup');
		let inputEle = $(this);
		if (e.keyCode != 13) {
			$(this).data('stimer', setTimeout(function() {
				if (inputEle.val().length > 2) {
					$('.mobile_search_p .header__search_results_premessage').html('');
					loadLoader($('.mobile_search_p .header__search_results'), null, null, true);
					$('.search-popup .search-popup__results').html('');
					$('.search-popup__loader').removeClass('-hidden');
					$.post('/api/search', {'q': inputEle.val()}, function(r) {
						if (typeof(r.data) !== 'undefined') {
							$('.mobile_search_p .header__search_results').html(r.data);
						} else {
							$('.mobile_search_p .header__search_results').html('<div class="mt-10">' + r.noresults + '</div>');
						}						
						removeLoader($('#mobile_search_p .header__search_results'));
//						$('.search-popup__loader').addClass('-hidden');
					});
				} else {
					$('.mobile_search_p .header__search_results').html('');
				}
			}, 650));
		}
	});
	$('body').on('submit', '.mobile_search_p form', function() {
		let inputEle = $('.mobile_search_p #q');
		removeLoader($('.mobile_search_p .header__search_results'));		
		inputEle.focus();
		if (inputEle.val().length <= 2) {
			$('.mobile_search_p .header__search_results_premessage').html('<div class=" mt-15 mb-5">Cel putin 3 litere pentru o cautare eficienta</div>');
			$('.mobile_search_p .header__search_results').html('');
			return false;
		}
		
	});
	
	// folowers
	$('body').on('click', '.notifications-friendship .-notify-handler', function(event) {
		let parentWrap = $(this).parents('.notifications-friendship').eq(0);
		let dropInner = $('.dropdown__inner', parentWrap);		
		
		if (dropInner.hasClass('-showed')) {
			dropInner.addClass('-hidden').removeClass('-showed');
		} else {
			if (dropInner.hasClass('-inited')) {
				dropInner.removeClass('-hidden').addClass('-showed');
				dropInner.css('left', '-295.45px');
			} else {
				dropInner.removeClass('-hidden').addClass('-showed');
				dropInner.css('left', '-295.45px');
				loadLoader(dropInner, null, null, true);
				$.post('/api/notifications_friends', {}, function(r) {
					if (typeof(r.data) !== 'undefined') {
						$('.badge-counter', parentWrap).addClass('-hided');
						let unreadNumber = parseInt($('.badge-counter span', parentWrap).text());
						$('.dd-notification-list', dropInner).html(r.data);
						var loadPages = true;
						var nextPage = 2;
						var toFollowContainer = $('.friendstofollow', dropInner);
						$('.dd-notification-list', dropInner).antiscroll({initialDisplay: true, infinitescroll: function() {
							if (loadPages === true && nextPage <= 5) {
								loadPages = false;
								var parentGroup = toFollowContainer.parents('.subgroup').eq(0);
								var parentSubGroup = toFollowContainer.parents('.subgroup__content').eq(0);
								parentGroup.addClass('-loading');
								$.post('/api/notifications_to_follow', {'p' : nextPage}, function(r) {
									if (typeof(r.data) !== 'undefined') {
										toFollowContainer.append(r.data);
										notificationItemsAnim($('.dd-notification-list li:not(.animate-swing-in__item-showed)', dropInner));
										loadPages = true;
										nextPage++;
									} else {
										// parentSubGroup.append('<div class="subgroup__load-more hbold -hidedx" item-list-load=""><a href="/XXXXX">Vezi mai multi utilizatori</a></div>');
									}
									parentGroup.removeClass('-loading');
								});	
							}
						}});						
						notificationItemsAnim($('.dd-notification-list li:not(.animate-swing-in__item-showed)', dropInner));
						// mark read
//						let thisNotifications = $('#user_follow_notifications').val();
//						if (typeof(thisNotifications) !== 'undefined') {
//							
//							$.post('/api/notifications_common_mark', {}, function(){});
////							$.post('/api/notifications_friends_mark', {'ids': $('#user_follow_notifications').val()}, function(){});
//						}
						// mark read
						if (unreadNumber > 0) {
							$.post('/api/notifications_friends_mark', {}, function(){});
						}
					} else {
						$('.dd-notification-list', dropInner).html('<ul class="list list--selectable"><li class="notification-list__empty">Nu ai nici o notificare</li></ul>');
					}
					dropInner.addClass('-inited');
					removeLoader(dropInner);
				});
			}
		}
	});
	
	if (typeof(userID) !== 'undefined' && parseInt(userID) > 0) {
		
	} else {
		$('body').on('submit', '.email-registration-form', function() {
			  let form = $(this);
			  let url = form.attr('action');
			  $('.ureg_field').removeClass('error');
			  loadLoader($('.email-registration-form'), 125, 125);
			  $('.email-registration-form button.sb').text('Se salveaza ...');
			  $.ajax({
				    url:url,
				    type:"POST",
				    beforeSend: function(xhr){
				        xhr.setRequestHeader("X-CSRF-Token", $('[name="_csrfToken"]', form).val());
				    },
				    data:form.serialize(),
				    dataType: "json",
				    success:function(response) {
				    	if (response.errors_text) {
				    		$.each( response.errors, function( key, value ) {
				    			$('[name="'+key+'"]', form).addClass('error');
			    			});
				    		$('.registration-form__error', form).html(response.errors_text);	
				    	} else if (typeof(response.data) !== 'undefined') {
				    		if (response.data.redirect) {
				    			window.location = response.data.redirect;
				    		} else {
				    			$('.reciperesponse .responset').html('');
				    			$('.reciperesponse').addClass('-hidden');
				    			$.fancybox.close();	
				    		}
				    	}
				    	$('.email-registration-form button.sb').text('Creaza cont');
				    	removeLoader($('.email-registration-form'));
				    },
				    error: function(response) {
				    	$('.email-registration-form button.sb').text('Creaza cont');
				    	removeLoader($('.email-registration-form'));
						$('.registration-form__error', form).html('Eroare de sistem. Va rugam reincarcati mai tarziu');
				    }
				});
			  return false;
		  });
		  
		  
		  $('body').on('submit', '.login-pass', function() {
			  let form = $(this);
			  let url = form.attr('action');
			  $('.ureg_field', form).removeClass('error');
			  $.ajax({
				    url:url,
				    type:"POST",
				    beforeSend: function(xhr){
				        xhr.setRequestHeader("X-CSRF-Token", $('[name="_csrfToken"]', form).val());
				    },
				    data:form.serialize(),
				    dataType: "json",
				    success:function(response) {
				    	if (typeof(response.errors_text) !== 'undefined') {
				    		if (response.errors_text) {
				    			$('.-error-text', form).html(response.errors_text);
				    			$('.ureg_field', form).addClass('error');
				    		}
				    	} else if (typeof(response.data) !== 'undefined') {
				    		if (typeof(response.data.redirect) !== 'undefined') {
				    			window.location = response.data.redirect;
				    		} else {
				    			$('.reciperesponse .responset').html('');
				    			$('.reciperesponse').addClass('-hidden');
				    			$('.menuresponse .responset').html('');
				    			$('.menuresponse').addClass('-hidden');
				    			$('.articleresponse .responset').html('');
				    			$('.articleresponse').addClass('-hidden');
				    			$.fancybox.close();	
				    		}
				    	}
				    },
				    error: function(response) {
				        
				    }
				});		  
			  return false;
		  });
		  
		  
		  $('body').on('submit', '.urecover-form', function() {
			  let form = $(this);
			  let url = form.attr('action');
			  $('.ureg_field', form).removeClass('error');
			  let parentWrapper = form.parents('.login_recover_password').eq(0);
			  $.ajax({
				    url:url,
				    type:"POST",
				    beforeSend: function(xhr){
				        xhr.setRequestHeader("X-CSRF-Token", $('[name="_csrfToken"]', form).val());
				    },
				    data:form.serialize(),
				    dataType: "json",
				    success:function(response) {
				    	if (typeof(response.errors_text) !== 'undefined') {
				    		if (response.errors_text) {			    	
				    			$('.-error-text', form).html(response.errors_text);
				    			$('.ureg_field', form).addClass('error');
				    		}
				    	} else if (typeof(response.data) !== 'undefined') {
				    		if (typeof(response.data.message) !== 'undefined') {
				    			$('.reset-pass__notify p', parentWrapper).html(response.data.message);
				    			form.remove();
				    		}
				    	}
				    },
				    error: function(response) {
				        
				    }
				});		  
			  return false;
		  });
		  
		  
		  
		  $('body').on('click', '.loginfgswitch', function() {
			  $('.registration-form-login', '.fancybox-content').hide();
			  $('.login_recover_password', '.fancybox-content').show();
			  $('.modal__body .back', '.fancybox-content').show();
		  });
		  $('body').on('click', '.modal__body .back', function() {		  
			  $('.login_recover_password', '.fancybox-content').hide();
			  $('.modal__body .back', '.fancybox-content').hide();
			  $('.registration-form-login', '.fancybox-content').show();
		  });
		  
		  $('body').on('click', '[data-dialog-change="sign_in"]', function() {
			  $.fancybox.close();
			  setTimeout(function() {
				  $('.header__login-buttons__sign-up').trigger('click');  
			  }, 450);
			  
		  });
		  $('body').on('click', '[data-dialog-change="sign_up"]', function() {
			  $.fancybox.close();
			  setTimeout(function() {
				  $('.mregis').first().trigger('click');  
			  }, 450);
			  
		  });
	}
	
	
//	$(window).scroll(function() {
//		var scrollDistance = $(window).scrollTop();
//		$('.jumpedsection').each(function(i) {
//			if ($(this).position().top <= scrollDistance) {
////				$('.nav__menu ul li.jumptsection_holder.active').removeClass('active');
////				$('.nav__menu ul li.jumptsection_holder').eq(i).addClass('active');
//			}
//		});
//	}).scroll();
	
	$('body').on('click', '.jumptsection', function(e) {
		e.preventDefault();
		var target = $(this).attr("href");
		$('html, body').stop().animate({
				scrollTop: $(target).offset().top
		}, 10);
		return false;
	});
	
	
	$('body').on('click', '.scrollToComment', function(e) {
		e.preventDefault();
		let elementWanted = $(this).attr('href'); 
		window.location.hash = elementWanted;
		animateScrollToElement(elementWanted, false);
	    return false;
	});
	
	$('html').on('click', 'body', function(event) {
		let parentWrap = $('.notifications-friendship');
		let dropInner = $('.dropdown__inner', parentWrap);
		let openerBtn = $('.-notify-handler', parentWrap);
		if ((parentWrap.has(event.target).length == 0 && !parentWrap.is(event.target))) {
			if (dropInner.hasClass('-showed')) {
				dropInner.addClass('-hidden').removeClass('-showed');
			}
		}
		
		parentWrap = $('.notifications-common');
		dropInner = $('.dropdown__inner', parentWrap);
		openerBtn = $('.-notify-handler', parentWrap);
		if ((parentWrap.has(event.target).length == 0 && !parentWrap.is(event.target))) {
			if (dropInner.hasClass('-showed')) {
				dropInner.addClass('-hidden').removeClass('-showed');
			}
		}
	});
	
//	if (typeof($('.usermini--profile')) !== 'undefined' && $('.usermini--profile').length > 0) {
//		$('.usermini--profile').each(function(i, ele) {
//			createProfileDrop(ele);
//		})	
//	}
	
	if (typeof($('.recipegalthumb')) !== 'undefined') {
		$('body').on('click', '.recipegalthumb', function() {
			let parent = $(this).parents('.cook__inner').eq(0);
			$('.ck-item-image', parent).attr('style', 'background-image: url(' + $(this).data('src') + ')');
//			$('.cook__inner .cook__viewer .viewer__img').attr('src', $(this).data('src'));
			$('.recipegalthumb').removeClass('iphovered');
			$(this).addClass('iphovered');
			return false;
		});
	}
});
function notificationItemsAnim(eleQuery) {
	eleQuery.each(function(i, item) {
		setTimeout(function() {
			$(item).addClass('animate-swing-in__item-showed');
		}, 25*i);
	});	
}
function loadLoader(ele, w, h, small, simple, doReturn) {
	w = (parseInt(w) > 0 ? w : 25);
	h = (parseInt(h) > 0 ? h : 25);
	let loaderHtml = (simple === true ? '' : '<div class="loader__overlay avatar">') + '<div class="loadRotator ' + (small ? 'small' : '')+ ' -loader-embedded" style="width: ' + w + 'px; height: ' + h + 'px; margin: auto auto;"><span class="s-1"></span><span class="s-2"></span><span class="s-3"></span><span class="s-4"></span><span class="s-5"></span><span class="s-6"></span><span class="s-7"></span><span class="s-8"></span><span class="s-9"></span><span class="s-10"></span><span class="s-11"></span><span class="s-12"></span></div>' + (simple ? '' : '</div>');
	if (doReturn === true) {
		return loaderHtml;
	} else {
		ele.append(loaderHtml);	
	}
	
}
function removeLoader(ele) {
	$('.loader__overlay', ele).remove();
}
function removeLoaderSimple(ele) {
	$('.loadRotator', ele).remove();
}
function makeQueryParams(obj) {
	var result = "";
	for (var key in obj) {
		if (result) {
			result += "&";
		}
		result += encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
	}
	return result ? "?" + result : "";
}
function getPageQueryParams(url) {
	var params = [];
	if (url) {
		var urlParamsPart = url;
		if(url.indexOf("?") != -1) {
			urlParamsPart = url.split("?")[1];
		}
		var parts = urlParamsPart.split('&');

		for (var i = 0; i < parts.length; i++) {
			var keyVal = parts[i].split('=');
			if (!keyVal[0]) continue;
			params[keyVal[0]] = keyVal[1] || "";
		}
	}
	return params;
}
//function createProfileDrop(element) {
//	var ele = $(element);
//	let url = $('a', ele).attr('href');
//	if (typeof(url) === 'undefined') {
//		url = ele.attr('href');
//	}
//	let username = ele.data('username');
//	let description = ele.data('description');
//	let uid = ele.data('uid');
//	let recipeID = ele.data('recipe-id');
//	let following = ele.attr('following');
//	let avatar = ele.data('avatar');
//	let views = ele.data('views');
//	
//	let recipeCount = ele.data('recipe-count');
//	let menuCount = ele.data('menu-count');
//	let articleCount = ele.data('article-count');
//	
//	if (typeof(avatar) === 'undefined') {
//		avatar = $('img', ele).attr('src');
//	}
//	  
//	  
//	  var btnClass = '';
//	  var btnText = 'Urmareste';
//	  if (typeof(following) !== 'undefined') {
//		  if (parseInt(following) > 0) {
//  		  btnClass = '-on following';
//  		  btnText = '';
//		  }
//	  }
//	  
//	  let profileDrop = ' \
//		  <div class="dropdown -below">\
//		  	<div class="dropdown__layer -fill"></div>\
//		  	<div class="dropdown__content">\
//		    	<div class="channel channel--box-card box box-card box--banner " data-id="'+uid+'">\
//		    		<a target="_blank" href="' + url +'" class="goh box-card__screen">\
//		  				<div class="box-card__screen" style="xbackground-image: url('+avatar+'); opacity: 1;"></div>\
//		  				<div class="box-card__screen__right-note">' + (parseInt(views) > 0 ? views + '&nbsp;afisari' : '') + '</div>\
//		  			</a>\
//		  			<div class="box-card__meta">\
//		  				<div class="channel__avatar">\
//	  						<a target="_blank" href="' + url +'" class="goh">\
//		  						<img src="'+avatar+'"  width="56" height="56" class="image">\
//	  						</a>\
//	  					</div>\
//	  					<div class="channel-follow-button">\
//	  					<div class="follow-btn " data-following="'+(parseInt(following) > 0 ? 'true' : 'false')+'">';
//	  
//		if (typeof(userID) !== 'undefined' && parseInt(userID) > 0) {
//			if (parseInt(userID) != parseInt(uid)) {
//			profileDrop += '<button type="button" data-profile-id="'+uid+'" auto-init="" widget-follow-button="" class="sb -st -rn -follow -follow-active ' + btnClass + '">\
//	  								<i class="follow-icon"></i>\
//	  								<span class="text">'+btnText+'</span>\
//	  								<i class="unfollow-icon"></i>\
//	  							</button>';
//			}
//	  						
//		} else {
//			profileDrop += '<button type="button" data-fancybox="login'+recipeID+'" data-type="ajax" data-src="/api/login_popup" data-selectable="true" data-touch="false" data-profile-id="'+uid+'" widget-follow-button="" class="sb -st -rn -follow">\
//						<i class="follow-icon"></i>\
//						<span class="text">'+btnText+'</span>\
//						<i class="unfollow-icon"></i>\
//					</button>';
//		}
//		profileDrop += '</div></div>\
//		  				<h5 class="channel__title hbold">\
//		  						<a target="_blank" href="' + url +'" class="goh">  ' + username + '</a>\
//		  				</h5>\
//	  					<p class="channel__description">' + description +'</p>\
//	  					<p class="channel__counters">' +	  					
//	  						(parseInt(recipeCount) > 0 ? '<a class="-ribbon-hvr-text" href="'+url+'/retete"> ' + recipeCount + ' Retete </a>' : '') +
//	  						(parseInt(menuCount) > 0 ? '<span class="middot"></span><a class="-ribbon-hvr-text" href="'+url+'/meniuri-culinare"> ' + menuCount + ' Meniuri </a>' : '') +
//	  						(parseInt(articleCount) > 0 ? '<span class="middot"></span><a class="-ribbon-hvr-text" href="'+url+'/articole"> ' + articleCount + ' Articole </a>' : '') +
//	  					'</p>\
//	  				</div>\
//	  			</div>\
//	  		</div>\
//	  	</div>\
//		  ';
//	var _RecipeProfileDrop = Drop.createContext({
//		classPrefix: 'recipe_profile'
//	});
//	  let thisDrop = new _RecipeProfileDrop({
//	        target: element,
//	        position: 'bottom center',
//	        constrainToWindow: false,
//	        constrainToScrollParent: false,
//	        openOn: 'hover',
//	        hoverCloseDelay: 200,
//	        hoverOpenDelay: 350,
//	        content: profileDrop,
//	      });
//	  
//	  thisDrop.on('close', function(ele) {
//		  thisDrop.remove();
//	  });
//	  
//}

(function() {
	  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	  window.ListTags = (function() {
	    function ListTags(opts) {
	      this.updateLayout = bind(this.updateLayout, this);
	      this.el = opts.el;
	      this.wrap = this.el.find('.tags-wrap');
	      this.tags = this.wrap.find('a');
	      this.cropper = this.tagExpander();
	      this.uncropper = this.tagHider();
	      this.index = null;
//	     
	      this.updateLayout();
	      this.cropper.on("click", (function(_this) {
	        return function() {
	          return _this.crop(true);
	        };
	      })(this));
	      this.uncropper.on("click", (function(_this) {
	        return function() {
	          return _this.crop(false);
	        };
	      })(this));
	    }

	    ListTags.prototype.crop = function(expand) {
	      if (expand == null) {
	        expand = true;
	      }
	      this.el.toggleClass('-cropped', !expand);
	      return this.tags.filter((function(_this) {
	        return function(num, el) {
	          return num >= _this.index;
	        };
	      })(this)).toggleClass('-hidden', !expand);
	    };

	    ListTags.prototype.updateLayout = function() {
	      var currentLineOffset, i, j, len, lines, maxLines, ref, tag, tagOffset;
	      this.wrap.removeClass('-v-hidden');
	      maxLines = 1;
	      currentLineOffset = this.tags.first().offset();
	      lines = 1;
	      ref = this.tags;
	      for (i = j = 0, len = ref.length; j < len; i = ++j) {
	        tag = ref[i];
	        tagOffset = $(tag).offset();
	        if (lines === maxLines && tagOffset.top > currentLineOffset.top) {
	          this.index = this.wrap.offset().left + this.wrap.width() > $(this.tags[i - 1]).offset().left + $(this.tags[i - 1]).outerWidth() + 34 ? i : i - 1;
	          break;
	        } else if (tagOffset.top > currentLineOffset.top) {
	          lines++;
	          currentLineOffset = tagOffset;
	        }
	      }
	      if (!this.index) {
	        return;
	      }
	      this.tags.eq(this.index).before(this.cropper);
	      this.tags.last().after(this.uncropper);
	      return this.tags.filter((function(_this) {
	        return function(num, el) {
	          return num >= _this.index;
	        };
	      })(this)).addClass('-hidden');
	    };

	    ListTags.prototype.tagExpander = function() {
	      return $("<button />", {
	        html: '&rarr;',
	        type: "button",
	        "class": "sb tags-cropper cook__tags-tag"
	      });
	    };

	    ListTags.prototype.tagHider = function() {
	      return $("<button />", {
	        html: '&larr;',
	        type: "button",
	        "class": "sb tags-uncropper cook__tags-tag"
	      });
	    };

	    return ListTags;

	  })();

	}).call(this);

function isWhitespace(ch) {
	  var whiteSpace = false
	  if ((ch == ' ') || (ch == '\t') || (ch == '\n')) {
	    whiteSpace = true;
	  }
	  return whiteSpace;
	}

function animateScrollToElement(elementSelector, animation=true) {
	document.querySelector(elementSelector).scrollIntoView({ 
		  behavior: 'smooth',
		  block: 'center'
	});
	if (animation) {
		$(elementSelector).addClass('fastanimation animated pulse');
		setTimeout(function() {
			$(elementSelector).removeClass('fastanimation animated pulse');	
		}, 850);
	}
}
function insertCommentFlag(ele) {
	ele.html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="18" viewBox="0 0 34 32"><image y="1" width="32" height="30" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAYAAACiyHcXAAAD3UlEQVRIib2Xa2hcRRTH/2duNtzgK9H6+OCjaKmCKAaxCgYtRSn6oT7AiFQS1r13RpSiRYN+Uj8oolgUBenM7GZpLGhi7Sc/GERCQdSiaKFaiiFohQqCdhukbsjNvUcmZpdhTbqPJvnDPu6ZM+f+dvY/O2cJLapUKl2QpuntRHQNM/9NRN/GcfxLq/PPpqYQ5XL5iiRJXgHwODOf548R0REiejOO4w/XDMIYs5OZ3wdw4VmLEE0KIVQURSdWFUJr/TqAF9uoNQsgVkp93BEEMwtjzGYAM0qpRGt9HREdY+budgsCKHZ3d4/k8/nTKyVorSeEEBNxHB9YhCiXy2GSJIeYeYuDCMPw7uHh4ZPGmGeY+Z0OIJz+FEK8TUR7oyg65Q+Uy+WN8/PzMwCOKqVuWYSw1m7LsuwLL+/Lvr6+rYODg6kx5iAzP9QhiPPKHDOPE9H+MAy/rlarXUR0gJnvWUrZpJSaEUKI4y7ZmztQqVRedW9yudwTRNTxNmTmEMAwM38+Nzc3S0R/eQAOcrt7FYVC4XcAuxs+wQvGmPvc9xoEwSARzXcK4gEF7tEQ27oI4Z6klHsBjHuDxMxj1torC4XCdwCeP1eIFXRbHcKpq6srBjDt5W5g5o+mpqa6pJTvATi4BhAbi8XixXWIQqHgfooHfX8w853T09OvLV2ekz9WUpZlNwh/TEp5hJmfbcgfsdber5SaXS1/NGizaIwopTQR1c8C548sy8ZGR0evWiN/XP0/CKfe3l5JRD97oUsWFhbq/iCiTxrnENEJInoZwDYAdwghIgCfAUiaQGxY8eyw1t7MzIeX9nrtRm9JKUe01hcB+B7AtUR0hoh2RVG0j4iyxjrFYnFTlmV7mHnHcvcholKzUzRmZuNNYAA7pJSfWmtvzbJsMgiCe6Mo+qHJp3XnxYNEZJj50oahl5r2E8aY/cy80wM5xcz9SqnfrLWXx3H8R7MaNY2NjV1WrVbfBfDoUq00CIIbm0JMTEycX6lUnCGv90C+Yea73InbKoAvrfUAET1MRF+5k7Sl9k5rfROAwwB6vPAepdSq7JRld0ejlFJHhRC7GsLPGWOWNVu7arnRxX8r8oHrNb1QJQiC/k7buppaWomaenp6ngRw3Av1pWk6rrXOrRvE0NDQmSAIHgFQ9cLub8Ab6wbhFEXRj0KIp/0YM++21j7QKURbnvBljNnHzEP1QkSnc7lcfz6f/7XdWm2vRE1hGD4F4Fjtmpl7kyQZd537ukE4f7j+A8A/HsiWUqk0sG4QTlLKnwC4FalpIU3Tk+3W6dgTvqy1j2VZtt31IVLKybYmA/gX+3iZaGpSG9AAAAAASUVORK5CYII="/></svg>');
}
function insertCommentEdit(ele) {
	ele.html('<svg style="fill:#999999;" height="12px" id="Layer_1" version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M21.635,6.366c-0.467-0.772-1.043-1.528-1.748-2.229c-0.713-0.708-1.482-1.288-2.269-1.754L19,1C19,1,21,1,22,2S23,5,23,5  L21.635,6.366z M10,18H6v-4l0.48-0.48c0.813,0.385,1.621,0.926,2.348,1.652c0.728,0.729,1.268,1.535,1.652,2.348L10,18z M20.48,7.52  l-8.846,8.845c-0.467-0.771-1.043-1.529-1.748-2.229c-0.712-0.709-1.482-1.288-2.269-1.754L16.48,3.52  c0.813,0.383,1.621,0.924,2.348,1.651C19.557,5.899,20.097,6.707,20.48,7.52z M4,4v16h16v-7l3-3.038V21c0,1.105-0.896,2-2,2H3  c-1.104,0-2-0.895-2-2V3c0-1.104,0.896-2,2-2h11.01l-3.001,3H4z"></path></svg>');
}
function insertCommentEmoji(ele) {
	ele.html('<svg xmlns="http://www.w3.org/2000/svg" class="ql-fill" viewBox="0 0 24 24" width="18" height="18"><path opacity=".85" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path></svg>');
}
function insertCommentDelete(ele) {
	ele.html('<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path></svg>');
}
function insertRecipeWinnerSvgs() {
	$('.itwin_svg').html('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.3099 4.62634C12.6729 3.7179 11.3271 3.7179 10.6901 4.62634L7.92737 8.56555L5.0968 6.36401C3.86694 5.40735 2.13428 6.59424 2.58203 8.08667L4.61462 14.8621C4.99524 16.131 6.16321 17 7.48804 17H16.512C17.8368 17 19.0048 16.131 19.3854 14.8621L21.418 8.08667C21.8657 6.59424 20.1331 5.40735 18.9032 6.36401L16.0726 8.56555L13.3099 4.62634ZM9.32361 10.058L12 6.24158L14.6764 10.058C15.2017 10.8069 16.2467 10.9639 16.9688 10.4023L19.1425 8.71155L17.4697 14.2874C17.3429 14.7103 16.9535 15 16.512 15H7.48804C7.04651 15 6.6571 14.7103 6.53027 14.2874L4.85754 8.71155L7.03125 10.4023C7.7533 10.9639 8.79834 10.8069 9.32361 10.058ZM6.5 20C5.94775 20 5.5 19.5522 5.5 19C5.5 18.4478 5.94775 18 6.5 18H17.5C18.0522 18 18.5 18.4478 18.5 19C18.5 19.5522 18.0522 20 17.5 20H6.5Z" fill="#ffffff"></path></svg>');	
	$('.itwin_svg_sm').html('<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.10628 3.31458C8.56883 2.54699 7.43199 2.547 6.89454 3.31458L5.36975 5.4923L4.18323 4.56798C3.14593 3.7599 1.68307 4.7607 2.06036 6.02032L3.01417 9.20478C3.36275 10.3686 4.43367 11.1657 5.64854 11.1657H10.3523C11.5672 11.1657 12.6381 10.3686 12.9867 9.20478L13.9405 6.02032C14.3178 4.7607 12.8549 3.7599 11.8176 4.56798L10.6311 5.4923L9.10628 3.31458ZM6.50796 6.48194L8.00041 4.35042L9.49287 6.48194C9.936 7.11483 10.8189 7.24742 11.4284 6.77262L12.3687 6.04009L11.5497 8.77439C11.3913 9.30338 10.9045 9.66573 10.3523 9.66573H5.64854C5.09633 9.66573 4.60955 9.30338 4.4511 8.77439L3.63212 6.04009L4.57245 6.77262C5.18193 7.24742 6.06482 7.11483 6.50796 6.48194ZM4.58889 13.5C4.17468 13.5 3.83889 13.1642 3.83889 12.75C3.83889 12.3358 4.17468 12 4.58889 12H11.4102C11.8244 12 12.1602 12.3358 12.1602 12.75C12.1602 13.1642 11.8244 13.5 11.4102 13.5H4.58889Z" fill="#ffffff"></path></svg>');
	$('.itrec_svg_sm').html('<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.61191 3.38916C7.12058 2.14718 8.87941 2.14718 9.38809 3.38916L9.67533 4.09049C9.95637 4.77668 10.594 5.25105 11.332 5.32302L12.1702 5.40477C13.4592 5.53047 13.9938 7.12078 13.0424 7.99955L12.2875 8.69688C11.7684 9.17638 11.5408 9.89423 11.6889 10.5852L11.8932 11.5383C12.1709 12.8336 10.7559 13.8266 9.63216 13.125L9.05919 12.7673C8.41104 12.3627 7.58896 12.3627 6.94081 12.7673L6.36784 13.125C5.24414 13.8266 3.82911 12.8336 4.10676 11.5383L4.31105 10.5852C4.45916 9.89423 4.23163 9.17638 3.71252 8.69688L2.95759 7.99955C2.00622 7.12078 2.54078 5.53047 3.82978 5.40477L4.668 5.32302C5.40601 5.25105 6.04363 4.77668 6.32467 4.09049L6.61191 3.38916Z" stroke="#ffffff" stroke-width="1.5"></path></svg>');
	$('.itrec_svg').html('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.7554 4.56995C13.7141 2.15198 10.2859 2.15198 9.24463 4.56995L8.30664 6.74792C8.16187 7.08411 7.84509 7.31433 7.48059 7.34814L5.11926 7.56714C2.49805 7.8103 1.4386 11.0707 3.41638 12.8081L5.198 14.3732C5.47302 14.6147 5.59399 14.9873 5.51355 15.3444L4.99219 17.6577C4.41333 20.2258 7.18677 22.241 9.45044 20.8969L11.4894 19.6862C11.8042 19.4993 12.1958 19.4993 12.5106 19.6862L14.5496 20.8969C16.8132 22.241 19.5867 20.2258 19.0078 17.6577L18.4865 15.3444C18.406 14.9873 18.527 14.6147 18.802 14.3732L20.5836 12.8081C22.5614 11.0707 21.502 7.8103 18.8806 7.56714L16.5194 7.34814C16.1549 7.31433 15.8381 7.08411 15.6934 6.74792L14.7554 4.56995ZM11.0815 5.36096C11.4286 4.55505 12.5714 4.55505 12.9185 5.36096L13.8564 7.53894C14.2908 8.54749 15.2413 9.23816 16.3347 9.3396L18.6959 9.55859C19.5697 9.63965 19.9229 10.7264 19.2637 11.3055L17.4821 12.8707C16.6571 13.5953 16.2939 14.7129 16.5354 15.7841L17.0568 18.0974C17.2498 18.9535 16.3252 19.6252 15.5707 19.1771L13.5317 17.9664C12.5875 17.4058 11.4125 17.4058 10.4683 17.9664L8.42932 19.1771C7.6748 19.6252 6.75024 18.9535 6.94324 18.0974L7.4646 15.7841C7.70605 14.7129 7.3429 13.5953 6.51794 12.8707L4.73645 11.3055C4.07715 10.7264 4.4303 9.63965 5.30408 9.55859L7.66528 9.3396C8.75867 9.23816 9.70923 8.54749 10.1436 7.53894L11.0815 5.36096Z" fill="#ffffff"></path></svg>');
	
	
	
	
}
