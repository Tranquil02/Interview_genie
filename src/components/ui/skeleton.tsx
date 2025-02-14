import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = () => {
  return (
    <div className="space-y-4 p-4">
      {/* Alert Skeleton */}
      <div className="flex items-start bg-yellow-50 border-l-4 border-yellow-400 shadow-md p-4 rounded-lg">
        <div className="w-6 h-6 mr-3 mt-1">
          <Skeleton circle height={24} width={24} />
        </div>
        <div className="flex-1">
          <Skeleton width={180} height={20} />
          <Skeleton width="90%" height={14} className="mt-2" />
        </div>
      </div>

      {/* Profile Card Skeleton */}
      <div className="bg-white p-4 shadow-md rounded-lg flex items-center space-x-4">
        <Skeleton circle height={50} width={50} />
        <div className="flex-1">
          <Skeleton width="50%" height={18} />
          <Skeleton width="70%" height={14} className="mt-2" />
        </div>
      </div>

      {/* List of Items Skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Skeleton circle height={40} width={40} />
            <div className="flex-1">
              <Skeleton width="60%" height={16} />
              <Skeleton width="80%" height={12} className="mt-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Button Skeleton */}
      <div className="flex justify-center">
        <Skeleton width={120} height={40} borderRadius={8} />
      </div>
    </div>
  );
};

export default SkeletonLoader;
