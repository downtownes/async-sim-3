const initialState = {
    user: [],
    firstName: '',
    lastName: '',
    gender: '',
    hairColor: '',
    eyeColor: '',
    hobby: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    allUsers: []
}

const USER = "USER";
const FIRSTNAME = "FIRSTNAME";
const LASTNAME = "LASTNAME";
const GENDER = "GENDER";
const HAIRCOLOR = "HAIRCOLOR";
const EYECOLOR = "EYECOLOR";
const HOBBY = "HOBBY";
const BIRTHDAY = "BIRTHDAY";
const BIRTHMONTH = "BIRTHMONTH";
const BIRTHYEAR = "BIRTHYEAR";
const ALLUSERS = "ALLUSERS";

function reducer(state = initialState, action) {
    switch (action.type) {
        case USER:
            return Object.assign({}, state, { user: action.payload });
        case FIRSTNAME:
            return Object.assign({}, state, { firstName: action.payload });
        case LASTNAME:
            return Object.assign({}, state, { lastName: action.payload });
        case GENDER:
            return Object.assign({}, state, { gender: action.payload });
        case HAIRCOLOR:
            return Object.assign({}, state, { hairColor: action.payload });
        case EYECOLOR:
            return Object.assign({}, state, { eyeColor: action.payload });
        case BIRTHDAY:
            return Object.assign({}, state, { birthDay: action.payload });
        case BIRTHMONTH:
            return Object.assign({}, state, { birthMonth: action.payload });
        case BIRTHYEAR:
            return Object.assign({}, state, { birthYear: action.payload });
        case ALLUSERS:
            return Object.assign({}, state, {allUsers: action.payload})
        default:
            return state;
    }
}



export function getUser(user) {
    return {
        type: USER,
        payload: user
    }
}

export function updateFirstName(firstName) {
    return {
        type: FIRSTNAME,
        payload: firstName
    }
}

export function updateLastName(lastName) {
    return {
        type: LASTNAME,
        payload: lastName
    }
}

export function updateGender(gender) {
    return {
        type: GENDER,
        payload: gender
    }
}

export function updateHairColor(hairColor) {
    return {
        type: HAIRCOLOR,
        payload: hairColor
    }
}

export function updateEyeColor(eyeColor) {
    return {
        type: EYECOLOR,
        payload: eyeColor
    }
}

export function updateHobby(hobby) {
    return {
        type: HOBBY,
        payload: hobby
    }
}

export function updateBirthDay(birthDay) {
    return {
        type: BIRTHDAY,
        payload: birthDay
    }
}

export function updateBirthMonth(birthMonth) {
    return {
        type: BIRTHMONTH,
        payload: birthMonth
    }
}

export function updateBirthYear(birthYear) {
    return {
        type: BIRTHYEAR,
        payload: birthYear
    }
}

export function getAllUsers(allUsers) {
    return {
        type: ALLUSERS,
        payload: allUsers
    }
}



export default reducer;