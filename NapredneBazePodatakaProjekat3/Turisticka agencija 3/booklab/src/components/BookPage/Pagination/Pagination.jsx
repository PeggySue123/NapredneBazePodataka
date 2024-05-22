import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getReviews } from '../../../actions/reviews';
import useStyles from './styles';

const Paginate = ({ page, book_id }) => {
  const { numberOfPages } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (page) {
      dispatch(getReviews(page, book_id));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/books/${book_id}?page=${item.page}&knjiga=${book_id}`} />
      )}
    />
  );
};

export default Paginate;