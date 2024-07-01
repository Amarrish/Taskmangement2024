import { BASEURL } from "./Baseurl";
import { commonAPI } from "./Commonapi";

export const registerApi =async (user)=>{
    try {
        return await commonAPI('POST',`${BASEURL}/user/register`,user,"")
    } catch (error) {
        console.log('error in RegisterAPI',error);
    }
}

export const loginAPi = async(user)=>{
    try {
        return await commonAPI('POST', `${BASEURL}/user/login`,user,"")
    } catch (error) {
        console.log('error in LoginAPI',error);
    }
}

export const taskaddApi =async (reqbody,reqheader)=>{
    try {
        return await commonAPI('POST',`${BASEURL}/user/addtask`,reqbody,reqheader)
    } catch (error) {
        console.log('error in TaskaddAPI',error);
    }
}

export const taskgetApi =async (reqheader)=>{
    try {
        return await commonAPI('GET',`${BASEURL}/user/alltask`,"",reqheader)
    } catch (error) {
        console.log('error in TaskGETAPI',error);
    }
}

// edit task
export const taskeditAPI = async (taskId,taskBody,taskHeader)=>{
    try {
        return await commonAPI("PUT",`${BASEURL}/user/task/edit/${taskId}`,taskBody,taskHeader)
    } catch (error) {
        console.log('error in TaskEditAPI',error);
    }
}

export const taskdeleteAPI = async (taskId,reqHeader)=>{
    try {
        return await commonAPI("DELETE",`${BASEURL}/user/task/delete/${taskId}`,{},reqHeader)
    } catch (error) {
        console.log('error in TaskEditAPI',error);
    }
}

// search 

export const tasksearchApi = async (searchkey, header) => {
    try {
        return await commonAPI("GET", `${BASEURL}/user/task/search?search=${searchkey}`, "", header);
    } catch (error) {
        console.log('error in TaskSearchAPI', error);
    }
};