export const generalError = {
    type: "object",
    properties: {
        isOk: { type: "boolean", default: false },
        error: {
            type: "string",
            nullable: true,
        }
    }
};

export const generalErrors = {
    400: {
        description: "Bad request response",
        ...generalError
    },
    401: {
        description: "Unauthorized",
        ...generalError
    },
    404: {
        description: "Not found response",
        ...generalError
    },
    500: {
        description: "Server error response",
        ...generalError
    },
};
