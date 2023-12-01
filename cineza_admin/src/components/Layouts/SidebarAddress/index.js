import iconAddress from "../../../assets/imageButtons/iconAddress.png";
import ButtonSidebar from "../../ButtonSidebar";

const SidebarAddress = () => {
    const context = [
        { text: "Cấp tỉnh", image: iconAddress, href: "/cap-tinh" },

    ]
    return (
        <div className="sidebar-address-container">
            {context.map((ct, index) => {
                return <ButtonSidebar key={index} text={ct.text} image={ct.image} href={ct.href} />
            })}
        </div>
    )

}

export default SidebarAddress;