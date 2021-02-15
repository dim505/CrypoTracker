import Axios from "axios";

//refactored api calls to a seperate module
export const ApiCall = async (Method, url, PostData) => {
  const BearerToken = window.getTokenSilently;
  var result;

  if (Method === "Get") {
    try {
      await Axios.get(`${url}`).then((results) => {
        result = results.data;
      });
      return result;
    } catch (error) {
      return error;
    }
  } else if (Method === "Post") {
    try {
      await Axios.post(`${url}`, PostData, {
        headers: { Authorization: `bearer ${BearerToken}` }
      }).then((results) => {
        result = results.data;
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  } else if (Method === "Delete") {
    try {
      await Axios.delete(`${url}`, {
        headers: { Authorization: `bearer ${BearerToken}` }
      }).then((results) => (result = results.data));

      return result;
    } catch (error) {
      console.log(error);
    }
  }
};
