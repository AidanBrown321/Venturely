import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import {
  DESTINATION_TYPE,
  DESTINATION_STATUS,
  DESTINATION_SORT_BY,
} from "../../../utils/constants";
import { useAllDestinationsContext } from "../pages/AllDestinations";

const SearchContainer = () => {
  const { searchValues } = useAllDestinationsContext();
  const { search, destinationStatus, destinationType, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="destination status"
            name="destinationStatus"
            list={[
              { name: "all", value: "all" },
              { name: "I want to go", value: DESTINATION_STATUS.WANT },
              { name: "I have been", value: DESTINATION_STATUS.BEEN },
            ]}
            defaultValue={destinationStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="destination type"
            name="destinationType"
            list={[
              { name: "all", value: "all" },
              { name: "Resort", value: DESTINATION_TYPE.RESORT },
              { name: "City", value: DESTINATION_TYPE.CITY },
              { name: "Nature", value: DESTINATION_TYPE.NATURE },
            ]}
            defaultValue={destinationType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[
              { name: "newest", value: DESTINATION_SORT_BY.NEWEST },
              { name: "oldest", value: DESTINATION_SORT_BY.OLDEST },
              { name: "a-z", value: DESTINATION_SORT_BY.ASCENDING },
              { name: "z-a", value: DESTINATION_SORT_BY.DESCENDING },
            ]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link
            to="/dashboard/all-destinations"
            className="btn form-btn delete-btn"
          >
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
