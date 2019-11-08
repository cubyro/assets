if ($('#articleForm').length > 0) {
$('document').ready(function() {
	
	$("#articleTags").tagit({
		onTagClicked: function(event, ui) {
	        ui.instance.removeTag(ui.tag);
	    },
	    allowSpaces: true,
	    singleField: true,
	    autocomplete: {
	    	minLength: 3,
	    	delay: 2,
	    	source: function( request, response ) {
	    		$.post('/api/search_tags', {'q': request.term}, function (data) {
	    			response( data );
	    		});
	    	}
	    }
	});
	$("#articleTags").data("ui-tagit").tagInput.addClass("input-field");
	
	$('body').on('focus', '.ql-editor', function() {
		$(this).parents('.grid-col').eq(0).addClass('editorfocused');
	});
	$('body').on('blur', '.ql-editor', function() {
		$(this).parents('.grid-col').eq(0).removeClass('editorfocused');
	});

	$('body').on('submit', '#articleForm', function() {
		let form = $(this);
		let url = $(this).attr('action');
		if (confirm('Sunteti siguri ca vreti sa salvati acest articol?')) {
			$('.articleresponse .responset').html('');
			$('.articleresponse').addClass('-hidden');
			loadLoader($('#articleForm'), 125, 125);
			$('#articleForm .submit-settings').text('Se salveaza ...');
			$('#articleForm #articleContent').val(JSON.stringify($('#articleContentEditor .ql-editor').html()));
			$.post(url, form.serialize(), function(response) {
				if (typeof(response.data) !== 'undefined') {
					if (typeof(response.data.article) !== 'undefined') {
						if (typeof(response.data.redirect) !== 'undefined') {
							window.location = response.data.redirect;	
						} else {
							window.location = '/';	
						}						
					} else {
						$('.articleresponse .responset').html('Eroare de sistem. Ne cerem scuze. Va rugam reincercati mai tarziu.');
						$('.articleresponse').removeClass('-hidden');
					}
				} else if (typeof(response.errors_text) !== 'undefined') {
					$('.articleresponse .responset').html('Articolul nu s-a salvat. Aveti urmatoarele erori:<br/><br/>' +response.errors_text);
					$('.articleresponse').removeClass('-hidden');
				}
				$('#articleForm .submit-settings').text('Salveaza');
				removeLoader($('#articleForm'));
			}).fail(function(e) {
				$('.articleresponse .responset').html('Eroare de sistem. Ne cerem scuze. Va rugam reincercati');
				$('.articleresponse').removeClass('-hidden');
				removeLoader($('#articleForm'));
				$('#articleForm .submit-settings').text('Salveaza');
			});
		}
		return false;		
	});
	
	$('body').on('focus', '.settings .inputwithp', function() {
		this.placeholder=''
	});
	$('body').on('blur', '.settings .inputwithp', function() {
		let value = this.value;
		if (value.length === 0) {
			this.placeholder = $(this).attr('rplaceholder');
		}
	});
	
	
	$('body').on('click', '.articleImgsUpload', function(e) {
		document.forms['articleImgs']['chooseFile'].click();
		$('.rimgwrapper .-error-text').html('');
		$('.rimgwrapper .-error-text').addClass('hidden');
	});
	$('body').on('click', '.articleImgsUploadInline', function(e) {
		document.forms['articleImgsInline']['chooseFileInline'].click();
		$('.rimgwrapper .-error-text').html('');
		$('.rimgwrapper .-error-text').addClass('hidden');
	});
	
	
	
	
	
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
	
	$('body').on('click', '.rquick-search-action', function() {
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
				hash: 'entqsearch',
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
	
	
	$('body').on('click', '.qsw_results .cook--small-card', function() {
		let parentEle = $(this);
		let rID = parentEle.attr('cook-id');
		let thisValue = parentEle.attr('cook-url');
		
		if (typeof(rID) !== 'undefined') {
			if (parseInt(rID) > 0) {
				if (utils.in_array(rID, formItems) === false) {
					console.log(formItems.length);
					if (formItems.length <= 20) {
						let inputHtml = '<div class="input-group mt-15 input-group-sortable">\
							<input class="inputwithp input-field -sq disabled" disabled type="text" name="nn[]" value="' + thisValue + '"> \
							<input class="art_recipe" type="hidden" name="recipes[]" value="' + rID + '"> \
							<div class=\"input-group-append\"> \
								<a class="pl-10 pr-10 fs-12 -undr -color--tundora article-rec-rmv-i" href="javascript:;">Sterge</a>\
							</div>\
						</div>';
						$('.menu-recipe-inp').val('');
						$('.recipeholder-list').append(inputHtml);
						formItems.push(rID);
						$.fancybox.close();
						$(".recipeholder-list").sortable( "refresh" );
					} else {
						$.fancybox.close();
						$('.articleresponse_recipes .responset').html('Maxim 20 de retete pot fi adaugate la un articol.');
						$('.articleresponse_recipes').removeClass('-hidden');
					}
				} else {
					$('.articleresponse_recipes .responset').html('Reteta este deja adaugata.');
					$('.articleresponse_recipes').removeClass('-hidden');
				}
			}
		}		
		return false;
	});
	
	$('body').on('click', '.article-rec-rmv-i', function() {
		let parentEle = $(this).parents('.input-group').eq(0);
		currentItemID = $('.art_recipe', parentEle).val();
		console.log(currentItemID);
		parentEle.remove();
		utils.removeFromArray(formItems, currentItemID);
		$('.menu-recipe-inp').val('');
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
	
	if (parseInt(userID) > 0) {
		$('body').on('input', '.menu-recipe-inp', function() {
			let ele = $(this);
			let thisValue = ele.val();
			if (thisValue.length > 10) {
				$('.articleresponse_recipes .responset').html('');
				$('.articleresponse_recipes').addClass('-hidden');
				if (utils.isUrl(thisValue) === true) {					
					if (utils.isRecipeUrl(thisValue) === true) {
						rID = utils.urlToRecipeID(thisValue);
						if (parseInt(rID) > 0) {
							if (utils.in_array(rID, formItems) === false) {
								if (formItems.length <= 20) {
									let inputHtml = '<div class="input-group input-group-sortable mt-15">\
										<input class="inputwithp input-field -sq disabled" disabled type="text" name="nn[]" value="' + thisValue + '"> \
										<input class="art_recipe" type="hidden" name="recipes[]" value="' + rID + '"> \
										<div class=\"input-group-append\"> \
											<a class="pl-10 pr-10 fs-12 -undr -color--tundora article-rec-rmv-i" href="javascript:;">Sterge</a>\
										</div>\
									</div>';
									ele.val('');
									$('.recipeholder-list').append(inputHtml);
									formItems.push(rID);
									$(".recipeholder-list").sortable( "refresh" );
								} else {
									$('.articleresponse_recipes .responset').html('Maxim 20 de retete pot fi adaugate la un articol.');
									$('.articleresponse_recipes').removeClass('-hidden');
								}
							} else {
								$('.articleresponse_recipes .responset').html('Reteta este deja adaugata.');
								$('.articleresponse_recipes').removeClass('-hidden');
							}
						} else {
							$('.articleresponse_recipes .responset').html('Adresa nu este valida.');
							$('.articleresponse_recipes').removeClass('-hidden');
						}	
					} else {
						$('.articleresponse_recipes .responset').html('Adresa nu este valida.');
						$('.articleresponse_recipes').removeClass('-hidden');
					}	
				}
			}
		});
	}

	$('#chooseFile').fileupload({
		datatype: "script",
		dropZone: $('.articleImgsUpload'),
		add: function(e, data) {
			loadLoader($('.articleImgsUpload'), 45, 45);
			data.submit();
		},	
        done: function (e, response) {
        	if (typeof(response.result.data) !== 'undefined') {
        		if (typeof(response.result.data.file) !== 'undefined') {
        			appendImageUploaded(response);
        		}
        	} else if (typeof(response.result.errors_text) !== 'undefined') {
    			$('.rimgwrapper .-error-text').html(response.result.errors_text);
    			$('.rimgwrapper .-error-text').removeClass('hidden');
    		}
        	removeLoader($('.articleImgsUpload'));
        },
        fail: function(e, r) {
            if (r._response.jqXHR.status) {
				if (r._response.jqXHR.status == 413) {
					$('.rimgwrapper .-error-text').html('Imaginea depaseste limita de marime.');
				} else {
					$('.rimgwrapper .-error-text').html('Eroare de sistem. Incercati alta imagine');
				}
            } else {
            	$('.rimgwrapper .-error-text').html('Eroare de sistem. Incercati alta imagine');
            }
			$('.rimgwrapper .-error-text').removeClass('hidden');
        	removeLoader($('.articleImgsUpload'));
        }
	});
	
	$('#chooseFileInline').fileupload({
		datatype: "script",
		dropZone: $('.articleImgsUpload'),
		add: function(e, data) {
			loadLoader($('.recipecontenthold'), 45, 45);
			data.submit();
		},	
        done: function (e, response) {
        	if (typeof(response.result.data) !== 'undefined') {
        		if (typeof(response.result.data.file) !== 'undefined') {
        			appendImageUploaded(response, articleQuillContent);
        		}
        	} else if (typeof(response.result.errors_text) !== 'undefined') {
    			$('.rimgwrapper .-error-text').html(response.result.errors_text);
    			$('.rimgwrapper .-error-text').removeClass('hidden');
    		}
        	removeLoader($('.recipecontenthold'));
        },
        fail: function(e, r) {
            if (r._response.jqXHR.status) {
				if (r._response.jqXHR.status == 413) {
					$('.rimgwrapper .-error-text').html('Imaginea depaseste limita de marime.');
				} else {
					$('.rimgwrapper .-error-text').html('Eroare de sistem. Incercati alta imagine');
				}
            } else {
            	$('.rimgwrapper .-error-text').html('Eroare de sistem. Incercati alta imagine');
            }
			$('.rimgwrapper .-error-text').removeClass('hidden');
        	removeLoader($('.recipecontenthold'));
        }
	});
	
	function appendImageUploaded(response, articleQuillContent) {
		let existingImg = $('.'+response.result.data.file.fhash);		
		let insertImg = true;
		if (typeof(existingImg) !== 'undefined') {
			if (existingImg.length > 0) {				
				let parentHolder = existingImg.parents('.rimgitem').eq(0);
				let deletedEle = $('.deletedimgi', parentHolder);
				if (typeof(deletedEle) !== 'undefined') {
					if (deletedEle.length > 0) {
						deletedEle.remove();
						parentHolder.show();
					}
				}
				insertImg = false;
			}
		}
		
		let imagetemplate = '<div class="-col-one-half rimgitem" style="width: 50%; height: 190px; background-image:url('+response.result.data.file.url+');">';
		imagetemplate += '<div class="ex-icon-wrapper mobile-visible">';
		imagetemplate += '<input type="hidden" name="uploadedimages['+response.result.data.file.hash+'][hash]" value="'+response.result.data.file.hash+'"/>';
		imagetemplate += '<input type="hidden" class="'+response.result.data.file.fhash+'" name="uploadedimages['+response.result.data.file.hash+'][fhash]" value="'+response.result.data.file.fhash+'"/>';
		imagetemplate += '<input type="hidden" name="uploadedimages['+response.result.data.file.hash+'][url]" value="'+response.result.data.file.url+'"/>';
		imagetemplate += '<input type="hidden" name="uploadedimages['+response.result.data.file.hash+'][name]" value="'+response.result.data.file.name+'"/>';
		imagetemplate += '<a title="Sterge poza" data-hash="'+response.result.data.file.hash+'" data-rhash="'+response.result.data.file.recipe_hash+'" data-qhash="'+response.result.data.file.fhash+'" class="x-close">✖</a></div>';
			
		if (articleQuillContent) {
			let range = articleQuillContent.getSelection(true);
			articleQuillContent.insertEmbed(range.index, 'image', response.result.data.file.url + '?fhash=' + response.result.data.file.fhash);
		}
		if (insertImg === true) {
			$('.uploadedsorter').append(imagetemplate);
			$(".uploadedsorter").sortable( "refresh" );
		}
		saveDraft();
	}
	
	$('body').on('click', '.rimgitem .x-close', function() {
		let fhash = $(this).data('hash');
		let rhash = $(this).data('rhash');
		let qhash = $(this).data('qhash');
		let iparent = $(this).parents('.rimgitem').eq(0);
		let hid = $(this).data('hid');		
		$('.rimgwrapper .-error-text').html('');
		let disableDelete = false;
		let isInlineEle = $('img[fhash="'+qhash+'"]', $('.ql-editor'));
		$('img', $('.ql-editor')).each(function() {
			let srcImg = $(this).attr('src');
			if(srcImg.indexOf(qhash) === -1) {
			} else {
				disableDelete = true;
			}
		})
		
		if (typeof(isInlineEle) !== 'undefined' && isInlineEle.length > 0) {
			disableDelete = true;
		}
		
		if (disableDelete === true) {
			$('.rimgwrapper .-error-text').html('Imaginea nu se poate sterge, e prezenta in continut.');
		} else {
			iparent.hide();
			let deleteFlag;
			if (typeof(hid) !== 'undefined' && parseInt(hid) > 0) {
				deleteFlag = '<input type="hidden" class="deletedimgi" name="uploadedimages['+hid+'][deleted]" value="1" />';
				iparent.append(deleteFlag);
			} else {
				iparent.remove();
				saveDraft();
			}

//			$.post('/api/article-image-remove', {'hid': hid, 'fhash': fhash, 'rhash': rhash, '_csrfToken': $('input[name=_csrfToken]').val()}, function(r) {
//				if (typeof(r.errors) !== 'undefined') {
//					iparent.show();
//					$('.rimgwrapper .-error-text').html(r.errors);
//					$('.rimgwrapper .-error-text').removeClass('hidden');
//				} else {
//					iparent.remove();
//					$('.rimgwrapper .-error-text').addClass('hidden');
//				}
//			});
			$(".uploadedsorter").sortable( "refresh" );
		}
	});
	
	
    setTimeout(function() {
        $(".uploadedsorter").sortable({
            placeholder: 'rimgitem dz-processing dz-image-preview dz-success ui-sortable-handle dz-complete ui-sortable-placeholder',
            helper: function(event, ui) {
                var $clone =  $(ui).clone();
                $clone .css('position','absolute');
                return $clone.get(0);
            },
        });
    	$(".uploadedsorter").sortable( "refresh" );
    }, 100);
    
    setTimeout(function() {
        $(".recipeholder-list").sortable({
            placeholder: 'input-group-sortable  dz-processing dz-image-preview dz-success ui-sortable-handle dz-complete ui-sortable-placeholder',
            helper: function(event, ui) {
                var $clone =  $(ui).clone();
                $clone .css('position','absolute');
                return $clone.get(0);
            },
        });
    	$(".recipeholder-list").sortable( "refresh" );
    }, 100);
	
	var articleQuillContent = new Quill('#articleContentEditor', {
		  modules: {
		    toolbar: '#articletoolbarcontent'
		  },
		  placeholder: '',
		  theme: 'snow'
	});
	
//	articleQuillContent.on('text-change', function(delta, oldDelta, source) {
//		let textLength = articleQuillContent.getLength();
//		let parentEle = $('#articleContentEditor').parents('.input-counter');
//		
//		let maxChars = parseInt(parentEle.data('max-chars'));
//		let spanEle = $('span', parentEle);
//		if (typeof(textLength) !== 'undefined' && typeof(maxChars) !== 'undefined') {
//			let currentLength = parseInt(textLength);
//			let putLength = maxChars -  currentLength
//			if (putLength > 0) {
//				spanEle.removeClass('-limit-reached');
//			} else {
//				spanEle.addClass('-limit-reached');
//			}
//			spanEle.text(putLength);
//		}
//	});
	
	articleQuillContent.clipboard.addMatcher(Node.TEXT_NODE, function(node, delta) {
		  var regex = /https?:\/\/[^\s]+/g;
		  if(typeof(node.data) !== 'string') return;
		  var matches = node.data.match(regex);

		  if(matches && matches.length > 0) {
		    var ops = [];
		    var str = node.data;
		    matches.forEach(function(match) {
		      var split = str.split(match);
		      var beforeLink = split.shift();
		      ops.push({ insert: beforeLink });
		      ops.push({ insert: match, attributes: { link: match } });
		      str = split.join(match);
		    });
		    ops.push({ insert: str });
		    delta.ops = ops;
		  }

		  return delta;
		});
	
	articleQuillContent.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
		  let ops = []
		  delta.ops.forEach(op => {
		    if (op.insert && typeof op.insert === 'string') {
		      ops.push({
		        insert: op.insert
		      })
		    }
		  })
		  delta.ops = ops
		  return delta
		})
	var articleContentTimeout = null;
	articleQuillContent.on('text-change', function(delta, oldDelta, source) {
	  var regex = /https?:\/\/[^\s]+$/;
	  if(delta.ops.length === 2 && delta.ops[0].retain && isWhitespace(delta.ops[1].insert)) {
	    var endRetain = delta.ops[0].retain;
	    var text = articleQuillContent.getText().substr(0, endRetain);
	    var match = text.match(regex);

	    if(match !== null) {
	      var url = match[0];

	      var ops = [];
	      if(endRetain > url.length) {
	        ops.push({ retain: endRetain - url.length });
	      }

	      ops = ops.concat([
	        { delete: url.length },
	        { insert: url, attributes: { link: url } }
	      ]);

	      articleQuillContent.updateContents({
	        ops: ops
	      });
	    }
	  }
	  clearTimeout(articleContentTimeout);
	  articleContentTimeout = setTimeout(function () {
		  saveDraft();
	  }, 750);
	});
});
function presaveDraft() {
	$('body').on('blur', '.ql-editor, #articleForm input', function() {
		saveDraft();
	});
}
function saveDraft() {
	if (typeof(articlePreDraft) !== 'undefined' && articlePreDraft === true) {
		let form = $('#articleForm');
		$('#articleForm #articleContent').val(JSON.stringify($('#articleContentEditor .ql-editor').html()));
		let formData = form.serialize();
		$.post('/api/draft-article', form.serialize(), function(response) {
			
		});
	}
}
}