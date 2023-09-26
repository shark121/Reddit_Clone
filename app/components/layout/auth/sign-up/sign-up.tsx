import dynamic from "next/dynamic";
import GoogleButton from "../oauth-buttons/google-button";
import GithubButton from "../oauth-buttons/github-button";
import OAuthError from "../oauth-buttons/oauthProviderError";
const SignUpForm = dynamic(() => import("./sign-up-form"));

const SignUp = () => {
  return (
    <>
      <div className="flex flex-col w-full h-full px-11 justify-center items-center overflow-y-scroll gap-3 pb-5">
        <GoogleButton />
        <GithubButton />
        <SignUpForm />
        <OAuthError />
      </div>
    </>
  );
};

export default SignUp;
