const def={
    400: "Bad request",
    404: "Not found",
}


const requestError = (status, message=def[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = requestError;