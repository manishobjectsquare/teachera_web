import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const Announcements = () => {
  // State for announcements data
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper function to truncate text
  const truncate = (text, length = 30) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  // Format date helper function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.basementex.com/instructor/announcement/get/${userId}`
      );
      const data = await response.json();
      setAnnouncements(data.data.announcement_data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Handle delete announcement
  const handleDeleteAnnouncement = (id) => {
    // In a real app, you would make an API call to delete the announcement
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(
        announcements.filter((announcement) => announcement.id !== id)
      );
    }
  };
  const { t } = useTranslation();
  return (
    <div className="col-lg-9">
      <div className="card mt-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="title mb-0">{t("Announcements")}</h4>
          <Link to="/instructor/announcements/create" className="thm-btn">
            {t("Create Announcement")}
          </Link>
        </div>
        <div className="card-body">
          {loading ? (
            <p className="text-center">{t("Loading announcements...")}</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>{t("No")}</th>
                    <th>{t("Course")}</th>
                    <th>{t("Title")}</th>
                    <th>{t("Announcement")}</th>
                    <th>{t("Date")}</th>
                    <th>{t("Action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {announcements?.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        {t("No Data")}
                      </td>
                    </tr>
                  ) : (
                    announcements.map((announcement, index) => (
                      <tr key={announcement._id}>
                        <td>{index + 1}</td>
                        <td>{truncate(announcement?.course_name)}</td>
                        <td>{truncate(announcement?.title)}</td>
                        <td>{truncate(announcement?.announcement)}</td>
                        <td>{formatDate(announcement?.createdAt)}</td>
                        <td>
                          <Link
                            to={`edit/${announcement?._id}`}
                            className="text-primary me-2"
                            aria-label={t("Edit announcement")}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                          <button
                            className="btn btn-link text-danger p-0 border-0 bg-transparent"
                            onClick={() =>
                              handleDeleteAnnouncement(announcement?._id)
                            }
                            aria-label={t("Delete announcement")}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
