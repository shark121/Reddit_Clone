"use client";
import { auth } from "@/app/firebase/client-app";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import Image from "next/image";
import React from "react";
import googleImage from "@/public/images/googlelogo.png";
import { Button } from "@nextui-org/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const OAuthButtons = () => {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  return (
    <>
      <Button
        className="flex items-center w-full rounded-full bg-white text-black font-semibold py-2 border-[0.2px]"
        variant="faded"
        onClick={() => signInWithRedirect(auth, googleProvider)}
      >
        <Image
          src={googleImage}
          height={16}
          className="w-auto p-5"
          alt="Google Logo"
          loading="lazy"
        />
        <span>Continue with Google</span>
      </Button>

      <Button
        className="flex items-center w-full rounded-full bg-white text-black font-semibold py-2 border-[0.2px]"
        variant="faded"
        onClick={() => signInWithRedirect(auth, githubProvider)}
      >
        <GitHubLogoIcon />
        Continue with Github
      </Button>
    </>
  );
};

export default OAuthButtons;
