import React, { FC, ReactElement } from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useColorModeValue } from "@chakra-ui/react";

export const BaseModal: FC<{ content: ReactElement | string; title: string; isOpen: boolean; onClose: () => void }> =
({ content, title, isOpen, onClose }) => {
    const color = useColorModeValue("primary.900", "primary.300");
    const colorInverse = useColorModeValue("primary.300", "primary.900");
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                motionPreset={"slideInRight"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        backgroundColor={colorInverse}
                        height={50}
                    >
                        {title}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody backgroundColor={color} color={colorInverse}>
                        {content}
                    </ModalBody>

                    <ModalFooter backgroundColor={colorInverse} h={50}>
                        <Button mr={3} onClick={onClose} color={color}>{"Close"}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};