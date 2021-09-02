import Axios from "axios";

export const GET_VIDEO_STREAM_BEGIN = "GET_VIDEO_STREAM_BEGIN";
export const GET_VIDEO_STREAM_SUCCESS = "GET_VIDEO_STREAM_SUCCESS";
export const GET_VIDEO_STREAM_FAILURE = "GET_VIDEO_STREAM_FAILURE";

export const getStreamBegin = () => ({
  type: GET_VIDEO_STREAM_BEGIN,
});

export const getStreamSuccess = (data) => ({
  type: GET_VIDEO_STREAM_SUCCESS,
  payload: data,
});

export const getStreamFailure = (error) => ({
  type: GET_VIDEO_STREAM_FAILURE,
  payload: { error },
});

export const getRTSPVideoStream = (data) => {
  return (dispatch) => {
    dispatch(getStreamBegin());
    return Axios.post("/stream/get_url_stream", data)
      .then(
        (res) => dispatch(getStreamSuccess(res)),
        (err) => dispatch(getStreamFailure(err))
      )
      .catch((err) => {
        dispatch(getStreamFailure(err));
      });
  };
};
