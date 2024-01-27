import { useDispatch } from "react-redux";
import { filterAnecdotes } from "../reducers/filterReducer";

export const AnecdoteFilter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    event.preventDefault();
    const filter = event.target.value;
    if (!filter) {
      dispatch(filterAnecdotes(null));
    } else {
      dispatch(filterAnecdotes(filter));
    }
  };

  return (
    <>
      filter
      <input name="filter" onChange={handleFilterChange} />
    </>
  );
};
