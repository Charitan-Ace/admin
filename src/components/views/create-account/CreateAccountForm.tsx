import { useState, useEffect } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createAccountSchema } from "@/components/views/create-account/schemas/createAccountSchema";
import { CreateAccountFormFields } from "./types/interfaces";
import FormInput from "@/components/reusable/form/input/FormInput";
import GenericModal from "@/components/reusable/modal/generic/GenericModal";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

interface CreateAccountFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAccountFormFields) => void;
  loading: boolean;
}

export function CreateAccountForm({
  isOpen,
  onClose,
  onSubmit,
  loading,
}: CreateAccountFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      alert("Please upload a valid image file");
      return;
    }

    try {
      const objectUrl = URL.createObjectURL(file);
      setImageFile(file);
      setImagePreview(objectUrl);
      console.log("Setting image in form:", files); // Add this log
      form.setValue('image', files, { 
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
      console.log("Current form values:", form.getValues()); // Add this log
    } catch (error) {
      console.error('Error handling image:', error);
    }
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    form.setValue("image", null);
    const imageInput = document.getElementById('image') as HTMLInputElement;
    if (imageInput) imageInput.value = '';
  };

  // Modified cleanup
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  // Add file information display
  const renderFileInfo = (file: File | null) => {
    if (!file) return null;
    return (
      <div className="text-sm text-gray-500 mt-1 mb-2">
        <p>File name: {file.name}</p>
        <p>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
        <p>Type: {file.type}</p>
      </div>
    );
  };

  const onSubmitWrapper = (data: CreateAccountFormFields) => {
    // Ensure we're passing the actual file in the form data
    const formData = {
      ...data,
      image: imageFile ? [imageFile] : undefined // Use the imageFile state instead of form value
    };
    console.log("Submitting form with data:", formData);
    onSubmit(formData);
  };

  return (
    <GenericModal
      title="Create New Account"
      isOpen={isOpen}
      onClose={onClose}
      bodyContent={
        <div className="max-h-[60vh] overflow-y-auto pr-4">
          <p className="text-sm text-gray-600 mb-4">
            Please fill in details to create a new account. User will receive
            email with them.
          </p>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmitWrapper)}>
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

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex flex-col gap-4">
                    <FormInput
                      id="image"
                      type="file"
                      label="Profile Image"
                      accept={ACCEPTED_IMAGE_TYPES.join(",")}
                      error={form.formState.errors.image?.message?.toString()}
                      register={form.register}
                      onChange={handleImageChange}
                    />
                    {renderFileInfo(imageFile)}
                    {imagePreview && (
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="rounded-md max-w-[200px] h-auto object-contain"
                          onError={(e) => console.error('Image loading error:', e)}
                          onLoad={() => console.log('Image loaded successfully')}
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md z-10"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      }
      footerContent={
        <>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmitWrapper)}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </>
      }
    />
  );
}


// create -> createAccount (chua co) -> {
  
//   get user id
//   redirect ve cai bang;

//   upload{
//     get preURL voi userID (goi api) -> callback 
//   }
// }
