import React, { FC } from "react";
import { Box, useColorModeValue, Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import { baseServerCall } from "@store";
import { GiHeartPlus, GiHeartMinus } from "react-icons/gi";
import { QueryForm } from "@components";

export const Home: FC = () => {
    const color = useColorModeValue("primary.900", "primary.300");
    const elementRef = React.useRef(null);
    const [isHealthy, setIsHealthy] = React.useState(false);

    React.useEffect(() => {
        void baseServerCall("/service/healthcheck")
            .then((r) => setIsHealthy(r.isOk))
            .catch(() => setIsHealthy(false));
    }, []);

    return (
        <Box
            ref={elementRef}
            width={[200, 460, 660]}
        >
            <Tag size={"md"} key={"ServerHealthy"} variant='subtle' color={isHealthy ? "green.300" : "red.300"}>
                <TagLabel>{"ServerHealthy"}</TagLabel>
                <TagRightIcon
                    as={isHealthy ? GiHeartPlus : GiHeartMinus}
                    color={isHealthy ? "green.300" : "red.300"}
                    p={0}
                    m={0}
                />
            </Tag>
            {isHealthy && <QueryForm />}
        </Box>
    );
};

