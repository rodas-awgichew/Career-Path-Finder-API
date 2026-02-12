
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { HomeIcon, BriefcaseIcon, UserIcon, LoginIcon, LogoutIcon } from './icons/Icons';

const navigationLinks = [
  { name: 'Home', href: '/', icon: HomeIcon, auth: false },
  { name: 'Recommendations', href: '/recommendations', icon: BriefcaseIcon, auth: true },
  { name: 'Profile', href: '/profile', icon: UserIcon, auth: true },
];

const Layout = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const visibleLinks = navigationLinks.filter(link => !link.auth || isAuthenticated);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col md:flex-row items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary text-white'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
    }`;
  
  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center w-full transition-colors ${
      isActive
        ? 'text-primary'
        : 'text-slate-500'
    }`;


  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-1200 dark:text-slate-100">
      <div className="md:flex">
        <aside className="hidden md:flex md:flex-col md:w-64 md:h-screen md:sticky md:top-0 overflow-y-auto bg-white dark:bg-slate-800 p-4 border-r border-slate-200 dark:border-slate-1000">
          <div className="text-2xl font-bold text-primary mb-8">CareerFinder</div>
          <nav className="flex flex-col gap-2 flex-grow">
            {visibleLinks.map((item) => (
              <NavLink key={item.name} to={item.href} className={navLinkClasses} end>
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
                <LogoutIcon className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <NavLink to="/login" className={navLinkClasses}>
                <LoginIcon className="w-5 h-5" />
                <span>Login</span>
              </NavLink>
            )}
          </div>
        </aside>

        <main className="flex-1 pb-16 md:pb-0">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around p-2">
        {visibleLinks.map((item) => (
          <NavLink key={item.name} to={item.href} className={mobileNavLinkClasses} end>
            <item.icon className="w-6 h-6" />
            <span className="text-xs">{item.name}</span>
          </NavLink>
        ))}
         {isAuthenticated ? (
            <button onClick={handleLogout} className="flex flex-col items-center justify-center w-full text-slate-500">
              <LogoutIcon className="w-6 h-6" />
              <span className="text-xs">Logout</span>
            </button>
          ) : (
            <NavLink to="/login" className={mobileNavLinkClasses}>
              <LoginIcon className="w-6 h-6" />
              <span className="text-xs">Login</span>
            </NavLink>
          )}
      </nav>
    </div>
  );
};

export default Layout;
