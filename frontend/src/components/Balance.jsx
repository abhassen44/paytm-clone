import PropTypes from "prop-types"

export function Balance({ value }){
    return (
        <div className="flex">
            <div className="font-bold text-lg">
                Your balance
            </div>
            <div className="font-semibold ml-4 text-lg">
                Rs {value || 0}
            </div>
        </div>
    )
}

Balance.propTypes = {
    value: PropTypes.number.isRequired
}

