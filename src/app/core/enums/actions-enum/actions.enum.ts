//****** Bu kısım sabit olacak. Base olarak kullanılacaktır. ******/
export enum ActionsType {
    List = 1,
    View = 2,
    Save = 4,
    Delete = 8,
}

export const UserActions = {
    ...ActionsType,
}

export const CustomerActions = {
    ...ActionsType,
}
export const SettingsActions = {
    ...ActionsType,
}
export const ClientActions = {
    ...ActionsType,
    Manage:16
}

export const SysControllerActionRoleActions = {
    ...ActionsType,
}

export const WebPageActions = {
    ...ActionsType,
}

export const ScheduleEventActions = {
    ...ActionsType,
}



export const InquiryActions = {
    ...ActionsType,
}

export const MessageActions = {
    ...ActionsType,
}

export const TicketActions = {
    ...ActionsType,
}

export enum ConcernByOrderOfSignificance  {
    'Poor grades or declining academic performance' = 1,
    'Struggles with specific subjects or concepts'  = 2,
    'Lacks engagement or motivation in academic activities'  = 3,
    'Reading difficulties, such as struggling to read fluently or comprehend written material'  = 4,
    'Writing difficulties, such as trouble expressing thoughts in writing'  = 5,
    'Mathematics difficulties such as trouble understanding basic concepts and comprehending mathematical word problems'  = 6,
    'Struggles to understand and follow multi-step instructions, often requiring repeated explanations' = 7
}
