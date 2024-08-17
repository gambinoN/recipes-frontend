import React, { memo } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  links: { name: string; path: string }[];
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = memo(({ title, links, isLoggedIn }) => {
  return (
    <header className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">{title}</h1>
        <nav>
          <ul className="flex space-x-4">
            {links.map((link, index) => (
              <li key={index}>
                <Link to={link.path} className="text-white hover:underline">
                  {link.name}
                </Link>
              </li>
            ))}
            {isLoggedIn ? (
              <li>
                <Link to="/logout" className="text-white hover:underline">
                  Logout
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" className="text-white hover:underline">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
});

export default Header;
