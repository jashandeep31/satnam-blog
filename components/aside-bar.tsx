"use client";
import { Notification } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const AsideBar = ({ notifications }: { notifications: Notification[] }) => {
  return (
    <aside className="md:col-span-2">
      <div className="sticky top-6">
        <div className="md:flex  hidden flex-wrap  gap-1 mb-3  justify-end  ">
          <input
            type="text"
            className=" border block  border-primary/30  py-1 px-2"
          />
          <button className="bg-primary text-white  px-2">
            <Search size={20} />
          </button>
        </div>
        <div className="border ">
          <h2 className="bg-primary py-3 text-white text-lg  text-center font-bold">
            Notifications
          </h2>
          <div>
            <ul className="max-h-48 overflow-auto">
              {notifications.map((notification, index) => (
                <li
                  className="border-b text-sm text-blue-500 py-2 px-1 underline"
                  key={index}
                >
                  <Link href={notification.link}>{notification.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AsideBar;
