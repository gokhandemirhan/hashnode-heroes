const CardHorizontal = ({ data }) => {
  return (
    <div className="flex items-center justify-center" id="card">
      <div className="max-w-md md:max-w-2xl px-2">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex border-2">
          <div
            className="bg-cover bg-bottom h-56 md:h-auto md:w-56"
            style={{ 'background-image': `url(${data?.post?.author.photo})` }}
          ></div>
          <div>
            <div className="p-4 md:p-5">
              <p className="font-bold text-xl md:text-2xl"></p>
            </div>
            <div className="p-4 md:p-5 bg-gray-100">
              <div className="sm:flex sm:justify-between sm:items-center">
                <div>
                  <div className="text-3xl text-gray-700">
                    <span className="text-teal-900 font-bold"></span>
                  </div>
                  <div className="flex items-center">
                    <div className="text-gray-600 text-sm mt-1"></div>
                  </div>
                  <div className="mt-3 text-gray-600 text-xs md:text-base"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileCard = ({ data }) => {
  return (
    <div
      className="rounded-lg shadow-xl bg-white p-10 bg-contain bg-no-repeat"
      style={{ 'background-image': `url(${data?.post?.coverImage})` }}
    >
      <img
        src={data?.post?.author.photo}
        alt=""
        className="rounded-full p-4 h-40 mx-auto"
      />
      {/* <header className=" text-2xl font-extrabold py-4 px-4 text-center">
        Christina Morillo
      </header> */}
      <div classNameName="bg-black -m-10">
        <ul className="text-gray-500 text-center font-semibold list-none">
          <li>❤️: 1000</li>
          <li>🛡️: 20</li>
          <li>🗡️: 10</li>
          <li>✨: %2</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
