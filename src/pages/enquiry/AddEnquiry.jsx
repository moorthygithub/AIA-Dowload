import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { Input } from "@material-tailwind/react";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";
import Fields from "../../components/common/TextField/TextField";

const title = [
  {
    value: "Mr",
    label: "Mr",
  },
  {
    value: "Ms",
    label: "Ms",
  },
  {
    value: "Mrs",
    label: "Mrs",
  },
  {
    value: "MD",
    label: "MD",
  },
];

const category = [
  {
    value: "Indian",
    label: "Indian",
  },
  {
    value: "International",
    label: "International",
  },
];

const source = [
  {
    value: "Referral",
    label: "Referral",
  },
  {
    value: "Repeat Student",
    label: "Repeat Student",
  },
  {
    value: "WA",
    label: "WA",
  },
  {
    value: "Email",
    label: "Email",
  },
  {
    value: "Adv",
    label: "Adv",
  },
  {
    value: "Social Media",
    label: "Social Media",
  },
  {
    value: "Other",
    label: "Others(mention)",
  },
];

const AddEnquiry = () => {
  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [enquiry, setEnquiry] = useState({
    enquiry_year: "2024-25",
    enquiry_title: "",
    enquiry_full_name: "",
    enquiry_mobile: "",
    enquiry_email: "",
    enquiry_country: "",
    enquiry_city: "",
    enquiry_category: "",
    enquiry_course: "",
    enquiry_course_other: "",
    enquiry_source: "",
    enquiry_source_other: "",
  });
  const [course, setCourse] = useState([]);
  const [country, setCountry] = useState([]);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-country`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCountry(response.data.country);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchCountryData();
  }, []);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/panel-fetch-course`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchCourseData();
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
    if (e.target.name == "enquiry_mobile") {
      if (validateOnlyDigits(e.target.value)) {
        setEnquiry({
          ...enquiry,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setEnquiry({
        ...enquiry,
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
      enquiry_year: enquiry.enquiry_year,
      enquiry_title: enquiry.enquiry_title,
      enquiry_full_name: enquiry.enquiry_full_name,
      enquiry_mobile: enquiry.enquiry_mobile,
      enquiry_email: enquiry.enquiry_email,
      enquiry_country: enquiry.enquiry_country,
      enquiry_city: enquiry.enquiry_city,
      enquiry_category: enquiry.enquiry_category,
      enquiry_course: enquiry.enquiry_course,
      enquiry_source: enquiry.enquiry_source,
      enquiry_course_other: enquiry.enquiry_course_other,
      enquiry_source_other: enquiry.enquiry_source_other,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-create-enquiry`,
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
          <Link to="/openList-enquiry">
            <MdKeyboardBackspace className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl" />
          </Link>
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            Add Enquiry
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="flex gap-2 justify-start ju mb-5">
              {/* Title */}
              <div className="w-24">
                <Fields
                  required={true}
                  title="Title"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="enquiry_title"
                  value={enquiry.enquiry_title}
                  onChange={(e) => onInputChange(e)}
                  options={title}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full justify-between ">
                {/*  Full Name */}
                <div>
                  <Fields
                    required={true}
                    title="Full Name"
                    type="textField"
                    autoComplete="Name"
                    name="enquiry_full_name"
                    value={enquiry.enquiry_full_name}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                {/* Mobile No */}
                <div>
                  <Input
                    label="Mobile No"
                    required
                    maxLength={10}
                    type="tel"
                    name="enquiry_mobile"
                    value={enquiry.enquiry_mobile}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                {/* Email */}
                <div>
                     <Fields
                  required={true}
                  types="email"
                  title="Email"
                  type="textField"
                  autoComplete="Name"
                  name="enquiry_email"
                  value={enquiry.enquiry_email}
                  onChange={(e) => onInputChange(e)}
                />
                </div>
              </div>
            </div>
            {/* Second div   */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
              {/* Country */}
              <div>
                <Fields
                  required={true}
                  title="Country"
                  type="priceforDropdown"
                  autoComplete="Name"
                  name="enquiry_country"
                  value={enquiry.enquiry_country}
                  onChange={(e) => onInputChange(e)}
                  options={country}
                />
              </div>

              {/* City  */}
              <div>
                 <Fields
                  required={true}
                  title="City"
                  type="textField"
                  autoComplete="Name"
                  name="enquiry_city"
                  value={enquiry.enquiry_city}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              {/* Category */}
              <div>
                <Fields
                  required={true}
                  title="Category"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="enquiry_category"
                  value={enquiry.enquiry_category}
                  onChange={(e) => onInputChange(e)}
                  options={category}
                />
              </div>
            </div>
            {/* Third div   */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
              {/* Course */}
              <div>
                <Fields
                  required={true}
                  title="Course"
                  type="courseDropdown"
                  autoComplete="Name"
                  name="enquiry_course"
                  value={enquiry.enquiry_course}
                  onChange={(e) => onInputChange(e)}
                  options={course}
                />
              </div>

              {/* Source  */}
              <div>
                <Fields
                  title="Source"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="enquiry_source"
                  value={enquiry.enquiry_source}
                  onChange={(e) => onInputChange(e)}
                  options={source}
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                disabled={isButtonDisabled}
              >
                Submit
              </button>
              <Link to="/openList-enquiry">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddEnquiry;
