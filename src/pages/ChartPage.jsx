import React from 'react';
import { useSelector } from 'react-redux';
import { Boxes } from '../components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function ChartPage() {
  const projects = useSelector((state) => state.project.projects);

  const totalProjects = projects.length;
  const closedProjects = projects.filter(p => p.status === "Closed").length;
  const runningProjects = projects.filter(p => p.status === "Running").length;
  const closureDelayProjects = projects.filter(p => p.status === "Closure Delay").length;
  const cancelledProjects = projects.filter(p => p.status === "Cancelled").length;

  const aggregateByDepartment = () => {
    const departmentData = {};

    projects.forEach((project) => {
      const { department, status } = project;

      if (!departmentData[department]) {
        departmentData[department] = { total: 0, closed: 0 };
      }

      departmentData[department].total += 1;

      if (status === "Closed") {
        departmentData[department].closed += 1;
      }
    });

    return Object.entries(departmentData).map(([department, counts]) => ({
      department,
      total: counts.total,
      closed: counts.closed,
    }));
  };

  const data = aggregateByDepartment();

  return (
    <div className='pt-36 px-4 sm:px-8 lg:px-24'>
      <div className='flex flex-wrap justify-start gap-4 sm:gap-8 lg:gap-8 '>
        <div className="w-full sm:w-64">
          <Boxes text={"Total Projects"} count={totalProjects.toString()} />
        </div>
        <div className="w-full sm:w-64">
          <Boxes text={"Closed"} count={closedProjects.toString()} />
        </div>
        <div className="w-full sm:w-64">
          <Boxes text={"Running"} count={runningProjects.toString()} />
        </div>
        <div className="w-full sm:w-64">
          <Boxes text={"Closure Delay"} count={closureDelayProjects.toString()} />
        </div>
        <div className="w-full sm:w-64">
          <Boxes text={"Cancelled"} count={cancelledProjects.toString()} />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Department-wise Project Status</h2>
        <div className="max-w-4xl pt-4">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#025aab" name="Total Projects" barSize={20} />
              <Bar dataKey="closed" fill="#5aa647" name="Closed Projects" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ChartPage;
