import React from "react";
import Link from "next/link";

interface Launch {
  id: string;
  mission_name: string;
  launch_date_local: string;
  rocket: {
    rocket_name: string;
  };
  launch_site: {
    site_name: string;
  };
}

const RocketCard: React.FC<{ launch: Launch }> = ({ launch }) => {
  return (
    <div
      key={launch.id}
      className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <h2 className="text-2xl font-semibold mb-4">{launch.mission_name}</h2>
      <p className="text-lg mb-2">
        <strong>Launch Date:</strong>{" "}
        {new Date(launch.launch_date_local).toLocaleDateString()}
      </p>
      <p className="text-lg mb-2">
        <strong>Rocket:</strong> {launch.rocket.rocket_name}
      </p>
      <p className="text-lg">
        <strong>Launch Site:</strong> {launch.launch_site.site_name}
      </p>
      <div className="flex justify-end">
        <Link href={`/launches/${encodeURIComponent(launch.id)}`}>
          <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RocketCard;
