require('normalize.css/normalize.css');
require('./styles.scss');
require('./navbar-arrows.scss');
require('./scrollbar-default-override.scss');
require('./animated-sliding.scss');

let removeHash = function() { 
    if(browserSupportsHistoryAPI()) {
        history.pushState("", document.title, 
                window.location.pathname + window.location.search);
    }
}

let browserSupportsHistoryAPI = function() {
    return !!(window.history && history.pushState);
}

window.makeVisible = function makeVisible(elementId) {
    document.getElementById(elementId).classList.add('visible');
}

window.hide = function hide(elementId) {
    document.getElementById(elementId).classList.remove('visible');
    removeHash();
}

let preventHashFocus = function () {
    let anchors = document.getElementsByTagName("a");
    for (let i = 0, length = anchors.length; i < length; i++) {
        let anchor = anchors[i];
        anchor.addEventListener('click', function () {
            let link = this.getAttribute('href');
            if (link && link[0] == "#") {
                event.preventDefault();
                // if the API is not supported, just ignore hashes overall
                if (browserSupportsHistoryAPI()) history.pushState({}, '', url);
            }
        }, true);
    };
}

let adjustSize = function () {
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
preventHashFocus();

window.onresize = adjustSize;