import React from 'react';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import { getFilterQuery, store } from '../../app/store';
import { actions as filterActions } from '../../features/filter';

enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoFilter: React.FC = () => {
  const query: string = useSelector(getFilterQuery);

  return (
    <form
      className="field has-addons"
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              const newStatus = event.target.value;

              if (newStatus === Status.All
                || newStatus === Status.Active
                || newStatus === Status.Completed
              ) {
                store.dispatch(filterActions.setStatus(newStatus));
              }
            }}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(event) => {
            store.dispatch(filterActions.setQuery(event.target.value));
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => {
                  store.dispatch(filterActions.resetQuery());
                }}
              />
            </>
          )}
        </span>
      </p>
    </form>
  );
};
