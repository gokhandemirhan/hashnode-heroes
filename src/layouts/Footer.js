import logo from '../images/logo.png';

const Footer = () => (
  <footer className="text-gray-600 body-font  w-full bottom-0">
    <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <img src={logo} width={150} />
      </a>
      <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
        Made by Gokhan Demirhan
        <a
          href="https://breakingchanges.dev/"
          className="text-gray-600 ml-1"
          rel="noopener noreferrer"
          target="_blank"
        >
          | Breaking Changes
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
