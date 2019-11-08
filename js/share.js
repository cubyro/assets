window.SocialSharingDataProvider = {
      FACEBOOK: {
        name: "facebook",
        getPopupUrl: function(encoded_title, url) {
          return "https://www.facebook.com/sharer/sharer.php?u=" + (encodeURIComponent(url)) + "&title=" + encoded_title;
        }
      },
      TWITTER: {
        name: "twitter",
        getPopupUrl: function(encoded_title, url) {
          return "https://twitter.com/intent/tweet?text=" + encoded_title + "%20" + (encodeURIComponent(url)) + "%20@" + app.SITENAME;
        },
        popupH: 450
      },
      TUMBLR: {
        name: "tumblr",
        getPopupUrl: function(encoded_title, url) {
          return "http://www.tumblr.com/share/video?embed=" + (encodeURIComponent(url)) + "&caption=" + encoded_title;
        }
      },
      GOOGLEPLUS: {
        name: "google_plus",
        getPopupUrl: function(encoded_title, url) {
          return "https://plus.google.com/share?url=" + (encodeURIComponent(url));
        },
        popupW: 500
      },
      PINTEREST: {
        name: "pinterest",
        getPopupUrl: function(encoded_title, url, img) {
          return "http://www.pinterest.com/pin/create/button/?url=" + (encodeURIComponent(url)) + "&description=" + encoded_title + "&media=" + (encodeURIComponent(img));
        }
      },
      LINKEDIN: {
        name: "linkedin",
        getPopupUrl: function(encoded_title, url, img) {
          return "http://www.linkedin.com/shareArticle?mini=true&url=" + (encodeURIComponent(url)) + "&summary=" + encoded_title + "&source="+app.SITENAME;
        }
      },
      REDDIT: {
        name: "reddit",
        getPopupUrl: function(encoded_title, url, img) {
          return "http://reddit.com/submit?url=" + (encodeURIComponent(url)) + "&title=" + encoded_title;
        }
      },
      WATSAPP: {
        name: "watsapp",
        onClick: function(e, w) {
          var url;
          if (!w.isDisabled()) {
            url = "whatsapp://send?text=" + w.title + "%20" + encodeURIComponent(w.url);
            window.top.location = url;
          }
        }
      },
      MESSENGER: {
        name: "messenger",
        onClick: function(e, w) {
          var url;
          if (w.isDisabled()) {
            return;
          }
          url = "fb-messenger://share?link=" + encodeURIComponent(w.url);
          window.top.location = url;
        }
      },
};

var getProviderByName = function(name) {
    var k, ref, v;
    ref = window.SocialSharingDataProvider;
    for (k in ref) {
      v = ref[k];
      if (v.name === name) {
        return v;
      }
    }
    return void 0;
  };


$('document').ready(function() {
	
	$('body').on('click touch', 'button[custom-sharing-button], div[custom-sharing-button]', function() {
		let shareType = $(this).data('custom-sharing');
		let title = $(this).data('encoded-title');
		let url = $(this).data('url');
		let img = $(this).data('img');
		
		let provider = getProviderByName(shareType);
		
		if (provider) {
			let w = provider.popupW != null ? provider.popupW : 640;
			let h = provider.popupH != null ? provider.popupH : 430;
			let left = $(window).width() / 2 - w / 2;
			let top = $(window).height() / 2 - h / 2;
			let params = "menubar=no,toolbar=no,status=no,width=" + w + ",height=" + h + ",toolbar=no,left=" + left + ",top=" + top;
			window.open(provider.getPopupUrl(title, url, img), "_share_recipe_", params);
		}
	});
	
	$('.recipe_share_handler').each(function(i, ele) {
		let element = $(ele);
		let parent = element.parents('.cook__sharing__dropdown').eq(0);
		let dropdown = $('.dropdown__inner', parent);
		let title = element.data('title');
		let img = element.data('img');
		let id = element.data('id');
		let url = element.data('url');
		let rtype = element.data('rtype');
		
		let shareDropHtml = '<div class="cook__sharing" style="padding:0; border-top:none;"><div class="cook__sharing__dropdown"><div class="dropdown__layer -fill"></div>\
			<div class="dropdown__content">\
				<div class="sharing__dropdown__item -centered-text">\
					<button type="button" class="sb -sq -ribbon social box tumblr" custom-sharing-button="" data-custom-sharing="tumblr" data-url="'+ url +'" data-encoded-title="'+ encodeURIComponent(title) +'"></button>\
					<span>Tumblr</span>\
				</div>\
				<div class="sharing__dropdown__item -centered-text">\
					<button type="button" class="sb -sq -ribbon social box reddit" custom-sharing-button="" data-custom-sharing="reddit" data-url="'+ url +'" data-encoded-title="'+ encodeURIComponent(title) +'" data-img="'+ img +'" ></button>\
					<span>Reddit</span>\
				</div>\
				<div class="sharing__dropdown__item -centered-text">\
					<button type="button" class="sb -sq -ribbon social box pinterest" custom-sharing-button="" data-custom-sharing="pinterest" data-url="'+ url +'" data-encoded-title="'+ encodeURIComponent(title) +'" data-img="'+ img +'" ></button>\
					<span>Pinterest</span>\
				</div>\
				<div class="sharing__dropdown__item -centered-text">\
					<button type="button" onclick="return window.print();" class="sb -sq -st -ribbon social box printb"></button>\
					<span class="cliptext">Printare</span>\
				</div>\
				<div class="sharing__dropdown__item -centered-text -sharing-mail">\
					<a href="mailto:?subject=Salutare, am găsit ceva interesant!&amp;body=' + encodeURIComponent(title) + ' ' + url + '" class="sb -sq -st -ribbon social box mail"></a>\
					<span>Mail</span>\
				</div>\
				<div class="sharing__dropdown__item -centered-text copyElement" data-clipboard-text="' + url + '">\
					<button type="button" class="sb -sq -st -ribbon social box link"></button>\
					<span class="cliptext">Copiaza linkul</span>\
				</div>\
				<div class="sharing__dropdown__item -centered-text" flag-cook-handle="">\
					<button type="button" class="sb -sq -st -ribbon social box flag flag_handler " href="javascript:;" data-fancybox="flagitemx_' + id + '" title="Conectare" data-type="ajax" data-src="' + (userID ? '/api/flag_popup?rtype='+ rtype +'&id='+ id + '&t=' + encodeURIComponent(title) : '/api/login_popup') + '" data-selectable="true" data-touch="false"></button>\
					<span>Raporteaza</span>\
				</div>\
			</div></div></div>';
		
		let shareDrop = new Drop({
			target: ele,
			position: 'bottom center',
			constrainToWindow: false,
			constrainToScrollParent: false,
			openOn: 'click',
			hoverCloseDelay: 130,
			hoverOpenDelay: 250,
//			content: '<div class="cook__sharing" style="padding:0; border-top:none;"><div class="cook__sharing__dropdown"><div class="xdropdown__inner -xshowed" style="display:block;">' + dropdown.html() + '</div></div></div>',
			content: shareDropHtml,
			tetherOptions: {offset: '-5px 0'}
	  });
	});
	
	$('body').on('click', '.op_sr_other', function() {
		  let parentItem = $(this).parents('.cook--normal-card').eq(0);
		  if (typeof(parentItem) !== 'undefined') {
			let popupElement = parentItem.find('.recipe_share_handler');
			let imageActions = $('.viewer__share', parentItem).eq(0);
			
			imageActions.trigger('click');
			popupElement.trigger('click');
			popupElement[0].scrollIntoView({ 
				behavior: 'smooth' 
			});
			popupElement.addClass('fastanimation animated pulse');
				setTimeout(function() {
					popupElement.removeClass('fastanimation animated pulse');	
			}, 850);  
		  }
		  return false;
	});
	
	$('body').on('click', '.dropdown--flag .list__item', function() {
		let ele = $(this);
		let parent = ele.parents('.dropdown--flag').eq(0);
		if (ele.hasClass('other')) {
			$('.flag__form', parent).show();
		} else {
			ele.addClass('-on');
		}
		
	});
	
	$('body').on('click', '.send-claim', function() {
		let ele = $(this); 
		let parent = ele.parents('.sb-group').eq(0);
		let reason = $('textarea', parent).eq(0).val();
		let itemID = $('#itemID', parent).val();
		let rtype = $('#rtype', parent).val();
		if (typeof(userIsDisabled) !== 'undefined' && userIsDisabled === true) {
			$('.-error-text', parent).text('Cont dezactivat. Operatiunea nu este permisa.');
		} else {
			if (parseInt(itemID) > 0) {
				if (reason.length > 0) {
					$.post('/api/flag', {'id' : itemID, 'reason' : reason, 'rtype': rtype}, function(r) {
						$('.-error-text', parent).text('');
						if (typeof(r.data) !== 'undefined') {
							if (typeof(r.data.item) !== 'undefined') {
								$('.-error-text', parent).html('');
								$('.-success-text', parent).html('Mesajul a fost trimis.<br/>Problema raportata va fi inspectata in cel mai scurt timp.').removeClass('-hidden');
								$('.flg-btn').remove();
								$('.flg-close').removeClass('-hidden');
								$('textarea', parent).eq(0).val('');
								$('textarea', parent).eq(0).addClass('disabled');
							} else {
								$('.-error-text', parent).html('Eroare de sistem. Ne cerem scuze. Va rugam reincercati');
							}
						} else if (typeof(r.errors_text) !== 'undefined') {
							$('.-error-text', parent).html(r.errors_text);
						}
					});
				} else {
					$('.-error-text', parent).text('*Motivul este obligatoriu.');
				}	
			} else {
				$('.-error-text', parent).html('Eroare,<br/>Va rugam reincarcati pagina si incercati din nou.');
			}
		}
		
		// TODO
		
		return false;
	});
	
	
	
//	$('body').on('click', '.flag_handler', function() {
//		let element = $(this);
//		let dropele = element.parents('.sharing__dropdown__item').eq(0).find('.flag_wrapper_content');
//		let flagDrop = new Drop({
//			target: this,
//			position: 'bottom center',
//			constrainToWindow: false,
//			constrainToScrollParent: false,
//			openOn: 'click',
//			hoverCloseDelay: 130,
//			hoverOpenDelay: 250,
//			content: '<div class="dropdown dropdown--flag"><div class="xdropdown__inner -xshowed" style="display:block;">' + dropele.html() + '</div></div>',
//			tetherOptions: {offset: '-5px 0'}
//	  });
//		flagDrop.open();
//	});
	
//	$('.flag_handler').each(function(i, ele) {
//		let element = $(ele);
//		let dropele = element.parents('.sharing__dropdown__item').eq(0).find('.flag_wrapper_content');
//		console.log(dropele);
//		let flagDrop = new Drop({
//			target: ele,
//			position: 'bottom center',
//			constrainToWindow: false,
//			constrainToScrollParent: false,
//			openOn: 'click',
//			hoverCloseDelay: 130,
//			hoverOpenDelay: 250,
//			content: '<div class="dropdownxx xxdropdown--flag"><div class="xdropdown__inner -xshowed" style="display:block;">' + dropele.html() + '</div></div>',
//			tetherOptions: {offset: '-5px 0'}
//	  });
//	});
	
	
});
//
//w = this.provider.popupW != null ? this.provider.popupW : 640;
//      h = this.provider.popupH != null ? this.provider.popupH : 430;
//      left = $(window).width() / 2 - w / 2;
//      top = $(window).height() / 2 - h / 2;
//      params = "menubar=no,toolbar=no,status=no,width=" + w + ",height=" + h + ",toolbar=no,left=" + left + ",top=" + top;
//      if (this.url != null) {
//        url = this.url;
//      } else {
//        url = Routes.view_coub_by_permalink_url(this.permalink);
//      }
//      window.open(this.provider.getPopupUrl(this.title, url, this.img), "_share_coub_" + this.type, params);