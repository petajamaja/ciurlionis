var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

const playerDefaultSettings = {
    autoplay: 1, 
    autohide: 1, 
    modestbranding: 0, 
    rel: 0, 
    showinfo: 0, 
    controls: 0, 
    disablekb: 1, 
    enablejsapi: 0, 
    iv_load_policy: 3,
};

var videoList = [    
    {
      'id': '8J3KhkSvcOo',
      'clips': [
        {'start': 16, 
         'end': 30,
         'scale': '1.5',
         'color-end': '#C3C380'
        },
        {'start': 81, 
         'end': 100,
         'scale': '2.4',
         'color-end':  '#B089A1'
        },
        {'start': 145, 
         'end': 157,
         'scale': '1.5',
         'color-end': '#2A0D21'
        },
        {'start': 158, 
         'end': 191,
         'scale': '2.4',
         'color-end': '#CCB47C'
        }
      ]      
    },
    {
      'id': 'ftA-3uHUsrc',
      'clips': [
        {'start': 171, 
        'end': 201,
        'scale': '1',
        'color-end':  '#4B5356' 
        },
        {'start': 250, 
        'end': 270,
        'scale': '1',
        'color-end': '#DEAF51' 
        },
        {'start': 316, 
        'end': 334,
        'scale': '1',
        'color-end': '#577285'
        },
        {'start': 357, 
        'end': 374,
        'scale': '1',
        'color-end':  '#383038'
        }
      ]      
    }
  ];

var currentVideoId = 0;
var currentClipId = 0;
var newVideoLoaded = false;

function scale(videoScale){
    var videoFrame =  document.getElementById('youtube-video');
    let style = videoFrame.style;
    style.mozTransform = 'scale(' + videoScale + ')';
    style.msTransform = 'scale(' + videoScale + ')';
    style.oTransform = 'scale(' + videoScale + ')';
    style.transform = 'scale(' + videoScale + ')';
}

function getVideoClip(){
    return ({
      'videoId': videoList[currentVideoId].id,
      'startSeconds': videoList[currentVideoId].clips[currentClipId].start,
      'endSeconds': videoList[currentVideoId].clips[currentClipId].end,
      'suggestedQuality': 'hd720'
    });
}

function getVideoClipStart(){
  return videoList[currentVideoId].clips[currentClipId].start;
}
function getVideoClipEnd(){
  return videoList[currentVideoId].clips[currentClipId].end;
}
function getVideoClipScale(){
  return videoList[currentVideoId].clips[currentClipId].scale;
}
function getVideoClipLength(){
  return (getVideoClipEnd() - getVideoClipStart()) * 1000;
}
function getBackgroundColor(){
  return videoList[currentVideoId].clips[currentClipId]["color-end"];
}

function setupPause(timeout){
  setTimeout(function(){
    player.pauseVideo();
    document.getElementsByClassName('youtube-background')[0].style.background = getBackgroundColor();
  }, timeout);
}

function loadNewVideo(){
  player.loadVideoById(getVideoClip());
  // pause the video one second before the actual end of the clip
  // to prevent the appearance of the loading wheel when the clip ends
  setupPause(getVideoClipLength() - 1000);
}

function setNextClip(){
    // if current chunk is not the last
       if(currentClipId !== videoList[currentVideoId].clips.length - 1){
         currentClipId+=1;
       // if the current chunk is the last  
       }else{
         // start with the first chunk again
         currentClipId = 0;
         // and either continue to the next video or start the loop over
         currentVideoId = (currentVideoId === videoList.length - 1) ? 0 : currentVideoId + 1;
         // if there is only one video that we just rewind clips in, never set this parameter
         if(videoList.length !== 1) newVideoLoaded = true;
     }
}

function showFrame(){
  document.getElementById('youtube-video').classList.add('active');
}

function hideFrame(){
  document.getElementById('youtube-video').classList.remove('active');
}

function onPlayerStateChange(event) {
    // the video is playing
    if (event.data == YT.PlayerState.PLAYING) {
      showFrame();
    }
    else if (event.date == YT.PlayerState.BUFFERING) {
      hideFrame();
    }
    // the video has been paused ( most cases ) or ended/cued ( something unexpected, this state should never occur )
    else if ( event.data == YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED || event.data == YT.PlayerState.CUED){
        hideFrame();
        setNextClip();
       // if a new video needs to be loaded
       if( newVideoLoaded ){
         loadNewVideo();
         newVideoLoaded = false;
       // if it's just the next clip of the same video
       }else{
        player.seekTo(getVideoClipStart(), true);
        player.playVideo();
        setupPause(getVideoClipLength());
       }
      scale(getVideoClipScale());
    }
  }

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-video', {
        playerVars: playerDefaultSettings,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(){
    loadNewVideo();
    scale(getVideoClipScale());
    player.mute();
}

function rescaleVideo(){
  var w = window.innerWidth+200, h = window.innerHeight+200;
  let video = document.getElementById('youtube-video');
  let css = video.style; 
  if (w/h > 16/9){
    player.setSize(w, w/16*9);
    css.left = '0px';
    } else {
      player.setSize(h/9*16, h);
      video.left = -(video.outerWidth-w)/2 + 'px';
  }
}

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
window.onPlayerReady = onPlayerReady;
window.onPlayerStateChange = onPlayerStateChange;

window.onload = rescaleVideo;
window.onresize = rescaleVideo;