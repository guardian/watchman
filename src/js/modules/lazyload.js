define(['libs/jquery','libs/throttle'], function(jQuery,throttle){
   	var lazyLoadContainers;
   	var targets = [];
   	var windowHeight;
   	var windowWidth;

    var lazyloader = {
        init: function() {
        	console.log('hoi')
            lazyLoadContainers = $('.lazyload-container');

            lazyLoadContainers.map(function(i,j){
                targets.push({
                    el: j,
                    position: j.offsetTop
                })
            })

            var throttleLoader = throttle(function(){
                windowHeight = window.innerHeight;
                windowWidth = window.innerWidth;
                lazyloader.lazyload()
            },500)

            $(window).on('scroll',throttleLoader)
            $(window).on('resize',throttleLoader)
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
        	var imageList = $(lazyloadContainer).find('[data-image]');

        	if(imageList.length > 0){
        		$.each(imageList,function(i,el){
        			var imageSrc = "http://localhost:8000/assets/" + $(el).attr('data-image');
        			$(el).css('background-image','url(' + imageSrc +')')
        		})
        	}else if( $(lazyloadContainer).attr('data-image') ){
        		var imageSrc = "http://localhost:8000/assets/" + $(lazyloadContainer).attr('data-image');
        		$(lazyloadContainer).css('background-image','url(' + imageSrc +')')
        	}
        }
    };

    return lazyloader;
});