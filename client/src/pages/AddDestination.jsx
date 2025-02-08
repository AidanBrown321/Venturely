import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { DESTINATION_STATUS, DESTINATION_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/destinations", data);
    toast.success("Destination added successfully");
    return redirect("all-destinations");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddDestination = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add destination</h4>
        <div className="form-center">
          <FormRow type="text" name="country" />
          <FormRow type="text" name="name" labelText="city" />
          <FormRow
            type="text"
            labelText="state"
            name="admin1"
            defaultValue={"idaho"}
          />
          <FormRow
            type="text"
            labelText="latitude"
            name="lat"
            defaultValue={"100"}
          />
          <FormRow
            type="text"
            labelText="longitude"
            name="lon"
            defaultValue={"200"}
          />
          <FormRowSelect
            labelText="Have you visited this destination?"
            name="destinationStatus"
            defaultValue={DESTINATION_STATUS.WANT}
            list={Object.values(DESTINATION_STATUS)}
          />
          <FormRowSelect
            labelText="destination type"
            name="destinationType"
            defaultValue={DESTINATION_TYPE.RESORT}
            list={Object.values(DESTINATION_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddDestination;
