import React, { Component } from 'react'
import RP from './ReactPlayer'
import VideoPlayer from './VideoPlayer'

const videoJsOptions = {
  autoplay: true,
  muted: true,
  controls: true,
  sources: [{
    src: 'http://localhost:3000/video',
    type: 'video/mp4'
  }]
}



class App extends Component{

  render(){
    return(
      <React.Fragment>
        <div>"kra1"</div>
        <RP/>
        <div>"kra2"</div>
        <VideoPlayer {...videoJsOptions}/>
      </React.Fragment>
    )
  }
}

export default App;
