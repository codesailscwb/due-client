import { ThemeProvider, CssBaseline, Box, Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useContext, useMemo } from "react";
import { themeSettings } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
// import Predictions from "@/scenes/predictions";
import Upload from "@/scenes/upload";
import Ranking from "./scenes/ranking";
import Predictions from "./scenes/predictions";
import Auth from "./scenes/login/home";
import SignUp from "./scenes/login/signUp";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Home from "./scenes/login/home";
import Profile from "./scenes/login/profile";
import RequireAuth from '../src/components/RequireAuth'

function App() {
  
  const theme = useMemo(() => createTheme(themeSettings), [])
    return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              <NavBar />
              <Routes>
                <Route index element={<Home />} />
                <Route path="profile" element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>}
                />
                <Route path="/dashboard" element={ 
                  <RequireAuth>
                    <Dashboard/>
                  </RequireAuth>} 
                />
                <Route path="/ranking" element={ 
                  <RequireAuth>
                    <Ranking/>
                  </RequireAuth>} 
                />
                <Route path="/upload" element={ 
                  <RequireAuth>
                    <Upload />
                  </RequireAuth>} 
                />
                {/* <Route path="/predictions" element={<Predictions />} /> */}
              </Routes>
              
            </Box>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
