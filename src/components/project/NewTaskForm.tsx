import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../common/CustomInput";
import Button from "../common/Button";
import { useProjectContext } from "../../context/projectContext/ProjectContextProvider";
import { useUserContext } from "../../context/userContext/UserContextProvider";
import { TaskStatus } from "../../context/projectContext/ProjectContext";

interface Values {
  name: string;
  description?: string;
  assignedUserId?: string;
  status: TaskStatus;
}

const initialValues: Values = {
  name: "",
  description: "",
  assignedUserId: "",
  status: "To Do",
};

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Task name is required!"),
  description: Yup.string().max(
    500,
    "Description must be 500 characters or less."
  ),
  assignedUserId: Yup.string().required("Assigned user is required!"),
});

interface NewTaskFormProps {
  projectId: string;
  onSuccess: () => void;
}

const NewTaskForm = ({ projectId, onSuccess }: NewTaskFormProps) => {
  const { createTask, state: projectState } = useProjectContext();
  const { state: userState } = useUserContext();

  const project = projectState.projects.find(
    (project) => project._id === projectId
  );

  const assignedUsers = userState.users.filter((user) =>
    project?.assignedUserIds?.some(
      (assignedUserId) => assignedUserId === user._id
    )
  );

  const handleCreateTask = async (values: Values) => {
    try {
      await createTask(projectId, values);
      onSuccess();
    } catch (error) {
      console.error("Failed to create task:", error);
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
            await handleCreateTask(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid, errors }) => (
            <Form className="space-y-4">
              <Field
                name="name"
                type="text"
                label="Task Name"
                placeholder="Enter task name"
                component={CustomInput}
              />
              <Field
                name="description"
                type="text"
                label="Description"
                placeholder="Enter task description (optional)"
                component={CustomInput}
              />
              <div className="flex flex-col gap-2 mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Assigned User
                </label>
                <Field
                  as="select"
                  name="assignedUserId"
                  className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a user</option>
                  {assignedUsers.map((user) => (
                    <option
                      key={user._id}
                      value={user._id}
                    >
                      {user.name}
                    </option>
                  ))}
                </Field>
                {errors.assignedUserId && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.assignedUserId.toString()}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="justify-center !text-center w-full focus:ring-opacity-50 disabled:opacity-50"
                onClick={() => {}}
              >
                Add Task
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewTaskForm;
