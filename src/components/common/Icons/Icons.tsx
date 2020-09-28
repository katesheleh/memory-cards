import React from 'react'
import {findIconDefinition, IconDefinition, IconLookup} from '@fortawesome/fontawesome-svg-core'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

library.add(fas)

const iconDefinition = (iconName: any, pref?: any): IconDefinition => {
   const prefix = pref ? pref : 'fas'
   const Lookup: IconLookup = {prefix: prefix, iconName: iconName}
   return findIconDefinition(Lookup)
}

// создаете новую иконку с именем из каталога https://fontawesome.com/icons (только free)
const SignInAlt = () => <FontAwesomeIcon icon={iconDefinition('sign-in-alt')}/>
const SignOutAlt = () => <FontAwesomeIcon icon={iconDefinition('sign-out-alt')}/>
const Key = () => <FontAwesomeIcon icon={iconDefinition('key')}/>
const Lock = () => <FontAwesomeIcon icon={iconDefinition('lock')}/>
const Error = () => <FontAwesomeIcon icon={iconDefinition('exclamation-circle')}/>
const Eye = () => <FontAwesomeIcon icon={iconDefinition('eye')}/>
const EyeSlash = () => <FontAwesomeIcon icon={iconDefinition('eye-slash')}/>
const SearchLocation = () => <FontAwesomeIcon icon={iconDefinition('search-location')}/>

// добавляете в этот объект
const Icons = {
   SignInAlt,
   SignOutAlt,
   Key,
   Lock,
   Error,
   Eye,
   EyeSlash,
   SearchLocation,
}

export default Icons
// в таком виде вставляете в разметку: { Icons.coffee() }
