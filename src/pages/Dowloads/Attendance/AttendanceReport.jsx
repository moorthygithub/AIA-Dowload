import Layout from "../../../layout/Layout";
import BASE_URL from "../../../base/BaseUrl";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../common/PageTitle";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowCircleLeft, FaArrowDown } from "react-icons/fa";
import axios from "axios";
import { Card, Typography, Spinner } from "@material-tailwind/react";
import Moment from "moment";
import DownloadCommon from "../../../pages/download/delivery/DeliveryDownload";

function DeliveryEnquiryReport() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/delivery");
  };

  const TABLE_HEAD = [
    "Class Date",
    "UID",
    "Full Name",
    "Subject",
    "Class Time",
  ];

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [teamsummary, setSummary] = useState([]);
  const [loader, setLoader] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      class_date_from: localStorage.getItem("class_date_from"),
      class_date_to: localStorage.getItem("class_date_to"),
      student_uid: localStorage.getItem("student_uid"),
      student_course: localStorage.getItem("student_course"),
    };

    setIsButtonDisabled(true);

    axios({
      url: BASE_URL + "/panel-download-attendance",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "attendance_list.csv");
        document.body.appendChild(link);
        link.click();
        toast.success("Report is Downloaded Successfully");
        setIsButtonDisabled(false);
      })
      .catch((err) => {
        toast.error("Report is Not Downloaded");
        setIsButtonDisabled(false);
      });
  };

  // Fetch table data on component load
  useEffect(() => {
    let data = {
      class_date_from: localStorage.getItem("class_date_from"),
      class_date_to: localStorage.getItem("class_date_to"),
      student_uid: localStorage.getItem("student_uid"),
      student_course: localStorage.getItem("student_course"),
    };
    //GET REPORT
    axios({
      url: BASE_URL + "/fetch-attendance-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setSummary(res.data.userclass || []);
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch data");
        setLoader(false);
      });
  }, []);

  return (
    <Layout>
      <DownloadCommon />
      <div className="mt-4">
        <PageTitle
          title={"Attendance List"}
          icon={FaArrowCircleLeft}
          backLink="/attendance"
        />
      </div>
      {loader ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner color="blue" size="xl" />
        </div>
      ) : (
        <Card>
          <div
            className="mt-4 flex justify-end cursor-pointer p-2  space-x-2  "
            onClick={onSubmit}
          >
            <div className="flex justify-center items-center">
              <FaArrowDown />
            </div>
            <div className=" font-bold text-gray-700 text-sm">Download</div>
          </div>
          <hr></hr>
          <div className="flex justify-center items-center  font-bold text-gray-700 text-sm mt-4">
            <h2> Attend List</h2>
          </div>
          <Card className="h-full w-full overflow-scroll  p-4">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-gray-300 pb-4 pt-10"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teamsummary.length > 0 ? (
                  teamsummary.map((dataSumm, key) => {
                    const isLast = key === teamsummary.length - 1;
                    const classes = isLast
                      ? "py-4"
                      : "py-4 border-b border-gray-300";

                    return (
                      <tr key={key} className="hover:bg-gray-50">
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {Moment(dataSumm.class_date).format("DD-MM-YYYY")}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {dataSumm.user_uid}{" "}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {dataSumm.name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {dataSumm.class_subject}{" "}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {dataSumm.class_time}{" "}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={TABLE_HEAD.length}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600 text-center"
                      >
                        No data available
                      </Typography>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </Card>
      )}
    </Layout>
  );
}

export default DeliveryEnquiryReport;
