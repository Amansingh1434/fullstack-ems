import React from "react";
import LoginLeftSide from "../components/LoginLeftSide";
import {
  ArrowRightIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const LoginLanding = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const portalOptions = [
    {
      to: "/login/admin",
      title: "Admin Portal",
      description:
        "Manage employees, departments, payroll, and system configurations.",
      icon: ShieldIcon,
    },
    {
      to: "/login/employee",
      title: "Employee Portal",
      description:
        "View your profile, track attendance, request leave, and access payslips.",
      icon: UserIcon,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <LoginLeftSide />

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md animate-fade-in">
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Welcome Back
            </h1>

            <p className="text-slate-500">
              Select your portal to securely access the Employee Management
              System.
            </p>
          </div>

          {/* Portal Cards */}
          <div className="space-y-4">
            {portalOptions.map((portal) => {
              const Icon = portal.icon;

              return (
                <Link
                  key={portal.to}
                  to={portal.to}
                  className="group flex items-center justify-between p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-indigo-100">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600">
                        {portal.title}
                      </h3>

                      {/* <p className="text-sm text-slate-500 mt-1">
                        {portal.description}
                      </p> */}
                    </div>
                  </div>

                  <ArrowRightIcon className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center md:text-left text-sm text-slate-400">
            <p>
              © {new Date().getFullYear()} Aman Singh. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLanding;