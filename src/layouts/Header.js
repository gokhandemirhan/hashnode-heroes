import { NavLink, Link } from 'react-router-dom';
import logo from '../images/logo.png';
const Header = ({ walletAddress, connectWalletPressed }) => (
  <header className="text-gray-600 body-font">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <Link
        to="/"
        className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
      >
        <img src={logo} width={150} />
      </Link>
      <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        <NavLink
          style={({ isActive }) => {
            if (isActive) {
              return {
                border: '1px solid black',
              };
            }
          }}
          to="/"
          className="text-lg py-1 px-3 rounded mr-5 hover:text-gray-900"
        >
          Mint
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            if (isActive) {
              return {
                border: '1px solid black',
              };
            }
          }}
          to="/play"
          className="text-lg py-1 px-3 rounded mr-5 mr-5 hover:text-gray-900"
        >
          Play
        </NavLink>
      </nav>
      <button
        className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        onClick={connectWalletPressed}
      >
        {walletAddress.length > 0 ? (
          'Connected: ' +
          String(walletAddress).substring(0, 6) +
          '...' +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
    </div>
  </header>
);

export default Header;
