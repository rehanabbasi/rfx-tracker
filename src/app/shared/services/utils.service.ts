import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  public htmlEmail = firebase.functions().httpsCallable('htttpEmail')
  constructor(
    private _http: HttpClient
  ) { }

  public sendEmail(emailAddress: string, email_type: string, data: any): Promise<firebase.functions.HttpsCallableResult>{
    let params = {
      to: emailAddress,
      type: email_type,
      content: data
    }

    return this.htmlEmail(params)
  }
}

export const cloudFunctionBaseURL: string = 'https://us-central1-rfx-tracker.cloudfunctions.net'
export enum EmailTypes {
  UserInvite = 'user_invite',
  PreRFxCreated = 'pre_rfx_created',
  PreRFxUpdatedByApprover = 'pre_rfx_updated_by_approver',
  PreRFxUpdatedBySearcher = 'pre_rfx_updated_by_searcher',
}
