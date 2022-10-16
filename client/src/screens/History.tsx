/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { FC } from "react";
import { Box, Heading, Text, TableContainer, Table, TableCaption, Th, Thead, Tr, Tbody, Td } from "@chakra-ui/react";
import { useThemeProvider } from "@hooks";

export const History: FC = () => {
    const { stockData } = useThemeProvider();

    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading
                display="inline-block"
                as="h2"
                size="2xl"
                bgGradient="linear(to-r, primary.400, primary.600)"
                backgroundClip="text">
        History
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
        Showing latest queried data from stocks
            </Text>
            {stockData && stockData?.length > 0 &&
            <TableContainer>
                <Table variant='striped' colorScheme='primary'>
                    <TableCaption>Latest data</TableCaption>
                    <Thead>
                        <Tr>
                            {Object.keys(stockData[0]).map((k) => (<Th key={k}>{k}</Th>))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {stockData.map((k, i) => (
                            <Tr key={`tr-${i}`}>
                                {Object.keys(k).map((r) => (<Td key={r}>{k[r as keyof typeof k]}</Td>))}
                            </Tr>))}
                    </Tbody>
                </Table>
            </TableContainer>}
        </Box>
    );
};
