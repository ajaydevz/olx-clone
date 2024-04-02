import React, { Fragment, useContext, useEffect } from 'react';
import Create from '../Components/Create/Create';
import { AuthContext }  from '../store/Context';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {

  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  useEffect(() => {
    if (!user) {
      console.log('vpm,omgdf')
      
      navigate('/login')   }
    else{
      console.log("user is not found")
    }// if not logged-in, then redirect
  })

  return (
    <Fragment>
      {user ? <Create /> : ''}
    </Fragment>
  );
};

export default CreatePage;
