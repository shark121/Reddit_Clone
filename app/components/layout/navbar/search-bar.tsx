"use client"
import { BsSearch } from "react-icons/bs";
import { Input } from "../../ui/input";
export function SearchBar() {
  return (
    <div className="flex flex-grow items-center border border-gray-300 rounded-full active:border-blue-600 pl-2 bg-[#F6F7F8]">
      <span className="pl-3  text-gray-500">
        <BsSearch />
      </span>
      <Input
        type="text"
        className="flex-1  border-0 focus-visible:ring-0 placeholder:text-base "
        placeholder="Search Reddit"
      />
    </div>
  );
}
