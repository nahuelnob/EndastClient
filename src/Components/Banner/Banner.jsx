import { useLocation } from "react-router"
import style from "./Banner.module.css"

const Banner = () => {
    const location = useLocation()
    const locationPlaca = location.pathname.split('/')
    const placa = locationPlaca[1]
    return (
        <div className={style.container}>
            <h1>{placa}</h1>
        </div>
    )
}

export default Banner