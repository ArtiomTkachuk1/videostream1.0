import React from 'react'
export default class Video extends React.Component {
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
      <video
          src={URL}
          playing={true}
          muted={true}
          onEnded={
            ()=>this.ChunkRootUpdater()
          }
      />
    )
  }
}
