var Empresas = null;
var Empresa = null;

function NewEmpresa(){
	return {
		Codigo: null,
		Nome_Fantasia: '',
		Data_Fundacao: '',
		Razao_Social: '',
		Quantidade_Funcionarios: '',
		Faturamento: '',
		Capital_Social: '',
		Inscricao_Estadual: '',
		CNPJ: '',
		Cidade: '',
		CEP: '',
		Bairro: '',
		Endereco: '',
		Descricao: '',
		Email: '',
		Telefone: '',
		Grupo_Empresarial: '',
		Filiais: []
	};
}

function validarEmpresa(){
	if ($("#ovTXT_Codigo").val() === "") {
		$("#ovTXT_Codigo").focus();
		return false;
	}

	if (Empresa.Codigo == null){	
		var EmpresaEncontrada = Empresas.filter(function (emp, index){
			return emp.Codigo == $("#ovTXT_Codigo").val();
		});

		if(EmpresaEncontrada.length > 0){
			alert("Empresa já cadastrada!");
			$("#ovTXT_Codigo").focus();
			return false;
		}
	}

	if ($("#ovTXT_Razao_Social").val() === "") {
		$("#ovTXT_Razao_Social").focus();
		return false;
	}
	if ($("#ovTXT_Nome_Fantasia").val() === "") {
		$("#ovTXT_Nome_Fantasia").focus();
		return false;
	}
	if ($("#ovTXT_Grupo_Empresarial").val() === "") {
		$("#ovTXT_Grupo_Empresarial").focus();
		return false;
	}
	if ($("#ovTXT_CNPJ").val() === "") {
		$("#ovTXT_CNPJ").focus();
		return false;
	}
	if ($("#ovTXT_Endereco").val() === "") {
		$("#ovTXT_Endereco").focus();
		return false;
	}
	return true;
}

function salvar() {
	if (!validarEmpresa())
		return;

	if(Empresa.Codigo == null)
	Empresa.Codigo = $("#ovTXT_Codigo").val();
	Empresa.Nome_Fantasia = $("#ovTXT_Nome_Fantasia").val();
	Empresa.Data_Fundacao = $("#ovTXT_Data_Fundacao").val();
	Empresa.Razao_Social = $("#ovTXT_Razao_Social").val();
	Empresa.Grupo_Empresarial = $("#ovTXT_Grupo_Empresarial").val();
	Empresa.Quantidade_Funcionarios = $("#ovTXT_Funcionarios").val();
	Empresa.Faturamento = $("#ovTXT_Faturamento").val();
	Empresa.Capital_Social = $("#ovTXT_Capital_Social").val();
	Empresa.Inscricao_Estadual = $("#ovTXT_Inscricao_Estadual").val();
	Empresa.CNPJ = $("#ovTXT_CNPJ").val();
	Empresa.Cidade = $("#ovTXT_Cidade").val();
	Empresa.Bairro = $("#ovTXT_Bairro").val();
	Empresa.Endereco = $("#ovTXT_Endereco").val();
	Empresa.Descricao = $("#ovTXT_Descricao").val();
	Empresa.Email = $("#ovTXT_Email").val();
	Empresa.Telefone = $("#ovTXT_Telefone").val();

	var EmpExiste = Empresas.filter(function (emp){
		return emp.Codigo == Empresa.Codigo;
	}).length > 0;

	if (EmpExiste) {
		Empresas.map(function(index, emp){
			if (emp.Codigo == Empresa.Codigo){
			emp.Descricao = Empresa.Descricao;
			emp.Valor = Empresa.Valor;
			}
		});
	} 
	else
	Empresas.push(Empresa);

	$("#modal-cadastro").modal("hide");
	carregarEmpresas();
}

function carregarEmpresas() {
	$("#ovTR_Dados tbody#empresa").html("");
	Empresas.map(function (emp, index){
		let buttons = 		
						"<button type='button'" +
						"	class='btn btn-editar-empresa btn-xs btn-secondary'" +
						"	data-codigoempresa='" + emp.Codigo + "'" +
						">Editar</button>" +
						
						"<button type='button'" +
						"	class='btn btn-remover-empresa btn-xs btn-danger'" + 
						"	data-codigoempresa='" + emp.Codigo + "'" +
						">Remover</button>";
		let line = "<tr>" +
						"<td>" + emp.Codigo + "</td>" +
						"<td>" + emp.Nome_Fantasia + "</td>" +
						"<td>" + emp.CNPJ + "</td>" +
						"<td>" + emp.Telefone + "</td>" +
						"<td>" + buttons + "</td>" +
					"</tr>";
		$("#ovTR_Dados tbody#empresa").append(line);
	});
    addEventEditar();
	addEventRemover();
}

function remover(codigoEmpresa){
	var EmpresaEncontrada = Empresas.filter(function(emp, index){
		return emp.Codigo == codigoEmpresa;
	})[0];

	if(!confirm("Deseja remover a empresa: "
		+ EmpresaEncontrada.Nome_Fantasia + "?"))
		return;
	
		Empresas = Empresas.filter(function(emp, index){
		return emp.Codigo != codigoEmpresa;
	});
	carregarEmpresas();
}

function addEmpresa(){

	Empresa = NewEmpresa();
	$("#ovTXT_Codigo").val("");
	$("#ovTXT_Nome_Fantasia").val("");
	$("#ovTXT_Data_Fundacao").val("");
	$("#ovTXT_Razao_Social").val("");
	$("#ovTXT_Grupo_Empresarial").val("");

	$("#ovTXT_Funcionarios").val("");
	$("#ovTXT_Faturamento").val("");
	$("#ovTXT_Capital_Social").val("");
	$("#ovTXT_Inscricao_Estadual").val("");
	$("#ovTXT_CNPJ").val("");
	$("#ovTXT_Cidade").val("");
	$("#ovTXT_CEP").val("");
	$("#ovTXT_Bairro").val("");
	$("#ovTXT_Endereco").val("");
	$("#ovTXT_Descricao").val("");
	$("#ovTXT_Email").val("");
	$("#ovTXT_Telefone").val("");

	$("#modal-cadastro").modal("show");

	carregarFiliais();
}

$(document).ready(function(){
	Empresas = [];

	$(document).on("click", "#ovBTN_Adicionar", addEmpresa);
	$(document).on("click", "#ovBTN_Salvar", salvar);

	addEventRemover();
	addEventEditar();
});

function addEventRemover(){
	$(".btn-remover-empresa").each(function (indice, btn){
		$(btn).on("click", function (){
			var codigoEmpresa = $(this).data("codigoempresa");
			remover(codigoEmpresa);
		});
	});
}

function Editar(codigoEmpresa) {
	Empresa = Empresas.filter(function(emp, index){
		return emp.Codigo == codigoEmpresa;
	})[0];

	carregarFiliais();

	$("#ovTXT_Codigo").val(Empresa.Codigo);
	$("#ovTXT_Nome_Fantasia").val(Empresa.Nome_Fantasia);
	$("#ovTXT_Data_Fundacao").val(Empresa.Data_Fundacao);
	$("#ovTXT_Razao_Social").val(Empresa.Razao_Social);
	$("#ovTXT_Grupo_Empresarial").val(Empresa.Grupo_Empresarial);

	$("#ovTXT_Funcionarios").val(Empresa.Quantidade_Funcionarios);
	$("#ovTXT_Faturamento").val(Empresa.Faturamento);
	$("#ovTXT_Capital_Social").val(Empresa.Capital_Social);
	$("#ovTXT_Inscricao_Estadual").val(Empresa.Inscricao_Estadual);
	$("#ovTXT_CNPJ").val(Empresa.CNPJ);
	$("#ovTXT_Cidade").val(Empresa.Cidade);
	$("#ovTXT_CEP").val(Empresa.CEP);
	$("#ovTXT_Bairro").val(Empresa.Bairro);
	$("#ovTXT_Endereco").val(Empresa.Endereco);
	$("#ovTXT_Descricao").val(Empresa.Descricao);
	$("#ovTXT_Email").val(Empresa.Email);
	$("#ovTXT_Telefone").val(Empresa.Telefone);
	
	$("#modal-cadastro").modal("show");
}

function addEventEditar(){
	$(".btn-editar-empresa").each(function (indice, btn){
		$(btn).on("click", function (){
			var codigoEmpresa = $(this).data("codigoempresa");
			Editar(codigoEmpresa);
		});
	});
}


/* ================FILIAL*================ */
/* ======================================= */

var Filial = null;

function NewFilial(){
	return {
		Codigo: null,
		Descricao: '',
		Sigla: '',
		CNPJ: '',
		Inscricao_Estadual: '',
		Cidade: '',
		CEP: '',
		Bairro: '',
		Endereco: '',
		Telefone: '',
		Email: '',
	};
}

function validarFilial(){
	if ($("#ovTXT_Filial_Codigo").val() === "") {
		$("#ovTXT_Filial_Codigo").focus();
		return false;
	}
	if (Empresa.Filial.Codigo == null){	
		var FilialEncontrada = Empresa.Filiais.filter(function (filial, index){
			return filial.Codigo == $("#ovTXT_Filial_Codigoo").val();
		});
		if(FilialEncontrada.length > 0){
			alert("Filial já cadastrada!");
			$("#ovTXT_Filial_Codigo").focus();
			return false;
		}
	}
	if ($("#ovTXT_Filial_Descricao").val() === "") {
		$("#ovTXT_Filial_Descricao").focus();
		return false;
	}
	if ($("#ovTXT_Filial_CNPJ").val() === "") {
		$("#ovTXT_Filial_CNPJ").focus();
		return false;
	}
	if ($("#ovTXT_Filial_Endereco").val() === "") {
		$("#ovTXT_Filial_Endereco").focus();
		return false;
	}
	return true;
}

function salvarFilial() {
	if (!validarFilial())
		return;

	if(Empresa.Filial.Codigo == null)
	Empresa.Filial.Codigo = $("#ovTXT_Filial_Codigo").val();
	Empresa.Filial.Descricao = $("#ovTXT_Filial_Descricao").val();
	Empresa.Filial.Sigla = $("#ovTXT_Filial_Sigla").val();
	Empresa.Filial.CNPJ = $("#ovTXT_Filial_CNPJ").val();
	Empresa.Filial.Inscricao_Estadual = $("#ovTXT_Filial_Inscricao_Estadual").val();
	Empresa.Filial.CEP = $("#ovTXT_Filial_CEP").val();
	Empresa.Filial.Cidade = $("#ovTXT_Filial_Cidade").val();
	Empresa.Filial.Bairro = $("#ovTXT_Filial_Bairro").val();
	Empresa.Filial.Endereco = $("#ovTXT_Filial_Endereco").val();
	Empresa.Filial.Telefone = $("#ovTXT_Filial_Telefone").val();
	Empresa.Filial.Email = $("#ovTXT_Filial_Email").val();

	var FilialExiste = Empresa.Filiais.filter(function (filial){
		return filial.Codigo == Empresa.Filial.Codigo;
	}).length > 0;

	if (FilialExiste) {
		Empresa.Filiais.map(function(index, filial){
			if (filial.Codigo == Empresa.Filial.Codigo){
			filial.Descricao = Empresa.Filial.Descricao;
			filial.Valor = Empresa.Filial.Valor;
			}
		});
	} 
	else
	Empresa.Filiais.push(Empresa.Filial);

	$("#modal-cadastro-filial").modal("hide");
	carregarFiliais();
}

function carregarFiliais() {
	$("#ovTR_Dados-filial tbody#filial").html("");

	Empresa.Filiais.map(function (filial, index){
		let buttons = "<button type='button'" +
						"	class='btn btn-editar-filial btn-xs btn-secondary'" +
						"	data-codigofilial='" + filial.Codigo + "'" +
						">Editar</button>" +
						
						"<button type='button'" +
						"	class='btn btn-remover-filial btn-xs btn-danger'" + 
						"	data-codigofilial='" + filial.Codigo + "'" +
						">Remover</button>";
		let line = "<tr>" +
						"<td>" + filial.Codigo + "</td>" +
						"<td>" + filial.Descricao + "</td>" +
						"<td>" + filial.CNPJ + "</td>" +
						"<td>" + filial.Telefone + "</td>" +
						"<td>" + buttons + "</td>" +
					"</tr>";
		$("#ovTR_Dados-filial tbody#filial").append(line);
	});
    addEventEditarFilial();
	addEventRemoverFilial();
}

function removerFilial(codigoFilial){
	var FilialEncontrada = Empresa.Filiais.filter(function(filial, index){
		return filial.Codigo == codigoFilial;
	})[0];

	if(!confirm("Deseja remover a filial: "
		+ FilialEncontrada.Descricao + "?"))
		return;
	
		Empresa.Filiais = Empresa.Filiais.filter(function(filial, index){
		return filial.Codigo != codigoFilial;
	});
	carregarFiliais();
}

function addFilial(){
	if(!validarEmpresa()){
		window.alert('É necessario cadastar uma empresa primeiro!')
		return;
	}
	Empresa.Filial = NewFilial();
	$("#ovTXT_Filial_Codigo").val("");
	$("#ovTXT_Filial_Descricao").val("");
	$("#ovTXT_Filial_Sigla").val("");
	$("#ovTXT_Filial_CNPJ").val("");
	$("#ovTXT_Filial_Inscricao_Estadual").val("");

	$("#ovTXT_Filial_Cidade").val("");
	$("#ovTXT_Filial_CEP").val("");
	$("#ovTXT_Filial_Bairro").val("");

	$("#ovTXT_Filial_Endereco").val("");
	$("#ovTXT_Filial_Telefone").val("");
	$("#ovTXT_Filial_Email").val("");

	$("#modal-cadastro-filial").modal("show");
}

$(document).ready(function(){
	Filiais = [];

	$(document).on("click", "#ovBTN_Adicionar-filial", addFilial);
	$(document).on("click", "#ovBTN_Salvar-filial", salvarFilial);

	addEventRemoverFilial();
	addEventEditarFilial();
});

function addEventRemoverFilial(){
	$(".btn-remover-filial").each(function (indice, btn){
		$(btn).on("click", function (){
			var codigoFilial = $(this).data("codigofilial");
			removerFilial(codigoFilial);
		});
	});
}

function EditarFilial(codigoFilial) {
	Empresa.Filial = Empresa.Filiais.filter(function(filial, index){
		return filial.Codigo == codigoFilial;
	})[0];

	$("#ovTXT_Filial_Codigo").val(Empresa.Filial.Codigo);
	$("#ovTXT_Filial_Descricao").val(Empresa.Filial.Descricao);
	$("#ovTXT_Filial_Sigla").val(Empresa.Filial.Sigla);
	$("#ovTXT_Filial_CNPJ").val(Empresa.Filial.CNPJ);
	$("#ovTXT_Filial_Inscricao_Estadual").val(Empresa.Filial.Inscricao_Estadual);

	$("#ovTXT_Filial_Cidade").val(Empresa.Filial.Cidade);
	$("#ovTXT_Filial_CEP").val(Empresa.Filial.CEP);
	$("#ovTXT_Filial_Bairro").val(Empresa.Filial.CEP);

	$("#ovTXT_Filial_Endereco").val(Empresa.Filial.Endereco);
	$("#ovTXT_Filial_Telefone").val(Empresa.Filial.Telefone);
	$("#ovTXT_Filial_Email").val(Empresa.Filial.Email);
	
	$("#modal-cadastro-filial").modal("show");
}

function addEventEditarFilial(){
	$(".btn-editar-filial").each(function (indice, btn){
		$(btn).on("click", function (){
			var codigoFilial = $(this).data("codigofilial");
			EditarFilial(codigoFilial);
		});
	});
}