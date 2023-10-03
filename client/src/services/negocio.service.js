import { API } from './service.config';

export const createNegocio = async (formData) => {
  try {
    const response = await API.post('/negocios/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getNegocios = async () => {
  try {
    const response = await API.get('/negocios');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getNegocio = async (id) => {
  try {
    const response = await API.get(`/negocios/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateNegocio = async (id, formData) => {
  try {
    const response = await API.patch(`/negocios/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteNegocio = async (id) => {
  try {
    const response = await API.delete(`/negocios/delete/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createServicioForNegocio = async (id, formData) => {
  try {
    const response = await API.post(`/negocios/servicios/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getServiciosForNegocio = async (id) => {
  try {
    const response = await API.get(`/negocios/servicios/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const searchNegocios = async (query) => {
  try {
    const response = await API.get(`/negocios/search/${query}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getNegociosByCategory = async (category) => {
  try {
    const response = await API.get(`/negocios/category/${category}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getReservasByNegocio = async (id) => {
  try {
    const response = await API.get(`/negocios/reservas/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
