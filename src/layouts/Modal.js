import { generatePath, useNavigate } from 'react-router';

const Modal = ({ message, token, startClicked }) => {
  const navigate = useNavigate();

  const start = () => {
    startClicked();
    navigate('/play');
  };

  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-50">
      <div className="bg-white px-16 py-14 rounded-md text-center">
        <h1 className="text-xl mb-4 font-bold text-slate-500">{message}</h1>
        <button
          className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
          onClick={start}
        >
          Start the game!
        </button>
        {/* <button className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">
          Ok
        </button> */}
      </div>
    </div>
  );
};

export default Modal;
