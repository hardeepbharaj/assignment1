const sendCustDataRequest = (formData) => {
  
  const { name, email, insurance, number } = formData.formFieldValue;

  var request = {
    firstName : name,
    
  };

  return request;
};



export {
  sendCustDataRequest
};
