import React from "react";
import { connect } from "react-redux";

import {
  fetchBooks,
  setSortBy,
  setSortOrder
} from "../actions/booksActions";

class BooksList extends React.Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  getSortedBooks() {
    const {
      books,
      sortBy,
      sortOrder
    } = this.props;

    const sortedBooks = [...books];

    sortedBooks.sort((a, b) => {
      let valueA = "";
      let valueB = "";

      if (sortBy === "title") {
        valueA = a.title || "";
        valueB = b.title || "";
      }

      if (sortBy === "author") {
        valueA = a.author || "";
        valueB = b.author || "";
      }

      if (sortBy === "publisher") {
        valueA = a.publisher || "";
        valueB = b.publisher || "";
      }

      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }

      return 0;
    });

    return sortedBooks;
  }

  handleSortBy = event => {
    this.props.setSortBy(event.target.value);
  };

  handleSortOrder = event => {
    this.props.setSortOrder(event.target.value);
  };

  render() {
    const {
      loading,
      error,
      sortBy,
      sortOrder
    } = this.props;

    const books = this.getSortedBooks();

    return (
      <div className="books-container">

        <h1>Book Sorting App</h1>

        <div className="sorting-options">

          <select
            value={sortBy}
            onChange={this.handleSortBy}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
          </select>

          <select
            value={sortOrder}
            onChange={this.handleSortOrder}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

        </div>

        {loading && <p>Loading books...</p>}

        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <table>

            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>ISBN</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book, index) => (
                <tr key={book.primary_isbn13 || index}>

                  <td>{book.title}</td>

                  <td>{book.author}</td>

                  <td>{book.publisher}</td>

                  <td>
                    {book.primary_isbn13}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books,
  loading: state.loading,
  error: state.error,
  sortBy: state.sortBy,
  sortOrder: state.sortOrder
});

const mapDispatchToProps = {
  fetchBooks,
  setSortBy,
  setSortOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksList);