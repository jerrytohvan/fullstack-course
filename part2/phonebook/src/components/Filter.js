export const Filter = ({ handleInputChange }) => {
    return (
        <div>
            filter shown with a: <input type="text" id='filter' onChange={handleInputChange} />
        </div>
    );
}