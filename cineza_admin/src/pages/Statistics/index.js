import React, { useEffect, useState } from 'react'
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

import './statistics.css'
import axios from 'axios';

function Statistics() {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("Tất cả");

    const [titleXValue, setTitleXValue] = useState("Năm")

    const [selectMonth, setSelectMonth] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);
    const [dataChartValue, setDataChartValue] = useState({
        labels: [""],
        datasets: [{
            label: "Doanh thu",
            data: [0]
        }]
    });

    const [totalTicket, setTotalTicket] = useState(0);
    const [dataChartMovie, setDataChartMovie] = useState({
        labels: [""],
        datasets: [{
            label: "Tổng số vé",
            data: [0]
        }]
    });

    useEffect(() => {
        const statisticsValue = async () => {
            let yearData = "";
            if (year == "Tất cả") {
                yearData = ""
            } else {
                yearData = year
            }
            const dataStatistics = await axios.get(`http://localhost:9000/cineza/api/v1/statistics/year?year=${yearData}&month=${month}`)
            if (dataStatistics.status === 200) {
                let total = 0;
                const newData = {
                    labels: dataStatistics.data.map(value => {
                        return value.title
                    }),
                    datasets: [{
                        label: "Doanh thu",
                        data: dataStatistics.data.map(value => {
                            total += value.totalPrice
                            return value.totalPrice / 1000
                        }),
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        barThickness: 20, // Đặt kích thước của các cột
                    }]
                };
                setTotalPrice(total)
                setDataChartValue(newData);
            }
        };
        statisticsValue();
    }, [year, month])

    useEffect(() => {
        const statisticsTicket = async () => {
            let yearData = "";
            let total = 0;
            if (year == "Tất cả") {
                yearData = ""
            } else {
                yearData = year
            }
            const totalTicket = await axios.get(`http://localhost:9000/cineza/api/v1/statistics/get-total-ticket?year=${yearData}&month=${month}`)
            if (totalTicket.status === 200) {
                for (let t of totalTicket.data) {
                    total += t.totalTicket
                }
                setTotalTicket(total);
            }
            const dataStatistics = await axios.get(`http://localhost:9000/cineza/api/v1/statistics/top-5-movie?year=${yearData}&month=${month}`)
            if (dataStatistics.status === 200) {
                const newData = {
                    labels: dataStatistics.data.map(value => {
                        return value.movieName
                    }),
                    datasets: [{
                        label: "Tổng số vé",
                        data: dataStatistics.data.map(value => {
                            return value.totalTicket
                        }),
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        barThickness: 50, // Đặt kích thước của các cột
                    }]
                };
                setDataChartMovie(newData);
            }
        };
        statisticsTicket();
    }, [year, month])


    const optionsValue = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: `${titleXValue}`,
                    color: 'red',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Ngàn (VND)',
                    color: 'red',
                },
            },
        },
        aspectRatio: 886 / 260,
    };

    const optionsTicket = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Số vé',
                    color: 'red',
                },
            },
        },
        aspectRatio: 886 / 260,
    };


    return (
        <div className='statistics-container'>
            <div className='statistics-header'>
                <div className="statistics-month">
                    <div style={{ width: '49%' }}>Chọn Tháng:</div>
                    <FormControl
                        sx={{ width: "100%" }}
                        size="small"
                    >
                        {/* <InputLabel id="demo-select-small-label">Status</InputLabel> */}
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={month}
                            // label="Tháng"
                            onChange={(text) => {
                                setTitleXValue("Ngày")
                                setMonth(text.target.value)
                            }}
                            readOnly={!selectMonth}
                            style={selectMonth ? { width: '130px' } :
                                { background: "rgb(196, 196, 196)", width: '130px' }
                            }
                        >
                            {dataMonths.map((st, index) => {
                                return (
                                    <MenuItem key={index} value={st.id}>
                                        {st.value}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>

                <div className="statistics-year">
                    <div style={{ width: "66%" }}>Chọn năm:</div>
                    <FormControl
                        sx={{ width: "100%" }}
                        size="small"
                    >
                        {/* <InputLabel id="demo-select-small-label">Năm</InputLabel> */}
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={year}
                            // label="Năm"
                            onChange={(text) => {
                                if (text.target.value != "Tất cả") {
                                    if (titleXValue !== "Ngày") {
                                        setTitleXValue("Tháng")
                                    }
                                    setSelectMonth(true)
                                } else {
                                    setMonth("")
                                    setTitleXValue("Năm")
                                    setSelectMonth(false)
                                }
                                setYear(text.target.value)
                            }}
                            style={
                                { width: '130px' }
                            }
                        >
                            {dataYears.map((st, index) => {
                                return (
                                    <MenuItem key={index} value={st.id}>
                                        {st.value}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div style={{ display: 'flex', flex: 1 }}></div>
            </div>

            <div className='statistics-content'>
                <div className='statistics-value'>
                    <div className='statistics-title'>
                        <p style={{ padding: 10 }}>Tổng doanh thu: <br /> </p>
                        <p style={{ paddingLeft: 10, fontSize: 20 }}>{parseFloat(totalPrice).toLocaleString('vi-VN')} VND</p>
                    </div>
                    <div className='statistics-chart-value'>
                        <Bar data={dataChartValue} options={optionsValue} />
                    </div>
                </div>

                <div className='statistics-movie'>
                    <div className='statistics-title'>
                        <p style={{ padding: 10 }}>Tổng vé: <br /> </p>
                        <p style={{ paddingLeft: 10, fontSize: 20 }}>{parseFloat(totalTicket).toLocaleString('vi-VN')} Vé</p>
                        <p style={{ padding: 10, paddingTop: 20 }}>Biểu đồ top 5 phim có số vé cao nhất:<br /> </p>
                    </div>

                    <div className='statistics-chart-value'>
                        <Bar data={dataChartMovie} options={optionsTicket} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const dataMonths = []
for (let month = 1; month <= 12; month++) {
    const dataMonth = {
        id: String(month).padStart(2, '0'),
        value: `Tháng ${String(month).padStart(2, '0')}`
    }
    dataMonths.push(dataMonth)
};

const dataYears = [];
dataYears.push({ id: "Tất cả", value: 'Tất cả' })
for (let year = 2000; year <= 2100; year++) {
    const dataYear = {
        id: year.toString(),
        value: `Năm ${year.toString()}`
    };

    dataYears.push(dataYear);
}

export default Statistics