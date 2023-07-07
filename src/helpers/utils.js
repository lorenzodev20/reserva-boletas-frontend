export const reportError = (error) => {
    if (error != null){
        console.error('Error por favor revisar logs');
        console.error(error);
    }else{
        console.error('Error no definido')
    }
}