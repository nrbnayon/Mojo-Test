import { useEffect, useState } from "react";

const Spinner = () => {
  const [progressNumber, setProgressNumber] = useState(0);
  const ProgressNumberPercent = 90; // Adjust the number for your project.
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressNumber((prevNumber) =>
        prevNumber === ProgressNumberPercent ? 0 : prevNumber + 1
      );
    }, 50); // Adjust the interval as per your requirement
    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, []);
  return (
    <div>
      <div className="w-[400px] md:w-[350px]  bg-slate-300/20 px-6 py-4 mx-auto rounded-2xl space-y-6 shadow-md animate-pulse">
        {/* Card Image Skeleton */}
        <div className="w-full h-[190px] bg-gray-400 rounded-2xl"></div>
        {/* Card Heading and Rating Skeleton */}
        <div className="space-y-2">
          <div className="h-6 w-2/3 rounded bg-gray-300"></div>
          <div className="flex gap-1">
            <div className="h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-4 rounded bg-gray-300"></div>
          </div>
        </div>
        {/* Price and Add to Cart Button Skeleton */}
        <div className="mt-5 flex justify-between items-center font-medium">
          <div className="h-6 w-1/4 rounded bg-gray-300"></div>
          <div className="h-10 w-24  bg-gray-700 rounded-lg"></div>
        </div>
      </div>

      <div className="mx-auto flex w-[300px] flex-col gap-2">
        <div
          className={`flex h-3 w-full  items-center justify-center rounded-full bg-sky-300`}
        >
          <div
            style={{ width: `${progressNumber}%` }}
            className={`transition-width mr-auto h-3 w-0 rounded-full  bg-sky-600 duration-[1ms]`}
          ></div>
        </div>
        <span
          style={{ marginLeft: `${progressNumber - 7}%` }}
          className="flex text-lg font-medium  text-sky-500"
        >
          {progressNumber}%
        </span>
      </div>
    </div>
  );
};

export default Spinner;
