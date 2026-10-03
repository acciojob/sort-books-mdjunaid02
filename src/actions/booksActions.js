import axios from "axios";

export const fetchBooks = () => {
  return async dispatch => {
    dispatch({
      type: "FETCH_BOOKS_REQUEST"
    });

    try {
      const response = await axios.get(
  `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`
);

      dispatch({
        type: "FETCH_BOOKS_SUCCESS",
        payload: response.data.results.books
      });
    } catch (error) {
      dispatch({
        type: "FETCH_BOOKS_FAILURE",
        payload: error.message
      });
    }
  };
};

export const setSortBy = sortBy => ({
  type: "SET_SORT_BY",
  payload: sortBy
});

export const setSortOrder = sortOrder => ({
  type: "SET_SORT_ORDER",
  payload: sortOrder
});