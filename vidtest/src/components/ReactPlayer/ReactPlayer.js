import React from 'react'
import ReactPlayer from 'react-player'
export default class RP extends React.Component {
  constructor(props) {
    super(props);
    this.pathbase='http://localhost:3000/video/'
    this.state = {chunknum : 1};
  }

  ChunkRootUpdater=()=>{
      if(this.props.chunk_max>this.state.chunknum){
        this.setState({
          chunknum:this.state.chunknum+1
        })
    }
  }
  render(){
    let URL=this.pathbase+this.state.chunknum
    return (
      <React.Fragment>
        React player
        <ReactPlayer
            url={URL}
            playing={true}
            muted={true}
            onEnded={
              () =>this.ChunkRootUpdater()
            }
        />
      </React.Fragment>
    )
  }
}
