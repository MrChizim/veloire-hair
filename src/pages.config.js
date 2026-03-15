import Home from './pages/Home';
import Services from './pages/Services';
import BookAppointment from './pages/BookAppointment';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './Layout.jsx';

export const PAGES = {
  "Home": Home,
  "Services": Services,
  "BookAppointment": BookAppointment,
  "AdminDashboard": AdminDashboard,
};

export const pagesConfig = {
  mainPage: "Home",
  Pages: PAGES,
  Layout: Layout,
};
