const Input = ({ props, valores, handleChange }) => {


    return (
        <label>
            {props.titulo}
            <input type={props.tipo} value={valores[props.key]} name={props.key} onChange={handleChange}></input>
        </label >
    );
}

export default Input;