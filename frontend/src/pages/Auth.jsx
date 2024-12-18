import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import loadingIcon from '../assets/loading.svg';
import { useUserContext } from '../context/useWrapper';

export default function AuthPage() {
  const { user, loading, error, auth } = useUserContext();
  const [form, setForm] = useState('login');
  const [credentials, setCredentials] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    const isLogin = form === 'login';
    auth(credentials, isLogin);
  };

  const handleChange = ({ target }) =>
    setCredentials({ ...credentials, [target.name]: target.value });

  if (user) return <Navigate to={'/'} />; // Throw user to home
  return (
    <main className="flex items-center justify-center h-dvh lg:grid lg:grid-cols-12 lg:w-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 pt-5 w-full max-w-sm rounded sm:shadow-xl sm:shadow-gray-400 lg:h-full lg:flex lg:items-center lg:col-span-3 lg:max-w-lg">
        <div className="flex-1">
          <p className="text-3xl font-semibold font-serif text-center mb-5">
            {form === 'login' ? 'Login' : 'Register'}
          </p>

          {error && (
            <div className="bg-red-200 p-2 m-2 my-4 border-2 rounded border-red-400">
              <p className="font-semibold text-lg text-center">
                {error.message}
              </p>
              {error.errorDetails && (
                <ul className="mt-1 ms-2">
                  {error.errorDetails.map(el => (
                    <li className="list-disc list-inside" key={el}>
                      {el}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {form === 'login' ? (
            <>
              {/* Wrapper to center vertical on big screen */}
              <div className="flex flex-col gap-4">
                <Input
                  name="email"
                  onChange={handleChange}
                  label={'Email'}
                  type="email"
                  required
                />
                <Input
                  name="password"
                  onChange={handleChange}
                  label={'Password'}
                  type="password"
                  required
                />
              </div>
              <p className="mt-1 text-center">
                Don&rsquo;t have an account?{' '}
                <Link
                  className="underline font-semibold m-1"
                  onClick={() => setForm('register')}>
                  Register
                </Link>
              </p>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                <Input
                  name="name"
                  onChange={handleChange}
                  label={'Full Name'}
                  type="text"
                  required
                />
                <Input
                  name="email"
                  onChange={handleChange}
                  label={'Email'}
                  type="email"
                  required
                />
                <Input
                  name="password"
                  onChange={handleChange}
                  label={'Password'}
                  type="password"
                  required
                />
              </div>
              <p className="mt-1 text-center">
                Already have an account?
                <Link
                  className="underline font-semibold ms-1"
                  onClick={() => setForm('login')}>
                  Login
                </Link>
              </p>
            </>
          )}
          <Button
            disabled={loading}
            type="submit"
            className={'flex items-center gap-2 mx-auto my-5'}>
            Submit
            {loading && (
              <img src={loadingIcon} className="w-6 stroke-gray-300" />
            )}
          </Button>
        </div>
      </form>

      <div className="p-10 hidden col-span-9 lg:block h-full overflow-hidden">
        <img src="/image.png" className="h-full" />
      </div>
    </main>
  );
}
