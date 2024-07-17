import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./routes/UserRouter";
import TutorRouter from "./routes/TutorRouter";
import AdminRouter from "./routes/AdminRouter";
import "./index.css";
import { Toaster, ToastBar } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster
        reverseOrder={true}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#232946",
            color: "#fff",
          },
        }}>
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible
                ? "custom-enter 3s ease"
                : "custom-exit 5s ease",
            }}
          />
        )}
      </Toaster>
      <BrowserRouter>
        <Routes>
          <Route path={"/*"} element={<UserRouter />} />
          <Route path={"/tutor/*"} element={<TutorRouter />} />
          <Route path={"/admin/*"} element={<AdminRouter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
