'use client';
import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NavBar from '../app/Components/navBar';
import Image from 'next/image';
import { EyeIcon, EyeOff, Loader2 } from 'lucide-react';
const Page = () => {
  return (
    <div className='bg-muted-background flex h-dvh w-screen flex-col overflow-hidden'>
      <div className='h-20 w-full p-3'>
        <NavBar />
      </div>
      <div className='flex flex-1 flex-col items-center pt-32'>
        <LoginComponent />
      </div>
    </div>
  );
};

export default Page;

const LoginComponent = () => {
  const [user, setUser] = React.useState(false);
  const [progress, setProgress] = React.useState(false);
  const [captcha, setCaptcha] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);
  const [data, setData] = React.useState({
    identifier: '',
    digest: '',
    cdigest: '',
    password: '',
    captcha: '',
    image: '',
  });
  const [loginError, setLoginError] = React.useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username: string | undefined = formData.get('email')?.toString();
    const password: string | undefined = formData.get('password')?.toString();
    const captchaCode: string | undefined = formData.get('captcha')?.toString();

    setLoginError('');
    if (username && !password) {
      TriggerUser(username);
    }
    if (user && !captcha && password) {
      TriggerPassword(password);
    }
    if (captcha && captchaCode && password) {
      TriggerCaptcha(password, captchaCode);
      setProgress(false);
    }
  };

  async function TriggerUser(username: string) {
    setProgress(true);

    const verifyUserResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/login/user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      },
    );
    const verifyUser = await verifyUserResponse.json();
    if (verifyUser.error) {
      setProgress(false);
      setLoginError(verifyUser.error);
      return;
    }
    if (verifyUser.statusCode === 201) {
      setProgress(false);
      setUser(true);
      setData({
        ...data,
        identifier: verifyUser.identity,
        digest: verifyUser.digest,
      });
    } else {
      setProgress(false);
      setLoginError(verifyUser.message);
    }
  }

  async function TriggerPassword(password: string) {
    setProgress(true);

    const verifyPasswordResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/login/password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          digest: data.digest,
          identifier: data.identifier,
        }),
      },
    );
    const verifyPassword = await verifyPasswordResponse.json();
    if (verifyPassword.isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', verifyPassword.cookies);
      }
      Cookies.set('isAuthenticated', 'true', {
        expires: 30,
      });
      return router.push('/app/onboarding');
    }
    setProgress(false);

    if (verifyPassword.captcha.required) {
      setLoginError(verifyPassword.message);
      setProgress(false);
      setCaptcha(true);
      setData({
        ...data,
        cdigest: verifyPassword.captcha.digest,
        image: verifyPassword.captcha.image,
      });
    }
    setLoginError(verifyPassword.message);
  }

  async function TriggerCaptcha(password: string, captchaCode: string) {
    setProgress(true);

    await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/login/captcha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        digest: data.digest,
        identifier: data.identifier,
        captcha: captchaCode,
        cdigest: data.cdigest,
      }),
    });
    setProgress(false);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex w-[300px] flex-col gap-4 rounded-xl border border-neutral-500/30 bg-orange-100 px-4 py-6'
    >
      <span className='absolute -top-4 left-0 flex w-full items-center justify-center text-sm text-black/70'>
        <h1 className='rounded border border-neutral-500/30 bg-orange-200 px-2.5 py-1'>
          password never stored
        </h1>
      </span>
      <div className='my-5 flex w-full flex-col items-center justify-center gap-2 text-2xl font-medium'>
        Login
      </div>
      {!user && (
        <input
          type='text'
          id='email'
          name='email'
          placeholder='Email'
          required
          className='rounded-lg border border-neutral-500/30 bg-orange-200 px-3 py-1.5 focus:ring-1 focus:ring-orange-300 focus:outline-none'
          autoFocus
        />
      )}
      {user && (
        <div className='relative'>
          <input
            type={hidden ? 'password' : 'text'}
            id='password'
            name='password'
            placeholder='Password'
            required
            className='w-full rounded-lg border border-neutral-500/30 bg-orange-200 px-3 py-1.5 focus:ring-1 focus:ring-orange-300 focus:outline-none'
            autoFocus
          />
          <button
            type='button'
            onClick={() => setHidden((prev) => !prev)}
            className='absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-500'
          >
            {hidden ? (
              <EyeIcon className='h-5 w-5' />
            ) : (
              <EyeOff className='h-5 w-5' />
            )}
          </button>
        </div>
      )}
      {captcha && (
        <div className='flex flex-col gap-3'>
          <Image
            width={300}
            height={300}
            className='h-12 w-32'
            alt='captcha'
            src={data.image}
          />
          <input
            type='name'
            id='captcha'
            name='captcha'
            placeholder='Captcha'
            required
            className='rounded-lg border border-neutral-500/30 bg-orange-200 px-3 py-1.5 focus:ring-1 focus:ring-orange-300 focus:outline-none'
          />
        </div>
      )}
      {loginError?.length > 0 && (
        <div className='text-center text-sm font-medium text-red-500'>
          {loginError}
        </div>
      )}
      <button
        type='submit'
        className='mt-6 flex items-center justify-center rounded-lg border border-neutral-500/30 bg-orange-300 px-3 py-1.5'
      >
        {progress ? (
          <Loader2 className='h-5 w-5 animate-spin' />
        ) : (
          'Authenticate'
        )}
      </button>
    </form>
  );
};
