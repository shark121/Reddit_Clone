import { auth, firestore } from "@/app/firebase/client-app";
import googleImage from "@/public/images/googlelogo.png";
import { Button } from "@nextui-org/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import Image from "next/image";
import { authProviderErrorAction } from "@/app/store/slices/auth-provider-error";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { authModalAction } from "@/app/store/slices/auth-modal-slice";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";

const GoogleButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleSignInWithGoogle = () => {
    signInWithGoogle();
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
        <Image
          src={googleImage}
          height={16}
          width={16}
          className="w-auto p-5"
          alt="Google Logo"
        />
        <span>Continue with Google</span>
      </Button>
    </>
  );
};

export default GoogleButton;
