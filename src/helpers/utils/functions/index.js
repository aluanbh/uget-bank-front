const functions = {
  cpfValidate(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') {
      return false;
    }
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length !== 11 ||
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false;
    }
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(9))) {
      return false;
    }
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(10))) {
      return false;
    }
    return true;
  },

  formatStringDate(date) {
    var day = date.split('/')[0];
    var month = date.split('/')[1];
    var year = date.split('/')[2];

    return year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  },

  maskStringDate(date) {
    var year = date.split('-')[0];
    var month = date.split('-')[1];
    var day = date.split('-')[2];

    return day + '/' + month + '/' + year;
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  },
};

export default functions;
