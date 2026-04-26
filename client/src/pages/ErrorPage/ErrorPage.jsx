import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold text-red-500">oops!</h1>

            <p className="mt-2 text-gray-600">
                {error?.statusText || error?.message || "Something went wrong"}
            </p>

            <Link to="/">
                <button className="mt-4 px-4 py-2 bg-primary cursor-pointer text-white rounded">
                    Go Home
                </button>
            </Link>
        </div>
    );
};

export default ErrorPage;