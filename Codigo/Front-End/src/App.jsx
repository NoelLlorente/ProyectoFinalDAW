/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { SobreNosotros } from "./pages/SobreNosotros";
import { ScrollToTop } from "./components/ScrollToTop";
import { Contacto } from "./pages/Contacto";
import { useAuth0 } from "@auth0/auth0-react";
import { Consultas } from "./pages/Consultas";
import { Perfil } from "./pages/Perfil";
import { validateUser } from "./Tools/validateUser";
import { saveUser } from "./Tools/saveUser";
import { useEffect } from "react";
import { ConsultaProvider } from "./context/ConsultaProvider";
import { Blog } from "./pages/Blog";
import { PostProvider } from "./context/PostProvider";

export const App = () => {
  const { isAuthenticated, logout, user, isLoading } = useAuth0();
  //Guardar usuario que se loguea en database si no existe
  useEffect(() => {
    if (isAuthenticated) {
      validateUser(user)
        .then((validarUsuario) => {
          if (!validarUsuario) {
            saveUser(user);
          }
        })
        .catch((error) => {
          console.error("Error validando guardando usuario: ", error);
        });
    }
  }, [isAuthenticated, user]);
  return (
    <>
      <ConsultaProvider user={user}>
        <PostProvider user={user}>
          <Navbar
            isAuthenticated={isAuthenticated}
            logout={logout}
            user={user}
            isLoading={isLoading}
          />
          <Routes>
            <Route
              path="/"
              element={<Home isAuthenticated={isAuthenticated} />}
            ></Route>
            <Route path="/sobre-nosotros" element={<SobreNosotros />}></Route>
            <Route path="/contacto" element={<Contacto />}></Route>
            {isAuthenticated ? (
              <>
                <Route path="/blog" element={<Blog user={user} />}></Route>
                <Route path="/consultas" element={<Consultas />}></Route>
                <Route
                  path="/perfil"
                  element={<Perfil user={user} isLoading={isLoading} />}
                ></Route>
              </>
            ) : null}
            <Route path="/*" element={<Navigate to="/" />}></Route>
          </Routes>
          <ScrollToTop></ScrollToTop>
          <Footer></Footer>
        </PostProvider>
      </ConsultaProvider>
    </>
  );
};
