import React , { Component } from 'react';
import VideoPlayer from './VideoPlayer'
const videoJsOptions = {
  autoplay : true,
  muted : true,
  controls : true,
  sources : [{
    src: 'http://localhost:3000/video/1',
    type: 'video/mp4'
  }]
}


export default class VideojsPlayer extends Component{
  render(){
    return <VideoPlayer { ...videoJsOptions } />
  }
}
