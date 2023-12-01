import { Link } from "react-router-dom";
import "./tableInPage.css";

const TableInPage = ({ column, data, onClickRow }) => {
    return (
        <table className="table-inpage-container ">
            <thead>
                <tr>
                    {column?.map((title, index) => {
                        return (
                            <th key={index} className="table-inpage-title">{title.title}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>

                {data?.map((dt, index) => {
                    return (
                        <tr key={index} className="table-inpage-content">
                            {column?.map((title, idx) => {
                                return (
                                    <td onClick={() => onClickRow(dt["code"])} style={{ padding: 12 }} key={idx}>
                                        {dt[title.data]}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
}

export default TableInPage;