export interface UseModalReturn {
  id?: string | number | string[] | number[];
  isOpen: boolean;
  title: string;
  openModal: (
    id: string | number | string[] | number[] | undefined,
    title: string,
  ) => void;
  closeModal: () => void;
}
