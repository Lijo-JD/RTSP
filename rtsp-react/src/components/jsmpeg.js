import React from "react";
import ReactHlsPlayer from 'react-hls-player';

const Jsmpeg = (props) => {
  return(
    <ReactHlsPlayer
    src={props.url}
    autoPlay={false}
    controls={true}
    width="100%"
    height="auto"
  />
  )
};

export default Jsmpeg;
