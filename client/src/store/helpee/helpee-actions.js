import axios from 'axios';
import { notificationActions } from '../notification/notification-slice'; 
import { helpeeActions } from "./helpee-slice";

const userSignUpEmailPath = '/api/helpee-signup-email';
const testPath = '/api/test';

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