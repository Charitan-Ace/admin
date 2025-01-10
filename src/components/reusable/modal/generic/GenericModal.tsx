import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const GenericModal = ({
  title,
  isOpen,
  onClose,
  bodyContent,
  footerContent,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  bodyContent: React.ReactNode;
  footerContent: React.ReactNode;
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>

      <div>{bodyContent}</div>

      <DialogFooter>{footerContent}</DialogFooter>
    </DialogContent>
  </Dialog>
);

export default GenericModal;
