"use client";

import { ServerWithMembersAndProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMembersAndProfiles;
  role?: MemberRole;
}

const ServerHeader: FC<ServerHeaderProps> = ({ role, server }) => {
  const { open } = useModal();

  const isAdmin = role === "ADMIN";
  const isModerator = isAdmin || role === "MODERATOR";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="text-md flex h-12 w-full items-center border-b-2 border-neutral-200 px-3 font-semibold transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50">
          {server.name}
          <ChevronDown className="ml- h-5 w-5 md:ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-30 w-56 space-y-0.5 bg-gray-50 p-1 text-sm font-medium text-black dark:bg-zinc-900 dark:text-neutral-400">
        {isModerator ? (
          <DropdownMenuItem
            onClick={() => open("invite", { server })}
            className="cursor-pointer px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400"
          >
            Invite People
            <UserPlus className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        ) : null}
        {isAdmin ? (
          <DropdownMenuItem
            onClick={() => open("editServer", { server })}
            className="cursor-pointer px-3 py-2 text-sm"
          >
            Server Settings
            <Settings className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        ) : null}
        {isAdmin ? (
          <DropdownMenuItem
            onClick={() => open("members", { server })}
            className="cursor-pointer px-3 py-2 text-sm"
          >
            Manage Members
            <Users className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        ) : null}
        {isModerator ? (
          <DropdownMenuItem
            onClick={() => open("createChannel")}
            className="cursor-pointer px-3 py-2 text-sm"
          >
            Create Channel
            <PlusCircle className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        ) : null}

        {isModerator ? <DropdownMenuSeparator /> : null}

        {isAdmin && (
          <DropdownMenuItem
            onClick={() => open("deleteServer", { server })}
            className="cursor-pointer px-3 py-2 text-sm text-rose-500"
          >
            Delete Server
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {!isAdmin ? (
          <DropdownMenuItem
            onClick={() => open("leaveServer", { server })}
            className="cursor-pointer px-3 py-2 text-sm text-rose-500"
          >
            Leave Server
            <LogOut className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
