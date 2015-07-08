define(['libs/throttle','libs/howler'], function(throttle,Howler){
   	var lazyLoadTargets = [];
    var animationTargets = [];
    var audioTargets = [];
    var audioFiles = [];

   	var windowHeight;
   	var windowWidth;
    var windowTop;
    var activeOffset = 100;

    var scrollutils = {
        init: function() {
            var lazyLoadContainers = document.querySelectorAll('.lazyload-container');
            var audioSections = document.querySelectorAll('.audio-section');
            scrollutils.initAudio();

            for (var i=0; i<lazyLoadContainers.length; i++){
                lazyLoadTargets.push({
                    el: lazyLoadContainers[i],
                    position: lazyLoadContainers[i].offsetTop
                })
                animationTargets.push({
                    el: lazyLoadContainers[i],
                    height: lazyLoadContainers[i].getBoundingClientRect().height,
                    active: false,
                    offset: 0
                })
            }

            for (var i=0; i<audioSections.length; i++){
                audioTargets.push({
                    el: audioTargets[i],
                    audio: audiofiles[i]
                })
            }

            var throttleLoader = throttle(function(){
                windowHeight = window.innerHeight;
                windowWidth = window.innerWidth;
                windowTop  = window.pageYOffset || document.documentElement.scrollTop;

                scrollutils.lazyload();
                scrollutils.pauseAnimations();
                scrollutils.switchAudio();
            },500)

            window.addEventListener("resize", throttleLoader, false );
            window.addEventListener("scroll", throttleLoader, false );

            throttleLoader();
        },

        initAudio:function(){
            audioFiles.push(new Howler.Howl({
              urls: ['http://interactive.guim.co.uk/2015/06/photo-story-audio/Henley.mp3']
            }))
            console.log(audioFiles);
        },

        pauseAnimations: function(){
            for (var i=0; i<animationTargets.length; i++){
                animationTargets[i].offset = animationTargets[i].el.getBoundingClientRect().top;

                if(animationTargets[i].offset - activeOffset < windowHeight && animationTargets[i].offset + animationTargets[i].height + activeOffset > 0 && !animationTargets[i].active){
                    animationTargets[i].active = true;
                    animationTargets[i].el.className = animationTargets[i].el.className + " activeAnimation";
                }

                if(animationTargets[i].active){
                    if(animationTargets[i].offset + activeOffset + animationTargets[i].height < 0  || animationTargets[i].offset - activeOffset > windowHeight){
                        animationTargets[i].active = false;
                        animationTargets[i].el.className = animationTargets[i].el.className.replace(" activeAnimation","")
                    }
                }   
            }
        },

        lazyload: function(){
        	var i = lazyLoadTargets.length;
        	while (i--) {
        	    if(lazyLoadTargets[i].position <= windowTop + windowHeight*2 ){
        	        scrollutils.loadimages(lazyLoadTargets[i].el)
        	        lazyLoadTargets.splice(i,1)
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
        },

        switchAudio: function(){
            
        }
    };

    return scrollutils;
});