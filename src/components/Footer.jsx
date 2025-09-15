const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:flex sm:items-center sm:justify-between">
        {/* Left: Logo / Branding */}
        <div className="mb-4 sm:mb-0">
          <h2 className="text-xl font-bold text-gray-800">GlobeUp</h2>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} GlobeUp. All rights reserved.
          </p>
        </div>

        {/* Middle: Navigation Links */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <a href="#" className="hover:text-blue-600 transition">
            Home
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Products
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            About
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Contact
          </a>
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4 mt-4 sm:mt-0">
          <a href="#" className="text-gray-500 hover:text-blue-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H8v-2.88h2.5V9.41c0-2.47 1.48-3.84 3.74-3.84 1.08 0 2.21.2 2.21.2v2.43h-1.25c-1.23 0-1.62.77-1.62 1.56v1.87H17l-.4 2.88h-2.22v6.99A10 10 0 0 0 22 12z" />
            </svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.42 2.87 8.16 6.84 9.49.5.09.66-.22.66-.48 0-.24-.01-.88-.01-1.73-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.61.07-.61 1 .07 1.52 1.03 1.52 1.03.89 1.51 2.34 1.07 2.91.82.09-.65.35-1.07.63-1.31-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.67-.1-.26-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02a9.57 9.57 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.66.64.69 1.03 1.58 1.03 2.67 0 3.85-2.34 4.7-4.57 4.95.36.31.69.92.69 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.17.58.67.48A10.02 10.02 0 0 0 22 12.04c0-5.52-4.48-10-10-10z" />
            </svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184a4.933 4.933 0 0 1-1.357.371A2.37 2.37 0 0 0 19.085 2a4.935 4.935 0 0 1-1.561.596A2.468 2.468 0 0 0 13.847 4.5c0 .193.021.38.062.56A7.014 7.014 0 0 1 4.978 2.553a2.436 2.436 0 0 0-.334 1.24 2.46 2.46 0 0 0 1.097 2.05 2.47 2.47 0 0 1-1.117-.31v.03a2.48 2.48 0 0 0 1.974 2.43 2.509 2.509 0 0 1-.648.085c-.158 0-.312-.016-.463-.046a2.477 2.477 0 0 0 2.31 1.703 4.97 4.97 0 0 1-3.656 1.017A6.996 6.996 0 0 0 9.336 17c4.548 0 7.037-3.77 7.037-7.038 0-.108-.002-.216-.007-.322a5.12 5.12 0 0 0 1.249-1.293z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;