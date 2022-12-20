import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NotAvailable from '../components/NotAvailable';
import Slider from '../components/Slider';
import { GetGenres, FetchMovies } from '../store';
import styled from 'styled-components';
import { firebaseAuth } from '../utils/Firebase-Config';
import SelectedGenre from '../components/SelectedGenre';


const Movies = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const genres = useSelector((state) => state.netflix.genres);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const movies = useSelector((state) => state.netflix.movies);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetGenres());
    }, []);


    useEffect(() => {
        if (genresLoaded) {
            dispatch(FetchMovies
                ({ genres, type: "movie" })
            );
        }
    },[genresLoaded]);


    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        // if (currentUser) navigate('/');
    });


    return (
        <Container>
            <div className="navbar">
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className="data">
                <SelectedGenre genres={genres} type="movie"/>
                {
                    movies.length ? <Slider movies={movies} /> : <NotAvailable />
                }
            </div>
        </Container>
    );
}

export default Movies;

const Container = styled.div`
.data {
    margin-top: 8rem;
    .notavailable {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

