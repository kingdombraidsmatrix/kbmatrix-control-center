import { Link, useNavigate } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import type { LoginRequest } from '@/types/auth.types.ts';
import type { AxiosError } from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Form } from '@/components/ui/form.tsx';
import { TextInput } from '@/components/text-input';
import { Button } from '@/components/ui/button.tsx';
import { useAuthService } from '@/services/auth';
import { useAuthStore } from '@/stores/auth/auth.store.ts';
import { handleHttpError } from '@/lib/utils.ts';
import { UserSignupType } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function LoginPage() {
  const { setToken } = useAuthStore();
  const { mutateAsync, isPending, error } = useAuthService();
  const navigate = useNavigate();

  const formSchema = z.object({
    login: z.string().min(1, { message: 'Username is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
    signupType: z.enum([UserSignupType.PASSWORD]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
      signupType: UserSignupType.PASSWORD,
    },
  });

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      handleSubmit({
        signupType: UserSignupType.GOOGLE,
        thirdPartyToken: codeResponse.access_token,
      });
    },
    onError: () => {
      toast.error('Unable to login with Google');
    },
    flow: 'implicit',
  });

  const handleSubmit = useCallback(
    (values: LoginRequest) => {
      mutateAsync({ ...values, userType: 'CUSTOMER' })
        .then((response) => {
          setToken({ authToken: response.data.token, refreshToken: response.data.refreshToken });
          navigate({ to: '/', replace: true });
        })
        .catch((error) => {
          handleHttpError(error, form);
        });
    },
    [mutateAsync, setToken],
  );

  return (
    <div className="p-6">
      <Card className="w-full max-w-md mx-auto gap-0 text-center shadow-none">
        <CardHeader>
          <CardTitle>
            <img src="/images/kbmatrix-logo.svg" alt="logo" className="size-12 mb-4 mx-auto" />
            <h3>Welcome back,</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Login to manage KB Matrix</p>

          <div className="mt-6">
            <Button
              onClick={() => loginWithGoogle()}
              size="lg"
              variant="outline"
              className="w-full"
              type="button"
              disabled={isPending}
            >
              <Icon icon="logos:google-icon" width="256" height="262" />
              Sign in with Google
            </Button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-6 my-10 text-left">
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
                name="login"
                label="Username"
                placeholder="Username"
                autoComplete="username"
              />
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
                Login
              </Button>
            </form>
          </Form>

          <div>
            <p className="text-sm">Can't remember your password?</p>
            <p>
              <Link to="/" className="text-primary text-sm underline">
                Reset Password
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
