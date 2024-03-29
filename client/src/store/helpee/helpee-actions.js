import axios from 'axios';
import { notificationActions } from './notification-slice'; 
import { helpeeActions } from "./helpee-slice";
import { generalActions } from '../general/general-slice';

const getHelpeeAuthStatusPath = '/api/helpee/get-auth-status';
const helpeeSignUpPasswordPath = '/api/helpee/signup-password';
const helpeeSignInPath = '/api/helpee/sign-in';
const userRequestPath = '/api/helpee/request';
const activeHelperPath = '/api/helpee/active-helpers';
const getAllOrdersPath = '/api/helpee/all-orders';
const getSingleRequestPath = '/api/helpee/single-request';
const getAllBookingsPath = '/api/helpee/all-bookings';
const getPotentialHelpersPath = '/api/helpee/potential-helpers';
const helpeeProfilePicUploadPath = '/api/helpee/profile-pic-upload';
const helpeeBasicFormWithoutCertificatePath = '/api/helpee/basic-form';
const helpeeConfirmEmailPath = '/api/helpee/email/confirmation';
const helpeeCanChangePasswordPath = '/api/helpee/password/allow-change';
const helpeeSendPasswordResetEmailPath = '/api/helpee/password/reset';
// const payHelperPath = '/api/helpee/pay';
const payTapPayPath = '/api/tappay/pay';
const generateReceiptPath = '/api/receipt/generate';
const helpeeChattedHelpersPath = '/api/helpee/chat/partners';
const bookingStatusPath = '/api/booking-status';
const getBookingDetailsPath = '/api/booking/details';
const getHelpeeDataPath = '/api/helpee/data';
const getHelpeeRatingPath = '/api/helpee/ratings';
const generateMeetingPath = '/api/meeting/create';

export const getHelpeeAuthStatus = () => {
  return async (dispatch) => {
    try {
      const generalToken = localStorage.getItem('shelpy-token');
      if (!generalToken) {
        return;
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
            helpeeName: response.data.username,
            helpeeStatus: response.data.helpeeStatus,
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        helpeeActions.updateAuthStatus({
          isHelpeeAuthenticated: false,
          helpeeStatus: '',
        })
      );
    }
  }
}

export const confirmHelpeeEmail = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(helpeeConfirmEmailPath, { data });
      if (response && response.data && response.data.status === 'success') {
        dispatch(
          notificationActions.setNotification({
            confirmHelpeeEmailStatus: 'success',
            confirmHelpeeEmailStatusTitle: 'email_confirm_successfully',
            confirmHelpeeEmailStatusMessage: 'please_sign_in_to_continue',
          })
        );
      } else {
        throw Error('error_occur_when_confirm_email');
      }
      
    } catch (error) {
      console.error(error);
      dispatch(
        notificationActions.setNotification({
          confirmHelpeeEmailStatus: 'error',
          confirmHelpeeEmailStatusTitle: 'oops',
          confirmHelpeeEmailStatusMessage: error,
        })
      );
    }
  };
};

export const confirmHelpeeCanChangePassword = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(helpeeCanChangePasswordPath, { data });
      if (response && response.data && response.data.status === 'success') {
        dispatch(
          notificationActions.setNotification({
            confirmHelpeeCanChangePasswordStatus: 'success',
            confirmHelpeeCanChangePasswordStatusTitle:
              'your_identification_is_verified',
            confirmHelpeeCanChangePasswordStatusMessage:
              'please_create_new_password_to_continue',
          })
        );
      } else {
        throw Error('error_occur_when_verifying_identity');
      }
    } catch (error) {
      console.error(error);
      dispatch(
        notificationActions.setNotification({
          confirmHelpeeCanChangePasswordStatus: 'error',
          confirmHelpeeCanChangePasswordStatusTitle: 'oops',
          confirmHelpeeCanChangePasswordStatusMessage: error,
        })
      );
    }
  };
};

export const sendHelpeePasswordResetLink = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(helpeeSendPasswordResetEmailPath, { data });
      if (response && response.data && response.data.status === 'success') {
        dispatch(
          helpeeActions.setSendPasswordResetEmailStatus({
            sendPasswordResetEmailStatus: 'success',
            sendPasswordResetEmailStatusTitle: 'email_confirm_successfully',
            sendPasswordResetEmailStatusMessage: 'please_sign_in_to_continue',
          })
        );
      } else {
        throw Error('error_occur_when_sending_password_reset_email');
      }
      
    } catch (error) {
      console.error(error);
      dispatch(
        helpeeActions.setSendPasswordResetEmailStatus({
          sendPasswordResetEmailStatus: 'error',
          sendPasswordResetEmailStatusTitle: 'oops',
          sendPasswordResetEmailStatusMessage: error,
        })
      );
    }
  };
};

export const getAllOrders = (data) => {
  return async (dispatch) => {
    if (data && data.helpeeUserId) {
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
    }
  };
};

export const getAllChattedHelpers = (data) => {
  return async (dispatch) => {
    if (data && data.helpeeUserId) {
      const allChattedPartners = [];
      try {
        const chattedHelpersRes = await axios.get(helpeeChattedHelpersPath, {
          params: { helpeeUserId: data.helpeeUserId },
        });
        if (chattedHelpersRes && chattedHelpersRes.data) {
          const chattings = chattedHelpersRes.data.allChattedHelpers || [];
          for (let i = 0; i < chattings.length; i++) {
            allChattedPartners.push(chattings[i]);
          }
        }
        if (allChattedPartners) {
          dispatch(
            helpeeActions.updateAllChattedHelpers({
              allChattedHelpers: allChattedPartners,
            })
          );
        }
      } catch (error) {
        console.error(error);
        dispatch(
          helpeeActions.updateAllChattedHelpers({
            allChattedHelpers: [],
          })
        );
      }
    }
  };
};

export const getPotentialHelpers = (data) => {
  return async (dispatch) => {
    if (data && data.helpeeUserId) {
      const allPotentialHelpers = [];
      const allPotentialHelpersRatings = [];
      try {
        const matchedHelpersRes = await axios.get(getPotentialHelpersPath, {
          params: { helpeeUserId: data.helpeeUserId },
        });
        const bookingsRes = await axios.get(getAllBookingsPath, {
          params: { helpeeUserId: data.helpeeUserId },
        });
        const chattedHelpersRes = await axios.get(helpeeChattedHelpersPath, {
          params: { helpeeUserId: data.helpeeUserId },
        });
        if (matchedHelpersRes && matchedHelpersRes.data) {
          const matchedHelpers = matchedHelpersRes.data.allPotentialHelpers;
          const matchedHelpersRatings =
            matchedHelpersRes.data.allPotentialHelpersRatings;
          matchedHelpers.forEach((h)=>{
            allPotentialHelpers.push(h);
          })
          matchedHelpersRatings.forEach((h) => {
            allPotentialHelpersRatings.push(h);
          });
          const matchedOfferIds = matchedHelpers.map((p) => p.offerId);
          if (bookingsRes && bookingsRes.data) {
            const bookings = bookingsRes.data.allBookings || [];
            for (let i = 0; i < bookings.length; i++) {
              if (matchedOfferIds.indexOf(bookings[i].offerId) === -1) {
                allPotentialHelpers.push(bookings[i]);
                matchedOfferIds.push(bookings[i].offerId);
              }
            }
            if (chattedHelpersRes && chattedHelpersRes.data) {
              const chattings = chattedHelpersRes.data.allChattedHelpers || [];
              for (let i = 0; i < chattings.length; i++) {
                if (matchedOfferIds.indexOf(chattings[i].offerId) === -1) {
                  allPotentialHelpers.push(chattings[i]);
                  matchedOfferIds.push(chattings[i].offerId);
                }
              }
            }
          }
        }

        if (
          allPotentialHelpers
        ) {
          dispatch(
            helpeeActions.updateAllPotentialHelpers({
              allPotentialHelpers,
              allPotentialHelpersRatings,
            })
          );
        }
      } catch (error) {
        console.error(error);
        dispatch(
          helpeeActions.updateAllPotentialHelpers({
            allPotentialHelpers: [],
            allPotentialHelpersRatings: [],
          })
        );
      }
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

export const onClickUpdateHelpeeDashboardTarget = (data) => {
  return async (dispatch) => {
    dispatch(
      helpeeActions.onClickUpdateHelpeeDashboardTarget({
        helpeeDashboardTarget: data.helpeeDashboardTarget,
      })
    );
  };
};

export const getSingleRequest = (data) => {
  return async (dispatch) => {
    if (data && data.requestId) {
      try {
        const response = await axios.get(getSingleRequestPath, {
          params: { requestId: data.requestId },
        });
        dispatch(
          helpeeActions.updateSingleRequest({
            singleRequest: response.data.singleRequest,
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(
          helpeeActions.updateSingleRequest({
            singleRequest: [],
          })
        );
      }
    }
  };
};

export const getAllBookings = (data) => {
  return async (dispatch) => {
    if (data && data.helpeeUserId) {
      try {
        const response = await axios.get(getAllBookingsPath, {
          params: { helpeeUserId: data.helpeeUserId },
        });
        dispatch(
          helpeeActions.updateAllBookings({
            allBookings: response.data.allBookings,
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(
          helpeeActions.updateAllBookings({
            allBookings: [],
          })
        );
      }
    }
  };
}

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
        signUpEmailStatusTitle: 'oops',
        signUpEmailStatusMessage: err,
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
          signUpEmailStatusTitle: 'email_successfully_submitted',
          signUpEmailStatusMessage: 'create_password_to_complete_sign_up',
        })
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(
          notificationActions.setNotification({
            signUpEmailStatus: 'error',
            signUpEmailStatusTitle: 'oops',
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
      await axios.post(helpeeSignUpPasswordPath, {
        data,
      });
      dispatch(
        helpeeActions.updateHelpeeInfoAfterInsertPassword({
          password: data.password,
        })
      );
      dispatch(
        notificationActions.setNotification({
          signUpPasswordStatus: 'success',
          signUpPasswordStatusTitle: 'a_confirm_email_has_been_sent',
          signUpPasswordStatusMessage: 'please_confirm_email',
        })
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(
          notificationActions.setNotification({
            signUpPasswordStatus: 'error',
            signUpPasswordStatusTitle: 'oops',
            signUpPasswordStatusMessage: error.response.data,
          })
        );
      }
    }
  };
};

export const changeHelpeePassword = (data) => {
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
        helpeeActions.updateHelpeeResetPasswordStatus({
          helpeePasswordResetStatus: 'success',
          helpeePasswordResetStatusTitle: 'password_change_successfully',
          helpeePasswordResetStatusMessage:
            'you_may_now_sign_in_with_new_password',
        })
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(
          helpeeActions.updateHelpeeResetPasswordStatus({
            helpeePasswordResetStatus: 'error',
            helpeePasswordResetStatusTitle: 'oops',
            helpeePasswordResetStatusMessage: error.response.data,
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
          helpeeAccountStatus: response.data.status,
        })
      );
      dispatch(
        notificationActions.setNotification({
          signInStatus: 'success',
          signInStatusTitle: 'success',
          signInStatusMessage: 'successfully_sign_in',
        })
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(
          notificationActions.setNotification({
            signInStatus: 'error',
            signInStatusTitle: 'oops',
            signInStatusMessage: error.response.data,
          })
        );
      }
    };
  };
}


export const onUploadHelpeeProfilePicture = (data) => {
  return async (dispatch) => {
    try {
      const generalToken = localStorage.getItem('shelpy-token');
      if (!generalToken) {
        throw Error('access_denied_please_log_in_error');
      }
      if (generalToken) {
        const headers = {
          Authorization: 'Bearer ' + generalToken,
        };
        const response = await axios.post(helpeeProfilePicUploadPath, data, {
          headers,
        });
        const { imagePath } = response.data;
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
        throw Error('access_denied_please_log_in_error');
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
            applyHelpeeStatusTitle: 'success',
            applyHelpeeStatusMessage: 'select_experience_you_want_to_know',
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
            applyHelpeeStatusTitle: 'oops',
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
        throw Error('access_denied_please_log_in_error');
      }
      if (generalToken) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + generalToken,
        };
        const response = await axios.post(
          userRequestPath,
          {
            data,
          },
          { headers }
        );
        data.requestId = response.data.requestId;
        dispatch(
          notificationActions.setNotification({
            requestStatus: 'success',
            requestStatusTitle: 'success',
            requestStatusMessage: 'helpee_form_submit_successful',
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
            requestStatusTitle: 'oops',
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

export const clearPaymentStep = (data) => {
  return async (dispatch) => {
    dispatch(
      helpeeActions.clearPaymentStep({
        paymentStep: 'initial',
        paymentStepTitle: '',
        paymentStepMessage: '',
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

export const onClickDeleteRequest = (data) => {
  return async (dispatch) => {
    if (data && data.requestId && data.helpeeUserId) {
      try {
        await axios.delete(userRequestPath, {
          params: { requestId: data.requestId },
        });
        const response = await axios.get(getAllOrdersPath, {
          params: { helpeeUserId: data.helpeeUserId },
        });
        dispatch(
          helpeeActions.updateAllOrders({
            allOffers: response.data.allOffers,
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(
          helpeeActions.updateAllOrders({
            allOffers: [],
          })
        );
      }
    }
  };
};

export const postPayViaTapPay = (data) => {
  return async (dispatch) => {
    const generalToken = localStorage.getItem('shelpy-token');
    try {
      if (!generalToken) {
        throw Error('access_denied_please_log_in_error');
      }
      if (generalToken) {
        const headers = {
          Authorization: 'Bearer ' + generalToken,
        };
        const response = await axios.post(
          payTapPayPath,
          { data },
          {
            headers,
          }
        );
        if (response && response.data && response.data.payment_url) {
          // 3D (foreign credit card)
          // update paymentStatus to to3DBPayment
          dispatch(
            helpeeActions.updatePaymentStep({
              paymentStep: 'toThreeD',
              paymentStepTitle: 'redirect_to_3D_payment',
              paymentStepMessage: 'click_ok_to_continue',
              paymentUrl: response.data.payment_url,
            })
          );
        } else if (response && response.data && response.data.status === 0) { // non 3D (taiwanese credit card)
          // update paymentStatus to aboutToUpdateBookingsToSuccess
          dispatch(
            generalActions.setBookingStatus({
              bookingStatus: data.bookingStatus,
            })
          );
          dispatch(
            helpeeActions.updatePaymentStep({
              paymentStep: 'toSuccessPage',
              paymentStepTitle: 'redirect_to_payment_final_page',
              paymentStepMessage: 'click_ok_to_continue',
            })
          );
        } else if (response && response.data && response.data.details === 'alreadyPaid') {
          dispatch(
            helpeeActions.updatePaymentStep({
              paymentStep: 'toSuccessPage',
              paymentStepTitle: 'redirect_to_payment_final_page',
              paymentStepMessage: 'click_ok_to_continue',
            })
          );
        }
      }
    } catch (error) {
      if (error.response) {
        dispatch(
          helpeeActions.updatePaymentStep({
            paymentStep: 'creditCardFailed',
            paymentStepTitle: 'credit_card_error',
            paymentStepMessage: 'please_try_another_card',
          })
        );
      }
    }
  };
};

export const updateBookingStatusToPaidAndReceiptMeetLink = (data) => {
  return async (dispatch) => {
    const generalToken = localStorage.getItem('shelpy-token');
    try {
      if (!generalToken) {
        throw Error('access_denied_please_log_in_error');
      }
      if (generalToken) {
        const headers = {
          Authorization: 'Bearer ' + generalToken,
        };
        // update booking status in DB & send email
        const response = await axios.post(
          bookingStatusPath,
          {
            data: {
              bookingId: data.bookingId,
              offerId: data.offerId,
              bookingStatus: 'paid',
              currentLanguage: data.currentLanguage,
              appointmentDate: data.appointmentDate,
              appointmentTime: data.appointmentTime,
              priorityScore: 3,
              helpeeId: data.helpeeId,
              helperId: data.helperId,
              paidDetails: `bookingId: ${data.bookingId}`,
            },
          },
          {
            headers,
          }
        );
        if (response && response.details !== 'bookingAlreadyPaid') {
          // generate meet link
          const meetingLinkRes = await axios.post(
            generateMeetingPath,
            {
              data: {
                bookingId: data.bookingId,
                offerId: data.offerId,
                bookingStatus: 'paid',
                appointmentDate: data.appointmentDate,
                appointmentTime: data.appointmentTime,
                helpeeId: data.helpeeId,
                helperId: data.helperId,
                timeZone: data.timeZone,
                duration: data.duration,
                helperName: data.helperName,
                helpeeName: data.helpeeName,
                appointmentTimestamp: data.appointmentTimestamp,
                helperEmail: data.helperEmail,
                helpeeEmail: data.helpeeEmail,
                helpeeNotificationLanguage: data.helpeeNotificationLanguage,
                helperNotificationLanguage: data.helperNotificationLanguage,
              },
            },
            {
              headers,
            }
          );
          const receiptRes = await axios.post(
            generateReceiptPath,
            { data },
            {
              headers,
            }
          );

          if (meetingLinkRes && receiptRes) {
            dispatch(
              helpeeActions.updatePaymentStep({
                paymentStep: 'success',
                paymentStepTitle: 'successfully_paid',
                paymentStepMessage: 'successfully_paid',
              })
            );
          }
        } else if (response && response.details === 'bookingAlreadyPaid') {
          dispatch(
            helpeeActions.updatePaymentStep({
              paymentStep: 'success',
              paymentStepTitle: 'successfully_paid',
              paymentStepMessage: 'successfully_paid',
            })
          );
          return;
        } else {
          dispatch(
            helpeeActions.updatePaymentStep({
              paymentStep: 'oops',
              paymentStepTitle: 'something_went_wrong',
              paymentStepMessage: 'please_email_us_for_help',
            })
          );
        }
      }
    } catch (error) {
      if (error.response) {
        dispatch(
          helpeeActions.updatePaymentStep({
            paymentStep: 'oops',
            paymentStepTitle: 'something_went_wrong',
            paymentStepMessage: 'please_email_us_for_help',
          })
        );
      }
    }
  };
};

export const changeBookingStatusToAlreadyPaid = () => {
  return async (dispatch) => {
    dispatch(
      helpeeActions.updatePaymentStep({
        paymentStep: 'success',
        paymentStepTitle: 'successfully_paid',
        paymentStepMessage: 'successfully_paid',
      })
    );
  }
}

export const deleteHelpeeRequest = (data) => {
  return async (dispatch) => {
    try {
      const generalToken = localStorage.getItem('shelpy-token');
      if (!generalToken) {
        throw Error('access_denied_please_log_in_error');
      }
      if (generalToken) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + generalToken,
        };
        const response = await axios.delete(
          userRequestPath,
          {
            data,
          },
          { headers }
        );
        data.requestId = response.data.requestId;
        dispatch(
          helpeeActions.setDeleteRequestStatus({
            deleteRequestStatus: 'success',
            deleteRequestStatusTitle: 'success',
            deleteRequestStatusMessage: 'request_delete_successfully',
          })
        );
      }
    } catch (error) {
      const errorResponse = error.response ? error.response.data : '';
      const errorMessage = errorResponse || error.message;
      if (errorMessage) {
        dispatch(
          helpeeActions.setDeleteRequestStatus({
            deleteRequestStatus: 'error',
            deleteRequestStatusTitle: 'oops',
            deleteRequestStatusMessage: errorMessage,
          })
        );
      }
    }
  };
};
export const clearDeleteRequestStatus = (data) => {
  return async (dispatch) => {
    dispatch(
      helpeeActions.clearDeleteRequestStatus({
        deleteRequestStatus: 'initial',
        deleteRequestStatusTitle: '',
        deleteRequestStatusMessage: '',
      })
    );
  };
};

export const getBookingDetails = (data) => {
  return async (dispatch) => {
    if (data && data.bookingId) {
      try {
        const response = await axios.get(getBookingDetailsPath, {
          params: { bookingId: data.bookingId },
        });
        dispatch(
          helpeeActions.updateBookingDetails({
            booking: response.data.booking,
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(
          helpeeActions.updateBookingDetails({
            booking: [],
          })
        );
      }
    }
  };
}

export const getHelpeeUserData = (data) => {
  return async (dispatch) => {
    if (data && data.helpeeUserId) {
      try {
        const response = await axios.get(getHelpeeDataPath, {
          params: { helpeeUserId: data.helpeeUserId },
        });
        dispatch(
          helpeeActions.updateHelpeeData({ 
            helpeeData: response.data.helpeeData,
          })
        )
      } catch (error) {
        console.error(error);
        dispatch(
          helpeeActions.updateHelpeeData({
            helpeeData: [],
          })
        );
      }
    }
  }
}

export const getHelpeeRatingData = (data) => {
  return async (dispatch) => {
    if (data && data.helpeeUserId) {
      try {
        const response = await axios.get(getHelpeeRatingPath, {
          params: { helpeeUserId: data.helpeeUserId },
        });
        dispatch(
          helpeeActions.updateHelpeeRatingData({
            helpeeRatingData: response.data.helpeeRatingData,
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(
          helpeeActions.updateHelpeeRatingData({
            helpeeRatingData: [],
          })
        );
      }
    }
  };
};