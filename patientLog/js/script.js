$(function() {
	
	// Rotate screen
	
	settings = {
		mobile : false,
		checkMobile : function() {
		  this.mobile = ('ontouchstart' in document.documentElement);
		},
		redirectMobile : function() {
			this.checkMobile();
			if(this.mobile) {
				window.location.href = "http://rafassmail.github.io/hackMadrid/patientLog/login.html";
			}
		},
		getFrameLocation : function() {
			frame = $(".device iframe:first").contents();
			url = frame[0]["URL"];
			retArr = url.split("http://rafassmail.github.io/hackMadrid/patientLog/");
			return retArr[1];
		}
	}

	analytics = {
		update : function() {
		    try {
		    	loc = settings.getFrameLocation();
		        _gaq.push(['_setAccount', 'UA-3190500-49']);
		        _gaq.push(['_setDomainName', 'nativedroid.godesign.ch']);
		        if (loc) {
		            _gaq.push(['_trackPageview', loc]);
		        } else {
		            _gaq.push(['_trackPageview']);
		        }
		    } catch(err) {
				console.log(err);		
		    }
		}
	}
	
	theme = {
		theme : "dark",
		color : "green",
		pathCSS : "css/",
		oppositeTheme : function() {
			return (this.theme == "light") ? "dark" : "light";
		},
		switchTheme : function() {
			$(".theme-trigger a").removeClass("active");
			$(".theme-trigger ."+this.oppositeTheme()).addClass("active");
			this.theme = this.oppositeTheme();
			$(".device iframe").contents().find("#jQMnDTheme").attr("href",this.pathCSS+this.getCSS[this.theme]);
		},
		switchColor : function(newColor) {
			$(".color-trigger a.active").removeClass("active");
			$(".color-trigger a."+newColor).addClass("active");
			this.color = newColor;
			$(".device iframe").contents().find("#jQMnDColor").attr("href",this.pathCSS+this.getCSS[this.color]);
		},
		getCSS : {
			dark : "jquerymobile.nativedroid.dark.css",
			light : "jquerymobile.nativedroid.light.css",
			blue : "jquerymobile.nativedroid.color.blue.css",
			green : "jquerymobile.nativedroid.color.green.css",
			purple : "jquerymobile.nativedroid.color.purple.css",
			red : "jquerymobile.nativedroid.color.red.css",
			yellow : "jquerymobile.nativedroid.color.yellow.css"
		},
		updateIframe : function() {
			$(".device iframe").contents().find("#jQMnDTheme").attr("href",this.pathCSS+this.getCSS[this.theme]);
			$(".device iframe").contents().find("#jQMnDColor").attr("href",this.pathCSS+this.getCSS[this.color]);
		}
	}
	
	device = {
		orientation : "portrait",
		device : "phone",
		landscape : function() {
//			$(".device").addClass("rotate-landscape");
			$(".device").addClass("landscape").removeClass("portrait");
			this.orientation = "landscape";
			this.position();
		},
		portrait : function() {
//			$(".device").addClass("rotate-portrait");
			$(".device").addClass("portrait").removeClass("landscape");
			this.orientation = "portrait";
			this.position();
		},
		phone : function() {
			$(".device").addClass("phone").removeClass("tablet").removeClass("small");
			this.device = "phone";
			this.position();
		},
		tablet : function() {
			$(".device").addClass("tablet").removeClass("phone").removeClass("small");
			this.device = "tablet";
			this.position();
		},
		smalltablet : function() {
			$(".device").addClass("tablet").addClass("small").removeClass("phone");
			this.device = "smalltablet";
			this.position();
		},
		position : function() {
			$(".dropShadow").css({
				width: $(".device").width()-50+"px",
				height: $(".device").height()-50+"px"
			});
			$(".device,.dropShadow").position({
				of : $(window)
			});
			this.naviUpdate();
		},
		naviUpdate : function() {
			$(".device-trigger a").removeClass("active").removeClass("landscape").removeClass("portrait");
			$(".device-trigger a").addClass(this.orientation);
			$(".device-trigger a[href='#device-"+this.device+"']").addClass('active');
		},
		autorotate : function() {
			return (device.orientation == "landscape") ? this.portrait() : this.landscape();
		}
	}
	
	$(".device-trigger").on("click","a",function(e) {
		if($(this).hasClass("active")) {
			// Rotate
			device.autorotate();
			e.preventDefault();
		} else {
			// Switch device
			deviceType = $(this).attr('href');
			deviceArr = deviceType.split("-");
			newDevice = deviceArr[1];
			device[newDevice]();
			e.preventDefault();
		}
	});	
	
	$(".theme-trigger").on("click","a",function(e) {
		if(!$(this).hasClass("active")) {
			theme.switchTheme();
			e.preventDefault();
		} else {
			e.preventDefault();
		}
	});
	
	$(".color-trigger").on("click","a:not([href='#color-custom'])",function(e) {
		if($(this).hasClass("active")) {
			// Do Nothing
			e.preventDefault();
		} else {
			// Switch color
			color = $(this).attr('href');
			colorArr = color.split("-");
			newColor = colorArr[1];
			theme.switchColor(newColor);
			e.preventDefault();
		}
	});	
	
	$(window).on("resize",function() {
		device.position();
	});
	
	$(".device iframe").load(function() {
		analytics.update();
		theme.updateIframe();
	});
	
	$("#TriggerPaypalDonation").click(function(e) {
		e.preventDefault();
		$("#PaypalDonationForm").submit();
	});
	
	// Initial
	
	settings.redirectMobile();
	device.phone();
	
	
	
});
