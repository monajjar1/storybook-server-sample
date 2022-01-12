import "./index.scss"

const MultiSearchItem = ({items}) => {
    return (
        items.map(({meta, title, authors, id}) => (
            <li key={id} className='multi-search__item'>
                <div className="multi-search__header">
                    <div className="multi-search__meta">
                            <span className="multi-search__type">
                                    {meta.type}
                            </span>
                        <span className="multi-search__serial">
                                     {meta.serial}
                            </span>
                        <span className="multi-search__coverdate">
                                    {meta.coverDate}
                            </span>
                    </div>
                </div>
                <div className="multi-search__body">
                    <h3 className="multi-search__title">
                        {title}
                    </h3>
                    <ul className="multi-search__authors">
                        {authors.map(({name, key}) => {
                            return (
                                <li key={key} className="author">
                                    {name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </li>
        )))
};

export default MultiSearchItem;