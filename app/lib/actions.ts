'use server';

import { redirect } from 'next/navigation'
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import axios from 'axios';
import { SignupFormSchema} from '@/app/lib/definitions'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signup(formData: FormData) {
  try {
    console.log('FormData entries:', Array.from(formData.entries()));

    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
      fullname: formData.get('fullname') || '',
      email: formData.get('email') || '',
      phone_no: formData.get('phone_no') || '',
      password: formData.get('password') || '',
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { fullname, email, phone_no, password } = validatedFields.data;
    const role = 'user';
    const is_active = true;
    const response = await axios.post('http://127.0.0.1:8000/user/register', {
      fullname,
      role,
      email,
      phone_no,
      is_active,
      password,
    });

    console.log('Response:', response.data);
    return { success: true }; // Return success instead of redirecting
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.detail || 'An error occurred during registration.' };
    }
    return { error: 'An error occurred during registration.' };
  }
}
