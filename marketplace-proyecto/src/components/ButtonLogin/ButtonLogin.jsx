import './ButtonLogin.css'
export default function ButtonLogin({text, type = "button", onClick}) {
    return (
        <button className="button-login" type={type} onClick={onClick}>
            {text}
        </button>
    )
}
