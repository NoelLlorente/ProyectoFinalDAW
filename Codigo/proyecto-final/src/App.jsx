import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { SobreNosotros } from "./pages/SobreNosotros";
import { ScrollToTop } from "./components/ScrollToTop";

export const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sobre-nosotros" element={<SobreNosotros />}></Route>
        <Route path="/*" element={<Navigate to="/" />}></Route>
      </Routes>
      <ScrollToTop></ScrollToTop>
      <Footer></Footer>
    </>
  );
};
