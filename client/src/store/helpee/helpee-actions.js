import axios from 'axios';
import { notificationActions } from '../notification/notification-slice'; 
import { helpeeActions } from "./helpee-slice";

const helpeeSignUpEmailPath = '/api/helpee-signup-email';
const helpeeSignUpPasswordPath = "/api/helpee-signup-password";
const helpeeSignInPath = 'api/helpee/sign-in';
const userRequestFormPath = "/api/helpee-request-form";
const testPath = '/api/test';
const activeHelperPath = '/api/active-helpers'

export const onClickUpdateActiveServiceType = (data) => {
  return async (dispatch) => {
    dispatch(
      helpeeActions.onClickUpdateActiveServiceType({
        globalServiceType: data.globalServiceType,
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
export const fetchHelpeeData = () => {
  console.log('..............running fetchHelpeeData');
    return async (dispatch) => {
        try {
            // const response = await axios.get(userPath);
            // const data = { response };
            
            
            // here
            // const data = {
            //   helpeeName: '',
            //   helpeeLanguage: '',
            //   serviceType: 'testtest',
            // };
            // console.log('~~ replaceHelpeeInfo');
            // dispatch(
            //   helpeeActions.replaceHelpeeInfo({
            //     helpeeName: data.helpeeName,
            //     helpeeLanguage: data.helpeeLanguage,
            //     serviceType: data.serviceType,
            //   })
            // );

            // test api
            const response = await axios.get(testPath);
            console.log('response from API: ', response);
        } catch (err) {
            notificationActions.setNotification({
              signUpEmailStatus: 'error',
              signUpEmailStatusTitle: 'Oops!',
              signUpEmailStatusMessage: `Error: ${err}`,
            });
        }
    }
}

export const postHelpeeSignUpEmail = (data) => {
  return async (dispatch) => {
    try {
      // talk to API:
      await axios.post(helpeeSignUpEmailPath, {
        data,
      });
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
      if (error.response) {
        console.log('error.response exist...');
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
      // talk to API:
      await axios.post(helpeeSignUpPasswordPath, {
        data,
      });
      // update global Helpee state:
      dispatch(
        helpeeActions.updateHelpeeInfoAfterInsertPassword({
          helpeePassword: data.helpeePassword,
        })
      );
    } catch (err) {
      console.error(err);
      notificationActions.setNotification({
        signUpEmailStatus: 'error',
        signUpEmailStatusTitle: 'Oops!',
        signUpEmailStatusMessage: `Insert password error: ${err}`,
      });
    }
  };
};

export const postHelpeeSignInData = (data) => {
  return async (dispatch) => {
    try {
      // talk to API:
      await axios.post(helpeeSignInPath, {
        data,
      });
      // update global Helpee state:
      dispatch(
        helpeeActions.updateHelpeeInfoAfterSignIn({
          helpeeEmail: data.email,
          token: data.token,
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

export const postHelpeeServiceRequestForm = (data) => {
  return async (dispatch) => {
    try {
      // talk to API:
      await axios.post(userRequestFormPath, {
        data,
      });
      // update global Helpee state:
      dispatch(
        helpeeActions.updateHelpeeInfoAfterInsertEmail({
          data
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