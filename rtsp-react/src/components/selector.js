import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { getRTSPVideoStream } from "../actions/StreamAction";
import _ from "lodash";

const Selector = (props) => {
  const { loading, error, response } = useSelector(
    (state) => ({
      loading: state.streamReducer.loading,
      error: state.streamReducer.error,
      response: state.streamReducer.response,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    url: "",
    max: 0,
  });
  const [valError, setValError] = useState(false);
  const ref = useRef(false);

  const pattern = /(rtsp):\/\/([^\s/:]+)(?::([0-9]+))?(\/.*)/gm;

  useEffect(() => {
    if (ref.current) {
      if (pattern.test(formData.url)) {
        dispatch(getRTSPVideoStream({ url: formData.url }));
        setValError(false);
      } else {
        setValError(true);
      }
    } else {
      ref.current = true;
    }
  }, [formData]);
  
  const onInputChange = (e) => {
    const obj = { ...formData };
    obj[e.target.name] = e.target.value;
    setFormData(obj);
  };

  const handleSelectChange = (e) => {
    props.select(parseInt(e));
  };

  return (
    <div className="container">
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">Enter URL:</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          type="text"
          value={formData.url}
          name="url"
          aria-label="url"
          aria-describedby="url"
          onChange={onInputChange}
          isInvalid={valError}
        />
        <Form.Control.Feedback type="invalid">
          Invalid URL!
        </Form.Control.Feedback>
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon2">Enter Max Value:</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          type="number"
          name="max"
          value={formData.max}
          aria-label="limit"
          aria-describedby="limit"
          onChange={onInputChange}
        />
      </InputGroup>
      <InputGroup>
        <Form.Control
          placeholder="Enter count to view"
          aria-label="Enter count"
          aria-describedby="Enter count"
          disabled
        />
        <Dropdown
          as={InputGroup.Append}
          variant="outline-secondary"
          title="Count"
          id="input-group-dropdown-2"
          onSelect={handleSelectChange}
        >
          <Dropdown.Toggle>Count</Dropdown.Toggle>
          <Dropdown.Menu>
            {_.range(1, parseInt(formData.max) + 1).map((num) => (
              <Dropdown.Item eventKey={num}>{num}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </InputGroup>
    </div>
  );
};

export default Selector;
