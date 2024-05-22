import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
export const fetchUser = (id) => API.get(`/user/${id}`);
export const fetchUsers = (page) => API.get(`/user?page=${page}`);
export const updateUser = (id, updatedUser) => API.patch(`/user/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/user/${id}`);

export const fetchGroup = (id) => API.get(`/grupas/${id}`);
export const fetchGroups = (page) => API.get(`/grupas?page=${page}`);
export const fetchGroupsBySearch = (searchQuery) => API.get(`/grupas/search?genres=${searchQuery.genres}`);
export const fetchGroupsByUser = (userId) => API.get(`/grupas/user/${userId}`);
export const createGroup = (newGroup) => API.post('/grupas', newGroup);
export const updateGroup = (id, updatedGroup) => API.patch(`/grupas/${id}`, updatedGroup);
export const comment = (value, id) => API.post(`/grupas/${id}/commentGroup`, { value });
export const deleteGroup = (id) => API.delete(`/grupas/${id}`);

export const fetchBook = (id) => API.get(`/knjigas/${id}`);
export const fetchBooks = (page) => API.get(`/knjigas?page=${page}`);
export const fetchBooksBySearch = (searchQuery) => API.get(`/knjigas/search?genres=${searchQuery.genres}`);
export const createBook = (newBook) => API.post('/knjigas', newBook);
export const updateBook = (id, updatedBook) => API.patch(`/knjigas/${id}`, updatedBook);
export const commentBook = (value, id) => API.post(`/knjigas/${id}/commentBook`, { value });
export const deleteBook = (id) => API.delete(`/knjigas/${id}`);

export const fetchUsersBooks = (id_korisnika) => API.get(`/usersBooks?user=${id_korisnika}`);
export const createUsersBook = (newUsersBook) => API.post('/usersBooks', newUsersBook);
export const updateUsersBook = (id, updatedUsersBook) => API.patch(`/usersBooks/${id}`, updatedUsersBook);
export const deleteUsersBook = (id) => API.delete(`/usersBooks/${id}`);

export const fetchNews = (page) => API.get(`/news?page=${page}`);
export const createNews = (newNews) => API.post('/news', newNews);
export const updateNews = (id, updatedNews) => API.patch(`/news/${id}`, updatedNews);
export const deleteNews = (id) => API.delete(`/news/${id}`);

export const fetchAd = (id) => API.get(`/ads/${id}`);
export const fetchAds = (page) => API.get(`/ads?page=${page}`);
//export const fetchAllAds = () => API.get(`/ads`);
export const fetchAdsBySearch = (searchQuery) => API.get(`/ads/search?genres=${searchQuery.genres}`);
//export const fetchAdsByUser = (id) => API.get(`/ads/user/${id}`);
export const createAd = (newAd) => API.post('/ads', newAd);
export const updateAd = (id, updatedAd) => API.patch(`/ads/${id}`, updatedAd);
export const deleteAd = (id) => API.delete(`/ads/${id}`);

export const fetchMessages = (id_grupe) => API.get(`/messages?grupa=${id_grupe}`);
export const fetchMessage = (id) => API.get(`/messages/${id}`);
export const createMessage = (newMessage) => API.post('/messages', newMessage);
export const updateMessage = (id, updatedMessage) => API.patch(`/messages/${id}`, updatedMessage);
export const deleteMessage = (id) => API.delete(`/messages/${id}`);

export const fetchReviews = (page, id_knjige) => API.get(`/reviews?page=${page}&knjiga=${id_knjige}`);
export const createReview = (newReview) => API.post('/reviews', newReview);
export const updateReview = (id, updatedReview) => API.patch(`/reviews/${id}`, updatedReview);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);