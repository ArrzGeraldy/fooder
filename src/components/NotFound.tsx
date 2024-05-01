import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-6xl font-medium">Oopss...</h1>
        <p>Page not found</p>
        <p className="font-medium text-2xl">404 </p>
        <Link to={"/"} className="text-sky-500 underline">
          Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
