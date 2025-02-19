import { ChartsContainer, Map, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const response = await customFetch.get("/destinations/stats");
    const destinationResponse = await customFetch.get("/destinations");
    return {
      defaultStats: response.data || {},
      monthlyApplications: response.data?.monthlyApplications || [],
      data: destinationResponse.data || [],
    };
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { defaultStats, monthlyApplications, data } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      <Map data={data} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
