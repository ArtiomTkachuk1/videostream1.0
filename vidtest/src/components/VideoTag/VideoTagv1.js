import React from 'react'
export default class VideoTag extends React.Component {
  constructor(props) {
    super(props);
    this.mediaSource = new MediaSource();
    this.src = URL.createObjectURL(this.mediaSource);
    this.mediaSource.addEventListener('sourceopen', this.sourceOpen, { once: true });
  }
  sourceOpen=()=>{
    URL.revokeObjectURL(this.src);
    const sourceBuffer = this.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
    fetch('http://localhost:3000/video/1')//, { headers: { range: 'bytes=0-567139' } })
      .then(response => response.arrayBuffer())
        .then(data => {
          sourceBuffer.appendBuffer(data);
          sourceBuffer.addEventListener('updateend', this.updateEnd, { once: true });
        });
  }
  fetchNextSegment=()=>{
    fetch('http://localhost:3000/video/2')//, { headers: { range: 'bytes=567140-1196488' } })
    .then(response => response.arrayBuffer())
    .then(data => {
      const sourceBuffer = this.mediaSource.sourceBuffers[0];
      sourceBuffer.appendBuffer(data);
      // TODO: Fetch further segment and append it.
    });
  }
  render(){
    return (
      <React.Fragment>
        Videotag
        <video
          src={this.src}
          onPlaying={this.fetchNextSegment}
        />
      </React.Fragment>
    )
  }
}
