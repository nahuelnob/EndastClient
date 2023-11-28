import { EDIT_AIN0, EDIT_AIN1, EDIT_AIN2, EDIT_AIN3, EDIT_DIN0, EDIT_DIN1, EDIT_DIN2, EDIT_DIN3} from "./types";

export const editDin0 = (userData) => {
    return async function (dispatch) {
      try {
        return dispatch({
          type: EDIT_DIN0,
          payload: userData,
        });
      } catch (error) {
        showErrorAlert(error.message);
      }
    };
  };
export const editDin1 = (userData) => {
    return async function (dispatch) {
      try {
        return dispatch({
          type: EDIT_DIN1,
          payload: userData,
        });
      } catch (error) {
        showErrorAlert(error.message);
      }
    };
  };
export const editDin2 = (userData) => {
    return async function (dispatch) {
      try {
        return dispatch({
          type: EDIT_DIN2,
          payload: userData,
        });
      } catch (error) {
        showErrorAlert(error.message);
      }
    };
  };
export const editDin3 = (userData) => {
    return async function (dispatch) {
      try {
        return dispatch({
          type: EDIT_DIN3,
          payload: userData,
        });
      } catch (error) {
        showErrorAlert(error.message);
      }
    };
  };
/////////////////////////////////////////////////////
export const editAin0 = (userData) => {
    return async function (dispatch) {
      try {
        return dispatch({
          type: EDIT_AIN0,
          payload: userData,
        });
      } catch (error) {
        showErrorAlert(error.message);
      }
    };
  };
export const editAin1 = (userData) => {
    return async function (dispatch) {
      try {
        return dispatch({
          type: EDIT_AIN1,
          payload: userData,
        });
      } catch (error) {
        showErrorAlert(error.message);
      }
    };
  };
export const editAin2 = (userData) => {
    return async function (dispatch) {
      try {
        return dispatch({
          type: EDIT_AIN2,
          payload: userData,
        });
      } catch (error) {
        showErrorAlert(error.message);
      }
    };
  };
export const editAin3 = (userData) => {
    return async function (dispatch) {
      try {
        return dispatch({
          type: EDIT_AIN3,
          payload: userData,
        });
      } catch (error) {
        showErrorAlert(error.message);
      }
    };
  };