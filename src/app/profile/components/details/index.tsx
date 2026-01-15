import { useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Pencil } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Form } from '@/components/ui/form.tsx';
import { TextInput } from '@/components/text-input';
import { Button } from '@/components/ui/button.tsx';
import { useUpdateUserDetails } from '@/services/auth';
import { useAuthStore } from '@/stores/auth/auth.store.ts';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function ProfileUserDetails() {
  const { user, setUser } = useAuthStore();
  const { mutateAsync, isPending } = useUpdateUserDetails();

  const formSchema = z.object({
    fullName: z.string().min(1, 'Full Name is required'),
    email: z.string(),
    picture: z
      .any()
      .optional()
      .refine((files) => {
        // If no files are selected, validation passes (optional)
        if (!files || files.length === 0) return true;
        // If a file exists, it must be exactly one
        return files.length === 1;
      }, 'Only one file can be uploaded.')
      .refine((files) => {
        if (!files || files.length === 0) return true;
        return files[0].size <= MAX_FILE_SIZE;
      }, `Max file size is 5MB.`)
      .refine((files) => {
        if (!files || files.length === 0) return true;
        return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
      }, '.jpg, .png and .webp files are accepted.'),
  });

  type FormType = z.infer<typeof formSchema>;

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      fullName: user?.fullName,
      email: user?.email,
      picture: undefined,
    },
  });

  const onSubmit = useCallback(
    (values: FormType) => {
      console.log(values);
      const formData = new FormData();
      formData.append('fullName', values.fullName);
      if (values.picture && !!values.picture[0]) {
        formData.append('picture', values.picture[0]);
      }

      mutateAsync(formData)
        .then((response) => {
          toast.success('Profile updated successfully');
          setUser(response.data);
          form.reset(values);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || 'Unable to update profile');
        });
    },
    [mutateAsync, form],
  );

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
        <CardDescription>Change profile picture and name</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ProfilePicture />

            <TextInput
              control={form.control}
              name="email"
              placeholder="Email Address"
              label="Email Address"
              disabled
            />

            <TextInput
              control={form.control}
              name="fullName"
              placeholder="Full Name"
              label="Full Name"
            />

            <Button
              size="lg"
              className="w-full"
              disabled={!form.formState.isValid || !form.formState.isDirty || isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Saving
                </>
              ) : (
                'Save'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function ProfilePicture() {
  const { user } = useAuthStore();
  const { register, watch, getFieldState } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);

  // Watch the "file" field for changes
  const selectedFile = watch('picture');
  const pictureField = getFieldState('picture');

  useEffect(() => {
    // If no file is selected, clear preview
    if (!selectedFile || selectedFile.length === 0) {
      setPreview(null);
      return;
    }

    // Create a temporary URL for the first file in the FileList
    const objectUrl = URL.createObjectURL(selectedFile[0]);
    setPreview(objectUrl);

    // Free memory when component unmounts or file changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <div>
      <label className="size-32 rounded-full ring-4 ring-offset-2 ring-primary/20 overflow-hidden block mx-auto relative cursor-pointer group">
        <img
          src={preview || user?.image || 'https://github.com/shadcn.png'}
          alt=" "
          className="size-full object-cover object-center"
        />
        <div className="size-full absolute top-0 left-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-100">
          <Pencil className="size-6" />
        </div>
        <input type="file" {...register('picture')} accept="image/*" hidden />
      </label>
      <p className="text-destructive text-sm mt-2">{pictureField.error?.message}</p>
    </div>
  );
}
