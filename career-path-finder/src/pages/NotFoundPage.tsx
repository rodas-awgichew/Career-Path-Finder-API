
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-8rem)]">
      <h1 className="text-9xl font-extrabold text-primary">404</h1>
      <h2 className="text-3xl font-bold mt-4 text-slate-800 dark:text-slate-100">Page Not Found</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-8">
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
