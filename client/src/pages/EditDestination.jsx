import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { DESTINATION_STATUS, DESTINATION_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/destinations/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-destinations");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/destinations/${params.id}`, data);
    toast.success("Destination edited successfully");
    return redirect("/dashboard/all-destinations");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditDestination = () => {
  const { destination } = useLoaderData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit destination</h4>
        <div className="form-center">
          <FormRow type="text" name="country" defaultValue={destination.name} />
          <FormRow
            type="text"
            name="name"
            labelText="city"
            defaultValue={destination.country}
          />
          <FormRow
            type="text"
            name="admin1"
            labelText="state"
            defaultValue={destination.admin1}
          />
          <FormRow
            type="text"
            name="lat"
            labelText="latitude"
            defaultValue={destination.lat}
          />
          <FormRow
            type="text"
            name="lon"
            labelText="longitude"
            defaultValue={destination.lon}
          />
          <FormRowSelect
            name="destinationStatus"
            labelText="Have you visited this destination?"
            defaultValue={destination.destinationStatus}
            list={Object.values(DESTINATION_STATUS)}
          />
          <FormRowSelect
            name="destinationType"
            labelText="destination type"
            defaultValue={destination.destinationType}
            list={Object.values(DESTINATION_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditDestination;
