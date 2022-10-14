import React from "react";
import { ThemeContext } from "@theme";

export function useThemeProvider() {
    const context = React.useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useThemeProvider must be used within a ThemeProvider");
    }

    return context;
}
