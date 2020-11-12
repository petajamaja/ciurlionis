let mybutton = document.getElementsByClassName("scroll-top")[0];

let scrollFunction = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 110) {
        mybutton.style.display = "block";
    }else{
        mybutton.style.display = "none";
    }
}

let scrollOnTop = function () {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
}

window.scrollOnTop = scrollOnTop;
window.onscroll = scrollFunction;
