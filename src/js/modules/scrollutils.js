define(['libs/throttle','libs/howler'], function(throttle,Howler){
    var lazyloadContainers;
   	var lazyLoadTargets = [];
    var animationTargets = [];
    var audioTargets = [];
    var audioFiles = [];
    var currentAudio = 0;
    var newAudio;
    var muteState = false;
    var menuEl;
    var menuHeight;
    var menuFixed = false;
    var isMobile;
    var mobileLoaded = false;

   	var windowHeight;
   	var windowWidth;
    var windowTop;
    var activeOffset = 100;

    var scrollutils = {
        init: function() {
            lazyLoadContainers = document.querySelectorAll('.lazyload-container');
            var audioSections = document.querySelectorAll('.audio-section');
            menuEl = document.querySelector('.watchman__menu');
            scrollutils.initAudio();

            for (var i=0; i<lazyLoadContainers.length; i++){
                var offsetTop;
                if(lazyLoadContainers[i].className.indexOf('watchman__window') > -1){
                    offsetTop = lazyLoadContainers[i].parentElement.parentElement.offsetTop;
                }else{
                    offsetTop = lazyLoadContainers[i].offsetTop
                }
                lazyLoadTargets.push({
                    el: lazyLoadContainers[i],
                    position: offsetTop
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
                    el: audioSections[i],
                    audio: audioFiles[i]
                })
            }

            var throttleLoader = throttle(function(){
                windowHeight = window.innerHeight;
                windowWidth = window.innerWidth;
                windowTop  = window.pageYOffset || document.documentElement.scrollTop;

                scrollutils.lazyload();
                scrollutils.pauseAnimations();
                scrollutils.switchAudio();
                scrollutils.fixedNav();
            },500)

            window.addEventListener("resize", throttleLoader, false );
            window.addEventListener("scroll", throttleLoader, false );

            throttleLoader();
        },

        initAudio:function(){
            if((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) && window.innerWidth < 980){
                muteState = true;
                isMobile = true;
                document.querySelector('.ambient__icon--off').style.display = 'block';
                document.querySelector('.ambient__icon--on').style.display = 'none';
            }
            
            audioFiles.push(new Howler.Howl({
              urls: ['http://interactive.guim.co.uk/2015/07/watchman-audio/v2/1-train-interior.mp3'],
              volume: 0,
              loop:true
            }))
            audioFiles.push(new Howler.Howl({
              urls: ['http://interactive.guim.co.uk/2015/07/watchman-audio/v2/2-train-exterior.mp3'],
              volume: 0,
              loop:true
            }))
            audioFiles.push(new Howler.Howl({
              urls: ['http://interactive.guim.co.uk/2015/07/watchman-audio/v2/3-car-interior.mp3'],
              volume: 0,
              loop:true
            })) 
            
            console.log(muteState)
            if(!muteState){
                audioFiles[currentAudio].play();
                audioFiles[currentAudio].fade(0, 0.8, 4000);
            }
            
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
        			var imageSrc = "@@assetPath@@/assets/" + imageList[i].getAttribute('data-image');
        			imageList[i].style.backgroundImage = "url(" + imageSrc + ")";
        		}
        	}else if( $(lazyloadContainer).attr('data-image') ){
        		var imageSrc = "@@assetPath@@/assets/" + lazyloadContainer.getAttribute('data-image');
        		lazyloadContainer.style.backgroundImage = "url(" + imageSrc + ")";
        	}
        },

        switchAudio: function(){
            for (var i=0; i<audioTargets.length; i++){
                audioTargets[i].offset = audioTargets[i].el.getBoundingClientRect().top;
                if(audioTargets[i].offset < 0){
                    newAudio = i;
                }
            }

            if(newAudio > -1 && newAudio !== currentAudio){
                var oldAudio = currentAudio;
                currentAudio = newAudio;

                if(!muteState){
                    audioFiles[currentAudio].play();
                    audioFiles[currentAudio].fade(0, 0.8, 4000);
                    if(oldAudio > -1){
                        audioFiles[oldAudio].fade(0.8, 0, 4000,function(){
                            audioFiles[oldAudio].pause();
                        });
                    }
                } 
            }
        },

        muteSwitch: function(muted){
            muteState = muted;

            if(!muteState){
                audioFiles[currentAudio].play();
                audioFiles[currentAudio].fade(0, 0.8, 500);
            }else{
                audioFiles[currentAudio].fade(0.8,0, 500,function(){
                    audioFiles[currentAudio].pause();
                });
            }
        },

        fixedNav: function(){
            if(!menuFixed){
                if(lazyLoadContainers[0].getBoundingClientRect().top + lazyLoadContainers[0].getBoundingClientRect().height + menuEl.getBoundingClientRect().height < 0){
                    menuFixed = true;
                    menuHeight = $(".watchman__menu").height();
                    $(".watchman__menu-placeholder").height(menuHeight);
                    $(".watchman__menu").addClass('fixed');
                    $(".watchman__menu-placeholder").addClass('fixed');
                }
            }else{
                if(lazyLoadContainers[0].getBoundingClientRect().top + lazyLoadContainers[0].getBoundingClientRect().height + menuHeight > 0){
                    menuFixed = false;
                    $(".watchman__menu").removeClass('fixed');
                    $(".watchman__menu-placeholder").removeClass('fixed');
                }
            }
        }
    };

    return scrollutils;
});