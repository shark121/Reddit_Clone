"use client";

import { auth, firestore } from "@/app/firebase/client-app";
import { Button } from "@nextui-org/react";
import { useSignInWithGithub } from "react-firebase-hooks/auth";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { authProviderErrorAction } from "@/app/store/slices/auth-provider-error";
import { authModalAction } from "@/app/store/slices/auth-modal-slice";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { User } from "firebase/auth";

const GithubButton = () => {
  const [signInWithGithub, user, loading, error] = useSignInWithGithub(auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleSignInWithGoogle = () => {
    signInWithGithub();
    if (error) {
      dispatch(authProviderErrorAction.setOAuthError(error?.message));
    }

    if (user) {
      console.log(user);
      dispatch(authModalAction.closeAuthModal());
    }
  };

  const createUserDoc = async (user: User) => {
    const userRef = doc(firestore, "users", user.uid);
    await setDoc(userRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (user) {
      createUserDoc(user.user);
    }
  }, [user]);

  return (
    <>
      <Button
        className="flex items-center w-full rounded-full bg-white text-black font-semibold py-2 border-[0.2px]"
        variant="faded"
        onClick={handleSignInWithGoogle}
        isLoading={loading}
      >
        <GitHubLogoIcon />
        <span>Continue with Github</span>
      </Button>
    </>
  );
};

export default GithubButton;
