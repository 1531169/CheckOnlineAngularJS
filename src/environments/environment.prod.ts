export const environment = {
    production: true,
    debug: true,

    log(message?:any, ... optionalParams) {
        if(!this.debug) {
            return;
        }

        if(optionalParams.length > 0) {
            console.log(message, optionalParams);
        } else {
            console.log(message);
        }
    }
};
