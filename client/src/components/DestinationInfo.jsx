import Wrapper from "../assets/wrappers/DestinationInfo";

const DestinationInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="destination-icon">{icon}</span>
      <span className="destination-text">{text}</span>
    </Wrapper>
  );
};
export default DestinationInfo;
