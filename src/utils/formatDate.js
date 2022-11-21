 export function formataStringDate(data) {

	var ano  = data.split("-")[0];
	var mes  = data.split("-")[1];
	var dia  = data.split("-")[2];
  
	return  ("0"+dia).slice(-2) +'-'+ ("0"+mes).slice(-2) + '-'+ ano ;
  }