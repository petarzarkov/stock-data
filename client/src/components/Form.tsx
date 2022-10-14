import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    useColorModeValue
} from "@chakra-ui/react";
import { BaseModal, Title } from "@components";
import { Field, Form, Formik, FormikHelpers, FieldProps } from "formik";
import { useThemeProvider } from "@hooks";

type FormValues = { from?: number; to?: number; message?: string };

export const QueryForm = () => {
    const [showModal, setShowModal] = useState<{ show: true; response: string } | { show: false; response?: string }>({ show: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { from, to } = useThemeProvider();

    const getTimeFormatted = (cb: () => number) => {
        const r = cb();

        return r < 10 ? `0${r}` : r;
    };
    const getUtcDate = (ms: number) => ({
        fullDatetime: new Date(ms).toUTCString(),
        hours: getTimeFormatted(() => new Date(ms).getUTCHours()),
        minutes: getTimeFormatted(() => new Date(ms).getUTCMinutes()),
        seconds: getTimeFormatted(() => new Date(ms).getUTCSeconds())
    });

    const utcDates = {
        from: getUtcDate(from),
        to: getUtcDate(to)
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const submitForm = (_values: FormValues, _actions: FormikHelpers<FormValues>) => {
        setIsSubmitting(true);
        // return emailjs.send(email.serviceId, email.templateId, {
        //     from_name: values.name,
        //     message: values.message,
        //     reply_to: values.email
        // }, email.userId)
        //     .then(() => {
        //         setShowModal({ show: true, response: "Email sent." });
        //         actions.setSubmitting(false);
        //     }, () => {
        //         setShowModal({ show: true, response: "Error on sending email." });
        //         actions.setSubmitting(false);
        //     });
        setShowModal({ show: true, response: "All good." });

        setIsSubmitting(false);
    };

    return (
        <Box>
            <Title
                title={"Get Stocks"}
                subTitle={`${utcDates.from.fullDatetime} - ${utcDates.to.fullDatetime}`}
            />
            {showModal.show
            &&
            <BaseModal title="Stocks evaluation" content={showModal.response} isOpen={showModal.show} onClose={() => setShowModal({ show: false })} />
            }

            <Box
                bg={useColorModeValue("primary.50", "primary.700")}
                borderRadius="lg"
                p={6}
                color={useColorModeValue("primary.700", "primary.50")}
                shadow="base">
                <Formik<FormValues>
                    initialValues={{ from: undefined, to: undefined }}
                    onSubmit={submitForm}
                >
                    {() => (
                        <Form>
                            <Field name='from'>
                                {({ field }: FieldProps<string | number | readonly string[] | undefined, FormValues>) => (
                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                                    <FormControl isRequired marginBottom={5}>
                                        <FormLabel htmlFor='from'>{"From:"}</FormLabel>
                                        <InputGroup>
                                            {/* <Text>{`Min: ${utcDates.from.fullDatetime}`}</Text> */}
                                            <Input
                                                {...field}
                                                type="time"
                                                id="from"
                                                defaultValue={`${utcDates.from.hours}:${utcDates.from.minutes}:${utcDates.from.seconds}`}
                                                min={`${utcDates.from.hours}:${utcDates.from.minutes}:${utcDates.from.seconds}`}
                                                max={`${utcDates.to.hours}:${utcDates.to.minutes}:${utcDates.to.seconds}`}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='to'>
                                {({ field }: FieldProps) => (
                                    <FormControl isRequired marginBottom={5}>
                                        <FormLabel htmlFor='to'>{"To:"}</FormLabel>
                                        <InputGroup>
                                            {/* <InputAddon>{`Max: ${utcDates.to.fullDatetime}`}</InputAddon> */}
                                            <Input
                                                {...field}
                                                type="time"
                                                id="to"
                                                defaultValue={`${utcDates.to.hours}:${utcDates.to.minutes}:${utcDates.to.seconds}`}
                                                min={`${utcDates.from.hours}:${utcDates.from.minutes}:${utcDates.from.seconds}`}
                                                max={`${utcDates.to.hours}:${utcDates.to.minutes}:${utcDates.to.seconds}`}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                )}
                            </Field>
                            <Button
                                isLoading={isSubmitting}
                                type='submit'
                                colorScheme="blue"
                                bg={useColorModeValue("primary.300", "primary.500")}
                                color="white"
                                _hover={{
                                    bg: useColorModeValue("primary.200", "primary.400"),
                                }}
                            >
                                {"Get Stocks"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};
