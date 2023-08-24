import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PastePage from './pages/PastePage';
import RawPastePage from './pages/RawPastePage';
import NotFound from "./pages/NotFound";
import "./App.css";

import Navbar from "./components/Navbar";

function App() {

  console.log(
  "   #                   ######                              \n"+
  "  # #   #    # ##### # #     #   ##    ####  ##### ###### \n"+
  " #   #  ##   #   #   # #     #  #  #  #        #   #      \n"+
  "#     # # #  #   #   # ######  #    #  ####    #   #####  \n"+
  "####### #  # #   #   # #       ######      #   #   #      \n"+
  "#     # #   ##   #   # #       #    # #    #   #   #      \n"+
  "#     # #    #   #   # #       #    #  ####    #   ###### \n\n"+
  "Made with <3                   41 6E 74 69 50 61 73 74 65 "
                                                         
  );
  

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<PastePage />} />
        <Route path="/raw/:id" element={<RawPastePage />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
