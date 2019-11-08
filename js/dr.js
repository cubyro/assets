
  
//  (function() {
//	  var init, isMobile, setupExamples, setupHero, _Drop;

//	  _Drop = Drop.createContext({
//	    classPrefix: 'drop'
//	  });

//	  isMobile = $(window).width() < 567;
//
//	  init = function() {
////	    setupHero();
//	    return setupExamples();
//	  };

//	  $('.niceScrollerTest').antiscroll();
	  
//	  setupExamples = function() {
//	    
//	      
//	   
//	      var drop = new _Drop({
//	        target: $('.header-channel__avatar')[0],
//	        
//	        position: 'bottom right',
//	        constrainToWindow: false,
//	        constrainToScrollParent: false,
//	        openOn: 'hover',
//	        content: $('.usermenu').html(),
//	        tetherOptions: {offset: '-5px 0'}
//	      });
//	      drop.on('open', function(ele) {
//	    	  var userScroll = $('.drop .channel-menu-dropdown .antiscroll-wrap').antiscroll({initialDisplay: false});
////	    	  userScroll.refresh();
//	      });
//	      
//	      $('.testyprofile').each(function(ele) {
//	    	  new _Drop({
//			        target: this,
//			        
//			        position: 'bottom center',
//			        constrainToWindow: false,
//			        constrainToScrollParent: false,
//			        openOn: 'hover',
//			        hoverCloseDelay: 350,
//			        hoverOpenDelay: 252,
//			        content: '<div class="dropdown  -below" style=""> <div class="dropdown__layer -fill"></div> <div class="dropdown__content"><div class="channel channel--box-card box box-card box--banner " data-channel-id="186801"> <a href="/--niks--" class="box-card__screen" style=""><div class="box-card__screen" style="background-image: url(https://via.placeholder.com/100x50); opacity: 1;"></div><div class="box-card__screen__right-note">171,052,872&nbsp;views</div></a> <div class="box-card__meta"> <div class="channel__avatar"> <a href="/--niks--"> <img src="https://via.placeholder.com/100x100"  width="56" height="56" class="image"> </a> </div> <div class="channel-follow-button"> <div class="follow-btn " data-channel-id="186801" data-following="false" data-followed-from="" auto-init="" widget-follow-button-init=""><button type="button" data-channel-id="186801" auto-init="" widget-follow-button="" class="sb -st -rn -follow"> <i class="follow-icon"></i> <span class="text">Follow</span> <i class="unfollow-icon"></i></button></div> </div> <h5 class="channel__title hbold"> <a href="/--niks--">  Niks ☮  </a> </h5>  <p class="channel__description">Carnage Rules!</p>  <p class="channel__counters">  <a class="-ribbon-hvr-text" href="/--niks--#simples"> 2318 Coubs </a>   <span class="middot"></span>   <a class="-ribbon-hvr-text" href="/--niks--#recoubs"> 90 Reposts </a> </p> </div></div></div></div>',
//			      });
//	      });
////	      var newdrop = new _Drop({
////		        target: $('.testyprofile')[0],
////		        
////		        position: 'bottom center',
////		        constrainToWindow: false,
////		        constrainToScrollParent: false,
////		        openOn: 'hover',
////		        content: '<div class="dropdown  -below" style=""> <div class="dropdown__layer -fill"></div> <div class="dropdown__content"><div class="channel channel--box-card box box-card box--banner " data-channel-id="186801"> <a href="/--niks--" class="box-card__screen" style=""><div class="box-card__screen" style="background-image: url(https://via.placeholder.com/100x50); opacity: 1;"></div><div class="box-card__screen__right-note">171,052,872&nbsp;views</div></a> <div class="box-card__meta"> <div class="channel__avatar"> <a href="/--niks--"> <img src="https://via.placeholder.com/100x100"  width="56" height="56" class="image"> </a> </div> <div class="channel-follow-button"> <div class="follow-btn " data-channel-id="186801" data-following="false" data-followed-from="" auto-init="" widget-follow-button-init=""><button type="button" data-channel-id="186801" auto-init="" widget-follow-button="" class="sb -st -rn -follow"> <i class="follow-icon"></i> <span class="text">Follow</span> <i class="unfollow-icon"></i></button></div> </div> <h5 class="channel__title hbold"> <a href="/--niks--">  Niks ☮  </a> </h5>  <p class="channel__description">Carnage Rules!</p>  <p class="channel__counters">  <a class="-ribbon-hvr-text" href="/--niks--#simples"> 2318 Coubs </a>   <span class="middot"></span>   <a class="-ribbon-hvr-text" href="/--niks--#recoubs"> 90 Reposts </a> </p> </div></div></div></div>',
////		      });
//	      
//	      return drop;
//	    
//	  };
//
////	  init();
//

//	}).call(this);
//  
  $('document').ready(function() { 
	  
//	  $('body').on('submit', '.email-registration-form', function() {
//		  let form = $(this);
//		  let url = form.attr('action');
//		  $('.ureg_field').removeClass('error');
////		  alert('hy');
//		  $.ajax({
//			    url:url,
//			    type:"POST",
//			    beforeSend: function(xhr){
//			        xhr.setRequestHeader("X-CSRF-Token", $('[name="_csrfToken"]', form).val());
//			    },
//			    data:form.serialize(),
//			    dataType: "json",
//			    success:function(response) {
//			    	if (response.errors_text) {
//			    		$.each( response.errors, function( key, value ) {
//			    			$('[name="'+key+'"]').addClass('error');
//		    			});
//			    		$('.registration-form__error').html(response.errors_text);	
//			    	} else if (response.data) {
//			    		if (response.data.redirect) {
//			    			window.location = response.data.redirect;
//			    		}
//			    	}
//			    	
////			        console.log(response.email);
//			    },
//			    error: function(response) {
//			        console.error(response.message, response.title);
//			    }
//			});
//		  
//		  
////		  $.post('/users/register', form.serialize(), function(response) {
//////			  console.log(response);
////		  });
//		  console.log('submit');
//		  return false;
//		  
//	  });
	  
	  
//	  $('body').on('submit', '.login-pass', function() {
//		  let form = $(this);
//		  let url = form.attr('action');
//		  
//		  $.ajax({
//			    url:url,
//			    type:"POST",
//			    beforeSend: function(xhr){
//			        xhr.setRequestHeader("X-CSRF-Token", $('[name="_csrfToken"]', form).val());
//			    },
//			    data:form.serialize(),
//			    dataType: "json",
//			    success:function(response) {
////			    	if (response.errors_text) {
////			    		$.each( response.errors, function( key, value ) {
////			    			$('[name="'+key+'"]').addClass('error');
////		    			});
////			    		$('.registration-form__error').html(response.errors_text);	
////			    	} else if (response.data) {
////			    		if (response.data.redirect) {
////			    			window.location = response.data.redirect;
////			    		}
////			    	}
//			    	
////			        console.log(response.email);
//			    },
//			    error: function(response) {
//			        console.error(response.message, response.title);
//			    }
//			});
//		  
//		  return false;
//	  });
	  
	  

//	  $('body').on('click', '.login-pass__reset', function() {
//		  $('.registration-form').hide();
//		  $('.login_recover_password').show();
//		  $('.modal__body .back').show();
//	  });
//	  $('body').on('click', '.modal__body .back', function() {		  
//		  $('.login_recover_password').hide();
//		  $('.modal__body .back').hide();
//		  $('.registration-form').show();
//	  });
//	  
//	  $('body').on('click', '.registration-form__text', function() {
//		  $.fancybox.close();
//		  $('.header__login-buttons__log-in').trigger('click');
//	  });
	  
	  
//	  $('.antiscroll-wrap').antiscroll();
//	  
//	  $('body').on('click', '.viewer__share', function() {
//		  parent = $(this).parents('.cook');
//		  $('.viewer__sharing', parent).toggleClass('-hidden');
//	  });
//	  $('body').on('mouseenter', '.viewer ', function() {
//		  console.log('qq');
//		  $('.viewer__controls__right-top', this).removeClass('-hidden');
//	  });
//	  $('body').on('mouseout', '.viewer ', function() {
////		  console.log('qq');
//		  $('.viewer__controls__right-top', this).addClass('-hidden');
//	  });
//	  
//	  $('body').on('click', '.viewer__favourites', function() {
//		  $(this).addClass('-added');
////		  parent = $(this).parents('.cook--small-card');
////		  $('.viewer__sharing', parent).toggleClass('-hidden');
//	  });
	  
  });