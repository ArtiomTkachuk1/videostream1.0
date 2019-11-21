import React from 'react'
import ReactPlayer from 'react-player'
export default class RP extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: 'http://localhost:3000/video1' };
  }
  ChunkRootUpdater=()=>{
      if(this.state.url!=="http://localhost:3000/video2"){
        this.setState({
          url:"http://localhost:3000/video2"
        })
      }
  }
  render(){
    return (
      <ReactPlayer url={this.state.url} playing={true} muted={true}
          onEnded={
            () =>this.ChunkRootUpdater()
          }
      />
    )
  }
}
