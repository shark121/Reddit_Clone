import dynamic from "next/dynamic";
const OAuthButtons = dynamic(() => import("../modal/oauth-buttons"));
const SignUpForm = dynamic(() => import("./sign-up-form"));

const SignUp = () => {
  return (
    <>
      <div className="flex flex-col w-full h-full px-11 justify-center items-center overflow-y-scroll gap-3 pb-5">
        <OAuthButtons />
        <SignUpForm />
      </div>
    </>
  );
};

export default SignUp;
