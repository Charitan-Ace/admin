import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createAccountSchema } from "@/components/views/create-account/schemas/createAccountSchema";
import { CreateAccountFormFields } from "./types/interfaces";
import FormInput from "@/components/reusable/form/input/FormInput";
import GenericModal from "@/components/reusable/modal/generic/GenericModal";
import { donorsAPI } from "../donors/services/DonorsAPI";

// const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

interface CreateAccountFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitStatus: (success: boolean, message: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function CreateAccountForm({
  isOpen,
  onClose,
  onSubmitStatus,
  isLoading,
  setIsLoading,
}: CreateAccountFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<CreateAccountFormFields>({
    resolver: yupResolver(createAccountSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    },
  });

  const onFinish = async (values: CreateAccountFormFields) => {
    try {
      setIsLoading(true);
      // const { image, video, ...formData } = values;
      const { ...formData } = values;
      console.log(formData);
      const response = await donorsAPI.createAccount(formData);

      if (response) {
        onSubmitStatus(true, "Account created successfully");
        form.reset();
      }
    } catch (error) {
      onSubmitStatus(
        false,
        error instanceof Error ? error.message : "Failed to create account",
      );
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <GenericModal
      title="Create New Account"
      isOpen={isOpen}
      onClose={onClose}
      bodyContent={
        <>
          <p className="text-sm text-gray-600 mb-4">
            Please fill in your details to create a new account.
          </p>
          <Form {...form}>
            <form className="space-y-8">
              <FormInput
                id="email"
                type="email"
                label="Email"
                placeholder="email@example.com"
                error={form.formState.errors.email?.message?.toString()}
                register={form.register}
              />
              <div className="relative">
                <FormInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder="Enter your password"
                  error={form.formState.errors.password?.message?.toString()}
                  register={form.register}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <FormInput
                id="firstName"
                type="text"
                label="First Name"
                placeholder="John"
                error={form.formState.errors.firstName?.message?.toString()}
                register={form.register}
              />
              <FormInput
                id="lastName"
                type="text"
                label="Last Name"
                placeholder="Doe"
                error={form.formState.errors.lastName?.message?.toString()}
                register={form.register}
              />
              <FormInput
                id="address"
                type="text"
                label="Address"
                placeholder="123 Main St, City, Country"
                error={form.formState.errors.address?.message?.toString()}
                register={form.register}
              />

              <FormInput
                id="image"
                type="file"
                label="Profile Image"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                error={form.formState.errors.image?.message?.toString()}
                register={form.register}
                onChange={(e) => handleImageChange(e)}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="mt-2 rounded-md max-w-xs h-auto"
                />
              )}

              <FormInput
                id="video"
                type="file"
                label="Introduction Video"
                accept={ACCEPTED_VIDEO_TYPES.join(",")}
                error={form.formState.errors.video?.message?.toString()}
                register={form.register}
                onChange={(e) => handleVideoChange(e)}
              />
              {videoPreview && (
                <video
                  src={videoPreview}
                  controls
                  className="mt-2 rounded-md max-w-xs h-auto"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </form>
          </Form>
        </>
      }
      footerContent={
        <>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(onFinish)}
            disabled={
              isLoading || Object.keys(form.formState.errors).length > 0
            }
          >
            {isLoading ? "Creating..." : "Create Account"}
          </Button>
        </>
      }
    />
  );
}
