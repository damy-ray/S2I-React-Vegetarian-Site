const Input = ({ setValue }) => {
    return <input type="text"
        className="inputStyle"
        placeholder='Type a vegetarian ingredient...'
        onChange={(e) => setValue(e.target.value)}
    />
}


export default Input;


