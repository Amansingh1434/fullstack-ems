import { Building2Icon, CalculatorIcon, FileTextIcon, UserIcon } from "lucide-react";

const AdminDashboard = ({ data }) => {
  const stats = [
    {
      icon: UserIcon,
      value: data. totalEmployees,
      label: "Total Employees",
      description: "Active workforce",
    },
    {
      icon: Building2Icon,
      value: data.totalDepartments,
      label: "Departments",
      description: "Organization units",
    },
    {
      icon: CalculatorIcon,
      value: data.todayAttendance,
      label: "Today's Attendance",
      description: "Checked in today",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      label: "Pending Leaves",
      description: "Awaiting approval",
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header mb-6">
        <h1 className="page-title text-2xl font-bold">Dashboard</h1>
        <p className="page-subtitle text-gray-500">
          Welcome back, Admin - here's your overview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, index) => (
          <div
            key={index}
            className="card p-5 flex items-center justify-between shadow rounded-lg"
          >
            <div>
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-xs text-gray-400">{s.description}</p>
            </div>
            <s.icon className="w-10 h-10 text-indigo-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;