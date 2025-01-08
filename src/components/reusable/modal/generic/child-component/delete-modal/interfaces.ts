export interface DeleteModalProps {
  title?: string;
  deleteText?: string;
  cancelText?: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  message: string;
}
