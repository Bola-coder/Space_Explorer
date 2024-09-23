import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Launches from "../launches/page";
import RocketCard from "../launches/components/RocketCard";
import fetchMock from "jest-fetch-mock";

beforeAll(() => {
  fetchMock.enableMocks();
  global.IntersectionObserver = class {
    root: Element | null = null;
    rootMargin: string = "";
    thresholds: ReadonlyArray<number> = [];
    observe() {}
    disconnect() {}
    unobserve() {}
    takeRecords() {
      return [];
    }
  };
});

beforeEach(() => {
  fetchMock.resetMocks();
});

// Unit Test
describe("RocketCard Component", () => {
  it("renders launch details correctly", () => {
    const launch = {
      id: "1234",
      mission_name: "Sample Mission",
      launch_date_local: "2022-11-01T09:41:00-04:00",
      launch_site: { site_name: "Site 1" },
      rocket: {
        rocket_name: "Falcon 9",
      },
    };

    // Render the component with the launch prop
    render(<RocketCard launch={launch} />);

    // Check if the mission name is displayed
    const missionElement = screen.getByText(launch.mission_name);
    expect(missionElement).toBeInTheDocument();

    // Check if the rocket name is displayed
    const rocketElement = screen.getByText(`${launch.rocket.rocket_name}`);
    expect(rocketElement).toBeInTheDocument();

    // Check if the launch site name is displayed
    const siteElement = screen.getByText(`${launch.launch_site.site_name}`);
    expect(siteElement).toBeInTheDocument();
  });
});

// Integartion test
describe("Launches Component", () => {
  it("renders launch data", async () => {
    // Mock API response for the initial page of launches
    fetchMock.mockResponseOnce(
      JSON.stringify({
        launches: [
          {
            id: "1",
            launch_date_local: "2022-11-01T09:41:00-04:00",
            mission_name: "Mission 1",
            launch_site: { site_name: "Site 1" },
            rocket: {
              rocket_name: "Sample Rocket",
            },
          },
          {
            id: "2",
            launch_date_local: "2022-11-01T09:41:00-04:00",
            mission_name: "Mission 2",
            launch_site: { site_name: "Site 2" },
            rocket: {
              rocket_name: "Sample Rocket",
            },
          },
        ],
      })
    );

    // Render the component
    render(<Launches />);

    const firstLaunch = await screen.findByText("Mission 1");
    expect(firstLaunch).toBeInTheDocument();

    const secondLaunch = screen.getByText("Mission 2");
    expect(secondLaunch).toBeInTheDocument();
  });
});
