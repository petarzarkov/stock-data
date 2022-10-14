import React, { FC } from "react";
import { Stack, Container, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export const Title: FC<{ title: string; subTitle?: string }> =
({ title, subTitle }) =>
    <Stack spacing={0} as={Container} maxW={"3xl"} textAlign={"center"} padding={0} m={0}>
        <Heading color={useColorModeValue("primary.800", "primary.100")}>{title}</Heading>
        {subTitle && <Text color={useColorModeValue("primary.600", "primary.400")} >
            {subTitle}
        </Text>}
    </Stack>;