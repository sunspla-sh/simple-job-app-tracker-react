import { useState, useContext, useEffect } from "react";
import { JobAppContext } from "../contexts/JobAppContext";

import { STATUS_ENUM } from "api";

export const JobAppCreateForm = () => {

  const { jobAppService } = useContext(JobAppContext);

  const [state, setState] = useState(() => {
    const storedState = localStorage.getItem('jobAppCreateFormState');
    if(storedState) {
      return JSON.parse(storedState);
    }
    return {
      company: '',
      title: '',
      description: '',
      companyUrl: '',
      status: STATUS_ENUM[0]
    }
  });

  useEffect(() => {
    localStorage.setItem('jobAppCreateFormState', JSON.stringify(state));
  }, [state]);

  const [errorMessage, setErrorMessage] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);

  const updateState = e => setState({
    ...state,
    [e.target.name]: e.target.value
  });

  const handleClearCreateJobApp = e => {
    e.preventDefault();
    setState({
      company: '',
      title: '',
      description: '',
      companyUrl: '',
      status: STATUS_ENUM[0]
    });
  }

  const handleSubmitCreateJobApp = async e => {
    e.preventDefault();
    try {
      const createdJobApp = await jobAppService.postJobApp(state);
      console.log('posted jobapp: ', createdJobApp);
      setState({
        company: '',
        title: '',
        description: '',
        companyUrl: '',
        status: STATUS_ENUM[0]
      });
      setErrorMessage('');
      setSuccessMessage('Job App created successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      setErrorMessage(err.message);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  }

  return (
    <form
      className="jobapp_container-create"
      onSubmit={handleSubmitCreateJobApp}
    >
      <div className='jobapp_company'>
        <label
          htmlFor="company"
          className='jobapp_company-descriptor'
        >
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className='jobapp_company-value'
          value={state.company}
          onChange={updateState}
        />
      </div>
      <div className='jobapp_title'>
        <label
          htmlFor="title"
          className='jobapp_title-descriptor'
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className='jobapp_title-value'
          value={state.title}
          onChange={updateState}
        />
      </div>
      <div className='jobapp_description'>
        <label
          htmlFor="description"
          className='jobapp_description-descriptor'
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className='jobapp_description-value'
          rows={5}
          value={state.description}
          onChange={updateState}
        >
        </textarea>
      </div>
      <div className='jobapp_companyUrl'>
        <label
          htmlFor="companyUrl"
          className='jobapp_companyUrl-descriptor'
        >
          Company URL
        </label>
        <input
          type="text"
          id="companyUrl"
          name="companyUrl"
          className='jobapp_companyUrl-value'
          value={state.companyUrl}
          onChange={updateState}
        />
      </div>
      <div className='jobapp_status'>
        <label
          htmlFor="status"
          className='jobapp_status-descriptor'
        >
          Status
        </label>
        <select
          name="status"
          id="status"
          className='jobapp_status-value'
          value={state.status}
          onChange={updateState}
        >
          {STATUS_ENUM.map(s => (
            <option value={s} key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="jobapp_submit-or-cancel">
        <button
          className="jobapp_cancel-create-button"
          onClick={handleClearCreateJobApp}
        >
          Clear
        </button>
        <button
          className="jobapp_submit-create-button"
          type="submit"
        >
          Create Job App
        </button>
      </div>
      <div>
        {
          errorMessage && (
            <p className='jobapp_create-error-message'>
              Error: {errorMessage}
            </p>
          )
        }
        {
          successMessage && (
            <p className='jobapp_create-success-message'>
              {successMessage}
            </p>
          )
        }
      </div>
      
    </form>
  );

};