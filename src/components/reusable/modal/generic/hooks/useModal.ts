import { useState, useCallback } from "react";
import { UseModalReturn } from "./interfaces";

const useModal = (withId = true): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState<
    string | number | string[] | number[] | undefined
  >(undefined);

  const openModal = useCallback(
    (id: string | number | string[] | number[] | undefined, title: string) => {
      setTitle(title);
      setIsOpen(true);

      if (withId) {
        setId(id);
      }
    },
    [withId],
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTitle("");
    if (withId) {
      setId(undefined);
    }
  }, [withId]);

  return { id, isOpen, title, openModal, closeModal };
};

export default useModal;
