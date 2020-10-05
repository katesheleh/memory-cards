import React from "react";
import classes from "./Paginator.module.scss"

type PaginatorPropsType = {
    page: number
    pageCount: number
    cardPacksTotalCount: number
    getCardPacksPage: (page: number, pageCount: number) => void
}

const Paginator = ({page, pageCount, cardPacksTotalCount, getCardPacksPage}: PaginatorPropsType) => {
    const onChangeSelect = (e: any) => {
        getCardPacksPage(page, e.currentTarget.value)
    }
    let pages = []
    const lastPage = Math.ceil(cardPacksTotalCount / pageCount)

    for (let i = 1; i <= lastPage; i++) pages.push((
        <button
            key={i}
            style={{background: page === i ? '#138808' : undefined}}
            onClick={() => getCardPacksPage(i, pageCount)}
        >
            {i}
        </button>
    ));
    pages = pages.filter((p, i) => i < (page + 2) || i === (lastPage));

    pages = pages.filter((p, i) => i > page - 4);


    return (
        <div className={classes.paginator}>
            <div>
                <select value={pageCount} onChange={onChangeSelect} className={classes.paginator_item}>
                    <option value={4}>4</option>
                    <option value={7}>7</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <div className={classes.paginator_item}>
                <button
                    onClick={() => {
                        getCardPacksPage(page - 1, pageCount)
                    }}
                    disabled={page === 1}
                >-
                </button>
                {pages}
                <button
                    onClick={() => getCardPacksPage(page + 1, pageCount)}
                    disabled={page === lastPage}
                >+
                </button>
            </div>
        </div>

    )
}

export default Paginator