import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { dummyProfileData } from "../assets/assets";
import {
  CalendarIcon,
  ChevronRightIcon,
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
  Loader2,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, loading,logout } = useAuth();

  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  //const {user,loading ,logout} = useAuth()

  useEffect(() => {
    if (user) {
      setUserName(
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
          user.email
      );
    } else {
      setUserName(
        api.get("/profile").then(({data})=>{
            if(data.firstName) setUserName(`${data.firstName} ${data.lastName || ""}`.trim())
        })
      );
    }
  }, [user]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const role = user?.role 

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutGridIcon,
    },

    ...(role === "ADMIN"
      ? [
          {
            name: "Employees",
            href: "/employees",
            icon: UserIcon,
          },
        ]
      : [
          {
            name: "Attendance",
            href: "/attendance",
            icon: CalendarIcon,
          },
        ]),

    {
      name: "Leave",
      href: "/leave",
      icon: FileTextIcon,
    },
    {
      name: "Payslips",
      href: "/payslips",
      icon: DollarSignIcon,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: SettingsIcon,
    },
  ];

  const handleLogout = async () => {
    logout();
    window.location.href="/login"
  };

  const sidebarContent = (
    <>
      {/* Brand Header */}
      <div className="px-5 pt-6 pb-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserIcon className="w-6 h-6 text-white" />

            <div>
              <p className="font-semibold text-[13px] text-white tracking-wide">
                Employee MS
              </p>

              <p className="text-[11px] text-slate-400">
                Management System
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            className="lg:hidden text-slate-400 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            <XIcon size={20} />
          </button>
        </div>
      </div>

      {/* User Card */}
      {userName && (
        <div className="mx-3 mt-4 mb-2 p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-[13px] font-medium text-white truncate">
                {userName}
              </p>

              <p className="text-[11px] text-slate-400 truncate">
                {role === "ADMIN" ? "Administrator" : "Employee"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Title */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
          Navigation
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 space-y-1 overflow-y-auto">
      {loading ? (
        <div className=" px-3 py-3 flex items-center gap-2 text-slate-500"><Loader2 className=" animate-spin w-4 h-4"/>
        <span className=" text-sm ">Loading...</span>
        </div>):(
       navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 relative ${
                isActive
                  ? "bg-indigo-600/20 text-indigo-300"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-indigo-500" />
              )}

              <Icon
                className={`w-5 h-5 ${
                  isActive
                    ? "text-indigo-300"
                    : "text-slate-400 group-hover:text-white"
                }`}
              />

              <span className="flex-1">{item.name}</span>

              {isActive && (
                <ChevronRightIcon className="w-4 h-4 text-indigo-400" />
              )}
            </Link>
          );
        })
      )}
        
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-slate-300 hover:bg-rose-500/10 hover:text-rose-400 transition"
        >
          <LogOutIcon className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg"
      >
        <MenuIcon size={20} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-white/10">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 z-50 flex flex-col transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;