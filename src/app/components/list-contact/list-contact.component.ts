import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/Contact';

@Component({
  selector: 'list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  contacts;
  myContact: Contact
  status = false;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void 
  {
    this.contactService.getContacts().subscribe(contacts =>
      {
        this.contacts = contacts;
        console.log(contacts)
      })
  }

  updateContact(contact: Contact)
  {
    this.contactService.updateContact(contact);
    this.status = false;
  }
  
  showEditForm(contact: Contact)
  {
    this.status = true;
    this.myContact = contact;
  }

  deleteContact(contact: Contact)
  {
    this.contactService.deleteContact(contact);
    this.status = false;
  }

}
