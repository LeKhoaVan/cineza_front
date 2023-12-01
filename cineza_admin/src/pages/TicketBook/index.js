import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import Alert from "../../components/Alert";
import "./ticketBook.css";
import {
    formatDateHandle,
    formatFromObjectToDate,
} from "../../components/util/index";

import { useEffect, useState } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from '@mui/material/FormLabel';
import Select from "@mui/material/Select";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { parse, format } from "date-fns";
import vi from "date-fns/locale/vi";
registerLocale("vi", vi);

const TicketBook = () => {

    const [selectBy, setSelectBy] = useState("phim")
    const handleChangeSelectBy = (event) => {
        setSelectBy(event.target.value)
    }

    const [seats, setSeats] = useState(new Array(36).fill(false)); // Mảng ghế với giá trị ban đầu là "false"

    const [allMovie, setAllMovie] = useState([]);
    const [allRap, setAllRap] = useState([]);
    const [allSeat, setAllSeat] = useState([].fill(false))
    const [allShowing, setAllShowing] = useState([]);

    const [codeMovie, setCodeMovie] = useState("")
    const [codeRap, setCodeRap] = useState("");
    const [codeSeat, setCodeSeat] = useState("")
    const [codeShowing, setCodeShowing] = useState("")
    const [codeUser, setCodeUser] = useState("user02")

    const [showing, setShowing] = useState("");

    const toggleSeat = (index, isOccupied) => {
        const newSeats = [...allSeat]; // Tạo một bản sao của mảng ghế
        newSeats[index] = !newSeats[index]; // Đảo ngược trạng thái của ghế
        setAllSeat(newSeats); // Cập nhật trạng thái ghế
        setCodeSeat(isOccupied.code)
        console.log(isOccupied)
    };

    useEffect(() => {
        const loadMovieOrRap = async () => {
            if (selectBy === "phim") {
                const movies = await axios.get(`http://13.212.32.129:9000/cineza/api/v1/movie/get-all`);
                if (movies.status === 200) {
                    setAllMovie(movies.data);
                    setAllRap([])
                    setCodeRap("")
                    setCodeShowing("")
                } else {
                    console.error("get all movie fail");
                }
            } else if (selectBy === "rap") {
                const raps = await axios.get(`http://13.212.32.129:9000/cineza/api/v1/rap/get-all`);
                if (raps.status === 200) {
                    setAllRap(raps.data);
                    setAllMovie([])
                    setCodeMovie("")
                    setCodeShowing("")
                } else {
                    console.error("get all rap fail");
                }
            }
        };

        loadMovieOrRap()
    }, [selectBy])

    const handleChangeComboboxRap = (event) => {
        setCodeRap(event.target.value);
    }
    const handleChangeComboboxMovie = (event) => {
        setCodeMovie(event.target.value)
    }

    const handleChangeComboboxSuat = (event) => {
        setCodeShowing(event.target.value);
    }

    const handleClick = async () => {
        try {
            if (codeShowing != "" && codeMovie != "") {
                const saveTicket = await axios.post(`http://13.212.32.129:9000/cineza/api/v1/ticket/create`, {
                    "codeShowing": codeShowing,
                    "codeSeat": codeSeat,
                    "codeUser": "user02",
                    "status": "ACTIVE"
                })
            }
        } catch (error) {
            console.log("save ticket fail: " + error);
        }
    }

    useEffect(() => {
        const loadRap = async () => {
            if (codeMovie != "") {
                const showings = await axios.get(`http://13.212.32.129:9000/cineza/api/v1/show/get-all-by-movie/${codeMovie}`)

                // Sử dụng Set để loại bỏ rạp trùng lặp
                // const uniqueRaps = [...showings.data?.map(async (show) => {
                //     const rap = await axios.get(`http://13.212.32.129:9000/cineza/api/v1/rap/get-by-code/${show.codeRap}`)
                //     return rap.data
                // })];
                // console.log(uniqueRaps)
                // setAllRap(uniqueRaps)

                async function fetchData() {
                    const rapPromises = showings.data?.map(async (show) => {
                        const rapResponse = await axios.get(`http://13.212.32.129:9000/cineza/api/v1/rap/get-by-code/${show.codeRap}`);
                        return rapResponse.data;
                    });

                    // Chờ cho tất cả các promise hoàn thành
                    const rapDataArray = await Promise.all(rapPromises);

                    // Bây giờ rapDataArray chứa kết quả từ tất cả các request axios
                    const uniqueRaps = [...new Set(rapDataArray)];
                    setAllRap(uniqueRaps)
                }
                fetchData();
            }
        };
        loadRap();
    }, [codeMovie])


    useEffect(() => {
        const loadMovie = async () => {
            if (codeRap != "") {
                const showings = await axios.get(`http://13.212.32.129:9000/cineza/api/v1/show/get-all-by-rap/${codeRap}`)

                async function fetchDataMovie() {
                    const moviePromises = showings.data?.map(async (show) => {
                        const movieResponse = await axios.get(`http://13.212.32.129:9000/cineza/api/v1/movie/${show.codeMovie}`);
                        return movieResponse.data;
                    });

                    // Chờ cho tất cả các promise hoàn thành
                    const movieDataArray = await Promise.all(moviePromises);

                    // Bây giờ rapDataArray chứa kết quả từ tất cả các request axios
                    const uniqueMovies = [...new Set(movieDataArray)];
                    console.log(uniqueMovies)
                    setAllMovie(uniqueMovies)
                }
                fetchDataMovie();
            }
        };
        loadMovie();
    }, [codeRap])

    useEffect(() => {
        if (codeMovie != "" && codeRap != "") {
            const getShowing = async () => {
                const showings = await axios.get(`http://13.212.32.129:9000/cineza/api/v1/show//get-by-movie-and-rap/${codeMovie}/${codeRap}`)
                if (showings.status === 200) {
                    setAllShowing(showings.data);
                } else {
                    console.log("error get showings")
                }
            };
            getShowing();
        }
    }, [codeMovie, codeRap])

    useEffect(() => {
        if (codeShowing != "") {
            const getShowing = async () => {
                const showing = await axios.get(`http://13.212.32.129:9000/cineza/api/v1/show/get-by-code/${codeShowing}`)
                setShowing(showing.data)

                const allSeat = await axios.get(`http://13.212.32.129:9000/cineza/api/v1/seat/get-all-by-room/${showing.data.codeRoom}`)
                const resutl = allSeat.data
                setAllSeat(resutl);
            };
            getShowing()
        }
    }, [codeShowing])

    return (
        <div className="book-ticket-container">
            <div className="book-action-book">
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Đặt vé theo:</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        row
                        value={selectBy}
                        onChange={handleChangeSelectBy}
                    >
                        <FormControlLabel value="phim" control={<Radio />} label="Phim" />
                        <FormControlLabel value="rap" control={<Radio />} label="Rạp" />
                    </RadioGroup>
                </FormControl>

                <div className="book-action-select-movie-rap">
                    <FormControl
                        sx={{ width: "42%", }}
                        size="small"
                    >
                        <InputLabel id="demo-select-small-label">
                            Chọn phim
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            // value={codeUser}
                            label="Chọn phim"
                            onChange={handleChangeComboboxMovie}
                        // onFocus={onHandleFocusCodeUser}
                        // readOnly={!edit}
                        // style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                        >
                            {allMovie.map((st, index) => {
                                return (
                                    <MenuItem key={index} value={st.code}>
                                        {st.code} - {st.movieName}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>

                    <FormControl
                        sx={{ width: "42%", }}
                        size="small"
                    >
                        <InputLabel id="demo-select-small-label">
                            Chọn Rạp
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            // value={codeUser}
                            label="Chọn Rạp"
                            onChange={handleChangeComboboxRap}
                        // onFocus={onHandleFocusCodeUser}
                        // readOnly={!edit}
                        // style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                        >
                            {allRap.map((st, index) => {
                                return (
                                    <MenuItem key={index} value={st.code}>
                                        {st.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>

                <FormControl
                    sx={{ width: "42%", marginTop: "15px" }}
                    size="small"
                >
                    <InputLabel id="demo-select-small-label">
                        Chọn suất
                    </InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={codeShowing}
                        label="Chọn suất"
                        onChange={handleChangeComboboxSuat}
                    // onFocus={onHandleFocusCodeUser}
                    // readOnly={!edit}
                    // style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                    >
                        {allShowing?.map((st, index) => {
                            return (
                                <MenuItem key={index} value={st.code}>
                                    {formatDateHandle(st.showDate)} - {st.screenAt} - {st.nameRoom}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

                <h5 style={{ paddingTop: "20px" }}>Chọn ghế trong rạp chiếu phim</h5>
                <div className="seat-container">
                    {seats?.map((isOccupied, index) => (
                        <div
                            key={index}
                            className={`seat ${isOccupied ? 'occupied' : ''}`}
                            onClick={() => toggleSeat(index, isOccupied)}
                        >
                            Ghế {index + 1}
                        </div>
                    ))}
                </div>
                <div className="book-action-button">
                    <button className="btn-book" onClick={handleClick}>Đặt vé</button>
                    <button className="btn-cancel">Hủy</button>
                </div>
            </div>
            <div className="book-ticket-content">
                <h3>Thông tin vé</h3>
                <div className="information-ticket">
                    <p>Khách hàng: Văn</p>
                    <p>Tên phim:    {showing.movieName}</p>
                    <p>Tên Rạp:     {showing.codeRap}</p>
                    <p>Tên phòng:   {showing.codeRoom}</p>
                    <p>Ngày chiếu:  {showing.showDate == null ? "" : formatDateHandle(showing.showDate)}</p>
                    <p>Giờ chiếu:   {showing.screenAt}</p>
                    <p>Mã Ghế:</p>
                    <p>Vị trí ghế: </p>
                </div>
            </div>
        </div>
    );
};

export default TicketBook;
