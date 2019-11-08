if ($('.posts-timeline').length > 0) {
function showPostErr(ele, message) {
	ele.prepend('<div class="post_err_wr"><div class="pt-10 pl-15 pr-15 pb-10 -error-text">'+message+'</div><div class="hrline"></div></div>');
}

$('document').ready(function() {
	var postDrops = [];
	
	insertPostDropsIco($('.cook__inner .dotaction .dotact_plch'));
	initPostsDrop($('.cook__inner .dotaction'));
	
	function initPostsDrop(ele) {
		ele.each(function(i, ele) {
			var pid = $(ele).data('id');
			var htmlDrop = $('.postact_drop', $(ele)).html();
			
			var _PostDrop = Drop.createContext({
				classPrefix: 'recipe_profile'
			});
			
			postDrops[pid] = new _PostDrop({
			        target: ele,
			        position: 'bottom right',
			        constrainToWindow: false,
			        constrainToScrollParent: false,
			        openOn: 'click',
			        classes: 'heroprofiledrop',
			        hoverCloseDelay: 200,
			        hoverOpenDelay: 350,
			        content: htmlDrop,
			        tetherOptions: {offset: '-5px 0'}
			      });
			postDrops[pid].on('close', function(ele) {
//				console.log(ele);
				this.remove();
			});
//			var postDrop = new Drop({
//				target: $(ele)[0],
//				position: 'bottom right',
//				constrainToWindow: false,
//				constrainToScrollParent: true,
//				openOn: 'click',
//				classes: 'heroprofiledrop',
//				content: htmlDrop,
//				hoverCloseDelay: 380,
//		        hoverOpenDelay: 62,
//				tetherOptions: {offset: '-5px 0'}
//			});
		});
	}
	
	if ($('.-more-ent').length > 0) {
	var activeInfiniteScrollEnt = true;
	$(window).on('scroll', function() {
		if ($(window).scrollTop() > $(document).height() - $(window).height() - 1500 && activeInfiniteScrollEnt === true) {
			$('.loadmoreposts').removeClass('-hidden');
			loadLoader($('.loadmoreposts .spinner'));
			activeInfiniteScrollEnt = false;
			let ele = $('.-more-ent');
			let ctype = ele.data('type');
			let eid = ele.data('user-id');
			let page = ele.data('page');
			let container = ele.data('container');
			let newContainer = eid+ctype+page;
			
			$.post('/api/ent', {'type': ctype, 'user_id': eid, 'page': page}, function(r) {
				if (typeof(r.data) !== 'undefined' && r.data.length > 0) {
					$('.' + container).append(r.data);
					insertCommentFlag($('.' + newContainer + ' .cmt_rp_flag'));
					$('.' + newContainer + ' .timeago').timeago();
					$('.' + newContainer + ' .timeago').show();
					insertPostDropsIco($('.' + newContainer + ' .cook__inner .dotaction .dotact_plch'));
					initPostsDrop($('.' + newContainer + ' .cook__inner .dotaction'));
					initCommentsForm($('.' + newContainer + ' .comment_input'));
					ele.data('page', parseInt(page) + 1);
					activeInfiniteScrollEnt = true;
				}
				$('.loadmoreposts').addClass('-hidden');
				removeLoader($('.loadmoreposts .spinner'));

			}).fail(function(e) {
				$('.loadmoreposts').addClass('-hidden');
				removeLoader($('.loadmoreposts .spinner'));
			});
		}
	});
	}

	$('body').on('click', '.sh_f_p_content', function() {
		let parent = $(this).parents('.post_content').eq(0);
		$('.post_content_trim', parent).hide();
		$('.post_content_full', parent).removeClass('-hidden');
		return false;
	});

	if ($('#postForm').length > 0) {
		var postForm = new Quill('#postForm', {
			  modules: {
			    toolbar: false
			  },
			  placeholder: $('#postForm').data('placeholder'),
			  theme: 'snow',
			  formats: 'span'
		});
		
		postForm.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
			  let ops = []
			  delta.ops.forEach(op => {
			    if ((op.insert && typeof op.insert === 'string') || op.insert.emoji) {
			      ops.push({
			        insert: op.insert
			      })
			    }
			  })
			  delta.ops = ops
			  return delta
			})
	}

	$('body').on('click', '.post-submit', function() {
		let content = JSON.stringify($('#postDataForm .ql-editor').html());
		let form = $('#postDataForm');
		let url = form.attr('action');
		
		if(($(".post_uploaded_img_input").length === 0 || typeof($(".post_uploaded_img_input")) === 'undefined') && content.length === 0){
			return false;
		}
		
			$('.postform .-error-text').html('').addClass('-hidden');
			loadLoader($('.ptinner'), 125, 125);
			$('.post-submit').text('Se salveaza ...');
			$('#postDataContent', form).val(content);
			$.post(url, form.serialize(), function(response) {
				if (typeof(response.data) !== 'undefined') {
					if (typeof(response.data.post) !== 'undefined') {
						if (typeof(response.data.redirect) !== 'undefined') {
							window.location = response.data.redirect;
						} else {
							location.reload();
						}
					} else {
						$('.reciperesponse .responset').html('Eroare de sistem. Ne cerem scuze. Va rugam reincercati mai tarziu.');
						$('.reciperesponse').removeClass('-hidden');
					}
				} else if (typeof(response.errors_text) !== 'undefined') {
					$('.postform .-error-text').html('Aveti urmatoarele erori:<br/><br/>' +response.errors_text);
					$('.postform .-error-text').removeClass('-hidden');
				}
				$('.post-submit').text('Posteaza');
				removeLoader($('.ptinner'));
			}).fail(function(e) {
				$('.postform .-error-text').html('Eroare de sistem. Ne cerem scuze. Va rugam reincercati mai tarziu.');
				$('.postform .-error-text').removeClass('-hidden');
				removeLoader($('.ptinner'));
 				$('.post-submit').text('Posteaza');
			});
		return false;
	});

//	$('body').on('focus', '#postForm .ql-editor', function() {
//		$('.post-actions').removeClass('-hidden');
//		$(this).parents('.post_ele').eq(0).addClass('active');
//	});
	$('body').on('click', '.post_ele .paction_over', function() {
		$(this).parents('.post_ele').eq(0).removeClass('active');
	});
	$('body').on('click', '.postform', function() {
		$(this).parents('.post_ele').eq(0).addClass('active');
	});
	

// 	$( "body" ).on( "click", ".postform, .postform *", function(e) {
// 		if (e.target != '.postimage') {
// 			e.stopPropagation();
// 		}

// 		$('.post-actions').addClass('-hidden');
// 	});
// 	$(document).click(function(){
// 		$('.post-actions').addClass('-hidden');
// 	});

	$('body').on('click', '.postimage', function() {
		document.forms['postImageUpload']['postChooseFile'].click();
	});

	$('body').on('click', '.post-img-list .post-img-rem', function() {
		let ele = $(this);
		let exID = $(this).data('hid');
		if (parseInt(exID) > 0) {
			let parentEle = ele.parents('.pl-left').eq(0);
			parentEle.append('<input type="hidden" name="uploadedimages['+ exID +'][deleted]" value="1">');
			parentEle.hide();
		} else {
			ele.parents('.pl-left').eq(0).remove();	
		}
	});

	$('#postImageUpload').fileupload({
		datatype: "script",
		dropZone: $('.postform'),
		add: function(e, data) {
// 			loadLoader(avatarUpload, 45, 45);
			data.submit();
		},
        done: function (e, response) {
        	if (typeof(response.result.data) !== 'undefined') {
            	let template = '<div class="pl-left">\
                	\<input type="hidden" class="post_uploaded_img_input" name="uploadedimages[][url]" value="' + response.result.data.file.url + '"/>\
                	<div class="post-img-rem" title="Sterge"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path></svg></div><img class="bradius6" src="/cache/225x225' + response.result.data.file.url + '"/><div class="story-card__gradient"></div></div>';
            	$('.post-img-list').append(template);
// 	        	location.reload();
// 	        	$('img', '.avatar-upload__holder').attr('src', '/' + response.result.data.file_path.o);
	        } else {
// 	        	dropError(response.result.errors_text);
	        }
//         	removeLoader(avatarUpload);
        },
        fail: function(e, r) {
            if (r._response.jqXHR.status) {
				if (r._response.jqXHR.status == 413) {
					dropError('Imaginea depaseste limita de marime.');
				} else {
					dropError('Eroare de sistem. Va rugam incercati mai tarziu.');
				}
            } else {
            	dropError('Eroare de sistem. Va rugam incercati mai tarziu.');
            }
//         	removeLoader(avatarUpload);
        }
	});
	
	$('body').on('click', '.postact_items .post_remove_act', function() {
		let parentList = $(this).parents('.postact_items').eq(0);
		let pId = parentList.data('id');
		if (parseInt(pId) > 0) {
			if (confirm('\nSunteti siguri ca vreti sa stergeti postarea ?\nProcesul nu e reversabil.\nToate comentariile si imaginile apartinand acestei postari vor fi sterse.')) {
				let parentEle = $('.cook--normal-card[data-id="'+pId+'"]');
				$('.post_err_wr', parentEle).remove();
				loadLoader(parentEle, 125, 125);
				let url = $(this).data('url');
				var rulr = $(this).data('r');
				$.post(url, {}, function(r) {
					if (typeof(r.data) !== 'undefined') {
						if (typeof(r.data.post) !== 'undefined') {
//							if (typeof(r.data.redirect) !== 'undefined') {
	//							window.location = response.data.redirect;
//							} else {
	//							location.reload();
//							}
							
							if (typeof(rulr) !== 'undefined' && rulr.length > 0) {
								window.location = rulr;
							} else {
								postDrops[pId].remove();
								parentEle.remove();
							}
						} else {
							parentEle.addClass('box--banner-err');
							showPostErr(parentEle, 'Eroare de sistem. Ne cerem scuze. Va rugam reincercati mai tarziu.');
						}
					} else if (typeof(r.errors_text) !== 'undefined') {
						parentEle.addClass('box--banner-err');
						showPostErr(parentEle, r.errors_text);
					}
					removeLoader(parentEle);
				}).fail(function(e) {
					parentEle.addClass('box--banner-err');
					showPostErr(parentEle, 'Eroare de sistem. Ne cerem scuze. Va rugam reincercati mai tarziu.');
					removeLoader(parentEle);
				});
			}
		}
		return false;
	});
	
	var postCopyLinks = new ClipboardJS('.postact_items .copylink');
	postCopyLinks.on('success', function(e) {
		let ele = $(e.trigger);
		let cliptext = $('.cliptext', ele);
		cliptext.addClass('-sct');
		cliptext.text('Copiat');
		setTimeout(function() {
			cliptext.text('Copiaza linkul');
			cliptext.removeClass('-sct');
		}, 2000);
	    e.clearSelection();
	});
	
	$('body').on('click', '.postact_items .post_edit_act', function() {
		window.location = $(this).data('url');
		return false;
	});
	
	$('body').on('click', '.postact_items .post_hide_act', function() {
		let parentList = $(this).parents('.postact_items').eq(0);
		let pId = parentList.data('id');
		if (parseInt(pId) > 0) {
			if (confirm('\nSunteti siguri ca vreti sa ascundeti postarea ?\nAceasta nu va mai aparea pe pagina ta.\nPostarea va ramana vizibila pe pagina creatorului.')) {
				let parentEle = $('.cook--normal-card[data-id="'+pId+'"]');
				$('.post_err_wr', parentEle).remove();
				loadLoader(parentEle, 125, 125);
				let url = $(this).data('url');
				$.post(url, {}, function(r) {
					if (typeof(r.data) !== 'undefined') {
						if (typeof(r.data.post) !== 'undefined') {
							postDrops[pId].remove();
							parentEle.remove();
						} else {
							parentEle.addClass('box--banner-err');
							showPostErr(parentEle, 'Eroare de sistem. Ne cerem scuze. Va rugam reincercati mai tarziu.');
						}
					} else if (typeof(r.errors_text) !== 'undefined') {
						parentEle.addClass('box--banner-err');
						showPostErr(parentEle, r.errors_text);
					}
					removeLoader(parentEle);
				}).fail(function(e) {
					parentEle.addClass('box--banner-err');
					showPostErr(parentEle, 'Eroare de sistem. Ne cerem scuze. Va rugam reincercati mai tarziu.');
					removeLoader(parentEle);
				});
			}
		}
		return false;
	});
	
	$('body').on('click', '.postact_items .post_repo_act', function() {
		let parentList = $(this).parents('.postact_items').eq(0);
		let pId = parentList.data('id');
		postDrops[pId].remove();
	});
	
});
function insertPostDropsIco(ele) {
	ele.html('<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="16px" height="16px" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve"><g><g><circle cx="69.545" cy="306" r="69.545"/><circle cx="306" cy="306" r="69.545"/><circle cx="542.455" cy="306" r="69.545"/></g></g></svg>');
}
}