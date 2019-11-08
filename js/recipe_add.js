if ($('#recipeForm').length > 0) {
$('document').ready(function() {
	autosize($('.account_settings_f textarea'));
	$("#recipeTags").tagit({
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
	$("#recipeTags").data("ui-tagit").tagInput.addClass("input-field");
	
	var recipeQuillContent = new Quill('#recipeContentEditor', {
		  modules: {
		    toolbar: '#recipetoolbarcontent'
//		    	[
//		      ['bold', 'link', 'blockquote'],  
//		      [{ list: 'bullet' }],
//		      ['image']
//		    ]
		  },
		  placeholder: '',
		  theme: 'snow'
	});
	
	var recipeQuillIngredients = new Quill('#recipeIngridientsEditor', {
		  modules: {
		    toolbar: '#recipetoolbaringridients' 
//		    	[
//		      ['bold'],  
//		      [{ list: 'bullet' }],
//		    ]
		  },
		  placeholder: '',
		  theme: 'snow'
	});
	
	$('body').on('focus', '.ql-editor', function() {
		$(this).parents('.grid-col').eq(0).addClass('editorfocused');
	});
	$('body').on('blur', '.ql-editor', function() {
		$(this).parents('.grid-col').eq(0).removeClass('editorfocused');
	});

	$('body').on('submit', '#recipeForm', function() {
		let form = $(this);
		let url = $(this).attr('action');
		if (confirm('Sunteti siguri ca vreti sa salvati aceasta reteta?')) {
			$('.reciperesponse .responset').html('');
			$('.reciperesponse').addClass('-hidden');
			loadLoader($('#recipeForm'), 125, 125);
			$('#recipeForm .submit-settings').text('Se salveaza ...');
			$('#recipeForm #recipeContent').val(JSON.stringify($('#recipeContentEditor .ql-editor').html()));
			$('#recipeForm #recipeIngridients').val(JSON.stringify($('#recipeIngridientsEditor .ql-editor').html()));
			$.post(url, form.serialize(), function(response) {
				if (typeof(response.data) !== 'undefined') {
					if (typeof(response.data.recipe) !== 'undefined') {
						if (typeof(response.data.redirect) !== 'undefined') {
							window.location = response.data.redirect;	
						} else {
							window.location = '/';	
						}						
					} else {
						$('.reciperesponse .responset').html('Eroare de sistem. Ne cerem scuze. Va rugam reincercati');
						$('.reciperesponse').removeClass('-hidden');
					}
				} else if (typeof(response.errors_text) !== 'undefined') {
					$('.reciperesponse .responset').html('Retata nu s-a salvat. Aveti urmatoarele erori:<br/><br/>' +response.errors_text);
					$('.reciperesponse').removeClass('-hidden');
				}
				$('#recipeForm .submit-settings').text('Salveaza');
				removeLoader($('#recipeForm'));
			}).fail(function(e) {
				$('.reciperesponse .responset').html('Eroare de sistem. Ne cerem scuze. Va rugam reincercati');
				$('.reciperesponse').removeClass('-hidden');
				removeLoader($('#recipeForm'));
				$('#recipeForm .submit-settings').text('Salveaza');
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
	
	$('body').on('blur', '.inputwithp[type="number"]', function() {
		if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
			$(this).val($(this).attr('max'));
		}
	});
	
	$('input.recipe_category_checkbox').on('change', function() {
	    $('input.recipe_category_checkbox').not(this).prop('checked', false);
	    saveDraft();
	});
	
	$('body').on('click', '.recipeImgsUpload', function() {		
		document.forms['recipeImgs']['chooseFile'].click();
		$('.rimgwrapper .-error-text').html('');
		$('.rimgwrapper .-error-text').addClass('hidden');
	});
	$('body').on('click', '.recipeImgsUploadInline', function(e) {
		document.forms['recipeImgsInline']['chooseFileInline'].click();
		$('.rimgwrapper .-error-text').html('');
		$('.rimgwrapper .-error-text').addClass('hidden');
	});
//	$('body').on('click', '.recipeinlineimage', function() {
//		document.forms['recipeInlineImgs']['chooseFileInline'].click();
//		$('.recipecontenthold .-error-text').html('');
//		$('.recipecontenthold .-error-text').addClass('hidden');
//	});
	
//	$('body').on('click', '.gender-pick button.sb', function() {
//		let cattype = $(this).data('val');
//		$('.gender-pick button.sb').removeClass('active');
//		$(this).addClass('active');
//		$('#tipe_input').val(cattype);
//		$('input.recipe_category_checkbox').prop('checked', false);
//		if (parseInt(cattype) === 1) {
//			$('.foodcategories').show();
//			$('.drinkcategories').hide();
//		} else if(parseInt(cattype) === 2) {
//			$('.foodcategories').hide();
//			$('.drinkcategories').show();
//		}
//	});
	

//	var inlineFiles = [];
//	$('#chooseFileInline').fileupload({
//		datatype: "script",
//		dropZone: $('.recipeinlineimage'),
//		add: function(e, data) {
//			loadLoader($('.recipeinlineimage'), 45, 45);
//			data.submit();
//		},	
//        done: function (e, response) {
//        	if (typeof(response.result.data) !== 'undefined') {
//        		if (typeof(response.result.data.file) !== 'undefined') {
//        			var contentLineNr = $('#recipe_content')[0].selectionStart;
//        			var fileAlready = inlineFiles.indexOf(response.result.data.file.hash);
//        			if (inlineFiles.indexOf(response.result.data.file.hash) != -1) {
//	        			
//        			} else {
//        				let imageString = (parseInt(contentLineNr) > 0 ? '\n' : '') + '{{imagine::'+response.result.data.file.hash+'::'+response.result.data.file.name+'}}\n';
//		        		let textAreaTxt = $('#recipe_content').val();
//		        		$('#recipe_content').val(textAreaTxt.substring(0, contentLineNr) + imageString + textAreaTxt.substring(contentLineNr) );		        		
//		        		inlineFiles.push(response.result.data.file.hash);
//        			}
//        		}
//        	} else if (typeof(response.result.errors_text) !== 'undefined') {
//     			$('.recipecontenthold .-error-text').html(response.result.errors_text);
//     			$('.recipecontenthold .-error-text').removeClass('hidden');
//     		}        	
//        	removeLoader($('.recipeinlineimage'));
//        },
//        fail: function(e, data) {
//        	
//        }
//	});

	$('#chooseFile').fileupload({
		datatype: "script",
		dropZone: $('.recipeImgsUpload'),
		add: function(e, data) {
			loadLoader($('.recipeImgsUpload'), 45, 45);
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
        	removeLoader($('.recipeImgsUpload'));
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
        	removeLoader($('.recipeImgsUpload'));
        }
	});
	
	$('#chooseFileInline').fileupload({
		datatype: "script",
		dropZone: $('.recipeContentEditor'),
		add: function(e, data) {
			loadLoader($('.recipecontenthold'), 45, 45);
			data.submit();
		},	
        done: function (e, response) {
        	if (typeof(response.result.data) !== 'undefined') {
        		if (typeof(response.result.data.file) !== 'undefined') {
        			appendImageUploaded(response, recipeQuillContent);
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
	
	
	function appendImageUploaded(response, recipeQuillContent) {
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
		imagetemplate += '<input type="hidden" name="uploadedimages['+response.result.data.file.hash+'][hash]" value="'+response.result.data.file.hash+'" />';
		imagetemplate += '<input type="hidden" class="'+response.result.data.file.fhash+'" name="uploadedimages['+response.result.data.file.hash+'][fhash]" value="'+response.result.data.file.fhash+'" />';
		imagetemplate += '<input type="hidden" name="uploadedimages['+response.result.data.file.hash+'][url]" value="'+response.result.data.file.url+'" />';
		imagetemplate += '<input type="hidden" name="uploadedimages['+response.result.data.file.hash+'][name]" value="'+response.result.data.file.name+'" />';
		imagetemplate += '<a title="Sterge poza" data-hash="'+response.result.data.file.hash+'" data-rhash="'+response.result.data.file.recipe_hash+'" data-qhash="'+response.result.data.file.fhash+'" class="x-close">✖</a></div>';
			
		if (recipeQuillContent) {
			let range = recipeQuillContent.getSelection(true);
			recipeQuillContent.insertEmbed(range.index, 'image', response.result.data.file.url + '?fhash=' + response.result.data.file.fhash);
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
		if (qhash.length > 0) {
			let isInlineEle = $('img[fhash="'+qhash+'"]', $('#recipeContentEditor .ql-editor'));
			$('img', $('#recipeContentEditor .ql-editor')).each(function() {
				let srcImg = $(this).attr('src');
				if(srcImg.indexOf(qhash) === -1) {
				} else {
					disableDelete = true;
				}
			})		
			if (typeof(isInlineEle) !== 'undefined' && isInlineEle.length > 0) {
				disableDelete = true;
			}
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
			$(".uploadedsorter").sortable( "refresh" );
		}
	});
	
//	$('body').on('click', '.rimgitem .x-close', function() {
//		let fhash = $(this).data('hash');
//		let rhash = $(this).data('rhash');
//		let iparent = $(this).parents('.rimgitem').eq(0);
//		let hid = $(this).data('hid');
//		iparent.hide();
//		$.post('/api/recipe-image-remove', {'hid': hid, 'fhash': fhash, 'rhash': rhash, '_csrfToken': $('input[name=_csrfToken]').val()}, function(r) {
//			if (typeof(r.errors) !== 'undefined') {
//				iparent.show();
//				$('.rimgwrapper .-error-text').html(r.errors);
//				$('.rimgwrapper .-error-text').removeClass('hidden');
//			} else {
//				iparent.remove();
//				$('.rimgwrapper .-error-text').addClass('hidden');
//			}
//		});
//		$(".uploadedsorter").sortable( "refresh" );
//	});
	
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
    
    recipeQuillContent.clipboard.addMatcher(Node.TEXT_NODE, function(node, delta) {
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
	
    recipeQuillContent.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
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
	
	var recipeContentTimeout = null;
    var recipeIngredientsTimeout = null;
	recipeQuillContent.on('text-change', function(delta, oldDelta, source) {
	  var regex = /https?:\/\/[^\s]+$/;
	  if(delta.ops.length === 2 && delta.ops[0].retain && isWhitespace(delta.ops[1].insert)) {
	    var endRetain = delta.ops[0].retain;
	    var text = recipeQuillContent.getText().substr(0, endRetain);
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

	      recipeQuillContent.updateContents({
	        ops: ops
	      });
	    }
	  }
	  clearTimeout(recipeContentTimeout);
	  recipeContentTimeout = setTimeout(function () {
		  saveDraft();
	  }, 750);
	});
	
	recipeQuillIngredients.on('text-change', function(delta, oldDelta, source) {
	  clearTimeout(recipeIngredientsTimeout);
	  recipeIngredientsTimeout = setTimeout(function () {
		  saveDraft();
	  }, 750);
	});
});
function presaveDraft() {
	$('body').on('blur', '.ql-editor, #recipeForm input, #recipeForm textarea', function() {
		saveDraft();
	});
}
function saveDraft() {
	console.log(recipePreDraft);
	if (typeof(recipePreDraft) !== 'undefined' && recipePreDraft === true) {
		let form = $('#recipeForm');
		$('#recipeForm #recipeContent').val(JSON.stringify($('#recipeContentEditor .ql-editor').html()));
		$('#recipeForm #recipeIngridients').val(JSON.stringify($('#recipeIngridientsEditor .ql-editor').html()));
		let formData = form.serialize();
		$.post('/api/draft-recipe', form.serialize(), function(response) {
			
		});
	}
}
}