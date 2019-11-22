import React, { Component } from 'react'
import RP from '.components/ReactPlayer'
import Video from '.components/Video'
import VideoPlayer from '.components/VideoPlayer'

const videoJsOptions = {
  autoplay: true,
  muted: true,
  controls: true,
  sources: [{
    src: 'http://localhost:3000/video1',
    type: 'video/mp4'
  }]
}


class App extends Component{

  render(){
    return(
      <React.Fragment>
        React player
        <RP
          chunk_max={6}
        />
        Videotag
        <Video
          chunk_max={6}
        />
        videojs
        <VideoPlayer
          {...videoJsOptions}
        />
      </React.Fragment>
    )
  }
}

export default App;\
