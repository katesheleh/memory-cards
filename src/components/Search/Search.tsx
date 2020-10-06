import React, {ChangeEvent} from "react";
import classes from './Search.module.scss'
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import CardsCountRange from "../common/Range/Range";

type SearchPropsType = {
    inputLabel: string
    setValuesRange: (newValuesRange: number[]) => void
    minValuesRange: number
    maxValuesRange: number
    valueSearchName: string
    changeInputSearch: (e: ChangeEvent<HTMLInputElement>) => void
    search: () => void
    secondInput?: boolean
    secondInputLabel?: string
    valueSecondSearchName?: string
    changeSecondInputSearch?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Search = ({inputLabel, setValuesRange, minValuesRange, maxValuesRange, valueSearchName, changeInputSearch, search, secondInput = false, ...props}: SearchPropsType) => {
    return (
        <div className={classes.search}>
            <CardsCountRange setValuesRange={setValuesRange} minValuesRange={minValuesRange}
                             maxValuesRange={maxValuesRange}/>
            <div className={classes.search_item}>
                <Input labelTitle={inputLabel} value={valueSearchName} onChange={changeInputSearch}/>
                {secondInput &&
                <Input labelTitle={props.secondInputLabel}
                       value={props.valueSecondSearchName}
                       onChange={props.changeSecondInputSearch}/>}
                <Button labelTitle={'Search'} onClick={search}/>
            </div>
        </div>
    )
}