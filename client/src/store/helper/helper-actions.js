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

export const getHelperAuthStatus = () => {
  return async (dispatch) => {
    try {
      const generalToken = localStorage.getItem('shelper-token');
      if (!generalToken) {
        throw Error('Access denied. Please log in to continue.');
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
            username: response.data.username,
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        helperActions.updateAuthStatus({
          isHelperAuthenticated: false,
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
    console.log('@helpeR action->getAllBookings..., data: ', data);
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

export const getPotentialCustomers = (data) => {
  console.log('getPotentialCustomers: ', data);
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
        if (matchedCustomerRes && matchedCustomerRes.data) {
          const matchedCustomers = matchedCustomerRes.data.allPotentialCustomers;
          matchedCustomers.forEach((h) => {
            allPotentialCustomers.push(h);
          });
          const matchedHelperIds = matchedCustomers.map((p) => p.helperId);
          if (bookingsRes && bookingsRes.data) {
            const bookings = bookingsRes.data.allBookings || [];
            for (let i = 0; i < bookings.length; i++) {
              if (matchedHelperIds.indexOf(bookings[i].helpeeId) === -1) {
                allPotentialCustomers.push(bookings[i]);
              }
            }
          }
        }
        dispatch(
          helperActions.updateAllPotentialCustomers({
            allPotentialCustomers,
          })
        );
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
        signUpEmailStatusTitle: 'Oops!',
        signUpEmailStatusMessage: `Error: ${err}`,
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
          signUpEmailStatusTitle: 'Email successfully submitted.',
          signUpEmailStatusMessage: 'Create password to complete Sign-Up.',
        })
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
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
          signUpPasswordStatusTitle:
            'A confirmation email has been sent!',
          signUpPasswordStatusMessage: 'Please confirm your email.',
        })
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(
          notificationActions.setNotification({
            signUpPasswordStatus: 'error',
            signUpPasswordStatusTitle: 'Oops!',
            signUpPasswordStatusMessage: error.response.data,
          })
        );
      }
    }
  };
};

export const postHelperSignInData = (data) => {
  console.log('postHelperSignInData');
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
          signInStatusTitle: 'Successfully Signed-In.',
          signInStatusMessage: 'Successfully Signed-In.',
        })
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(
          notificationActions.setNotification({
            signInStatus: 'error',
            signInStatusTitle: 'Oops!',
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
        throw Error('Access denied. Please log in to continue.');
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
            offerStatusTitle: 'You are all set!',
            offerStatusMessage:
              'We will inform you via email as soon as someone wants your help!',
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
            offerStatusTitle: 'Oops!',
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
        throw Error('Access denied. Please log in to continue.');
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
        throw Error('Access denied. Please log in to continue.');
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
            applyHelperStatusTitle:
              'You are almost there!',
            applyHelperStatusMessage:
              'Last step: select the experiences you want to share.',
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
            applyHelperStatus: 'error',
            applyHelperStatusTitle: 'Oops!',
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
      console.log('confirmHelperEmail response: ', response);
      if (response && response.data && response.data.status === 'success') {
        dispatch(
          notificationActions.setNotification({
            confirmHelperEmailStatus: 'success',
            confirmHelperEmailStatusTitle: 'Email confirmed successfully.',
            confirmHelperEmailStatusMessage: 'Please sign in to continue.',
          })
        );
      } else {
        throw Error('Error occur when confirming email.');
      }
    } catch (error) {
      console.error(error);
      dispatch(
        notificationActions.setNotification({
          confirmHelperEmailStatus: 'error',
          confirmHelperEmailStatusTitle: 'Oops!',
          confirmHelperEmailStatusMessage: `Error: ${error}`,
        })
      );
    }
  };
};

export const confirmHelperCanChangePassword = (data) => {
  console.log('confirmHelperCanChangePassword...');
  return async (dispatch) => {
    try {
      const response = await axios.post(helperCanChangePasswordPath, { data });
      if (response && response.data && response.data.status === 'success') {
        dispatch(
          notificationActions.setNotification({
            confirmHelperCanChangePasswordStatus: 'success',
            confirmHelperCanChangePasswordStatusTitle:
              'Your identity is verified.',
            confirmHelperCanChangePasswordStatusMessage:
              'Please enter new password to continue.',
          })
        );
      } else {
        throw Error('Error occur when verifying your identity.');
      }
    } catch (error) {
      console.error(error);
      dispatch(
        notificationActions.setNotification({
          confirmHelperCanChangePasswordStatus: 'error',
          confirmHelperCanChangePasswordStatusTitle: 'Oops!',
          confirmHelperCanChangePasswordStatusMessage: `Error: ${error}`,
        })
      );
    }
  };
};

export const sendHelperPasswordResetLink = (data) => {
  console.log('sendHelperPasswordResetLink...data: ', data);
  return async (dispatch) => {
    try {
      const response = await axios.post(helperSendPasswordResetEmailPath, {
        data,
      });
      console.log('response from sendHelperPasswordResetLink: ', response);
      if (response && response.data && response.data.status === 'success') {
        dispatch(
          helperActions.setSendPasswordResetEmailStatus({
            sendPasswordResetEmailStatus: 'success',
            sendPasswordResetEmailStatusTitle: 'Email confirmed successfully.',
            sendPasswordResetEmailStatusMessage: 'Please sign in to continue.',
          })
        );
      } else {
        throw Error('Error occur when sending password reset email.');
      }
    } catch (error) {
      console.error(error);
      dispatch(
        helperActions.setSendPasswordResetEmailStatus({
          sendPasswordResetEmailStatus: 'error',
          sendPasswordResetEmailStatusTitle: 'Oops!',
          sendPasswordResetEmailStatusMessage: `Error: ${error}`,
        })
      );
    }
  };
};

export const changeHelperPassword = (data) => {
  console.log('changeHelperPassword...');
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
          helperPasswordResetStatusTitle: 'Password changed successfully!',
          helperPasswordResetStatusMessage:
            'You may now sign in with new password.',
        })
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(
          helperActions.updateHelperResetPasswordStatus({
            helperPasswordResetStatus: 'error',
            helperPasswordResetStatusTitle: 'Oops!',
            helperPasswordResetStatusMessage: error.response.data,
          })
        );
      }
    }
  };
};
