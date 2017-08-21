import {Component, OnInit} from '@angular/core';
import {Message} from './message.model';
import{MessageService} from './message.service';
import{NgForm} from '@angular/forms';

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})

export class MessageInputComponent implements OnInit {
    message: Message;
    constructor(private messageService: MessageService) {}

    onSubmit(form: NgForm){
        if(this.message) {
            //edit message
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe((result)=>{
                    console.log(result)
                )
            this.message = null;
        } else {
            //create message
            const message = new Message(form.value.content, 'Will');
            this.messageService.addMessage(message)
                .subscribe(
                    data => console.log(data),
                    error => console.log(error)
                );
        }
        form.resetForm();
    }

    ngOnInit(){
        this.messageService.messageEditable.subscribe(
            (message: Message) => this.message = message;
        );
    }

    onClear(form: ngForm){
        this.message = null;
        form.resetForm();
    }
}
