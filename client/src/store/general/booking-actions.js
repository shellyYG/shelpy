import axios from 'axios';
import { bookingActions } from './booking-slice';

const bookingStatusPath = '/api/booking-status';

export const postBookingStatus = (data) => {
  console.log('postbookingNotificationStatus->data: ', data);
  
  return async (dispatch) => {
    let generalToken;
    if (data.isHelpee) {
      generalToken = localStorage.getItem('shelpy-token');
    } else {
      generalToken = localStorage.getItem('shelper-token');
    }
    try {
      if (!generalToken) {
        throw Error('NO_TOKEN');
      }
      if (generalToken) {
        const headers = {
          Authorization: 'Bearer ' + generalToken,
        };
        await axios.post(bookingStatusPath, { data }, {
          headers,
        });
        dispatch(
          bookingActions.setBookingStatus({
            bookingStatus: data.bookingStatus,
          })
        )
        dispatch(
          bookingActions.setBookingNotificationStatus({
            bookingNotificationStatus: 'success',
            bookingNotificationStatusTitle: 'Successfully submitted the booking.',
            bookingNotificationStatusMessage: 'Successfully submitted the booking.',
          })
        );
      }
      
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(
          bookingActions.setBookingNotificationStatus({
            bookingNotificationStatus: 'error',
            bookingNotificationStatusTitle: 'Oops!',
            bookingNotificationStatusMessage: error.response.data,
          })
        );
      }
    }
  };
};

export const getBookingStatus = (data) => {
  console.log('getBookingStatus->data: ', data);
  return async (dispatch) => {
    let generalToken;
    if (data.isHelpee) {
      generalToken = localStorage.getItem('shelpy-token');
    } else {
      generalToken = localStorage.getItem('shelper-token');
    }
    try {
      if (!generalToken) {
        throw Error('NO_TOKEN');
      }
      if (generalToken) {
        const headers = {
          Authorization: 'Bearer ' + generalToken,
        };
        const response = await axios.get(
          bookingStatusPath,
          { params: { offerId: data.offerId, requestId: data.requestId, isHelpee: data.isHelpee } },
          {
            headers,
          }
        );
        console.log('response: ', response)
        const { booking } = response.data;
        dispatch(
          bookingActions.setBookingStatus({
            bookingStatus: booking.bookingStatus,
            bookingDate: booking.appointmentDate,
            bookingTime: booking.appointmentTime,
            bookingNotes: booking.notes,
          })
        )
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const clearBookingNotificationStatus = (data) => {
  return async (dispatch) => {
    dispatch(
      bookingActions.setBookingNotificationStatus({
        bookingNotificationStatus: 'initial',
        bookingNotificationStatusTitle: '',
        bookingNotificationStatusMessage: '',
      })
    );
  };
};