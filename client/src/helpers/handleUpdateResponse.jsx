export const handleUpdateResponse = (response) => {
  if (response.status === 200) {
    return {
      success: true,
      message: response.data.message,
    };
  } else {
    return {
      success: false,
      message: response.data.message,
    };
  }
};

export default handleUpdateResponse;
