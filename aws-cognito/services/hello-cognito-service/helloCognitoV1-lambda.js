exports.handler = async (event) => {
    
    const obj = {};
    obj.message = "Hello Cognito!";
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(obj),
    };
    return response;
};
