import React, { useState, useEffect } from "react";
import "./FindJob.css";
// import logo from '../../images/demo/Logo.png';
import axios from "axios";
import Footer from "../../components/Footer/Footer.jsx";
const FindJob = () => {
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState("");
  const [jobList, setJobList] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  const getData = async () => {
    let res;
    try {
      res = await axios.get("http://localhost:5000/job");
      setAllJobs(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    user: "",
    duration: "",
    // logoUrl: "",
    // easyApply: false,
  });
  const [showAddJobForm, setShowAddJobForm] = useState(false);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleKeywordsChange = (e) => {
    setKeywords(e.target.value);
  };

  const handleSearch = async () => {
    let res;
    try {
      res = await axios.get(`http://localhost:5000/job/filter/${keywords}`);

      setJobList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Perform an API call or search logic here using the location and keywords
  // Update the jobList state with the retrieved job data
  // For simplicity, let's assume jobList is an array of job objects with logo URLs

  // const mockJobData = [
  //   { id: 1, title: 'Software Engineer', company: 'ABC Tech', location: 'New York', logoUrl: logo, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', easyApply: true, timePosted: '2 days ago' },
  //   { id: 2, title: 'Product Manager', company: 'XYZ Corp', location: 'San Francisco', logoUrl: logo, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', easyApply: false, timePosted: '1 day ago' },
  //   // Add more job objects as needed
  // ];

  const handleEasyApply = (jobId) => {
    // Handle the easy apply functionality for the job with the specified ID
    console.log(`Easy Apply for job with ID ${jobId}`);
  };

  const handleNewJobChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    // // Update the jobList state with the new job
    // setJobList((prevJobList) => [...prevJobList, newJobItem]);
    // // Clear the newJob state and hide the add job form
    // setNewJob({
    //   title: "",
    //   company: "",
    //   description: "",
    //   location: "",
    //   logoUrl: "",
    //   easyApply: false,
    // });
    // setShowAddJobForm(false);
    let res;
    try {
      res = await axios.post("http://localhost:5000/job", newJob);
      if (res.status === 200) {
        console.log("Added Successfylly");
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleAddJobForm = () => {
    setShowAddJobForm((prevValue) => !prevValue);
  };

  return (
    <>
      <div className="bgjob"></div>
      <div className="find-job-container">
        <h2>Find Job</h2>
        <div className="search-input">
          <label htmlFor="location-input">Location:</label>
          <input
            type="text"
            id="location-input"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <div className="search-input">
          <label htmlFor="keywords-input">Keywords:</label>
          <input
            type="text"
            id="keywords-input"
            value={keywords}
            onChange={handleKeywordsChange}
          />
        </div>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>

        <h3>Job List:</h3>
        <ul className="job-list">
          {jobList.map((job, index) => (
            <li key={job.id} className="job-item">
              <div className="company-logo">
                <img src={job.logoUrl} alt={`${job.company} Logo`} />
              </div>
              <div className="job-details">
                <strong>{job.title}</strong> - {job.company}, {job.location}
                <p className="job-description">{job.description}</p>
                <div className="job-footer">
                  <span className="time-posted">Posted {job.timePosted}</span>
                  <button className="view-more-button">View More</button>
                  {job.easyApply && (
                    <button
                      className="easy-apply-button"
                      onClick={() => handleEasyApply(job.id)}
                    >
                      Easy Apply
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {showAddJobForm ? (
          <form className="add-job-container">
            <h3>Add a Job</h3>
            <div className="add-job-input">
              <label htmlFor="title-input">Title:</label>
              <input
                type="text"
                id="title-input"
                name="title"
                value={newJob.title}
                onChange={handleNewJobChange}
              />
            </div>
            {/* <div className="add-job-input">
              <label htmlFor="company-input">Company:</label>
              <input
                type="text"
                id="company-input"
                name="company"
                value={newJob.company}
                onChange={handleNewJobChange}
              />
            </div> */}
            <div className="add-job-input">
              <label htmlFor="description-input">Description:</label>
              <textarea
                id="description-input"
                name="description"
                value={newJob.description}
                onChange={handleNewJobChange}
              ></textarea>
            </div>
            <div className="add-job-input">
              <label htmlFor="duration-input">Duration:</label>
              <input
                type="text"
                id="duration-input"
                name="duration"
                value={newJob.duration}
                onChange={handleNewJobChange}
              />
            </div>
            <div className="add-job-input">
              <label htmlFor="logo-url-input">Logo URL:</label>
              <input
                type="text"
                id="logo-url-input"
                name="user"
                value={newJob.user}
                onChange={handleNewJobChange}
              />
            </div>
            {/* <div className="add-job-input">
              <label htmlFor="easy-apply-input">Easy Apply:</label>
              <input
                type="checkbox"
                id="easy-apply-input"
                name="easyApply"
                checked={newJob.easyApply}
                onChange={handleNewJobChange}
              />
            </div> */}
            <button className="add-job-button" onClick={handleAddJob}>
              Add Job
            </button>
          </form>
        ) : (
          <button
            className="add-job-toggle-button"
            onClick={handleToggleAddJobForm}
          >
            Add a Job
          </button>
        )}
      </div>
      <div className="jobs-cards-container">
        {allJobs.map((job) => (
          <div key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default FindJob;
