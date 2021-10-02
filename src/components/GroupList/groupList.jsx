import React from 'react';
import PropTypes from "prop-types";

const GroupList = ({items, valueProperty, contentProperty, onItemsSelect, selectedItem}) => {
    return (
        <>
            <h3>Фильтры</h3>
            <ul className="list-group">
                {Object.keys(items).map(item => (
                    <li className={"list-group-item" + (items[item][contentProperty] === selectedItem ? ' active' : '')}
                        role='button'
                        key={items[item][valueProperty]}
                        onClick={() => onItemsSelect(items[item][contentProperty])}
                    >
                        {items[item][contentProperty]}
                    </li>
                ))}
            </ul>
        </>
    );
};

GroupList.defaultProps = {
    valueProperty: '_id',
    contentProperty: 'name'
}

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string,
    contentProperty: PropTypes.string,
    selectedItem: PropTypes.string,
    onItemsSelect: PropTypes.func
}

export default GroupList;