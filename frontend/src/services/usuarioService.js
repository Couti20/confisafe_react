import api from './api';

/**
 * Serviço para gerenciamento de usuários/funcionários
 */
const usuarioService = {
  /**
   * Lista todos os usuários
   * @returns {Promise<Array>}
   */
  listar: async () => {
    try {
      const response = await api.get('/usuarios');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao listar usuários' };
    }
  },

  /**
   * Busca usuário por ID
   * @param {number} id 
   * @returns {Promise<object>}
   */
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar usuário' };
    }
  },

  /**
   * Cria novo usuário
   * @param {object} usuarioData 
   * @returns {Promise}
   */
  criar: async (usuarioData) => {
    try {
      const response = await api.post('/usuarios', usuarioData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao criar usuário' };
    }
  },

  /**
   * Atualiza dados do usuário
   * @param {number} id 
   * @param {object} usuarioData 
   * @returns {Promise}
   */
  atualizar: async (id, usuarioData) => {
    try {
      const response = await api.put(`/usuarios/${id}`, usuarioData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao atualizar usuário' };
    }
  },

  /**
   * Remove usuário
   * @param {number} id 
   * @returns {Promise}
   */
  remover: async (id) => {
    try {
      const response = await api.delete(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao remover usuário' };
    }
  },

  /**
   * Atualiza foto de perfil
   * @param {number} id 
   * @param {File} file 
   * @returns {Promise}
   */
  atualizarFotoPerfil: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append('foto', file);
      
      const response = await api.put(`/usuarios/${id}/foto`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao atualizar foto' };
    }
  },

  /**
   * Busca usuários por departamento
   * @param {string} departamento 
   * @returns {Promise<Array>}
   */
  buscarPorDepartamento: async (departamento) => {
    try {
      const response = await api.get(`/usuarios/departamento/${departamento}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar usuários' };
    }
  }
};

export default usuarioService;
