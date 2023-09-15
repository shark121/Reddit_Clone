"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { User, signOut } from "firebase/auth";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { auth } from "@/app/firebase/client-app";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { authModalAction } from "@/app/store/slices/auth-modal-slice";

interface UserMenuProps {
  user?: User | null;
}

const UserMenu = ({ user }: UserMenuProps) => {
  const [position, setPosition] = React.useState("bottom");
  const handleSignOut = async () => {
    await signOut(auth);
  };
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenAuthModal = () => {
    dispatch(authModalAction.openAuthModal("LogIn"));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          {user ? (
            <div className="flex whitespace-nowrap items-center hover:outline-1 hover:outline-gray-200">
              <FaRedditSquare className="mr-1 text-gray-300 text-[24px]" />
              <div className="hidden min-w-[480px]:flex min-w-[480px]:flex-col">
                <p className="text-sm space-y-0">
                  {user?.displayName || user.email?.split("@"[0])}
                </p>
                <p className="flex gap-1 whitespace-nowrap">
                  <IoSparkles className="text-red-600 text-[13px]" />
                  <span className="text-xs text-gray-500 space-y-0">
                    {"1 karma"}
                  </span>
                </p>
              </div>
              <ChevronDownIcon />
            </div>
          ) : (
            <div className="flex whitespace-nowrap items-center hover:outline-1 hover:outline-gray-200">
              <VscAccount className="mr-1 text-gray-400 text-[24px]" />
              <ChevronDownIcon />
            </div>
          )}
        </DropdownMenuTrigger>
        {user ? (
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="flex items-center gap-1 whitespace-nowrap cursor-pointer">
              <CgProfile className="text-[20px]" />
              <p>Profile</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel
              className="flex items-center gap-1 whitespace-nowrap cursor-pointer"
              onClick={handleSignOut}
            >
              <MdOutlineLogin className="text-[20px]" />
              <p>Log Out</p>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent>
            <DropdownMenuLabel
              className="flex items-center gap-1 whitespace-nowrap cursor-pointer"
              onClick={handleOpenAuthModal}
            >
              <MdOutlineLogin className="text-[20px]" />
              <p>Log In/Sign Up</p>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
