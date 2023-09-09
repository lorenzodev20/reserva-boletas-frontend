export const setTickets = (state, tickets) => state.tickets = tickets
export const setPagination = (state, pagination) => state.pagination = pagination
export const changeShowErrorValue = (state) => state.showErrors = !state.showErrors
export const cleanErrors = (state) => state.errors.splice(0, state.errors.length)
export const addTicket = ( state, ticket ) => state.tickets = [ ticket, ...state.tickets ]
export const setIsLoading = (state,value) => state.isLoading = value
export const setTicketsList = (state, tickets) => state.ticketsList = tickets