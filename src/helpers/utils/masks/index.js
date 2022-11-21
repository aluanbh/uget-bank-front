export const unmask = (value) => {
  if (!value) {
    return '';
  }
  return value.replace(/\D/g, '').substring(0, value.length);
};

const masks = {
  // money(value) {
  //   const money = unmask(value);
  //   let maskedMoney = '';

  //   maskedMoney = Number(money) + '';
  //   maskedMoney = maskedMoney.replace(/[\D]+/g, '');
  //   maskedMoney = maskedMoney + '';
  //   maskedMoney = maskedMoney.replace(/([0-9]{2})$/g, ',$1');


  //   if(maskedMoney.length === 1) {
  //     maskedMoney = '0,0' + maskedMoney
  //   } else if (maskedMoney.length > 6) {
  //     maskedMoney = maskedMoney.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
  //   }

  //   return maskedMoney;
  // },

  moneyMasks(value) {
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('pt-BR', options).format(
      parseFloat(value) / 100
    )

    // console.log(result)

    return 'R$' + result
  },

  cpf(value) {
    const cpf = unmask(value);
    let maskedCpf = '';

    switch (cpf.length) {
      case 0:
        break;
      case 1:
        maskedCpf = cpf.replace(/(\d{1})/, '$1');
        break;
      case 2:
        maskedCpf = cpf.replace(/(\d{2})/, '$1');
        break;
      case 3:
        maskedCpf = cpf.replace(/(\d{3})/, '$1');
        break;
      case 4:
        maskedCpf = cpf.replace(/(\d{3})(\d{1})/, '$1.$2');
        break;
      case 5:
        maskedCpf = cpf.replace(/(\d{3})(\d{2})/, '$1.$2');
        break;
      case 6:
        maskedCpf = cpf.replace(/(\d{3})(\d{3})/, '$1.$2');
        break;
      case 7:
        maskedCpf = cpf.replace(/(\d{3})(\d{3})(\d{1})/, '$1.$2.$3');
        break;
      case 8:
        maskedCpf = cpf.replace(/(\d{3})(\d{3})(\d{2})/, '$1.$2.$3');
        break;
      case 9:
        maskedCpf = cpf.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
        break;
      case 10:
        maskedCpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
        break;
      case 11:
        maskedCpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        break;
      default:
        maskedCpf = cpf
          .substring(0, 11)
          .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        break;
    }

    return maskedCpf;
  },

  cnpj(value) {
    const cnpj = unmask(value);
    let maskedCnpj = '';

    switch (cnpj.length) {
      case 0:
        break;
      case 1:
        maskedCnpj = cnpj.replace(/(\d{1})/, '$1');
        break;
      case 2:
        maskedCnpj = cnpj.replace(/(\d{2})/, '$1');
        break;
      case 3:
        maskedCnpj = cnpj.replace(/(\d{2})(\d{1})/, '$1.$2');
        break;
      case 4:
        maskedCnpj = cnpj.replace(/(\d{2})(\d{2})/, '$1.$2');
        break;
      case 5:
        maskedCnpj = cnpj.replace(/(\d{2})(\d{3})/, '$1.$2');
        break;
      case 6:
        maskedCnpj = cnpj.replace(/(\d{2})(\d{3})(\d{1})/, '$1.$2.$3');
        break;
      case 7:
        maskedCnpj = cnpj.replace(/(\d{2})(\d{3})(\d{2})/, '$1.$2.$3');
        break;
      case 8:
        maskedCnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
        break;
      case 9:
        maskedCnpj = cnpj.replace(
          /(\d{2})(\d{3})(\d{3})(\d{1})/,
          '$1.$2.$3/$4'
        );
        break;
      case 10:
        maskedCnpj = cnpj.replace(
          /(\d{2})(\d{3})(\d{3})(\d{2})/,
          '$1.$2.$3/$4'
        );
        break;
      case 11:
        maskedCnpj = cnpj.replace(
          /(\d{2})(\d{3})(\d{3})(\d{3})/,
          '$1.$2.$3/$4'
        );
        break;
      case 12:
        maskedCnpj = cnpj.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})/,
          '$1.$2.$3/$4'
        );
        break;
      case 13:
        maskedCnpj = cnpj.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{1})/,
          '$1.$2.$3/$4-$5'
        );
        break;
      case 14:
        maskedCnpj = cnpj.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          '$1.$2.$3/$4-$5'
        );
        break;
      default:
        maskedCnpj = cnpj
          .substring(0, 14)
          .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        break;
      /*case 10:
        maskedCnpj = cnpj.replace(
          /(\d{3})(\d{3})(\d{3})(\d{1})/,
          '$1.$2.$3-$4'
        );
        break;
      case 11:
        maskedCnpj = cnpj.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          '$1.$2.$3-$4'
        );
        break;
      default:
        maskedCnpj = cnpj
          .substring(0, 11)
          .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        break;*/
    }

    return maskedCnpj;
  },

  cep(value) {
    const cep = unmask(value);
    let maskedCep = '';

    switch (cep.length) {
      case 0:
        break;
      case 1:
        maskedCep = cep.replace(/(\d{1})/, '$1');
        break;
      case 2:
        maskedCep = cep.replace(/(\d{2})/, '$1');
        break;
      case 3:
        maskedCep = cep.replace(/(\d{3})/, '$1');
        break;
      case 4:
        maskedCep = cep.replace(/(\d{4})/, '$1');
        break;
      case 5:
        maskedCep = cep.replace(/(\d{5})/, '$1');
        break;
      case 6:
        maskedCep = cep.replace(/(\d{5})(\d{1})/, '$1-$2');
        break;
      case 7:
        maskedCep = cep.replace(/(\d{5})(\d{2})/, '$1-$2');
        break;
      case 8:
        maskedCep = cep.replace(/(\d{5})(\d{3})/, '$1-$2');
        break;
      default:
        maskedCep = cep.substring(0, 8).replace(/(\d{5})(\d{3})/, '$1-$2');
        break;
    }

    return maskedCep;
  },

  phone(value) {
    const phone = unmask(value);
    let maskedPhone = '';

    switch (phone.length) {
      case 0:
        break;
      case 1:
        maskedPhone = phone.replace(/(\d{1})/, '$1');
        break;
      case 2:
        maskedPhone = phone.replace(/(\d{2})/, '$1');
        break;
      case 3:
        maskedPhone = phone.replace(/(\d{2})(\d{1})/, '($1) $2');
        break;
      case 4:
        maskedPhone = phone.replace(/(\d{2})(\d{2})/, '($1) $2');
        break;
      case 5:
        maskedPhone = phone.replace(/(\d{2})(\d{3})/, '($1) $2');
        break;
      case 6:
        maskedPhone = phone.replace(/(\d{2})(\d{4})/, '($1) $2');
        break;
      case 7:
        maskedPhone = phone.replace(/(\d{2})(\d{4})(\d{1})/, '($1) $2 $3');
        break;
      case 8:
        maskedPhone = phone.replace(/(\d{2})(\d{4})(\d{2})/, '($1) $2 $3');
        break;
      case 9:
        maskedPhone = phone.replace(/(\d{2})(\d{4})(\d{3})/, '($1) $2 $3');
        break;
      case 10:
        maskedPhone = phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2 $3');
        break;
      case 11:
        maskedPhone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2 $3');
        break;
      default:
        maskedPhone = phone
          .substring(0, 11)
          .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2 $3');
        break;
    }

    return maskedPhone;
  },

  date(value) {
    const dateValue = unmask(value);
    let maskedDate = '';

    switch (dateValue.length) {
      case 0:
        break;
      case 1:
        maskedDate = dateValue.replace(/(\d{1})/, '$1');
        break;
      case 2:
        maskedDate = dateValue.replace(/(\d{2})/, '$1');
        break;
      case 3:
        maskedDate = dateValue.replace(/(\d{2})(\d{1})/, '$1/$2');
        break;
      case 4:
        maskedDate = dateValue.replace(/(\d{2})(\d{2})/, '$1/$2');
        break;
      case 5:
        maskedDate = dateValue.replace(/(\d{2})(\d{2})(\d{1})/, '$1/$2/$3');
        break;
      case 6:
        maskedDate = dateValue.replace(/(\d{2})(\d{2})(\d{2})/, '$1/$2/$3');
        break;
      case 7:
        maskedDate = dateValue.replace(/(\d{2})(\d{2})(\d{3})/, '$1/$2/$3');
        break;
      case 8:
        maskedDate = dateValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        break;
      default:
        maskedDate = dateValue
          .substring(0, 8)
          .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        break;
    }

    return maskedDate;
  },

  password(value) {
    const passwordValue = unmask(value);
    let maskedPassword = '';

    switch (passwordValue.length) {
      case 0:
        break;
      case 1:
        maskedPassword = passwordValue.replace(/(\d{1})/, '$1');
        break;
      case 2:
        maskedPassword = passwordValue.replace(/(\d{2})/, '$1');
        break;
      case 3:
        maskedPassword = passwordValue.replace(/(\d{2})(\d{1})/, '$1/$2');
        break;
      case 4:
        maskedPassword = passwordValue.replace(/(\d{2})(\d{2})/, '$1/$2');
        break;
      case 5:
        maskedPassword = passwordValue.replace(
          /(\d{2})(\d{2})(\d{1})/,
          '$1/$2/$3'
        );
        break;
      case 6:
        maskedPassword = passwordValue.replace(
          /(\d{2})(\d{2})(\d{2})/,
          '$1/$2/$3'
        );
        break;
      case 7:
        maskedPassword = passwordValue.replace(
          /(\d{2})(\d{2})(\d{3})/,
          '$1/$2/$3'
        );
        break;
      case 8:
        maskedPassword = passwordValue.replace(
          /(\d{2})(\d{2})(\d{4})/,
          '$1/$2/$3'
        );
        break;
      default:
        maskedPassword = passwordValue
          .substring(0, 8)
          .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        break;
    }

    return maskedPassword;
  },
};

export default masks;
