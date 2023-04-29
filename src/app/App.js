import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfessions";
import { QualityProvider } from "./hooks/useQualities";

function App() {
    return (
        <>
            <NavBar />
            <ProfessionProvider>
                <QualityProvider>
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/login/:type?" component={Login} />
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Redirect to="/" />
                    </Switch>
                </QualityProvider>
            </ProfessionProvider>
            <ToastContainer />
        </>
    );
}

export default App;
