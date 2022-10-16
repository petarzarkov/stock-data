import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@components";
import { NotFound, Home, History } from "@screens";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="history" element={<History />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
