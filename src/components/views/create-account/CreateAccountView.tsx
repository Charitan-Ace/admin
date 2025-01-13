import { useState } from "react";
import { CreateAccountForm } from "./CreateAccountForm";
// import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CreateAccountView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateAccount = async (success: boolean) => {
    if (success) {
      console.log("Account created successfully");
      setIsModalOpen(false);
    } else {
      console.log("Failed to create account");
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <Button onClick={() => setIsModalOpen(true)}>Create New Account</Button>

      <CreateAccountForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitStatus={handleCreateAccount}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default CreateAccountView;
