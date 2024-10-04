import React from "react";
import RocketCard from "./RocketCard";

export interface Launch {
  id: string;
  mission_id: string;
  mission_name: string;
  launch_date_local: string;
  rocket: {
    rocket_name: string;
  };
  launch_site: {
    site_name: string;
  };
  launch_year: string;
}

interface LaunchesPageProps {
  launches: Launch[];
}

export default function LaunchesPage({
  launches,
  handleSelectLaunch,
  displayZipCode,
}: LaunchesPageProps) {
  // console.log("Launches is: ", launches);
  return (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <h1 className="text-5xl font-bold text-center mb-12 uppercase tracking-wide">
        SpaceX Upcoming Launches
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5 max-w-6xl mx-auto cursor-pointer">
        {launches.map((launch, index) => (
          <div key={index}>
            <RocketCard
              launch={launch}
              handleSelectLaunch={handleSelectLaunch}
              displayZipCode={displayZipCode}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
