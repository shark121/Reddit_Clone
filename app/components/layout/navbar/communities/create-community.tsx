"use client";
import { Input } from "@/app/components/ui/input";
import { AppDispatch, RootState } from "@/app/store/store";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { createCommunityModalAction } from "../../../../store/slices/create-community-modal";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, firestore } from "@/app/firebase/client-app";
import { useAuthState } from "react-firebase-hooks/auth";

const CreateCommunity = () => {
  const [communityName, setCommunityName] = useState({
    remaining: "21",
    entered: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [commPrivacy, setCommPrivacy] = useState("public");
  const [user] = useAuthState(auth);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value.trim() === value && value.length < 22) {
      setCommunityName((prev) => ({ ...prev, entered: value }));
      setCommunityName((prev) => ({
        ...prev,
        remaining: String(21 - prev.entered.length),
      }));
    }
  };
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (
      format.test(communityName.entered) ||
      communityName.entered.length < 3
    ) {
      setError(
        "Community name must be between 3 and 21 characters, and can only contain letters and numbers."
      );
      return;
    }
    setIsLoading(true);
    try {
      const communityDocRef = doc(
        firestore,
        "communities",
        communityName.entered
      );
      await runTransaction(firestore, async (transaction) => {
        console.log(communityName);
        const communityDoc = await transaction.get(communityDocRef);

        if (!communityDoc.exists()) {
          throw new Error(
            `Sorry, r/${communityName.entered} is taken. Try another.`
          );
        }

        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: commPrivacy,
        });

        transaction.set(
          doc(
            firestore,
            `users/${user?.uid}/communitySnippets`,
            communityName.entered
          ),
          {
            communityId: communityName.entered,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  };
  const isOpen: any = useSelector<RootState>(
    (state) => state.createCommunityModal.isOpen
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Modal
        backdrop="opaque"
        placement="center"
        onClose={() => dispatch(createCommunityModalAction.closeModal())}
        isOpen={isOpen}
        isDismissable={false}
        size={"lg"}
        className="rounded-[5px] overflow-x-hidden"
      >
        <ModalContent>
          <ModalHeader>Create Community</ModalHeader>
          <hr />
          <ModalBody className="pb-7">
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="font-semibold">Name</h2>
                <p className="text-gray-500 text-xs">
                  Community names including capitalization cannot be changed.
                </p>
              </div>
              <div className="relative">
                <h2 className="absolute left-2 top-1 text-gray-500">r/</h2>
                <Input
                  type="text"
                  name="entered"
                  onChange={handleChange}
                  value={communityName.entered}
                  className="pl-5 text-sm"
                />
                <p
                  className={twMerge(
                    "text-xs",
                    Number(communityName.remaining) === 0
                      ? "text-red-500"
                      : "text-gray-500"
                  )}
                >{`${communityName.remaining} Characters remaining.`}</p>
              </div>
              <div>
                <h2 className="font-semibold">Community type</h2>
                <RadioGroup value={commPrivacy} onValueChange={setCommPrivacy}>
                  <Radio value={"public"} className="flex">
                    <p className="font-semibold text-[0.9375rem] flex gap-2 items-center ">
                      <BsFillPersonFill /> <span>Public</span>
                      <span className="text-gray-500 text-xs font-normal whitespace-nowrap self-end">
                        Anyone can view, post, and comment to this community.
                      </span>
                    </p>
                  </Radio>
                  <Radio value={"restricted"} className="flex ">
                    <p className="font-semibold text-[0.9375rem] flex gap-2 items-center ">
                      <BsFillEyeFill /> <span>Restricted</span>
                      <span className="text-gray-500 text-xs font-normal whitespace-nowrap self-end">
                        Anyone can view this community, but only approved users
                        can post.
                      </span>
                    </p>
                  </Radio>
                  <Radio value={"private"} className="flex ">
                    <p className="font-semibold text-[0.9375rem] flex gap-2 items-center ">
                      <HiLockClosed /> <span>Public</span>
                      <span className="text-gray-500 text-xs font-normal whitespace-nowrap self-end">
                        Only approved users can view and submit to this
                        community.
                      </span>
                    </p>
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="p-0">
            <div className="w-full px-2 py-3 bg-blue-100 dark:bg-gray-300 flex gap-2 justify-end">
              <Button
                className="text-primary bg-transparent"
                onClick={() =>
                  dispatch(createCommunityModalAction.closeModal())
                }
              >
                Close
              </Button>
              <Button
                className="bg-primary text-primary-foreground"
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                Create Community
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunity;
