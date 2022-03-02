import axios from 'axios';
import { generalActions } from './general-slice';

const bookingStatusPath = '/api/booking-status';
const getAllMarketingOffersPath = '/api/marketing-offers';
const unSubEmailPath = '/api/unsubscribe/email'

export const postBookingStatus = (data) => {
  return async (dispatch) => {
    let generalToken;
    if (data.helpeeId || data.bookingStatus === 'created') { // is first time created or Helpee updating time
      generalToken = localStorage.getItem('shelpy-token');
    } else {
      generalToken = localStorage.getItem('shelper-token');
    }
    try {
      if (!generalToken) {
        throw Error('access_denied_please_log_in_error');
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
            bookingStatus: 'success',
          })
        )
        dispatch(
          generalActions.setBookingNotificationStatus({
            bookingNotificationStatus: 'success',
            bookingNotificationStatusTitle: 'successfully_submit_booking',
            bookingNotificationStatusMessage: 'successfully_submit_booking',
          })
        );
      }
      
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(
          generalActions.setBookingNotificationStatus({
            bookingNotificationStatus: 'error',
            bookingNotificationStatusTitle: 'oops',
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
  return async (dispatch) => {
    let generalToken;
    if (data.isHelpee) {
      generalToken = localStorage.getItem('shelpy-token');
    } else {
      generalToken = localStorage.getItem('shelper-token');
    }
    try {
      if (!generalToken) {
        throw Error('access_denied_please_log_in_error');
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

export const updateUserRole = (data) => {
  return async (dispatch) => {
    dispatch(
      generalActions.setUserRole({
        userRole: data.userRole,
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
    try {
      const response = await axios.get(getAllMarketingOffersPath);
      dispatch(
        generalActions.updateAllMarketingOffers({
          allMKTOffers: response.data.allMKTOffers,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        generalActions.updateAllMarketingOffers({
          allMKTOffers: [],
        })
      );
    }
  };
};

export const unsubEmail = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(unSubEmailPath, { data });
      dispatch(
        generalActions.setEmailUnsubStatus({
          unSubEmailStatus: 'success',
          unSubEmailStatusTitle: 'success',
          unSubEmailStatusMessage: 'successfully_unsub_email',
        })
      );
      
      } catch (error) {
        console.error(error);
        if (error.response) {
          dispatch(
            generalActions.setEmailUnsubStatus({
              unSubEmailStatus: 'error',
              unSubEmailStatusTitle: 'oops',
              unSubEmailStatusMessage: error.response.data,
            })
          );
        }
      }
  }
}