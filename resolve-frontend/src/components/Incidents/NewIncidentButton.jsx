import "../../styles/NewIncidentButton.css";

function NewIncidentButton({ onClick }) {

    return (

        <button
            className="new-incident-btn"
            onClick={onClick}
        >

            + Nueva incidencia

        </button>

    );

}

export default NewIncidentButton;