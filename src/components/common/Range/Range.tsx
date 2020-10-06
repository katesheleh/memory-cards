import React, {useEffect, useState} from 'react';
import {getTrackBackground, Range} from 'react-range';

type RangePropsType = {
    setValuesRange: (newValuesRange: any) => void
    minValuesRange: number
    maxValuesRange: number
}

const CardsCountRange = ({setValuesRange, minValuesRange, maxValuesRange}: RangePropsType) => {
    const [values, setValues] = useState([minValuesRange, maxValuesRange]);

    const setValuesCardsCount = (newValues: number[]) => {
        setValuesRange(newValues);
        setValues(newValues);
    };

    useEffect(() => {
        setValuesCardsCount([minValuesRange, maxValuesRange]);
    }, [minValuesRange, maxValuesRange]);

    return (
        <Range
            values={values}
            step={1}
            min={minValuesRange}
            max={maxValuesRange}
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
                                min: minValuesRange,
                                max: maxValuesRange
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
