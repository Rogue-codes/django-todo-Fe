import { Suspense } from "react";
import AppWrapper from "./layout/AppWrapper";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "./routes";
// import PreLoader from "./components/Preloader";
// import { useDispatch } from "react-redux";
import AppOutlet from "./layout/AppOtulet";
import PublicOutlet from "./layout/Guard/public/PublicOutlet";
import PreLoader from "./component/Preloader";
import { paths } from "./routes/paths";
import Auth from "./views/auth/Auth";

export default function App() {



  return (
    <>
      {/* {isLoading ? (
        <PreLoader />
      ) : ( */}
        <AppWrapper>
          <Routes>
            <Route element={<AppOutlet />}>
              <Route index element={<Navigate to={paths.DASHBOARD} />} />
              {routes.map(({ component: Component, path }) => (
                <Route
                  path={path}
                  key={path}
                  element={
                    <Suspense fallback={<PreLoader />}>
                      <Component />
                    </Suspense>
                  }
                />
              ))}
            </Route>

            <Route element={<PublicOutlet />}>
              <Route index element={<Navigate to={paths.LOGIN} />} />
              <Route
                path={paths.LOGIN}
                element={
                  <Suspense fallback={<PreLoader />}>
                    <p><Auth/></p>
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </AppWrapper>
      {/* )} */}
    </>
  );
}