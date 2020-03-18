import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private buCollection: AngularFirestoreCollection<BusinessUnit>;
  public businessUnits: Observable<BusinessUnit[]>;

  private caCollection: AngularFirestoreCollection<ClientAgency>;
  public clientAgencies: Observable<ClientAgency[]>;

  constructor(private afs: AngularFirestore) {
    this.buCollection = afs.collection<BusinessUnit>('business-units');
    this.businessUnits = this.buCollection.valueChanges()

    this.caCollection = afs.collection<ClientAgency>('client-agencies');
    this.clientAgencies = this.caCollection.valueChanges()
  }

  public createBusinessUnit( data: BusinessUnit ): Promise<any> {
    return this.buCollection.add(data)
  }

  public attachIdToBusinessUnit( docId: string): Promise<any> {
    return this.buCollection.doc(docId).update( { id: docId })
  }

  public updateBusinessUnit( data: BusinessUnit): Promise<any> {
    return this.buCollection.doc(data.id).set(data)
  }

  public deleteBusinessUnit( docId: string): Promise<any> {
    return this.buCollection.doc(docId).delete()
  }

  public createClientAgency( data: ClientAgency ): Promise<any> {
    return this.caCollection.add(data)
  }

  public attachIdToClientAgency( docId: string): Promise<any> {
    return this.caCollection.doc(docId).update( { id: docId })
  }

  public updateClientAgency( data: ClientAgency): Promise<any> {
    return this.caCollection.doc(data.id).set(data)
  }

  public deleteClientAgency( docId: string): Promise<any> {
    return this.caCollection.doc(docId).delete()
  }
}

export interface BusinessUnit { 
  id?: string,
  name: string,
  description: string,
  date: string
}

export interface ClientAgency { 
  id?: string,
  type: string,
  name: string,
  description: string,
  state: string
}
