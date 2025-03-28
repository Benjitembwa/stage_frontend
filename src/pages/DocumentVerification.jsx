import { useState, useEffect, useRef } from "react";
import {
  FiCamera,
  FiSearch,
  FiDownload,
  FiSun,
  FiMoon,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const DocumentVerification = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("scan");
  const [documentId, setDocumentId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle document ID input
  const handleDocumentIdChange = (e) => {
    setDocumentId(e.target.value);
  };

  // Simulate document verification
  const verifyDocument = (id) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // This is just for demo - in a real app you'd call your backend
      const isValid = id.startsWith("DOC-2024-") && id.length > 10;
      setVerificationStatus(isValid ? "valid" : "invalid");

      if (isValid) {
        // Set sample document data
        setDocumentData({
          title: "Bachelor's Degree in Computer Science",
          holder: "Jean Dupont",
          date: "2024-06-15",
          institution: "Université de Paris",
          reference: id,
        });
      }

      setIsLoading(false);
    }, 1500);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (documentId.trim()) {
      verifyDocument(documentId);
    }
  };

  // Sample document data (would come from API in real app)
  const [documentData, setDocumentData] = useState(null);

  // QR Code Scanner Simulation
  useEffect(() => {
    if (activeTab === "scan" && cameraActive) {
      // In a real app, you would implement actual QR scanning here
      // This is just a simulation with a timeout
      const timer = setTimeout(() => {
        // For demo purposes, we'll randomly decide to scan or not
        if (Math.random() > 0.3) {
          const demoId = `DOC-2024-${Math.floor(
            10000 + Math.random() * 90000
          )}`;
          verifyDocument(demoId);
          setCameraActive(false);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [activeTab, cameraActive]);

  // Start/stop camera
  const toggleCamera = () => {
    setCameraActive(!cameraActive);
    if (!cameraActive) {
      setVerificationStatus(null);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Verify Document Authenticity
          </h1>
          <p
            className={`max-w-2xl mx-auto text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Ensure the validity of academic documents by scanning the QR code or
            entering the document reference number.
          </p>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Manual Entry */}
          <div
            className={`flex-1 p-8 rounded-2xl shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Document Verification
              </h2>
              <p
                className={`mb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              ></p>
              {/* Tabs */}
              <div className="flex border-b mb-6">
                <button
                  onClick={() => setActiveTab("scan")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "scan"
                      ? `${
                          darkMode
                            ? "border-blue-400 text-blue-400"
                            : "border-blue-600 text-blue-600"
                        } border-b-2`
                      : `${darkMode ? "text-gray-400" : "text-gray-500"}`
                  }`}
                >
                  Scan QR Code
                </button>
                <button
                  onClick={() => setActiveTab("manual")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "manual"
                      ? `${
                          darkMode
                            ? "border-blue-400 text-blue-400"
                            : "border-blue-600 text-blue-600"
                        } border-b-2`
                      : `${darkMode ? "text-gray-400" : "text-gray-500"}`
                  }`}
                >
                  Manual Entry
                </button>
              </div>
            </div>

            {/* Scanner Section */}
            {activeTab === "scan" && (
              <div className="space-y-6">
                <div
                  className={`relative rounded-xl overflow-hidden ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  } h-64 flex items-center justify-center`}
                >
                  {cameraActive ? (
                    <>
                      {/* In a real app, this would show actual camera feed */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-pulse text-center">
                          <FiCamera
                            size={48}
                            className="mx-auto mb-4 text-blue-500"
                          />
                          <p>Scanning for QR codes...</p>
                        </div>
                      </div>
                      {/* Scanning animation */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 bg-blue-500 animate-scan"
                        style={{ animation: "scan 2s linear infinite" }}
                      ></div>
                    </>
                  ) : (
                    <div className="text-center p-6">
                      <FiCamera
                        size={48}
                        className="mx-auto mb-4 text-blue-500"
                      />
                      <h3 className="text-xl font-medium mb-2">
                        QR Code Scanner
                      </h3>
                      <p
                        className={`mb-4 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Position the QR code within the frame to verify the
                        document.
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={toggleCamera}
                  className={`w-full py-3 px-4 rounded-lg flex items-center justify-center ${
                    cameraActive
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {cameraActive ? (
                    <>
                      <FiXCircle className="mr-2" />
                      Stop Scanning
                    </>
                  ) : (
                    <>
                      <FiCamera className="mr-2" />
                      Start QR Scanner
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Manual Entry Section */}
            {activeTab === "manual" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="documentId"
                    className="block text-sm font-medium mb-2"
                  >
                    Document Reference Number
                  </label>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      id="documentId"
                      value={documentId}
                      onChange={handleDocumentIdChange}
                      placeholder="e.g. DOC-2024-00123"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 focus:border-blue-400"
                          : "bg-white border-gray-300 focus:border-blue-500"
                      } focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all`}
                      required
                    />
                  </div>
                  <p
                    className={`mt-2 text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Enter the unique document reference number found on the
                    certificate.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center ${
                    isLoading ? "opacity-75" : ""
                  }`}
                >
                  {isLoading ? (
                    <span className="animate-pulse">Verifying...</span>
                  ) : (
                    <>
                      <FiCheckCircle className="mr-2" />
                      Verify Document
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Side - Results */}
          <div
            className={`flex-1 p-8 rounded-2xl shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-6">
              Verification Results
            </h2>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p>Verifying document...</p>
              </div>
            ) : verificationStatus === "valid" ? (
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                  <div className="flex items-center">
                    <FiCheckCircle
                      className="text-green-500 dark:text-green-400 mr-3"
                      size={24}
                    />
                    <div>
                      <h3 className="font-medium text-green-800 dark:text-green-200">
                        This document is valid
                      </h3>
                      <p className="text-sm text-green-600 dark:text-green-300">
                        The document has been successfully verified and is
                        authentic.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-6 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <h3 className="font-medium text-lg mb-4">Document Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Title:
                      </span>
                      <span className="font-medium">{documentData.title}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Holder:
                      </span>
                      <span className="font-medium">{documentData.holder}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Date of Issue:
                      </span>
                      <span className="font-medium">{documentData.date}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Institution:
                      </span>
                      <span className="font-medium">
                        {documentData.institution}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Reference:
                      </span>
                      <span className="font-mono text-blue-600 dark:text-blue-400">
                        {documentData.reference}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center">
                    <FiDownload className="mr-2" />
                    Download Verified Copy
                  </button>
                  <button className="flex-1 py-3 px-4 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-medium">
                    Share Verification Link
                  </button>
                </div>
              </div>
            ) : verificationStatus === "invalid" ? (
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                  <div className="flex items-center">
                    <FiXCircle
                      className="text-red-500 dark:text-red-400 mr-3"
                      size={24}
                    />
                    <div>
                      <h3 className="font-medium text-red-800 dark:text-red-200">
                        Document Not Verified
                      </h3>
                      <p className="text-sm text-red-600 dark:text-red-300">
                        This document could not be verified. Please check the
                        reference number or contact the issuing institution.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-6 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <h3 className="font-medium text-lg mb-4">Next Steps</h3>
                  <ul className="space-y-3 list-disc pl-5">
                    <li>Double-check the document reference number</li>
                    <li>
                      Ensure the document was issued by a recognized institution
                    </li>
                    <li>
                      Contact the institution's registrar office for assistance
                    </li>
                    <li>Report suspicious documents to the authorities</li>
                  </ul>
                </div>

                <button
                  onClick={() => setVerificationStatus(null)}
                  className="w-full py-3 px-4 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-medium"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div
                className={`py-12 text-center ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <FiSearch size={48} className="mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-medium mb-2">
                  No document verified yet
                </h3>
                <p>
                  Scan a QR code or enter a document reference number to begin
                  verification.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS for the scanning animation */}
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DocumentVerification;
