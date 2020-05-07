export default function Capitulo(props) {
    return (
        <div id="capitulo">
            <h6>{props.titulo}</h6>
            <p>{props.contenido}</p>
        </div>
    );
}