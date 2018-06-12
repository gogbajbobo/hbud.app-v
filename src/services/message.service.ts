import MobileDetect from 'mobile-detect' // may be just use window.innerWidth
import { Message } from 'element-ui'
import { MessageBox as MessageBoxM } from 'mint-ui'
import { MessageBox as MessageBoxD } from 'element-ui';
import { ElMessageBoxOptions } from 'element-ui/lib'
import { MessageBoxData } from "element-ui/types/message-box";

const md = new MobileDetect(navigator.userAgent);

class MessageService {

    static showError(err: Error) {
        Message.error(`${ err.name }: ${ err.message }`)
    }

    static showConfirmMessage(title: string, text: string, options: ElMessageBoxOptions): Promise<MessageBoxData> {

        return md.phone()
                ? MessageBoxM.confirm(text, title, options)
                : MessageBoxD.confirm(text, title, options);

    }

}

export default MessageService
