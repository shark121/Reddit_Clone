"use client";
import { AppDispatch, RootState } from "@/app/store/store";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { authModalAction } from "@/app/store/slices/auth-modal-slice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/client-app";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Login from "../layout/auth/login/login";
import ResetPassword from "../layout/auth/reset-password/reset";
import SignUp from "../layout/auth/sign-up/sign-up";
import CreateCommunity from "../layout/navbar/communities/create-community";

const AuthModal = () => {
  const isOpen: any = useSelector<RootState>((state) => state.authModal.isOpen);
  const modalView = useSelector<RootState>((state) => state.authModal.view);
  const dispatch = useDispatch<AppDispatch>();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      () => dispatch(authModalAction.closeAuthModal());
    }
  }, [user]);

  return (
    <>
      <Modal
        backdrop="opaque"
        placement="center"
        onClose={() => dispatch(authModalAction.closeAuthModal())}
        isOpen={isOpen}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 items-center">
              {modalView === "LogIn" && "Log In"}
              {modalView === "SignUp" && "Sign Up"}
              {modalView === "CreateCommunity" && "Create Community"}
            </ModalHeader>
            <ModalBody>
              {" "}
              {modalView === "LogIn" && <Login />}
              {modalView === "SignUp" && <SignUp />}
              {modalView === "ResetPassword" && <ResetPassword />}
              {modalView === "CreateCommunity" && <CreateCommunity />}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
