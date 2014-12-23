	var slidetime = 20000;
    var active = false;
    var timer = 0;
    
		
	$(window).load(function () {
		var img = new Image(); //se crea un objeto de tipo imagen  //q?
        init();
		//setTimeout('next()', slidetime); //call next function every slidetime
        $('.tabmenu').show();  //show the tab button
	});
			
	jQuery(function($){

        $('h1#slidecaption').text(name_image);//Titulo del visualizador
        $('div#imagedesc').text(desc_image);//Descripci´on

		$.fn.supersized.options = {  
            slideshow: 0  //This option is important
        };

        $('#supersize').supersized();

        /*

        $.fn.supersized.options = {  
            startwidth: 1600,  
            startheight: 1000,
            vertical_center: 1,
            slideshow: 0,
            navigation: 1,
            transition: 1, //0-None, 1-Fade, 2-slide top, 3-slide right, 4-slide bottom, 5-slide left
            pause_hover: 0,
            slide_counter: 0,
            slide_captions: 1,
            slide_interval: 35000
        };

        $('#supersize').supersized();
		
        var $panzoom = $("#supersize").panzoom();

        $panzoom.parent().on('mousewheel.focal', function( e ) {
            e.preventDefault();
            var delta = e.delta || e.originalEvent.wheelDelta;
            var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
            $panzoom.panzoom('zoom', zoomOut, {
              increment: 0.1,
              animate: false,
              focal: e
            });
        });

    */

       
        var viewer;
        viewer = $("#supersize").iviewer({

            src: imageT,

            onClick: function(ev, coords) {
            },

            onMouseMove: function(ev, coords) {                              
            },
                    
            onBeforeDrag: function(ev, coords) {
                //$('#pointer').css('display', 'none');     
            },
                    
            onZoom: function(ev) {
                //$('#pointer').css('display', 'none');
            },
                    
            initCallback: function(ev) {
                this.container.context.iviewer = this;
            }
        });  
				
		$(window).resize(function() {
			$('#supersize').iviewer('fit');
		});
    });	



    
    var urlloc=window.location.pathname;
    var urllen=window.location.pathname.length-1;
    

    //function to go to the next page
    function init() {   
        if(urlloc.charAt(urllen)=='/'){
        active=true;
        $('a#pauseplay').attr('class', 'play');
        $('a#prevslide.prev').attr('href', '/biodiversidad2014/'+prev_image + '/');
        $('a#nextslide.next').attr('href', '/biodiversidad2014/'+next_image + '/');
        timer = setTimeout('next()', slidetime);
        }else{
        active=false;
        $('a#pauseplay').attr('class', 'pause');
        $('a#prevslide.prev').attr('href', '/biodiversidad2014/'+ prev_image);
        $('a#nextslide.next').attr('href', '/biodiversidad2014/'+ next_image);
        }
    }
    
    
    var active_tab = '';

    /*pass to next image or previus iamge with arrow keys*/ 
	$(document).keyup(function(a) { 
        switch (a.keyCode) {
            case 37:
                if (active_tab!='') {
                    return false;
                }
            	location = '/biodiversidad2014/'+prev_image;
                break;
            case 39:
                if (active_tab!='') {
                    return false;
                }
                location = '/biodiversidad2014/'+next_image;
                break;
            case 27:  //esc key
                tab_min();
                break;
		}
	} );

	function change_class(el) {
		if ($(el).attr('class')=='play') {
			active=false;
			$(el).attr('class', 'pause');
            $('a#prevslide.prev').attr('href', '/biodiversidad2014/'+prev_image);
            $('a#nextslide.next').attr('href', '/biodiversidad2014/'+next_image);
            if (timer) {
                clearTimeout(timer);
                timer = 0;
            }
		} else {
			active=true;
			$(el).attr('class', 'play');
            $('a#prevslide.prev').attr('href', '/biodiversidad2014/'+prev_image + '/');
            $('a#nextslide.next').attr('href', '/biodiversidad2014/'+next_image + '/');
            timer = setTimeout('next()', slidetime);
		}
	}

    //function to go to the next page
	function next() {
		if (active) {
			window.location = '/biodiversidad2014/'+next_image + '/';
		}else {
            window.location = '/biodiversidad2014/'+next_image;
        }
	}


    function tab_min() {
        if (active_tab!='minimize') {
            if (active_tab=='') {
                active_tab = 'minimize';
                $('.shrink').attr('class','expand');
                $('.tabmenu').animate({ left: 0 }, 600);
                $('#content').animate({
                    width: 0
                }, 600, function() {
                    $('#contentframe').hide();
                    //$('#content').prepend($('<a id="logo_min" style="display:none" target="_top" href=""><img src="/images/logo_sib_portal.png" alt="SIB Colombia"></a>'));
                    });
            } else {
                console.log("active_tab: "+active_tab);
                //tab_switch(active_tab);
            }
        } else {
            active_tab = '';
            $('.expand').attr('class','shrink');
            $('.tabmenu').animate({ left: 176 }, 600);
            $('#content').animate({
                width: 175
            }, 600, function() { $('#contentframe').show(); } );
        }
    }

    
    