import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL, { baseURL } from "../../../base/BaseUrl";
import Layout from "../../../layout/Layout";
import Fields from "../../../common/TextField/TextField";
import { Input } from "@material-tailwind/react";

const mode = [
  {
    value: "Shree Maruti",
    label: "Shree Maruti",
  },
  {
    value: "Trackon",
    label: "Trackon",
  },
  {
    value: "DHL",
    label: "DHL",
  },
  {
    value: "FEDex",
    label: "FEDex",
  },
  {
    value: "DTDC",
    label: "DTDC",
  },
];

const StudentAddDelivery = () => {
  const navigate = useNavigate();

  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [student, setStudentDelivery] = useState({
    user_uid: id,
    delivery_no_of_books: "",
    delivery_slip_shared: "No",
    delivery_mode: "",
    delivery_tracking_number: "",
    delivery_shipping_date: "",
    delivery_status: "Pending",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "delivery_no_of_books") {
      if (validateOnlyDigits(e.target.value)) {
        setStudentDelivery({
          ...student,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setStudentDelivery({
        ...student,
        [e.target.name]: e.target.value,
      });
    }
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
        user_uid: student.user_uid,
        delivery_no_of_books: student.delivery_no_of_books,
        delivery_slip_shared: student.delivery_slip_shared,
        delivery_mode: student.delivery_mode,
        delivery_tracking_number: student.delivery_tracking_number,
        delivery_shipping_date: student.delivery_shipping_date,
        delivery_status: student.delivery_status,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-create-delivery"`,
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

  const handleBackButton = () => {
    navigate("-1");
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
            Edit Student
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-4">
              {/* UID */}
              <div>
                <label className="block text-gray-700 ">UID</label>
                <span className="mt-1 text-black">
                  {/* {student.user_uid} */}
                  {student.id} 123
                </span>
              </div>
              <div>
                <Fields
                  required={true}
                  title="Mode"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="delivery_mode"
                  value={student.delivery_mode}
                  onChange={(e) => onInputChange(e)}
                  options={mode}
                />
              </div>

              <div>
                <Input
                  fullWidth
                  label="No of Books"
                  required
                  autoComplete="Name"
                  name="delivery_no_of_books"
                  value={student.delivery_no_of_books}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div>
                <Input
                  fullWidth
                  type="date"
                  label="Shipping Date"
                  required
                  autoComplete="Name"
                  name="delivery_shipping_date"
                    value={student.delivery_shipping_date}
                    onChange={(e) => onInputChange(e)}
                />
              </div>
              <div>
                <Input
                  fullWidth
                  label="Tracking Number"
                  required
                  autoComplete="Name"
                  name="delivery_tracking_number"
                    value={student.delivery_tracking_number}
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

              <button
                onClick={handleBackButton}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default StudentAddDelivery;
