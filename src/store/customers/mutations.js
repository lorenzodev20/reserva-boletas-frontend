export const setCustomers = (state, customers) => state.customers = customers
export const setPagination = (state, pagination) => state.pagination = pagination
export const addCustomer = ( state, customer ) => state.customers = [ customer, ...state.customers ]
export const changeShowErrorValue = (state) => state.showErrors = !state.showErrors
export const cleanErrors = (state) => state.errors.splice(0, state.errors.length)
export const setCustomersList = (state, customers) => state.customersList = customers