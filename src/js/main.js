// Javascript that is inline. Should be used for anything that needs to be immediate
import jquery from 'jquery';
window.$ = jquery;

import share from './modules/share.js';
import audio from './modules/audio.js';
import scroll from './modules/scroll.js';

share.init();
audio.init();
scroll.init();
