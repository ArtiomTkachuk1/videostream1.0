import React from 'react'

var sourceBuffer=null;

export default class VideoTag extends React.Component {
  constructor(props) {
    super(props);
    this.MediaSource = new MediaSource();
    this.src=URL.createObjectURL(this.MediaSource);
    this.MediaSource.addEventListener('sourceopen', this.sourceOpen, { once: true });
    this.mimecodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

  }
  processStream = (data) => {
      if (data.done) {
        return;
      }
      // append chunk of stream to `sourceBuffer`
      sourceBuffer.appendBuffer(data.value);
    }
  sourceOpen=(event)=>{
      // if the media type is supported by `mediaSource`
      // fetch resource, begin stream read,
      // append stream to `sourceBuffer`
      sourceBuffer = this.MediaSource.addSourceBuffer(this.mimecodec);
      // set `sourceBuffer` `.mode` to `"sequence"`
      sourceBuffer.mode = "sequence";

      fetch("http://localhost:3000/video/1")
        // return `ReadableStream` of `response`
        .then(response => response.body.getReader())
        .then(reader => {

          this.processStream(response.data);
            // at `sourceBuffer` `updateend` call `reader.read()`,
            // to read next chunk of stream, append chunk to
            // `sourceBuffer`
          sourceBuffer.addEventListener("updateend", updateend=()=>{
            reader.read().then(this.processStream(data));
          });
          // start processing stream
          reader.read().then(this.processStream(data));
          // do stuff `reader` is closed,
          // read of stream is complete
          return reader.closed.then(() => {
            // signal end of stream to `mediaSource`
            this.MediaSource.endOfStream();
            return this.MediaSource.readyState;
          })
        })
        // do stuff when `reader.closed`, `mediaSource` stream ended
        .then(msg => console.log(msg))
    };
  /*sourceOpen=()=>{
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
  }*/
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
