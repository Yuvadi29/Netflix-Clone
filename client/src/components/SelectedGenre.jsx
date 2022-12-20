import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FetchDataByGenre } from '../store';

const SelectedGenre = ({ genres, type }) => {
  const dispatch = useDispatch();
  return (
    <Select className='flex' onChange={e => {
      dispatch(FetchDataByGenre({ genre: e.target.value, type }));
    }}>
      {genres.map((genre) => {
        return (
          <option value={genre.id}
            key={genre.id}
          >{genre.name}
          </option>
        );
      })}
    </Select>
  );
}

export default SelectedGenre;

const Select = styled.select`
  margin-left: 4.5rem;
  cursor: pointer;
  font-size: 1.357rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
  border: none;
  background-color: #333;
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;