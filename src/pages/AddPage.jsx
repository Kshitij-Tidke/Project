import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "../store/projectSlice";
import { Dropdown, Button, DatePicker } from "../components";

function AddPage() {
  const [reason, setReason] = useState("For Business");
  const [type, setType] = useState("Internal");
  const [division, setDivision] = useState("Filters");
  const [category, setCategory] = useState("Quality A");
  const [priority, setPriority] = useState("High");
  const [department, setDepartment] = useState("Strategy");
  const [location, setLocation] = useState("Pune");
  const [projectTheme, setProjectTheme] = useState("");
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(null); 

  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [themeError, setThemeError] = useState(""); 

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();


    setStartDateError("");
    setEndDateError("");
    setThemeError("");


    let hasErrors = false;

    if (!projectTheme) {
      setThemeError("Project theme is required."); 
      hasErrors = true; 
    }
    if (!startDate) {
      setStartDateError("Start date is required."); 
      hasErrors = true; 
    }
    if (!endDate) {
      setEndDateError("End date is required."); 
      hasErrors = true; 
    }
    if (startDate && endDate && startDate > endDate) {
      setEndDateError("End date cannot be before start date."); 
      hasErrors = true; 
    }


    if (hasErrors) {
      return; 
    }


    dispatch(
      addProject({
        theme: projectTheme,
        reason,
        type,
        division,
        category,
        priority,
        department,
        location,
        startDate,
        endDate,
        status: "Registered",
      })
    );


    resetForm();
  };

  const resetForm = () => {
    setProjectTheme("");
    setReason("For Business");
    setType("Internal");
    setDivision("Filters");
    setCategory("Quality A");
    setPriority("High");
    setDepartment("Strategy");
    setLocation("Pune");
    setStartDate(null);
    setEndDate(null);
    setStartDateError("");
    setEndDateError(""); 
    setThemeError(""); 
  };

  return (
    <div className="bg-blue-50 z-0 h-full pt-24 flex flex-col items-center">
      <div className="flex-1 rounded-lg shadow-md p-6 w-full mx-4 mt-6 bg-white">
        <form className="flex flex-col w-3/4 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <textarea
              rows="2"
              className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Project Theme"
              value={projectTheme}
              onChange={(e) => setProjectTheme(e.target.value)}
            ></textarea>
            <div className="text-right mt-4 sm:mt-0 sm:ml-4">
              <Button
                className="px-4 sm:px-20 bg-blue-600 text-white py-2 rounded-3xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
                type="submit"
                label="Save Project"
              />
            </div>
          </div>
          {themeError && <span className="text-red-500">{themeError}</span>} 

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Dropdown
              label="Reason"
              options={["For Business", "For Personal", "For Dealership", "For Transport"]}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <Dropdown
              label="Type"
              options={["Internal", "External", "Vendor"]}
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <Dropdown
              label="Division"
              options={["Filters", "Water Heater", "Marketing", "Compressor", "Pumps", "Glass"]}
              value={division}
              onChange={(e) => setDivision(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Dropdown
              label="Category"
              options={["Quality A", "Quality B", "Quality C", "Quality D"]}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Dropdown
              label="Priority"
              options={["High", "Medium", "Low"]}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
            <Dropdown
              label="Department"
              options={["Strategy", "Quality", "Maintenance", "Finance", "Stores"]}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <DatePicker
              label="Start Date as per Project Plan"
              selectedDate={startDate}
              onDateSelect={setStartDate}
            />
            {startDateError && <span className="text-red-500">{startDateError}</span>}
            <DatePicker
              label="End Date as per Project Plan"
              selectedDate={endDate}
              onDateSelect={setEndDate}
            />
            {endDateError && <span className="text-red-500">{endDateError}</span>}
            <Dropdown
              label="Location"
              options={["Pune", "Mumbai", "Delhi"]}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <label>
            Status: <span className="font-bold">Registered</span>
          </label>
        </form>
      </div>
    </div>
  );
}

export default AddPage;
