import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import SelectPopup from "../../../common/popup/SelectPopup";
import { ImCancelCircle } from "react-icons/im";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";
import Fields from "../../components/common/TextField/TextField";


const AddRequest = () => {
  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [student, setRequest] = useState({
    user_uid: "",
    course_request: "",
    course_request_remarks: "",
  });

  const [requestType, setRequestType] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  const [userUID, setUserUID] = useState("");

  const getUserid = (userUID) => {
    setUserUID(userUID);
    setShowmodal(false);
  };

  const [showmodal, setShowmodal] = useState(false);
  const closegroupModal = () => {
    setShowmodal(false);
  };
  const openmodal = () => {
    setShowmodal(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-request-type`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRequestType(response.data.requestType);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchUserData();
  }, []);

  const onInputChange = (e) => {
    setClass({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setIsButtonDisabled(true);
    const formData = {
      class_date: student.class_date,
      class_subject: student.class_subject,
      class_time: student.class_time,
      class_to_time: student.class_to_time,
      class_url: student.class_url,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-create-class`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.code == "200") {
        alert("Data Updated Successfully");
      } else {
        if (response.data.code == "401") {
          alert("Couty Duplicate Entry");
        } else if (response.data.code == "402") {
          alert("Country Duplicate Entry");
        } else {
          alert("Country Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating vendor:", error);
      alert("Error updating vendor");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <Layout>
      <div>
        {/* Title */}
        <div className="flex mb-4 mt-6">
          <Link to="/">
            <MdKeyboardBackspace className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl" />
          </Link>
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            Add Request
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {/* Request Type */}
              <div>
                <Fields
                  required={true}
                  title="Request Type"
                  type="requestDropdown"
                  autoComplete="Name"
                  name="class_subject"
                  value={student.class_subject}
                  onChange={(e) => onInputChange(e)}
                  options={requestType}
                />
              </div>
              {/* Student UID */}
              <div>
                <Fields
                  required={true}
                  title="Student UID"
                  type="textField"
                  autoComplete="Name"
                  name="user_uid"
                  value={userUID}
                  onChange={(e) => onInputChange(e)}
                  onClick={() => openmodal()}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
              {/* Remarks */}
              <div>
                
                 <Fields
                  required={true}
                  title="Remarks"
                  type="textField"
                  autoComplete="Name"
                  name="course_request_remarks"
                  value={student.course_request_remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Submiting..." : "Submit"}
              </button>
              <Link to="/">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Back
                </button>
              </Link>
            </div>
          </form>
          <Dialog open={showmodal} onClose={() => closegroupModal()}>
            <DialogTitle className="flex justify-between">
              <h1>Student UID List</h1>
              <ImCancelCircle
                className="cursor-pointer"
                onClick={() => closegroupModal()}
              />
            </DialogTitle>
            <DialogContent>
              <SelectPopup getUserid={getUserid} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};

export default AddRequest;
