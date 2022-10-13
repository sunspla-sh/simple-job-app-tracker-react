import { useState, useContext } from "react";
import { JobAppContext } from "../contexts/JobAppContext";

export const JobAppCreateForm = () => {

  const { jobAppService } = useContext(JobAppContext);

  const [state, setState] = useState({
    company: '',
    title: '',
    description: '',
    companyUrl: ''
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);

  const updateState = e => setState({
    ...state,
    [e.target.name]: e.target.value
  });

  const createJobApp = async e => {
    e.preventDefault();

    try {
      const result = await jobAppService.postJobApp(state);
      console.log('posted jobapp: ', result);
      setState({
        company: '',
        title: '',
        description: '',
        companyUrl: ''
      });
      setErrorMessage(null);
      setSuccessMessage('Job App created successfully!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  return (
    <form
      onSubmit={createJobApp}
    >
      <div>
        <label
          htmlFor="company"
        >
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={state.company}
          onChange={updateState}
        />
      </div>
      <div>
        <label
          htmlFor="title"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={state.title}
          onChange={updateState}
        />
      </div>
      <div>
        <label
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          onChange={updateState}
        >
          {
            state.description
          }
        </textarea>
      </div>
      <div>
        <label
          htmlFor="companyUrl"
        >
          Company URL
        </label>
        <input
          type="text"
          id="companyUrl"
          name="companyUrl"
          value={state.companyUrl}
          onChange={updateState}
        />
      </div>
      <div>
        <button>Create Job App</button>
      </div>
      <div>
        {
          errorMessage && (
            <p>
              {
                errorMessage
              }
            </p>
          )
        }
      </div>
      <div>
        {
          successMessage && (
            <p>
              {
                successMessage
              }
            </p>
          )
        }
      </div>
    </form>
  );

};