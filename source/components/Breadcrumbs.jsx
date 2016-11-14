import { Breadcrumb } from "react-bootstrap";
const { PropTypes } = React;

const Breadcrumbs = ({ items })=> {
    return <Breadcrumb>
        {items.map(({ active, text, onClick }, index)=> (
            <Breadcrumb.Item active={active} key={text + index} onClick={onClick}>
              {text}
            </Breadcrumb.Item>
        ))}
  </Breadcrumb>
};

Breadcrumbs.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            active: PropTypes.bool,
            text: PropTypes.string,
            onClick: PropTypes.func
        })
    )
};

export default Breadcrumbs;
