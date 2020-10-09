import React from 'react'
import classes from './Train.module.scss'
import {useParams} from 'react-router-dom'
import {Button} from '../common'

const grades = [1, 2, 3, 4, 5]

const Train = () => {

   const {packID} = useParams()
   const [check, setCheck] = React.useState<boolean>(false)

   const onClickCheck = () => {
      setCheck(true)
   }

   const onClickNext = () => {
      setCheck(false)
   }

   return (
      <div className={classes.container}>
         <h1>Train</h1>

         <div className={`${classes.card} ${check ? classes.check : ''}`} onClick={onClickCheck}>
            <div className={classes.front}>
               <h3 className={classes.cardTitle}>Question</h3>
               <span className={classes.cardText}>1</span>
            </div>
            <div className={classes.back}>
               <h3 className={classes.cardTitle}>Answer</h3>
               <span className={classes.cardText}>one</span>
            </div>
         </div>

         {
            check && <div className={classes.actionMenu}>
                <div className={classes.gradesBtnGroup}>
                   {
                      grades.map(grad => <Button key={grad} labelTitle={grad.toString()}/>)
                   }
                </div>
                <Button labelTitle={'Next'} onClick={onClickNext}/>
            </div>
         }

      </div>
   )
}

export default React.memo(Train)
