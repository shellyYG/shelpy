import axios from 'axios';
import { notificationActions } from '../notification/notification-slice'; 
import { helpeeActions } from "./helpee-slice";

const userSignUpEmailPath = '/api/helpee-signup-email';
const userSignUpPasswordPath = "/api/helpee-signup-password";
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
      notificationActions.showNotification({
        status: "error",
        title: "Error!",
        message: `Error: ${err}`,
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
          console.log('...oops error!err: ', err);
            notificationActions.showNotification({
              status: 'error',
              title: 'Error!',
              message: `Error: ${err}`,
            });
        }
    }
}

export const postHelpeeSignUpEmail = (data) => {
  return async (dispatch) => {
    try {
      // talk to API:
      await axios.post(userSignUpEmailPath, {
        data,
      });
      // update global Helpee state:
      dispatch(
        helpeeActions.updateHelpeeInfoAfterInsertEmail({
          helpeeEmail: data.helpeeEmail,
        })
      );
    } catch (err) {
      console.error(err);
        notificationActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: `Error: ${err}`,
        });
    }
  };
};
export const postHelpeeSignUpPassword = (data) => {
  return async (dispatch) => {
    try {
      // talk to API:
      await axios.post(userSignUpPasswordPath, {
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
      notificationActions.showNotification({
        status: "error",
        title: "Error!",
        message: `Insert password error: ${err}`,
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
      notificationActions.showNotification({
        status: "error",
        title: "Error!",
        message: `Error: ${err}`,
      });
    }
  };
};