// Handle HTTP requests
import axios from 'axios';
import { notificationActions } from '../notification/notification-slice'; 
import { helpeeActions } from "./helpee-slice";

const userPath = '/api/helpee';
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

export const sendHelpeeData = (data) => {
  console.log('running sedHelpeeData, data: ', data);
    return async (dispatch) => {
        dispatch(
            notificationActions.showNotification({
                status: "pending",
                title: "Sending..",
                message: "Sending helpee data...",
            })
        )
        try {
          
            // talk to API:
            // const response = await axios.post(userPath, {
            //     body: JSON.stringify(data),
            // });
            // const res = response.data;

            // update global Helpee state:
            dispatch(
              helpeeActions.updateHelpeeInfoAfterUserInput({
                helpeeName: data.helpeeName,
                helpeeLanguage: data.helpeeLanguage,
                serviceType: data.serviceType,
              })
            );
            // update global notification state:
            // notificationActions.showNotification({
            //   status: 'success',
            //   title: 'Success!',
            //   message: `Successfully post helpee data to DB, res: ${res}`,
            // });
        } catch (err) {
            notificationActions.showNotification({
              status: 'error',
              title: 'Error!',
              message: `Error: ${err}`,
            });
        }
    }
}