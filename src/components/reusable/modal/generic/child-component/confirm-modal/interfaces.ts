export interface ConfirmModalProps {
  title?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}
