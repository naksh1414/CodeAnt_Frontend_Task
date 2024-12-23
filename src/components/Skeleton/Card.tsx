import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {/* Repository name skeleton */}
            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
            {/* Public/Private badge skeleton */}
            <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Description skeleton */}
          <div className="mt-2 space-y-1">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Meta info skeleton */}
          <div className="flex items-center gap-3 mt-2">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
