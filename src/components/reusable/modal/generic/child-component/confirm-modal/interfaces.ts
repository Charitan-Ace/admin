export interface ConfirmModalProps {
  title?: string;
  confirmText?: string;
  cancelText?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}
