import Swal from 'sweetalert2';

const swalService = {
    success: (title, message, onClose = null) => {
        return Swal.fire({
            title: title,
            text: message,
            icon: 'success',
            confirmButtonText: 'OK',
            onClose: () => {
                if (onClose) onClose();
            }
        });
    },

    error: (title, message, onClose = null) => {
        return Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            fontSize: '16px',
            confirmButtonText: 'OK',
            onClose: () => {
                if (onClose) onClose();
            }
        });
    },

    confirm: (title, message, callback = null,) => {
        return Swal.fire({
            title: title,
            text: message,
            color: '#000',
            showCancelButton: true,
            fontSize: '20px',
            showLoaderOnConfirm: true,
            cancelButtonColor: '#F56E42',
            confirmButtonColor: '#62C6B7',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar',
            reverseButtons: true,

        }).then((result) => {
            // console.log('result', result);
            if (result.isConfirmed) {
                callback();
            }
        });
    }
}

export default swalService;