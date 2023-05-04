const axios = require('axios');
const baseUrl = 'http://localhost:3000';

async function getAllNovels() {
  try {
    const response = await axios.get(`${baseUrl}/novels`);
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.error(err);
    return { error: 'Error fetching novels' };
  }
}

async function addNovel(novel) {
  try {
    const response = await axios.post(`${baseUrl}/novels`, novel);
    return response.data;
  } catch (err) {
    console.error(err);
    return { error: 'Error adding novel' };
  }
}

async function updateNovel(id, novel) {
  try {
    const response = await axios.patch(`${baseUrl}/novel/${id}`, novel);
    return response.data;
  } catch (err) {
    console.error(err);
    return { error: 'Error updating novel' };
  }
}

async function deleteNovel(id) {
  try {
    const response = await axios.delete(`${baseUrl}/novel /${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return { error: 'Error deleting novel' };
  }
}

module.exports= {getAllNovels , deleteNovel ,updateNovel , addNovel }