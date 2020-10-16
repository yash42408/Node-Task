const logger = require('../../logger');
const connection = require('../../config/mysqlConfig');

const getUserByEmail = async(emailId)=>{
    try{
        results  = await(connection.awaitQuery('SELECT * FROM registration_details where email_id = ?',[emailId]))
        return results;
    }
    catch(error){
        logger.error('Error in Register Dao',error);
        throw error;
    }
}
const getUserBySession = async(sessionId,userId)=>{
    try{
        const result=connection.awaitQuery("SELECT * FROM registration_details where user_id=? and session_id=?",[userId,sessionId]);
        logger.info('Successully fetched user by session');
        return result;
    }
    catch(error){
        logger.error('Error in fetching user session details');
        throw error;
    }


}

const createUser = async(userData)=>{
    try{
        results = await(connection.awaitQuery('INSERT INTO registration_details SET ?',[userData]));
        return results;
    }
    catch(error){
        logger.error('Error in Register Dao while creating user',error);
        throw error;
    }
}
const createUniversityDetail = async(universityData)=>{
    try{
        connection.awaitBeginTransaction();
        results = await(connection.awaitQuery('INSERT INTO university_details SET ?',[universityData]));
        await(connection.awaitQuery('UPDATE registration_details SET step_no=?',[2]));
        connection.awaitCommit();
        logger.info('successfuly created university details of user');
        return results;
    }   
    catch(error){
        connection.awaitRollback();
        logger.error('Error in creating university details',error);
        throw error;
    } 
}

const createPersonalDetail = async(personalData)=>{
    try{
        connection.awaitBeginTransaction();
        results = await(connection.awaitQuery('INSERT INTO personal_details SET ?',[personalData]));
        await(connection.awaitQuery('UPDATE registration_details SET step_no=?, registration_complete = true',[2]));
        connection.awaitCommit();
        logger.info('successfuly created Personal details of user');
        return results;
    }   
    catch(error){
        connection.awaitRollback();
        logger.error('Error in creating Personal details',error);
        throw error;
    } 
}


module.exports = {
    getUserByEmail:getUserByEmail,
    getUserBySession:getUserBySession,
    createUniversityDetail:createUniversityDetail,
    createUser:createUser,
    createPersonalDetail:createPersonalDetail
}