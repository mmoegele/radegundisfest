jQuery(function($) {
    $(document).ready(function () {
        // Helferliste
		$("div.helferliste").helferliste();
    }
    
	$.fn.helferliste = function(view) {
		if (this.length === 0) return;
		
		view = view || 'default';
		// Scroll-Position speichern, um sie nach dem Rendern wiederherzustellen
		var lastposition = $(window).scrollTop();
		
		var parentcontainer = $(this).empty();
		
		var row = $("<div class='row'>").appendTo(parentcontainer);
		
		var topcontainer = $("<div class='col-md-12 hidden-print'>").appendTo(row).css("margin-bottom", "20px");
		
		var listcontainer = $("<div class='col-md-12 panel-container'>").appendTo(row).css("margin-bottom","20px");
		
		var bottomcontainer = $("<div class='col-md-12 hidden-print'>").appendTo(row);
		
		$.getJSON("/intern/helferliste",function(d) {
			var auth = d.auth;
			var email = d.email;
			var authname = d.authname;
			var shifts = d.shifts;
				if ($.isEmptyObject( shifts ) ) shifts = []; //TMPFIX for lua cjson bug
			var shifts_prev = d.shifts_prev;
				if ($.isEmptyObject( shifts_prev ) ) shifts_prev = []; //TMPFIX for lua cjson bug
			var helpers = d.helpers;
				if ($.isEmptyObject( helpers ) ) helpers = []; //TMPFIX for lua cjson bug
			var helpers_prev = d.helpers_prev;
				if ($.isEmptyObject( helpers_prev ) ) helpers_prev = []; //TMPFIX for lua cjson bug
			var inquiries = d.inquiries;
				if ($.isEmptyObject( inquiries ) ) inquiries = []; //TMPFIX for lua cjson bug

			var shiftsavailable = shifts.filter(function(k){
				var sh = helpers.filter(function(j){return j.shiftid === k.shiftid});
				return k.number > sh.length
			});

			var renderprogressbar = function (shiftspro) {
				var neededhelpers = shiftspro.map(function(i) {return i.number}).reduce(function (a,b) {return a + b}, 0);
				var shiftsproids = shiftspro.map(function(i) {return i.shiftid});
				var aquiredhelpers = helpers.filter(function(i) {return shiftsproids.indexOf(i.shiftid) !== -1}).length;

				var progresscontainer = $("<div class='progress'>").appendTo(topcontainer);

				var progresspercentage = aquiredhelpers / neededhelpers * 100;

				var progressclass = function (v) {
					if (v === 100) {
						return "progress-bar-success";
					} else if (v > 90) {
						return "progress-bar-info";
					} else if (v > 70) {
						return "progress-bar-warning";
					} else {
						return "progress-bar-danger";
					}
				}

				$("<div class='progress-bar "+progressclass(progresspercentage)+" progress-bar-striped' role='progressbar' style='width:0%;min-width:15%;'>"+aquiredhelpers+" von "+neededhelpers+" Jobs vergeben!</div>").appendTo(progresscontainer).animate({width:progresspercentage+"%"},{duration: 100,easing: "linear"});
			}

			var menubuttongroup = $("<div class='btn-group btn-group-justified'>").appendTo(topcontainer).css("margin-bottom","20px");
			$("<a type='button' class='btn btn-default'>Helferliste Festbetrieb</a>").appendTo(menubuttongroup).on("click", function() {parentcontainer.helferliste();});
			$("<a type='button' class='btn btn-default'>Helferliste Auf/Abbau</a>").appendTo(menubuttongroup).on("click", function() {parentcontainer.helferliste("aufabbau");});

			if (auth === 4) {
				$("<a type='button' class='btn btn-default'>Helferbelegung</a>").appendTo(menubuttongroup).on("click", function() {parentcontainer.helferliste("lazyasses");});
				$("<a type='button' class='btn btn-default'>Helferliste 2016</a>").appendTo(menubuttongroup).on("click", function() {parentcontainer.helferliste("2016");});
			}
			
			var rendershift2 = function (shiftid,options) {
				//currentshift
				var cs;
				if (typeof shiftid === 'object' && shiftid.shiftid) {
					cs = shiftid;
				} else {
					shiftid = parseInt(shiftid);
					cs = (shifts.filter(function(k){return k.shiftid === shiftid}))[0];
				}
				options = options || {};
				
				if (cs.name) {
					var name = cs.name.replace(/^_/,"");
					var html = name+" (";
					if (options.shrt) {
						html += moment.unix(cs.timestart).format("dddd, D.")
					} else {
						if (cs.timestart === cs.timeend) html += moment.unix(cs.timestart).format("dddd, D. MMMM")+" ab "+moment.unix(cs.timestart).format("HH:mm")+" Uhr";
						if (cs.timestart !== cs.timeend) html += moment.unix(cs.timestart).format("dddd, D. MMMM")+" von "+moment.unix(cs.timestart).format("HH:mm")+" bis "+moment.unix(cs.timeend).format("HH:mm")+" Uhr";
					}
					html += ")";
					return html;
				} else {
					return "Shift not found";
				}
			}
			
			var swdeleteany = function (options) {
				BootstrapDialog.show({
					title: options.title,
					message: options.msg,
					spinicon: 'glyphicon glyphicon-refresh',
					buttons : [
					{
						label: options.btnmsg,
						cssClass: 'btn-danger',
						autospin: true,
						action: function(dialog) {
							dialog.enableButtons(false).setClosable(false);
							
							$.ajax({type: 'POST', url: options.url || '/intern/helferliste', data: JSON.stringify(options.data), contentType: 'application/json'}).success(function() {
								dialog.enableButtons(true).setButtons([{label:'OK',cssClass: 'btn-success',action: function(dialog) {
									dialog.close(); 
									if ( typeof(options.view) === 'function' ) {
										options.view.call();
									} else {
										parentcontainer.helferliste(options.view);
									}
								}}]).updateButtons().setMessage(options.successmsg);
								if (options.el) options.el.slideUp("slow",function(){$(this).remove()});
							});
						}
					},
					{label: 'Schließen!', cssClass: 'btn-default', action: function(dialog) {dialog.close()}}
					]
				});
			}
			
			var shiftinsert = function(ins) {
				var shiftcontainer = $("<div>");
				var swalert = $('<div class="swalert">').appendTo(shiftcontainer);
				var form = $('<form class="swform">').appendTo(shiftcontainer);
				var data = {task:"shiftinsert"};
				
				var llll = "ddd D. MMM YYYY HH:mm";
				var defaults = {
					stepping: 5,
					locale: moment.locale('de'),
					useStrict: false,  
					format: llll,
					sideBySide: false
				};
				
				var shifttitle = swformfield({container:form, el:'input', text: 'Schichtbezeichnung', type: 'text', name: 'name', placeh: 'Kloputzen'});
				var elstart = swformfield({container:form, el:'input', text: 'Von', type: 'text', name: 'timestart', autocompl: 'off'}).datetimepicker(defaults);
				var extra = $('<span class="input-group-addon"><label><input type="checkbox" name="noend" value=1><span>Offenes Ende</span></label></span>');
				var elnoend = extra.find("input");
				var elend = swformfield({container:form, el:'input', text: 'Bis', type: 'text', name: 'timeend', autocompl: 'off', extra: extra }).datetimepicker(defaults);
				var eldescription = swformfield({container:form, el:'input', text: 'Bemerkung', type: 'text', name: 'description'});
				var elnumber = swformfield({container:form, el:'input', text: 'Anzahl Personen', type: 'number', name: 'number'});
				var elshiftid = swformfield({container:form, el:'input', type: 'hidden', name: 'shiftid'}).attr("disabled","disabled");
				
				elnoend.on("change", function (e) {
					if ($(this).is(":checked")) {
						elend.attr("disabled","disabled");
					} else {
						elend.removeAttr("disabled");
					}
				});

				if (ins.data) {
					shifttitle.val(ins.data.name);
					elstart.data("DateTimePicker").date(moment.unix(ins.data.timestart));
					elend.data("DateTimePicker").date(moment.unix(ins.data.timeend));
					elnumber.val(ins.data.number);
					eldescription.val(ins.data.description);
					if (ins.data.timestart === ins.data.timeend) {
						elnoend.prop("checked",true);
					} else {
						elnoend.prop("checked",false);
					}
					elnoend.trigger("change");
					elshiftid.removeAttr("disabled").val(ins.data.shiftid);
					data.task = "shiftedit";
				}
				
				form.on("submit", function(e) {
					e.preventDefault();
					$.extend(data,ar2obj(form.serializeArray()));
					if (data.timestart) data.timestart = moment(data.timestart,llll).unix();
					if (data.timeend) data.timeend = moment(data.timeend,llll).unix();
					$.ajax({type: 'POST', url: '/intern/helferliste', data: JSON.stringify(data), contentType: 'application/json', dataType: 'json'}).done(function(d) {
						swalert.empty();
						if (d.success) {
							e.dialog.setType(BootstrapDialog.TYPE_SUCCESS).enableButtons(true).setButtons([{label:'OK',cssClass: 'btn-success',action: function(dialog) {
								dialog.close();
								parentcontainer.helferliste(ins.view);
							}}]).updateButtons().setMessage(ins.success);
						} else {
							e.dialog.setType(BootstrapDialog.TYPE_DANGER).enableButtons(true).getButton('submit').stopSpin();
							$.each([
								{el: shifttitle, status: d.name, msg: 'Schichtname "'+shifttitle.val()+'" ungültig!'},
								{el: elstart, status: d.timestart, msg: 'Startzeit ungültig!'},
								{el: elnumber, status: d.number, msg: 'Anzahl der Personen ungültig!'},
								{el: elend, status: d.timeend, msg: 'Endzeit ungültig!'}] ,function (i, obj) {
								if (!obj.status) {
									$('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+obj.msg+'</div>').appendTo(swalert);
									obj.el.val("").swvalid(false);
								} else {
									obj.el.swvalid(true);
								}
							});
						}
					});
				});
				
				BootstrapDialog.show({
					title: ins.title,
					message: shiftcontainer,
					buttons : [{
						id: 'submit',
						label: ins.label,
						cssClass: 'btn-primary',
						autospin: true,
						spinicon: 'glyphicon glyphicon-refresh',
						action: function(dialog) {
							dialog.enableButtons(false).setClosable(false);
							form.trigger({type:'submit',dialog:dialog});
						}
					}]
				});
			};
			
			var helperinsert = function(ins) {
				var helpercontainer = $("<div>");
				var swalert = $('<div class="swalert">').appendTo(helpercontainer);
				var form = $('<form class="swform">').appendTo(helpercontainer);
				var data = {task:"helperpropose"};
				
				var helpername = swformfield({container:form, el:'input', text: 'Helfername', type: 'text', name: 'name', placeh: 'Vorname Nachname'});
				var elemail = swformfield({container:form, el:'input', text: 'Email', type: 'email', name: 'email'});
				var eldummyshift = swformfield({container:form, el:'input', text: 'Schicht', type: 'text', name: 'dummy'}).attr("disabled","disabled");
				var eldescription = swformfield({container:form, el:'input', text: 'Bemerkung', type: 'text', name: 'description'});
				var elsendmail = swformfield({container:form, el:'input', text: 'Email Senden?', type: 'checkbox', name: 'sendmail'});
				var elsendmailtext = swformfield({container:form, el:'textarea', text: 'Mailtext', name: 'sendmailtext', style: 'width:100%;resize:vertical;', rows: 9});
				var elshiftid = swformfield({container:form, el:'input', type: 'hidden', name: 'shiftid'});
				var elhelid = swformfield({container:form, el:'input', type: 'hidden', name: 'helid'}).attr("disabled","disabled");
				var elinqid = swformfield({container:form, el:'input', type: 'hidden', name: 'inqid'}).attr("disabled","disabled");
				
				elsendmail.on("change",function(){
					if ($(this).prop("checked")) {
						elsendmailtext.removeAttr("disabled").closest("div.form-group").show();
						elsendmailtext.text("Hallo "+helpername.val()+",\n\ndu wurdest beim Radegundisfest für folgende Schicht eingeteilt:\n\n"+(eldummyshift.val() || $("option:selected",elshiftid).text())+"\n\nEs grüßt das Organisationsteam!");
					} else {
						elsendmailtext.attr("disabled","disabled").closest("div.form-group").hide();
					};
				}).trigger("change");

				if(ins.shiftid) {
					eldummyshift.val(rendershift2(ins.shiftid));
					elshiftid.val(ins.shiftid);
				}

				elsendmail.closest("div.form-group").hide();

				if ( auth === 4 ) {
					data.task = "helperinsert";
					elsendmail.removeAttr("disabled").closest("div.form-group").show();
				}

				if (email) elemail.val(email);

				if (ins.data) {
					helpername.val(ins.data.name);
					elemail.val(ins.data.email);
					eldescription.val(ins.data.description);
					elshiftid.val(ins.data.shiftid);
					eldummyshift.val(rendershift2(ins.data.shiftid));
					if (ins.data.helid) {
						elhelid.removeAttr("disabled").val(ins.data.helid);
						data.task = "helperedit";
					} else if (ins.data.inqid) {
						elinqid.removeAttr("disabled").val(ins.data.inqid);
						data.task = "helperinqinsert";
						if (ins.shiftselectable) {
							elshiftid.remove();
							var shiftselect = $("<select name='shiftid' class='form-control'>");
							$.each(shiftsavailable, function(i,s) {
								$("<option>").val(s.shiftid).text(rendershift2(s)).appendTo(shiftselect);
							});
							eldummyshift.replaceWith(shiftselect);
							eldummyshift = shiftselect;
						}
					}
				}

				form.on("submit", function(e) {
					e.preventDefault();
					$.extend(data,ar2obj(form.serializeArray()));
					$.ajax({type: 'POST', url: '/intern/helferliste', data: JSON.stringify(data), contentType: 'application/json', dataType: 'json'}).done(function(d) {
						swalert.empty();
						if (d.success) {
							e.dialog.setType(BootstrapDialog.TYPE_SUCCESS).enableButtons(true).setButtons([{label:'OK',cssClass: 'btn-success',action: function(dialog) {
								dialog.close();
								parentcontainer.helferliste(ins.view);
							}}]).updateButtons().setMessage(ins.success);
						} else {
							e.dialog.setType(BootstrapDialog.TYPE_DANGER).enableButtons(true).getButton('submit').stopSpin();
							$.each([
								{el: helpername, status: d.name, msg: 'Name "'+helpername.val()+'" ungültig!'},
								{el: elemail, status: d.email, msg: 'Emailadresse "'+elemail.val()+'" ungültig!!'}] ,function (i, obj) {
								if (!obj.status) {
									$('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+obj.msg+'</div>').appendTo(swalert);
									obj.el.val("").swvalid(false);
								} else {
									obj.el.swvalid(true);
								}
							});
						}
					});
				});

				BootstrapDialog.show({
					title: ins.title,
					message: helpercontainer,
					buttons : [{
						id: 'submit',
						label: ins.label,
						cssClass: 'btn-primary',
						autospin: true,
						spinicon: 'glyphicon glyphicon-refresh',
						action: function(dialog) {
							dialog.enableButtons(false).setClosable(false);
							form.trigger({type:'submit',dialog:dialog});
						}
					}]
				});
			};
			
			var peopleinsert = function(ins) {
				var container = $("<div>");
				var data = {task:"peopleinsert"};
				var swalert = $('<div class="swalert">').appendTo(container);
				var form = $('<form class="swform">').appendTo(container);
				
				var elname = swformfield({container:form, el:'input', text: 'Nachname', type: 'text', name: 'name', placeh: 'Mustermann'});
				var elvorname = swformfield({container:form, el:'input', text: 'Vorname', type: 'text', name: 'vorname', placeh: 'Mustermann'});
				
				form.on("submit", function(e) {
					e.preventDefault();
					$.extend(data,ar2obj(form.serializeArray()));
					$.ajax({type: 'POST', url: '/intern/helferliste', data: JSON.stringify(data), contentType: 'application/json', dataType: 'json'}).done(function(d) {
						swalert.empty();
						if (d.success) {
							e.dialog.setType(BootstrapDialog.TYPE_SUCCESS).enableButtons(true).setButtons([{label:'OK',cssClass: 'btn-success',action: function(dialog) {
								dialog.close();
								parentcontainer.helferliste(ins.view);
							}}]).updateButtons().setMessage(ins.success);
						} else {
							e.dialog.setType(BootstrapDialog.TYPE_DANGER).enableButtons(true).getButton('submit').stopSpin();
							$.each([
								{el: elname, status: d.name, msg: 'Nachname "'+elname.val()+'" ungültig!'},
								{el: elvorname, status: d.vorname, msg: 'Vorname "'+elvorname.val()+'" ungültig!'}
								] ,function (i, obj) {
								if (!obj.status) {
									$('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+obj.msg+'</div>').appendTo(swalert);
									obj.el.val("").swvalid(false);
								} else {
									obj.el.swvalid(true);
								}
							});
						}
					});
				});
				
				BootstrapDialog.show({
					title: ins.title,
					message: container,
					buttons : [{
						id: 'submit',
						label: ins.label,
						cssClass: 'btn-primary',
						autospin: true,
						spinicon: 'glyphicon glyphicon-refresh',
						action: function(dialog) {
							dialog.enableButtons(false).setClosable(false);
							form.trigger({type:'submit',dialog:dialog});
						}
					}]
				});
			};
			
			var renderinquiries = function (options) {
				$.each(options.shiftinquiries, function(m, mtem) {
					var inq = $("<li><a style='cursor:pointer'>"+mtem.name+" ("+moment.unix(mtem.timestamp).format("D.MMM HH:mm")+") </a></li>").appendTo($(options.el));

					inq.on("click", function() {
						helperinsert({data:mtem, shiftselectable: ( options.shiftselectable || false ), title: 'Helfer hinzufügen', label: 'Helfer hinzufügen!', success: 'Neuer Helfer erfolgreich hinzugefügt!', view: options.view});
					});

					$("<button class='btn btn-xs btn-danger'><i class='glyphicon glyphicon-remove'></i></button>").appendTo(inq.find("a")).on("click", function(event) {
						event.stopPropagation();
						var data = {task:"helperinqdelete",inqid:mtem.inqid};
						swdeleteany({data: data,title:'Bestätigung',msg:'Helfervorschlag wirklich löschen?',btnmsg:'Vorschlag löschen!', successmsg: "Vorschlag gelöscht!",el: inq, view: options.view});
					});
				});
			}
			
			////MAIN
			
			if (view === 'default' || view === 'aufabbau') {
				var viewshifts;

				if ( view === 'default' ) {
					viewshifts = shifts.filter(function(i) { return ! /^_/.test(i.name) });
				} else {
					viewshifts = shifts.filter(function(i) { return /^_/.test(i.name) });
				}

				renderprogressbar(viewshifts);

				//Render List
				$.each(viewshifts, function (i,item) {

					var panel = $('<div class="panel panel-default">');
					var panel_h = $('<div class="panel-heading">').appendTo(panel).html("<h4>"+rendershift2(item)+"</h4");
					if (item.description) {
						$("<span class='label label-default'><i class='glyphicon glyphicon-info-sign'></i> "+item.description+"</span>").appendTo(panel_h);
					}
					var panel_b = $('<div class="panel-body">').appendTo(panel);
					var table = $("<table class='table table-striped'>").appendTo(panel_b);

					var shifthelpers = helpers.filter(function(k){return k.shiftid === item.shiftid});
					var shiftinquiries = inquiries.filter(function(k){return k.shiftid === item.shiftid});

					$.each(shifthelpers, function(j,jtem) {
						var tr = $("<tr>").appendTo(table);
						$("<td><b>"+(j+1)+".</b></td>").appendTo(tr);
						var desc = jtem.description === "" ? "" : "<br /><span class='label label-default'><i class='glyphicon glyphicon-info-sign'></i> "+jtem.description+"</span>";
						$("<td>"+jtem.name+desc+"</td>").appendTo(tr);
						//$("<td>"+jtem.description+"</td>").appendTo(tr);
						var td = $("<td>").appendTo(tr);
						if (auth === 4) {
							var buttongroup = $("<div class='btn-group pull-right' role='group'>").appendTo(td);
							$("<button class='btn btn-xs btn-warning'><i class='glyphicon glyphicon-pencil'></i></button>").appendTo(buttongroup).on("click", function() {
								helperinsert({data:jtem, title: 'Helfer bearbeiten', label: 'Helfer bearbeiten!', success: 'Helfer erfolgreich bearbeiten!', view: view});
							});
							$("<button class='btn btn-xs btn-danger'><i class='glyphicon glyphicon-remove'></i></button>").appendTo(buttongroup).on("click", function() {
								var data = {task:"helperdelete",helid:jtem.helid};
								swdeleteany({data: data,title:'Bestätigung',msg:'Helfer wirklich löschen?',btnmsg:'Helfer löschen!', successmsg: "Helfer gelöscht!",el: tr, view: view});
							});
						}
					});
					
					for (var k = shifthelpers.length; k < item.number; k++) {
						(function() { // Anonymous function for Closures!
							var tr = $("<tr>").appendTo(table);
							$("<td><b>"+(k+1)+".</b></td>").appendTo(tr);
							$("<td><span class='hidden-print'>" + "UNBESETZT" + "</span></td>").appendTo(tr);
							//$("<td>"+""+"</td>").appendTo(tr);
							var td = $("<td>").appendTo(tr);
							
							if (auth === 4) {
								var buttongroup = $("<div class='btn-group pull-right' role='group'>").appendTo(td);
								$("<button class='btn btn-xs btn-success'><i class='glyphicon glyphicon-plus'></i></button>").appendTo(buttongroup).on("click", function() {
									helperinsert({shiftid:item.shiftid,title: 'Helfer hinzufügen', label: 'Helfer hinzufügen!', success: 'Neuer Helfer erfolgreich hinzugefügt!', view: view});
								});
	
								if (shiftinquiries.length > 0) {
									$("<button type='button' class='btn btn-xs btn-success dropdown-toggle' data-toggle='dropdown'><i class='glyphicon glyphicon-exclamation-sign'></i> ("+shiftinquiries.length+") Anfragen</button>").appendTo(buttongroup);
									var dropdown = $("<ul class='dropdown-menu'></ul>").appendTo(buttongroup);
									renderinquiries({el: dropdown,shiftinquiries: shiftinquiries, view: view});
								}
							} else if (auth === 1) {
								//if (shiftinquiries.length > 0) {
								//	$("<span class='label label-danger pull-right'>Nur eine Anfrage pro Schicht!</span>").appendTo(td)
								//} else {
									$("<button class='btn btn-xs btn-success pull-right'><i class='glyphicon glyphicon-plus'></i> Anfragen!</button>").appendTo(td).on("click", function() {
										helperinsert({shiftid:item.shiftid, title: 'Mich als Helfer vorschlagen', label: 'Mich vorschlagen!', success: 'Vorschlag erfolgreich übermittelt!', view: view});
									});
								//}
							};
						})();
					};
	
					if (auth === 4) {
						//Vorschläge anzeigen, wenn Schicht voll ist!
						if (shifthelpers.length >= item.number && shiftinquiries.length > 0) {
							var buttongroup = $("<div class='btn-group pull-right' role='group'>").appendTo(panel_b);
							$("<button type='button' class='btn btn-xs btn-success dropdown-toggle' data-toggle='dropdown'><i class='glyphicon glyphicon-exclamation-sign'></i> ("+shiftinquiries.length+") Anfragen</button>").appendTo(buttongroup);
							var dropdown = $("<ul class='dropdown-menu'></ul>").appendTo(buttongroup);
							renderinquiries({el: dropdown,shiftinquiries: shiftinquiries, shiftselectable:true, view: view});
						}
						
						var buttongroup = $("<div class='btn-group pull-right' role='group'>").appendTo(panel_h.find("h4"));
						// Change-button
						$("<button class='btn btn-xs btn-warning'><i class='glyphicon glyphicon-pencil'></i></button>").appendTo(buttongroup).on("click", function() {
							shiftinsert({data:item, title: 'Schicht bearbeiten', label: 'Schicht bearbeiten!', success: 'Schicht erfolgreich bearbeitet!', view: view});
						});
						//Delete-button
						$("<button class='btn btn-xs btn-danger'><i class='glyphicon glyphicon-remove'></i></button>").appendTo(buttongroup).on('click', function() {
							var data = {task:"shiftdelete",shiftid:item.shiftid};
							swdeleteany({data: data,title:'Bestätigung',msg:'Schicht (und alle Helfer dieser Schicht) wirklich löschen?',btnmsg:'Schicht löschen!', successmsg: 'Schicht gelöscht!',el: panel, view: view});
						});
					}
					panel.appendTo(listcontainer);
				});
				
				if (auth === 4) {
					$('<button class="btn btn-primary">Neue Schicht</button>').appendTo(topcontainer).on("click",function() {
						shiftinsert({title: 'Schicht hinzufügen', label: 'Schicht hinzufügen!', success: 'Neue Schicht erfolgreich hinzugefügt!', view: view});
					});
				}
				
				//Alte Position nach neu Redern wiederherstellen
				$(window).scrollTop(lastposition);
				
			} else if (view === 'lazyasses') {
				var rendershiftslist = function(l) {
					if ( l === null ) return "x";
					var ids = l.split(",");
					var wrap = $("<span>");
					$.each(ids,function(i,id) {
						$("<span class='label label-primary'>").append(rendershift2(id,{shrt:true})).appendTo(wrap);
						if (i !== ids.length ) wrap.append("<br />");
					});
					return wrap;
				}
				
				//Belegung
				var table = $("<table class='table table-striped'>").appendTo(listcontainer);
					$("<caption>Belegung</caption>").appendTo(table);
				var thead = $("<thead>").appendTo(table);
				var tbody = $("<tbody>").appendTo(table);
				var tr_head = $("<tr>").appendTo(thead);
				$.each(['Name','Samstag','Sonntag','Montag','Löschen'], function (i,la) { $("<td><b>"+la+"</b></td>").appendTo(tr_head)});
				$.each(d.lazyasses, function(i,la) {
					var tr = $("<tr>").appendTo(tbody);
					$("<td><b>"+la.name+"</b></td>").appendTo(tr);
					$.each([la.sat_shiftids,la.sun_shiftids,la.mon_shiftids],function(i,laa) {$("<td>").append(rendershiftslist(laa)).appendTo(tr)});
					var td = $("<td>").appendTo(tr);
					$("<button class='btn btn-xs btn-danger'><i class='glyphicon glyphicon-remove'></i></button>").appendTo(td).on('click', function() {
						var data = {task:"peopledel",peopleid:la.id};
						swdeleteany({data: data,title:'Person löschen',msg:'Person aus der Verzeichnisliste wirklich löschen?',btnmsg:'Person löschen!', successmsg: "Person gelöscht!",el: tr, view: view});
					});
				});
				
				//Fehlende Zuordnung
				var table = $("<table class='table table-striped'>").appendTo(listcontainer);
					$("<caption>Fehlende Zuordnung</caption>").appendTo(table);
				var thead = $("<thead>").appendTo(table);
				var tbody = $("<tbody>").appendTo(table);
				var tr_head = $("<tr>").appendTo(thead);
					$("<td><b>Name</b></td>").appendTo(tr_head);
					$("<td><b>Schicht</b></td>").appendTo(tr_head);
				$.each(d.notassigned, function(i,la) {
					var tr = $("<tr>").appendTo(tbody);
					$("<td><b>"+la.name+"</b></td>").appendTo(tr);
					$("<td>" + rendershift2(la.shiftid) + "</td>").appendTo(tr);
				});
				
				//Leute hinzufügen
				$("<button class='btn btn-primary'>Zuordnung hinzufügen!</button>").appendTo(listcontainer).on("click", function() {
					peopleinsert({title: 'Personen zum Verzeichnis hinzufügen', label: 'Person hinzufügen!', success: 'Neue Person erfolgreich hinzugefügt!', view: view});
				});
			} else if (view === '2016') {
				$.each(shifts_prev, function (i,item) {
					var panel = $('<div class="panel panel-default">');
					var panel_h = $('<div class="panel-heading">').appendTo(panel).html("<h4>"+rendershift2(item)+"</h4");
					if (item.description) {
						$("<span class='label label-default'><i class='glyphicon glyphicon-info-sign'></i> "+item.description+"</span>").appendTo(panel_h);
					}
					var panel_b = $('<div class="panel-body">').appendTo(panel);
					var table = $("<table class='table table-striped'>").appendTo(panel_b);
	
					var shifthelpers = helpers_prev.filter(function(k){return k.shiftid === item.shiftid});
	
					$.each(shifthelpers, function(j,jtem) {
						var tr = $("<tr>").appendTo(table);
						$("<td><b>"+(j+1)+".</b></td>").appendTo(tr);
						$("<td>"+jtem.name+"</td>").appendTo(tr);
						$("<td>"+jtem.description+"</td>").appendTo(tr);
						$("<td>").appendTo(tr);
					});
					
					panel.appendTo(listcontainer);
				});
				
			}
			
			$("<p>Eingeloggt als: <span class='badge'>"+authname+"</span></p>").appendTo(bottomcontainer);
			$('<p><button class="btn btn-danger btn-xs">Ausloggen</button></p>').appendTo(bottomcontainer).find("button").on("click",function() {
				var data = {task:"logout"};
				swdeleteany({data: data,title:'Bestätigung',msg:'Wirklich ausloggen?',btnmsg:'Ausloggen!', successmsg: "Erfolgreich ausgeloggt!", view: function() {gototarget("/login.html")}, url: "/intern/auth"});
			});
		});
		return this;
	};
});