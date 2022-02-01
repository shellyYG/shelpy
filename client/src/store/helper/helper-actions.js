import axios from 'axios';
import { notificationActions } from '../notification/notification-slice';
import { helperActions } from './helper-slice';

const getHelperAuthStatusPath = '/api/helper/get-auth-status';
const helperSignUpPasswordPath = '/api/helper/signup-password';
const helperSignInPath = 'api/helper/sign-in';
const userRequestFormPath = '/api/helper/request';
const activeHelperPath = '/api/helper/active-helpers';
const getAllOrdersPath = 'api/helper/all-orders';

export const getAuthStatus = () => {
  return async (dispatch) => {
    try {
      const generalToken = localStorage.getItem('shelper-token');
      if (!generalToken) {
        throw Error('NO_TOKEN');
      }
      if (generalToken) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + generalToken,
        };
        const response = await axios.post(
          getHelperAuthStatusPath,
          {},
          { headers }
        );
        dispatch(
          helperActions.updateAuthStatus({
            isAuthenticated: response.data.isAuthenticated,
            userId: response.data.userId,
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        helperActions.updateAuthStatus({
          isAuthenticated: false,
        })
      );
    }
  };
};

export const getAllOrders = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(getAllOrdersPath, {
        params: { userId: data.userId },
      });
      dispatch(
        helperActions.updateActiveAndPastOrders({
          allOrders: response.data.allOrders,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        helperActions.updateActiveAndPastOrders({
          allOrders: [],
        })
      );
    }
  };
};

export const onClickUpdateActiveServiceType = (data) => {
  return async (dispatch) => {
    dispatch(
      helperActions.onClickUpdateActiveServiceType({
        globalServiceType: data.globalServiceType,
      })
    );
  };
};
export const onClickUpdateActiveJobOrUniTarget = (data) => {
  return async (dispatch) => {
    dispatch(
      helperActions.onClickUpdateActiveJobOrUniTarget({
        globalJobOrUniTarget: data.globalJobOrUniTarget,
      })
    );
  };
};
export const onClickUpdateActiveNavigateTarget = (data) => {
  return async (dispatch) => {
    dispatch(
      helperActions.onClickUpdateActiveNavigateTarget({
        globalNavigateTarget: data.globalNavigateTarget,
      })
    );
  };
};
export const onClickUpdateActiveRequest = (data) => {
  return async (dispatch) => {
    dispatch(
      helperActions.onClickUpdateActiveRequest({
        globalActiveRequest: data.globalActiveRequest,
      })
    );
  };
};
export const onClickUpdateActiveHelperLists = (data) => {
  return async (dispatch) => {
    try {
      const activeHelpers = await axios.post(activeHelperPath, {
        data,
      });
      dispatch(
        helperActions.onClickUpdateActiveHelperLists({
          globalActiveHelperLists: activeHelpers,
        })
      );
    } catch (err) {
      console.error(err);
      notificationActions.setNotification({
        signUpEmailStatus: 'error',
        signUpEmailStatusTitle: 'Oops!',
        signUpEmailStatusMessage: `Error: ${err}`,
      });
    }
  };
};

export const postHelperSignUpEmail = (data) => {
  return async (dispatch) => {
    try {
      // update global Helper state:
      dispatch(
        helperActions.updateHelperInfoAfterInsertEmail({
          email: data.email,
        })
      );
      dispatch(
        notificationActions.setNotification({
          signUpEmailStatus: 'success',
          signUpEmailStatusTitle: 'Email successfully submitted.',
          signUpEmailStatusMessage: 'Create password to complete Sign-Up.',
        })
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(
          notificationActions.setNotification({
            signUpEmailStatus: 'error',
            signUpEmailStatusTitle: 'Oops!',
            signUpEmailStatusMessage: error.response.data,
          })
        );
      }
    }
  };
};
export const postHelperSignUpPassword = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(helperSignUpPasswordPath, {
        data,
      });
      window.localStorage.setItem('shelper-token', response.data.accessToken);
      dispatch(
        helperActions.updateHelperInfoAfterInsertPassword({
          password: data.password,
        })
      );
      dispatch(
        notificationActions.setNotification({
          signUpPasswordStatus: 'success',
          signUpPasswordStatusTitle: 'Password successfully created.',
          signUpPasswordStatusMessage: 'Password successfully created.',
        })
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(
          notificationActions.setNotification({
            signUpPasswordStatus: 'error',
            signUpPasswordStatusTitle: 'Oops!',
            signUpPasswordStatusMessage: error.response.data,
          })
        );
      }
    }
  };
};

export const postHelperSignInData = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(helperSignInPath, {
        data,
      });
      window.localStorage.setItem('shelpy-token', response.data.accessToken);
      dispatch(
        helperActions.updateHelperInfoAfterSignIn({
          email: data.email,
        })
      );
      dispatch(
        notificationActions.setNotification({
          signInStatus: 'success',
          signInStatusTitle: 'Successfully Signed-In.',
          signInStatusMessage: 'Successfully Signed-In.',
        })
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(
          notificationActions.setNotification({
            signInStatus: 'error',
            signInStatusTitle: 'Oops!',
            signInStatusMessage: error.response.data,
          })
        );
      }
    }
  };
};

export const postHelperRequestForm = (data) => {
  return async (dispatch) => {
    try {
      const generalToken = localStorage.getItem('shelpy-token');
      if (!generalToken) {
        throw Error('NO_TOKEN');
      }
      if (generalToken) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + generalToken,
        };
        const response = await axios.post(
          userRequestFormPath,
          {
            data,
          },
          { headers }
        );
        data.requestId = response.data.requestId;
        dispatch(
          notificationActions.setNotification({
            requestStatus: 'success',
            requestStatusTitle: 'You are all set!',
            requestStatusMessage:
              'We will inform you via email as soon as we find a helper!',
          })
        );
      }
    } catch (error) {
      const errorResponse = error.response ? error.response.data : '';
      const errorMessage = errorResponse || error.message;
      if (errorMessage) {
        dispatch(
          notificationActions.setNotification({
            requestStatus: 'error',
            requestStatusTitle: 'Oops!',
            requestStatusMessage: errorMessage,
          })
        );
      }
    }
  };
};

export const clearRequestStatus = (data) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.setNotification({
        requestStatus: 'initial',
        requestStatusTitle: '',
        requestStatusMessage: '',
      })
    );
  };
};

export const clearSignUpEmailStatus = (data) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.setNotification({
        signUpEmailStatus: 'initial',
        signUpEmailStatusTitle: '',
        signUpEmailStatusMessage: '',
      })
    );
  };
};

export const clearSignUpPasswordStatus = (data) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.setNotification({
        signUpPasswordStatus: 'initial',
        signUpPasswordStatusTitle: '',
        signUpPasswordStatusMessage: '',
      })
    );
  };
};

export const clearSignInStatus = (data) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.setNotification({
        signInStatus: 'initial',
        signInStatusTitle: '',
        signInStatusMessage: '',
      })
    );
  };
};

export const clearRequestFormStatus = (data) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.setNotification({
        requestFormStatus: 'initial',
        requestFormStatusTitle: '',
        requestFormStatusMessage: '',
      })
    );
  };
};

export const onSubmitUpdateUniData = (data) => {
  const { school, department, country, degree, notes } = data;
  return async (dispatch) => {
    dispatch(
      helperActions.onSubmitUpdateUniData({
        school,
        department,
        country,
        degree,
        notes,
      })
    );
  };
};

export const onSubmitUpdateJobData = (data) => {
  const { industry, job, country, WFH, companySize, years, notes } = data;
  return async (dispatch) => {
    dispatch(
      helperActions.onSubmitUpdateJobData({
        industry,
        job,
        country,
        WFH,
        companySize,
        years,
        notes,
      })
    );
  };
};

export const onSubmitUpdateSelfEmployedData = (data) => {
  const { type, profession, country, years, notes } = data;
  return async (dispatch) => {
    dispatch(
      helperActions.onSubmitUpdateSelfEmployedData({
        type,
        profession,
        country,
        years,
        notes,
      })
    );
  };
};
