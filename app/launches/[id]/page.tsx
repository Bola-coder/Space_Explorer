"use client";
import Loading from "@/app/components/Loading";
import Image from "next/image";
import { useEffect, useState } from "react";
import CustomError from "@/app/components/Error";

interface Launch {
  id: string;
  launch_date_local: string;
  launch_site: {
    site_name: string;
  };
  launch_year: string;
  links: {
    article_link: string;
    video_link: string;
    wikipedia: string;
    mission_patch: string;
  };
  mission_id: string[];
  mission_name: string;
  rocket: {
    rocket_name: string;
    rocket: {
      company: string;
      country: string;
      description: string;
      landing_legs: {
        number: number;
      };
      mass: {
        kg: number;
      };
    };
  };
}

const LaunchDetails = ({ params }: { params: { id: string } }) => {
  const [launchData, setLaunchData] = useState<Launch>({
    id: "",
    launch_date_local: "",
    launch_site: {
      site_name: "",
    },
    launch_year: "",
    links: {
      article_link: "",
      video_link: "",
      wikipedia: "",
      mission_patch: "",
    },
    mission_id: [],
    mission_name: "",
    rocket: {
      rocket_name: "",
      rocket: {
        company: "",
        country: "",
        description: "",
        landing_legs: { number: 0 },
        mass: { kg: 0 },
      },
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchLaunchData = async () => {
    try {
      const response = await fetch(`/api/launches/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch launch data");
      }
      const { launch } = await response.json();
      setLaunchData(launch);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaunchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (loading) return <Loading />;
  if (error)
    return (
      <CustomError
        message={error}
        showRetryButton={true}
        onRetry={() => fetchLaunchData()}
      />
    );
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-6xl w-full mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg space-y-6">
        <div className="text-center">
          {launchData.links.mission_patch && (
            <Image
              src={launchData.links.mission_patch}
              alt={`${launchData.mission_name} mission patch`}
              className="w-24 h-24 mx-auto mb-4"
            />
          )}
          <h1 className="text-4xl font-bold mb-2">{launchData.mission_name}</h1>
          <p className="text-lg mb-4">
            Launch Date:{" "}
            {new Date(launchData.launch_date_local).toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Rocket Details</h2>
            <p>
              <span className="font-bold">Rocket Name:</span>{" "}
              {launchData.rocket.rocket_name}
            </p>
            <p>
              <span className="font-bold">Company:</span>{" "}
              {launchData.rocket.rocket.company}
            </p>
            <p>
              <span className="font-bold">Country:</span>{" "}
              {launchData.rocket.rocket.country}
            </p>
            <p>
              <span className="font-bold">Description:</span>{" "}
              {launchData.rocket.rocket.description}
            </p>
            <p>
              <span className="font-bold">Mass:</span>{" "}
              {launchData.rocket.rocket.mass.kg} kg
            </p>
            <p>
              <span className="font-bold">Landing Legs:</span>{" "}
              {launchData.rocket.rocket.landing_legs.number}
            </p>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Launch Site</h2>
            <p>
              <span className="font-bold">Site Name:</span>{" "}
              {launchData.launch_site?.site_name || "Lagos Nigeria"}
            </p>
            <p>
              <span className="font-bold">Launch Year:</span>{" "}
              {launchData.launch_year}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Related Links</h2>
          <div className="flex flex-col space-y-2">
            {launchData.links.video_link && (
              <a
                href={launchData.links.video_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline hover:text-blue-300 transition"
              >
                Watch Launch Video
              </a>
            )}
            {launchData.links.wikipedia && (
              <a
                href={launchData.links.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline hover:text-blue-300 transition"
              >
                Wikipedia Article
              </a>
            )}
            {launchData.links.article_link && (
              <a
                href={launchData.links.article_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline hover:text-blue-300 transition"
              >
                Related Article
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchDetails;
