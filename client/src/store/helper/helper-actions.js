import axios from 'axios';
import { notificationActions } from './notification-slice';
import { helperActions } from './helper-slice';

const getHelperAuthStatusPath = '/api/helper/get-auth-status';
const helperSignUpPasswordPath = '/api/helper/signup-password';
const helperSignInPath = '/api/helper/sign-in';
const userOfferPath = '/api/helper/offer';
const activeHelperPath = '/api/helper/active-helpers';
const getAllOffersPath = '/api/helper/all-offers';
const getAllBookingsPath = '/api/helper/all-bookings';
const getPotentialCustomersPath = '/api/helper/potential-customers';
const helperProfilePicUploadPath = '/api/helper/profile-pic-upload';
const helperCertificateUploadPath = '/api/helper/certificate-upload';
const helperConfirmEmailPath = '/api/helper/email/confirmation';
const helperBasicFormWithoutCertificatePath = '/api/helper/basic-form';
const helperCanChangePasswordPath = '/api/helper/password/allow-change';
const helperSendPasswordResetEmailPath = '/api/helper/password/reset';
const helperChattedCustomersPath = '/api/helper/chat/partners';
const setPayPalAccountPath = '/api/helper/paypal-account';


export const getHelperAuthStatus = () => {
  return async (dispatch) => {
    try {
      const generalToken = localStorage.getItem('shelper-token');
      if (!generalToken) {
        return;
      }
      if (generalToken) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + generalToken,
        };
        const response = await axios.post(
          getHelperAuthStatusPath,
          {},
          { headers }
        );
        dispatch(
          helperActions.updateAuthStatus({
            isHelperAuthenticated: response.data.isHelperAuthenticated,
            helperUserId: response.data.helperUserId,
            helperName: response.data.username,
            helperStatus: response.data.helperStatus,
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        helperActions.updateAuthStatus({
          isHelperAuthenticated: false,
          helperStatus: '',
        })
      );
    }
  };
};

export const getAllOffers = (data) => {
  return async (dispatch) => {
    if (data && data.helperUserId) {
      try {
        const response = await axios.get(getAllOffersPath, {
          params: { helperUserId: data.helperUserId },
        });
        dispatch(
          helperActions.updateAllOffers({
            allOffers: response.data.allOffers,
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(
          helperActions.updateAllOffers({
            allOffers: [],
          })
        );
      }
    }
      
  };
};

export const getAllBookings = (data) => {
  return async (dispatch) => {
    if (data && data.helperUserId) {
      try {
        const response = await axios.get(getAllBookingsPath, {
          params: { helperUserId: data.helperUserId },
        });
        dispatch(
          helperActions.updateAllBookings({
            allBookings: response.data.allBookings,
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(
          helperActions.updateAllBookings({
            allBookings: [],
          })
        );
      }
    }
  };
};

export const getAllChattedCustomers = (data) => {
  return async (dispatch) => {
    if (data && data.helperUserId) {
      const allChattedPartners = [];
      try {
        const chattedCustomerRes = await axios.get(helperChattedCustomersPath, {
          params: { helperUserId: data.helperUserId },
        });
       if (chattedCustomerRes && chattedCustomerRes.data) {
         const chatting = chattedCustomerRes.data.allChattedCustomers || [];
         for (let i = 0; i < chatting.length; i++) {
          allChattedPartners.push(chatting[i]);
         }
       }
       if (allChattedPartners) {
         dispatch(
           helperActions.updateAllChattedCustomers({
             allChattedCustomers: allChattedPartners,
           })
         );
       }
        
      } catch (error) {
        console.error(error);
        dispatch(
          helperActions.updateAllChattedCustomers({
            allChattedCustomers: [],
          })
        );
      }
    }
  };
}

export const getPotentialCustomers = (data) => {
  return async (dispatch) => {
    if (data && data.helperUserId) {
      const allPotentialCustomers = [];
      try {
        const matchedCustomerRes = await axios.get(getPotentialCustomersPath, {
          params: { helperUserId: data.helperUserId },
        });
        const bookingsRes = await axios.get(getAllBookingsPath, {
          params: { helperUserId: data.helperUserId },
        });
        const chattedCustomerRes = await axios.get(helperChattedCustomersPath, {
          params: { helperUserId: data.helperUserId },
        });
        if (matchedCustomerRes && matchedCustomerRes.data) {
          const matchedCustomers = matchedCustomerRes.data.allPotentialCustomers;
          matchedCustomers.forEach((h) => {
            allPotentialCustomers.push(h);
          });
          const matchedOfferIds = matchedCustomers.map((p) => p.offerId);
          if (bookingsRes && bookingsRes.data) {
            const bookings = bookingsRes.data.allBookings || [];
            for (let i = 0; i < bookings.length; i++) {
              if (matchedOfferIds.indexOf(bookings[i].offerId) === -1) {
                allPotentialCustomers.push(bookings[i]);
                matchedOfferIds.push(bookings[i].offerId);
              }
            }
            if (chattedCustomerRes && chattedCustomerRes.data) {
              const chatting =
                chattedCustomerRes.data.allChattedCustomers || [];
              for (let i = 0; i < chatting.length; i++) {
                if (matchedOfferIds.indexOf(chatting[i].offerId) === -1) {
                  allPotentialCustomers.push(chatting[i]);
                  matchedOfferIds.push(chatting[i].offerId);
                }
              }
            }
          }
        }
        if (allPotentialCustomers) {
          dispatch(
            helperActions.updateAllPotentialCustomers({
              allPotentialCustomers,
            })
          );
        }
      } catch (error) {
        console.error(error);
        dispatch(
          helperActions.updateAllPotentialCustomers({
            allPotentialCustomers: [],
          })
        );
      }
    }
    
  };
};


export const onClickUpdateHelperActiveJobOrUniTarget = (data) => {
  return async (dispatch) => {
    dispatch(
      helperActions.onClickUpdateHelperActiveJobOrUniTarget({
        globalHelperJobOrUniTarget: data.globalHelperJobOrUniTarget,
      })
    );
  };
};

export const onClickUpdateHelperDashboardTarget = (data) => {
  return async (dispatch) => {
    dispatch(
      helperActions.onClickUpdateHelperDashboardTarget({
        helperDashboardTarget: data.helperDashboardTarget,
      })
    );
  };
};

export const onClickUpdateActiveOfferTarget = (data) => {
  return async (dispatch) => {
    dispatch(
      helperActions.onClickUpdateActiveOfferTarget({
        offerTarget: data.offerTarget,
      })
    );
  };
};
export const onClickUpdateActiveRequest = (data) => {
  return async (dispatch) => {
    dispatch(
      helperActions.onClickUpdateActiveRequest({
        globalActiveRequest: data.globalActiveRequest,
      })
    );
  };
};
export const onClickUpdateActiveHelperLists = (data) => {
  return async (dispatch) => {
    try {
      const activeHelpers = await axios.post(activeHelperPath, {
        data,
      });
      dispatch(
        helperActions.onClickUpdateActiveHelperLists({
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
};

export const postHelperSignUpEmail = (data) => {
  return async (dispatch) => {
    try {
      // update global Helper state:
      dispatch(
        helperActions.updateHelperInfoAfterInsertEmail({
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
export const postHelperSignUpPassword = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(helperSignUpPasswordPath, {
        data,
      });
      dispatch(
        helperActions.updateHelperInfoAfterInsertPassword({
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

export const postHelperSignInData = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(helperSignInPath, {
        data,
      });
      window.localStorage.setItem('shelper-token', response.data.accessToken);
      dispatch(
        helperActions.updateHelperInfoAfterSignIn({
          email: data.email,
          helperAccountStatus: response.data.status,
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
    }
  };
};

export const postHelperOfferForm = (data) => {
  return async (dispatch) => {
    try {
      const generalToken = localStorage.getItem('shelper-token');
      if (!generalToken) {
        throw Error('access_denied_please_log_in_error');
      }
      if (generalToken) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + generalToken,
        };
        const response = await axios.post(
          userOfferPath,
          {
            data,
          },
          { headers }
        );
        data.offerId = response.data.offerId;
        dispatch(
          notificationActions.setNotification({
            offerStatus: 'success',
            offerStatusTitle: 'success',
            offerStatusMessage: 'helper_form_submit_successful',
          })
        );
      }
    } catch (error) {
      const errorResponse = error.response ? error.response.data : '';
      const errorMessage = errorResponse || error.message;
      if (errorMessage) {
        dispatch(
          notificationActions.setNotification({
            offerStatus: 'error',
            offerStatusTitle: 'oops',
            offerStatusMessage: errorMessage,
          })
        );
      }
    }
  };
};

export const clearApplyHelperStatus = (data) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.setNotification({
        applyHelperStatus: 'initial',
        applyHelperStatusTitle: '',
        applyHelperStatusMessage: '',
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

export const clearOfferStatus = (data) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.setNotification({
        offerStatus: 'initial',
        offerStatusTitle: '',
        offerStatusMessage: '',
      })
    );
  };
};

export const onUploadHelperProfilePicture = (data) => {
  return async (dispatch) => {
    try {
      const generalToken = localStorage.getItem('shelper-token');
      if (!generalToken) {
        throw Error('access_denied_please_log_in_error');
      }
      if (generalToken) {
        const headers = {
          Authorization: 'Bearer ' + generalToken,
        };
        const response = await axios.post(helperProfilePicUploadPath, data, {
          headers,
        });
        const { imagePath } = response.data;
        dispatch(
          helperActions.updateProfilePicPath({
            helperProfilePicPath: imagePath,
          })
        );
      }
    } catch (error) {
      console.error('upload error: ', error);
    }
  };
};

export const onSubmitUploadHelperData = (data) => {
  return async (dispatch) => {
    const postPath =
      data instanceof FormData
        ? helperCertificateUploadPath
        : helperBasicFormWithoutCertificatePath;
    try {
      const generalToken = localStorage.getItem('shelper-token');
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
            applyHelperStatus: 'success',
            applyHelperStatusTitle: 'success',
            applyHelperStatusMessage: 'helper_wait_for_verify',
          })
        );
      }
    } catch (error) {
      console.error('upload certificate error: ', error);
      const errorResponse = error.response ? error.response.data : '';
      const errorMessage = errorResponse || error.message;
      if (errorMessage) {
        dispatch(
          notificationActions.setNotification({
            applyHelperStatus: 'error',
            applyHelperStatusTitle: 'oops',
            applyHelperStatusMessage: errorMessage,
          })
        );
      }
    }
  };
}

export const onClickDeleteOffer = (data) => {
  return async (dispatch) => {
    if (data && data.offerId && data.helperId) {
      try {
        await axios.delete(userOfferPath, {
          params: { offerId: data.offerId },
        });
        const response = await axios.get(getAllOffersPath, {
          params: { helperUserId: data.helperUserId },
        });
        dispatch(
          helperActions.updateAllOffers({
            allOffers: response.data.allOffers,
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(
          helperActions.updateAllOffers({
            allOffers: [],
          })
        );
      }
    }
  }
}

export const confirmHelperEmail = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(helperConfirmEmailPath, { data });
      if (response && response.data && response.data.status === 'success') {
        dispatch(
          notificationActions.setNotification({
            confirmHelperEmailStatus: 'success',
            confirmHelperEmailStatusTitle: 'email_confirm_successfully',
            confirmHelperEmailStatusMessage: 'please_sign_in_to_continue',
          })
        );
      } else {
        throw Error('error_occur_when_confirm_email');
      }
    } catch (error) {
      console.error(error);
      dispatch(
        notificationActions.setNotification({
          confirmHelperEmailStatus: 'error',
          confirmHelperEmailStatusTitle: 'oops',
          confirmHelperEmailStatusMessage: error,
        })
      );
    }
  };
};

export const confirmHelperCanChangePassword = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(helperCanChangePasswordPath, { data });
      if (response && response.data && response.data.status === 'success') {
        dispatch(
          notificationActions.setNotification({
            confirmHelperCanChangePasswordStatus: 'success',
            confirmHelperCanChangePasswordStatusTitle:
              'your_identification_is_verified',
            confirmHelperCanChangePasswordStatusMessage:
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
          confirmHelperCanChangePasswordStatus: 'error',
          confirmHelperCanChangePasswordStatusTitle: 'oops',
          confirmHelperCanChangePasswordStatusMessage: error,
        })
      );
    }
  };
};

export const sendHelperPasswordResetLink = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(helperSendPasswordResetEmailPath, {
        data,
      });
      if (response && response.data && response.data.status === 'success') {
        dispatch(
          helperActions.setSendPasswordResetEmailStatus({
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
        helperActions.setSendPasswordResetEmailStatus({
          sendPasswordResetEmailStatus: 'error',
          sendPasswordResetEmailStatusTitle: 'oops',
          sendPasswordResetEmailStatusMessage: error,
        })
      );
    }
  };
};

export const changeHelperPassword = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(helperSignUpPasswordPath, {
        data,
      });
      window.localStorage.setItem('shelper-token', response.data.accessToken);
      dispatch(
        helperActions.updateHelperInfoAfterInsertPassword({
          password: data.password,
        })
      );
      dispatch(
        helperActions.updateHelperResetPasswordStatus({
          helperPasswordResetStatus: 'success',
          helperPasswordResetStatusTitle: 'password_change_successfully',
          helperPasswordResetStatusMessage:
            'you_may_now_sign_in_with_new_password',
        })
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(
          helperActions.updateHelperResetPasswordStatus({
            helperPasswordResetStatus: 'error',
            helperPasswordResetStatusTitle: 'oops',
            helperPasswordResetStatusMessage: error.response.data,
          })
        );
      }
    }
  };
};

export const deleteHelperOffer = (data) => {
  return async (dispatch) => {
    try {
      const generalToken = localStorage.getItem('shelper-token');
      if (!generalToken) {
        throw Error('access_denied_please_log_in_error');
      }
      if (generalToken) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + generalToken,
        };
        const response = await axios.delete(
          userOfferPath,
          {
            data,
          },
          { headers }
        );
        data.offerId = response.data.offerId;
        dispatch(
          helperActions.setDeleteOfferStatus({
            deleteOfferStatus: 'success',
            deleteOfferStatusTitle: 'success',
            deleteOfferStatusMessage: 'offer_delete_successfully',
          })
        );
      }
    } catch (error) {
      const errorResponse = error.response ? error.response.data : '';
      const errorMessage = errorResponse || error.message;
      if (errorMessage) {
        dispatch(
          helperActions.setDeleteOfferStatus({
            deleteOfferStatus: 'error',
            deleteOfferStatusTitle: 'oops',
            deleteOfferStatusMessage: errorMessage,
          })
        );
      }
    }
  };
};
export const clearDeleteOfferStatus = (data) => {
  return async (dispatch) => {
    dispatch(
      helperActions.clearDeleteOfferStatus({
        deleteOfferStatus: 'initial',
        deleteOfferStatusTitle: '',
        deleteOfferStatusMessage: '',
      })
    );
  };
};

export const setPayPalAccount = (data) => {
  return async (dispatch) => {
    try {
      const generalToken = localStorage.getItem('shelper-token');
      if (!generalToken) {
        throw Error('access_denied_please_log_in_error');
      }
      if (generalToken) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + generalToken,
        };
        const response = await axios.post(
          setPayPalAccountPath,
          {
            data,
          },
          { headers }
        );
        dispatch(
          helperActions.setUpdatePayPalAccountStatus({
            setPayPalAccountStatus: 'success',
            setPayPalAccountStatusTitle: 'success',
            setPayPalAccountStatusMessage: 'paypal_account_successfully_update',
          })
        );
      }
    } catch (error) {
      const errorResponse = error.response ? error.response.data : '';
      const errorMessage = errorResponse || error.message;
      if (errorMessage) {
        dispatch(
          helperActions.setUpdatePayPalAccountStatus({
            setPayPalAccountStatus: 'error',
            setPayPalAccountStatusTitle: 'oops',
            setPayPalAccountStatusMessage: errorMessage,
          })
        );
      }
    }
  };
}

export const clearSetPayPalAccountStatus = (data) => {
  return async (dispatch) => {
    dispatch(
      helperActions.clearSetPayPalAccountStatus({
        setPayPalAccountStatus: 'initial',
        setPayPalAccountStatusTitle: '',
        setPayPalAccountStatusMessage: '',
      })
    );
  };
};