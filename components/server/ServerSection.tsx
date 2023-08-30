"use client";

import { ServerWithMembersAndProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { FC } from "react";
import ActionTooltip from "../ActionTooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersAndProfiles;
}

const ServerSection: FC<ServerSectionProps> = ({
  label,
  sectionType,
  channelType,
  role,
  server,
}) => {
  const { open } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== "MEMBER" && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            onClick={() => open("createChannel")}
            className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 hover:dark:text-zinc-300"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}

      {role === "ADMIN" && sectionType === "members" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            onClick={() => open("members", { server })}
            className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 hover:dark:text-zinc-300"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
