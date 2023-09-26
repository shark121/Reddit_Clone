import GithubButton from "../oauth-buttons/github-button";
import GoogleButton from "../oauth-buttons/google-button";
import OAuthError from "../oauth-buttons/oauthProviderError";
import LoginForm from "./login-form";

const Login = () => {
  return (
    <div className="flex flex-col w-full h-full pb-5 justify-center items-center gap-3 px-5 overflow-y-scroll ">
      <GoogleButton />
      <GithubButton />
      <OAuthError />
      <OAuthError />
      <hr className="after:content-['&'] bg-black" />
      <LoginForm />
    </div>
  );
};

export default Login;
