import axios from 'axios';
import { generalActions } from './general-slice';

const bookingStatusPath = '/api/booking-status';
const getAllMarketingOffersPath = '/api/marketing-offers';

export const postBookingStatus = (data) => {
  return async (dispatch) => {
    let generalToken;
    console.log('data: ', data);
    if (data.helpeeId || data.bookingStatus === 'created') { // is first time created or Helpee updating time
      generalToken = localStorage.getItem('shelpy-token');
    } else {
      generalToken = localStorage.getItem('shelper-token');
    }
    try {
      if (!generalToken) {
        throw Error('Access denied. Please log in to continue.');
      }
      if (generalToken) {
        const headers = {
          Authorization: 'Bearer ' + generalToken,
        };
        await axios.post(bookingStatusPath, { data }, {
          headers,
        });
        dispatch(
          generalActions.setBookingStatus({
            bookingStatus: data.bookingStatus,
          })
        )
        dispatch(
          generalActions.setBookingNotificationStatus({
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
          generalActions.setBookingNotificationStatus({
            bookingNotificationStatus: 'error',
            bookingNotificationStatusTitle: 'Oops!',
            bookingNotificationStatusMessage: error.response.data,
          })
        );
      }
    }
  };
};

export const onClickUpdateChatroomRoom = (data) => {
  return async (dispatch) => {
    dispatch(
      generalActions.onClickUpdateChatroomRoom({
        targetChatroomId: data.targetChatroomId,
      })
    );
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
        throw Error('Access denied. Please log in to continue.');
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
        const { booking } = response.data;
        dispatch(
          generalActions.setBookingStatus({
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
      generalActions.setBookingNotificationStatus({
        bookingNotificationStatus: 'initial',
        bookingNotificationStatusTitle: '',
        bookingNotificationStatusMessage: '',
      })
    );
  };
};

export const onClickUpdateActiveIconTarget = (data) => {
  return async (dispatch) => {
    dispatch(
      generalActions.setDropDownNavTarget({
        dropDownNavTarget: data.dropDownNavTarget,
      })
    );
  };
};

export const getAllMarketingOffers = (data) => {
  return async (dispatch) => {
    console.log('@general action->getAllMarketingOffers...data: ', data);
    try {
      const response = await axios.get(getAllMarketingOffersPath);
      console.log('response: ', response);
      dispatch(
        generalActions.updateAllMarketingOffers({
          allMKTOffers: response.data.allMKTOffers,
        })
      );
    } catch (error) {
      console.log('Ooopsssss ');
      console.error(error);
      dispatch(
        generalActions.updateAllMarketingOffers({
          allMKTOffers: [],
        })
      );
    }
  };
};