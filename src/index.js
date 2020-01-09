require('normalize.css/normalize.css');
require('./styles.scss');
require('./navbar-arrows.scss');
require('./scrollbar-default-override.scss');
require('./animated-sliding.scss');

let browserSupportsHistoryAPI = function() {
    return !!(window.history && history.pushState);
}

let removeHash = function() { 
    if(browserSupportsHistoryAPI()) {
        history.pushState("", document.title, 
                window.location.pathname + window.location.search);
    }
}

let hideNavigationArrows = function() {
    document.getElementById('arrow-art').classList.add('hidden');
    document.getElementById('arrow-music').classList.add('hidden');
    document.getElementById('slash').classList.add('hidden');
    document.getElementById('signature').classList.add('hidden');
    document.getElementById('back-button').classList.remove('hidden');
}

let showNavigationArrows = function() {
    document.getElementById('arrow-art').classList.remove('hidden');
    document.getElementById('arrow-music').classList.remove('hidden');
    document.getElementById('slash').classList.remove('hidden');
    document.getElementById('signature').classList.remove('hidden');
    document.getElementById('back-button').classList.add('hidden');
}

window.makeVisible = function makeVisible(elementId) {
    document.getElementById(elementId).classList.add('fronting');
    hideNavigationArrows();
}

window.hideAll = function hideAll() {
    document.getElementById('art').classList.remove('fronting');
    document.getElementById('music').classList.remove('fronting');
    removeHash();
    showNavigationArrows();
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
                if (browserSupportsHistoryAPI()) history.pushState({}, '', link);
            }
        }, true);
    };
}

let adjustSize = function () {
    let heightOfMain = document.getElementById('init').offsetHeight;
    document.getElementById('music').style.height = heightOfMain + "px";
    document.getElementById('music-content').style.height = heightOfMain + "px";
    document.getElementById('art').style.height = heightOfMain + "px";
    document.getElementById('art-content').style.height = heightOfMain + "px";
}

// initial adjustment
adjustSize();
preventHashFocus();

window.onresize = adjustSize;