let slidingPanelsOpen = function(){
    return document.getElementById('signature').classList.contains('hidden');
}

let browserSupportsHistoryAPI = function() {
    return !!(window.history && history.pushState);
}

let dispatchPopStateEvent = function() {
    if (typeof PopStateEvent !== "undefined") {
        window.dispatchEvent(new PopStateEvent("popstate"));
        return;
    }
    try {
        window.dispatchEvent(new Event("popstate"));
        return;
    } catch (error) {
    }

    const ieEvent = document.createEvent("Event");
    ieEvent.initEvent("popstate", true, true);
    window.dispatchEvent(ieEvent);
}

let removeHash = function() { 
    let location = window.location;
    if (browserSupportsHistoryAPI() && location.hash){
        history.pushState("", document.title, location.pathname + location.search);
        dispatchPopStateEvent();
    }else{
        location.hash = "";
    } 
}

let checkHashChange = function() {
    switch(window.location.hash){
        case '#':
        case '': 
            if(slidingPanelsOpen()) hideAll();
            break;
        case '#art':
            makeVisible('art-div');
            break;
        case '#music':
            makeVisible('music-div');
            break;
        default:
            break;
    }
}

let hideNavigationArrows = function() {
    document.getElementById('arrow-art').classList.add('hidden');
    document.getElementById('arrow-music').classList.add('hidden');
    document.getElementById('ampersand').classList.add('hidden');
    document.getElementById('signature').classList.add('hidden');
    document.getElementById('back-button').classList.remove('hidden');
}

let showNavigationArrows = function() {
    document.getElementById('arrow-art').classList.remove('hidden');
    document.getElementById('arrow-music').classList.remove('hidden');
    document.getElementById('ampersand').classList.remove('hidden');
    document.getElementById('signature').classList.remove('hidden');
    document.getElementById('back-button').classList.add('hidden');
}

let showSlidingPanel = function(elementId) {
    document.getElementById(elementId).classList.add('fronting');
    hideNavigationArrows();
}

let hideAllSlidingPanels = function() {
    document.getElementById('art-div').classList.remove('fronting');
    document.getElementById('music-div').classList.remove('fronting');
    showNavigationArrows();
    removeHash();
}

let adjustSlidingPanelsSize = function () {
    let heightOfMain = document.getElementById('init').offsetHeight;
    document.getElementById('music-div').style.height = heightOfMain + "px";
    document.getElementById('music-content').style.height = heightOfMain + "px";
    document.getElementById('art-div').style.height = heightOfMain + "px";
    document.getElementById('art-content').style.height = heightOfMain + "px";
}

window.onresize = adjustSlidingPanelsSize;
window.hideAll = hideAllSlidingPanels;
window.makeVisible = showSlidingPanel;
window.onpopstate = checkHashChange;

// initial adjustment
adjustSlidingPanelsSize();