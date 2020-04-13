import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { confirmEmail } from '../../utils/APIRequests/AuthRequests.jsx';

const EmailConfirmed = () => {
  const [message, setMessage] = useState('Please, wait');
  const { token } = useParams();
  const confirmEmailCallback = (data) => {
    setMessage(data.message);
  };
  useEffect(() => {
    confirmEmail(token, confirmEmailCallback);
  }, []);
  return <h3>{message}</h3>;
};

export default EmailConfirmed;
