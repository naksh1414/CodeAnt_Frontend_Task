import React from "react";
import SkeletonCard from "../Skeleton/Card";
interface Repository {
  name: string;
  isPublic: boolean;
  language: string;
  size: string; // Changed from number to string as per your slice
  updatedAt: string;
  description: string | null;
  url: string;
}

interface RepoCardProps {
  repositories: Repository[]; // Changed to expect an array of repositories
  isLoading: boolean;
}

const RepoCard: React.FC<RepoCardProps> = ({ repositories, isLoading }) => {
  // Destructure repositories from props
  const getLanguageColor = (language: string): string => {
    const colors: { [key: string]: string } = {
      React: "bg-blue-500",
      JavaScript: "bg-yellow-500",
      TypeScript: "bg-blue-600",
      Python: "bg-green-500",
      Swift: "bg-orange-500",
      Java: "bg-red-500",
      HTML: "bg-purple-500",
      CSS: "bg-purple-400",
      PHP: "bg-indigo-500",
      Go: "bg-cyan-500",
      Ruby: "bg-red-600",
      "C++": "bg-pink-500",
      C: "bg-gray-600",
      "C#": "bg-green-600",
      Rust: "bg-orange-600",
    };
    return colors[language] || "bg-gray-500";
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Show 3 skeleton cards while loading */}
        {[...Array(3)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {repositories.map((repo) => (
        <a
          key={repo.name}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white hover:bg-gray-50 transition-all duration-200 p-4 rounded-lg border border-gray-200 hover:border-gray-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-blue-600 hover:text-blue-800">
                  {repo.name}
                </h3>
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${
                    repo.isPublic
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {repo.isPublic ? "Public" : "Private"}
                </span>
              </div>

              {repo.description && (
                <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                  {repo.description}
                </p>
              )}

              <div className="flex items-center gap-3 mt-2 text-sm">
                <span className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full ${getLanguageColor(
                      repo.language
                    )}`}
                  />
                  {repo.language}
                </span>
                <span className="text-gray-500">{repo.size}</span>
                <span className="text-gray-500">Updated {repo.updatedAt}</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default RepoCard;
