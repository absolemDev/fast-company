import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    const getItems = (items) =>
        Array.isArray(items) ? items : Object.values(items);
    return (
        <ul className="list-group">
            {getItems(items).map((item) => (
                <li
                    className={`list-group-item${
                        item === selectedItem ? " active" : ""
                    }`}
                    onClick={() => onItemSelect(item)}
                    key={item[valueProperty]}
                    role="button"
                >
                    {item[contentProperty]}
                </li>
            ))}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
};

export default GroupList;
