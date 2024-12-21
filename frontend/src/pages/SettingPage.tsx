import { Navigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';
import { PencilIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { Button } from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useState, useEffect, useRef } from 'react';
import ErrorNotice from '../components/ui/ErrorNotice';

export default function SettingPage() {
  const { user, logout, error, loading, updateData } = useUserContext();
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
    bio: '',
  });

  // Store the initial user data
  const initialUserData = useRef<UserData | null>(null);

  // Initialize form state when `user` changes
  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, bio: user.bio });
      initialUserData.current = {
        name: user.name,
        email: user.email,
        bio: user.bio,
      };
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void updateData(formData);
  };

  // Check if form data is different, and wait for loading
  const isButtonDisabled =
    !initialUserData.current ||
    loading ||
    (formData.name === initialUserData.current.name &&
      formData.email === initialUserData.current.email &&
      formData.bio === initialUserData.current.bio);

  if (!user) return <Navigate to="/auth" />;
  return (
    <div className="h-full flex flex-col items-center justify-center lg:w-full">
      <div className="relative w-fit">
        <UserCircleIcon className="w-40" />
        <button className="w-8 p-1.5 absolute bottom-2 right-5 bg-gray-500 rounded-md border border-white hover:bg-gray-400">
          <PencilIcon className="w-full fill-white" />
        </button>
      </div>

      <form className="min-w-96 flex flex-col gap-3" onSubmit={handleSubmit}>
        {error && <ErrorNotice error={error} />}

        <Input name="name" value={formData.name} onChange={handleInputChange}>
          Name
        </Input>
        <Input name="bio" value={formData.bio} onChange={handleInputChange}>
          Bio
        </Input>
        <Input
          name="email"
          value={formData.email}
          type="email"
          onChange={handleInputChange}>
          Email
        </Input>
        <Button
          type="submit"
          className="bg-sky-600 border-none mx-auto disabled:opacity-50"
          disabled={isButtonDisabled}>
          Save data
        </Button>
      </form>

      <Button className="bg-red-500 border-none mt-10" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

export interface UserData {
  name: string;
  email: string;
  bio: string;
}
