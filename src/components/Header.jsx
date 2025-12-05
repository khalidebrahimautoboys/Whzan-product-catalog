import { Link, NavLink } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export function Header() {
  const { count } = useFavorites();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Catalog Explorer
          </Link>
          
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-6">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                    }`
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors flex items-center gap-1 ${
                      isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                    }`
                  }
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span>Favorites</span>
                  {count > 0 && (
                    <span 
                      className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center"
                      aria-label={`${count} items in favorites`}
                    >
                      {count}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
