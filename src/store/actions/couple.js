import { getCoupleAPI } from '../../apis/couple';
import { getToken } from './auth';
import { COUPLE_SET_COUPLE } from '../actionTypes';

export const getCouple = () => {
  return async (dispatch) => {
    try {
      const token = await dispatch(getToken());
      const couple = await getCoupleAPI(token);
      dispatch(setCouple(couple));
    } catch (e) {
      console.log(e);
    }
  };
};

const setCouple = (couple) => {
  return {
    type: COUPLE_SET_COUPLE,
    couple,
  };
};

