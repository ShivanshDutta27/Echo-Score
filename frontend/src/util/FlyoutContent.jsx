export default function FlyingContent() {
  return (
    <div className="h-64 w-[12rem] bg-white p-6 rounded-lg shadow-2xl shadow-gray-300 flex flex-col gap-4">
      {/* Buttons */}
      <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
        Logout
      </button>
      <button className="w-full px-4 py-2 bg-green-500  text-white rounded-lg hover:bg-green-600 transition">
        About Us
      </button>
      <button className="w-full px-4 py-2 bg-green-500  text-white rounded-lg hover:bg-green-600 transition">
        Settings
      </button>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 mt-auto text-center">
        *All buttons are non-functional right now.
      </p>
    </div>
  );
}
