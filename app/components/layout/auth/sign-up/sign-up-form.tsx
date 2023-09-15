"use client";
import { Input } from "@/app/components/ui/input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { authModalAction } from "@/app/store/slices/auth-modal-slice";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/client-app";
import { Button } from "@nextui-org/react";
import FirebaseErrors from "@/app/firebase/errors";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const SignUpForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    if (formData.password.length < 8 || formData.confirmPassword.length < 8) {
      setFormError("Password must be at least 8 characters");
    }
    await createUserWithEmailAndPassword(formData.email, formData.password);
    if (userError) {
      setFormError(String(userError));
    }
    if (!formError) {
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
      setFormError("");
    }
    onAuthStateChanged(auth, (user) => {
      user ? dispatch(authModalAction.closeAuthModal()) : null;
    });
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
        <Input
          type="password"
          className="rounded-md focus:bg-blue-100 focus-visible:ring-0"
          required
          placeholder="confirm password"
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
        />
        {formError && (
          <p className="text-red-500 text-center text-sm">
            {FirebaseErrors[formError as keyof typeof FirebaseErrors]}
          </p>
        )}
        <Button
          type="submit"
          className="rounded-full text-primary-foreground bg-primary"
          disabled={loading}
        >
          Sign Up
        </Button>
      </form>
      <p className="flex gap-1">
        <span className="text-sm font-[300]">Already have an account?</span>
        <span
          className="text-sm text-primary font-[600] cursor-pointer"
          onClick={() => dispatch(authModalAction.openAuthModal("LogIn"))}
        >
          Log In
        </span>
      </p>
    </>
  );
};

export default SignUpForm;
