export interface UseModalReturn {
  id?: string | string[];
  isOpen: boolean;
  title: string;
  openModal: (
    id: string | string[] | undefined,
    title: string,
    type?: unknown,
  ) => void;
  closeModal: () => void;
  type?: unknown;
}
