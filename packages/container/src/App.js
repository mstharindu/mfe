import React, { lazy, Suspense, useState, useEffect } from "react";
import Header from "./components/Header";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/styles";
import Progress from "./components/Progress";
import { createBrowserHistory } from "history";

const AuthApp = lazy(() => import("./components/AuthApp"));
const MarketingApp = lazy(() => import("./components/MarketingApp"));
const DashboardApp = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();
export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
        />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthApp onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <DashboardApp />
            </Route>
            <Route path="/" component={MarketingApp} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  );
};
