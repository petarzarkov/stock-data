import React, { FC } from "react";
import { Box, useColorModeValue, Text } from "@chakra-ui/react";

export const Home: FC = () => {
    const color = useColorModeValue("primary.900", "primary.300");
    const elementRef = React.useRef(null);
    return (
        <Box
            ref={elementRef}
            width={[200, 460, 660]}
        >
            <Text color={color} mb={6}>
                {"Hello"}
            </Text>
        </Box>
    );
};

