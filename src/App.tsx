import { ThemeProvider, CssBaseline, Box, Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
// import Predictions from "@/scenes/predictions";
import Upload from "@/scenes/upload";
import Ranking from "./scenes/ranking";
import Predictions from "./scenes/predictions";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])
    return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <NavBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/upload" element={<Upload />} />
              {/* <Route path="/predictions" element={<Predictions />} /> */}
            </Routes>
            
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
