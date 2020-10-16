const logger = require('../../logger');
const registerService = require('../services/registerService');
const Response = require('../response');
const crypto = require('crypto');
const init = (router) =>
 {
    router.route('/sign-in').post(userLogin);
    router.route('/register-user').post(userRegistration);
    router.route('/university-details').post(authenticateUser,userUniversityDetails);
    router.route('/personal-details').post(authenticateUser,userPersonalDetails)
};

const userLogin = async(req,res)=>{
    const userData = req.body;
    try{
        result = await(registerService.getUserByEmail(userData.emailId));
        if(result.length>0){
            if(result[0].decryptPass==userData.password){
                const data ={
                    sessionId:result[0].session_id,
                    userName:result[0].name,
                    userId: result[0].user_id,
                    stepNo: result[0].step_no,
                    register: result[0].registration_complete
                }
                logger.info('Successfully Logged In');
                return res.status(201).json(Response('Successfully Logged In',201,data,null));
            }
            else{
                logger.info('Unauthorised User wrong password');
                return res.status(401).json(Response('Unauthorised User',401,null,'Unauthorised User'));
            }
        }     
        else{
            logger.info('Email Id not present');
            return res.status(207).json(Response('EmailId not present Please Register',201,data,null));
        }
    }
    catch(error){
        logger.info('Error in login process',error);
        return res.status(500).json(Response('Error While login process',500,null,'Error While Login'));
    }
}


const userRegistration = async(req,res)=>{
    const userData = req.body;
    try{
        result = await(registerService.getUserByEmail(userData.emailId));
        if(result.length>0){
            if(result[0].registration_complete){
                logger.info('User already registered');
                return res.status(207).json(Response('User already registered, Please Login',207,null,null));
            }
            else{
                logger.info('User registration incomplete');
                data={
                    registerationComplete:false,
                    stepNo:result[0].step_no
                }
                return res.status(208).json(Response('User registration incomplete',208,data,null));
            }
        }     
        else{
            userData.sessionId = await(generateHashKey());
            result = await(registerService.createUserData(userData));
            const data ={
                sessionId:result.session_id,
                userName:result.name,
                userId: result.user_id
            }
            logger.info('successfully Created User');
            return res.status(201).json(Response('Successfully completed step 1 of registration',201,data,null));
        }
    }
    catch(error){
        logger.info('Error While Creating User in step 1 of registration process',error);
        return res.status(500).json(Response('Error While Creating User in step 1 of registration process',500,null,'Error While Creating User'));
    }
}

const userUniversityDetails = async(req,res)=>{
    try{
        const result = await(registerService.createUniversityDetails(req.body));
        logger.info('SuccessFully created university Record');
        return res.status(201).json(Response('Successfully completed step 2 of Registration',201,null,null));
    }
    catch(error){
        logger.error('Error in creating University Record');
        return res.status(500).json(Response('Error While Creating User in step 2 of registration process',500,null,'Error While Creating University Record'));
    }
}

const userPersonalDetails = async(req,res)=>{
    try{
        const result = await(registerService.createPersonalDetails(req.body));
        logger.info('SuccessFully created Personal Record');
        return res.status(201).json(Response('Successfully completed step 3 of Registration',201,null,null));
    }
    catch(error){
        logger.error('Error in creating Personal Record');
        return res.status(500).json(Response('Error While Creating User in step 3 of registration process',500,null,'Error While Creating Personal Record'));
    }
}

const authenticateUser=async(req,res,next)=>{
    console.log(req.header('sessionId'))
    const sessionId = req.header('sessionId');
    try{
        const result = await(registerService.getUserBySession(sessionId,req.body.userId));
        if(result.length>0){
            next();
        }
        else{
            logger.info('Unauthorised user');
            return res.status(401).json(Response('Unauthorised User!',401,null,'Unauthorised User!'));
        }
    }
    catch(error){
        logger.error('Error while validating User');
        return res.status(500).json(Response('Error While Validating User',500,null,'Error in validating user'));    
    }
}

const generateHashKey = async() => {
    const hash = crypto.createHash('sha256');
    hash.update(Math.random().toString());
    const hashKey = hash.digest('hex');
    return hashKey;
}

module.exports.init = init