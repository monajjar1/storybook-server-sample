import React, {useState} from 'react'
import "./index.scss"
import MultiSearchList from "../multi-search-list";

const multiSearch = ({items}) => {
    const [issue, setIssue] = useState(JSON.parse(items));
    return <div className="multi-search">
        <MultiSearchList items={issue}/>
    </div>
}


export default multiSearch;