import axios from 'axios';
import { notificationActions } from './notification-slice';
import { helperActions } from './helper-slice';

const getHelperAuthStatusPath = '/api/helper/get-auth-status';
const helperSignUpPasswordPath = '/api/helper/signup-password';
const helperSignInPath = '/api/helper/sign-in';
const userOfferPath = '/api/helper/offer';
const activeHelperPath = '/api/helper/active-helpers';
const getAllOffersPath = '/api/helper/all-offers';
const getPotentialCustomersPath = '/api/helper/potential-customers';
const helperProfilePicUploadPath = '/api/helper/profile-pic-upload';
const helperCertificateUploadPath = '/api/helper/certificate-upload';
const helperBasicFormWithoutCertificatePath = '/api/helper/basic-form';

export const getHelperAuthStatus = () => {
  return async (dispatch) => {
    try {
      const generalToken = localStorage.getItem('shelper-token');
      if (!generalToken) {
        throw Error('NO_TOKEN');
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

export const getPotentialCustomers = (data) => {
  console.log('getPotentialCustomers: ', data);
  return async (dispatch) => {
    if (data && data.helperUserId) {
      try {
        const response = await axios.get(getPotentialCustomersPath, {
          params: { helperUserId: data.helperUserId },
        });
        dispatch(
          helperActions.updateAllPotentialCustomers({
            allPotentialCustomers: response.data.allPotentialCustomers,
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
        notificationActions.setNotification({
          signUpPasswordStatus: 'success',
          signUpPasswordStatusTitle: 'Password successfully created.',
          signUpPasswordStatusMessage: 'Password successfully created.',
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
        throw Error('NO_TOKEN');
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

export const onSubmitUpdateHelperUniData = (data) => {
  const { school, department, country, degree, notes } = data;
  return async (dispatch) => {
    dispatch(
      helperActions.onSubmitUpdateHelperUniData({
        school,
        department,
        country,
        degree,
        notes,
      })
    );
  };
};

export const onSubmitUpdateHelperJobData = (data) => {
  const { industry, job, country, WFH, companySize, years, notes } = data;
  return async (dispatch) => {
    dispatch(
      helperActions.onSubmitUpdateHelperJobData({
        industry,
        job,
        country,
        WFH,
        companySize,
        years,
        notes,
      })
    );
  };
};

export const onSubmitUpdateHelperSelfEmployedData = (data) => {
  const { type, profession, country, years, notes } = data;
  return async (dispatch) => {
    dispatch(
      helperActions.onSubmitUpdateHelperSelfEmployedData({
        type,
        profession,
        country,
        years,
        notes,
      })
    );
  };
};

export const onUploadHelperProfilePicture = (data) => {
  return async (dispatch) => {
    try {
      const generalToken = localStorage.getItem('shelper-token');
      if (!generalToken) {
        throw Error('NO_TOKEN');
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
        throw Error('NO_TOKEN');
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
