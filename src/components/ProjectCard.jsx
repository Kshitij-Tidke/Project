import React from 'react';
import { Button } from '../components';

const ProjectCard = ({ project, onStatusChange }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md bg-white p-5 m-4 transition-transform transform hover:scale-105">
      <h3 className="font-bold text-xl mb-2 text-blue-600">{project.theme}</h3>
      <p className="text-sm"><strong>Reason:</strong> {project.reason}</p>
      <p className="text-sm"><strong>Type:</strong> {project.type}</p>
      <p className="text-sm"><strong>Division:</strong> {project.division}</p>
      <p className="text-sm"><strong>Category:</strong> {project.category}</p>
      <p className="text-sm"><strong>Priority:</strong> {project.priority}</p>
      <p className="text-sm"><strong>Department:</strong> {project.department}</p>
      <p className="text-sm"><strong>Location:</strong> {project.location}</p>
      <p className="text-sm"><strong>Status:</strong> {project.status}</p>
      <div className="mt-4 flex justify-between">
        <Button
          className={"bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"}
          onClick={() => onStatusChange(project.id, "Running")}
          label="Start"
        />
        <Button
          className={"bg-white text-blue-600 border border-blue-500 py-1 px-3 rounded-md hover:bg-blue-700 hover:text-white"}
          onClick={() => onStatusChange(project.id, "Cancelled")}
          label="Cancel"
        />
        <Button
          className={"bg-white text-blue-600 border border-blue-500 py-1 px-3 rounded-md hover:bg-blue-700 hover:text-white"}
          onClick={() => onStatusChange(project.id, "Closed")}
          label="Close"
        />
      </div>
    </div>
  );
};

export default ProjectCard;
