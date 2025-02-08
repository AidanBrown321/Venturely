import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Destination";
import DestinationInfo from "./DestinationInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Destination = ({
  _id,
  name,
  country,
  admin1,
  lat,
  lon,
  destinationType,
  createdAt,
  destinationStatus,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{name.charAt(0)}</div>
        <div className="info">
          <h5>{name}</h5>
          <p>{country}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <DestinationInfo icon={<FaLocationArrow />} text={name} />
          <DestinationInfo icon={<FaCalendarAlt />} text={date} />
          <DestinationInfo icon={<FaBriefcase />} text={destinationType} />
          {destinationStatus === "yes" && (
            <div className={`status ${destinationStatus}`}>I have been</div>
          )}
          {destinationStatus === "no" && (
            <div className={`status ${destinationStatus}`}>I want to go</div>
          )}
        </div>
        <footer className="actions">
          <Link to={`../edit-destination/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../delete-destination/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Destination;
