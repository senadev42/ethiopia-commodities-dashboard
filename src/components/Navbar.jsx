function Navbar() {
  return (
    <div className="bg-green-100 w-full p-4 flex justify-between items-center">
      <h1 className="text-xl">Commodities: Ethiopia</h1>
      <div className="flex flex-row items-center">
        <div className="ml-8">
          <input
            type="text"
            className="bg-white text-gray-800 border border-gray-200 rounded-md py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search a Date"
          />
        </div>
        <div className="ml-4 px-2 mr-4">
          <h2 className="text-sm">{new Date().toDateString()} </h2>
        </div>
        <div>
          <div className="bg-teal-400 w-[40px] h-[40px] rounded-full"></div>
        </div>
        {/* Profile */}
      </div>
    </div>
  );
}

export default Navbar;
