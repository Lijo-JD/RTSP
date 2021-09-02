import React, { useState } from "react";
import Selector from "./selector";
import ViewStream from "./viewStream";

const Main = () => {
  const [count, setCount] = useState(0);

  const selectCount = (cnt) => {
    setCount(cnt);
  };
  return (
    <div className="container">
      <div className="container row">
        <Selector select={selectCount} />
      </div>
      <div className="container row">
        <ViewStream count={count} />
      </div>
    </div>
  );
};

export default Main;
