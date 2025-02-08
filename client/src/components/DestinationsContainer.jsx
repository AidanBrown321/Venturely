import Destination from "./Destination";
import Wrapper from "../assets/wrappers/DestinationsContainer";
import { useAllDestinationsContext } from "../pages/AllDestinations";
import PageBtnContainer from "./PageBtnContainer";

const DestinationsContainer = () => {
  const { data } = useAllDestinationsContext();
  const { destinations, totalDestinations, numOfPages } = data;
  if (destinations.length === 0) {
    return (
      <Wrapper>
        <h2>No destinations to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalDestinations} destination{totalDestinations.length > 1 && "s"}{" "}
        found
      </h5>
      <div className="destinations">
        {destinations.map((destination) => {
          return <Destination key={destination._id} {...destination} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default DestinationsContainer;
