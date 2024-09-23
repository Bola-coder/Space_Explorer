import { gql } from "@apollo/client";
import apolloClient from "@/app/_libs/ApolloClient";

// Get Single Launch
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("params", params);
  const { id } = params;
  try {
    const { data } = await apolloClient.query({
      query: gql`
        query Launches($launchId: ID!) {
          launch(id: $launchId) {
            id
            is_tentative
            launch_date_local
            launch_site {
              site_name
            }
            launch_success
            launch_year
            links {
              article_link
              video_link
              wikipedia
              mission_patch
            }
            mission_id
            mission_name
            rocket {
              rocket_name
              rocket {
                company
                country
                description
                landing_legs {
                  number
                }
                mass {
                  kg
                }
                name
              }
            }
          }
        }
      `,
      variables: { launchId: id },
    });

    return Response.json({ launch: data.launch });
  } catch (error) {
    console.error("Error fetching SpaceX data", error);
    return Response.json({ error: "Error fetching SpaceX data" });
  }
}
