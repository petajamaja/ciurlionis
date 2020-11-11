let toggleGallery = function(){
    if (document.getElementById('cycles').checked) {
        document.getElementsByClassName('gallery-cycles')[0].classList.add('hidden');
        document.getElementsByClassName('gallery-colors')[0].classList.remove('hidden');
        window.changePagesSize('art-div');
    } else {
        document.getElementsByClassName('gallery-cycles')[0].classList.remove('hidden');
        document.getElementsByClassName('gallery-colors')[0].classList.add('hidden');
        window.changePagesSize('art-div');
    }
}

window.toggleGallery = toggleGallery;