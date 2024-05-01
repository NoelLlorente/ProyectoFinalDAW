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

/**
 * Este el es componente principal se podría decir aca se crean las rutas de navegación y se llaman a todas las pages, al Navbar y al Footer.
 * Acá se válida que el usuario que se loguea no este en la db, osea sino esta se almacena en la db. Esto se hace mediante la funcion saveUser
 * Cabe recalcar que acá se llama a un componente que nos cuando hagamos scroll muy abajo nos permitará subir al inicio de la página. Este componente es {@link ScrollToTop}.
 * También se llaman a los Providers, en mi caso tengos dos: {@link Consultas.ConsultaProvider} y {@link Blog.PostProvider}, como su nombre indica son proveedores de funcionalidades para la vista {@link Blog} y para la vista {@link Consultas}.
 * @function App
 * @returns {JSX.Element} Se retorna el componente para renderizar
 */
export const App = () => {
  /**
   * Nos traemos props de useAuth0 que es de JWT, en este useEffect se comprueba que el usuario no esta en la db, sino esta se almacena, si esta en la db no pasa nada.
   * Este useEffect se va a ejecutar cada vez que cambie el user, y cada vez que cambie el isAuthenticated.
   */
  const { isAuthenticated, logout, user, isLoading } = useAuth0();
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
