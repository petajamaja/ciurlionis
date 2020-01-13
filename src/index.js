require('normalize.css/normalize.css');
require('./styles.scss');
require('./scrollbar-default-override.scss');
/**
 * Hash navigation module
 */
require('./animated-sliding/navbar-arrows.scss');
require('./animated-sliding/animated-sliding.scss');
require('./animated-sliding/animated-sliding.js');

window.onGalleryModeSelect = function onGalleryModeSelect(id) {
    this.document.getElementById(id).classList.add('selected');
}