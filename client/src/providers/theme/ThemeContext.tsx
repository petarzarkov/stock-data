import React from "react";
import { Expand } from "@contracts";
import { ColorTheme } from "@theme";
import type { Sale } from "../../../../contracts/StocksResponse";

export type ContextSettings = {
    theme: ColorTheme;
};

export type ProviderBase = Expand<
{
    colors: Record<string, string>;
    isLoading: boolean;
    from: number;
    to: number;
    stockData?: Sale[];
} & ContextSettings
>;

export type ContextState = Expand<
ProviderBase & {
    setStockData: (data: Sale[]) => void;
    setTheme: (theme: ColorTheme) => void;
}
>;

export const ThemeContext = React.createContext<ContextState | undefined>(
    undefined,
);
