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
    VStack
} from "@chakra-ui/react";
import { BaseModal, Title } from "@components";
import { Field, Form, Formik, FieldProps } from "formik";
import { useThemeProvider } from "@hooks";
import { getOptimalStock } from "@store";

type FormValues = { from: string; to: string };

export const QueryForm = () => {
    const [showModal, setShowModal] = useState<{ show: boolean; response: `${string};${string}` }>({ show: false, response: "OK;OK?" });
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
        const payload = {
            from: new Date(utcDates.from.fullDatetime.replace(`${utcDates.from.hours}:${utcDates.from.minutes}`, `${hoursFrom}:${minutesFrom}`)).getTime(),
            to: new Date(utcDates.to.fullDatetime.replace(`${utcDates.to.hours}:${utcDates.to.minutes}}`, `${hoursTo}:${minutesTo}`)).getTime()
        };

        const res = await getOptimalStock(payload);

        setShowModal({
            show: true,
            response: res.isOk && res.result ?
                `Most optimal from:; ${new Date(res.result.from).toUTCString()}; To:; ${new Date(res.result.to).toUTCString()}; Profit:; ${res.result.profit.toString()}`
                :
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `Error; ${!res.isOk && res.error}`
        });

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
            <BaseModal
                title="Stocks evaluation"
                content={
                    <VStack>
                        {showModal.response.split(";").map((r, i) => <Text key={`${r}-${i}`}>{r}</Text>)}
                    </VStack>
                }
                isOpen={showModal.show}
                onClose={() => setShowModal({ show: false, response: "OK;OK?" })}
            />
            }

            <Box
                bg={useColorModeValue("primary.50", "primary.700")}
                borderRadius="lg"
                p={6}
                color={useColorModeValue("primary.700", "primary.50")}
                shadow="base">
                <Formik<FormValues>
                    initialValues={{ from: `${utcDates.from.hours}:${utcDates.from.minutes}:${utcDates.from.seconds}`, to: `${utcDates.to.hours}:${utcDates.to.minutes}:${utcDates.to.seconds}` }}
                    onSubmit={submitForm}
                >
                    {() => (
                        <Form>
                            <Field name='from'>
                                {({ field }: FieldProps<string | number | readonly string[] | undefined, FormValues>) => (
                                    <FormControl isRequired marginBottom={5}>
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
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='to'>
                                {({ field }: FieldProps) => (
                                    <FormControl isRequired marginBottom={5}>
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
