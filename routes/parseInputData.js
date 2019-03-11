const parseInputData = function(delimeter,delimeterLength,rawData){
    let inputData = rawData.split(delimeter);
    if(inputData.length !==5 || delimeterLength !==4){
        let err = new Error('Missing fields');
        err.status = 404;
        err.message = "Error! There is a missing field at parseInputData";
        console.log(err.message);
        throw err;
    }
    else{
        console.log('returning your input data array')
    }
    return inputData;
}

module.exports = parseInputData;