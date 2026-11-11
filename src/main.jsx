import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Timetable from "./pages/Timetable";
import Login from "./pages/Login";
import Admin, { Protected } from "./pages/Admin";
import "./styles.css";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="servicos" element={<Services />} />
            <Route path="grade" element={<Timetable />} />
            <Route path="entrar" element={<Login />} />
            <Route
              path="admin/professores"
              element={
                <Protected>
                  <Admin key="teachers" kind="teachers" />
                </Protected>
              }
            />
            <Route
              path="admin/classes"
              element={
                <Protected>
                  <Admin key="classes" kind="classes" />
                </Protected>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <h1>Página não encontrada</h1>
                  <Link to="/">Voltar ao início</Link>
                </>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
