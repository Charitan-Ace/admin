import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createAccountSchema } from '@/components/views/create-account/schemas/createAccountSchema'
import { CreateAccountFormFields } from './types/interfaces'
import FormInput from "@/components/reusable/form/input/FormInput"

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"]

export function CreateAccountForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)

  const form = useForm<CreateAccountFormFields>({
    resolver: yupResolver(createAccountSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      organizationName: "",
      address: "",
      assetsKey: "",
      userType: "person",
    },
  })

  const userType = form.watch("userType")

  useEffect(() => {
    if (userType === "person") {
      form.setValue("organizationName", "")
    } else {
      form.setValue("firstName", "")
      form.setValue("lastName", "")
    }
  }, [userType, form])

  async function onSubmit(values: CreateAccountFormFields) {
    // In a real application, you would send this data to your server
    console.log(values);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setVideoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>User Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="person" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Person
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="company" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Company
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="non-profit" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Non-profit Organization
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormInput
          id="email"
          type="email"
          label="Email"
          placeholder="email@example.com"
          error={form.formState.errors.email?.message?.toString()}
          register={form.register}
        />
        {userType === "person" ? (
          <>
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
          </>
        ) : (
          <FormInput
            id="organizationName"
            type="text"
            label="Organization Name"
            placeholder="Acme Inc."
            error={form.formState.errors.organizationName?.message?.toString()}
            register={form.register}
          />
        )}

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
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
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
          accept={ACCEPTED_VIDEO_TYPES.join(',')}
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

        <Button type="submit">Create User</Button>
      </form>
    </Form>
  )
}

