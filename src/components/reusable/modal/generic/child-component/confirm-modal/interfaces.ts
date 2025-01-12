export interface ConfirmModalProps {
  id: string | number | string[] | number[];
  title?: string;
  confirmText?: string;
  cancelText?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}
