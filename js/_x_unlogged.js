(function() {
	  $('body').on('submit', '.email-registration-form', function() {
		  let form = $(this);
		  let url = form.attr('action');
		  $('.ureg_field').removeClass('error');
		  $('.email-registration-form button.sb').text('Se salveaza ...');
		  $('.email-registration-form button.sb').addClass('disabled');
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
					$('.email-registration-form button.sb').removeClass('disabled');
			    },
			    error: function(response) {
			    	$('.email-registration-form button.sb').text('Creaza cont');
					$('.email-registration-form button.sb').removeClass('disabled');
					$('.registration-form__error', form).html('Eroare de siste. Va rugam reincarcati mai tarziu');
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
			  $('.header__login-buttons__log-in').trigger('click');  
		  }, 450);
		  
	  });
	  $('body').on('click', '[data-dialog-change="sign_up"]', function() {
		  $.fancybox.close();
		  setTimeout(function() {
			  $('.header__login-buttons__sign-up').first().trigger('click');  
		  }, 450);
		  
	  });
	  
}).call(this);