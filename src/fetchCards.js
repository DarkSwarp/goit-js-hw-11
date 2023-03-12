import axios from 'axios';

API_KEY = '11240134-58b8f655e9e0f8ae8b6e8e7de';
URL = 'https://pixabay.com/api/';

export default async function fetchPhoto(inputText, page) {
  return await axios
    .get(
      `${URL}?key=${API_KEY}&q=${inputText}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    )
    .then(response => response.data);
}
