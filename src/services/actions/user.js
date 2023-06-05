import { request } from "../../utils/api";
import { setCookie, getCookie } from "../../utils/cookie";

export const RESTORE_PASSWORD_REQUEST = 'RESTORE_PASSWORD_REQUEST';
export const RESTORE_PASSWORD_SUCCESS = 'RESTORE_PASSWORD_SUCCESS';
export const RESTORE_PASSWORD_FAILED = 'RESTORE_PASSWORD_FAILED';
export const SUCCESS_RESET = 'SUCCESS_RESET';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED = 'PATCH_USER_FAILED';

const valuePasswordPost = (inputEmail) => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "email": inputEmail
    })
  }
}

export const restorePassword = (inputEmail) => {
  return (dispatch) => {
    dispatch({
      type: RESTORE_PASSWORD_REQUEST,
    });
    request('password-reset', valuePasswordPost(inputEmail))
    .then(res => {
      dispatch({
        type: RESTORE_PASSWORD_SUCCESS,
        success: res.success,
      });
    })
    .catch(err => {
      dispatch({
        type: RESTORE_PASSWORD_FAILED,
        error: err.message,
      })
    })
  }
}

const registerPost = (inputEmail, inputPassword, inputName) => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "email": inputEmail,
      "password": inputPassword,
      "name": inputName
    })
  }
}

export const registerUser = (inputEmail, inputPassword, inputName) => {
  return(dispatch) => {
    dispatch({
      type: REGISTER_USER_REQUEST
    });
    request('auth/register', registerPost(inputEmail, inputPassword, inputName))
    .then(res => {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: REGISTER_USER_SUCCESS,
          success: res.success,
          email: res.user.email,
          name: res.user.name,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        })
    })
    .catch(err => {
      dispatch({
        type: REGISTER_USER_FAILED,
        error: err.message
      });
    })
  }
}

const resetPasswordPost = (inputPassword, inputCode) => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "password": inputPassword,
      "token": inputCode
    })
  }
}

export const resetPassword = (inputPassword, inputCode) => {
  return(dispatch) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    request('password-reset/reset', resetPasswordPost(inputPassword, inputCode))
    .then(res => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        reset: res.success,
      });
    })
    .catch(err => {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        error: err.message
      });
    })
  }
}

const userLoginPost = (inputEmail, inputPassword) => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "email": inputEmail,
      "password": inputPassword
    })
  }
}

export const userLogin = (inputEmail, inputPassword) => {
  return(dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    request('auth/login', userLoginPost(inputEmail, inputPassword))
    .then((res) => {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: LOGIN_SUCCESS,
            authorizedUser: res.success,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
            email: res.user.email,
            name: res.user.name
          });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILED,
        error: err.message
      })
    })
  }
}

const refreshToken = () => {
  return {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      "token": localStorage.getItem("refreshToken"),
    })
  }
}

export const updateUserToken = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_TOKEN_REQUEST
    });
    request('auth/token', refreshToken())
      .then((res) => {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        });
      })
      .catch(err => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
          error: err.message,
        });
      })
  }
}

const userGet = () => {
  return {
    method: 'GET',
    headers: {"Content-Type": "application/json", authorization: "Bearer " + getCookie("accessToken")}
  }
}

export const getUser = () => {
  return(dispatch) => {
    dispatch({
      type: GET_USER_REQUEST
    })
    request('auth/user', userGet())
      .then(res => {
        dispatch({
          type: GET_USER_SUCCESS,
          email: res.user.email,
          name: res.user.name,
          success: res.success
        });
      })
      .catch(err => {
        dispatch({
          type: GET_USER_FAILED,
          error: err.message
        })
        dispatch(updateUserToken());
      })
  }
}

const userLogoutData = () => {
  return {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      "token": localStorage.getItem("refreshToken"),
    })
  }
}

export const logoutUser = () => {
  return(dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST
    });
    request('auth/logout', userLogoutData())
      .then(res => {
        setCookie("accessToken", "");
        localStorage.removeItem("refreshToken");
        dispatch({
          type: LOGOUT_SUCCESS,
          accessToken: "",
          refreshToken: ""
        });
      })
    .catch(err => {
      dispatch({
        type: LOGOUT_FAILED,
        error: err.message
      })
    })
  }
}

const patchUserData = (inputEmail, inputName, inputPassword) => {
  return {
    method: "PATCH",
    headers: {"Content-Type": "application/json", Authorization: "Bearer " + getCookie("accessToken")},
    body: JSON.stringify({
      "email": inputEmail,
      "name": inputName,
      "password": inputPassword
    })
  }
}

export const patchUser = (inputEmail, inputName, inputPassword) => {
  return(dispatch) => {
    dispatch({
      type: PATCH_USER_REQUEST
    });
    request('auth/user', patchUserData(inputEmail, inputName, inputPassword))
      .then(res => {
        dispatch({
          type: PATCH_USER_SUCCESS,
          email: res.user.email,
          name: res.user.name,
          success: res.success
        });
      })
      .catch(err => {
        dispatch({
          type: PATCH_USER_FAILED,
          error: err.message
        });
      })
  }
}