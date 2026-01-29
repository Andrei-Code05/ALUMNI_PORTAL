// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import AlumniManagement from "./pages/AlumniManagement";
import ContentManagement from "./pages/ContentManagement";
import AnalyticsAndReport from "./pages/AnalyticsAndReport";
import CertificationCredentials from "./pages/CertificationCredentials";

import CreateJobPost from "./components/content_management/CreateJobPost";
import ManageJobPost from "./components/content_management/ManageJobPost";
import EditJobPost from "./components/content_management/EditJobPost";
import CreateEvents from "./components/content_management/CreateEvents";
import ManageEvents from "./components/content_management/ManageEvents";
import EditEvents from "./components/content_management/EditEvents";

function App() {
  return (
    <Layout>
      <Routes>
        {/* default route */}
        <Route path="/" element={<Navigate to="/alumni-management" replace />} />

        <Route path="/alumni-management" element={<AlumniManagement />} />

        <Route path="/content-management" element={<ContentManagement />} />
        <Route path="/content-management/create-job-post" element={<CreateJobPost />} />
        <Route path="/content-management/manage-job-post" element={<ManageJobPost />} />
        <Route path="/content-management/edit-job-post" element={<EditJobPost />} />

        <Route path="/content-management/create-events" element={<CreateEvents />} />
        <Route path="/content-management/manage-events" element={<ManageEvents />} />
        <Route path="/content-management/edit-events" element={<EditEvents />} />

        <Route path="/analytics-and-report" element={<AnalyticsAndReport />} />

        {/* ✅ credentials full page */}
        <Route
          path="/analytics-and-report/certifications/:id"
          element={<CertificationCredentials />}
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/alumni-management" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
