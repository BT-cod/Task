import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import signUpImage from './assets/signup.webp';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import initializeFirebaseApp from './Config';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const handleSignUp = async () => {
    if (name === '' || email === '' || password === '' || cpassword === '') {
      alert('Enter The Below Details To SignUp');
    } else if (cpassword !== password) {
      alert('Check Your Password and Confirm Password');
      setPassword('');
      setCpassword('');
    } else {
      try {
        await SignUpUser(email, password);
        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');
        alert('Registered Successfully');
        window.location.href = '/login';
      } catch (error) {
        console.log(error);
        alert('Failed to register. Please try again.');
      }
    }
  };

  const SignUpUser = async (email, password) => {
    const auth = getAuth(initializeFirebaseApp());
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 h-screen">
      <div className="p-5 flex justify-between">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Task
          <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
            Management
          </mark>
        </h1>
        <Link
          to="/login"
          className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          LogIn
        </Link>
      </div>
      <div className="flex mt-20 ml-40 space-x-28">
        <div className="flex w-2/5 h-3/5 bg-white rounded-lg shadow-2xl SignUpForm pr-10">
          <div className="w-2/3 p-10 space-y-10 flex flex-col">
            <h1 className="text-3xl font-bold">Create An Account</h1>
            <input
              type="text"
              placeholder="Name"
              className="rounded-lg p-3 w-72 bg-gray-200 font-mono"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="rounded-lg p-3 w-72 bg-gray-200 font-mono"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="rounded-lg p-3 w-72 bg-gray-200 font-mono"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="rounded-lg p-3 w-72 bg-gray-200 font-mono"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
            <button
              className="rounded-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white w-60 h-14 font-mono hover:text-3xl"
              onClick={handleSignUp}
            >
              SignUp
            </button>
          </div>
          <div className="w-1/2 p-10">
            <img
              src={signUpImage}
              alt="SignUp"
              className="h-full object-cover"
            />
          </div>
        </div>
        <div className="bio w-2/5 h-3/5 pt-32">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Better To Manage Tasks
            </span>
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            This is a professional solution designed to enhance productivity and
            organization in your daily life. With its intuitive interface and
            comprehensive features, it empowers users to efficiently create,
            update, edit, and delete tasks. Stay on top of your commitments and
            priorities by leveraging the app's powerful task management
            capabilities. Seamlessly track your progress, set deadlines, and
            categorize tasks for optimal organization. Boost your efficiency and
            achieve your goals with this robust tool that streamlines task
            management and enables you to focus on what truly matters.
            Experience the convenience and effectiveness of the Task Management
            App and take control of your daily workflow like never before.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
