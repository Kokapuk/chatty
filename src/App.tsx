import { Suspense, lazy, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { EAuthType } from './routes/AuthForm/AuthForm';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import auth from './stores/auth';
import { child, get, getDatabase, ref } from 'firebase/database';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';

const Home = lazy(() => import('./routes/Home/Home'));
const AuthForm = lazy(() => import('./routes/AuthForm/AuthForm'));
const Settings = lazy(() => import('./routes/Settings/Settings'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <AuthForm authType={EAuthType.Register} />,
  },
  {
    path: '/login',
    element: <AuthForm authType={EAuthType.Login} />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
]);

const App = () => {
  useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      auth.user = user;

      if (!user) {
        auth.userInfo = null;
        return;
      }

      const dbRef = ref(getDatabase());
      const snapshot = await get(child(dbRef, `users/${user.uid}`));

      auth.userInfo = snapshot.val();
    });
  }, []);

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
