import {Dispatch} from 'redux'
import {ErrorACType, isFetchingAC, isFetchingACType} from './request-reducer'
import {cardsAPI, CardsType, NewCardType} from '../api/cards-api'
import {AppRootStateType} from './store'

let initialState = {
   cards: [] as CardsType[],
   cardsTotalCount: 0,
   cardsAnswer: '',
   cardsQuestion: '',
   min: 0,
   max: 4,
   sortCards: '',
   maxGrade: 4,
   minGrade: 0,
   page: 1,
   pageCount: 4,
   loadingTrainingCard: false
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case 'SET_CARDS':
         return {...state, cards: action.cards}
      case 'ADD_CARD':
         return {...state, cards: [action.newCard, ...state.cards]}
      case 'REMOVE_CARD':
         return {...state, cards: state.cards.filter((c) => c._id != action._id)}
      case 'EDIT_CARD':
         return {
            ...state,
            cards: state.cards.map(p => p._id === action.card_id ? {...p, ...action.model} : p),
         }
      case 'SET_MIN_MAX_CARDS_GRADS':
         return {...state, min: action.newValues[0], max: action.newValues[1]}
      case 'SET_ANSWER_CARDS':
         return {...state, cardsAnswer: action.cardsAnswer}
      case 'SET_QUESTION_CARDS':
         return {...state, cardsQuestion: action.cardsQuestion}
      case 'SET_SORT_CARDS':
         return {...state, sortCards: action.sortCards}
      case 'SET_CARDS_TOTAL_CARDS':
         return {...state, cardsTotalCount: action.cardsTotalCount}
      case 'SET_CARDS_PAGE':
         return {...state, page: action.page}
      case 'SET_CARDS_PAGE_COUNT':
         return {...state, pageCount: action.pageCount}
      case 'UPDATE_CARD_GRADE':
         return {...state, cards: state.cards.map(p => p._id === action.card_id ? {...p, grade: action.grade} : p),}
      case 'SET_LOADING_TRAINING_CARD':
         return {...state, loadingTrainingCard: action.value}
      default:
         return state
   }
}

// AC
export const setCardsAC = (cards: CardsType[]) => ({type: 'SET_CARDS', cards} as const)
export const addCardAC = (newCard: NewCardType) => ({type: 'ADD_PACK', newCard} as const)
export const removeCardAC = (_id: string) => ({type: 'REMOVE_CARD', _id} as const)
export const editCardAC = (card_id: string, model: EditCardModelType) => ({type: 'EDIT_CARD', card_id, model} as const)
export const setMinMaxCardsGradsAC = (newValues: number[]) => ({type: 'SET_MIN_MAX_CARDS_GRADS', newValues} as const)
export const setAnswerCardsAC = (cardsAnswer: string) => ({type: 'SET_ANSWER_CARDS', cardsAnswer} as const)
export const setQuestionCardsAC = (cardsQuestion: string) => ({type: 'SET_QUESTION_CARDS', cardsQuestion} as const)
export const setSortCardsAC = (sortCards: string) => ({type: 'SET_SORT_CARDS', sortCards} as const)
export const setCardsTotalCountAC = (cardsTotalCount: number) => ({
   type: 'SET_CARDS_TOTAL_CARDS',
   cardsTotalCount,
} as const)
export const setCardsPageAC = (page: number) => ({type: 'SET_CARDS_PAGE', page} as const)
export const setCardsPageCountAC = (pageCount: number) => ({type: 'SET_CARDS_PAGE_COUNT', pageCount} as const)
export const updateCardGardeAC = (card_id: string, grade: number) => ({type: 'UPDATE_CARD_GRADE', card_id, grade} as const)
const setLoadingTrainingCard = (value: boolean) => ({type: 'SET_LOADING_TRAINING_CARD', value})

// thunks
export const getCardsTC = (cardsPack_id: string, pageCount?: number) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
   dispatch(isFetchingAC(true))
   cardsAPI.getCards(cardsPack_id, pageCount)
      .then(res => {
         dispatch(isFetchingAC(false))
         dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
         dispatch(setCardsAC(res.data.cards))
      })
      .catch((error) => {
         //dispatch(errorAC(error.response.data.error))
         dispatch(isFetchingAC(false))
      })
}

export const addCardTC = (cardsPack_id: string, question: string, answer: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
   dispatch(isFetchingAC(true))
   cardsAPI.addCard(cardsPack_id, question, answer)
      .then(res => {
         dispatch(isFetchingAC(false))
         dispatch(addCardAC(res.data.newCard))
         dispatch(getCardsTC(cardsPack_id))
      })
      .catch((error) => {
         console.log(error.response.data.error)
         dispatch(isFetchingAC(false))
      })
}

export const removeCardTC = (_id: string, cardsPack_id: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
   dispatch(isFetchingAC(true))
   cardsAPI.removeCard(_id)
      .then(res => {
         dispatch(isFetchingAC(false))
         dispatch(removeCardAC(_id))
         dispatch(getCardsTC(cardsPack_id))
      })
      .catch((error) => {
         console.log(error.response.data.error)
         dispatch(isFetchingAC(false))
      })
}

export const searchCardsTC = (cardsPack_id: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>, getState: () => AppRootStateType) => {
   const {cardsAnswer, cardsQuestion, min, max, sortCards, page, pageCount} = getState().cards
   dispatch(isFetchingAC(true))
   cardsAPI.searchCards(cardsPack_id, cardsAnswer, cardsQuestion, min, max, sortCards, page, pageCount)
      .then(res => {
         dispatch(isFetchingAC(false))
         dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
         dispatch(setCardsAC(res.data.cards))
      })
      .catch((error) => {
         //dispatch(errorAC(error.response.data.error))
         dispatch(isFetchingAC(false))
      })
}

export const editCardTC = (card_id: string, model: EditCardModelType, cardsPack_id: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
   dispatch(isFetchingAC(true))
   cardsAPI.editCard(card_id, model)
      .then(res => {
         dispatch(isFetchingAC(false))
         editCardAC(card_id, model)
         dispatch(getCardsTC(cardsPack_id))
      })
      .catch((error) => {
         console.log(error.response.data.error)
         dispatch(isFetchingAC(false))
      })
}

export const putGradeCardTC = (card_id: string, grade: number) =>
   (dispatch: Dispatch) => {
      dispatch(setLoadingTrainingCard(true))
    cardsAPI.putGrade({card_id, grade})
       .then(res => {
          dispatch(updateCardGardeAC(res.data.updatedGrade.card_id, res.data.updatedGrade.grade))
          dispatch(setLoadingTrainingCard(false))
       })
       .catch((error) => {
          console.log(error.response.data.error)
          dispatch(setLoadingTrainingCard(false))
       })
   }

type InitialStateType = {
   cards: Array<CardsType>
   cardsTotalCount: number
   cardsAnswer: string
   cardsQuestion: string
   min: number
   max: number
   sortCards: string
   maxGrade: number
   minGrade: number
   page: number
   pageCount: number
   loadingTrainingCard: boolean
}

type ActionsType =
   setCardsACType
   | addCardACType
   | RemoveCardType
   | setMinMaxCardsGradsACType
   | setAnswerCardsACType
   | setQuestionCardsACType
   | setSortCardsACType
   | setCardsTotalCountACType
   | setCardsPageACType
   | setCardsPageCountACType
   | updateCardGardeACType
   | setLoadingTrainingCardACType
   | any


export type setCardsACType = ReturnType<typeof setCardsAC>
export type addCardACType = ReturnType<typeof addCardAC>
export type RemoveCardType = ReturnType<typeof removeCardAC>
export type setMinMaxCardsGradsACType = ReturnType<typeof setMinMaxCardsGradsAC>
export type setAnswerCardsACType = ReturnType<typeof setAnswerCardsAC>
export type setQuestionCardsACType = ReturnType<typeof setQuestionCardsAC>
export type setSortCardsACType = ReturnType<typeof setSortCardsAC>
export type setCardsTotalCountACType = ReturnType<typeof setCardsTotalCountAC>
export type setCardsPageACType = ReturnType<typeof setCardsPageAC>
export type setCardsPageCountACType = ReturnType<typeof setCardsPageCountAC>
export type updateCardGardeACType = ReturnType<typeof updateCardGardeAC>
type setLoadingTrainingCardACType = ReturnType<typeof setLoadingTrainingCard>

export type EditCardModelType = {
   question?: string
   answer?: string
}


