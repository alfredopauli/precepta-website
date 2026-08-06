import { Link } from 'react-router-dom'
import '../style/EditSubHeader.css';


const EditSubHeader = () => {
  return (
    <div className="subheader">
      <nav>
        <Link to="/editarAulas" className="edit-links">
          Editar aulas
        </Link>
        <Link to="/editarProfessores" className="edit-links">
          Editar professores
        </Link>
      </nav>
    </div>
  );
}

export default EditSubHeader;

