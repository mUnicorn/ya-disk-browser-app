import { Table, Glyphicon } from "react-bootstrap";
const PropTypes = React.PropTypes;

const ResourceTableCombonent = ({ rows })=> (
    <div className="ResourceTableCombonent">
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Type</th>
                </tr>
           </thead>
           <tbody>
               {rows && rows.map(({ name, type, isFolder, onClick }, index)=> (
                   <tr key={name + index} onClick={onClick}>
                       <td>{index + 1}</td>
                       <td>{name}</td>
                       <td>{isFolder
                            ? <Glyphicon glyph="folder-open" />
                            : <Glyphicon glyph="file" />}
                            &nbsp;
                            {type}
                        </td>
                   </tr>
               ))}
            </tbody>
        </Table>
    </div>
);

ResourceTableCombonent.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.string,
            items: PropTypes.number
        })
    )
};

export default ResourceTableCombonent;
