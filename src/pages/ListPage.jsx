import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProject, updateProjectStatus } from "../store/projectSlice"; 
import { Dropdown, InputField, Button } from "../components";
import { ProjectCard } from '../components'; 
function ListPage() {
  const [select, setSelect] = useState(""); 
  const [search, setSearch] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 7;
  const projects = useSelector((state) => state.project.projects); 
  const dispatch = useDispatch(); 
  const [isMobile, setIsMobile] = useState(false); 
  const [isExtraSmall, setIsExtraSmall] = useState(false); 

  const checkScreenSize = () => {
    const width = window.innerWidth;
    setIsMobile(width < 1450);
    setIsExtraSmall(width < 645);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.theme.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!select) return 0; 
    if (a[select] > b[select]) return 1;
    if (a[select] < b[select]) return -1;
    return 0;
  });

  const indexOfLastProject = currentPage * itemsPerPage;
  const indexOfFirstProject = indexOfLastProject - itemsPerPage;
  const currentProjects = sortedProjects.slice(indexOfFirstProject, indexOfLastProject);

  const handleStatusChange = (projectId, newStatus) => {
    dispatch(updateProjectStatus({ id: projectId, status: newStatus })); 
  };

  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);
  const pages = [...Array(totalPages).keys()].map(num => num + 1); 

  return (
    <div className={`pt-12 sm:pt-36 px-4 sm:px-8 lg:px-44 ${isExtraSmall ? 'pt-36' : ''}`}>
      <div className="flex flex-col sm:flex-row w-full justify-between">
        {/* Search Input */}
        <div className="flex-grow mb-4 sm:mb-0">
          <InputField
            iClassName="border-b w-full"
            placeholder="Search"
            type={"text"}
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-3/4"></div>
        <div className="flex-grow">
          <Dropdown
            className={"flex"}
            label={"Sort By:"}
            options={[
              "reason",
              "type",
              "division",
              "category",
              "priority",
              "department",
              "location",
            ]}
            value={select}
            onChange={(e) => setSelect(e.target.value)} 
          />
        </div>
      </div>

      <div className="mt-10 overflow-x-auto">
        <div className="hidden md:block">
          <table className="w-full text-left table-auto border-collapse">
            <thead>
              <tr className="bg-blue-50 border-b">
                <th className="px-2 sm:px-4 py-2 border-b">Project Theme</th>
                <th className="px-2 sm:px-4 py-2 border-b">Reason</th>
                <th className="px-2 sm:px-4 py-2 border-b">Type</th>
                <th className="px-2 sm:px-4 py-2 border-b">Division</th>
                <th className="px-2 sm:px-4 py-2 border-b">Category</th>
                <th className="px-2 sm:px-4 py-2 border-b">Priority</th>
                <th className="px-2 sm:px-4 py-2 border-b">Department</th>
                <th className="px-2 sm:px-4 py-2 border-b">Location</th>
                <th className="px-2 sm:px-4 py-2 border-b">Status</th>
                <th className="px-2 sm:px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project) => (
                <tr key={project.id}>
                  <td className="px-2 sm:px-4 py-2 border-b">{project.theme}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">{project.reason}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">{project.type}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">{project.division}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">{project.category}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">{project.priority}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">{project.department}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">{project.location}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">{project.status}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        className={"px-2 sm:px-6 bg-blue-600 text-white py-2 rounded-3xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"}
                        onClick={() => handleStatusChange(project.id, "Running")}
                        label="Start"
                      />
                      <Button
                        className={"px-2 sm:px-6 bg-white text-blue-600 border border-blue-500 py-2 rounded-3xl hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300"}
                        onClick={() => handleStatusChange(project.id, "Cancelled")}
                        label="Cancel"
                      />
                      <Button
                        className={"px-2 sm:px-6 bg-white text-blue-600 border border-blue-500 py-2 rounded-3xl hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300"}
                        onClick={() => handleStatusChange(project.id, "Closed")}
                        label="Close"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentProjects.length === 0 && (
            <p className="mt-4 text-center text-gray-600">No projects found.</p>
          )}
        </div>

        {isMobile && (
          <div className="block md:hidden">
            {currentProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onStatusChange={handleStatusChange} 
              />
            ))}
            {currentProjects.length === 0 && (
              <p className="mt-4 text-center text-gray-600">No projects found.</p>
            )}
          </div>
        )}

        <div className="mt-4 flex justify-center flex-wrap">
          {pages.map((pageNum) => (
            <Button
              key={pageNum}
              className={`px-4 py-2 m-1 ${currentPage === pageNum ? "bg-blue-500 hover:bg-blue-900 rounded-3xl text-white" : "bg-gray-200 hover:bg-gray-500 hover:text-white rounded-3xl text-black"}`}
              onClick={() => setCurrentPage(pageNum)} 
              label={pageNum}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListPage;
