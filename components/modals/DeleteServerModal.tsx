"use client";

import { FC, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface DeleteServerModalProps {}

const DeleteServerModal: FC<DeleteServerModalProps> = ({}) => {
  const { isOpen, close, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteServer";

  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);

      close();
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={close}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>{" "}
            will be permanently. This action cannot be undone!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isLoading} onClick={close} variant={"ghost"}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onConfirm}
              variant={"primary"}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModal;
