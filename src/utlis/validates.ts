export const emptyField = (str: string) => {
   if (!str) {
      return 'Empty field'
   } else return ''
}

export const checkNumberSymbols = (str: string, countSymbols: number) => {
   if (str.length < countSymbols) {
      return `Number of characters must be more ${countSymbols}`
   } else return ''
}

export const validateEmail = (email: string) => {
   if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return 'Invalid email address'
   } else return ''
}
