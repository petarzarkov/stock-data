import React from "react";
import { storeData, getData, getPeriodRanges } from "@store";
import { ProviderBase, ThemeContext, ContextSettings } from "./ThemeContext";
import { themes, ColorTheme } from "@theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { Sale } from "../../../../contracts/StocksResponse";

export class ThemeProvider extends React.Component<{ children: React.ReactNode }> {
    isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    state: ProviderBase = {
        theme: "gray",
        colors: themes.gray,
        isLoading: false,
        from: 0,
        to: 0,
        stockData: []
    };

    async componentDidMount() {
        this.setState({ isLoading: true });
        const settings = getData<ContextSettings>("latest_settings");
        if (settings && themes[settings.theme]) {
            this.setState({
                ...(settings.theme && {
                    theme: settings.theme,
                    colors: themes[settings.theme],
                }),
            });
        }
        const ranges = await getPeriodRanges();
        if (ranges.isOk && ranges.result) {
            this.setState({
                ...ranges.result
            });
        }
        this.setState({ isLoading: false });
    }

    setTheme = (t: ColorTheme) => {
        this.setState({ theme: t, colors: themes[t] });
        void storeData("latest_settings", {
            theme: t,
        });
    };

    setStockData = (data: Sale[]) => {
        this.setState({
            stockData: data
        });
    };

    render() {
        return (
            <ThemeContext.Provider
                value={{
                    ...this.state,
                    setTheme: this.setTheme,
                    setStockData: this.setStockData
                }}
            >
                <ChakraProvider theme={this.state.colors}>
                    {this.props.children}
                </ChakraProvider>
            </ThemeContext.Provider>
        );
    }
}
