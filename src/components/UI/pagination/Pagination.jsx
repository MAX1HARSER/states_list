import React from "react";
import {getPagesArray} from "../../../utils/pages";


export const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages)
    return (
        <div className="page_wrapper">
            {pagesArray.map((p) =>
                    <span
                        onClick={() => changePage(p)}
                        key={p}
                        className={page === p ? 'page page_current' : 'page'}
                    >
              {p}
            </span>
            )}
        </div>
    )
}


