import AlertCustomInterface from "../../../interface/alertCustom";

class PreAlert {

  static success(msm: string, title?: string): AlertCustomInterface {
    return {
      title: title || 'Sucesso!',
      msm,
      icon: 'Check',
      color: 'success',
      timer: 3000,
    }
  }

  static error(msm: string, title?: string): AlertCustomInterface {
    return {
      title: title || 'ERRO!',
      msm,
      icon: 'ErrorOutline',
      color: 'danger',
      timer: 10000,
    }
  }

}

export default PreAlert;