import Input from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Credentials } from '../context/User';
import { useUserContext } from '../hooks/useUserContext';
import ErrorNotice from '../components/ui/ErrorNotice';

export default function AuthPage() {
  const { user, login, register, loading, error, removeError } =
    useUserContext();

  const [isLogin, setIsLogin] = useState(true);
  const [cred, setCred] = useState<Credentials>({ email: '', password: '' });

  const changeForm = () => {
    removeError();
    setIsLogin(!isLogin);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) login(cred);
    else register(cred);
  };

  if (user) return <Navigate to={'/'} />;
  return (
    <main className="h-dvh max-w-screen-2xl mx-auto flex justify-center items-center lg:justify-between">
      <div className="w-11/12 max-w-md flex flex-col rounded p-5 pb-8 sm:shadow-md sm:shadow-gray-600 lg:h-full lg:justify-center lg:shadow-none lg:border-r-2 border-gray-300">
        <h3 className="text-3xl font-semibold mb-5 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h3>

        {error && <ErrorNotice error={error} />}

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <Input name="email" type="email" onChange={handleChange}>
                Email
              </Input>
              <Input name="password" type="password" onChange={handleChange}>
                Password
              </Input>
              <p>
                Don&apos;t have an account?
                <Link
                  to={'#'}
                  onClick={changeForm}
                  className="font-semibold ps-2 hover:text-sky-700">
                  Register
                </Link>
              </p>
            </>
          ) : (
            <>
              <Input name="name" type="text" onChange={handleChange}>
                Full Name
              </Input>
              <Input name="email" type="email" onChange={handleChange}>
                Email
              </Input>
              <Input name="password" type="password" onChange={handleChange}>
                Password
              </Input>
              <p>
                Already have an account?
                <Link
                  to={''}
                  onClick={changeForm}
                  className="font-semibold ps-2 hover:text-sky-700">
                  Log in
                </Link>
              </p>
            </>
          )}

          <Button
            disabled={loading}
            type="submit"
            className="mx-auto px-8 py-2">
            {loading ? (
              <svg
                className="mx-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      </div>

      <img
        className="hidden w-7/12 lg:block xl:w-8/12"
        src="/image.png"
        alt=""
      />
    </main>
  );
}
