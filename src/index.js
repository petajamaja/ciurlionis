require('normalize.css/normalize.css');
require('./styles.scss');
require('./navbar-arrows.scss');
require('./scrollbar-default-override.scss');
require('./animated-sliding.scss');

window.makeVisible = function makeVisible(elementId){
    this.console.log("making " + elementId + " visible");
    document.getElementById(elementId).classList.add('visible');
}

window.hide = function hide(elementId){
    document.getElementById(elementId).classList.remove('visible');
    window.history.back(1);
}

let adjustSize = function(){
    let heightOfMain = document.getElementById('init').offsetHeight;
    let heightOfHeader = document.getElementById('header').offsetHeight;
    document.getElementById('music').style.height = heightOfMain + heightOfHeader + "px";
    document.getElementById('music-content').style.height = heightOfMain + "px";
    document.getElementById('art').style.height = heightOfMain + heightOfHeader + "px";
    document.getElementById('art-content').style.height = heightOfMain + "px";
    document.getElementsByClassName('side-panel-header')[0].style.height = heightOfHeader + "px";
    document.getElementsByClassName('side-panel-header')[1].style.height = heightOfHeader + "px";
}
// initial adjustment
adjustSize();
window.onresize = adjustSize;