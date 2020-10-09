import React, {useEffect} from 'react'
import classes from './Train.module.scss'
import {useParams} from 'react-router-dom'
import {Button} from '../common'
import {useDispatch, useSelector} from 'react-redux'
import {getCardsTC, putGradeCardTC} from '../../reducers/cards-reducer'
import {CardsType} from '../../api/cards-api'
import {AppRootStateType} from '../../reducers/store'

const grades = [1, 2, 3, 4, 5]
const chooseCard = (cards: CardsType[]) => {
   const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
   const rand = Math.random() * sum;
   const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
         const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
         return {sum: newSum, id: newSum < rand ? i : acc.id}
      }
      , {sum: 0, id: -1});
   return cards[res.id + 1];
}

const Train = () => {

   const dispatch = useDispatch()
   const {packID} = useParams()
   const [check, setCheck] = React.useState<boolean>(false)
   const [initTrain, setInitTrain] = React.useState<boolean>(false)
   const cards = useSelector<AppRootStateType, CardsType[]>(state => state.cards.cards)
   const [card, setCard] = React.useState<CardsType>({
         answer: '',
         question: '',
         cardsPack_id: '',
         grade: 0,
         rating: 0,
         shots: 0,
         type: '',
         user_id: '',
         created: '',
         updated: '',
         __v: 0,
         _id: '',
   })

   React.useEffect(() => {
      if (!initTrain) {
         dispatch(getCardsTC(packID, 100))
         setInitTrain(true)
      }
      if (cards.length > 0) {
         setCard(chooseCard(cards))
      }
   }, [dispatch, packID, cards])

   const onClickCheck = () => {
      setCheck(true)
   }

   const onClickNext = () => {
      setCard(chooseCard(cards))
      setCheck(false)
   }

   const onClickGrade = (grade: number) => {
      dispatch(putGradeCardTC(card._id, grade))
   }

   return (
      <div className={classes.container}>
         <h1>Train</h1>

         <div className={`${classes.card} ${check ? classes.check : ''}`} onClick={onClickCheck}>
            <div className={classes.front}>
               <h3 className={classes.cardTitle}>Question</h3>
               <span className={classes.cardText}>{card.question}</span>
               <span>{card.grade}</span>
            </div>
            <div className={classes.back}>
               <h3 className={classes.cardTitle}>Answer</h3>
               <br/>
               <span className={classes.cardText}>{card.answer}</span>
            </div>
         </div>

         {
            check && <div className={classes.actionMenu}>
                <div className={classes.gradesBtnGroup}>
                   {
                      grades.map(grade =>
                         <Button key={grade}
                                 labelTitle={grade.toString()}
                                 onClick={() => onClickGrade(grade)}
                         />)
                   }
                </div>
                <Button labelTitle={'Next'} onClick={onClickNext}/>
            </div>
         }

      </div>
   )
}

export default React.memo(Train)
