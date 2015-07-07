define(['libs/throttle'], function(throttle){
   	var lazyLoadContainers;
   	var targets = [];
    var activeAnimations = [];
   	var windowHeight;
   	var windowWidth;
    var windowTop;

    var lazyloader = {
        init: function() {
            lazyLoadContainers = document.querySelectorAll('.lazyload-container');

            for (var i=0; i<lazyLoadContainers.length; i++){
                targets.push({
                    el: lazyLoadContainers[i],
                    position: lazyLoadContainers[i].offsetTop
                })
                activeAnimations.push({
                    el: lazyLoadContainers[i],
                    height: lazyLoadContainers[i].getBoundingClientRect().height,
                    active: false,
                    offset: 0
                })
            }

            var throttleLoader = throttle(function(){
                windowHeight = window.innerHeight;
                windowWidth = window.innerWidth;
                windowTop  = window.pageYOffset || document.documentElement.scrollTop;

                lazyloader.lazyload();
                lazyloader.pauseAnimations();
            },500)

            window.addEventListener("resize", throttleLoader, false );
            window.addEventListener("scroll", throttleLoader, false );

            throttleLoader();
        },

        pauseAnimations: function(){
            for (var i=0; i<activeAnimations.length; i++){
                activeAnimations[i].offset = activeAnimations[i].el.getBoundingClientRect().top;

                if(activeAnimations[i].offset < windowHeight && activeAnimations[i].offset + activeAnimations[i].height > 0 && !activeAnimations[i].active){
                    activeAnimations[i].active = true;
                    activeAnimations[i].el.className = activeAnimations[i].el.className + " activeAnimation";
                }

                if(activeAnimations[i].active){
                    if(activeAnimations[i].offset + activeAnimations[i].height < 0  || activeAnimations[i].offset > windowHeight){
                        activeAnimations[i].active = false;
                        activeAnimations[i].el.className = activeAnimations[i].el.className.replace(" activeAnimation","")
                    }
                }   
            }
        },

        lazyload: function(){
        	var i = targets.length;
        	while (i--) {
        	    if(targets[i].position <= windowTop + windowHeight*2 ){
        	        lazyloader.loadimages(targets[i].el)
        	        targets.splice(i,1)
        	    }
        	}
        },

        loadimages: function(lazyloadContainer){
        	var imageList = lazyloadContainer.querySelectorAll('*[data-image]');

        	if(imageList.length > 0){
        		for(var i=0; i<imageList.length; i++){
        			var imageSrc = "http://localhost:8000/assets/" + imageList[i].getAttribute('data-image');
        			imageList[i].style.backgroundImage = "url(" + imageSrc + ")";
        		}
        	}else if( $(lazyloadContainer).attr('data-image') ){
        		var imageSrc = "http://localhost:8000/assets/" + lazyloadContainer.getAttribute('data-image');
        		lazyloadContainer.style.backgroundImage = "url(" + imageSrc + ")";
        	}
        }
    };

    return lazyloader;
});