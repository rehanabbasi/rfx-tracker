import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private buCollection: AngularFirestoreCollection<BusinessUnit>
  public businessUnits: Observable<BusinessUnit[]>

  private caCollection: AngularFirestoreCollection<ClientAgency>
  public clientAgencies: Observable<ClientAgency[]>

  private rcCollection: AngularFirestoreCollection<RfxCategory>
  public rfxCategories: Observable<RfxCategory[]>

  private rtCollection: AngularFirestoreCollection<RfxType>
  public rfxTypes: Observable<RfxType[]>

  constructor(private afs: AngularFirestore) {
    this.buCollection = afs.collection<BusinessUnit>('business-units')
    this.businessUnits = this.buCollection.valueChanges()

    this.caCollection = afs.collection<ClientAgency>('client-agencies')
    this.clientAgencies = this.caCollection.valueChanges()

    this.rcCollection = afs.collection<RfxCategory>('rfx-categories')
    this.rfxCategories = this.rcCollection.valueChanges()

    this.rtCollection = afs.collection<RfxType>('rfx-types')
    this.rfxTypes = this.rtCollection.valueChanges()
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

  public createRfxCategory( data: RfxCategory ): Promise<any> {
    return this.rcCollection.add(data)
  }

  public attachIdToRfxCategory( docId: string): Promise<any> {
    return this.rcCollection.doc(docId).update( { id: docId })
  }

  public updateRfxCategory( data: RfxCategory): Promise<any> {
    return this.rcCollection.doc(data.id).set(data)
  }

  public deleteRfxCategory( docId: string): Promise<any> {
    return this.rcCollection.doc(docId).delete()
  }

  public createRfxType( data: RfxType ): Promise<any> {
    return this.rtCollection.add(data)
  }

  public attachIdToRfxType( docId: string): Promise<any> {
    return this.rtCollection.doc(docId).update( { id: docId })
  }

  public updateRfxType( data: RfxType): Promise<any> {
    return this.rtCollection.doc(data.id).set(data)
  }

  public deleteRfxType( docId: string): Promise<any> {
    return this.rtCollection.doc(docId).delete()
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

export interface RfxCategory {
  id?: string,
  code: string,
  display_text: string,
  help_text: string
}

export interface RfxType {
  id?: string,
  code: string,
  display_text: string,
  help_text: string
}