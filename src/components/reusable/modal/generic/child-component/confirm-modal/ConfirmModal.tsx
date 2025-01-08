import React from "react";
import { Button } from "@/components/ui/button";
import GenericModal from "../../GenericModal";
import { ConfirmModalProps } from "./interfaces";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  title = "Confirm Action",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmModalProps) => (
  <GenericModal
    title={title}
    isOpen={isOpen}
    onClose={onClose}
    bodyContent={<div>{message}</div>}
    footerContent={
      <div>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button onClick={onConfirm}>{confirmText}</Button>
      </div>
    }
  />
);

export default ConfirmModal;
