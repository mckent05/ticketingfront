import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import LoginPage from "./components/sessions/LoginPage";
import RegisterPage from "./components/sessions/RegisterPage";
import TicketDetails from "./pages/TicketDetails";
import TicketListPage from "./pages/TicketListPage";
import TicketPage from "./pages/TicketPage";
import NewTicketPage from "./pages/NewTicketPage";
import Main from "./pages/Main";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const sessionDetails = useSelector((state) => state.sessions);

  const { isLoading, isSignedIn } = sessionDetails;


  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
      <Routes>
        <Route path="/login" element={<LoginPage loading={isLoading} signedIn={isSignedIn} />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Main />}>
            <Route element={<TicketPage />}>
              <Route index element={<TicketListPage />} />
              <Route path="tickets/:id" element={<TicketDetails />} />
            </Route>
            <Route path="new-ticket" element={<NewTicketPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
