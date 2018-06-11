import { Message } from 'element-ui'

class MessageService {

    static showError(err: Error) {
        Message.error(`${ err.name }: ${ err.message }`)
    }

}

export default MessageService
