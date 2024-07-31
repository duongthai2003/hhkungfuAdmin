import React from 'react';
import {useInfoViewActionsContext} from '@crema/context/AppContextProvider/InfoViewContextProvider';
// import FirebaseAuthProvider from '@crema/services/auth/firebase/FirebaseAuthProvider';
import JwtAuthProvider from '@crema/services/auth/jwt-auth/JWTAuthProvider';

type AppAuthProviderProps = {
  children: React.ReactNode;
};

const AppAuthProvider = ({children}: AppAuthProviderProps) => {
  const {fetchStart, fetchSuccess, fetchError} = useInfoViewActionsContext();

  // return (
  //   <FirebaseAuthProvider
  //     fetchStart={fetchStart}
  //     fetchError={fetchError}
  //     fetchSuccess={fetchSuccess}
  //   >
  //     {children}
  //   </FirebaseAuthProvider>
  // );

  return (
    <JwtAuthProvider
      fetchStart={fetchStart}
      fetchError={fetchError}
      fetchSuccess={fetchSuccess}
    >
      {children}
    </JwtAuthProvider>
  );
};

export default AppAuthProvider;
