"use client";
import { Input } from "@/app/components/ui/input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { authModalAction } from "@/app/store/slices/auth-modal-slice";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/client-app";
import { Button } from "@nextui-org/react";
import FirebaseErrors from "@/app/firebase/errors";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch<AppDispatch>();
  const [signInWithEmailAndPassword, user, loading, userError] =
    useSignInWithEmailAndPassword(auth);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(formData.email, formData.password);
    if (user) {
      dispatch(authModalAction.closeAuthModal());
    }
  };
  return (
    <>
      <form
        className="flex flex-col gap-2 justify-center w-full"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          className="rounded-md focus:bg-blue-100 focus-visible:ring-0"
          required
          placeholder="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <Input
          type="password"
          className="rounded-md focus:bg-blue-100 focus-visible:ring-0"
          required
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        {
          <p className="text-red-500 text-center text-sm">
            {userError?.message}
          </p>
        }
        <Button
          className="bg-primary text-primary-foreground rounded-full"
          isLoading={loading}
          type="submit"
        >
          Log In
        </Button>
      </form>
      <p className="flex gap-1">
        <span className="text-sm font-[300]">Forgot your password?</span>
        <span
          className="text-sm text-primary font-[600] cursor-pointer"
          onClick={() =>
            dispatch(authModalAction.openAuthModal("ResetPassword"))
          }
        >
          Reset
        </span>
      </p>
      <p className="flex gap-1">
        <span className="text-sm font-[300]">New Here?</span>
        <span
          className="text-sm text-primary font-[600] cursor-pointer"
          onClick={() => dispatch(authModalAction.openAuthModal("SignUp"))}
        >
          Sign Up
        </span>
      </p>
    </>
  );
};

export default LoginForm;
