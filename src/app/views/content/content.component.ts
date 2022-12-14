import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ContentComponent implements OnInit {
  file: any
  pdfSrc: any
  maintanibilityForm = new FormGroup({
    nC: new FormControl(''),
    nA: new FormControl(''),
    nR: new FormControl(''),
    DITmax: new FormControl(''),
    HAggMax: new FormControl(''),


  })

  understandabilityForm = new FormGroup({
    nC: new FormControl(''),
    PRED: new FormControl(''),
  })
  complexityForm = new FormGroup({
    NR: new FormControl(''),
    NUR: new FormControl(''),
    NOPR: new FormControl(''),
    NCR: new FormControl(''),

  })
  NcM: any
  NaM: any
  NrM: any
  DITmax: any
  HAggMax: any
  Maint: any
  maintResult: any
  NRC: any
  NUR: any
  NOPR: any
  NCR: any
  UND: number
  complexity: any
  NCU: any
  PRED: any
  NcMNormalized: number
  NaMNormalized: number
  NrMNormalized: number
  DITmaxNormalized: number
  HAggMaxNormalized: number
  NumArray: any[]
  minNumber: number
  maxNumber: number
  different: number
  rangeMax: number
  rangeMin: number
  ComplexityText: any
  UnderstandibilityText: string
  modelQuality: string


  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static'
    config.keyboard = false
  }

  ngOnInit(): void {}

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

  open(maintainability) {
    this.modalService.open(maintainability)
  }

  show(Complexity) {
    this.modalService.open(Complexity)
  }
  modal(understandability) {
    this.modalService.open(understandability)
  }

  calculateMainatinability(){
    this.modalService.dismissAll();
    this.NcM = this.maintanibilityForm.value.nC;
    this.NaM = this.maintanibilityForm.value.nA;
    this.NrM = this.maintanibilityForm.value.nR;
    this.DITmax = this.maintanibilityForm.value.DITmax;
    this.HAggMax = this.maintanibilityForm.value.HAggMax;

    this.rangeMax =  .4;
    this.rangeMin = 0;

    this.NumArray = [this.maintanibilityForm.value.nC,
                    this.maintanibilityForm.value.nA,
                    this.maintanibilityForm.value.nR,
                    this.maintanibilityForm.value.DITmax,
                    this.maintanibilityForm.value.HAggMax];

    this.minNumber =  Math.min.apply(null, this.NumArray);
    this.maxNumber = Math.max.apply(null, this.NumArray);
    this.different = this.maxNumber - this.minNumber;

    this.NcM = this.rangeMin+(((this.NcM- (this.minNumber))*(this.rangeMax- this.rangeMin))/ this.different) ;
    this.NaM =  this.rangeMin+(((this.NaM- (this.minNumber))*(this.rangeMax- this.rangeMin))/ this.different) ;
    this.NrM =  this.rangeMin+(((this.NrM- (this.minNumber))*(this.rangeMax- this.rangeMin))/ this.different) ;
    this.DITmax=  this.rangeMin+(((this.DITmax- (this.minNumber))*(this.rangeMax- this.rangeMin))/ this.different) ;
    this.HAggMax =  this.rangeMin+(((this.HAggMax- (this.minNumber))*(this.rangeMax- this.rangeMin))/ this.different) ;

    this.Maint = ((this.NcM +  this.NaM + this.NrM + this.DITmax + this.HAggMax)/5);


    console.log(this.NcM,  this.NaM, this.NrM, this.DITmax, this.HAggMax);

    if( this.Maint < 0.1){
      this.maintResult = "Easy";
    }else if( this.Maint >= 0.1 && this.Maint < 0.2){
      this.maintResult = "Medium";
    }else if(this.Maint >= 0.2){
      this.maintResult = "Difficult";
    }
    this.maintanibilityForm.reset();

  }

  calculateComplexity(){
    this.modalService.dismissAll();
    this.NRC = this.complexityForm.value.NR;
    this.NUR = this.complexityForm.value.NUR;
    this.NOPR = this.complexityForm.value.NOPR;
    this.NCR = this.complexityForm.value.NCR;
    console.log(this.UND);
    this.complexity= ( this.NRC- this.NUR + this.NOPR+ this.UND + (this.NRC - this.NCR));

      if(this.complexity < 30){
        this.ComplexityText = "Simple";
        this.UnderstandibilityText = "Easy";
      }else{
        this.ComplexityText = "Complex";
        this.UnderstandibilityText = "Difficult";

      }
      this.calculateOverallQuality();
      this.complexityForm.reset();
  }


  calculateUnderstandability(){
    this.modalService.dismissAll();
    this.NCU = this.understandabilityForm.value.nC;
    this.PRED = this.understandabilityForm.value.PRED; // total PRED
    this.UND = (this.PRED + 1)/this.NCU;
    this.understandabilityForm.reset();

  }

   loadModal(showRules) {
     this.modalService.open(showRules)
   }

  calculateOverallQuality(){
    if(this.complexity < 30 &&  this.Maint < .2 ){
      this.modelQuality = "GOOD"
    }else if(this.complexity > 30 &&  this.Maint >= .2){
      this.modelQuality = "POOR"
    }else if (this.complexity < 30 &&  this.Maint >= .2){
      this.modelQuality = "MODERATE"
    }else if (this.complexity > 30 &&   this.Maint < .2){
      this.modelQuality = "MODERATE"
    }
  }

  // function(val, max, min) { return (val - min) / (max - min); }
}
