const logger = require('../../logger');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const registerDao = require('../dao/registerDao');

const getUserByEmail = async(emailId)=>{
    try{
        userData = await(registerDao.getUserByEmail(emailId));
        if(userData.length>0)
            userData[0].decryptPass = cryptr.decrypt(userData[0].password);
        logger.info('Succesfully Fetched user Data by emailId');
        return userData;
    }
    catch(error){
        logger.error('Error While Fetching User Data By EmailId in Service');
        throw error;
    }
}

const getUserBySession = async(sessionId,userId)=>{
    try{
        userData = await(registerDao.getUserBySession(sessionId,userId));
        logger.info('Succesfully Fetched user Data by session');
        return userData;
    }
    catch(error){
        logger.error('Error While Fetching User Data Bysession in service');
        throw error;
    }
}

const createUserData = async(userData)=>{
    try{
        const encryptedString = cryptr.encrypt(userData.password);
        userDetails = {
            'name':userData.name,
            'email_id':userData.emailId,
            'password':encryptedString,
            'step_no': 1,
            'registration_complete': false,
            'last_login_time':new Date(),
            'created_date':new Date(),
            'session_id': userData.sessionId   
        } 
        result = await(registerDao.createUser(userDetails));
        userDetails = await(registerDao.getUserByEmail(userData.emailId))
        logger.info('Succesfully Created User in registration details');
        return userDetails[0];
    }
    catch(error){
        logger.error('Error While Cretaing User in Service',error);
        throw error;
    }
}
const createUniversityDetails = async(universityData)=>{
    try{
        universityDetail={
            'user_id':universityData.userId,
            'university_name':universityData.universityName,
            'degree':universityData.degree,
            'start_year':universityData.startYear,
            'end_year':universityData.endYear,
            'created_on':new Date()
        }
        const data = await(registerDao.createUniversityDetail(universityDetail));
        logger.info('Successfully Created university Details in Servce');
        return data;
    }
    catch(error){
        logger.error('Error while creating university Details');
        throw error;
    }
}

const createPersonalDetails = async(PersonalData)=>{
    try{

        personalDetail={
            'user_id':PersonalData.userId,
            'hobbies':PersonalData.hobbies,
            'address':PersonalData.address,
            'profile_pic':PersonalData.profilePic,
            'created_on':new Date()
        }
        const data = await(registerDao.createPersonalDetail(personalDetail));
        logger.info('Successfully Created Personal Details in Servce');
        return data;
    }
    catch(error){
        logger.error('Error while creating Personal Details');
        throw error;
    }
}

module.exports = {
    getUserByEmail: getUserByEmail,
    getUserBySession:getUserBySession,
    createUserData:createUserData,
    createUniversityDetails:createUniversityDetails,
    createPersonalDetails:createPersonalDetails
}