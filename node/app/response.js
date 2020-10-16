const Response = (message,status_code,data,error)=>{
    return {
        data:data,
        message:message,
        status_code:status_code,
        error:error,
        timestamp:new Date()
    }
};

module.exports = Response;