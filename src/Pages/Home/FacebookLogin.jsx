import FacebookLogin from "react-facebook-login";

const LoginButton = ({ onLogin }) => {
  return (
    <FacebookLogin
      appId="1428605677843896"
      autoLoad={true}
      fields="name,picture"
      callback={onLogin}
    />
  );
};

export default LoginButton;
