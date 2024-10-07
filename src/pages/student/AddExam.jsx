import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL, { baseURL } from "../../../base/BaseUrl";
import Layout from "../../../layout/Layout";
import Fields from "../../../common/TextField/TextField";
import { Input } from "@material-tailwind/react";



const subject = [
    {
      value: "M1",
      label: "M1",
    },
    {
      value: "M2",
      label: "M2",
    },
    {
        value: "M3",
        label: "M3",
      },
      {
        value: "M4",
        label: "M4",
      },
      {
        value: "CAMS",
        label: "CAMS",
      },
      {
        value: "CIAC",
        label: "CIAC",
      },
      {
        value: "CIAP1",
        label: "CIAP1",
      },
      {
        value: "CIAP2",
        label: "CIAP2",
      },
      {
        value: "CIAP3",
        label: "CIAP3",
      },
      {
        value: "Other",
        label: "Other",
      },
];

const AddExam = () => {
  const navigate = useNavigate();

  var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [student, setStudentExam] = useState({
        user_uid: id,
        exam_subject: "",
        exam_date: "",
    })



  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);



  const onInputChange = (e) => {
    setStudentExam({
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
      notification_heading: enquiry.notification_heading,
      notification_description: enquiry.notification_description,
      notification_course: enquiry.notification_course,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-create-exam`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.code == "200") {
        // NotificationManager.success("Exam Added Sucessfully");
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
    //   NotificationManager.error("Duplicate Entry");
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
          Add Exam
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                   {/* UID */}
            <div>
                <label className="block text-gray-700 ">UID</label>
                <span className="mt-1 text-black">
                  {/* {student.user_uid} */}{student.id}
                </span>
              </div>
              {/* Subject */}
              <div>
                <Fields
                  required={true}
                  title="Subject"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="exam_subject"
                  value={student.exam_subject}
                  onChange={(e) => onInputChange(e)}
                  options={subject}
                />
              </div>

              {/* Heading */}
              <div >
                <Input
                  required
                  label="Exam Date"
                  type="date"
                  name="exam_date"
                  value={student.exam_date}
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
               {isButtonDisabled ? 'Submiting...' : 'Submit'}
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

export default AddExam;
