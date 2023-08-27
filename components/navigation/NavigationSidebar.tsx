import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { FC } from "react";
import NavigationAction from "./NavigationAction";
import { Separator } from "../ui/Separator";
import { ScrollArea } from "../ui/ScrollArea";
import NavigationItem from "./NavigationItem";

interface NavigationSidebarProps {}

const NavigationSidebar: FC<NavigationSidebarProps> = async ({}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 py-3 text-primary dark:bg-[#1e1f22]">
      <NavigationAction />
      <Separator className="mx-auto h-[2px] w-12 rounded-md bg-zinc-300 dark:bg-zinc-700" />

      <ScrollArea className="w-full flex-1">
        {servers.map((server) => (
          <div className="mb-4" key={server.id}>
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default NavigationSidebar;
