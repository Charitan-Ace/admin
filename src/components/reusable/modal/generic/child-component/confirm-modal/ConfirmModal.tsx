import { Button } from "@/components/reusable/button/Button";
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
      <div className="flex flex-row gap-x-2">
        <Button variant="outline" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="success" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    }
  />
);

export default ConfirmModal;
