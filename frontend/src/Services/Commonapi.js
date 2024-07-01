import axios from 'axios'

export const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {
    let reqConfig = {
      method: httpMethod,
      url,
      data: reqBody,
      headers: reqHeader ? reqHeader : { "Content-Type": "application/json" },
    };
  
    // console.log(reqConfig);
  
    try {
      const result = await axios(reqConfig);
      return result;
    } catch (error) {
      console.error("commonAPI error:", error.message || error);
      throw error;
    }
  };