export interface UseModalReturn {
  isOpen: boolean;
  title: string;
  openModal: (title: string) => void;
  closeModal: () => void;
}
