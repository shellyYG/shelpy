import axios from 'axios';
import { notificationActions } from './notification-slice'; 
import { helpeeActions } from "./helpee-slice";

const getHelpeeAuthStatusPath = '/api/helpee/get-auth-status';
const helpeeSignUpPasswordPath = '/api/helpee/signup-password';
const helpeeSignInPath = '/api/helpee/sign-in';
const oldUserRequestFormPath = '/api/helpee/request-form'; // depreciated
const userRequestFormPath = '/api/helpee/request';
const activeHelperPath = '/api/helpee/active-helpers';
const getAllOrdersPath = '/api/helpee/all-orders';
const helpeeProfilePicUploadPath = '/api/helpee/profile-pic-upload';
const helpeeBasicFormWithoutCertificatePath = '/api/helpee/basic-form';

export const getHelpeeAuthStatus = () => {
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
          getHelpeeAuthStatusPath,
          {},
          { headers }
        );
        dispatch(
          helpeeActions.updateAuthStatus({
            isHelpeeAuthenticated: response.data.isHelpeeAuthenticated,
            helpeeUserId: response.data.helpeeUserId,
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        helpeeActions.updateAuthStatus({
          isHelpeeAuthenticated: false,
        })
      );
    }
  }
}

export const getAllOrders = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(getAllOrdersPath, {
        params: { helpeeUserId: data.helpeeUserId },
      });
      dispatch(
        helpeeActions.updateActiveAndPastOrders({
          allOrders: response.data.allOrders,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        helpeeActions.updateActiveAndPastOrders({
          allOrders: [],
        })
      );
    }
  };
};

export const onClickUpdateActiveServiceType = (data) => { // legacy
  return async (dispatch) => {
    dispatch(
      helpeeActions.onClickUpdateActiveServiceType({
        globalServiceType: data.globalServiceType,
      })
    );
  };
};

export const onClickUpdateActiveSelectedHelper = (data) => {
  return async (dispatch) => {
    dispatch(
      helpeeActions.onClickUpdateActiveSelectedHelper({
        selectedHelper: data.selectedHelper,
      })
    );
  };
}
export const onClickUpdateHelpeeActiveJobOrUniTarget = (data) => {
  return async (dispatch) => {
    dispatch(
      helpeeActions.onClickUpdateHelpeeActiveJobOrUniTarget({
        globalHelpeeJobOrUniTarget: data.globalHelpeeJobOrUniTarget,
      })
    );
  };
};
export const onClickUpdateActiveNavigateTarget = (data) => {
  return async (dispatch) => {
    dispatch(
      helpeeActions.onClickUpdateActiveNavigateTarget({
        globalNavigateTarget: data.globalNavigateTarget,
      })
    );
  };
};
export const onClickUpdateActiveRequest = (data) => {
  return async (dispatch) => {
    dispatch(
      helpeeActions.onClickUpdateActiveRequest({
        globalActiveRequest: data.globalActiveRequest,
      })
    );
  }
}
export const onClickUpdateActiveHelperLists = (data) => {
  return async (dispatch) => {
    try {
      const activeHelpers = await axios.post(activeHelperPath, {
        data,
      });
      dispatch(
        helpeeActions.onClickUpdateActiveHelperLists({
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
}

export const postHelpeeSignUpEmail = (data) => {
  return async (dispatch) => {
    try {
      // update global Helpee state:
      dispatch(
        helpeeActions.updateHelpeeInfoAfterInsertEmail({
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
export const postHelpeeSignUpPassword = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(helpeeSignUpPasswordPath, {
        data,
      });
      window.localStorage.setItem('shelpy-token', response.data.accessToken);
      dispatch(
        helpeeActions.updateHelpeeInfoAfterInsertPassword({
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

export const postHelpeeSignInData = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(helpeeSignInPath, {
        data,
      });
      window.localStorage.setItem('shelpy-token', response.data.accessToken);
      dispatch(
        helpeeActions.updateHelpeeInfoAfterSignIn({
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
    };
  };
}

// depreciated
export const postHelpeeServiceRequestForm = (data) => {
  return async (dispatch) => {
    try {
      const generalToken = localStorage.getItem('shelpy-token');
      if (!generalToken) {
        throw Error('NO_TOKEN');
      }
      if (generalToken){
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + generalToken,
        };
        const response = await axios.post(
          oldUserRequestFormPath,
          {
            data,
          },
          { headers }
        );
        data.requestId = response.data.requestId;
        dispatch(
          helpeeActions.updateHelpeeRequestFormData({
            data,
          })
        );
        dispatch(
          notificationActions.setNotification({
            requestFormStatus: 'success',
            requestFormStatusTitle: 'You are all set!',
            requestFormStatusMessage:
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
            requestFormStatus: 'error',
            requestFormStatusTitle: 'Oops!',
            requestFormStatusMessage: errorMessage,
          })
        );
      }
    }
  };
};

export const onUploadHelpeeProfilePicture = (data) => {
  console.log('onUploadHelpeeProfilePicture...data: ', data);
  return async (dispatch) => {
    try {
      const generalToken = localStorage.getItem('shelper-token');
      if (!generalToken) {
        throw Error('NO_TOKEN');
      }
      if (generalToken) {
        const headers = {
          Authorization: 'Bearer ' + generalToken,
        };
        const response = await axios.post(helpeeProfilePicUploadPath, data, {
          headers,
        });
        const { imagePath } = response.data;
        console.log('imagePath: ', imagePath);
        dispatch(
          helpeeActions.updateProfilePicPath({
            helpeeProfilePicPath: imagePath,
          })
        );
      }
    } catch (error) {
      console.error('upload error: ', error);
    }
  };
};

export const onSubmitUploadHelpeeData = (data) => {
  return async (dispatch) => {
    const postPath = helpeeBasicFormWithoutCertificatePath;
    try {
      const generalToken = localStorage.getItem('shelpy-token');
      if (!generalToken) {
        throw Error('NO_TOKEN');
      }
      if (generalToken) {
        const headers = {
          Authorization: 'Bearer ' + generalToken,
        };
        const response = await axios.post(postPath, data, {
          headers,
        });
        data.requestId = response.data.requestId;
        dispatch(
          notificationActions.setNotification({
            applyHelpeeStatus: 'success',
            applyHelpeeStatusTitle: 'You are almost there!',
            applyHelpeeStatusMessage:
              'NOW: select the experiences you want to know.',
          })
        );
      }
    } catch (error) {
      console.error('upload error: ', error);
      const errorResponse = error.response ? error.response.data : '';
      const errorMessage = errorResponse || error.message;
      if (errorMessage) {
        dispatch(
          notificationActions.setNotification({
            applyHelpeeStatus: 'error',
            applyHelpeeStatusTitle: 'Oops!',
            applyHelpeeStatusMessage: errorMessage,
          })
        );
      }
    }
  };
};

export const postHelpeeRequestForm = (data) => {
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
}

export const onSubmitUpdateHelpeeUniData = (data) => {
  const { school, department, country, degree, notes } = data;
  return async (dispatch) => {
    dispatch(
      helpeeActions.onSubmitUpdateHelpeeUniData({
        school,
        department,
        country,
        degree,
        notes,
      })
    );
  };
};

export const onSubmitUpdateHelpeeJobData = (data) => {
  const { industry, job, country, WFH, companySize, years, notes } = data;
  return async (dispatch) => {
    dispatch(
      helpeeActions.onSubmitUpdateHelpeeJobData({
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

export const onSubmitUpdateHelpeeSelfEmployedData = (data) => {
  const { type, profession, country, years, notes } = data;
  return async (dispatch) => {
    dispatch(
      helpeeActions.onSubmitUpdateHelpeeSelfEmployedData({
        type,
        profession,
        country,
        years,
        notes,
      })
    );
  };
};

export const clearApplyHelpeeStatus = (data) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.setNotification({
        applyHelpeeStatus: 'initial',
        applyHelpeeStatusTitle: '',
        applyHelpeeStatusMessage: '',
      })
    );
  };
};