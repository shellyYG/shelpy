import axios from 'axios';
import { generalActions } from './general-slice';

const bookingStatusPath = '/api/booking-status';
const getAllMarketingOffersPath = '/api/marketing-offers';
const unSubEmailPath = '/api/unsubscribe/email'
const canAccessChatroomPath = '/api/access-chatroom';
const canAccessDashboardPath = '/api/access-dashboard';
const ratingPath = '/api/rating';
const logLandOnPagePath = '/api/log/page/view';

export const postBookingStatus = (data) => {
  return async (dispatch) => {
    let generalToken;
    if (data.bookingStatus === 'created') { // is first time created or Helpee updating time
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

export const onClickUpdateSignInRole = (data) => {
  return async (dispatch) => {
    dispatch(
      generalActions.onClickUpdateSignInRole({
        signInRole: data.signInRole,
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
    const { page, filterCountry, filterMainType, filterSecondType } = data;
    try {
      const response = await axios.get(getAllMarketingOffersPath, {
        params: {
          page,
          filterCountry,
          filterMainType,
          filterSecondType,
        },
      });
      dispatch(
        generalActions.updateAllMarketingOffers({
          allMKTOffers: response.data.allMKTOffers,
          allMKTHelperRatings: response.data.allMKTHelperRatings,
          allOffersCount: response.data.allOffersCount,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        generalActions.updateAllMarketingOffers({
          allMKTOffers: [],
          allMKTHelperRatings: [],
          allOffersCount: 0,
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

export const confirmCanAccessChatroom = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(canAccessChatroomPath, { data });
      if (response && response.data && response.data.status === 'success') {
        dispatch(
          generalActions.setCanAccessChatroom({
            confirmCanAccessChatRoomStatus: 'success',
            confirmCanAccessChatRoomStatusTitle:
              'your_identification_is_verified',
            confirmCanAccessChatRoomStatusMessage: 'you_can_view_chatroom',
          })
        );
      } else {
        throw Error('error_occur_when_verifying_identity');
      }
    } catch (error) {
      console.error(error);
      dispatch(
        generalActions.setCanAccessChatroom({
          confirmCanAccessChatRoomStatus: 'error',
          confirmCanAccessChatRoomStatusTitle: 'oops',
          confirmCanAccessChatRoomStatusMessage: error,
        })
      );
    }
  };
};

export const confirmCanAccessDashboard = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(canAccessDashboardPath, { data });
      if (response && response.data && response.data.status === 'success') {
        dispatch(
          generalActions.setCanAccessDashboard({
            confirmCanAccessDashboardStatus: 'success',
            confirmCanAccessDashboardStatusTitle:
              'your_identification_is_verified',
            confirmCanAccessDashboardStatusMessage: 'you_can_view_dashboard',
          })
        );
      } else {
        throw Error('error_occur_when_verifying_identity');
      }
    } catch (error) {
      console.error(error);
      dispatch(
        generalActions.setCanAccessDashboard({
          confirmCanAccessDashboardStatus: 'error',
          confirmCanAccessDashboardStatusTitle: 'oops',
          confirmCanAccessDashboardStatusMessage: error,
        })
      );
    }
  };
};

export const postPartnerScore = (data) => {
  return async (dispatch) => {
    let generalToken;
    if (data.writerRole === 'helpee') {
      // is first time created or Helpee updating time
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
        await axios.post(
          ratingPath,
          { data },
          {
            headers,
          }
        );
        dispatch(
          generalActions.setPostRatingNotificationStatus({
            ratingNotificationStatus: 'success',
            ratingNotificationStatusTitle: 'successfully_submit_rating',
            ratingNotificationStatusMessage: 'successfully_submit_rating',
          })
        );
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(
          generalActions.setPostRatingNotificationStatus({
            ratingNotificationStatus: 'error',
            ratingNotificationStatusTitle: 'oops',
            ratingNotificationStatusMessage: error.response.data,
          })
        );
      }
    }
  };
}

export const clearPostRatingStatus = (data) => {
  return async (dispatch) => {
    dispatch(
      generalActions.setPostRatingNotificationStatus({
        ratingNotificationStatus: 'Initial',
        ratingNotificationStatusTitle: '',
        ratingNotificationStatusMessage: '',
      })
    );
  };
}

export const logLandOnPage = (data) => {
  return async () => {
    try {
      await axios.post(logLandOnPagePath, { data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const onClickUpdatePage = (data) => {
  return async (dispatch) => {
    dispatch(
      generalActions.onClickUpdatePage({
        page: data.page,
      })
    );
  };
};

export const onClickUpdateFilterCountry = (data) => {
  return async (dispatch) => {
    dispatch(
      generalActions.onClickUpdateFilterCountry({
        filterCountry: data.filterCountry,
      })
    );
  };
};

export const onClickUpdateFilterMainType = (data) => {
  return async (dispatch) => {
    dispatch(
      generalActions.onClickUpdateFilterMainType({
        filterMainType: data.filterMainType,
      })
    );
  };
};

export const onClickUpdateFilterSecondType = (data) => {
  return async (dispatch) => {
    console.log('onClickUpdateFilterSecondType to be: ', data.filterSecondType);
    dispatch(
      generalActions.onClickUpdateFilterSecondType({
        filterSecondType: data.filterSecondType,
      })
    );
  };
};