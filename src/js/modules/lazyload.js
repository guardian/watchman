define(['libs/throttle'], function(throttle){
   	var lazyLoadContainers;
   	var targets = [];
   	var windowHeight;
   	var windowWidth;

    var lazyloader = {
        init: function() {
            lazyLoadContainers = document.querySelectorAll('.lazyload-container');

            for (var i=0; i<lazyLoadContainers.length; i++){
                targets.push({
                    el: lazyLoadContainers[i],
                    position: lazyLoadContainers[i].offsetTop
                })
            }

            var throttleLoader = throttle(function(){
                windowHeight = window.innerHeight;
                windowWidth = window.innerWidth;
                lazyloader.lazyload()
            },500)

            window.addEventListener("resize", throttleLoader, false );
            window.addEventListener("scroll", throttleLoader, false );
        },

        lazyload: function(){
        	var windowTop  = window.pageYOffset || document.documentElement.scrollTop;
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