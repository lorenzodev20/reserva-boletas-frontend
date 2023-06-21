import reservationsApi from "@/api/reservationsApi"

export const getReservations = async () => {
    try{
        const url = '/api/v1/reservations'
        const data = await reservationsApi.get(url);
        return data
    }catch( error ){
        console.error('Error al cargar la informacion por favor revisar logs')
        console.log(error)
        return null
    }
}