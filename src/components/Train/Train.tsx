import React from 'react'
import classes from './Train.module.scss'
import {useParams} from 'react-router-dom'
import {Button} from '../common'
import {useDispatch, useSelector} from 'react-redux'
import {getCardsTC, putGradeCardTC} from '../../reducers/cards-reducer'
import {CardsType} from '../../api/cards-api'
import {AppRootStateType} from '../../reducers/store'

const grades = [1, 2, 3, 4, 5]
const chooseCard = (cards: CardsType[]) => {
   const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
   const rand = Math.random() * sum
   const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
         const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
         return {sum: newSum, id: newSum < rand ? i : acc.id}
      }
      , {sum: 0, id: -1})
   return cards[res.id + 1]
}

const Train = () => {

   const dispatch = useDispatch()
   const {packID} = useParams()
   const [check, setCheck] = React.useState<boolean>(false)
   const [initTrain, setInitTrain] = React.useState<boolean>(false)
   const cards = useSelector<AppRootStateType, CardsType[]>(state => state.cards.cards)
   const loadingTrainingCard = useSelector<AppRootStateType, boolean>(state => state.cards.loadingTrainingCard)
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
   const [grade, setGrade] = React.useState<number | null>(null)

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
      if (grade !== null) {
         dispatch(putGradeCardTC(card._id, grade))
         setGrade(null)
         setCheck(false)
      }
   }

   const onClickGrade = (gradeBtn: number) => {
      setGrade(gradeBtn)
   }

   return (
      <div className={classes.container}>
         <h1>Train</h1>
         <div className={`${classes.card} ${check ? classes.check : ''}`} onClick={onClickCheck}>
            <div className={`${classes.front} ${loadingTrainingCard ? classes.loading : ''}`}>
               <h3 className={classes.cardTitle}>Question</h3>
               <div className={classes.cardContent}>
                  <span className={classes.cardText}>{card.question}</span>
                  {/*<div>Grade: {Math.floor(card.grade)}</div>*/}
               </div>
            </div>
            <div className={classes.back}>
               <div className={classes.cardContent}>
                  <h3 className={classes.cardTitle}>Answer</h3>
                  <span className={classes.cardText}>{card.answer}</span>
               </div>
            </div>
         </div>

         {
            check && <div className={classes.actionMenu}>
                <div className={classes.gradesBtnGroup}>
                   {
                      grades.map(g =>
                         <Button key={g}
                                 labelTitle={g.toString()}
                                 onClick={() => onClickGrade(g)}
                                 style={{transform: g === grade ? 'scale(1.1)' : ''}}
                         />)
                   }
                </div>
                <Button labelTitle={'Next'} onClick={onClickNext} disabled={grade === null}/>
            </div>
         }

      </div>
   )
}

export default React.memo(Train)
