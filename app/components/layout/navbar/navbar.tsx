import { SearchBar } from "./search-bar";
import Image from "next/image";
import redditFace from "@/public/images/redditFace.svg";
import redditText from "@/public/images/redditText.svg";
import AuthButtons from "./auth-buttons";
import { auth } from "@/app/firebase/client-app";
import RightIcons from "./icons";
import UserMenu from "./user-menu";
import CommunitiesMenu from "./communities/communities-menu";

const Navbar = async () => {
  const user = await auth.currentUser;
  return (
    <nav className="bg-white flex  h-[44px] px-[6px] py-3 items-center justify-evenly gap-3">
      <div id="logo" className="flex gap-0">
        <Image src={redditFace} alt="reddit logo" width={24} height={24} />
        <Image src={redditText} alt="reddit text" height={46} />
      </div>
      <CommunitiesMenu />
      <SearchBar />
      {user ? <RightIcons /> : <AuthButtons />}
      <UserMenu user={user} />
    </nav>
  );
};

export default Navbar;
