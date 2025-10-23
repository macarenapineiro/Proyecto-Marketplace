import './ButtonBlack.css'
export default function ButtonBlack({text, type = "button", onClick}) {
    return (
        <button className="button-black" type={type} onClick={onClick}>
            {text}
        </button>
    )
}
