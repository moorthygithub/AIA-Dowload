import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL, { baseURL } from "../../../base/BaseUrl";
import Layout from "../../../layout/Layout";
import Fields from "../../../common/TextField/TextField";
import { Input } from "@material-tailwind/react";

const mobile = [
    {
      value: "IOS",
      label: "IOS",
    },
    {
      value: "Android",
      label: "Android",
    },
];

const pc = [
    {
      value: "Windows",
      label: "Windows",
    },
    {
      value: "Mac",
      label: "Mac",
    },
];

const status = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
];

const EditStudent = () => {
  const navigate = useNavigate();

  var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [student, setStudent] = useState({
        address: "",
        mobile_device: "",
        admission_form_no: "",
        qualification: "",
        remarks: "",
        status: "",
        pc_device: "",
    });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-student-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStudent(response.data.studentData);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchCourseData();
  }, []);

  const onInputChange = (e) => {
    setStudent({
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
        address: student.address,
        admission_form_no: student.admission_form_no,
        qualification: student.qualification,
        remarks: student.remarks,
        mobile_device: student.mobile_device,
        pc_device: student.pc_device,
        status: student.status,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-student/${id}"`,
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


  const handleBackButton =()=>{
    navigate('-1')
 }

  return (
    <Layout>
      <div>
        {/* Title */}
        <div className="flex mb-4 mt-6">
          <Link to="/">
            <MdKeyboardBackspace className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl" />
          </Link>
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
          Edit Student
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
              {/* UID */}
              <div>
                <label className="block text-gray-700 ">UID</label>
                <span className="mt-1 text-black">
                  {/* {student.user_uid} */}
                  {student.id} 123
                </span>
              </div>
              <div>
                <label className="block text-gray-700 ">Full Name</label>
                <span className="mt-1 text-black">
                  {/* {student.user_uid} */}
                  {student.id}
                </span>
              </div>
              <div>
                <label className="block text-gray-700 ">Mobile</label>
                <span className="mt-1 text-black">
                  {/* {student.user_uid} */}
                  {student.id}
                </span>
              </div>
              <div>
                <label className="block text-gray-700 ">Email</label>
                <span className="mt-1 text-black">
                  {/* {student.user_uid} */}
                  {student.id}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-4">
             
              <div>
                <Fields
                  required={true}
                  title="Address"
                  type="textField"
                  autoComplete="Name"
                    name="address"
                    value={student.address}
                    onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
             
              <div>
                <Fields
                  required={true}
                  title="Mobile Device for Study"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="mobile_device"
                    value={student.mobile_device}
                    onChange={(e) => onInputChange(e)}
                  options={mobile}
                />
              </div>

              
              <div>
              <Fields
                  required={true}
                  title="PC Device for Study"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="pc_device"
                  value={student.pc_device}
                  onChange={(e) => onInputChange(e)}
                  options={pc}
                />
              </div>
               
              <div>
                <Input
                  required
                  label="Admission Form Number"
                  type="text"
                  name="admission_form_no"
                  value={student.admission_form_no}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
                {/* Qualification */}
              <div>
                <Input
                  required
                  label="Qualification"
                  type="text"
                  name="qualification"
                    value={student.qualification}
                    onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
            

           
                {/* Remark */}
              <div className="col-span-3">
                <Input
                  label="Remarks"
                  type="text"
                  name="remarks"
                  value={student.remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
                {/* Exam Date */}
              <div>
              <Fields
                  required={true}
                  title="Status"
                  type="whatsappDropdown"
                  autoComplete="Name"
                   name="status"
                  value={student.status}
                  onChange={(e) => onInputChange(e)}
                  options={status}
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Updating..." : "Update"}
              </button>
            
                <button onClick={handleBackButton} className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Back
                </button>
             
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditStudent;
