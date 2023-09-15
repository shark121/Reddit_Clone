"use client";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/app/components/ui/button";
import { AppDispatch, RootState } from "@/app/store/store";
import { authModalAction } from "@/app/store/slices/auth-modal-slice";

const AuthButtons = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="hidden min-[480px]:flex xs:gap-1">
      <Button
        className="text-secondary-foreground bg-secondary text-sm rounded-full h-6 "
        onClick={() => dispatch(authModalAction.openAuthModal("LogIn"))}
      >
        Login
      </Button>
      <Button
        className=" text-sm rounded-full h-6"
        onClick={() => dispatch(authModalAction.openAuthModal("SignUp"))}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthButtons;
