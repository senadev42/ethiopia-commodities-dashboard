import Ticker from "./Ticker";

function Navbar() {
  return (
    <div className="bg-white w-full p-4 flex justify-end items-center">
      <div className="flex flex-row items-center">
        <Ticker />
        {/* Search  */}
        <div className="ml-8">
          <input
            type="text"
            className="bg-white text-gray-800 border border-gray-200 rounded-md py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search a Date"
          />
        </div>
        {/* Today's Date */}
        <div className="ml-4 px-2 mr-4">
          <h2 className="text-sm">{new Date().toDateString()} </h2>
        </div>
        {/* Profile */}
        <div>
          <div className="bg-teal-400 w-[40px] h-[40px] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
