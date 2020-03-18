import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private buCollection: AngularFirestoreCollection<BusinessUnit>;
  public businessUnits: Observable<BusinessUnit[]>;

  constructor(private afs: AngularFirestore) {
    this.buCollection = afs.collection<BusinessUnit>('business-units');
    this.businessUnits = this.buCollection.valueChanges()

    // this.businessUnits.subscribe( res => {
    //   console.log('the bu steams sends: ', res)
    // })
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

  public deleteBusinessUnit( buId: string): Promise<any> {
    return this.buCollection.doc(buId).delete()
  }
}

export interface BusinessUnit { 
  id?: string,
  name: string,
  description: string,
  date: string
}
