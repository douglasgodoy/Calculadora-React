import React from 'react';


export default props => <div style={DisplayStyle} className="display">{props.value}</div>


const DisplayStyle = {
    gridColumn: 'span 4',
    backgroundColor: '#000',
    display:'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '20px',
    fontSize: '2.1em',
    overflow: 'hidden'
}
