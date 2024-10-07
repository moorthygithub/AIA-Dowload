import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/profile/ChangePassword";
import CountryList from "./pages/country/CountryList";
import CoursesList from "./pages/courses/CoursesList";
import OpenListEnquiry from "./pages/enquiry/openList/OpenListEnquiry";
import StudentList from "./pages/student/StudentList";
import PendingListDelivery from "./pages/delivery/pendingList/PendingListDelivery";
import ClassList from "./pages/class/ClassList";
import PendingListRequest from "./pages/request/pendingList/PendingListRequest";
import PendingListTask from "./pages/taskManager/pendingList/PendingListTask";
import NotificationList from "./pages/notification/NotificationList";
import EnquiryDownload from "./pages/download/enquiry/EnquiryDownload";
import OverdueListEnquiry from "./pages/enquiry/overdueList/OverdueListEnquiry";
import CloseListEnquiry from "./pages/enquiry/closeList/CloseListEnquiry";
import DeliveredListDelivery from "./pages/delivery/deliveredList/DeliveredListDelivery";
import ApprovedListRequest from "./pages/request/approvedList/ApprovedListRequest";
import CompletedListRequest from "./pages/request/completedList/CompletedListRequest";
import InspectionListTask from "./pages/taskManager/inspectionList/InspectionListTask";
import CompletedListTask from "./pages/taskManager/completedList/CompletedListTask";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCountry from "./pages/country/AddCountry";
import EditCountry from "./pages/country/EditCountry";
import AddCourse from "./pages/courses/AddCourse";
import EditCourse from "./pages/courses/EditCourse";
import AddEnquiry from "./pages/enquiry/AddEnquiry";
import AddDelivery from "./pages/delivery/AddDelivery";
import EditDelivery from "./pages/delivery/EditDelivery";
import AddClass from "./pages/class/AddClass";

//new
import Enquiry from "./pages/Dowloads/Enquiry/Enquiry";
import Students from "../src/pages/Dowloads/Students/Students"
import Delivery from "./pages/Dowloads/Delivery/Delivery";
import Exam from "./pages/Dowloads/Exam/Exam";
import Attendance from "./pages/Dowloads/Attendance/Attendance";
import EnquiryReport from "./pages/Dowloads/Enquiry/EnquiryReport";
import StudentReport from "./pages/Dowloads/Students/StudentsReport";
import DeliveryReport from "./pages/Dowloads/Delivery/DeliveryReport";
import ExamReport from "./pages/Dowloads/Exam/ExamReport";
import AttendanceReport from "./pages/Dowloads/Attendance/AttendanceReport";
import NotAttendanceReport from "./pages/Dowloads/Attendance/AttendanceNotReport";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/maintenance" element={<Maintenance />} />
        {/* country  */}
        <Route path="/country" element={<CountryList />} />
        <Route path="/add-country" element={<AddCountry />} />
        <Route path="/edit-country/:id" element={<EditCountry />} />
        courses
        <Route path="/courses" element={<CoursesList />} />
        <Route path="/add-courses" element={<AddCourse />} />
        <Route path="/add-courses/:id" element={<EditCourse />} />
        {/* enquiry  */}
        <Route path="/openList-enquiry" element={<OpenListEnquiry />} />
        <Route path="/add-enquiry" element={<AddEnquiry />} />
        <Route path="/overdueList-enquiry" element={<OverdueListEnquiry />} />
        <Route path="/closeList-enquiry" element={<CloseListEnquiry />} />
        {/* student  */}
        <Route path="/student" element={<StudentList />} />
        {/* delivery  */}
        <Route path="/pending-delivery" element={<PendingListDelivery />} />
        <Route path="/add-delivery" element={<AddDelivery />} />
        <Route path="/edit-delivery/:id" element={<EditDelivery />} />
        <Route path="/deliverd-delivery" element={<DeliveredListDelivery />} />
        {/* class  */}
        <Route path="/class" element={<ClassList />} />
        <Route path="/add-class" element={<AddClass />} />
        {/* request  */}
        <Route path="/request-pending" element={<PendingListRequest />} />
        <Route path="/request-approved" element={<ApprovedListRequest />} />
        <Route path="/request-completed" element={<CompletedListRequest />} />
        {/* task Manager  */}
        <Route path="/task-pending" element={<PendingListTask />} />
        <Route path="/task-inspection" element={<InspectionListTask />} />
        <Route path="/task-completed" element={<CompletedListTask />} />
        <Route path="/notification" element={<NotificationList />} />
        <Route path="/download-enquiry" element={<EnquiryDownload />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/change-password"
          element={<ProtectedRoute element={<ChangePassword />} />}
        />
        <Route
          path="/enquiry"
          element={<ProtectedRoute element={<Enquiry />} />}
        />
        <Route
          path="/students"
          element={<ProtectedRoute element={<Students />} />}
        />
        <Route
          path="/delivery"
          element={<ProtectedRoute element={<Delivery />} />}
        />
        <Route path="/exam" element={<ProtectedRoute element={<Exam />} />} />
        <Route
          path="/attendance"
          element={<ProtectedRoute element={<Attendance />} />}
        />
        <Route
          path="/enquiryreport"
          element={<ProtectedRoute element={<EnquiryReport />} />}
        />
        <Route
          path="/studentreport"
          element={<ProtectedRoute element={<StudentReport />} />}
        />
        <Route
          path="/deliveryreport"
          element={<ProtectedRoute element={<DeliveryReport />} />}
        />
        <Route
          path="/examreport"
          element={<ProtectedRoute element={<ExamReport />} />}
        />
        <Route
          path="/attendancereport"
          element={<ProtectedRoute element={<AttendanceReport />} />}
        />
        <Route
          path="/notattend"
          element={<ProtectedRoute element={<NotAttendanceReport />} />}
        />
      </Routes>
    </>
  );
};

export default App;
