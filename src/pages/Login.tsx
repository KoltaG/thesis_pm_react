import * as Yup from "yup";
import { useAuthContext } from "../context/authContext/AuthContext";
import { Formik, Field, Form } from "formik";
import { toast } from "react-toastify";
import CustomInput from "../components/common/CustomInput";
import Button from "../components/common/Button";

interface Values {
  email: string;
  password: string;
}

const initialValues: Values = {
  email: "",
  password: "",
};

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format!").required("Required!"),
  password: Yup.string().required("Required!"),
});

const Login = () => {
  const { tryLogin } = useAuthContext();

  const loginHandler = async (email: string, password: string) => {
    try {
      await tryLogin(email, password);
    } catch (error) {
      toast.error("Error logging in, please try again!");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          validateOnBlur
          onSubmit={async (values: Values, { setSubmitting }) => {
            await loginHandler(values.email, values.password);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="space-y-4">
              <Field
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                component={CustomInput}
              />
              <Field
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                component={CustomInput}
              />

              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                onClick={() => {}}
                className=" justify-center !text-center w-full focus:ring-opacity-50 disabled:opacity-50"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
