import OAuthButtons from "../modal/oauth-buttons";
import LoginForm from "./login-form";

const Login = () => {
  return (
    <div className="flex flex-col w-full h-full pb-5 justify-center items-center gap-3 px-5 overflow-y-scroll ">
      <OAuthButtons />
      <hr className="after:content-['&'] bg-black" />
      {/* <div className="flex">
          <hr className="border-black" />
          <p>Or</p>
          <hr />
        </div> */}
      <LoginForm />
    </div>
  );
};

export default Login;
