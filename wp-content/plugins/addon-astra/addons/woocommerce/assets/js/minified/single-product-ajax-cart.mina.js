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

!function(o){null!=window.astra&&(astraSingleProductAjax={quick_view_enable:astra.shop_quick_view_enable||!1,ajax_add_to_cart_enable:astra.single_product_ajax_add_to_cart||!1,init:function(){this._bind()},_bind:function(){astraSingleProductAjax.ajax_add_to_cart_enable&&o(document).on("click","body.single-product .product:not(.product-type-external) button.single_add_to_cart_button, #sticky-add-to-cart .single_add_to_cart_button",astraSingleProductAjax._processAjaxRequest),astraSingleProductAjax.quick_view_enable&&o(document.body).on("click","#ast-quick-view-content .product:not(.product-type-external) button.single_add_to_cart_button",astraSingleProductAjax._processAjaxRequest),o(document.body).on("added_to_cart",astraSingleProductAjax._updateButton),o("form.variations_form").on("woocommerce_variation_has_changed",astraSingleProductAjax._updateSaleBadge)},_processAjaxRequest:function(a){a.preventDefault();a=o(this).closest("form");if(!a[0].checkValidity())return a[0].reportValidity(),!1;var r,t,e=o(this),d=o(this).val()||"";o('input[name="variation_id"]').val();e.hasClass("disabled")||(e.removeClass("added"),e.addClass("loading"),r=o('input[name="quantity"]').val(),o(".woocommerce-grouped-product-list-item").length&&(t=o("input.qty"),r=[],o.each(t,function(a,t){var e=o(this).attr("name");e=(e=e.replace("quantity[","")).replace("]",""),e=parseInt(e),o(this).val()&&(r[e]=o(this).val())})),t=a.serialize(),o.ajax({url:astra.ajax_url,type:"POST",data:"action=astra_add_cart_single_product&add-to-cart="+d+"&"+t,success:function(a){o(document.body).trigger("wc_fragment_refresh"),o(document.body).trigger("added_to_cart",[a.fragments,a.cart_hash,e]),"undefined"!=typeof wc_add_to_cart_params&&"yes"===wc_add_to_cart_params.cart_redirect_after_add&&(window.location=wc_add_to_cart_params.cart_url)}}))},_updateButton:function(a,t,e,r){r=void 0!==r&&r,o("button.single_add_to_cart_button").length&&(o(r).removeClass("loading"),o(r).addClass("added"),astra.is_cart||0!==o(r).parent().find(".added_to_cart").length||o(r).after(' <a href="'+astra.cart_url+'" class="added_to_cart wc-forward" title="'+astra.view_cart+'">'+astra.view_cart+"</a>"),o(document.body).trigger("wc_cart_button_updated",[r]));const d=o("#ast-site-header-cart");d.hasClass("ast-desktop-cart-flyout")&&d.trigger("click")},_updateSaleBadge:function(a){var t,e,r=o(this),d=r.find(".variation_id").val();""!=d&&"sale-percentage"==(r=r.closest(".product-type-variable").find("span.onsale")).data("notification")&&void 0!==(t=r.data("sale"))[d]&&(e=(e=r.data("sale-per-text")).replace("[value]",t[d]),r.text(e))}},o(function(){astraSingleProductAjax.init()}))}(jQuery);

}
/*
     FILE ARCHIVED ON 12:43:12 May 02, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:33:32 Jan 13, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 147.843
  exclusion.robots: 0.093
  exclusion.robots.policy: 0.081
  cdx.remote: 0.074
  esindex: 0.009
  LoadShardBlock: 125.132 (3)
  PetaboxLoader3.resolve: 74.691 (3)
  PetaboxLoader3.datanode: 94.905 (5)
  load_resource: 79.017
  loaddict: 39.692
*/