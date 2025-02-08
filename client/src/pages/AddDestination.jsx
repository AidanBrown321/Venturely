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
          <FormRowSelect
            labelText="Have you visited this destination?"
            name="destinationStatus"
            defaultValue={DESTINATION_STATUS.WANT}
            list={[
              { name: "I want to go", value: DESTINATION_STATUS.WANT },
              { name: "I have been", value: DESTINATION_STATUS.BEEN },
            ]}
          />
          <FormRowSelect
            labelText="destination type"
            name="destinationType"
            defaultValue={DESTINATION_TYPE.RESORT}
            list={[
              { name: "Resort", value: DESTINATION_TYPE.RESORT },
              { name: "City", value: DESTINATION_TYPE.CITY },
              { name: "Nature", value: DESTINATION_TYPE.NATURE },
            ]}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddDestination;
