import { API } from './service.config';

export const registerUser = async (formData) => {
  try {
    const response = await API.post('/users/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const checkCodeConfirmationUser = async (token, code) => {
  try {
    const response = await API.post(`/users/check-code/${token}`, {
      code: Number(code),
    });
    return response;
  } catch (error) {
    console.log(error);
    return { error: true, message: error.response.data, response: error.response };
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await API.post('/users/login', formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const requestPasswordReset = async (formData) => {
  try {
    const response = await API.post('/users/requestPasswordReset', formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const resendCodeConfirmationUser = async (decodedToken, email) => {
  try {
    let body = {};
    if (decodedToken) {
      body.token = decodedToken;
    } else if (email) {
      body.email = email;
    }
    const response = await API.post('/users/resend-code', body);
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordUser = async (token, newPassword) => {
  try {
    const response = await API.post(`/users/reset-password?token=${token}`, {
      newPassword,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const response = await API.delete('/users/delete');
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (formData) => {
  console.log(formData);
  try {
    const response = await API.put('/users/update', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await API.get('/users/user');
    return response;
  } catch (error) {
    console.log('Usuario no encontrado');
  }
};

export const logoutUser = async () => {
  try {
    const response = await API.post('/users/logout');
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyPassword = async (password) => {
  try {
    const response = await API.post('/users/verify-password', { password });
    return response;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await API.put('/users/change-password', {
      oldPassword,
      newPassword,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
