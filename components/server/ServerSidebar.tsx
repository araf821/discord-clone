import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { FC } from "react";
import ServerHeader from "./ServerHeader";
import { ScrollArea } from "../ui/ScrollArea";
import ServerSearch from "./ServerSearch";
import { ChannelType, MemberRole } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/Separator";
import ServerSection from "./ServerSection";
import ServerChannel from "./ServerChannel";
import ServerMember from "./ServerMember";

interface ServerSidebarProps {
  serverId: string;
}

const channelIconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.MEMBER]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
};

const ServerSidebar: FC<ServerSidebarProps> = async ({ serverId }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channels.filter(
    (channel) => channel.type === "TEXT",
  );

  const audioChannels = server?.channels.filter(
    (channel) => channel.type === "AUDIO",
  );

  const videoChannels = server?.channels.filter(
    (channel) => channel.type === "VIDEO",
  );

  const members = server?.members.filter(
    (member) => member.profileId !== profile.id,
  );

  if (!server) {
    return redirect("/");
  }

  const role = server.members.find((member) => member.profileId === profile.id)
    ?.role;

  return (
    <div className="flex h-full w-full flex-col bg-[#f2f3f5] text-primary dark:bg-[#2b2d31]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="my-2 rounded-md bg-zinc-200 dark:bg-zinc-700" />

        {/* Rendering text channels */}
        {textChannels?.length ? (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType="TEXT"
              role={role}
              label="Text Channels"
            />
            {textChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        ) : null}

        {/* Rendering voice channels */}
        {audioChannels?.length ? (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType="AUDIO"
              role={role}
              label="Voice Channels"
            />
            {audioChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        ) : null}

        {/* Rendering video channels */}
        {videoChannels?.length ? (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType="VIDEO"
              role={role}
              label="Video Channels"
            />
            {videoChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        ) : null}

        {/* Rendering members */}
        {members?.length ? (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            {members.map((member) => (
              <ServerMember key={member.id} member={member} server={server} />
            ))}
          </div>
        ) : null}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
