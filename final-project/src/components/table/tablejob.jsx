// import React, { useState } from 'react';
// import {
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
//   Paper,
//   TextField,
//   IconButton,
//   TableSortLabel,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
//   Input,
// } from '@material-ui/core';
// import { Edit, Delete, Add } from '@material-ui/icons';

// const initialJob = {
//   id: '',
//   title: '',
//   description: '',
//   // Add more fields as needed
// };

// const initialSortState = {
//   field: '',
//   order: 'asc',
// };

// const TableJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [dialogTitle, setDialogTitle] = useState('');
//   const [currentJob, setCurrentJob] = useState(initialJob);
//   const [sortConfig, setSortConfig] = useState(initialSortState);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Helper function to handle sorting
//   const handleSort = (field) => {
//     let order = 'asc';
//     if (sortConfig.field === field && sortConfig.order === 'asc') {
//       order = 'desc';
//     }
//     setSortConfig({ field, order });
//   };

//   // Helper function to handle searching
//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   // Helper function to filter jobs based on search term
//   const filterJobs = (jobs) => {
//     return jobs.filter((job) =>
//       job.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };

//   // Helper function to sort jobs based on sort configuration
//   const sortJobs = (jobs) => {
//     const { field, order } = sortConfig;
//     const multiplier = order === 'asc' ? 1 : -1;

//     return jobs.sort((a, b) => {
//       if (a[field] < b[field]) {
//         return -1 * multiplier;
//       }
//       if (a[field] > b[field]) {
//         return 1 * multiplier;
//       }
//       return 0;
//     });
//   };

//   // Function to handle opening the dialog for adding/editing jobs
//   const handleOpenDialog = (job = initialJob) => {
//     setCurrentJob(job);
//     setDialogTitle(job.id ? 'Edit Job' : 'Add Job');
//     setOpenDialog(true);
//   };

//   // Function to handle closing the dialog
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setCurrentJob(initialJob);
//   };

//   // Function to handle saving the job
//   const handleSaveJob = () => {
//     // Add your save logic here, e.g., API call or state update
//     // After saving, you can update the jobs list and close the dialog

//     // Example implementation to update jobs list and close dialog
//     const updatedJobs = jobs.map((job) => {
//       if (job.id === currentJob.id) {
//         return currentJob;
//       }
//       return job;
//     });

//     setJobs(updatedJobs);
//     handleCloseDialog();
//   };

//   // Function to handle deleting a job
//   const handleDeleteJob = (job) => {
//     // Add your delete logic here, e.g., API call or state update
//     // After deleting, you can update the jobs list

//     // Example implementation to update jobs list
//     const updatedJobs = jobs.filter((j) => j.id !== job.id);
//     setJobs(updatedJobs);
//   };

//   return (
//     <div>
//       <div>
//         <TextField
//           label="Search"
//           value={searchTerm}
//           onChange={handleSearch}
//           variant="outlined"
//         />
//         <IconButton onClick={() => handleOpenDialog()} aria-label="add">
//           <Add />
//         </IconButton>
//       </div>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <TableSortLabel
//                   active={sortConfig.field === 'title'}
//                   direction={sortConfig.field === 'title' ? sortConfig.order : 'asc'}
//                   onClick={() => handleSort('title')}
//                 >
//                   Title
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {sortJobs(filterJobs(jobs)).map((job) => (
//               <TableRow key={job.id}>
//                 <TableCell>{job.title}</TableCell>
//                 <TableCell>{job.description}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleOpenDialog(job)} aria-label="edit">
//                     <Edit />
//                   </IconButton>
//                   <IconButton onClick={() => handleDeleteJob(job)} aria-label="delete">
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>{dialogTitle}</DialogTitle>
//         <DialogContent>
//           <FormControl>
//             <InputLabel>Title</InputLabel>
//             <Input
//               value={currentJob.title}
//               onChange={(e) => setCurrentJob({ ...currentJob, title: e.target.value })}
//             />
//           </FormControl>
//           <FormControl>
//             <InputLabel>Description</InputLabel>
//             <Input
//               value={currentJob.description}
//               onChange={(e) => setCurrentJob({ ...currentJob, description: e.target.value })}
//             />
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSaveJob} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default TableJobs;


// import React, { useState, useEffect } from 'react';
// import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
// import './tablejob.css';
// const FindJob = () => {
//   const [jobs, setJobs] = useState([]);
//   const [formData, setFormData] = useState({
//     id: '',
//     title: '',
//     company: '',
//     location: '',
//     salary: '',
//     type: '',
//     description: '',
//     urldemo: ''
//   });
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({
//     key: '',
//     direction: ''
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [jobsPerPage] = useState(5);

//   // Load jobs data (example)
//   useEffect(() => {
//     // Simulating API call to fetch jobs data
//     const fetchJobs = async () => {
//       // Replace this with your API call to fetch jobs data
//       const response = await fetch('/api/jobs');
//       const data = await response.json();
//       setJobs(data);
//       setFilteredJobs(data);
//     };

//     fetchJobs();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Handle form submission (create or update a job)
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (formData.id) {
//       // Update the existing job
//       setJobs((prevJobs) =>
//         prevJobs.map((job) => (job.id === formData.id ? formData : job))
//       );
//     } else {
//       // Create a new job
//       const newJob = { ...formData, id: Date.now() };
//       setJobs((prevJobs) => [...prevJobs, newJob]);
//     }

//     // Reset the form data
//     setFormData({
//       id: '',
//       title: '',
//       company: '',
//       location: '',
//       salary: '',
//       type: '',
//       description: '',
//       urldemo: ''
//     });
//   };

//   // Handle edit job
//   const handleEditJob = (job) => {
//     setFormData(job);
//   };

//   // Handle delete job
//   const handleDeleteJob = (jobId) => {
//     setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
//   };

//   // Handle sorting
//   const handleSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Sort jobs based on sortConfig
//   useEffect(() => {
//     if (sortConfig.key !== '') {
//       const sortedJobs = [...filteredJobs].sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? 1 : -1;
//         }
//         return 0;
//       });
//       setFilteredJobs(sortedJobs);
//     }
//   }, [sortConfig]);

//   // Filter jobs based on search term
//   useEffect(() => {
//     const filtered = jobs.filter(
//       (job) =>
//         job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         job.location.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredJobs(filtered);
//   }, [searchTerm, jobs]);

//   // Pagination
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="job-container">
//       <h2>Find Job</h2>

//       {/* Job Form */}
//       <h3>Add/Edit Job</h3>
//       <form onSubmit={handleSubmit} className="job-form">
//         {/* Input fields for job properties */}
//         <div>
//           <label>
//             Title:
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Company:
//             <input
//               type="text"
//               name="company"
//               value={formData.company}
//               onChange={handleInputChange}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//           Location:
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleInputChange}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//           Salary:
//             <input
//               type="text"
//               name="salary"
//               value={formData.salary}
//               onChange={handleInputChange}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//           Type:
//             <input
//               type="text"
//               name="type"
//               value={formData.type}
//               onChange={handleInputChange}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//           Description:
//             <input
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//           Demo URL:
//             <input
//               type="text"
//               name="urldemo"
//               value={formData.urldemo}
//               onChange={handleInputChange}
//             />
//           </label>
//         </div>
//         {/* Add more input fields for other job properties */}
//         {/* Company, Location, Salary, Type, Description, Demo URL */}
//         <br />
//         <button type="submit">Save</button>
//       </form>

//       {/* Job Filter */}
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="job-search"
//       />

//       {/* Job List */}
//       <table className="job-table">
//         <thead>
//           <tr>
//             <th onClick={() => handleSort('title')}>
//               Title {sortConfig.key === 'title' && `(${sortConfig.direction})`}
//             </th>
//             <th onClick={() => handleSort('company')}>
//               Company {sortConfig.key === 'company' && `(${sortConfig.direction})`}
//             </th>
//             <th onClick={() => handleSort('location')}>
//               Location {sortConfig.key === 'location' && `(${sortConfig.direction})`}
//             </th>
//             <th onClick={() => handleSort('salary')}>
//               Salary {sortConfig.key === 'salary' && `(${sortConfig.direction})`}
//             </th>
//             <th onClick={() => handleSort('type')}>
//               Type {sortConfig.key === 'type' && `(${sortConfig.direction})`}
//             </th>
//             <th>Description</th>
//             <th>Demo URL</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentJobs.map((job) => (
//             <tr key={job.id}>
//               <td>{job.title}</td>
//               <td>{job.company}</td>
//               <td>{job.location}</td>
//               <td>{job.salary}</td>
//               <td>{job.type}</td>
//               <td>{job.description}</td>
//               <td>
//                 <a href={job.urldemo} target="_blank" rel="noopener noreferrer">
//                   {job.urldemo}
//                 </a>
//               </td>
//               <td>
//                 <button onClick={() => handleEditJob(job)}><RiEdit2Line /></button>
//                 <button onClick={() => handleDeleteJob(job.id)}><RiDeleteBinLine /></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="pagination">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index + 1}
//             onClick={() => paginate(index + 1)}
//             className={currentPage === index + 1 ? 'active' : ''}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FindJob;



// import "./admin.css";
import React, { useState, useEffect } from "react";
// import AdminPopup from "../../components/addAdminPopup/adminPopup";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import debounce from "lodash/debounce";
import { Box } from "@mui/system";
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
// import Loader from "../../components/loader/loader";
// import ConfirmationPopup from "../../components/confirmationPopup/confirmationPopup";
import Cookies from "js-cookie";

function createData(
  id,
  title,
  company,
  location,
  salary,
  type,
  description,
  urldemo
) {
  return {
    id,
    title,
    company,
    location,
    salary,
    type,
    description,
    urldemo,
  };
}

function Admin(props) {
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const adminSuper = Cookies.get("super-admin");

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  function openAdminPopup() {
    document.querySelector(".admin-popup").showModal();
  }

  const rows =
    Data ||
    [].map((item) =>
      createData(
        item.id,
        item.title,
        item.company,
        item.location,
        item.salary,
        item.type,
        item.description,
        item.urldemo
      )
    );

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);

  const handleDelete = (rowsDeleted) => {
    const token = Cookies.get("token");
    axios
      .delete(`http://127.0.0.1:8000/api/auth/job/${rowsDeleted}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = () => {
    const token = Cookies.get("token");
    axios
      .get("http://127.0.0.1:8000/api/job", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setData(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleUpdate = (rowData) => {
    setEditingRow(true);
    const token = Cookies.get("token");
    axios
      .patch(
        `http://127.0.0.1:8000/api/auth/job/${rowData[0]}`,
        {
          title: rowData[1],
          company: rowData[2],
          location: rowData[3],
          salary: rowData[4],
          type: rowData[5],
          description: rowData[6],
          urldemo: rowData[7],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showConfirmationBox = () => {
    document.querySelector(".confirmation-popup").showModal();
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        display: "excluded",
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ textAlign: "center" }}
              onClick={() => setEditingRow(rowIndex)}
            >
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "company",
      label: "Company",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ textAlign: "center" }}
              onClick={() => setEditingRow(rowIndex)}
            >
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "location",
      label: "Location",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ textAlign: "center" }}
              onClick={() => setEditingRow(rowIndex)}
            >
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "salary",
      label: "Salary",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ textAlign: "center" }}
              onClick={() => setEditingRow(rowIndex)}
            >
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "type",
      label: "Type",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ textAlign: "center" }}
              onClick={() => setEditingRow(rowIndex)}
            >
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ textAlign: "center" }}
              onClick={() => setEditingRow(rowIndex)}
            >
              {isEditing ? (
                <textarea
                  className="EditInput"
                  value={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "urldemo",
      label: "URL Demo",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ textAlign: "center" }}
              onClick={() => setEditingRow(rowIndex)}
            >
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "created_at",
      label: "Created At",
    },
    {
      name: "updated_at",
      label: "Updated At",
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = tableMeta.rowData;
          const id = rowData[0];
          return (
            <>
              <button
                className="edit-btn"
                onClick={() => {
                  handleUpdate(rowData);
                }}
              >
                <MdOutlineEdit />
              </button>
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <button
                className="delete-btn"
                onClick={() => {
                  setDeleteId(rowData[0]);
                  showConfirmationBox();
                }}
              >
                <MdDeleteForever />
              </button>
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    responsive: "vertical",
    rowsPerPageOptions: [5, 10, 20],
    selectableRows: "none",
    search: true,
    searchPlaceholder: "Search for Job",
    onSearchChange: (searchValue) => handleSearch(searchValue),
    download: true,
    print: true,
    pagination: true,
    rowsPerPage: 5,
    loaded: true,
    rowsPerPageOptions: [5, 10, 20],
    onCellClick: (cellData, cellMeta) => {
      const rowIndex = cellMeta.rowIndex;
      if (cellMeta.colIndex === 3) {
        setEditingRow(rowIndex);
      }
    },
    onRowsDelete: handleDelete,
    fullScreen: true,
  };

  return (
    <>
      {Loading ? (
        <div>
          {/* <Loader /> */}
        </div>
      ) : (
        <div>
          {console.log(adminSuper)}
          {parseInt(adminSuper) ? (
            <button onClick={openAdminPopup}>Add Admin +</button>
          ) : null}
          <Box sx={{ maxWidth: "75%", margin: "auto" }}>
            <MUIDataTable
              title={"Jobs"}
              data={rows}
              columns={columns}
              options={options}
              sx={{
                width: "100%",
                boxShadow: "0 4px 6px 0 hsla(0, 0%, 0%, 0.2)",
                borderRadius: "10px",
              }}
            />
          </Box>
        </div>
      )}
      {/* <AdminPopup />
      <ConfirmationPopup deleteId={deleteId} /> */}
    </>
  );
}

export default Admin;
