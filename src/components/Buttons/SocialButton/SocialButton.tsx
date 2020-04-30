import React from 'react';
import { Button } from '@material-ui/core';
import SocialLogin from 'react-social-login';

interface IProps {
  startIcon?: React.ReactChildren | React.ReactElement;
  triggerLogout?: () => void;
  triggerLogin?: () => void;
}

class SocialLoginButton extends React.Component<IProps> {
  render() {
    const { triggerLogin, triggerLogout, ...rest } = this.props;

    return (
      <Button
        {...rest}
        fullWidth
        size="large"
        color="primary"
        variant="contained"
        onClick={triggerLogin}
      >
        {this.props.children}
      </Button>
    );
  }
}

export const SocialButton = SocialLogin(SocialLoginButton);
