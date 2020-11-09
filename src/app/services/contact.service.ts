import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Contact } from '../models/Contact';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactsCollection: AngularFirestoreCollection<Contact>;
  contactDoc: AngularFirestoreDocument<Contact>
  contacts: Observable<Contact[]>

  constructor(private afs: AngularFirestore) 
  {
    this.contactsCollection = this.afs.collection('contacts');
    this.contacts = this.contactsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Contact;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  
  getContacts()
  {
    return this.contacts;
  }

  createContact(contact: Contact)
  {
    this.contactsCollection.add(contact);
  }

  updateContact(contact: Contact)
  {
    this.contactDoc = this.afs.doc(`contacts/${contact.id}`);
    this.contactDoc.update(contact);
  }

  deleteContact(contact: Contact)
  {
    this.contactDoc = this.afs.doc(`contacts/${contact.id}`);
    this.contactDoc.delete();
  }












}
