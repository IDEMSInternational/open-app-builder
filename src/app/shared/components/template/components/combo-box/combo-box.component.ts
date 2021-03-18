import { Component, Input, OnInit } from "@angular/core";
import { ITemplateComponent } from "../tmpl.component";
import { FlowTypes } from "../../../../model";
import { ModalController } from "@ionic/angular";
import { ComboBoxModalComponent } from "../../../common/components/combo-box-modal/combo-box-modal.component";
import { FormGroup } from "@angular/forms";
import { getStringParamFromTemplateRow } from 'src/app/shared/utils';

@Component({
  selector: "plh-combo-box",
  templateUrl: "./combo-box.component.html", 
  styleUrls: ["./combo-box.component.scss"]
})
export class TmplComboBoxComponent implements ITemplateComponent, OnInit {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
  
  placeholder: string;
  customAnswerSelected: boolean = false;

  constructor(private modalController: ModalController) {
  }

  ngOnInit(): void {
    this.getParams()
    var listAnswers = getStringParamFromTemplateRow(this.row, "list_of_answers", null);
    this.customAnswerSelected = listAnswers && this.row.value && this.row.value ? !listAnswers.split(";").find(x => x == this.row.value) : false;
    this.row.value = this.row.value || this.placeholder;
  }

  getParams() {
    this.placeholder = getStringParamFromTemplateRow(this.row, "placeholder", "");
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ComboBoxModalComponent,
      cssClass: "my-custom-modal",
      componentProps: {
        "row": this.row,
        "template": this.template,
        "localVariables": this.localVariables,
        "selectedValue":  this.row.value,
        "customAnswerSelected": this.customAnswerSelected
      },
      showBackdrop: false
    });

    modal.onDidDismiss().then((data) => {
      this.row.value = data.data.answer || this.placeholder;
      this.customAnswerSelected = data.data.customAnswerSelected;
    });

    await modal.present();
  }
}
