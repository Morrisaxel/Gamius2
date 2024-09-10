import { Outlet } from "react-router-dom";

export default function Layouts() {
  return (
    <>
      <div className="bg-[linear-gradient(47deg,#EEF5F8,#ffffff)] min-h-screen">
        <header className="bg-slate-800">
          <div className="mx-auto max-w-6xl py-4 sm:py-6 px-4 sm:px-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-extrabold truncate">
              Administrador de productos
            </h1>
          </div>
        </header>

        <main className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 mx-auto max-w-6xl p-10 bg-white shadow-md rounded-lg">
          <Outlet />
        </main>
      </div>
    </>
  );
}
