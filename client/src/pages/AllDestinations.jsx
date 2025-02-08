import { toast } from "react-toastify";
import { DestinationsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get("/destinations", {
      params,
    });
    return {
      data,
      searchValues: { ...params },
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllDestinationsContext = createContext();
const AllDestinations = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllDestinationsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <DestinationsContainer />
    </AllDestinationsContext.Provider>
  );
};

export const useAllDestinationsContext = () =>
  useContext(AllDestinationsContext);

export default AllDestinations;
