import {getToken} from '../LocalStorageUtils.jsx';

export const config = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }
};
