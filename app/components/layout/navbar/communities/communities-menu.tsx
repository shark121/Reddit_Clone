"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";
import { AppDispatch } from "@/app/store/store";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { BsPlus } from "react-icons/bs";
import { TiHome } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { createCommunityModalAction } from "../../../../store/slices/create-community-modal";

const CommunitiesMenu = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex whitespace-nowrap items-center gap-1 justify-between outline-2 outline-red-500 cursor-pointer">
            <TiHome className="text-2xl" />
            <p className="hidden sm:block sm:mr-16 md:mr-20 lg:mr-24">Home</p>
            <ChevronDownIcon />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuLabel>r/A-computer science</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex whitespace-nowrap gap-1 items-center cursor-pointer"
              onClick={() => dispatch(createCommunityModalAction.openModal())}
            >
              <BsPlus className="text-xl" />
              <p>Create Community</p>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CommunitiesMenu;
