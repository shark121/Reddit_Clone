import ResetForm from "./reset-form";
import Image from "next/image";
import redditFace from "@/public/images/redditFace.svg";
import { BsDot } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { authModalAction } from "@/app/store/slices/auth-modal-slice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center pb-5">
        <h2 className="font-semibold text-lg">Reset Password</h2>
        <Image src={redditFace} alt="Reddit Logo" height={20} width={20} />
        <h3 className="font-bold">Reset your password</h3>
        <p className="text-base text-center mx-2 text-gray-700">
          Enter the email associated with your account and we&apos;ll send you a
          reset link.
        </p>
        <ResetForm />
        <div className="flex text-xs items-center">
          <p
            className="text-primary cursor-pointer"
            onClick={() => dispatch(authModalAction.openAuthModal("LogIn"))}
          >
            LOGIN
          </p>
          <BsDot className="text-primary" />
          <p
            className="text-primary cursor-pointer"
            onClick={() => dispatch(authModalAction.openAuthModal("SignUp"))}
          >
            SIGN UP
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
