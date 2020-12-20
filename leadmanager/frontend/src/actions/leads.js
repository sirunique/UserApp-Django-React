import axios from 'axios';
import { GET_LEADS, DELETE_LEADS, ADD_LEAD, GET_ERRORS } from './types';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

// GET LEADS
export const getLeads = () => (dispatch, getState) => {
  axios
    .get('/api/leads/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE LEAD
export const deleteLead = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/leads/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteLead: 'Lead Deleted' }));
      dispatch({
        type: DELETE_LEADS,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD LEAD
export const addLead = (lead) => (dispatch, getState) => {
  axios
    .post('/api/leads/', lead, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addLead: 'Lead Added' }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    // .catch((err) => console.log(err.response.data));
    // .catch((err) => {
    //   const errors = {
    //     msg: err.response.data,
    //     status: err.response.status,
    //   };
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: errors,
    //   });
    // });

    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
