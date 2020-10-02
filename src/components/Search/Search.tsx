import React from "react";
import classes from './Search.module.scss'
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {searchPackNameAC, searchPackTC} from "../../reducers/pack-reducer";
import CardsCountRange from "../common/Range/Range";

export const Search = () => {
    const dispatch = useDispatch()
    const setSearchName = (newSearchName: string) => (
        dispatch(searchPackNameAC(newSearchName))
    )
    const value = useSelector((state: AppRootStateType) => state.packs.packName)
    const changeInputValue = (e: any) => {
        setSearchName(e.currentTarget.value)
    }


    const search = () => {
        dispatch(searchPackTC())
    }
    return (
        <div className={classes.search}>
            <CardsCountRange/>
            <div className={classes.search_item}>
                <Input labelTitle={'Search'} value={value} onChange={changeInputValue}/>
                <Button labelTitle={'Search'} onClick={search}/>
            </div>
        </div>
    )
}