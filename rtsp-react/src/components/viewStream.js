import React, { useState, useEffect } from "react";
import Jsmpeg from "./jsmpeg";

const ViewStream = (props) => {
  const [renderState, setRenderState] = useState([]);

  const url = "ws://localhost:9999";

  useEffect(() => {
    renderVideo(props.count);
  }, [props.count]);

  const renderVideo = (len) => {
    const row = Math.ceil(len / 2);
    const arr = [];
    let j = 0;
    for (let i = 0; i < row; i++) {
      const arr1 = [];
      for (let k = 0; j < len && k < 2; k++) {
        arr1.push(true);
        j++;
      }
      arr.push(arr1);
    }
    setRenderState(arr);
  };
  return (
    <div className="container">
      {renderState.map((item, key) => (
        <div className="row" key={key}>
          {item.map(
            (list, index) =>
              list && (
                <div className="col-md-6" key={index}>
                  <Jsmpeg url={url}/>
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewStream;
