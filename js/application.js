
function resizePages() {
	var h = $(window).height();
	var height  =  h < 600 ? 600 : h;
	$('section').css('height',height);
    $('firstSection').css('height',height*0.98);
}


$(document).ready(function() {

	var scrollElement = 'html, body';
	$('html, body').each(function () {
		var initScrollTop = $(this).attr('scrollTop');
		$(this).attr('scrollTop', initScrollTop + 1);
		if ($(this).attr('scrollTop') == initScrollTop + 1) {
			scrollElement = this.nodeName.toLowerCase();
			$(this).attr('scrollTop', initScrollTop);
			return false;
		}    
	});
	$("#cover #down a").click(function(event) {
		event.preventDefault();
		
		var $this = $(this),
		target = this.hash,
		$target = $(target);
		
		$(scrollElement).stop().animate({
			'scrollTop': $target.offset().top
		}, 500, 'swing', function() {
			window.location.hash = target;
		});
		
	});

	//resize
	$(window).resize(function(e) {
		resizePages();
	});
	resizePages();

	//scroll
	$(window).scroll(function(e) {
		var top = $(document).scrollTop();
		var wHeight = Math.max(640,$(window).height());
	});

	$(window).load(function() {
		$('.flexslider').flexslider();
	});


	function injector(t, splitter, klass, after) {
		var a = t.text().split(splitter), inject = '';
		if (a.length) {
			$(a).each(function(i, item) {
				inject += '<span class="'+klass+(i+1)+'">'+item+'</span>'+after;
			});	
			t.empty().append(inject);
		}
	}	
	var methods = {
		init : function() {
			return this.each(function() {
				injector($(this), '', 'char', '');
			});
		},
		words : function() {
			return this.each(function() {
				injector($(this), ' ', 'word', ' ');
			});
		},
		lines : function() {
			return this.each(function() {
				var r = "eefec303079ad17405c889e092e105b0";
				// Because it's hard to split a <br/> tag consistently across browsers,
				// (*ahem* IE *ahem*), we replaces all <br/> instances with an md5 hash 
				// (of the word "split").  If you're trying to use this plugin on that 
				// md5 hash string, it will fail because you're being ridiculous.
				injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
			});
		}
	};
	$.fn.lettering = function( method ) {
		// Method calling logic
		if ( method && methods[method] ) {
			return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
		} else if ( method === 'letters' || ! method ) {
			return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
		}
		$.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
		return this;
	};


	$("section#brain #thoughts h1").lettering();
	$("#falling h1").lettering();



	$.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    }
    
    var div = document.createElement('div'),
        ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];
        
  	div.className = 'fit-vids-style';
    div.innerHTML = '&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';
                      
    ref.parentNode.insertBefore(div,ref);
    
    if ( options ) { 
      $.extend( settings, options );
    }
    
    return this.each(function(){
      var selectors = [
        "iframe[src^='http://player.vimeo.com']", 
        "iframe[src^='http://www.youtube.com']", 
        "iframe[src^='https://www.youtube.com']", 
        "iframe[src^='http://www.kickstarter.com']", 
        "object", 
        "embed"
      ];
      
      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }
      
      var $allVideos = $(this).find(selectors.join(','));

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() == 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; } 
        var height = this.tagName.toLowerCase() == 'object' ? $this.attr('height') : $this.height(),
            aspectRatio = height / $this.width();
		if(!$this.attr('id')){
			var videoID = 'fitvid' + Math.floor(Math.random()*999999);
			$this.attr('id', videoID);
		}
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  }

  $("#about").fitVids();


	// var j = 0;
	// var delay = 2500; //millisecond delay between cycles
	// function cycleThru(){
 //    var jmax = $("ul#quotes li").length -1;
 //    $("ul#quotes li:eq(" + j + ")")
 //      .animate({"opacity" : "1"} ,300)
 //      .animate({"opacity" : "1"}, delay)
 //      .animate({"opacity" : "0"}, 300, function(){
 //        (j == jmax) ? j=0 : j++;
 //        cycleThru();
 //      });
 //    };
	// cycleThru();


	// function cycleThru2(){
 //    var jmax = $("ul#steps li").length -1;
 //    $("ul#steps li:eq(" + j + ")")
 //      .animate({"opacity" : "1"} ,400)
 //      .animate({"opacity" : "1"}, delay)
 //      .animate({"opacity" : "0"}, 400, function(){
 //        (j == jmax) ? j=0 : j++;
 //        cycleThru2();
 //      });
 //    };
	// cycleThru2();



	$("a#vid").click(function(e) {
		e.preventDefault();
		$("#armcontainer").removeClass("crucio").addClass("expelliarmis");
		$("#about h1, #about h2, #about ul").removeClass("incendo").addClass("disillusionment");
		$("#trailer").removeClass("impervius").addClass("revello");
		return false;
	});

	$("a#info").click(function(e) {
		e.preventDefault();
		$("#armcontainer").removeClass("expelliarmis").addClass("crucio");
		$("#about h1, #about h2, #about ul").removeClass("disillusionment").addClass("incendo");
		$("#trailer").removeClass("revello").addClass("impervius");
		return false;
	});

	$("a#close").click(function(e) {
		e.preventDefault();
		$("#promotion").addClass("slideup");
		return false;
	});




	$('#tools ul').waypoint(function(event){
		var $active = $(this);
			$('.toolsactive').removeClass('toolsactive');
			$active.addClass('toolsactive');
		},{

			triggerOnce: true,
			offset: 900

	});

	$('#debate #debate1container').waypoint(function(event){
		var $active = $(this);
			$('.player1').removeClass('player1');
			$active.addClass('player1');
		},{

			triggerOnce: true,
			offset: 1500

	});

	$('#debate #debate2container').waypoint(function(event){
		var $active = $(this);
			$('.player2').removeClass('player2');
			$active.addClass('player2');
		},{

			triggerOnce: true,
			offset: 1500

	});



});





























