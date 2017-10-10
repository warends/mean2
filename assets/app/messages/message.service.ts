import {Injectable, EventEmitter} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';

import {Message} from './message.model';
@Injectable()

export class MessageService {
    private messages: Message[] = [];
    messageEditable = new EventEmitter<Message>();

    constructor(private http: Http) {}

    addMessage(message: Message){
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:8080/message', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(result.obj.content, 'Will', result.obj._id, null);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getMessages(){
        return this.http.get('http://localhost:8080/message')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMsgs: Messages[] = [];
                for(let message of messages){
                    transformedMsgs.push(new Message(message.content, 'Will', message._id, null));
                }
                this.messages = transformedMsgs;
                return transformedMsgs;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    editMessage(message: Message){
        this.messageEditable.emit(message);
    }

    updateMessage(message: Message){
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://localhost:8080/message/' + message.messageId, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);
        return this.http.delete('http://localhost:8080/message/' + message.messageId)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}
