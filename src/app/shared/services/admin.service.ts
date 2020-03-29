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

  //  Observables for Users
  private usrCollection: AngularFirestoreCollection<User>
  public users: Observable<User[]>

  //  Observables for View Roles
  private vrCollection: AngularFirestoreCollection<ViewRole>
  public viewRoles: Observable<ViewRole[]>

  //  Observables for User Business Units
  private ubuCollection: AngularFirestoreCollection<UserBusinessUnit>
  public userBusinessUnits: Observable<UserBusinessUnit[]>

  //  Observables for User RFx Categories
  private ucCollection: AngularFirestoreCollection<UserCategory>
  public userCategories: Observable<UserCategory[]>

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

    this.usrCollection = afs.collection<User>('users')
    this.users = this.usrCollection.valueChanges()

    this.vrCollection = afs.collection<ViewRole>('view-roles')
    this.viewRoles = this.vrCollection.valueChanges()

    this.ubuCollection = afs.collection<UserBusinessUnit>('user-business-units')
    this.userBusinessUnits = this.ubuCollection.valueChanges()

    this.ucCollection = afs.collection<UserCategory>('user-categories')
    this.userCategories = this.ucCollection.valueChanges()
  }

  // CUD calls for Business Unit
  public createBusinessUnit( data: BusinessUnit ): Promise<any> {
    data.active = true
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

  public updateBusinessUnitStatus( docId: string, status: boolean): Promise<any> {
    return this.buCollection.doc(docId).update({ active: status })
  }

  // CUD calls for Client Agency
  public createClientAgency( data: ClientAgency ): Promise<any> {
    data.active = true
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

  public updateClientAgencyStatus( docId: string, status: boolean): Promise<any> {
    return this.caCollection.doc(docId).update({ active: status })
  }

  // CUD calls for RFx Category
  public createRfxCategory( data: RfxCategory ): Promise<any> {
    data.active = true
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

  public updateRfxCategoryStatus( docId: string, status: boolean): Promise<any> {
    return this.rcCollection.doc(docId).update({ active: status })
  }

  // CUD calls for RFx Type
  public createRfxType( data: RfxType ): Promise<any> {
    data.active = true
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

  public updateRfxTypeStatus( docId: string, status: boolean): Promise<any> {
    return this.rtCollection.doc(docId).update({ active: status })
  }

  // CUD calls for RFx Document Type
  public createRfxDocumentType( data: RfxDocumentType ): Promise<any> {
    data.active = true
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

  public updateRfxDocumentTypeStatus( docId: string, status: boolean): Promise<any> {
    return this.rdtCollection.doc(docId).update({ active: status })
  }

  // CUD calls for Proposal Document Type
  public createProposalDocumentType( data: ProposalDocumentType ): Promise<any> {
    data.active = true
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

  public updateProposalDocumentTypeStatus( docId: string, status: boolean): Promise<any> {
    return this.pdtCollection.doc(docId).update({ active: status })
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

  // CUD calls for Users
  public createUser( data: User ): Promise<any> {
    data.active = true
    return this.usrCollection.add(data)
  }

  public attachIdToUser( docId: string): Promise<any> {
    return this.usrCollection.doc(docId).update({ id: docId })
  }

  public updateUser( data: User): Promise<any> {
    return this.usrCollection.doc(data.id).set(data)
  }

  public updateUserStatus( docId: string, status: boolean): Promise<any> {
    return this.usrCollection.doc(docId).update({ active: status })
  }

  // CUD calls for View Roles
  public createViewRole( data: ViewRole ): Promise<any> {
    return this.vrCollection.add(data)
  }

  public attachIdToViewRole( docId: string): Promise<any> {
    return this.vrCollection.doc(docId).update({ id: docId })
  }

  public updateViewRole( data: ViewRole): Promise<any> {
    return this.vrCollection.doc(data.id).set(data)
  }

  public deleteViewRole( docId: string): Promise<any> {
    return this.vrCollection.doc(docId).delete()
  }

  // CUD calls for User Business Units
  public createUserBusinessUnit( data: UserBusinessUnit ): Promise<any> {
    return this.ubuCollection.add(data)
  }

  public attachIdToUserBusinessUnit( docId: string): Promise<any> {
    return this.ubuCollection.doc(docId).update({ id: docId })
  }

  public updateUserBusinessUnit( data: UserBusinessUnit): Promise<any> {
    return this.ubuCollection.doc(data.id).set(data)
  }

  public deleteUserBusinessUnit( docId: string): Promise<any> {
    return this.ubuCollection.doc(docId).delete()
  }

  // CUD calls for User RFx Categories
  public createUserCategory( data: UserCategory ): Promise<any> {
    return this.ucCollection.add(data)
  }

  public attachIdToUserCategory( docId: string): Promise<any> {
    return this.ucCollection.doc(docId).update({ id: docId })
  }

  public updateUserCategory( data: UserCategory): Promise<any> {
    return this.ucCollection.doc(data.id).set(data)
  }

  public deleteUserCategory( docId: string): Promise<any> {
    return this.ucCollection.doc(docId).delete()
  }
}

export interface BusinessUnit { 
  id?: string,
  name: string,
  description: string,
  date: string,
  active: boolean
}

export interface ClientAgency { 
  id?: string,
  type: string,
  name: string,
  description: string,
  state: string,
  active: boolean
}

export interface RfxCategory {
  id?: string,
  code: string,
  display_text: string,
  help_text: string,
  active: boolean
}

export interface RfxType {
  id?: string,
  code: string,
  display_text: string,
  help_text: string,
  active: boolean
}

export interface RfxDocumentType {
  id?: string,
  type: string,
  description: string,
  help_text: string,
  active: boolean
}

export interface ProposalDocumentType {
  id?: string,
  type: string,
  description: string,
  help_text: string,
  active: boolean
}

export interface UserRole {
  id?: string,
  name: string,
  text: string,
  help_text: string,
  active: boolean
}

export interface User {
  id? : string,
  name: string,
  email: string,
  phone: string,
  role_id: string,
  active: boolean
}

export interface ViewRole {
  id?: string,
  role_id: string,
  pre_rfx: boolean,
  rfx: boolean,
  proposer: boolean,
  contracts_manager: boolean,
  task_orders: boolean,
  all: boolean
}

export interface UserBusinessUnit {
  id?: string,
  user_id: string,
  bu_ids: string[]
}

export interface UserCategory { 
  id?: string,
  user_id: string,
  cat_ids: string
}