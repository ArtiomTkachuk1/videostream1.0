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
        <h1
        style={{
              justifyContent:"center",
              display:"flex",
              margin:"auto",
            }}
        >
          React player
        </h1>
        <ReactPlayer
          style={{
  							width:"120%",
  							height:"80%",
  							display:"flex",
  							margin:"auto",
  							backgroundColor:"black",
  						}}
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
