import { Formik } from "formik";
import { Role } from "../../DTOs/login.response";
import * as Yup from "yup";
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
  email: Yup.string()
    .email("Hibás email formátum!")
    .required("Kötelező kitölteni!"),
  password: Yup.string().required("Kötelező kitölteni!"),
});

interface NewUserFormProps {
  onSuccess: () => void;
}

const NewUserForm = ({ onSuccess }: NewUserFormProps) => {
  const tryRegister = async (values: Values) => {
    try {
      await authService.postRegister(values);
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      validateOnBlur
      onSubmit={async (values: Values, { setSubmitting }) => {
        tryRegister(values), setSubmitting(false);
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
            placeholder="Név"
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
          />
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
            Hozzáadás
          </button>
        </>
      )}
    </Formik>
  );
};

export default NewUserForm;
