import { useState, useCallback } from "react";
import { UseModalReturn } from "./interfaces";

const useModal = (withId = true): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState<string | string[] | undefined>(undefined);
  const [type, setType] = useState<unknown>(undefined);

  const openModal = useCallback(
    (id: string | string[] | undefined, title: string, type?: unknown) => {
      setTitle(title);
      setIsOpen(true);

      if (withId) {
        setId(id);
      }
      if (type) {
        setType(type);
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
    if (type) {
      setType(undefined);
    }
  }, [withId, type]);

  return { id, isOpen, type, title, openModal, closeModal };
};

export default useModal;
