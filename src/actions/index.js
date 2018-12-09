import { getUserInfo } from '../utils/backend-utils'

export const MESSAGE_SUBMITTED = 'MESSAGE_SUBMITTED';
export const messageSubmitted = (chatID) => ({
    type: MESSAGE_SUBMITTED,
    chatID
});

export const TEXT_SUBMITTED = 'TEXT_SUBMITTED';
export const textSubmitted = (text, chatID) => ({
    type: TEXT_SUBMITTED,
    text,
    chatID,
});

export const FILES_SUBMITTED = 'FILES_SUBMITTED';
export const filesSubmitted = (files, chatID) => ({
    type: FILES_SUBMITTED,
    files,
    chatID,
});

// **************************************
/*  TODO: по сути, костыль.
    Запрещает пользователю покидать страницу,
    пока идет загрузка файла/координат
 */
export const BEGIN_PENDING_OPERATION = 'BEGIN_PENDING_OPERATION';
export const beginPendingOperation = (chatID) => ({
    type: BEGIN_PENDING_OPERATION,
    chatID,
});

export const END_PENDING_OPERATION = 'END_PENDING_OPERATION';
export const endPendingOperation = (chatID) => ({
   type: END_PENDING_OPERATION,
    chatID,
});
// **************************************

export const GEO_SUBMITTED = 'GEO_SUBMITTED';
export const geoSubmitted = (geo, chatID) => ({
    type: GEO_SUBMITTED,
    geo,
    chatID,
});

export const USER_AUTHORIZED = 'USER_AUTHORIZED';
export function userAuthorized(userID, token) {
    return function(dispatch) {
        getUserInfo(userID).then( userData => {
            userData = userData.result[0];
            dispatch(updateUserData(
                // TODO: здесь я пишу ключи с бекенда
                {
                    userID: userData.user_id,
                    userName: userData.name,
                    userNick: userData.nick,
                    avatarURL: userData.avatar,
                    token: token,
                }
                )
            );
        });
    }
}

export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const updateUserData = (userData) => ({
    type: UPDATE_USER_DATA,
    userData,
});
