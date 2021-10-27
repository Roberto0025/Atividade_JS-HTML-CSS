var Usuario = {
	login: 'Teste',
	senha: 123	
};

function autenticarUsuario(){
	if (Usuario.login == $("#ovTXT_Usuario").val() &&
	    Usuario.senha == $("#ovTXT_Senha").val()){
		window.location = window.location.href.replace("login", "index");
	} else {
		alert("Usuário/Senha incorretos!");		
	}
}

$(document).ready(function() {
	$(document).on("click", "#ovBTN_Login", autenticarUsuario);
});