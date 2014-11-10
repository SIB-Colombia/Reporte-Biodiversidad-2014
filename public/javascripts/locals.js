	var slidetime = 10000;
    
		
	$(window).load(function () {
		var img = new Image();
        //console.log('on load window');
        //console.log(slidetime);
		setTimeout('next()', slidetime);
        $('.tabmenu').show();
	});
			
	jQuery(function($){

        $('h1#slidecaption').text(name_image);
        $('div#imagedesc').text(desc_image);

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
    		slide_interval: 12000
		};

	    $('#supersize').supersized();
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

    var active = true;
	var image_name = 'current_image';
    var active_tab = '';
    //var image_id = 36965;
    $('h1#slidecaption').text('algo');

    /*pass to next image with key*/
	$(document).keyup(function(a) { 
        switch (a.keyCode) {
            case 37:
                if (active_tab!='') {
                    return false;
                }
            	location = '/biodiversidad2014/visualizador/'+prev_image;
                break;
            case 39:
                if (active_tab!='') {
                    return false;
                }
                location = '/biodiversidad2014/visualizador/'+next_image;
                break;
            case 27:
                tab_min();
                break;
		}
	} );

	function change_class(el) {
        //console.log($(el).attr('class'));
		if ($(el).attr('class')=='play') {
			active=false;
			$(el).attr('class', 'pause');
		} else {
			active=true;
			$(el).attr('class', 'play');
            setTimeout('next()', slidetime);
		}
	}

	function next() {
        //console.log("algo");
        //console.log(active);
		if (active) {
			window.location = '/biodiversidad2014/visualizador/'+next_image;
		}
	}

    function tab_switch(tab) {
        if (tab=='') {
            return false;
        }

        /* Open tab */
        if (active_tab=='' || active_tab!=tab) {
            /* Show */
            $('#contentframe').show();
            $('#logo_min').fadeOut('', $('#logo_min').remove());
            $('.expand').attr('class','shrink');

        	/* Pause */
            active = false;
            //$('#pauseplay').attr('class', 'pause');

            if (active_tab=='' || active_tab=='minimize') {
                var delay = 600;
            } else {
                delay = 1;
            }

            /* Reload tab */
            if (tab=='reload') {
                tab=active_tab;
            }

            $('.tabmenu').animate({ left: 746 }, delay);
            $('#content').animate({
                width: 745
            }, delay, function() { $('#catalog').html('<h3>Cargando...</h3>'); $('#catalog').css('height', $(document).height()-29  ); $.ajax({
                                      url: tab,
                                      success: function (html) {$('#catalog').html(html); }
                                    });
            });

            /* Set active tab */
            active_tab = tab;
        } else {
            active_tab = '';
            $('#catalog').css('height', '0');
            $('#catalog').html('');
            $('.tabmenu').animate({ left: 176 }, 600);
            $('#content').animate({
                width: 175
            }, 600 );
        }
    }

    function tab_min() {
        if (active_tab!='minimize') {
            if (active_tab=='') {
                active_tab = 'minimize';
                $('.shrink').attr('class','expand');
                $('#catalog').css('height', '0');
                $('#catalog').html('');
                $('.tabmenu').animate({ left: 0 }, 600);
                $('#content').animate({
                    width: 0
                }, 600, function() {
                    $('#contentframe').hide();
                    $('#content').prepend($('<a id="logo_min" style="display:none" target="_top" href=""><img src="/images/logo_sib_portal.png" alt="SIB Colombia"></a>'));
                    $('#logo_min').fadeIn();
                    });
            } else {
                tab_switch(active_tab);
            }
        } else {
            active_tab = '';
            $('#logo_min').fadeOut('', $('#logo_min').remove());
            $('.expand').attr('class','shrink');
            $('.tabmenu').animate({ left: 176 }, 600);
            $('#content').animate({
                width: 175
            }, 600, function() { $('#contentframe').show(); } );
        }
    }

    
    