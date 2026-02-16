import { AlertCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';
import type { FormEventHandler } from 'react';
import type { AxiosError } from 'axios';
import { Button } from '@/components/ui/button.tsx';
import { TextInput } from '@/components/text-input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { Form } from '@/components/ui/form.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { useSignupService } from '@/services/admin';
import { useAuthStore } from '@/stores/auth/auth.store.ts';
import { handleHttpError } from '@/lib/utils.ts';
import { UserSignupType } from '@/types';
import { CountryField } from '@/app/join/country-field.tsx';

export function JoinPage() {
  const { email, token } = useSearch({ from: '/_external/join' });

  const { mutateAsync, isPending, error } = useSignupService();
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const formSchema = z.object({
    email: z.string().email(),
    token: z.string(),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    fullName: z.string().min(1, 'Full Name is required'),
    countryId: z.coerce.number(),
    signupType: z.nativeEnum(UserSignupType),
    password: z.string().optional(),
    thirdPartyToken: z.string().optional(),
  });

  type FormType = z.infer<typeof formSchema>;

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      email,
      token,
      phoneNumber: '',
      password: '',
      fullName: '',
      signupType: UserSignupType.PASSWORD,
    },
  });

  const onSubmit = useCallback(
    (values: FormType) => {
      mutateAsync({ ...values, userType: 'CUSTOMER' })
        .then((response) => {
          setToken({ authToken: response.data.token, refreshToken: response.data.refreshToken });
          navigate({ to: '/', replace: true });
        })
        .catch((err) => {
          handleHttpError(err, form);
        });
    },
    [mutateAsync, setToken, navigate],
  );

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      try {
        const values = form.getValues();
        onSubmit({
          ...values,
          password: '',
          thirdPartyToken: codeResponse.access_token,
          signupType: UserSignupType.GOOGLE,
        });
      } catch (e) {
        console.error(e);
      }
    },
    onError: () => {
      toast.error('Unable to join with Google');
    },
    flow: 'implicit',
  });

  const handleGoogleJoinClick = useCallback(async () => {
    try {
      form.clearErrors();
      const valid = await form.trigger();
      if (valid) {
        loginWithGoogle();
      }
    } catch (e) {}
  }, [loginWithGoogle, form]);

  const handlePasswordJoinClick: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      const password = form.getValues('password');
      if (!password || password.length < 6) {
        form.setError('password', {
          message: 'Password must be at least 6 characters',
          type: 'minLength',
        });
        return;
      }
      form.handleSubmit(onSubmit)(e);
    },
    [form, onSubmit],
  );

  return (
    <div className="p-6">
      <Card className="w-full max-w-md mx-auto gap-0 text-center shadow-none">
        <CardHeader>
          <CardTitle>
            <img src="/images/kbmatrix-logo.svg" alt="logo" className="size-12 mb-4 mx-auto" />
            <h3>Join KBMatrix Admin</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Kindly provide your details below to accept the invitation
          </p>

          <Form {...form}>
            <form onSubmit={handlePasswordJoinClick} className="grid gap-6 my-10 text-left">
              {!!error && (
                <Alert variant="destructive">
                  <AlertCircle />
                  <AlertTitle>An error occurred</AlertTitle>
                  <AlertDescription>
                    {(error as AxiosError<any>).response?.data?.message ?? error.message}
                  </AlertDescription>
                </Alert>
              )}
              <TextInput
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="Email Address"
                disabled
              />
              <TextInput
                control={form.control}
                name="fullName"
                label="Full Name"
                placeholder="Full Name"
                autoComplete="name"
              />
              <div className="grid grid-cols-[minmax(8rem,1fr)_minmax(10rem,3fr)] gap-4">
                <div>
                  <CountryField />
                </div>
                <TextInput
                  control={form.control}
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Phone Number"
                  autoComplete="phone"
                />
              </div>
              <TextInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
              <Button
                size="lg"
                type="submit"
                disabled={isPending || !form.formState.isValid || !form.formState.isDirty}
              >
                {isPending && <Loader2 className="animate-spin" />}
                Join with Password
              </Button>
              <Button
                onClick={handleGoogleJoinClick}
                size="lg"
                variant="outline"
                className="w-full"
                disabled={isPending}
                type="button"
              >
                <Icon icon="logos:google-icon" width="256" height="262" />
                Join with Google
              </Button>
            </form>
          </Form>

          <div>
            <p className="text-sm">Already an admin?</p>
            <p>
              <Link to="/login" className="text-primary text-sm underline">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
