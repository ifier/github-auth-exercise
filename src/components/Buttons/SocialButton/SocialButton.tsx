import React from 'react';
import SocialLogin from 'react-social-login';

interface IProps {
  triggerLogin?: () => void;
}

class Button extends React.Component<IProps> {
  render() {
    const { triggerLogin, ...rest } = this.props;

    return (
      <button onClick={triggerLogin} {...rest}>
        {this.props.children}
      </button>
    );
  }
}

export const SocialButton = SocialLogin(Button);
