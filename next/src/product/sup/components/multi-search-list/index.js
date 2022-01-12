import "./index.scss"
import MultiSearchItem from "../multi-search-item";
const MultiSearchList = ({items}) => {
    return(
        <ul className='multi-search__list'>
            <MultiSearchItem items={items}/>
        </ul>
    );
}
export default MultiSearchList;