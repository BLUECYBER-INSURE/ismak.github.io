var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

jQuery(document).ready(function($){

	var formsTrigger = {
		'xoo-el-login-tgr': 'login',
		'xoo-el-reg-tgr': 'register',
		'xoo-el-lostpw-tgr': 'lostpw',
		'xoo-el-resetpw-tgr': 'resetpw'
	}

	class Container{

		constructor( $container ){
			this.$container = $container;
			this.$tabs 		= $container.find('ul.xoo-el-tabs').length ? $container.find( 'ul.xoo-el-tabs' ) : null;
			this.display 	= $container.hasClass('xoo-el-form-inline') ? 'inline' : 'popup';

			if( this.$container.attr('data-active') ){
				this.toggleForm( this.$container.attr('data-active') );
			}

			this.eventHandlers();
		}

		eventHandlers(){
			this.formTriggerEvent();
			this.$container.on( 'submit', '.xoo-el-action-form', this.submitForm.bind(this) ) ;
		}


		formTriggerEvent(){
			var container = this;
			$.each( formsTrigger, function( triggerClass, formType ){
				$( container.$container ).on( 'click', '.' + triggerClass, function(e){
					e.preventDefault();
					e.stopImmediatePropagation();
					container.toggleForm(formType);
				} )
			} );
		}


		toggleForm( formType ){

			this.$container.attr( 'data-active', formType );

			var $section 	= this.$container.find('.xoo-el-section[data-section="'+formType+'"]'),
				activeClass = 'xoo-el-active';

			//Setting section
			if( $section.length ){
				this.$container.find('.xoo-el-section').removeClass( activeClass );
				$section.addClass( activeClass );
				$section.find('.xoo-el-notice').html('').hide();
				$section.find('.xoo-el-action-form').show();
			}

			//Setting Tab
			if( this.$tabs ){	
				this.$tabs.find('li').removeClass( activeClass );
				if( this.$tabs.find('li[data-tab="'+formType+'"]').length ){
					this.$tabs.find('li[data-tab="'+formType+'"]').addClass( activeClass );
				}
			}

			$(document.body).trigger( 'xoo_el_form_toggled', [ formType, this ] );

		}


		submitForm(e){

			e.preventDefault();

			var $form 			= $(e.currentTarget),
				$button 		= $form.find('button[type="submit"]'),
				$section 		= $form.parents('.xoo-el-section'),
				buttonTxt 		= $button.text(),
				$notice			= $section.find('.xoo-el-notice'),
				formType 		= $section.attr('data-section'),
				container 		= this;

			$button.html( xoo_el_localize.html.spinner ).addClass('xoo-el-processing');

			var form_data = $form.serialize() + '&action=xoo_el_form_action' + '&display=' + container.display;

			$.ajax({
				url: xoo_el_localize.adminurl,
				type: 'POST',
				data: form_data,
				success: function(response){

					$button.removeClass('xoo-el-processing').html(buttonTxt);

					//Unexpected response
					if( response.error === undefined ){
						console.log(response);
						location.reload();
						return;
					}

					if( response.notice ){

						$notice.html(response.notice).show();

						//scrollbar position
						if( container.display === 'inline' ){
							$('html, body').animate({ scrollTop: $notice.offset().top - 100}, 500);
						}

					}

					if ( response.error === 0 ){
						
						if( response.redirect ){
							//Redirect
							setTimeout(function(){
								window.location = response.redirect;
							}, xoo_el_localize.redirectDelay );
						}
						else{
							$form.hide();
						}

						$form.trigger('reset');

						if( formType === 'resetpw' ){
							$form.add( '.xoo-el-resetpw-hnotice' ).remove();
						}

					}

					$( document.body ).trigger( 'xoo_el_form_submitted', [ response, $form, container ] );
					
				}
			})
		}

	}


	class Popup{

		constructor( $popup ){
			this.$popup = $popup;
			this.eventHandlers();
			this.initScrollbar();
		}

		eventHandlers(){
			this.$popup.on( 'click', '.xoo-el-close, .xoo-el-modal', this.closeOnClick.bind(this) );
			$( document.body ).on( 'xoo_el_form_submitted', this.onFormSubmitSuccess.bind(this) );
			this.$popup.on( 'click', '.xoo-el-action-btn', this.setScrollBarOnSubmit.bind(this) );
			$(window).on('hashchange load', this.openViaHash.bind(this) );
			this.triggerPopupOnClick(); //Open popup using link
		}

		triggerPopupOnClick(){

			$.each( formsTrigger, function( triggerClass, formType ){

				$( document.body ).on( 'click', '.' + triggerClass, function(e){

					if( $(this).parents( '.xoo-el-form-container' ).length ) return true; //Let container class handle

					e.preventDefault();
					e.stopImmediatePropagation();

					popup.toggle('show');

					if( $(this).attr( 'data-redirect' ) ){
						popup.$popup.find('input[name="xoo_el_redirect"]').val( $(this).attr('data-redirect') );
					}

					popup.$popup.find( '.'+triggerClass ).trigger('click');

					return false;

				})

			})

		}

		initScrollbar(){
			this.$scrollbar = Scrollbar.init( this.$popup.find('.xoo-el-srcont').get(0) );
		}

		toggle( type ){
			var $els 		= this.$popup.add( 'body' ),
				activeClass = 'xoo-el-popup-active'; 

			if( type === 'show' ){
				$els.addClass(activeClass);
			}
			else if( type === 'hide' ){
				$els.removeClass(activeClass);
			}
			else{
				$els.toggleClass(activeClass);
			}

			$(document.body).trigger( 'xoo_el_popup_toggled', [ type ] );
		}

		closeOnClick(e){
			var elClassList = e.target.classList;
			if( elClassList.contains( 'xoo-el-close' ) || elClassList.contains('xoo-el-modal') ){
				this.toggle('hide');
			}
		}

		setScrollbarPosition( position ){
			this.$scrollbar.scrollTop = position || 0;
		}

		onFormSubmitSuccess( e, response, $form, container ){
			this.setScrollbarPosition();
		}

		setScrollBarOnSubmit(e){
			var invalid_els = $(e.currentTarget).closest('form').find('input:invalid');
			if( invalid_els.length === 0 ) return;
			this.setScrollbarPosition( invalid_els.filter(":first").closest('.xoo-aff-group').position().top );
		}

		openViaHash(){
	  		var hash = $(location).attr('hash');
	  		if( hash === '#login' ){
	  			this.toggle('show');
	  			this.$popup.find('.xoo-el-login-tgr').trigger('click');
	  		}
	  		else if( hash === '#register' ){
	  			this.toggle('show');
	  			this.$popup.find('.xoo-el-reg-tgr').trigger('click');
	  		}
		}
		
	}

	class Form{

		constructor( $form ){
			this.$form 	= $form;
		}

		eventHandlers(){

		}

	}

	var popup = null;

	//Popup
	if( $('.xoo-el-container').length ){
		popup = new Popup( $('.xoo-el-container') );
	}

	
	//Auto open popup
	if( xoo_el_localize.autoOpenPopup === 'yes' && localStorage.getItem( "xoo_el_popup_opened"  ) !== "yes" ){
		
		if( xoo_el_localize.autoOpenPopupOnce === "yes" ){
			localStorage.setItem( "xoo_el_popup_opened", "yes"  );
		}
		
		setTimeout(function(){
			popup.toggle('show');
		}, xoo_el_localize.aoDelay);
	}
	

	$('.xoo-el-form-container').each(function( key, el ){
		new Container( $(el) );
	})

	//Trigger popup if reset field is active
	if( $('form.xoo-el-form-resetpw').length ){
		if( $('.xoo-el-form-inline').length ){
			$([document.documentElement, document.body]).animate({
				scrollTop: $(".xoo-el-form-inline").offset().top
			}, 500);
		}
		else{
			if( popup ){
				popup.toggle('show');
			}
		}
	}


	if( $( 'body.woocommerce-checkout' ).length && $('.xoo-el-form-inline').length && $( 'a.showlogin' ).length ){
  		var $inlineForm = $('.xoo-el-form-inline');
  		$inlineForm.hide();
  		$( document.body ).on( 'click', 'a.showlogin', function(){
  			$inlineForm.slideToggle();
  			$inlineForm.find('.xoo-el-login-tgr').trigger('click');
  		} );	
  	}


})

}
/*
     FILE ARCHIVED ON 10:28:48 May 02, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:33:25 Jan 13, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 188.089
  exclusion.robots: 0.062
  exclusion.robots.policy: 0.054
  cdx.remote: 0.053
  esindex: 0.009
  LoadShardBlock: 87.632 (3)
  PetaboxLoader3.datanode: 95.446 (5)
  load_resource: 150.922
  PetaboxLoader3.resolve: 108.509
  loaddict: 23.087
*/