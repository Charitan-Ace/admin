import React from "react";
import { Button } from "@/components/ui/button";
import GenericModal from "../../GenericModal";
import { DeleteModalProps } from "./interfaces";

const DeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  message,
  title = "Confirm Deletion",
  deleteText = "Delete",
  cancelText = "Cancel",
}: DeleteModalProps) => (
  <GenericModal
    title={title}
    isOpen={isOpen}
    onClose={onClose}
    bodyContent={<div>{message}</div>}
    footerContent={
      <div>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button onClick={onDelete}>{deleteText}</Button>
      </div>
    }
  />
);

export default DeleteModal;
