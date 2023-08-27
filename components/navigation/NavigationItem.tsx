"use client";

import { FC } from "react";
import ActionTooltip from "../ActionTooltip";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

const NavigationItem: FC<NavigationItemProps> = ({ id, imageUrl, name }) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/server/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 w-1 rounded-r-full bg-primary transition-all",
            params?.serverId !== id && "group-hover:h-5",
            params?.serverId === id ? "h-9" : "h-2",
          )}
        />
        <div
          className={cn(
            "group relative mx-3 flex h-12 w-12 overflow-hidden rounded-full transition-all group-hover:rounded-[16px]",
            params?.serverId === id &&
              "rounded-[16px] bg-primary/10 text-primary",
          )}
        >
          <Image fill alt="server image" src={imageUrl} className="" />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
