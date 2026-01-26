// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AlumniManagement from './pages/AlumniManagement';
import ContentManagement from './pages/ContentManagement';
import AnalyticsAndReport from './pages/AnalyticsAndReport';
import CreateJobPost from './components/content_management/CreateJobPost';
import ManageJobPost from './components/content_management/ManageJobPost';
import EditJobPost from './components/content_management/EditJobPost';
import CreateEvents from './components/content_management/CreateEvents';
import ManageEvents from './components/content_management/ManageEvents';
import EditEvents from './components/content_management/EditEvents';




// ... Placeholder componentz

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><AlumniManagement /></Layout>} />
        <Route path="/alumni-management" element={<Layout><AlumniManagement /></Layout>} />
        <Route path="/content-management" element={<Layout><ContentManagement /></Layout>} />
        <Route path="/content-management/create-job-post" element={<Layout><CreateJobPost /></Layout>} />
        <Route path="/content-management/create-events" element={<Layout><CreateEvents/></Layout>} />

        <Route path="/content-management/manage-job-post" element={<Layout><ManageJobPost /></Layout>} />
        <Route path="/content-management/edit-job-post" element={<Layout><EditJobPost/></Layout>} />

        <Route path="/content-management/manage-events" element={<Layout><ManageEvents/></Layout>} />
        <Route path="/content-management/edit-events" element={<Layout><EditEvents/></Layout>} />





        <Route path="/analytics-and-report" element={<Layout><AnalyticsAndReport /></Layout>} />


        {/* Add other routes similarly */}
      </Routes>
    </Router>
  );
}

export default App;