import { FC } from "react";
import { Avatar, AvatarImage } from "./ui/Avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  className?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ className, src }) => {
  return (
    <Avatar>
      <AvatarImage
        src={src}
        className={cn("h-7 w-7  md:h-10 md:w-10", className)}
      />
    </Avatar>
  );
};

export default UserAvatar;
