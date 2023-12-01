import { Link } from "react-router-dom";
import "./table.css";

const Table = ({ column, data, onRowClick, toLink, toPromotion, toLinkUser }) => {
    return (
        <table className="table-container">
            <thead>
                <tr>
                    {column.map((title, index) => {
                        return (
                            <th key={index} className="table-title">{title.title}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>

                {data.map((dt, index) => {
                    return (
                        <tr key={index} className="table-content" onClick={() => onRowClick(dt["code"])}>
                            {column.map((title, idx) => {
                                return (
                                    <td style={{ padding: 12 }} key={idx}>
                                        <Link
                                            style={{ textDecoration: "none" }}
                                            to={toLink != null ? toLink + dt["level"] :
                                                (toPromotion != null ? toPromotion + dt["code"] :
                                                    (toLinkUser != null ? toLinkUser + dt["level"] : ""))}>
                                            {dt[title.data]}
                                        </Link>
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

export default Table;