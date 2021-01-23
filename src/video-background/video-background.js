var player;
var videoId = 'ftA-3uHUsrc';
var isUnMuted = false;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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
      'id': 'ftA-3uHUsrc',
      'clips': [
        {'start': 171, 
         'end': 200,
         'scale': '1'
        },
        {'start': 26,
        'end': 35,
        'scale': '2.5'
        },
        {'start': 250, 
         'end': 270,
         'scale': '1'
        }
      ]      
    },
    {
      'id': 'TX_6web_lb8',
      'clips': [
        {'start': 24, 
         'end': 31,
         'scale': '1.5'
        },
        {'start': 32, 
         'end': 59,
         'scale': '2.4'
        },
        {'start': 84, 
         'end': 99,
         'scale': '2.4'
        },
        {'start': 115, 
         'end': 150,
         'scale': '1.5'
        },
        {'start': 115, 
         'end': 150,
         'scale': '2.4'
        }
      ]      
    }
    // {
    //   'id': 'a1YUX21knEk',
    //   'clips': [
    //     {'start': 9, 
    //      'end': 200,
    //      'scale': '1.5'
    //     }
    //   ]      
    // }
  ];
var currentVideoId = 0;
var currentClipId = 0;
var newVideoLoaded = false;

function scale(scale){
    var videoFrame =  document.getElementById('youtube-video');
    let style = videoFrame.style;
    style.mozTransform = 'scale(' + scale + ')';
    style.msTransform = 'scale(' + scale + ')';
    style.oTransform = 'scale(' + scale + ')';
    style.transform = 'scale(' + scale + ')';
}

function getVideoClip(){
    return ({
      'videoId': videoList[currentVideoId].id,
      'startSeconds': videoList[currentVideoId].clips[currentClipId].start,
      'endSeconds': videoList[currentVideoId].clips[currentClipId].end
    });
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

function onPlayerStateChange(event) {
    // the video is playing
    if (event.data == YT.PlayerState.PLAYING) {
      document.getElementById('youtube-video').classList.add('active');
    // the video has been paused ( most cases ) or ended ( something unexpected, this state should never occur ) or cued
    } else if ( event.data == YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED || event.data == YT.PlayerState.CUED){
        document.getElementById('youtube-video').classList.remove('active');
        setNextClip();
       // if a new video needs to be loaded
       if( newVideoLoaded ){
         player.loadVideoById(getVideoClip());
         newVideoLoaded = false;
       // if it's just the next clip of the same video
       }else{
        player.seekTo(videoList[currentVideoId].clips[currentClipId].start);
        player.playVideo();
        setTimeout(function(){
           player.pauseVideo();
         }, (videoList[currentVideoId].clips[currentClipId].end - videoList[currentVideoId].clips[currentClipId].start) * 1000);
       }
      scale(videoList[currentVideoId].clips[currentClipId].scale);
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
    player.loadVideoById(getVideoClip());
    scale(videoList[0].clips[0].scale);
    player.mute();
}

function vidRescale(){
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

window.onload = vidRescale;
window.onresize = vidRescale;