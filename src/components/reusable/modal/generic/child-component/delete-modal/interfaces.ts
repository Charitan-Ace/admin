export interface DeleteModalProps {
  id: string | number | string[] | number[];
  title?: string;
  deleteText?: string;
  cancelText?: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  message: string;
}
