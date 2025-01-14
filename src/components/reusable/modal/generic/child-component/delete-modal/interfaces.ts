export interface DeleteModalProps {
  isLoading: boolean;
  title?: string;
  deleteText?: string;
  cancelText?: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  message: string;
}
