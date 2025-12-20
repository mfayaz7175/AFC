const Header = (props) => {
  return (
    <header className="p-6 rounded-lg shadow-2xl border border-gray-700 mb-4">
      <div className="flex justify-center items-center ">
        <div className="text-3xl font-bold text-black tracking-wider">
          {props.title}
        </div>
      </div>
    </header>
  );
};


export default Header;
