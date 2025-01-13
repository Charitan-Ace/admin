import * as yup from 'yup';
// import { CreateAccountFormFields } from '../types/interfaces';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

export const createAccountSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  firstName: yup
    .string()
    .when('userType', {
      is: 'donor',
      then: (schema) => schema.required('First name is required'),
      otherwise: (schema) => schema.nullable()
    }),
  lastName: yup
    .string()
    .when('userType', {
      is: 'donor',
      then: (schema) => schema.required('Last name is required'),
      otherwise: (schema) => schema.nullable()
    }),
  address: yup.string().nullable(),
  assetsKey: yup.string().nullable(),
  image: yup
    .mixed()
    .required('Image is required')
    .test('fileSize', 'Max file size is 5MB', (value) => {
      if (!value || !value[0]) return false;
      return value[0].size <= MAX_FILE_SIZE;
    })
    .test('fileType', '.jpg, .jpeg, .png and .webp files are accepted', (value) => {
      if (!value || !value[0]) return false;
      return ACCEPTED_IMAGE_TYPES.includes(value[0].type);
    }),
  video: yup
    .mixed()
    .nullable()
    .test('fileSize', 'Max file size is 5MB', (value) => {
      if (!value || !value[0]) return true;
      return value[0].size <= MAX_FILE_SIZE;
    })
    .test('fileType', '.mp4, .webm and .ogg files are accepted', (value) => {
      if (!value || !value[0]) return true;
      return ACCEPTED_VIDEO_TYPES.includes(value[0].type);
    })
});

export type CreateAccountFormData = yup.InferType<typeof createAccountSchema>;
