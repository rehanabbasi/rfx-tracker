import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
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
  }
  buyer?: {
    name?: string,
    title?: string,
    contact?: string,
    email?: string
  } 
}

export interface RfxConstraint {
  value: boolean,
  text?: string
}
