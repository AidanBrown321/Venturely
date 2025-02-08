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
            list={["all", ...Object.values(DESTINATION_STATUS)]}
            defaultValue={destinationStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="destination type"
            name="destinationType"
            list={["all", ...Object.values(DESTINATION_TYPE)]}
            defaultValue={destinationType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(DESTINATION_SORT_BY)]}
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
