import react  from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
/* 
Here essentially we describe
how we navigate between the different pages
using REACT ROUTER DOM
-> we want to navigate between pages
by going to a different adress in the url bar
*/

/*
in both cases we always make sure to first clear
the local storage to make sure that
we don't have any old access tokens lingering around
*/

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    //browser router is a component
    //that we imported from ReactRouterDom
    
    /*
      inside it we found:
      "<Routes><Routes/>" :  is a list of "<route/>"

      the logic is:
      IF (the route is /login) go to login page
      so on and so forth
      if the route is wichever page that doesn't exist ->
        go to not found
    */
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App