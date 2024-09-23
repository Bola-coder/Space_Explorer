import { gql } from "@apollo/client";
import apolloClient from "@/app/_libs/ApolloClient";

export interface Launch {
  id: string;
  mission_name: string;
  mission_id: string;
  rocket: {
    rocket_name: string;
  };
  launch_date_local: string;
  launch_site: {
    site_name: string;
  } | null;
}
export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit")) || 5; // Default limit is 7
  const offset = Number(url.searchParams.get("offset")) || 0; // Default offset is 0

  try {
    const { data } = await apolloClient.query({
      query: gql`
        query LaunchesUpcoming($limit: Int!, $offset: Int!) {
          launchesUpcoming(limit: $limit, offset: $offset) {
            id
            mission_name
            mission_id
            rocket {
              rocket_name
            }
            launch_date_local
            launch_site {
              site_name
            }
          }
        }
      `,
      variables: { limit, offset },
    });

    // Transforming the data: Handling missing launch_site
    const transformedData = data.launchesUpcoming.map((launch: Launch) => ({
      ...launch,
      launch_site: launch.launch_site
        ? launch.launch_site
        : { site_name: "Lagos Nigeria" },
    }));

    return Response.json({ launches: transformedData });
  } catch (error) {
    console.error("Error fetching SpaceX data", error);
    return Response.json({ error: "Error fetching SpaceX data" });
  }
}
