import React, {useEffect, useState} from 'react';
import {Range, getTrackBackground} from 'react-range';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../reducers/store";
import {setMinMAxCardsCountAC} from "../../../reducers/pack-reducer";

const CardsCountRange: React.FC = () => {
    const  minCardsCount = useSelector((state: AppRootStateType) => state.packs.minCardsCount)
    const  maxCardsCount = useSelector((state: AppRootStateType) => state.packs.maxCardsCount)
    const [values, setValues] = useState([minCardsCount, maxCardsCount]);

    const dispatch = useDispatch();

    const setValuesCardsCount = (newValues: number[]) => {
        dispatch(setMinMAxCardsCountAC(newValues));
        setValues(newValues);
    };

    useEffect(() => {
        setValuesCardsCount([minCardsCount, maxCardsCount]);
    }, [minCardsCount, maxCardsCount]);

    return (
        <Range
            values={values}
            step={1}
            min={minCardsCount}
            max={maxCardsCount}
            onChange={values => (setValuesCardsCount(values))}
            renderTrack={({props, children}) => (
                <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                        ...props.style,
                        height: '36px',
                        display: 'flex',
                        width: '50%',
                        margin: '30px',
                    }}
                >
                    <div
                        ref={props.ref}
                        style={{
                            height: '5px',
                            width: '100%',
                            borderRadius: '4px',
                            background: getTrackBackground({
                                values: values,
                                colors: ['#ccc', '#499c35', '#ccc'],
                                min: minCardsCount,
                                max: maxCardsCount
                            }),
                            alignSelf: 'center'
                        }}
                    >
                        {children}
                    </div>
                </div>
            )}
            renderThumb={({index, props, isDragged}) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: '12px',
                        width: '12px',
                        borderRadius: '1px',
                        backgroundColor: '#FFF',
                        boxShadow: '0px 2px 6px #AAA',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '-28px',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                            padding: '4px',
                            borderRadius: '4px',
                            backgroundColor: '#499c35'
                        }}
                    >
                        {values[index].toFixed(0)}
                    </div>
                    <div style={{height: '16px', width: '5px', backgroundColor: isDragged ? '#548BF4' : '#CCC'}}/>
                </div>
            )}
        />
    );
};

export default CardsCountRange;
