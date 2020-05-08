export default function Capitulo(props) {
    return (
        <div className="capitulo" id={`capitulo-${props.titulo}`}>
            <h6>{props.titulo}</h6>
            <p>{props.contenido}</p>
        </div>
    );
}