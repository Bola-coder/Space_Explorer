/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import LaunchesPage from "./components/LaunchesPage";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Loading from "../components/Loading";
import CustomError from "../components/Error";
import launchLocationJson from "./../spaceX_Launches_Locations.json";
export default function Launches() {
  const [launches, setLaunches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLaunches, setFilteredLaunches] = useState<any[]>([]);
  const [selectedLaunches, setSelectedLaunches] = useState<any>([]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchLaunches = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/launches?limit=7&offset=${page * 7}`); // Paginating by 7
      if (!response.ok) {
        throw new globalThis.Error("Failed to fetch launches");
      }

      const { launches } = await response.json();

      if (launches.length === 0) {
        setHasMore(false); // No more launches to load
      } else {
        setLaunches((prevLaunches) => [...prevLaunches, ...launches]); // Append new launches
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaunches(page);
  }, [page]);

  // Callback function to handle the intersection event
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [loading, hasMore]
  );

  // Set up the IntersectionObserver
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect(); // Disconnect old observer

    observerRef.current = new IntersectionObserver(handleObserver);

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver]);

  // Search and filter launches based on mission name or launch site
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredLaunches(launches);
    } else {
      setFilteredLaunches(
        launches.filter(
          (launch) =>
            launch.mission_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            launch.launch_site?.site_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [launches, searchQuery]);

  const handleSelectLaunch = (id: string) => {
    const selected = launches.filter((launch) => launch.id === id);
    const launchExist = selectedLaunches.filter((launch) => launch.id === id);
    if (launchExist.length !== 0) {
      return;
    }
    setSelectedLaunches((curr) => [...curr, selected[0]]);
  };

  // console.log(launchLocationJson);

  const displayZipCode = (id: string) => {
    const foundLocation = launchLocationJson.filter(
      (location) => location.id === id
    );
    if (foundLocation.length === 0) {
      return "NA";
    }
    if (foundLocation[0].zip_code.trim() === "") {
      return "NA";
    }
    return foundLocation[0].zip_code;
  };

  // console.log(displayZipCode("uffufu"));

  if (loading && launches.length === 0) return <Loading />;
  if (error)
    return (
      <CustomError
        message={error}
        showRetryButton={true}
        onRetry={() => fetchLaunches(page)}
      />
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <div className="mb-4 p-3">
        {selectedLaunches &&
          selectedLaunches.map((launch) => (
            <div key={launch.id}>
              <h1 className="text-white">{launch.mission_name}</h1>
            </div>
          ))}
      </div>
      {/* Search Input */}
      <div className="flex justify-center mb-4 px-5">
        <input
          type="text"
          placeholder="Search by mission name or launch site"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border text-black rounded-md p-2 w-full max-w-lg"
        />
      </div>

      <LaunchesPage
        launches={filteredLaunches}
        handleSelectLaunch={handleSelectLaunch}
        displayZipCode={displayZipCode}
      />
      <div ref={loadMoreRef} className="flex justify-center mt-6">
        {loading && hasMore && <p>Loading more...</p>}
        {!hasMore && <p>No more launches to load.</p>}
      </div>
    </div>
  );
}
