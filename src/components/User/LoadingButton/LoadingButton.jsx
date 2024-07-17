import PropTypes from 'prop-types';
import { useRef } from 'react';
import './LoadingButton.css'
import 'boxicons/css/boxicons.min.css';

const Button = (props) => {
    const btnRef = useRef();
    return (
        <button
            type="button"
            ref={btnRef}
            className='loading-btn w-auto form-btn mt-2 font-medium rounded '
            onClick={props.onClick}
        >
            <span className={`spinner ${props.loading ? 'active' : ''}`}>
                <i className='bx bx-loader-alt bx-spin'></i>
            </span>
            <span className="txt">
                {props.children}
            </span>
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
    onClick: PropTypes.func
};

export default Button;