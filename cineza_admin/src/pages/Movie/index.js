import React, { useEffect, useState } from "react";
import MovieDetail from "../MovieDetail";
import axios from "axios";
import iconFind from "../../assets/imageButtons/iconFind.png";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import "./movie.css";
import { formatDateHandle } from "../../components/util";

const Movie = () => {
  const [openDetail, setOpenDetail] = useState(false);
  const [movie, setMovie] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [search, setSearch] = useState("");

  const [openDetailAdd, setOpenDetailAdd] = useState(false);

  const handleOnClick = (movie) => {
    console.log(movie);
    setMovie(movie);
    setOpenDetailAdd(false);
    setOpenDetail(true);
  };
  const handleOnClickCloseP = () => {
    // window.location.href = "/cineza/admin/movie";
    setOpenDetailAdd(false);
    setOpenDetail(false);
  };
  const handleOnClickAdd = () => {
    setOpenDetail(false);
    setOpenDetailAdd(true);
  };

  const onChangeHandleFind = (text) => {
    setSearch(text.target.value);
    console.log(text.target.value);
  };

  useEffect(() => {
    const findMovie = async () => {
      const movies = await axios.get(
        `http://13.212.32.129:9000/cineza/api/v1/movie/get-all?movieName=${search}`
      );
      if (movies.status === 200) {
        setMovieData(movies.data);
      } else {
        console.error("error get movie :");
      }
    };
    findMovie();
  }, [search]);

  // get all movie
  const getAllMovie = async () => {
    const allMovie = await axios.get(
      `http://13.212.32.129:9000/cineza/api/v1/movie/get-all`
    );
    if (allMovie.status == 200) {
      setMovieData(allMovie.data);
    } else {
      console.log("error get all movie");
    }
  };

  useEffect(() => {
    getAllMovie();
  }, []);

  useEffect(() => {
    getAllMovie();
  }, [openDetail]);

  useEffect(() => {
    getAllMovie();
  }, [openDetailAdd]);

  return (
    <div className="movie-container">
      <div className="movie-header">
        <div className="movie-header-find">
          <input
            id="find"
            className="movie-input-find"
            placeholder="tên phim"
            onChange={onChangeHandleFind}
          />
          <img
            className="movie-button-img"
            src={iconFind}
            alt="tìm kiếm"
            htmlFor="find"
          />
        </div>
        <div className="movie-header-add">
          <img
            className="movie-button-add"
            src={iconAdd}
            alt="thêm"
            onClick={handleOnClickAdd}
          />
        </div>
      </div>
      <div className="movie-list">
        {movieData.map((movie, index) => (
          <div
            className="movie-card"
            key={movie.id}
            onClick={() => handleOnClick(movie)}
          >
            <img
              className="movie-poster"
              src={movie.moviePoster}
              alt={movie.title}
            />
            <div className="movie-details">
              <h2>
                {movie.code} - {movie.movieName}
              </h2>
              <p>Ngày ra mắt: {formatDateHandle(movie.startDate)}</p>
              <p>Đạo diễn: {movie.director}</p>
              <p>Diễn viên: {movie.actor}</p>
              <p>Thời lượng: {movie.movieTime} phút</p>
              <p>Trạng thái: {movie.status}</p>
            </div>
          </div>
        ))}
      </div>
      {openDetail && (
        <MovieDetail
          onClickHandleClose={handleOnClickCloseP}
          movieClick={movie}
        />
      )}

      {openDetailAdd && (
        <MovieDetail onClickHandleClose={handleOnClickCloseP} addBtn={true} />
      )}
    </div>
  );
};

export default Movie;
