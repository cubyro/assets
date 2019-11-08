if ($('#menuForm').length > 0) {
$('document').ready(function() {
	autosize($('.account_settings_f textarea'));
	$('body').on('submit', '#menuForm', function() {
		if (typeof(userIsDisabled) !== 'undefined') {
			if (userIsDisabled === true) {
				$('.menuresponse .responset').html('Cont dezactivat. Operatiunea nu este permisa.');
				$('.menuresponse').removeClass('-hidden');
				return false;
			}
		}
		
		let form = $(this);
		let url = $(this).attr('action');
		if (confirm('Sunteti siguri ca vreti sa salvati acest meniu?')) {
			$('.menuresponse .responset').html('');
			$('.menuresponse').addClass('-hidden');
			loadLoader($('#menuForm'), 125, 125);
			$('#menuForm .submit-settings').text('Se salveaza ...');
//			$('#menuForm #articleContent').val(JSON.stringify($('#articleContentEditor .ql-editor').html()));
			$.post(url, form.serialize(), function(response) {
				if (typeof(response.data) !== 'undefined') {
					if (typeof(response.data.menu) !== 'undefined') {
						$('#menuForm').trigger("reset");
						if (typeof(response.data.redirect) !== 'undefined') {
							window.location = response.data.redirect;	
						} else {
							window.location = '/';	
						}						
					} else {
						$('.menuresponse .responset').html('Eroare de sistem. Ne cerem scuze. Va rugam reincercati mai tarziu.');
						$('.menuresponse').removeClass('-hidden');
					}
				} else if (typeof(response.errors_text) !== 'undefined') {
					$('.menuresponse .responset').html('Meniul nu s-a salvat. Aveti urmatoarele erori:<br/><br/>' +response.errors_text);
					$('.menuresponse').removeClass('-hidden');
				} else {
					$('.menuresponse .responset').html('Eroare de sistem. Ne cerem scuze. Va rugam reincercati mai tarziu.');
					$('.menuresponse').removeClass('-hidden');
				}
				$('#menuForm .submit-settings').text('Salveaza meniul');
				removeLoader($('#menuForm'));
			}).fail(function(e) {
				$('.menuresponse .responset').html('Eroare de sistem. Ne cerem scuze. Va rugam reincercati');
				$('.menuresponse').removeClass('-hidden');
				removeLoader($('#menuForm'));
				$('#menuForm .submit-settings').text('Salveaza meniul');
			});
		}
		return false;		
	});
	
//	$("#menuTags").tagit({
//		onTagClicked: function(event, ui) {
//	        ui.instance.removeTag(ui.tag);
//	    },
//	    allowSpaces: true,
//	    singleField: true,
//	    autocomplete: {
//	    	minLength: 3,
//	    	delay: 2,
//	    	source: function( request, response ) {
//	    		$.post('/api/search_tags', {'q': request.term}, function (data) {
//	    			response( data );
//	    		});
//	    	}
//	    }
//	});
//	$("#menuTags").data("ui-tagit").tagInput.addClass("input-field");
	
	$('body').on('click', '.menus-rmv-i', function() {
		let parentEle = $(this).parents('.rmenus-item');
		if (typeof(parentEle) !== 'undefined' && parentEle.length > 0) {
			let currentItemID = $('.menuitm_id', parentEle).val();
			utils.removeFromArray(formItems, currentItemID);
			parentEle.addClass('animated zoomOutUp');
			setTimeout(function() {
				parentEle.slideUp();
			}, 300);
			setTimeout(function() {
				parentEle.remove();
			}, 850);
		}
	});
	
//	if (parseInt(userID) > 0) {
//		$('body').on('input', '.menu-recipe-inp', function() {
//			let ele = $(this);
//			let parentEle = ele.parents('.rmenus-item-content').eq(0);		
//			let prevEle = $('.recipe_prev', parentEle);
//			let thisValue = ele.val();
//			if (thisValue.length > 10) {
//				if (utils.isUrl(thisValue) === true) {
//					if (utils.isRecipeUrl(thisValue) === true) {
//						rID = utils.urlToRecipeID(thisValue);
//						if (parseInt(rID) > 0) {
//							insertMenuRecipe(rID, parentEle, prevEle);
//						}	
//					}
//				}
//			}
//		});
//	}
	
	var formItems = [];
	var existingItems = [];
	$('.menuitm_id').each(function() {
		if (parseInt($(this).val()) > 0) {
			existingItems.push($(this).val());
		}
	})
	if (existingItems.length > 0) {
		formItems = existingItems;
	}
	
	
//	function insertMenuRecipe(rID, parentEle, prevEle) {
//		let currentItemID = $('.menuitm_id', parentEle).val();
//		if (currentItemID == rID) {
//			
//		} else {
//			if (utils.in_array(rID, formItems) === false) {
//				prevEle.html('');
//				loadLoader(prevEle);
//				prevEle.addClass('prevloading');
//				$.post('/api/menu-item', {'id' : rID}, function(r) {
//					prevEle.removeClass('prevloading');
//					removeLoader(prevEle);
//					
//					if (typeof(r.data) !== 'undefined') {
//						prevEle.html(r.data);
//						$('.menuitm_id', parentEle).val(rID);
//						// create new item
////						formItems = [];
////						$('#menuForm .menuitm_id').each(function() {
////							formItems.push($(this).val())
////						});
//						formItems.push(rID);
//						let lastNewItemID = $('#menuForm .menuitm_id').last().val();
//						if (parseInt(lastNewItemID) > 0) {
//							let cloned = $('.recipeTemplate .rmenus-item').clone();
//	//						$('.menui-counter', cloned).text(formItems.length + 1);
//							$('.rmenus-item-wrap').append(cloned);
//							
//						}						
//						updateFormItemsIndex();
//						console.log(formItems);
//					} else {
//						prevEle.html('<div class="-error-text pt-0-imp pb-0-imp">Reteta nu a putut fi preluata. Verificati adresa introdusa.</div>');
//					}
//				}).fail(function(r) {
//					prevEle.removeClass('prevloading');
//					removeLoader(prevEle);
//					prevEle.html('<div class="-error-text pt-0-imp pb-0-imp">Reteta nu a putut fi preluata. Verificati adresa introdusa.</div>');
//				});;
//			} else {
//				prevEle.html('<div class="-error-text pt-0-imp pb-0-imp">Aceasta reteta este deja adaugata.</div>');
//			}
//		}
//	}
	
//	$('body').on('input', '.titlefield', function() {
//		updateFormItemsIndex();
//	});
	
//	function updateFormItemsIndex() {
//		let itemElements = $('.rmenus-item-wrap .rmenus-item');
//		if (itemElements.length == 0) {
//			let cloned = $('.recipeTemplate .rmenus-item').clone();
//			$('.rmenus-item-wrap').append(cloned);
//		} else {
//			$('.menurelation').html('');
//			itemElements.each(function(i, v) {
//				let ele = $(this);
//				
//				autosize(ele.find('textarea'));
//				let currentIndex = i + 1;
//				$('.menui-counter', ele).text(currentIndex);
//				ele.attr('id', 'menuitem'+currentIndex);
//				$('.rquick-search-action', ele).attr('data-xhash', 'menuitem'+currentIndex);
//				
//				let currentTitle = $('.titlefield', ele).val();
//				let currentID = $('.menuitm_id', ele).val();
//				if (typeof(currentTitle) !== 'undefined' && typeof(currentID) !== 'undefined') {
//					if (currentTitle.length > 0 && parseInt(currentID) > 0) {
//						$('.menurelation').append('<li class="mb-10"><a title="' + currentTitle + '" class="scrollToComment hbold" href="#menuitem'+currentIndex+'">' + currentTitle +'</a></li>');
//					}
//				}
////				$('.menui-counter', ele).text(currentIndex);
//			});
//		}
//	}
	
	$('body').on('click', '.qsw_results .cook--small-card', function() {
		let parentEle = $(this);
		let rID = parentEle.attr('cook-id');
		if (typeof(rID) !== 'undefined') {
			if (parseInt(rID) > 0) {
				let superParent = parentEle.parents('.qsw_results').eq(0);
				if (typeof(superParent) !== 'undefined') {
					let hash = superParent.data('xhash');
					
					if (hash.length > 0) {
						var prevEle = $('#' + hash);
						var actionType = 'update';
					} else {
						var prevEle = $('.rmenus-item-wrap');
						var actionType = 'insert';
					}
					
//					let itemParentEle = $('.rmenus-item-content', $('#' + hash)).eq(0);
//					let prevEle = $('.recipe_prev', itemParentEle);
//					// clear input
//					$('.menu-recipe-inp', $('#' + hash)).val('');
//					
//					let currentItemID = $('.menuitm_id', itemParentEle).val();
					
					$.fancybox.close();
//					if (parseInt(currentItemID) > 0 && currentItemID == rID) {
//							
//					} else {
						if (utils.in_array(rID, formItems) === false) {
							loadLoader(prevEle);
							prevEle.addClass('prevloading');
							$.post('/api/menu-item', {'id' : rID}, function(r) {
								prevEle.removeClass('prevloading');
								removeLoader(prevEle);
								
								if (typeof(r.data) !== 'undefined') {
									if (actionType == 'insert') {
										var zxhash = $(r.data).find('.rquick-search-action').data('xhash');
										prevEle.append('<div id="'+zxhash+'">' + r.data + '</div>');
									} else {
										var zxhash = $(r.data).find('.rquick-search-action').data('xhash');
										prevEle.html(r.data);
										prevEle.attr('id', zxhash);
									}
//									prevEle.html(r.data);
//									$('.menuitm_id', parentEle).val(rID);
									// create new item
									formItems = [];
									$('#menuForm .menuitm_id').each(function() {
										formItems.push($(this).val())
									});
								} else {
//									prevEle.html('<div class="-error-text pt-0-imp pb-0-imp">Reteta nu a putut fi preluata. Verificati adresa introdusa.</div>');
								}
							}).fail(function(r) {
								prevEle.removeClass('prevloading');
								removeLoader(prevEle);
//								prevEle.html('<div class="-error-text pt-0-imp pb-0-imp">Reteta nu a putut fi preluata. Verificati adresa introdusa.</div>');
							});
						} else {
//							$('.addrecipe_err').html('<div class="-error-text pt-0-imp pb-0-imp -centered-text">Aceasta reteta este deja adaugata.</div>');
						}
//					}	
				}
			}
		}		
		return false;
	});

	$('body').on('click', '.rquick-search-action', function() {
		$('.menuresponse .responset').html('');
		$('.menuresponse').addClass('-hidden');
		if (parseInt(userID) > 0) {
			let url = $(this).data('src');
			let hash = $(this).data('xhash');
			$.fancybox.open({
				src: url,
				touch: false,
				autoFocus: false,
				type: 'ajax',
				ajax: {
					settings: {
						data: {
							'xhash': hash
						}
					}
				},
				hash: hash,
			});
		}
	});
	
	/**
	 * Quick search
	 */
	$('body').on('keyup', '#quickSearchInput', function(e) {
		clearTimeout($.data(this, 'stimer'));
		if (e.keyCode == 13) {
			quickSearchAction(true);
		} else {
			$(this).data('stimer', setTimeout(quickSearchAction, 350));
		}
	});
	$('body').on('change', '#selfrecipe', function(e) {
		clearTimeout($.data(document.getElementById("quickSearchInput"), 'stimer'));
		quickSearchAction(true, true);
	});

	$('body').on('click touchend keyup keydown', '.pagination-wr a', function(e) {
		let url = $(this).attr('href');
		let query = $("#quickSearchInput").val();
		let isSelf = $('#selfrecipe:checkbox:checked').length > 0;
		quickSearchAction(true, false, utils.getPageRequestData(url).page);
		return false;
	});
	
	function quickSearchAction(force, selfAction, page) {
		let query = $("#quickSearchInput").val();
		let isSelf = $('#selfrecipe:checkbox:checked').length > 0;
		if (!force && query.length < 3 && !selfAction && query.length !== 0) {
			return;
		}
		url = '/api/quick_search/';
		var searchContainer = $('.spop_wrap .qsw_results');
		loadLoader($('.spop_wrap .qsw_results_content '));
		$.get(url, {'q': query, 'self': isSelf, 'page': (page ? page : 1)},  function(r) {
			if (typeof(r.data) !== 'undefined') {
				$('.spop_wrap .qsw_results').html(r.data);
			} else if (typeof(r.message) !== 'undefined') {
				searchContainer.html(r.message);
			} else {
				searchContainer.html('<div class="qsw_results_content pb-20"><h4>Nu a fost gasita nici o reteta.</h4></div>');
			}
			removeLoader($('.spop_wrap .qsw_results_content '));
		});
	}
});
}