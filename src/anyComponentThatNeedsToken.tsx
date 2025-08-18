import { useAuth } from './auth/AuthContext';

const YourComponent = () => {
    const { accessToken } = useAuth();

    // ...use accessToken as needed...

    return (
    // ...your component JSX...
  );
};

export default YourComponent;