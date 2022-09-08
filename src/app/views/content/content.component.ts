import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  file: any
  pdfSrc: any
  @ViewChild('maintainabiltymodal') maintainabiltymodal: any;
  @ViewChild('Complexitymodal') Complexitymodal: any;
  @ViewChild('Understandabilitymodal') Understandabilitymodal: any;

  maintainabiltymodalForm: FormGroup;
  Complexitymodalform: FormGroup;
  Understandabilitymodalform: FormGroup;



  constructor(private fb: FormBuilder) {}


  ngOnInit(): void {
this.initializeComplexityform();
this.initializemaintainabilityform();
this.initializeunderstandabilityform();  }

  onFileSelected() {
    let $img: any = document.querySelector('#file')

    if (typeof FileReader !== 'undefined') {
      let reader = new FileReader()

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result
      }

      reader.readAsArrayBuffer($img.files[0])
    }
  }

  maintainabiltymodalshow() {
    this.maintainabiltymodal.show()
  }
  maintainabiltymodalClose() {
    this.maintainabiltymodal.hide()
  }

  initializemaintainabilityform(){
    this.maintainabiltymodalForm = this.fb.group({

      title: new FormControl('', Validators.required),
    });

  }

  initializeComplexityform(){
    this.Complexitymodalform = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(25)]],
      location: ['', [Validators.maxLength(25)]],
    })

  }
  initializeunderstandabilityform(){
    this.Understandabilitymodalform = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(25)]],
      location: ['', [Validators.maxLength(25)]],
    })
  }
}
