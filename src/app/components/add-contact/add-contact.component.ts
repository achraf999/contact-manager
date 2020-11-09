import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/Contact';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  showForm = false;
  contact: Contact =
  {
    name: '',
    phone: 0
  }

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

  showFormClick()
  {
    this.showForm = true;
  }

  hideFormClick()
  {
    this.showForm = false;
  }

  addContact()
  {
    if(this.contact.name != '' && this.contact.phone != 0)
    {
      this.contactService.createContact(this.contact);
      this.contact.name = '';
      this.contact.phone = 0
      this.showForm = false;
    }
    else{
      alert('Veuillez remplir les champs');
    }
   
    
  }



}
