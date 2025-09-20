// import { useMoveBack } from "../hooks/useMoveBack";

function Notfound() {
  // const moveBack = useMoveBack();

  return (
    <main className="h-screen bg-gray-50 flex items-center justify-center p-20">
      <div className="bg-white border border-gray-200 rounded-md p-20 max-w-5xl text-center">
        <header className="mb-8">
          The page you are looking for could not be found 😢
        </header>
        <button className="px-6 py-3 text-lg bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default Notfound;
