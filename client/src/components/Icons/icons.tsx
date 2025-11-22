import React, { FC } from "react";
import { about } from "@config";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { SiSwagger } from "react-icons/si";
import { IconLink as IconLinkBase } from "@components";
import { Flex, useColorModeValue } from "@chakra-ui/react";

const FlexIcon: FC<{ children: React.ReactNode }> = ({ children }) => <Flex
    w={12}
    h={12}
    align={"center"}
    justify={"center"}
    rounded={"full"}
    bgColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
    mb={1}>
    {children}
</Flex>;
const IconLink: FC<Parameters<typeof IconLinkBase>[0]> = (props) => <FlexIcon>
    <IconLinkBase {...props} />
</FlexIcon>;

export const Socials = {
    SwaggerDocs: () => <IconLink
        to={about.swagger}
        icon={<SiSwagger size="28px" />}
        label={"Docs"}
    />,
    GitHub: ({ to = about.github }) => <IconLink
        to={to}
        icon={<BsGithub />}
        label={"github"}
        btnProps={{
            fontSize: "3xl"
        }}
    />,
    LinkedIn: () => <IconLink
        to={about.linkedin}
        icon={<BsLinkedin size="28px" />}
        label={"linkedin"}
    />,
    Twitter: () => <IconLink
        to={about.twitter}
        icon={<BsTwitter size="28px" />}
        label={"twitter"}
    />
};
