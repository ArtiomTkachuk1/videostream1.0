import React from 'react'
export default class VideoTag extends React.Component {
  constructor(props) {
    super(props);
    this.pathbase='http://localhost:3000/video/'
    this.state = {
        chunknum : 1
      };
  }
  ChunkRootUpdater=()=>{
      if(this.props.chunk_max>this.state.chunknum){
        this.setState({
          chunknum:this.state.chunknum+1
        })
    }
  }
  render(){
    let src = this.pathbase + this.state.chunknum
    return (
      <React.Fragment>
        <h1
        style={{
              justifyContent:"center",
              display:"flex",
              margin:"auto",
            }}
        >
          Video tag
        </h1>
        <video
        style={{
              width:"30%",
              height:"20%",
              display:"flex",
              margin:"auto",
              backgroundColor:"black",
            }}
          autoPlay
          muted
          src={src}
          onEnded={this.ChunkRootUpdater}
        />
      </React.Fragment>
    )
  }
}
