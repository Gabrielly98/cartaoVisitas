import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { AlertController, ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [Camera]
})
export class HomePage {
  img: string = "/assets/imagens/avatar.jpg"; /* Declarando a imagem */
  /* states = estados do brasil, para criar um seletor */
  states: object = [
    { nome: 'Acre', sigla: 'AC' },
    { nome: 'Alagoas', sigla: 'AL' },
    { nome: 'Amapá', sigla: 'AP' },
    { nome: 'Amazonas', sigla: 'AM' },
    { nome: 'Bahia', sigla: 'BA' },
    { nome: 'Ceará', sigla: 'CE' },
    { nome: 'Distrito Federal', sigla: 'DF' },
    { nome: 'Espírito Santo', sigla: 'ES' },
    { nome: 'Goiás', sigla: 'GO' },
    { nome: 'Maranhão', sigla: 'MA' },
    { nome: 'Mato Grosso', sigla: 'MT' },
    { nome: 'Mato Grosso do Sul', sigla: 'MS' },
    { nome: 'Minas Gerais', sigla: 'MG' },
    { nome: 'Pará', sigla: 'PA' },
    { nome: 'Paraíba', sigla: 'PB' },
    { nome: 'Paraná', sigla: 'PR' },
    { nome: 'Pernambuco', sigla: 'PE' },
    { nome: 'Piauí', sigla: 'PI' },
    { nome: 'Rio de Janeiro', sigla: 'RJ' },
    { nome: 'Rio Grande do Norte', sigla: 'RN' },
    { nome: 'Rio Grande do Sul', sigla: 'RS' },
    { nome: 'Rondônia', sigla: 'RO' },
    { nome: 'Roraima', sigla: 'RR' },
    { nome: 'Santa Catarina', sigla: 'SC' },
    { nome: 'São Paulo', sigla: 'SP' },
    { nome: 'Sergipe', sigla: 'SE' },
    { nome: 'Tocantins', sigla: 'TO' }];

  nome; sobrenome; endereco; email; numero; cep; uf; cidade; telcom: FormControl;
  cadastroForm: FormGroup;

  /* Criei um grupo com as variaveis do formulario para fazer a validação */
  constructor(private formBuilder: FormBuilder,
    private camera: Camera,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController) {
    this.cadastroForm = this.formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      endereco: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      uf: [null, [Validators.required]],
      cep: [null, [Validators.required]],
      telcom: [null, [Validators.required]],
      sobrenome: [null, [Validators.required]]
    });
  }
  /* Função para tirar a foto, salvar e mostrar ela no avatar */
  tirarFoto() {
    this.img = ""
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options)
    .then((imageData) => {
      let base64image = 'data:image/jpeg;base64,' + imageData;
      this.img = base64image;
    }, (error) => {
      console.error(error);
    });
  }
  /* Função para selecionar foto da galeria */

  /*  selecionarGaleria() {
    this.img = ""
     const options: CameraOptions = {
       quality: 100,
       destinationType: this.camera.DestinationType.DATA_URL,
       encodingType: this.camera.EncodingType.JPEG,
       sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
     };
     this.camera.getPicture(options)
     .then((imageData) => {
       let base64image = 'data:image/jpeg;base64,' + imageData;
       this.img = base64image;
     }, (err) => {
     });
   } */


  /* Função de alerta para gerar o cartão */
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Cartão Gerado!',
      message: 'Retirar seu cartão de visitante na recepção.',
      buttons: ['OK']
    });

    await alert.present();

  }
/* Função para selecionar tirar/escolher/cancelar foto */
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albuns',
      buttons: [{
        text: 'Tirar Foto',
        role: 'foto',
        icon: 'camera-outline',
        handler: () => {
          this.tirarFoto();
        }
      }, {
        text: 'Selecionar da Galeria',
        icon: 'images-outline',
        handler: () => {
          /* this.selecionarGaleria(); */
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => { }
      }]
    })
    await actionSheet.present();
  }

}
