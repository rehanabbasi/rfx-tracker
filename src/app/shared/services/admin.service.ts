import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // Observables for Business Units
  private buCollection: AngularFirestoreCollection<BusinessUnit>
  public businessUnits: Observable<BusinessUnit[]>

  // Observables for Client Agencies
  private caCollection: AngularFirestoreCollection<ClientAgency>
  public clientAgencies: Observable<ClientAgency[]>

  // Observables for RFx Categories
  private rcCollection: AngularFirestoreCollection<RfxCategory>
  public rfxCategories: Observable<RfxCategory[]>

  // Observables for RFx Types
  private rtCollection: AngularFirestoreCollection<RfxType>
  public rfxTypes: Observable<RfxType[]>

  // Observables for RFx Document Types
  private rdtCollection: AngularFirestoreCollection<RfxDocumentType>
  public rfxDocumentTypes: Observable<RfxDocumentType[]>

  // Observables for Proposal Document Types
  private pdtCollection: AngularFirestoreCollection<ProposalDocumentType>
  public proposalDocumentTypes: Observable<ProposalDocumentType[]>

  //  Observables for User Roles
  private urCollection: AngularFirestoreCollection<UserRole>
  public userRoles: Observable<UserRole[]>

  constructor(private afs: AngularFirestore) {
    this.buCollection = afs.collection<BusinessUnit>('business-units')
    this.businessUnits = this.buCollection.valueChanges()

    this.caCollection = afs.collection<ClientAgency>('client-agencies')
    this.clientAgencies = this.caCollection.valueChanges()

    this.rcCollection = afs.collection<RfxCategory>('rfx-categories')
    this.rfxCategories = this.rcCollection.valueChanges()

    this.rtCollection = afs.collection<RfxType>('rfx-types')
    this.rfxTypes = this.rtCollection.valueChanges()

    this.rdtCollection = afs.collection<RfxDocumentType>('rfx-document-types')
    this.rfxDocumentTypes = this.rdtCollection.valueChanges()

    this.pdtCollection = afs.collection<ProposalDocumentType>('proposal-document-types')
    this.proposalDocumentTypes = this.pdtCollection.valueChanges()

    this.urCollection = afs.collection<UserRole>('user-roles')
    this.userRoles = this.urCollection.valueChanges()
  }

  // CUD calls for Business Unit
  public createBusinessUnit( data: BusinessUnit ): Promise<any> {
    return this.buCollection.add(data)
  }

  public attachIdToBusinessUnit( docId: string): Promise<any> {
    return this.buCollection.doc(docId).update({ id: docId })
  }

  public updateBusinessUnit( data: BusinessUnit): Promise<any> {
    return this.buCollection.doc(data.id).set(data)
  }

  public deleteBusinessUnit( docId: string): Promise<any> {
    return this.buCollection.doc(docId).delete()
  }

  // CUD calls for Client Agency
  public createClientAgency( data: ClientAgency ): Promise<any> {
    return this.caCollection.add(data)
  }

  public attachIdToClientAgency( docId: string): Promise<any> {
    return this.caCollection.doc(docId).update({ id: docId })
  }

  public updateClientAgency( data: ClientAgency): Promise<any> {
    return this.caCollection.doc(data.id).set(data)
  }

  public deleteClientAgency( docId: string): Promise<any> {
    return this.caCollection.doc(docId).delete()
  }

  // CUD calls for RFx Category
  public createRfxCategory( data: RfxCategory ): Promise<any> {
    return this.rcCollection.add(data)
  }

  public attachIdToRfxCategory( docId: string): Promise<any> {
    return this.rcCollection.doc(docId).update({ id: docId })
  }

  public updateRfxCategory( data: RfxCategory): Promise<any> {
    return this.rcCollection.doc(data.id).set(data)
  }

  public deleteRfxCategory( docId: string): Promise<any> {
    return this.rcCollection.doc(docId).delete()
  }

  // CUD calls for RFx Type
  public createRfxType( data: RfxType ): Promise<any> {
    return this.rtCollection.add(data)
  }

  public attachIdToRfxType( docId: string): Promise<any> {
    return this.rtCollection.doc(docId).update({ id: docId })
  }

  public updateRfxType( data: RfxType): Promise<any> {
    return this.rtCollection.doc(data.id).set(data)
  }

  public deleteRfxType( docId: string): Promise<any> {
    return this.rtCollection.doc(docId).delete()
  }

  // CUD calls for RFx Document Type
  public createRfxDocumentType( data: RfxDocumentType ): Promise<any> {
    return this.rdtCollection.add(data)
  }

  public attachIdToRfxDocumentType( docId: string): Promise<any> {
    return this.rdtCollection.doc(docId).update({ id: docId })
  }

  public updateRfxDocumentType( data: RfxDocumentType): Promise<any> {
    return this.rdtCollection.doc(data.id).set(data)
  }

  public deleteRfxDocumentType( docId: string): Promise<any> {
    return this.rdtCollection.doc(docId).delete()
  }

  // CUD calls for Proposal Document Type
  public createProposalDocumentType( data: ProposalDocumentType ): Promise<any> {
    return this.pdtCollection.add(data)
  }

  public attachIdToProposalDocumentType( docId: string): Promise<any> {
    return this.pdtCollection.doc(docId).update({ id: docId })
  }

  public updateProposalDocumentType( data: ProposalDocumentType): Promise<any> {
    return this.pdtCollection.doc(data.id).set(data)
  }

  public deleteProposalDocumentType( docId: string): Promise<any> {
    return this.pdtCollection.doc(docId).delete()
  }

  // CUD calls for User Roles
  public createUserRole( data: UserRole ): Promise<any> {
    data.active = true
    return this.urCollection.add(data)
  }

  public attachIdToUserRole( docId: string): Promise<any> {
    return this.urCollection.doc(docId).update({ id: docId })
  }

  public updateUserRole( data: UserRole): Promise<any> {
    return this.urCollection.doc(data.id).set(data)
  }

  public updateUserRoleStatus( docId: string, status: boolean): Promise<any> {
    return this.urCollection.doc(docId).update({ active: status })
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

export interface RfxDocumentType {
  id?: string,
  type: string,
  description: string,
  help_text: string
}

export interface ProposalDocumentType {
  id?: string,
  type: string,
  description: string,
  help_text: string
}

export interface UserRole {
  id?: string,
  name: string,
  text: string,
  help_text: string,
  active: boolean
}