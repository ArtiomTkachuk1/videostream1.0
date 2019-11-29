import React, { Component } from 'react'
import RP from './components/ReactPlayer/ReactPlayer'
import VideoTag from './components/VideoTag/VideoTagv0'
import VideojsPlayer from './components/VideojsPlayer/VideojsPlayer'




class App extends Component{

  render(){
    return(
      <React.Fragment>
        <RP
          chunk_max={6}
        />
        <VideoTag
          chunk_max={6}
        />
      </React.Fragment>
    )
  }
}

export default App;

/*
<VideojsPlayer
  chunk_max={6}
/>
*/
