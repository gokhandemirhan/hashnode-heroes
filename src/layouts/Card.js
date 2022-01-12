const Card = ({ data }) => {
  return (
    <div className="antialiased text-gray-900 grid place-items-center">
      {/* <div class="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl"> */}
      <div id="card" className="border-2 rounded-lg" style={{ width: '350px' }}>
        <img
          alt="Profile"
          src={data?.post?.author.photo}
          className="w-full object-cover object-center rounded-md shadow-md"
        />

        <div className="relative px-4 -mt-16  ">
          <div className="bg-white p-4 ">
            <div className="flex items-baseline">
              <div className="text-gray-600 uppercase text-sm font-semibold tracking-wider">
                {/* Joined: 23 jun. 2007 &bull; 464,114,832 views */}
              </div>
            </div>
            <div className="text-xl font-semibold uppercase leading-tight"></div>

            <div className="mt-4">
              <span className="text-gray-700 text-3xl font-bold"></span>
            </div>
            <div className="mt-1">
              <span className="bg-grey-200 text-teal-800 text-xs"></span>
            </div>
            <div className="mt-1 text-right">
              <span className="bg-grey-200 text-teal-800 text-xs uppercase font-semibold"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
