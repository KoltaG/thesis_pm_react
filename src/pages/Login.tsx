import * as Yup from "yup";
import { useAuthContext } from "../context/authContext/AuthContext";
import { Formik } from "formik";
import { toast } from "react-toastify";

interface Values {
  email: string;
  password: string;
}

const initialValues: Values = {
  email: "",
  password: "",
};

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Hibás email formátum!")
    .required("Kötelező kitölteni!"),
  password: Yup.string().required("Kötelező kitölteni!"),
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <div className="flex gap-4">
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          validateOnBlur
          onSubmit={async (values: Values, { setSubmitting }) => {
            loginHandler(values.email, values.password), setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            submitForm,
            isSubmitting,
            isValid,
            touched,
            handleBlur,
          }) => (
            <>
              <input
                placeholder="E-mail cím"
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                type="email"
              />
              <input
                placeholder="Jelszó"
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                type="password"
              />

              <button
                onClick={() => submitForm()}
                disabled={!isValid || isSubmitting}
              >
                Bejelentkezés
              </button>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
