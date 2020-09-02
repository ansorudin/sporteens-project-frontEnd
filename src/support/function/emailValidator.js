// function emailValidator(email){
//     // jika email terdapat spasi
//     for(var i = 0 ; i < email.length ; i ++){
//         if(email[i] === ' ') return false
//     }

//     var emailSplit = email.split('@')

//     // cek ada @ atau tidak
//     if(emailSplit.length !== 2) return false

//     var username = emailSplit[0]
//     var hosting = emailSplit[1]

//     // cek sebelum @ ada char dan setelah @ ada char
//     if(username === '' || hosting === '') return false

//     // cek char pertama email  bukan angka
//     if(username[0] >= 0) return false

//     var hostingSplit = hosting.split('.')
//     // cek apakah ada . sebelum domain
//     if(hostingSplit.length !== 2) return false

//     var domainName = hostingSplit[0]
//     var extension = hostingSplit[1]
//     if(domainName === '' || extension === '') return true
// }

function emailValidator(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase());
}


export default emailValidator