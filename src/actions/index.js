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
