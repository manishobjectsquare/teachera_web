import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Instructors = () => {
  // State for instructors data
  const [instructors, setInstructors] = useState([]);
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filtersActive, setFiltersActive] = useState(false);

  const { t } = useTranslation();

  // Mock categories - replace with API call when available
  const mockCategories = [
    { id: 1, key: "web", slug: "web-development" },
    { id: 2, key: "mobile", slug: "mobile-development" },
    { id: 3, key: "data", slug: "data-science" },
    { id: 4, key: "design", slug: "design" },
    { id: 5, key: "business", slug: "business" },
  ];

  // Fetch instructors and categories
  const fetchInstructors = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.basementex.com/role", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error(
          "Failed to parse instructor response as JSON:",
          parseError
        );
        throw new Error("Invalid JSON response from server");
      }

      // Set instructors and filtered instructors
      const instructorsData = data.data || [];
      setInstructors(instructorsData);
      setFilteredInstructors(instructorsData);

      // Set categories from mock data for now
      setCategories(mockCategories);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch instructors on component mount
  useEffect(() => {
    fetchInstructors();
  }, []);

  // Apply filters when category or search query changes
  useEffect(() => {
    filterInstructors();

    // Check if any filters are active
    setFiltersActive(selectedCategory !== "" || searchQuery !== "");
  }, [selectedCategory, searchQuery, instructors]);

  // Function to filter instructors based on category and search query
  const filterInstructors = () => {
    if (!instructors.length) return;

    let filtered = [...instructors];

    // Apply category filter if selected
    if (selectedCategory) {
      filtered = filtered.filter(
        (instructor) =>
          // This is a placeholder filter - replace with actual category filtering logic
          instructor.id % Number.parseInt(selectedCategory) === 0
      );
    }

    // Apply search filter if query exists
    if (searchQuery) {
      filtered = filtered.filter(
        (instructor) =>
          (instructor.name &&
            instructor.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (instructor.role &&
            instructor.role.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredInstructors(filtered);
    setCurrentPage(1);
  };

  // Handle category selection change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  // Handle search button click or Enter key press
  const handleSearch = () => {
    setSearchQuery(searchInputValue);
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setSearchInputValue("");
    setFilteredInstructors(instructors);
    setCurrentPage(1);
  };

  return (
    <section className="instructor-list-sec mt-85 tp-space">
      <div className="container">
        <h2 className="title">{t("Instructors List")}</h2>
        <div className="product-shop-fltr">
          <div className="shop-fltr-lft">
            <div className="custom-frm-bx">
              <label htmlFor="category-select">{t("Categories")}</label>
              <select
                id="category-select"
                className="form-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">{t("Select Categories")}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {t(`categories.${category.key}`, category.key)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-flex align-items-end">
            <div className="shop-fltr-bx me-2">
              <input
                type="text"
                className="form-control"
                placeholder={t("Search Instructor")}
                value={searchInputValue}
                onChange={handleSearchInputChange}
                onKeyPress={handleKeyPress}
              />
              <button type="button" onClick={handleSearch}>
                <i className="fal fa-search"></i>
              </button>
            </div>
            {filtersActive && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={resetFilters}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "15px",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                <i className="fal fa-times me-1"></i> {t("Reset Filters")}
              </button>
            )}
          </div>
        </div>

        {filtersActive && (
          <div className="filter-summary mt-3">
            <div className="d-flex flex-wrap align-items-center">
              <span className="me-2 text-muted">{t("Active Filters")}:</span>
              {selectedCategory && (
                <span className="badge bg-light text-dark me-2 mb-1">
                  {t("Category")}:{" "}
                  {categories.find((c) => c.id.toString() === selectedCategory)
                    ?.key || selectedCategory}
                  <button
                    className="btn-close btn-close-sm ms-1"
                    style={{ fontSize: "0.5rem" }}
                    onClick={() => setSelectedCategory("")}
                  ></button>
                </span>
              )}
              {searchQuery && (
                <span className="badge bg-light text-dark me-2 mb-1">
                  {t("Search")}: {searchQuery}
                  <button
                    className="btn-close btn-close-sm ms-1"
                    style={{ fontSize: "0.5rem" }}
                    onClick={() => {
                      setSearchQuery("");
                      setSearchInputValue("");
                    }}
                  ></button>
                </span>
              )}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {filteredInstructors.map((instructor) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6"
                key={instructor?._id || instructor?.id}
              >
                <Link
                  to={`/instructor-details/${instructor._id || instructor.id}`}
                >
                  <div className="instructor-card">
                    <img
                      src={
                        instructor?.image
                          ? `https://api.basementex.com/${instructor.image}`
                          : "/square_logo.png"
                      }
                      alt={instructor?.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/square_logo.png";
                      }}
                    />
                    <p>
                      <span>{instructor?.name}</span>
                      <span>{instructor?.role}</span>
                    </p>
                  </div>
                </Link>
              </div>
            ))}

            {filteredInstructors.length === 0 && !loading && (
              <div className="col-12 text-center py-5">
                <h4>{t("No instructors found")}</h4>
                {/* <p>{t("Try adjusting your search or filter criteria")}</p> */}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Instructors;
