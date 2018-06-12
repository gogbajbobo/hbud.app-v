const isProduction = process.env.NODE_ENV === 'production';

class LoggerService {

    static log(...args : any[]): void {
        if (!isProduction) console.log(...args)
    }

    static error(...args : any[]): void {
        if (!isProduction) console.error(...args)
    }

}

export default LoggerService
