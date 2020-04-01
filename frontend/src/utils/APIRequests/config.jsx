import {getToken} from '../TokenUtils.jsx';

export const config = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }
};
