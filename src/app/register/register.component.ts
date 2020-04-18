import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../shared/services/auth.service';
import { AdminService, User, UserRole } from '../shared/services/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = []
  private userId: string = ''

  public registerForm = this._fb.group({
    name: ['', Validators.required],
    email: ['', [ Validators.required, Validators.email ]],
    pwd: ['', Validators.required],
    phone: ['', Validators.required],
    role_id: ['', Validators.required]
  })

  public formStatusMessage: string = ''
  public userRoles: UserRole[] = []

  constructor(
    private _auth: AuthService,
    private _admin: AdminService,
    private _fb: FormBuilder,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe( params => {
        if (params['id']) {
          this.userId = params['id']
          this.subscriptions.push(
            this.afs.doc<User>('/users/' + this.userId).valueChanges()
              .subscribe( user => {
                setTimeout(()=> {
                  this.registerForm.controls['email'].setValue(user.email)
                  this.registerForm.controls['role_id'].setValue(user.role_id)
                }, 250)
              })
          )
        }
      }),
      this._admin.userRoles.subscribe( roles => {
        this.userRoles = roles
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe()
    })
  }

  public registerSubmit(): void {
    if(this.registerForm.valid){
      this.formStatusMessage = ''
      let userData: User = {
        id: this.userId,
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        phone: this.registerForm.value.phone,
        role_id: this.registerForm.value.role_id,
        active: true
      }
      this._admin.updateUser(userData)
        .then( res => {
          this._auth.createUserAuth(this.registerForm.value.email, this.registerForm.value.pwd)
            .then( res => {
              this.router.navigateByUrl('/')
            })
            .catch( error => {
              console.error('Error while creating user auth: ', error)
            })
        })
        .catch( error => {
          console.error('Error while completing user registration: ', error)
        })
    } else {
      if (this.registerForm.controls.name.errors) {
        this.formStatusMessage = 'Name is a required field.'
      } else if (this.registerForm.controls.pwd.errors) {
        this.formStatusMessage = 'Password is a required field.'
      } else if (this.registerForm.controls.phone.errors) {
        this.formStatusMessage = 'Phone is a required field.'
      }
    }
  }

}
