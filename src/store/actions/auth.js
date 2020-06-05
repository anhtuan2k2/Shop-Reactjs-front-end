import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 100000);
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
    };
    let url = 'http://localhost:5000/api/v1/users/login';

    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 100000
        );
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.data.user._id);

        dispatch(authSuccess(response.data.token, response.data.data.user._id));
        // dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.message));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('useId');
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const registerStart = () => {
  return {
    type: actionTypes.REGISTER_START,
  };
};
export const registerSuccess = (token, userId) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    idToken: token,
    userId: userId,
  };
};
export const registerFail = (error) => {
  return {
    type: actionTypes.REGISTER_FAIL,
    error: error,
  };
};
export const register = (some) => {
  return (dispatch) => {
    dispatch(registerStart());
    console.log(some);
    const summer = {
      name: some.name,
      email: some.email,
      password: some.password,
      passwordConfirm: some.confirmPassword,
    };
    let url = 'http://localhost:5000/api/v1/users/signup';

    axios
      .post(url, summer)
      .then((response) => {
        console.log(response);
        dispatch(
          registerSuccess(response.data.token, response.data.data.user._id)
        );
        // dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(registerFail(err.response.data.message));
      });
  };
};

//done
