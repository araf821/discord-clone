"use client";

import { Settings } from "lucide-react";
import { FC } from "react";
import { Button } from "./ui/Button";
import { Profile } from "@prisma/client";
import { useModal } from "@/hooks/use-modal-store";

interface SettingsButtonProps {
  profile: Profile;
}

const SettingsButton: FC<SettingsButtonProps> = ({ profile }) => {
  const { open } = useModal();

  return (
    <Button
      onClick={() => open("settings", { profile })}
      className="border-0 bg-transparent"
      variant="outline"
      size="icon"
    >
      <Settings className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
};

export default SettingsButton;
