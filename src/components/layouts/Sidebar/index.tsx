"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineLogout,
} from "react-icons/ai";
import { BsBuildings, BsGear } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const router = useRouter();

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-3">
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary"
              onClick={() => router.push("/")}
            >
              <AiOutlineHome className="mr-2 text-lg" />
              Home
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary"
            >
              <AiOutlineMessage className="mr-2 text-lg" />
              Messages
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary"
            >
              <BsBuildings className="mr-2 text-lg" />
              Company Profile
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary"
            >
              <AiOutlineUser className="mr-2 text-lg" />
              All Aplicants
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary"
              onClick={() => router.push("/job-listings")}
            >
              <HiOutlineClipboardList className="mr-2 text-lg" />
              Job Listing
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary"
            >
              <AiOutlineCalendar className="mr-2 text-lg" />
              My Schedule
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
          <Button
            variant={"ghost"}
            className="w-full justify-start rounded-none hover:text-primary"
            onClick={() => router.push("/settings")}
          >
            <BsGear className="mr-2 text-lg" />
            Setting
          </Button>
          <Button
            variant={"ghost"}
            className="w-full justify-start rounded-none text-red-500 hover:bg-red-200 hover:text-red-500"
          >
            <AiOutlineLogout className="mr-2 text-lg" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
