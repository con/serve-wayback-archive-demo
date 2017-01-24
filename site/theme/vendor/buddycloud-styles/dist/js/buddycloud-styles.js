var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
/*!
 * JavaScript for Bootstrap's docs (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see http://creativecommons.org/licenses/by/3.0/.
 */

var $window = $(window)
var $body   = $(document.body)

var navHeight = $('.navbar').outerHeight(true) + 10

$body.scrollspy({
  target: '.bs-docs-sidebar',
  offset: 70
})

$body.on('click', '.bs-docs-sidebar a', function (e) {
  setTimeout(function() {
    $window.scrollTop($window.scrollTop() - 65)
  }, 10);
})

$window.on('load', function () {
  $body.scrollspy('refresh')
})

$('.bs-docs-container [href=#]').click(function (e) {
  e.preventDefault()
})

// back to top
setTimeout(function () {
  var $sideBar = $('.bs-docs-sidebar')

  $sideBar.affix();
  $(document).on('')
}, 100)

setTimeout(function () {
  $('.bs-top').affix()
}, 100)

$(function() {
  $('pre:not(pre:has(code))').each(function(i, e) {
    hljs.highlightBlock(e);
  })
  $('pre code').each(function(i, e) {
    hljs.highlightBlock(e);
  })
})

}

/*
     FILE ARCHIVED ON 01:08:51 Feb 02, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:33:27 May 11, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.826
  exclusion.robots: 0.101
  exclusion.robots.policy: 0.084
  esindex: 0.015
  cdx.remote: 23.63
  LoadShardBlock: 1745.586 (3)
  PetaboxLoader3.datanode: 1755.405 (5)
  PetaboxLoader3.resolve: 100.288 (3)
  load_resource: 145.853 (2)
*/