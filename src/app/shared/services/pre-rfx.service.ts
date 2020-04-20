import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, Query, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PreRfxService {
  
  // Observables for Pre-RFx
  private preRfxCollection: AngularFirestoreCollection<PreRFx>
  public preRfxs: Observable<PreRFx[]>

  private basePath: string = '/rfx-attachments'
  private uploadTask: firebase.storage.UploadTask

  constructor(
    private afs: AngularFirestore
  ) { 
    this.preRfxCollection = this.afs.collection<PreRFx>('pre-rfx')
    this.preRfxs = this.preRfxCollection.valueChanges()
  }

  public createPreRFx( data: PreRFx ): Promise<any> {
    return this.preRfxCollection.add(data)
  }

  public attachIdToPreRFx( docId: string ): Promise<any> {
    return this.preRfxCollection.doc(docId).update({ id: docId })
  }

  public updatePreRFx( data: PreRFx): Promise<any> {
    return this.preRfxCollection.doc(data.id).set(data)
  }

  public pushRFxAttachmentUpload( upload: Upload ): Promise<any> {
    let storageRef = firebase.storage().ref()
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file, { contentDisposition: `attachment; filename="${upload.file.name}"; filename*="${upload.file.name}"` } )
    return new Promise((resolve, reject) => {
      this.uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            upload.progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100
          },
          (error) => {
            reject(error)
          },
          () => {
            this.uploadTask.snapshot.ref.getDownloadURL()
              .then( downloadURL => {
                upload.url = downloadURL
                upload.name = upload.file.name
                resolve(upload)
              })
              .catch( error => {
                reject(error)
              })
            
          }
        )
    })
  }

  public deleteRFxAttachment(fileName: string): Promise<any> {
    let storageRef = firebase.storage().ref()
    if(fileName) {
      return storageRef.child(`${this.basePath}/${fileName}`).delete()
    } else {
      return new Promise( resolve => { resolve() })
    }
    
  }

  public getPreRFxById(id: string): Observable<PreRFx> {
    return this.afs.doc<PreRFx>(`pre-rfx/${id}`).valueChanges()
  }

  public searchPreRFx( params: any ): Observable<PreRFx[]> {
    if( params['query']) {
      let termArray = params['query'].toLowerCase().split(' ')
      return this.afs.collection<PreRFx>('pre-rfx', ref => ref.where('title_search_array', 'array-contains-any', termArray)).valueChanges()
    } else {
      return this.afs.collection<PreRFx>('pre-rfx', ref => {
        let query: Query = ref
        for (let key in params) {
          query = query.where(key, '==', params[key])
        }
        return query
      }).valueChanges()
    }
  }

  public updatePreRFxStatus( preRFxId: string, newstatus: string, preRFxComments: RFxComment[] ): Promise<any> {
    let updateData = {
      rfx_status_comments: preRFxComments,
      status: newstatus
    }
    return this.preRfxCollection.doc(preRFxId).update(updateData)
  }
}

export class Upload {
  $key: string
  file: File
  name: string
  url: string
  progress: number
  createdAt: Date = new Date()

  constructor(file: File) {
    this.file = file
  }
}

export interface PreRFx { 
  id?: string,
  bu_id: string,
  rfx_number: string,
  title: string,
  title_search_array?: string[]
  status: string,
  rfx_type_id: string,
  rfx_category_id: string,
  rfx_pub_date?: string,
  rfx_due_date_time: string,
  rfx_scope: string,
  rfx_min_qualifications?: string,
  rfx_comments?: string,
  rfx_constraints: {
    local_vendors: RfxConstraint,
    certification_license: RfxConstraint,
    financial_conditions: RfxConstraint,
    minority_certified: RfxConstraint,
    other_constraints: RfxConstraint
  },
  client_agency_id: string,
  state_province: string,
  pre_proposal_conf: boolean,
  pre_proposal_conf_date?: string,
  submission_format: string,
  source: string,
  source_url?: string,
  rfx_third_party_src_url?: string,
  attachment?: {
    download_url: string,
    name: string
  },
  buyer?: {
    name?: string,
    title?: string,
    contact?: string,
    email?: string
  },
  created_by_user_id?: string,
  created_on_date?: string,
  rfx_status_comments?: RFxComment[]
}

export interface RfxConstraint {
  value: boolean,
  text?: string
}

export interface RFxComment {
  date_time: string,
  sender_id: string,
  sender_name: string,
  comment_text: string,
  status: string
}
