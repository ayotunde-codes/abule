/* eslint-disable no-lone-blocks */
import Axios from 'axios';
import { GET_ALL_CAPTIONS, ADD_CAPTION_TAG } from './actionTypes';

export const getAllCaptions = () => async (dispatch) => {
  let status;
  let msg;
  try {
    const response = await Axios.get('https://capcards-api.herokuapp.com/v1.0/api/caption/');
    status = response.data.status;
    msg = 'Captions Gotten Successfully';
    dispatch(setNotification(status, msg));
    dispatch(
      {
        type: GET_ALL_CAPTIONS,
        payload: response.data.data.captions,
      },
    );
  } catch (error) {
    {
      error.message.startsWith('Network')
        ? dispatch(setNotification(error.status, error.message))
        : dispatch(setNotification(error.response.data.error.status, error.response.data.error.status));
    }
  }
};

export const addCaption = (caption) => async (dispatch) => {
  let status;
  let msg;
  try {
    const res = await Axios.post('https://capcards-api.herokuapp.com/v1.0/api/caption/', caption);
    status = res.data.status;
    msg = 'Caption Added Successfully';
    dispatch(setNotification(status, msg));
  } catch (error) {
    {
      error.message.startsWith('Network')
        ? dispatch(setNotification(error.status, error.message))
        : dispatch(setNotification(error.response.status, error.response.data.error.message));
    }
  }
};

export const addCaptionTag = (id) => async (dispatch) => {
  let status;
  let msg;
  let tag;
  let captions;
  try {
    const res = await Axios.get(`https://capcards-api.herokuapp.com/v1.0/api/caption/withTag?tagId=${id}`);
    console.log(res);
    status = res.data.status;
    msg = 'Caption Tags Added Successfully';
    tag = res.data.data.tag;
    captions = res.data.data.captions;
    dispatch({
      type: ADD_CAPTION_TAG,
      payload: {
        tag, captions,
      },
    });
    if (captions.length < 1) return dispatch(setNotification('404', `No Captions For ${tag}, Please Try again for another Tag`));
    dispatch(setNotification(status, msg));
  } catch (error) {
    // return console.log(error.response)
    {
      error.message.startsWith('Network')
        ? dispatch(setNotification(error.status, error.message))
        : dispatch(setNotification(error.response.status, error.response.data.error.message));
    }
  }
};
