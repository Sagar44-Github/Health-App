import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";

const Debug = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Debug Information
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Authentication Status */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Authentication Status
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Is Loading:</strong> {isLoading ? "Yes" : "No"}
              </p>
              <p>
                <strong>Is Authenticated:</strong>{" "}
                {isAuthenticated ? "Yes" : "No"}
              </p>
              <p>
                <strong>User:</strong>{" "}
                {user ? JSON.stringify(user, null, 2) : "null"}
              </p>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Location Information
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Pathname:</strong> {location.pathname}
              </p>
              <p>
                <strong>Search:</strong> {location.search}
              </p>
              <p>
                <strong>Hash:</strong> {location.hash}
              </p>
            </div>
          </div>

          {/* localStorage Information */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              localStorage Information
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>auth_user:</strong>
              </p>
              <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs overflow-x-auto">
                {localStorage.getItem("auth_user") || "null"}
              </pre>
            </div>
          </div>

          {/* Test Actions */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Test Actions
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => {
                  const testUser = {
                    id: "1",
                    email: "test@example.com",
                    name: "Test User",
                  };
                  localStorage.setItem("auth_user", JSON.stringify(testUser));
                  window.location.reload();
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 block w-full"
              >
                Set Test User
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("auth_user");
                  window.location.reload();
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 block w-full"
              >
                Clear Auth
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tests */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Navigation Tests
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { path: "/", name: "Landing" },
              { path: "/dashboard", name: "Dashboard" },
              { path: "/chat", name: "Chat" },
              { path: "/symptoms", name: "Symptoms" },
              { path: "/medications", name: "Medications" },
              { path: "/auth/login", name: "Login" },
              { path: "/auth/register", name: "Register" },
              { path: "/nonexistent", name: "404 Test" },
            ].map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-2 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-800 text-center"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debug;
