import { useState, useCallback } from "react";
import { UseModalReturn } from "./interfaces";

const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const openModal = useCallback((title: string) => {
    setTitle(title);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTitle("");
  }, []);

  return { isOpen, title, openModal, closeModal };
};

export default useModal;
