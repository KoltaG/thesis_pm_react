import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../common/CustomInput";
import Button from "../common/Button";
import { useProjectContext } from "../../context/projectContext/ProjectContextProvider";

interface Values {
  name: string;
}

const initialValues: Values = {
  name: "",
};

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Project name is required!"),
});

interface NewProjectFormProps {
  onSuccess: () => void;
}

const NewProjectForm = ({ onSuccess }: NewProjectFormProps) => {
  const { createProject } = useProjectContext();

  const handleCreateProject = async (values: Values) => {
    createProject(values.name);
    onSuccess();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          validateOnBlur
          onSubmit={async (values: Values, { setSubmitting }) => {
            await handleCreateProject(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="space-y-4">
              <Field
                name="name"
                type="text"
                label="Project Name"
                placeholder="Enter project name"
                component={CustomInput}
              />
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="justify-center !text-center w-full focus:ring-opacity-50 disabled:opacity-50"
                onClick={() => {}}
              >
                Add Project
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewProjectForm;
