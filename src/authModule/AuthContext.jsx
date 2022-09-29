
import React from 'react';  

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.props.isAuth,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
} 
 

const AuthConsumer = AuthContext.Consumer;

export { AuthConsumer };