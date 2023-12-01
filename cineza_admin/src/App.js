import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { publicRouter } from "./routes";
import { Fragment } from "react";
import ButtonSidebar from "./components/ButtonSidebar";
import Sidebar from "./components/Layouts/Sidebar";
import SidebarHierarchyStructure from "./components/Layouts/SideBarHierarychStructure";
import Login from "./pages/Login&Register/Login";
import ForgetPassword from "./pages/Login&Register/ForgetPassword";
import Register from "./pages/Login&Register/Register";
import ChangePassword from "./pages/Login&Register/ChangePassword";

function App() {
  const userAdmin = localStorage.getItem("userAdmin");
  return (
    <Router basename="/cineza/admin">
      <div className="App">
        <Routes>
          {publicRouter.map((route, index) => {
            const Page = route.componet;
            const Layout = route.layout;
            const SidebarAS = route.sidebar;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  userAdmin ?
                    (<Layout>
                      <SidebarAS />
                      <Page />
                    </Layout>)
                    :
                    (<Navigate to="/login" />)
                }
              />
            );
          })}
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/change" element={<ChangePassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
