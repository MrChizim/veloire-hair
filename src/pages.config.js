import Home from './pages/Home';
import Services from './pages/Services';
import BookAppointment from './pages/BookAppointment';
import AdminDashboard from './pages/AdminDashboard';
import Gallery from './pages/Gallery';
import Policies from './pages/Policies';
import Layout from './Layout.jsx';

export const PAGES = {
  "Home": Home,
  "Services": Services,
  "Gallery": Gallery,
  "Policies": Policies,
  "BookAppointment": BookAppointment,
  "AdminDashboard": AdminDashboard,
};

export const pagesConfig = {
  mainPage: "Home",
  Pages: PAGES,
  Layout: Layout,
};
