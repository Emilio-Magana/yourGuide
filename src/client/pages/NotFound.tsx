import { useMoveBack } from "./../hooks/useMoveBack";

function Notfound() {
  const moveBack = useMoveBack();

  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 p-20">
      <div className="max-w-5xl rounded-md border border-gray-200 bg-white p-20 text-center">
        <header className="mb-8">
          The page you are looking for could not be found 😢
        </header>
        <button
          onClick={moveBack}
          className="rounded-md bg-gray-800 px-6 py-3 text-lg text-white transition hover:bg-gray-700"
        >
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default Notfound;
