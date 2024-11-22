import './App.css'


const Message = ({message, isPositive}) => {
  let tyyli = isPositive ? "pos" : "neg";

  // Tarkista, että message on merkkijono
  const displayedMessage = typeof message === 'string' 
    ? message 
    : JSON.stringify(message);

  return (
    <div className={tyyli}>
      {displayedMessage}
    </div>
  );
}

export default Message;
