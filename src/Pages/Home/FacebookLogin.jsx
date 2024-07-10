import FacebookLogin from "react-facebook-login";

// eslint-disable-next-line react/prop-types
const LoginButton = ({ onLogin }) => {
  return (
    <FacebookLogin
      appId="904086431755202"
      autoLoad={true}
      fields="name,picture,email"
      scope="public_profile,email,manage_pages"
      callback={onLogin}
    />
  );
};

export default LoginButton;
