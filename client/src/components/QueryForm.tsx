import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    useColorModeValue,
    Text,
    FormErrorMessage
} from "@chakra-ui/react";
import { BackTop, BaseModal, Title } from "@components";
import { Field, Form, Formik, FieldProps } from "formik";
import { useThemeProvider } from "@hooks";
import { getOptimalStock } from "@store";
import ReactJson from "react-json-view";
import type { StocksResponse } from "../../../contracts/StocksResponse";

type FormValues = { from: string; to: string; balance: number };

export const QueryForm = () => {
    const [showModal, setShowModal] = useState<{ show: true; response: StocksResponse } | { show: false }>({ show: false });
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

    const submitForm = async (values: FormValues) => {
        setIsSubmitting(true);

        const [hoursFrom, minutesFrom] = values.from.split(":");
        const [hoursTo, minutesTo] = values.to.split(":");
        // TODO fix building of dates
        const payload = {
            from: new Date(utcDates.from.fullDatetime.replace(`${utcDates.from.hours}:${utcDates.from.minutes}`, `${hoursFrom}:${minutesFrom}`)).getTime(),
            to: new Date(utcDates.to.fullDatetime.replace(`${utcDates.to.hours}:${utcDates.to.minutes}}`, `${hoursTo}:${minutesTo}`)).getTime(),
            balance: values.balance
        };

        const response = await getOptimalStock(payload);

        setShowModal({
            show: true,
            response
        });

        setIsSubmitting(false);
    };

    const validate = (v: string) => {
        if (v < `${utcDates.from.hours}:${utcDates.from.minutes}:${utcDates.from.seconds}`) {
            return `Must be greater than or equal to ${utcDates.from.hours}:${utcDates.from.minutes}:${utcDates.from.seconds}`;
        }

        if (v > `${utcDates.to.hours}:${utcDates.to.minutes}:${utcDates.to.seconds}`) {
            return `Must be less than or equal to ${utcDates.to.hours}:${utcDates.to.minutes}:${utcDates.to.seconds}`;
        }
    };

    return (
        <Box>
            <Title
                title={"Get Stocks"}
                subTitle={`${utcDates.from.fullDatetime} - ${utcDates.to.fullDatetime}`}
            />
            {showModal.show
            &&
            <BaseModal
                title="Stocks evaluation"
                content={
                    showModal.response.isOk?
                        <>
                            <ReactJson
                                src={showModal.response.result || { err: "No data"}}
                                name="StocksResult"
                                collapsed={3}
                                displayDataTypes={false}
                                quotesOnKeys={false}
                                theme="monokai"
                            />

                            <BackTop />
                        </>
                        :
                        <Text>{`Error: ${showModal.response.error as string}`}</Text>
                }
                isOpen={showModal.show}
                onClose={() => setShowModal({ show: false })}
            />
            }

            <Box
                bg={useColorModeValue("primary.50", "primary.700")}
                borderRadius="lg"
                p={6}
                color={useColorModeValue("primary.700", "primary.50")}
                shadow="base">
                <Formik<FormValues>
                    initialValues={{
                        from: `${utcDates.from.hours}:${utcDates.from.minutes}:${utcDates.from.seconds}`,
                        to: `${utcDates.to.hours}:${utcDates.to.minutes}:${utcDates.to.seconds}`,
                        balance: 1000
                    }}
                    onSubmit={submitForm}
                >
                    {() => (
                        <Form>
                            <Field name='balance'>
                                {({ field, form }: FieldProps<string | number | readonly string[] | undefined, FormValues>) => (
                                    <FormControl
                                        isRequired
                                        marginBottom={5}
                                        isInvalid={!!form.errors.balance && !!form.touched.balance}
                                    >
                                        <FormLabel htmlFor='balance'>{"Balance:"}</FormLabel>
                                        <InputGroup>
                                            <Input
                                                {...field}
                                                type="number"
                                                id="balance"
                                                min={1}
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>{form.errors.balance}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='from' validate={validate}>
                                {({ field, form }: FieldProps<string | number | readonly string[] | undefined, FormValues>) => (
                                    <FormControl
                                        isRequired
                                        marginBottom={5}
                                        isInvalid={!!form.errors.from && !!form.touched.from}
                                    >
                                        <FormLabel htmlFor='from'>{"From:"}</FormLabel>
                                        <InputGroup>
                                            <Input
                                                {...field}
                                                type="time"
                                                id="from"
                                                min={`${utcDates.from.hours}:${utcDates.from.minutes}:${utcDates.from.seconds}`}
                                                max={`${utcDates.to.hours}:${utcDates.to.minutes}:${utcDates.to.seconds}`}
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>{form.errors.from}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='to' validate={validate}>
                                {({ field, form }: FieldProps<string | number | readonly string[] | undefined, FormValues>) => (
                                    <FormControl
                                        isRequired
                                        marginBottom={5}
                                        isInvalid={!!form.errors.to && !!form.touched.to}
                                    >
                                        <FormLabel htmlFor='to'>{"To:"}</FormLabel>
                                        <InputGroup>
                                            <Input
                                                {...field}
                                                type="time"
                                                id="to"
                                                // defaultValue={`${utcDates.to.hours}:${utcDates.to.minutes}:${utcDates.to.seconds}`}
                                                min={`${utcDates.from.hours}:${utcDates.from.minutes}:${utcDates.from.seconds}`}
                                                max={`${utcDates.to.hours}:${utcDates.to.minutes}:${utcDates.to.seconds}`}
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>{form.errors.to}</FormErrorMessage>
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
