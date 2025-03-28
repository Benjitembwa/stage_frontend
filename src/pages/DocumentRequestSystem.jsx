import { useState } from "react";
import {
  FiHome,
  FiFileText,
  FiClock,
  FiDownload,
  FiSettings,
  FiUser,
  FiMail,
  FiCheck,
  FiX,
  FiPlus,
  FiSearch,
  FiFilter,
  FiBell,
  FiMoon,
  FiSun,
  FiChevronDown,
  FiUpload,
  FiEye,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const DocumentRequestSystem = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("request");
  const [requests, setRequests] = useState([
    {
      id: "REQ-2023-001",
      name: "Jean Dupont",
      studentId: "S123456",
      email: "jean.dupont@univ.edu",
      documentType: "Transcript",
      reason: "Scholarship application",
      date: "2023-05-15",
      status: "Approved",
      downloadLink: "/documents/transcript_jean_dupont.pdf",
      adminComment: "",
    },
    {
      id: "REQ-2023-002",
      name: "Marie Martin",
      studentId: "S789012",
      email: "marie.martin@univ.edu",
      documentType: "Certificate",
      reason: "Job application",
      date: "2023-05-14",
      status: "Pending",
      downloadLink: "",
      adminComment: "",
    },
    {
      id: "REQ-2023-003",
      name: "Pierre Lambert",
      studentId: "S345678",
      email: "pierre.lambert@univ.edu",
      documentType: "Attestation",
      reason: "Visa application",
      date: "2023-05-13",
      status: "Rejected",
      downloadLink: "",
      adminComment: "Incomplete student record",
    },
  ]);
  const [newRequest, setNewRequest] = useState({
    name: "",
    studentId: "",
    email: "",
    documentType: "",
    reason: "",
    preferredDate: "",
    attachment: null,
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Document types
  const documentTypes = [
    "Transcript",
    "Certificate of Enrollment",
    "Degree Certificate",
    "Attestation",
    "Official Letter",
  ];

  // Show notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!newRequest.name) newErrors.name = "Name is required";
    if (!newRequest.studentId) newErrors.studentId = "Student ID is required";
    if (!newRequest.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newRequest.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!newRequest.documentType)
      newErrors.documentType = "Document type is required";
    if (!newRequest.reason) newErrors.reason = "Reason is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit request
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newId = `REQ-${new Date().getFullYear()}-${(requests.length + 1)
        .toString()
        .padStart(3, "0")}`;
      const request = {
        ...newRequest,
        id: newId,
        date: new Date().toISOString().split("T")[0],
        status: "Pending",
        downloadLink: "",
        adminComment: "",
      };
      setRequests([...requests, request]);
      setNewRequest({
        name: "",
        studentId: "",
        email: "",
        documentType: "",
        reason: "",
        preferredDate: "",
        attachment: null,
      });
      showNotification("Your request has been submitted successfully!");
    }
  };

  // Filter requests
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || request.status === filterStatus;
    const matchesType =
      filterType === "all" || request.documentType === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Sidebar Navigation */}
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg w-64 p-4 hidden md:flex flex-col`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            EduDoc Portal
          </h1>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("request")}
                className={`w-full flex items-center p-3 rounded-lg transition-colors 
                  ${
                    activeTab === "request"
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                <FiFileText className="text-lg" />
                <span className="ml-3">Request Document</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("track")}
                className={`w-full flex items-center p-3 rounded-lg transition-colors 
                  ${
                    activeTab === "track"
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                <FiClock className="text-lg" />
                <span className="ml-3">Track Requests</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("archive")}
                className={`w-full flex items-center p-3 rounded-lg transition-colors 
                  ${
                    activeTab === "archive"
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                <FiDownload className="text-lg" />
                <span className="ml-3">Document Archive</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-10">
        <div className="flex justify-around p-2">
          <button
            onClick={() => setActiveTab("request")}
            className={`p-3 rounded-full ${
              activeTab === "request"
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                : ""
            }`}
          >
            <FiFileText className="text-lg" />
          </button>
          <button
            onClick={() => setActiveTab("track")}
            className={`p-3 rounded-full ${
              activeTab === "track"
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                : ""
            }`}
          >
            <FiClock className="text-lg" />
          </button>
          <button
            onClick={() => setActiveTab("archive")}
            className={`p-3 rounded-full ${
              activeTab === "archive"
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                : ""
            }`}
          >
            <FiDownload className="text-lg" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-16 md:pb-0">
        {/* Header */}
        <header
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-sm p-4 flex items-center justify-between`}
        >
          <h2 className="text-xl font-semibold capitalize">
            {activeTab === "request" && "Request Academic Document"}
            {activeTab === "track" && "Track Your Requests"}
            {activeTab === "archive" && "Document Archive"}
          </h2>

          <div className="flex items-center space-x-4">
            <div
              className={`relative ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              } rounded-full p-2`}
            >
              <FiBell className="text-gray-500" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <FiUser />
              </div>
              <span className="hidden md:inline">Student</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          {/* Notification */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-6 p-4 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-blue-50"
                } border border-blue-200 dark:border-blue-900`}
              >
                <div className="flex items-center">
                  <FiCheck className="text-blue-600 dark:text-blue-400 mr-2" />
                  <span>{notification}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Document Request Form */}
          {activeTab === "request" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`p-6 rounded-xl shadow ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold mb-6">
                Request Academic Document
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newRequest.name}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded border ${
                        errors.name
                          ? "border-red-500"
                          : darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      University ID*
                    </label>
                    <input
                      type="text"
                      name="studentId"
                      value={newRequest.studentId}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded border ${
                        errors.studentId
                          ? "border-red-500"
                          : darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      }`}
                    />
                    {errors.studentId && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.studentId}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newRequest.email}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded border ${
                        errors.email
                          ? "border-red-500"
                          : darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Document Type*
                    </label>
                    <select
                      name="documentType"
                      value={newRequest.documentType}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded border ${
                        errors.documentType
                          ? "border-red-500"
                          : darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <option value="">Select document type...</option>
                      {documentTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.documentType && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.documentType}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Reason for Request*
                  </label>
                  <textarea
                    name="reason"
                    value={newRequest.reason}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full p-2 rounded border ${
                      errors.reason
                        ? "border-red-500"
                        : darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  ></textarea>
                  {errors.reason && (
                    <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setNewRequest({
                        name: "",
                        studentId: "",
                        email: "",
                        documentType: "",
                        reason: "",
                        preferredDate: "",
                        attachment: null,
                      });
                      setErrors({});
                    }}
                    className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Request Tracking */}
          {activeTab === "track" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div
                className={`p-4 rounded-xl shadow ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-3 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search requests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 rounded border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      }`}
                    />
                  </div>
                  <div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className={`w-full p-2 rounded border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <option value="all">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className={`w-full p-2 rounded border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <option value="all">All Document Types</option>
                      {documentTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div
                className={`p-6 rounded-xl shadow ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h3 className="text-xl font-semibold mb-4">
                  Your Document Requests
                </h3>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr
                        className={`${
                          darkMode ? "border-gray-700" : "border-gray-200"
                        } border-b`}
                      >
                        <th className="text-left py-3 px-4">Request ID</th>
                        <th className="text-left py-3 px-4">Document Type</th>
                        <th className="text-left py-3 px-4">Request Date</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((request) => (
                        <tr
                          key={request.id}
                          className={`${
                            darkMode ? "border-gray-700" : "border-gray-200"
                          } border-b`}
                        >
                          <td className="py-3 px-4">{request.id}</td>
                          <td className="py-3 px-4">{request.documentType}</td>
                          <td className="py-3 px-4">{request.date}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs 
                              ${
                                request.status === "Approved"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : request.status === "Rejected"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              }`}
                            >
                              {request.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              {request.status === "Approved" && (
                                <a
                                  href={request.downloadLink}
                                  className="p-1 text-green-600 hover:text-green-800 dark:hover:text-green-400"
                                  download
                                >
                                  <FiDownload />
                                </a>
                              )}
                              {request.status === "Rejected" && (
                                <button
                                  className="p-1 text-red-600 hover:text-red-800 dark:hover:text-red-400"
                                  onClick={() =>
                                    showNotification(
                                      `Admin comment: ${request.adminComment}`
                                    )
                                  }
                                >
                                  <FiX />
                                </button>
                              )}
                              <button className="p-1 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                                <FiEye />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredRequests.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No requests found matching your criteria
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Document Archive */}
          {activeTab === "archive" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`p-6 rounded-xl shadow ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold mb-6">Document Archive</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-blue-50"
                  } border border-blue-100 dark:border-blue-900`}
                >
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Total Archived Documents
                  </p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-green-50"
                  } border border-green-100 dark:border-green-900`}
                >
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Transcripts
                  </p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-purple-50"
                  } border border-purple-100 dark:border-purple-900`}
                >
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    Certificates
                  </p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr
                      className={`${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      } border-b`}
                    >
                      <th className="text-left py-3 px-4">Document</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Issued On</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "DOC-2023-001",
                        title: "Academic Transcript",
                        type: "Transcript",
                        date: "2023-05-15",
                      },
                      {
                        id: "DOC-2023-002",
                        title: "Certificate of Enrollment",
                        type: "Certificate",
                        date: "2023-05-14",
                      },
                      {
                        id: "DOC-2023-003",
                        title: "Degree Certification",
                        type: "Diploma",
                        date: "2023-05-13",
                      },
                    ].map((doc) => (
                      <tr
                        key={doc.id}
                        className={`${
                          darkMode ? "border-gray-700" : "border-gray-200"
                        } border-b`}
                      >
                        <td className="py-3 px-4">{doc.title}</td>
                        <td className="py-3 px-4">{doc.type}</td>
                        <td className="py-3 px-4">{doc.date}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="p-1 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                              <FiDownload />
                            </button>
                            <button
                              className="p-1 text-green-600 hover:text-green-800 dark:hover:text-green-400"
                              onClick={() => {
                                setActiveTab("request");
                                setNewRequest({
                                  ...newRequest,
                                  documentType: doc.type,
                                });
                              }}
                            >
                              <FiPlus />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DocumentRequestSystem;
