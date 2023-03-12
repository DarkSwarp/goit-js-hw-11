import axios from 'axios';

const API_KEY = '34337580-4a6e8b796eace0e632a6af18e';
const URL = 'https://pixabay.com/api/';

export default async function fetchPhoto(inputText, page) {
  return await axios
    .get(
      `${URL}?key=${API_KEY}&q=${inputText}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    )
    .then(response => response.data);
}
