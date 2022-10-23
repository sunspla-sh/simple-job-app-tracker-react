import { useState, useContext } from "react";
import { JobAppContext } from "../contexts/JobAppContext";

import { STATUS_ENUM } from "api";

export const JobAppCreateForm = () => {

  const { jobAppService } = useContext(JobAppContext);

  const [state, setState] = useState({
    company: '',
    title: '',
    description: '',
    companyUrl: '',
    status: STATUS_ENUM[0]
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
        companyUrl: '',
        status: STATUS_ENUM[0]
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
          value={state.description}
          onChange={updateState}
        >
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
        <label
          htmlFor="status"
        >
          Status
        </label>
        <select
          name="status"
          id="status"
          value={state.status}
          onChange={updateState}
        >
          {STATUS_ENUM.map(s => (
            <option value={s}>{s}</option>
          ))}
        </select>
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