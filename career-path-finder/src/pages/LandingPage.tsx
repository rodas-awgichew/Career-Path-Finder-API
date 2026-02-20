
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const LandingPage = () => {
    const { isAuthenticated } = useAuth();
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Discover Your <span className="text-primary">Perfect Career</span> Path
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                Stop guessing. Start planning. We analyze your unique skills and interests to provide personalized career recommendations that truly fit.
            </p>
            <div className="mt-8 flex gap-4">
                {isAuthenticated ? (
                    <Link to="/recommendations">
                        <Button size="lg">View My Recommendations</Button>
                    </Link>
                ) : (
                    <>
                        <Link to="/register">
                            <Button size="lg">Get Started</Button>
                        </Link>
                        <Link to="/login">
                            <Button size="lg" variant="outline">
                                Sign In
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
