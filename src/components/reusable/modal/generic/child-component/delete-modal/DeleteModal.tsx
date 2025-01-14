import { Button } from "@/components/reusable/button/Button";
import GenericModal from "../../GenericModal";
import { DeleteModalProps } from "./interfaces";

const DeleteModal = ({
  isOpen,
  isLoading,
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
      <div className="flex flex-row gap-x-2">
        <Button variant="outline" loading={isLoading} onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="destructive" loading={isLoading} onClick={onDelete}>
          {deleteText}
        </Button>
      </div>
    }
  />
);

export default DeleteModal;
