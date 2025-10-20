import './InformationCard.css'
export default function InformationCard({ type, name, placeholder, text }) {
   return (
      <div className="input-container">
        <label className="label" htmlFor={name}>{text}</label>
        <input type={type} id={name} name={name} placeholder={placeholder} />
    </div>
   )
}