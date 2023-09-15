import { VideoIcon } from "@radix-ui/react-icons";
import {
  BsArrowRightCircle,
  BsFilterCircle,
  BsCameraVideo,
} from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";

const RightIcons = () => {
  return (
    <>
      <div className="flex gap-2 md:gap-3">
        <BsArrowRightCircle className="text-[20px] cursor-pointer hidden md:block" />
        <BsFilterCircle className="text-[20px] cursor-pointer hidden md:block" />
        <BsCameraVideo className="text-[20px] cursor-pointer hidden md:block" />
        <AiOutlineMessage className="text-[20px] cursor-pointer" />
        <IoMdNotificationsOutline className="text-[20px] cursor-pointer" />
        <AiOutlinePlus className="text-[20px] cursor-pointer hidden md:block" />
      </div>
    </>
  );
};

export default RightIcons;
