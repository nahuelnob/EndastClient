import { useLocation } from "react-router"
import style from "./Banner.module.css"

const Banner = () => {
    const location = useLocation()
    const locationPlaca = location.pathname.split('/')
    const placa = locationPlaca[1]
    return (
        <div className={style.container}>
            <p>{placa}</p>
        </div>
    )
}

export default Banner