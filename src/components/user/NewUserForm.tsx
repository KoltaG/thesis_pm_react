import { Formik, Field, Form } from "formik";
import { Role } from "../../DTOs/login.response";
import * as Yup from "yup";
import CustomInput from "../common/CustomInput";
import Button from "../common/Button";
import { useUserContext } from "../../context/userContext/UserContext";
import authService from "../../utils/services/authService";

interface Values {
  name: string;
  email: string;
  password: string;
  role: Role;
}

const initialValues: Values = {
  name: "",
  email: "",
  password: "",
  role: "Dev",
};

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});

interface NewUserFormProps {
  onSuccess: () => void;
}

const NewUserForm = ({ onSuccess }: NewUserFormProps) => {
  const { fetchUsers } = useUserContext();

  const tryRegister = async (values: Values) => {
    try {
      await authService.postRegister(values);
      fetchUsers();
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          validateOnBlur
          onSubmit={async (values: Values, { setSubmitting }) => {
            await tryRegister(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="space-y-4">
              <Field
                name="name"
                type="text"
                label="Name"
                placeholder="Name"
                component={CustomInput}
              />
              <Field
                name="email"
                type="email"
                label="Email Address"
                placeholder="Email"
                component={CustomInput}
              />
              <Field
                name="password"
                type="password"
                label="Password"
                placeholder="Password"
                component={CustomInput}
              />
              <div className="flex flex-col gap-2 mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <Field
                  as="select"
                  name="role"
                  className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Dev">Developer</option>
                  <option value="PM">Project Manager</option>
                </Field>
              </div>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="justify-center !text-center w-full focus:ring-opacity-50 disabled:opacity-50"
                onClick={() => {}}
              >
                Add User
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewUserForm;
