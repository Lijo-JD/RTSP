import {
  GET_VIDEO_STREAM_BEGIN,
  GET_VIDEO_STREAM_FAILURE,
  GET_VIDEO_STREAM_SUCCESS,
} from "../actions/StreamAction";

const initstate = {
  loading: false,
  error: null,
  response: null,
};

const streamReducer = (state = initstate, action) => {
  console.log(action.type);
  switch (action.type) {
    case GET_VIDEO_STREAM_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_VIDEO_STREAM_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
      };
    case GET_VIDEO_STREAM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default streamReducer;
