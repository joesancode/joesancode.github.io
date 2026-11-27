/* Translations for the CV site: Spanish, Italian, German.
   How it works: the page is written in English. When another language is picked
   (Settings → Language), it's saved in localStorage and the page reloads. This
   script then swaps every text node and label for its translation, and keeps
   watching the page so anything the app adds later (toasts, popovers, mails)
   is translated too. Rows are [English, Español, Italiano, Deutsch].
   Business and tech terms are localized on purpose (e.g. marketing →
   mercadotecnia / mercatologia / Vermarktung). */
(function(){
  var lang='en';
  try{ lang=localStorage.getItem('lang')||'en'; }catch(e){}
  if(!/^(en|es|it|de)$/.test(lang)) lang='en';
  var LOC={en:'en-US',es:'es-ES',it:'it-IT',de:'de-DE'}[lang];
  var COL={es:1,it:2,de:3}[lang];

  var ROWS=[
  // ---- App shell, navigation, settings
  ["Candidate Scouting","Captación de candidatos","Ricerca di candidati","Kandidatensuche"],
  ["Inbox","Bandeja de entrada","Posta in arrivo","Posteingang"],
  ["Profile","Perfil","Profilo","Profil"],
  ["References","Referencias","Referenze","Referenzen"],
  ["CV as PDF","CV en PDF","CV in PDF","Lebenslauf als PDF"],
  ["Open the CV as a PDF","Abrir el CV en PDF","Apri il CV in PDF","Lebenslauf als PDF öffnen"],
  ["Projects on GitHub","Proyectos en GitHub","Progetti su GitHub","Projekte auf GitHub"],
  ["Settings","Ajustes","Impostazioni","Einstellungen"],
  ["Menu","Menú","Menu","Menü"],
  ["Menu, new notifications","Menú, notificaciones nuevas","Menu, nuove notifiche","Menü, neue Benachrichtigungen"],
  ["Close menu","Cerrar el menú","Chiudi il menu","Menü schließen"],
  ["Back to inbox","Volver a la bandeja de entrada","Torna alla posta in arrivo","Zurück zum Posteingang"],
  ["Insights","Análisis","Approfondimenti","Einblicke"],
  ["Close insights","Cerrar el análisis","Chiudi gli approfondimenti","Einblicke schließen"],
  ["Theme","Tema","Tema","Design"],
  ["Light","Claro","Chiaro","Hell"],
  ["Dark","Oscuro","Scuro","Dunkel"],
  ["Auto","Automático","Automatico","Automatisch"],
  ["Language","Idioma","Lingua","Sprache"],
  ["Download CV","Descargar CV","Scarica il CV","Lebenslauf herunterladen"],
  ["Download CV as PDF","Descargar el CV en PDF","Scarica il CV in PDF","Lebenslauf als PDF herunterladen"],
  ["Search","Buscar","Cerca","Suchen"],
  ["Search Joe San’s CV","Buscar en el CV de Joe San","Cerca nel CV di Joe San","Joe Sans Lebenslauf durchsuchen"],
  ["Search results","Resultados de búsqueda","Risultati della ricerca","Suchergebnisse"],
  ["Notifications","Notificaciones","Notifiche","Benachrichtigungen"],
  ["Notifications, 3 new","Notificaciones, 3 nuevas","Notifiche, 3 nuove","Benachrichtigungen, 3 neu"],
  ["Mark all as read","Marcar todo como leído","Segna tutto come letto","Alle als gelesen markieren"],
  ["Toggle side panel","Mostrar u ocultar el panel lateral","Mostra o nascondi il pannello laterale","Seitenleiste ein- oder ausblenden"],
  ["Sections","Secciones","Sezioni","Bereiche"],
  ["Show all","Ver todo","Mostra tutto","Alle anzeigen"],
  ["Your Notes","Tus notas","Le tue note","Ihre Notizen"],
  ["e.g. Call Joe San before someone else does.","p. ej., llamar a Joe San antes de que lo haga otro.","es. Chiamare Joe San prima che lo faccia qualcun altro.","z. B. Joe San anrufen, bevor es jemand anderes tut."],
  ["Private, saved on this device","Privado, guardado en este dispositivo","Privato, salvato su questo dispositivo","Privat, auf diesem Gerät gespeichert"],
  ["Clear","Borrar","Cancella","Löschen"],
  ["Notes cleared","Notas borradas","Note cancellate","Notizen gelöscht"],
  ["Couldn’t save in this browser","No se pudo guardar en este navegador","Impossibile salvare in questo browser","In diesem Browser konnte nicht gespeichert werden"],
  ["English","Inglés","Inglese","Englisch"],
  ["Soon","Pronto","Presto","Bald"],
  ["confirmed his interview with your Sr. Product Manager.","confirmó su entrevista con tu gerente de producto sénior.","ha confermato il colloquio con il tuo responsabile di prodotto esperto.","hat sein Vorstellungsgespräch mit Ihrem leitenden Produktmanager bestätigt."],
  ["left a 4.9 reference for Joe San.","dejó una referencia de 4,9 para Joe San.","ha lasciato una referenza da 4,9 per Joe San.","hat Joe San eine Referenz mit 4,9 gegeben."],
  ["is a 93% match for your Product Manager role.","encaja en un 93 % con tu puesto de gerente de producto.","è compatibile al 93% con il tuo ruolo di responsabile di prodotto.","passt zu 93 % zu Ihrer Stelle als Produktmanager."],
  ["Yesterday","Ayer","Ieri","Gestern"],
  ["Today","Hoy","Oggi","Heute"],
  ["Tomorrow","Mañana","Domani","Morgen"],

  // ---- Search
  ["Try searching for","Prueba a buscar","Prova a cercare","Suchen Sie zum Beispiel nach"],
  ["No results for “","Sin resultados para “","Nessun risultato per “","Keine Ergebnisse für „"],
  ["The only candidate here is Joe San.","El único candidato aquí es Joe San.","L’unico candidato qui è Joe San.","Der einzige Kandidat hier ist Joe San."],
  ["Headline","Titular","Titolo","Überschrift"],
  ["Contact","Contacto","Contatto","Kontakt"],
  ["Skills","Competencias","Competenze","Kompetenzen"],
  ["Personal interest","Interés personal","Interesse personale","Persönliches Interesse"],
  ["Culture compatibility trait","Rasgo de compatibilidad cultural","Tratto di compatibilità culturale","Merkmal der kulturellen Passung"],
  ["Joe San · Cover letter","Joe San · Carta de presentación","Joe San · Lettera di presentazione","Joe San · Anschreiben"],
  ["Cover letter","Carta de presentación","Lettera di presentazione","Anschreiben"],
  ["Language · ","Idioma · ","Lingua · ","Sprache · "],
  ["Education · ","Formación · ","Formazione · ","Ausbildung · "],
  ["Rating ","Valoración ","Valutazione ","Bewertung "],
  ["Scouting radar · ","Radar de captación · ","Radar di ricerca · ","Talentradar · "],
  ["Certification · Ironhack · ","Certificación · Ironhack · ","Certificazione · Ironhack · ","Zertifizierung · Ironhack · "],

  // ---- Profile header
  ["Profile actions","Acciones del perfil","Azioni del profilo","Profilaktionen"],
  ["Add to shortlist","Añadir a la preselección","Aggiungi alla rosa ristretta","Zur Auswahlliste hinzufügen"],
  ["Share profile","Compartir perfil","Condividi il profilo","Profil teilen"],
  ["Share this page","Compartir esta página","Condividi questa pagina","Diese Seite teilen"],
  ["More actions","Más acciones","Altre azioni","Weitere Aktionen"],
  ["Copy email","Copiar correo electrónico","Copia l’indirizzo di posta","E-Mail-Adresse kopieren"],
  ["Copy phone number","Copiar teléfono","Copia il numero di telefono","Telefonnummer kopieren"],
  ["Hide candidate","Ocultar candidato","Nascondi candidato","Kandidat ausblenden"],
  ["Report candidate","Denunciar candidato","Segnala candidato","Kandidat melden"],
  ["Candidate profile","Perfil del candidato","Profilo del candidato","Kandidatenprofil"],
  ["Portrait of Joe San","Retrato de Joe San","Ritratto di Joe San","Porträt von Joe San"],
  ["Munich, Germany","Múnich, Alemania","Monaco di Baviera, Germania","München, Deutschland"],
  ["Product Management & Brand Design","Gestión de producto y diseño de marca","Gestione del prodotto e progettazione del marchio","Produktmanagement & Markengestaltung"],
  ["Passionate Product Manager skilled in shaping ideas into user-centric solutions. Bridging vision, development, and innovation.","Gerente de producto apasionado, experto en convertir ideas en soluciones centradas en el usuario. Uno visión, desarrollo e innovación.","Responsabile di prodotto appassionato, abile nel trasformare le idee in soluzioni incentrate sull’utente. Unisco visione, sviluppo e innovazione.","Leidenschaftlicher Produktmanager, der Ideen in nutzerorientierte Lösungen verwandelt. Ich verbinde Vision, Entwicklung und Innovation."],
  ["Passionate Product Manager skilled in shaping ideas into user-centric solutions.","Gerente de producto apasionado, experto en convertir ideas en soluciones centradas en el usuario.","Responsabile di prodotto appassionato, abile nel trasformare le idee in soluzioni incentrate sull’utente.","Leidenschaftlicher Produktmanager, der Ideen in nutzerorientierte Lösungen verwandelt."],
  ["Call","Llamar","Chiama","Anrufen"],
  ["Short list","Preselección","Rosa ristretta","Auswahlliste"],
  ["Certified","Certificado","Certificato","Zertifiziert"],
  ["AI Product Management","Gestión de productos de IA","Gestione di prodotti di IA","KI-Produkt\u00admanagement"],
  ["View certificate","Ver certificado","Vedi il certificato","Zertifikat ansehen"],
  ["Languages","Idiomas","Lingue","Sprachen"],
  ["Spanish","Español","Spagnolo","Spanisch"],
  ["Italian","Italiano","Italiano","Italienisch"],
  ["German","Alemán","Tedesco","Deutsch"],
  ["Native","Nativo","Madrelingua","Muttersprache"],
  ["Education","Formación","Formazione","Ausbildung"],
  ["Digital Design & Animation","Diseño digital y animación","Progettazione digitale e animazione","Digitale Gestaltung & Animation"],
  ["Anthem College, U.S. · 2008","Anthem College, EE. UU. · 2008","Anthem College, USA · 2008","Anthem College, USA · 2008"],

  // ---- Experience
  ["Experience","Experiencia","Esperienza","Berufserfahrung"],
  ["Product Owner & UX/UI Designer","Responsable de producto y diseñador UX/UI","Titolare del prodotto e progettista UX/UI","Produktverantwortlicher & UX/UI-Gestalter"],
  ["Innosabi · Innovation Management Software · SaaS · Munich, Germany (Hybrid) · 2023","Innosabi · Software de gestión de la innovación · Software como servicio · Múnich, Alemania (híbrido) · 2023","Innosabi · Software per la gestione dell’innovazione · Software come servizio · Monaco di Baviera, Germania (ibrido) · 2023","Innosabi · Software für Innovationsmanagement · Software als Dienstleistung · München, Deutschland (hybrid) · 2023"],
  ["Responsible for managing product development specifications under a larger strategic scope while ensuring an exceptional user experience through intuitive and visually appealing designs.","Responsable de gestionar las especificaciones de desarrollo de producto dentro de un marco estratégico más amplio, garantizando una experiencia de usuario excepcional mediante diseños intuitivos y atractivos.","Responsabile della gestione delle specifiche di sviluppo del prodotto all’interno di un quadro strategico più ampio, garantendo un’esperienza utente eccezionale grazie a progetti intuitivi e visivamente curati.","Verantwortlich für die Spezifikationen der Produktentwicklung im Rahmen einer übergeordneten Strategie, mit einem herausragenden Nutzererlebnis durch intuitive und ansprechende Gestaltung."],
  ["Main tasks:","Tareas principales:","Compiti principali:","Hauptaufgaben:"],
  ["feature specification refinement, sprint planning, dynamic backlog, asset and roadmap management.","refinamiento de especificaciones de funciones, planificación de iteraciones, lista de pendientes dinámica, gestión de recursos y de la hoja de ruta.","affinamento delle specifiche delle funzionalità, pianificazione dei cicli di sviluppo, elenco dinamico delle attività, gestione delle risorse e della tabella di marcia.","Verfeinerung von Funktionsspezifikationen, Planung der Arbeitszyklen, dynamische Aufgabenliste, Verwaltung von Ressourcen und Fahrplan."],
  ["Senior Product Manager","Gerente de producto sénior","Responsabile di prodotto esperto","Leitender Produktmanager"],
  ["Cansativa · Medical Cannabis · Marketplace & Distribution · Frankfurt, Germany (Remote) · 2021 – 2022","Cansativa · Cannabis medicinal · Mercado en línea y distribución · Fráncfort, Alemania (en remoto) · 2021 – 2022","Cansativa · Cannabis terapeutica · Mercato in rete e distribuzione · Francoforte, Germania (da remoto) · 2021 – 2022","Cansativa · Medizinalcannabis · Online-Marktplatz & Vertrieb · Frankfurt, Deutschland (Fernarbeit) · 2021 – 2022"],
  ["Spearheaded product discovery and defined the strategic product vision for an end-user mobile application under extremely narrow regulatory constraints.","Lideré el descubrimiento de producto y definí la visión estratégica de una aplicación móvil para usuarios finales bajo restricciones regulatorias muy estrictas.","Ho guidato la fase di scoperta del prodotto e definito la visione strategica di un’applicazione mobile per utenti finali, entro vincoli normativi estremamente rigidi.","Leitung der Produktfindung und Festlegung der strategischen Produktvision für eine mobile Anwendung für Endnutzer unter äußerst engen regulatorischen Vorgaben."],
  ["user on-site and industry research, articulation of strategic product vision, established UX/UI direction and oversaw product lifecycle.","investigación de usuarios sobre el terreno y del sector, formulación de la visión estratégica del producto, definición de la dirección UX/UI y supervisión del ciclo de vida del producto.","ricerca sul campo con gli utenti e sul settore, formulazione della visione strategica del prodotto, definizione della direzione UX/UI e supervisione del ciclo di vita del prodotto.","Nutzerforschung vor Ort und Branchenanalyse, Ausarbeitung der strategischen Produktvision, Festlegung der UX/UI-Richtung und Betreuung des Produktlebenszyklus."],
  ["Head of Product & Manufacturing","Jefe de producto y fabricación","Responsabile di prodotto e produzione","Leiter Produkt & Fertigung"],
  ["CKSoul · Wellness & Lifestyle · eCommerce & Retail · Los Angeles, U.S. (Remote) · 2017 – 2020","CKSoul · Bienestar y estilo de vida · Comercio electrónico y venta minorista · Los Ángeles, EE. UU. (en remoto) · 2017 – 2020","CKSoul · Benessere e stile di vita · Commercio elettronico e vendita al dettaglio · Los Angeles, USA (da remoto) · 2017 – 2020","CKSoul · Wohlbefinden & Lebensstil · Onlinehandel & Einzelhandel · Los Angeles, USA (Fernarbeit) · 2017 – 2020"],
  ["Led the production department, ensuring the timely delivery of medical-grade, customer-centric products via an e-commerce platform.","Dirigí el departamento de producción, garantizando la entrega puntual de productos de calidad médica y centrados en el cliente a través de una plataforma de comercio electrónico.","Ho diretto il reparto produzione, garantendo la consegna puntuale di prodotti di grado medico e incentrati sul cliente tramite una piattaforma di commercio elettronico.","Leitung der Produktionsabteilung und pünktliche Lieferung kundenorientierter Produkte in medizinischer Qualität über eine Onlinehandelsplattform."],
  ["product research and ideation, academic research collaboration with UCLA, scalability tactics, sales support, partnership negotiation support and company-wide briefings.","investigación e ideación de productos, colaboración en investigación académica con la UCLA, tácticas de escalabilidad, apoyo a ventas, apoyo en la negociación de alianzas y presentaciones para toda la empresa.","ricerca e ideazione di prodotti, collaborazione di ricerca accademica con la UCLA, strategie di scalabilità, supporto alle vendite, supporto nella negoziazione di partenariati e aggiornamenti per tutta l’azienda.","Produktforschung und Ideenfindung, akademische Forschungszusammenarbeit mit der UCLA, Skalierungsstrategien, Vertriebsunterstützung, Unterstützung bei Partnerschaftsverhandlungen und unternehmensweite Briefings."],

  // ---- Interests
  ["Personal Interests","Intereses personales","Interessi personali","Persönliche Interessen"],
  ["Reading","Lectura","Lettura","Lesen"],
  ["Fitness","Ejercicio","Allenamento","Training"],
  ["Writing","Escritura","Scrittura","Schreiben"],
  ["Blockchain","Cadena de bloques","Catena di blocchi","Blockkette"],
  ["Drawing","Dibujo","Disegno","Zeichnen"],
  ["Currently reading","Leyendo ahora","Sto leggendo","Lese gerade"],
  ["A philosophical investigation of life after death. Drawing on a century of parapsychological research, Jorjani argues that individuality and creative agency survive death.","Una investigación filosófica sobre la vida después de la muerte. A partir de un siglo de investigación parapsicológica, Jorjani sostiene que la individualidad y la capacidad creadora sobreviven a la muerte.","Un’indagine filosofica sulla vita dopo la morte. Basandosi su un secolo di ricerca parapsicologica, Jorjani sostiene che l’individualità e la capacità creativa sopravvivono alla morte.","Eine philosophische Untersuchung über das Leben nach dem Tod. Gestützt auf ein Jahrhundert parapsychologischer Forschung argumentiert Jorjani, dass Individualität und schöpferische Kraft den Tod überdauern."],
  ["View at Arktos","Ver en Arktos","Vedi su Arktos","Bei Arktos ansehen"],
  ["No crazy stuff: push-ups, pull-ups, squats and the like. Pretty vanilla but consistent.","Nada del otro mundo: flexiones, dominadas, sentadillas y cosas así. Básico, pero constante.","Niente di folle: flessioni, trazioni, squat e simili. Roba semplice, ma costante.","Nichts Verrücktes: Liegestütze, Klimmzüge, Kniebeugen und so weiter. Ganz einfach, aber regelmäßig."],
  ["Consider not a man he who is yet to act in wisdom. Consider a beast he who fails to see truth in love.","No consideres hombre a quien aún no ha obrado con sabiduría. Considera una bestia a quien no ve la verdad en el amor.","Non considerare uomo chi non ha ancora agito con saggezza. Considera una bestia chi non sa vedere la verità nell’amore.","Halte nicht für einen Mann, wer noch nicht weise gehandelt hat. Halte für eine Bestie, wer in der Liebe keine Wahrheit erkennt."],
  ["Blockchain I follow","Cadena de bloques que sigo","Catena di blocchi che seguo","Blockkette, der ich folge"],
  ["A data-protection blockchain, built as a partner chain to Cardano. It uses zero-knowledge proofs, so you can prove something is true without revealing the data behind it.","Una cadena de bloques centrada en la protección de datos, creada como cadena asociada a Cardano. Usa pruebas de conocimiento cero: puedes demostrar que algo es cierto sin revelar los datos que lo respaldan.","Una catena di blocchi dedicata alla protezione dei dati, costruita come catena partner di Cardano. Usa prove a conoscenza zero: puoi dimostrare che qualcosa è vero senza rivelare i dati che lo sostengono.","Eine Blockkette für Datenschutz, gebaut als Partnerkette von Cardano. Sie nutzt Null-Wissen-Beweise: Man kann beweisen, dass etwas wahr ist, ohne die zugrunde liegenden Daten preiszugeben."],
  ["My drawing of Bob Marley.","Mi dibujo de Bob Marley.","Il mio disegno di Bob Marley.","Meine Zeichnung von Bob Marley."],
  ["View on Instagram","Ver en Instagram","Vedi su Instagram","Auf Instagram ansehen"],

  // ---- Profile right panel
  ["Fit Score","Puntuación de afinidad","Punteggio di compatibilità","Passungswert"],
  ["This applicant is a great match!","¡Este candidato encaja de maravilla!","Questo candidato è perfetto!","Dieser Bewerber passt hervorragend!"],
  ["Customer-Centric Assessment","Evaluación centrada en el cliente","Valutazione incentrata sul cliente","Kundenorientierte Bewertung"],
  ["Cross-Functional Collaboration","Colaboración interdisciplinar","Collaborazione interfunzionale","Bereichsübergreifende Zusammenarbeit"],
  ["Effective Communication","Comunicación eficaz","Comunicazione efficace","Wirksame Kommunikation"],
  ["Strategic Product Planning","Planificación estratégica de producto","Pianificazione strategica del prodotto","Strategische Produktplanung"],
  ["Team & Resource Coordination","Coordinación de equipos y recursos","Coordinamento di gruppi e risorse","Koordination von Team & Ressourcen"],
  ["Excellent match","Encaje excelente","Compatibilità eccellente","Hervorragende Passung"],
  ["Great match","Gran encaje","Ottima compatibilità","Sehr gute Passung"],
  ["Good match","Buen encaje","Buona compatibilità","Gute Passung"],
  ["Culture Compatibility Traits","Rasgos de compatibilidad cultural","Tratti di compatibilità culturale","Merkmale der kulturellen Passung"],
  ["Driven by values and principles","Guiado por valores y principios","Guidato da valori e principi","Von Werten und Prinzipien geleitet"],
  ["Passion and pride for own work","Pasión y orgullo por el propio trabajo","Passione e orgoglio per il proprio lavoro","Leidenschaft und Stolz auf die eigene Arbeit"],
  ["Receptive to meaningful challenges","Abierto a retos con sentido","Aperto a sfide significative","Offen für sinnvolle Herausforderungen"],

  // ---- Profile menu toasts
  ["Removing Joe San from your shortlist? He’s load-bearing.","¿Quitar a Joe San de tu preselección? Es una pieza clave.","Togliere Joe San dalla rosa ristretta? Regge tutta la struttura.","Joe San von der Auswahlliste entfernen? Er ist tragend."],
  ["The shortlist would be a list of zero. Keeping him.","La preselección se quedaría vacía. Se queda.","La rosa ristretta resterebbe vuota. Lo teniamo.","Die Auswahlliste wäre leer. Er bleibt."],
  ["Request denied: shortlists need at least one great candidate.","Solicitud denegada: una preselección necesita al menos un gran candidato.","Richiesta respinta: una rosa ristretta ha bisogno di almeno un grande candidato.","Anfrage abgelehnt: Eine Auswahlliste braucht mindestens einen großartigen Kandidaten."],
  ["Joe San added to your shortlist","Joe San añadido a tu preselección","Joe San aggiunto alla rosa ristretta","Joe San zur Auswahlliste hinzugefügt"],
  ["Email him","Escríbele","Scrivigli","Ihm schreiben"],
  ["Hiding Joe San would leave this app with nothing to show.","Ocultar a Joe San dejaría esta aplicación sin nada que mostrar.","Nascondere Joe San lascerebbe questa applicazione senza niente da mostrare.","Ohne Joe San hätte diese Anwendung nichts mehr zu zeigen."],
  ["Report filed: candidate is overqualified. No action needed.","Denuncia registrada: el candidato está sobrecualificado. No hace falta hacer nada.","Segnalazione registrata: il candidato è troppo qualificato. Nessuna azione necessaria.","Meldung erfasst: Kandidat ist überqualifiziert. Kein Handlungsbedarf."],
  ["Open mail app","Abrir el correo","Apri la posta","E-Mail-Programm öffnen"],
  ["Link copied","Enlace copiado","Collegamento copiato","Link kopiert"],
  ["Link copied ✓","Enlace copiado ✓","Collegamento copiato ✓","Link kopiert ✓"],

  // ---- References
  ["Performance","Rendimiento","Rendimento","Leistung"],
  ["Based on 5 reviews","Basado en 5 reseñas","Basato su 5 recensioni","Basierend auf 5 Bewertungen"],
  ["4.8 out of 5 stars","4,8 de 5 estrellas","4,8 stelle su 5","4,8 von 5 Sternen"],
  ["Quality of Work","Calidad del trabajo","Qualità del lavoro","Arbeitsqualität"],
  ["Productivity & Efficiency","Productividad y eficiencia","Produttività ed efficienza","Produktivität & Effizienz"],
  ["Problem-Solving","Resolución de problemas","Risoluzione dei problemi","Problemlösung"],
  ["Job Knowledge & Skills","Conocimientos y competencias","Conoscenze e competenze","Fachwissen & Fähigkeiten"],
  ["Initiative & Innovation","Iniciativa e innovación","Iniziativa e innovazione","Initiative & Innovation"],
  ["Recommended by","Recomendado por","Consigliato dal","Empfohlen von"],
  ["of previous employers","de empleadores anteriores","dei datori di lavoro precedenti","der früheren Arbeitgeber"],
  ["Review Rate","Tasa de reseñas","Tasso di recensioni","Bewertungsrate"],
  ["year-on-year","interanual","su base annua","im Jahresvergleich"],
  ["In the top","Entre el mejor","Nel migliore","Unter den besten"],
  ["of 381 applicants","de 381 candidatos","di 381 candidati","von 381 Bewerbern"],
  ["Recommendations","Recomendaciones","Raccomandazioni","Empfehlungen"],
  ["Filter by relationship","Filtrar por relación","Filtra per relazione","Nach Beziehung filtern"],
  ["All","Todas","Tutte","Alle"],
  ["Colleague","Colega","Collega","Kollege"],
  ["Direct Manager","Jefe directo","Responsabile diretto","Direkte Führungskraft"],
  ["Partner","Socia","Partner esterna","Partnerin"],
  ["Newest","Más recientes","Più recenti","Neueste"],
  ["Oldest","Más antiguas","Meno recenti","Älteste"],
  ["Highest rated","Mejor valoradas","Più apprezzate","Beste Bewertung"],
  ["Newest first","Más recientes primero","Prima le più recenti","Neueste zuerst"],
  ["Oldest first","Más antiguas primero","Prima le meno recenti","Älteste zuerst"],
  ["Sort recommendations","Ordenar recomendaciones","Ordina le raccomandazioni","Empfehlungen sortieren"],
  ["Senior Full-Stack Software Developer","Desarrollador de software sénior de pila completa","Sviluppatore software esperto (full-stack)","Erfahrener Softwareentwickler für Gesamtsysteme"],
  ["Innosabi · Innovation Management Software","Innosabi · Software de gestión de la innovación","Innosabi · Software per la gestione dell’innovazione","Innosabi · Software für Innovationsmanagement"],
  ["Chief Technology Officer & Director of Product","Director de tecnología y director de producto","Direttore tecnico e direttore di prodotto","Technischer Direktor & Produktdirektor"],
  ["Cansativa · Medical Cannabis Distribution","Cansativa · Distribución de cannabis medicinal","Cansativa · Distribuzione di cannabis terapeutica","Cansativa · Vertrieb von Medizinalcannabis"],
  ["Chief Strategist","Estratega jefa","Stratega capo","Chefstrategin"],
  ["VP of Sales & Marketing","Vicepresidenta de ventas y mercadotecnia","Vicepresidente vendite e mercatologia","Vizepräsidentin Vertrieb & Vermarktung"],
  ["Encore Labs · Hemp Industry","Encore Labs · Industria del cáñamo","Encore Labs · Settore della canapa","Encore Labs · Hanfbranche"],
  ["Chief Executive Officer & Strategic Business Advisor","Director ejecutivo y asesor estratégico de negocio","Amministratore delegato e consulente strategico d’impresa","Geschäftsführer & strategischer Unternehmensberater"],
  ["Tuatara Capital & CKSoul · Venture Capital, Private Equity & Medical Cannabis","Tuatara Capital y CKSoul · Capital riesgo, capital privado y cannabis medicinal","Tuatara Capital e CKSoul · Capitale di rischio, capitale privato e cannabis terapeutica","Tuatara Capital & CKSoul · Wagniskapital, Beteiligungskapital & Medizinalcannabis"],
  ["“Joe's exceptional commitment to organizational excellence was demonstrated through his meticulous adherence to company processes and his clear communication of complex procedures. His unwavering professionalism, even in challenging situations, was instrumental to our team's success, making him a valuable asset to any organization.”",
   "“El compromiso excepcional de Joe con la excelencia organizativa se reflejó en su meticuloso respeto por los procesos de la empresa y en su clara comunicación de procedimientos complejos. Su profesionalidad inquebrantable, incluso en situaciones difíciles, fue clave para el éxito de nuestro equipo y lo convierte en un activo valioso para cualquier organización.”",
   "“L’eccezionale impegno di Joe per l’eccellenza organizzativa si è visto nella sua scrupolosa aderenza ai processi aziendali e nella chiarezza con cui comunicava procedure complesse. La sua professionalità incrollabile, anche nelle situazioni più difficili, è stata determinante per il successo della nostra squadra e lo rende una risorsa preziosa per qualsiasi organizzazione.”",
   "„Joes außergewöhnliches Engagement für organisatorische Exzellenz zeigte sich in seiner gewissenhaften Einhaltung der Unternehmensprozesse und seiner klaren Vermittlung komplexer Abläufe. Seine unerschütterliche Professionalität, auch in schwierigen Situationen, war entscheidend für den Erfolg unseres Teams und macht ihn für jede Organisation zu einer wertvollen Bereicherung.“"],
  ["“Fast, creative, thoughtful, on-point delivery was always the norm. Joe was a pleasure to work with. His passion for new fields and engagement in these tasks was my favorite part.”",
   "“Rapidez, creatividad, reflexión y entregas precisas eran siempre la norma. Trabajar con Joe fue un placer. Lo que más me gustaba era su pasión por los campos nuevos y su implicación en estas tareas.”",
   "“Rapidità, creatività, attenzione e consegne precise erano sempre la norma. Lavorare con Joe è stato un piacere. La cosa che preferivo era la sua passione per i nuovi ambiti e il suo impegno in questi compiti.”",
   "„Schnelle, kreative, durchdachte und punktgenaue Ergebnisse waren immer die Norm. Die Zusammenarbeit mit Joe war eine Freude. Am meisten mochte ich seine Leidenschaft für neue Gebiete und sein Engagement bei diesen Aufgaben.“"],
  ["“I had the honor of working closely with Joe. He was an honor to work with. He is a team player and is always thinking of ways to improve not only himself but his team and the company. His design skills are incredible and he is very easy to work with. He provided many good ideas on how to improve our workflows and made the company stronger. Joe's relationship skills and professionalism also impressed me as I witnessed him working with outside vendors and other company contacts. Joe is also always there to jump in and help wherever it was needed. There was never a task he was not willing to take head-on. I wish I could duplicate him. He is an asset to any team he joins. He is a great leader and I would HIGHLY recommend him to any company.”",
   "“Tuve el honor de trabajar codo con codo con Joe. Fue un honor trabajar con él. Es un gran compañero de equipo y siempre busca maneras de mejorar, no solo a sí mismo, sino también a su equipo y a la empresa. Sus dotes de diseño son increíbles y es muy fácil trabajar con él. Aportó muchas buenas ideas para mejorar nuestros flujos de trabajo e hizo más fuerte a la empresa. Su don de gentes y su profesionalidad también me impresionaron al verlo trabajar con proveedores externos y otros contactos de la empresa. Joe siempre está ahí para echar una mano donde haga falta. No hubo nunca una tarea que no estuviera dispuesto a afrontar de lleno. Ojalá pudiera clonarlo. Es un activo para cualquier equipo al que se una. Es un gran líder y lo recomendaría MUCHÍSIMO a cualquier empresa.”",
   "“Ho avuto l’onore di lavorare a stretto contatto con Joe. È stato un onore lavorare con lui. È un vero gioco di squadra e pensa sempre a come migliorare non solo sé stesso, ma anche la sua squadra e l’azienda. Le sue capacità di progettazione sono incredibili ed è molto facile lavorare con lui. Ha proposto molte buone idee per migliorare i nostri flussi di lavoro e ha reso l’azienda più forte. Mi hanno colpito anche le sue doti relazionali e la sua professionalità, che ho visto all’opera con fornitori esterni e altri contatti aziendali. Joe è sempre pronto a intervenire e dare una mano dove serve. Non c’è mai stato un compito che non fosse disposto ad affrontare di petto. Vorrei poterlo duplicare. È una risorsa per qualsiasi squadra in cui entri. È un grande leader e lo consiglierei VIVAMENTE a qualsiasi azienda.”",
   "„Ich hatte die Ehre, eng mit Joe zusammenzuarbeiten. Es war eine Ehre, mit ihm zu arbeiten. Er ist ein echter Teamplayer und denkt immer darüber nach, wie er nicht nur sich selbst, sondern auch sein Team und das Unternehmen verbessern kann. Seine gestalterischen Fähigkeiten sind unglaublich, und die Zusammenarbeit mit ihm ist sehr unkompliziert. Er hat viele gute Ideen zur Verbesserung unserer Arbeitsabläufe eingebracht und das Unternehmen gestärkt. Auch seine Beziehungsfähigkeit und Professionalität haben mich beeindruckt, als ich ihn im Umgang mit externen Lieferanten und anderen Geschäftskontakten erlebt habe. Joe ist außerdem immer zur Stelle, um einzuspringen und zu helfen, wo es nötig ist. Es gab nie eine Aufgabe, die er nicht direkt anpacken wollte. Ich wünschte, ich könnte ihn verdoppeln. Er ist eine Bereicherung für jedes Team, dem er beitritt. Er ist eine großartige Führungspersönlichkeit, und ich würde ihn jedem Unternehmen WÄRMSTENS empfehlen.“"],
  ["“Joe was phenomenal to work with in the tumultuous hemp industry. His high level of professionalism and dedication to service has always made all of our projects go smoothly. Whether everything in the project was going right, or whether we would run into continuous roadblocks, he's always led with his heart and stepped forward with kindness and forward-based thinking. This has always made him a pleasure to work with. I recommend Joe to any company who values quality work. Joe will put his heart and soul into it.”",
   "“Trabajar con Joe en la turbulenta industria del cáñamo fue fenomenal. Su gran profesionalidad y su vocación de servicio hicieron que todos nuestros proyectos fueran sobre ruedas. Tanto si todo salía bien como si nos topábamos con obstáculos constantes, siempre actuó con el corazón y dio un paso al frente con amabilidad y visión de futuro. Por eso siempre fue un placer trabajar con él. Recomiendo a Joe a cualquier empresa que valore el trabajo de calidad. Joe pondrá en ello todo su corazón y su alma.”",
   "“Lavorare con Joe nel turbolento settore della canapa è stato fenomenale. La sua grande professionalità e la sua dedizione al servizio hanno sempre fatto filare lisci tutti i nostri progetti. Che tutto andasse per il verso giusto o che incontrassimo continui ostacoli, ha sempre agito con il cuore e si è fatto avanti con gentilezza e lungimiranza. Per questo lavorare con lui è sempre stato un piacere. Consiglio Joe a qualsiasi azienda che apprezzi il lavoro di qualità. Joe ci metterà cuore e anima.”",
   "„Die Zusammenarbeit mit Joe in der turbulenten Hanfbranche war phänomenal. Seine große Professionalität und sein Einsatz für den Service haben dafür gesorgt, dass all unsere Projekte reibungslos liefen. Ob im Projekt alles glatt lief oder wir ständig auf Hindernisse stießen: Er hat immer mit dem Herzen geführt und ist mit Freundlichkeit und vorausschauendem Denken vorangegangen. Deshalb war es immer eine Freude, mit ihm zu arbeiten. Ich empfehle Joe jedem Unternehmen, das Qualitätsarbeit schätzt. Joe wird mit Herz und Seele dabei sein.“"],
  ["“I valued working with Joe during a crucial period at CKSoul. His competence, composure, and collaborative approach were commendable. With strong organizational skills and sound judgment, he demonstrated excellent capabilities on all fronts. I would gladly work with Joe again and wholeheartedly recommend him.”",
   "“Valoré mucho trabajar con Joe durante un periodo crucial en CKSoul. Su competencia, su serenidad y su espíritu colaborativo fueron encomiables. Con una gran capacidad organizativa y un criterio sólido, demostró aptitudes excelentes en todos los frentes. Volvería a trabajar con Joe con mucho gusto y lo recomiendo de todo corazón.”",
   "“Ho apprezzato molto lavorare con Joe in un periodo cruciale per CKSoul. La sua competenza, la sua compostezza e il suo spirito collaborativo sono stati encomiabili. Con grandi capacità organizzative e un giudizio solido, ha dimostrato ottime qualità su tutti i fronti. Lavorerei di nuovo con Joe molto volentieri e lo consiglio con tutto il cuore.”",
   "„Ich habe die Zusammenarbeit mit Joe in einer entscheidenden Phase bei CKSoul sehr geschätzt. Seine Kompetenz, Gelassenheit und kooperative Art waren lobenswert. Mit ausgeprägtem Organisationstalent und gutem Urteilsvermögen hat er auf allen Ebenen hervorragende Fähigkeiten bewiesen. Ich würde jederzeit wieder mit Joe arbeiten und empfehle ihn von ganzem Herzen.“"],
  ["Recommendations are real, from LinkedIn. Ratings and rankings are illustrative, part of the Punctum concept.","Las recomendaciones son reales, de LinkedIn. Las valoraciones y clasificaciones son ilustrativas, parte del concepto Punctum.","Le raccomandazioni sono reali, da LinkedIn. Valutazioni e classifiche sono illustrative, parte del concetto Punctum.","Die Empfehlungen sind echt und stammen von LinkedIn. Bewertungen und Ranglisten sind beispielhaft und Teil des Punctum-Konzepts."],
  ["One candidate. Full stop.","Un candidato. Punto final.","Un candidato. Punto e basta.","Ein Kandidat. Punkt."],
  ["Search complete. 1 result.","Búsqueda completada. 1 resultado.","Ricerca completata. 1 risultato.","Suche abgeschlossen. 1 Ergebnis."],
  ["Shortlist of one.","Preselección: uno.","Rosa ristretta: uno.","Engere Auswahl: einer."],
  ["Reviews Ranking","Clasificación de reseñas","Classifica delle recensioni","Bewertungsrangliste"],
  ["Top 4%","Mejor 4 %","Migliore 4%","Beste 4 %"],
  ["Total of 381 applicants","Total de 381 candidatos","Totale di 381 candidati","Insgesamt 381 Bewerber"],
  ["Scouting Radars","Radares de captación","Radar di ricerca","Talentradare"],
  ["Scouting Management Software","Software de gestión de captación","Software per la gestione della ricerca di talenti","Software für Talentsuche"],
  ["Blockchain Identification Services","Servicios de identificación con cadena de bloques","Servizi di identificazione su catena di blocchi","Identifikationsdienste auf Blockkettenbasis"],
  ["Innovation Management Software","Software de gestión de la innovación","Software per la gestione dell’innovazione","Software für Innovationsmanagement"],
  ["Interviewed candidate 1 week ago","Entrevistó al candidato hace 1 semana","Ha intervistato il candidato 1 settimana fa","Hat den Kandidaten vor 1 Woche interviewt"],
  ["Scheduled candidate 1 day ago","Citó al candidato hace 1 día","Ha fissato un incontro con il candidato 1 giorno fa","Hat den Kandidaten vor 1 Tag eingeplant"],
  ["Viewed candidate 2 weeks ago","Vio al candidato hace 2 semanas","Ha visto il candidato 2 settimane fa","Hat den Kandidaten vor 2 Wochen angesehen"],
  ["Their pipeline","Su proceso de selección","Il loro processo di selezione","Ihr Auswahlprozess"],
  ["Viewed","Visto","Visto","Angesehen"],
  ["Interviewed","Entrevistado","Intervistato","Interviewt"],
  ["Offer","Oferta","Offerta","Angebot"],
  ["· Next: Scheduled","· Siguiente: citado","· Prossimo: incontro fissato","· Als Nächstes: eingeplant"],
  ["· Next: Interviewed","· Siguiente: entrevista","· Prossimo: colloquio","· Als Nächstes: Interview"],
  ["· Next: Offer","· Siguiente: oferta","· Prossimo: offerta","· Als Nächstes: Angebot"],
  ["1 week ago","hace 1 semana","1 settimana fa","vor 1 Woche"],
  ["1 day ago","hace 1 día","1 giorno fa","vor 1 Tag"],
  ["2 weeks ago","hace 2 semanas","2 settimane fa","vor 2 Wochen"],
  ["Beat them to it","Adelántate","Anticipali","Kommen Sie zuvor"],
  ["Hide","Ocultar","Nascondi","Ausblenden"],

  // ---- Inbox shell and toolbar
  ["Inbox: cover letter","Bandeja de entrada: carta de presentación","Posta in arrivo: lettera di presentazione","Posteingang: Anschreiben"],
  ["Messages","Mensajes","Messaggi","Nachrichten"],
  ["Select all","Seleccionar todo","Seleziona tutto","Alle auswählen"],
  ["Select message","Seleccionar mensaje","Seleziona messaggio","Nachricht auswählen"],
  ["Refresh","Actualizar","Aggiorna","Aktualisieren"],
  ["Previous message","Mensaje anterior","Messaggio precedente","Vorherige Nachricht"],
  ["Next message","Mensaje siguiente","Messaggio successivo","Nächste Nachricht"],
  ["Archive","Archivar","Archivia","Archivieren"],
  ["Delete","Eliminar","Elimina","Löschen"],
  ["Mark unread","Marcar como no leído","Segna come non letto","Als ungelesen markieren"],
  ["Snooze","Posponer","Posticipa","Zurückstellen"],
  ["Label","Etiquetar","Etichetta","Label"],
  ["More","Más","Altro","Mehr"],
  ["Star","Destacar","Speciale","Markieren"],
  ["Starred","Destacado","Speciale","Markiert"],
  ["Favorite","Favorito","Preferito","Favorit"],
  ["to me","para mí","a me","an mich"],
  ["Reply","Responder","Rispondi","Antworten"],
  ["Forward","Reenviar","Inoltra","Weiterleiten"],
  ["Open the full profile →","Abrir el perfil completo →","Apri il profilo completo →","Vollständiges Profil öffnen →"],
  ["Joe San's signature","Firma de Joe San","Firma di Joe San","Unterschrift von Joe San"],
  ["Archiving your favorite candidate? Let’s keep him where you can see him.","¿Archivar a tu candidato favorito? Mejor tenerlo a la vista.","Archiviare il tuo candidato preferito? Meglio tenerlo dove puoi vederlo.","Ihren Lieblingskandidaten archivieren? Lassen wir ihn lieber im Blick."],
  ["Sorry, I’m your favorite candidate. My message can’t be deleted.","Lo siento, soy tu candidato favorito. Mi mensaje no se puede eliminar.","Mi dispiace, sono il tuo candidato preferito. Il mio messaggio non si può eliminare.","Tut mir leid, ich bin Ihr Lieblingskandidat. Meine Nachricht lässt sich nicht löschen."],
  ["Already marked as unforgettable.","Ya está marcado como inolvidable.","Già segnato come indimenticabile.","Bereits als unvergesslich markiert."],
  ["Snoozing on top talent? Bold move. Reminder set for… right now.","¿Posponer al mejor talento? Atrevido. Recordatorio programado para… ahora mismo.","Posticipare il miglior talento? Mossa audace. Promemoria impostato per… adesso.","Spitzentalent zurückstellen? Mutig. Erinnerung eingestellt für … jetzt sofort."],
  ["Already labeled: Favorite. Some things don’t change.","Ya etiquetado: Favorito. Hay cosas que no cambian.","Già etichettato: Preferito. Certe cose non cambiano.","Bereits gelabelt: Favorit. Manche Dinge ändern sich nicht."],
  ["Stars are reserved for Joe San. House rules.","Las estrellas están reservadas para Joe San. Normas de la casa.","Le stelle sono riservate a Joe San. Regole della casa.","Sterne sind für Joe San reserviert. Hausregeln."],
  ["This inbox has room for one favorite. You know who.","En esta bandeja solo cabe un favorito. Ya sabes quién.","In questa casella c’è posto per un solo preferito. Sai chi.","In diesem Posteingang ist Platz für einen Favoriten. Sie wissen, wer."],
  ["Nice try. The star budget was spent on Joe San.","Buen intento. El presupuesto de estrellas se gastó en Joe San.","Bel tentativo. Il budget di stelle è stato speso per Joe San.","Netter Versuch. Das Sternebudget ging komplett an Joe San."],
  ["Unstarring your favorite candidate? That button only goes one way.","¿Quitarle la estrella a tu candidato favorito? Ese botón solo funciona en un sentido.","Togliere la stella al tuo candidato preferito? Quel pulsante va in una sola direzione.","Ihrem Lieblingskandidaten den Stern nehmen? Dieser Knopf funktioniert nur in eine Richtung."],
  ["Conversation archived","Conversación archivada","Conversazione archiviata","Unterhaltung archiviert"],
  ["Message deleted","Mensaje eliminado","Messaggio eliminato","Nachricht gelöscht"],
  ["Snoozed until tomorrow","Pospuesto hasta mañana","Posticipato a domani","Bis morgen zurückgestellt"],
  ["Marked as unread","Marcado como no leído","Segnato come non letto","Als ungelesen markiert"],
  ["Labeled: Not a fit","Etiquetado: No encaja","Etichettato: Non adatto","Gelabelt: Passt nicht"],
  ["Undo","Deshacer","Annulla","Rückgängig"],
  ["Want the full picture? Joe’s profile has it all.","¿Quieres verlo todo? El perfil de Joe lo tiene todo.","Vuoi il quadro completo? Il profilo di Joe ha tutto.","Sie wollen das ganze Bild? Joes Profil hat alles."],
  ["Open profile","Abrir perfil","Apri il profilo","Profil öffnen"],
  ["Tip: Joe San’s message is still waiting at the top.","Consejo: el mensaje de Joe San sigue esperando arriba del todo.","Suggerimento: il messaggio di Joe San ti aspetta ancora in cima.","Tipp: Joe Sans Nachricht wartet immer noch ganz oben."],
  ["You’re all caught up","Estás al día","Sei in pari","Sie sind auf dem neuesten Stand"],

  // ---- Joe's cover letter
  ["Product Manager: Cover Letter & CV","Gerente de producto: carta de presentación y CV","Responsabile di prodotto: lettera di presentazione e CV","Produktmanager: Anschreiben & Lebenslauf"],
  ["Dear talent team, I am writing to express my interest in exploring a partnership within your organization…","Estimado equipo de talento: les escribo para expresar mi interés en explorar una colaboración con su organización…","Gentile team di selezione, vi scrivo per esprimere il mio interesse a esplorare una collaborazione con la vostra organizzazione…","Sehr geehrtes Recruiting-Team, ich schreibe Ihnen, um mein Interesse an einer Zusammenarbeit mit Ihrem Unternehmen zu bekunden …"],
  ["Dear talent team,","Estimado equipo de talento:","Gentile team di selezione,","Sehr geehrtes Recruiting-Team,"],
  ["I am writing to express my interest in exploring a partnership within your organization and offer my expertise in Product Management. I am delighted to share my CV with you for your consideration.","Les escribo para expresar mi interés en explorar una colaboración con su organización y ofrecerles mi experiencia en gestión de producto. Me complace compartir con ustedes mi CV para su consideración.","Vi scrivo per esprimere il mio interesse a esplorare una collaborazione con la vostra organizzazione e mettere a disposizione la mia esperienza nella gestione del prodotto. Sono lieto di condividere con voi il mio CV.","ich schreibe Ihnen, um mein Interesse an einer Zusammenarbeit mit Ihrem Unternehmen zu bekunden und Ihnen meine Erfahrung im Produktmanagement anzubieten. Gerne lasse ich Ihnen meinen Lebenslauf zur Prüfung zukommen."],
  ["With over five years of experience in Product Management, I have proven competence in enabling teams to accomplish their objectives by developing innovative solutions that combine profound customer understanding, powerful technology and strategic business needs.","Con más de cinco años de experiencia en gestión de producto, he demostrado mi capacidad para ayudar a los equipos a cumplir sus objetivos desarrollando soluciones innovadoras que combinan un profundo conocimiento del cliente, una tecnología potente y las necesidades estratégicas del negocio.","Con oltre cinque anni di esperienza nella gestione del prodotto, ho dimostrato di saper aiutare le squadre a raggiungere i propri obiettivi sviluppando soluzioni innovative che uniscono una profonda comprensione del cliente, una tecnologia potente e le esigenze strategiche dell’impresa.","Mit über fünf Jahren Erfahrung im Produktmanagement habe ich bewiesen, dass ich Teams dabei unterstützen kann, ihre Ziele zu erreichen – mit innovativen Lösungen, die tiefes Kundenverständnis, leistungsfähige Technologie und strategische Geschäftsanforderungen verbinden."],
  ["As a Senior Product Manager at Cansativa, a leader in medical cannabis distribution in Germany, I led the initiative of connecting pharmacies, doctors, patients and producers via an online marketplace and a mobile application. Central to my role was developing a compelling positioning based on product strategy, competitive analysis, a clear UX/UI direction and keen customer empathy.","Como gerente de producto sénior en Cansativa, líder en distribución de cannabis medicinal en Alemania, dirigí la iniciativa de conectar farmacias, médicos, pacientes y productores mediante un mercado en línea y una aplicación móvil. Mi función se centró en desarrollar un posicionamiento convincente basado en la estrategia de producto, el análisis de la competencia, una dirección UX/UI clara y una gran empatía con el cliente.","Come responsabile di prodotto esperto presso Cansativa, leader nella distribuzione di cannabis terapeutica in Germania, ho guidato l’iniziativa di collegare farmacie, medici, pazienti e produttori tramite un mercato in rete e un’applicazione mobile. Al centro del mio ruolo c’era lo sviluppo di un posizionamento convincente basato sulla strategia di prodotto, sull’analisi della concorrenza, su una chiara direzione UX/UI e su una profonda empatia verso il cliente.","Als leitender Produktmanager bei Cansativa, einem führenden Anbieter im Vertrieb von Medizinalcannabis in Deutschland, habe ich die Initiative geleitet, Apotheken, Ärzte, Patienten und Hersteller über einen Online-Marktplatz und eine mobile Anwendung zu verbinden. Im Mittelpunkt meiner Rolle stand eine überzeugende Positionierung auf Grundlage von Produktstrategie, Wettbewerbsanalyse, einer klaren UX/UI-Richtung und echtem Einfühlungsvermögen für die Kunden."],
  ["I’ve also operated as Product Owner and UX/UI Designer at Innosabi, a leader in innovation management tools based in Munich, where key feature requests were crafted by means of cross-functional collaboration, alongside internal teams and international clients to guarantee alignment with their company goals and overarching strategy.","También he trabajado como responsable de producto y diseñador UX/UI en Innosabi, líder en herramientas de gestión de la innovación con sede en Múnich, donde las solicitudes de funciones clave se elaboraban mediante colaboración interdisciplinar con equipos internos y clientes internacionales, para garantizar su alineación con los objetivos y la estrategia general de cada empresa.","Ho inoltre lavorato come titolare del prodotto e progettista UX/UI presso Innosabi, leader negli strumenti per la gestione dell’innovazione con sede a Monaco di Baviera, dove le richieste di funzionalità chiave nascevano dalla collaborazione interfunzionale con squadre interne e clienti internazionali, per garantire l’allineamento con gli obiettivi e la strategia complessiva delle loro aziende.","Außerdem war ich als Produktverantwortlicher und UX/UI-Gestalter bei Innosabi tätig, einem führenden Anbieter von Werkzeugen für Innovationsmanagement in München. Dort entstanden zentrale Funktionsanforderungen in bereichsübergreifender Zusammenarbeit mit internen Teams und internationalen Kunden, um die Ausrichtung auf deren Unternehmensziele und Gesamtstrategie sicherzustellen."],
  ["Additionally, I’ve had the opportunity of working at CKSoul, a wellness and lifestyle brand in Los Angeles, as Head of Product & Manufacturing, where I collaborated in launch strategies alongside the marketing, sales and customer success teams and ensured the successful production of medical-grade, customer-centric products.","Además, tuve la oportunidad de trabajar en CKSoul, una marca de bienestar y estilo de vida de Los Ángeles, como jefe de producto y fabricación, donde colaboré en estrategias de lanzamiento con los equipos de mercadotecnia, ventas y éxito del cliente, y aseguré la producción de productos de calidad médica centrados en el cliente.","Inoltre, ho avuto l’opportunità di lavorare presso CKSoul, un marchio di benessere e stile di vita di Los Angeles, come responsabile di prodotto e produzione, dove ho collaborato alle strategie di lancio insieme alle squadre di mercatologia, vendite e assistenza clienti, garantendo la produzione di prodotti di grado medico incentrati sul cliente.","Darüber hinaus hatte ich die Gelegenheit, bei CKSoul, einer Marke für Wohlbefinden und Lebensstil in Los Angeles, als Leiter Produkt & Fertigung zu arbeiten. Dort habe ich gemeinsam mit den Teams für Vermarktung, Vertrieb und Kundenerfolg an Markteinführungsstrategien mitgewirkt und die erfolgreiche Herstellung kundenorientierter Produkte in medizinischer Qualität sichergestellt."],
  ["I am confident I could be of great contribution to your mission. I’m eager to learn more about your mission and look forward to your reply.","Estoy convencido de que podría contribuir en gran medida a su misión. Tengo muchas ganas de conocerla mejor y quedo a la espera de su respuesta.","Sono convinto di poter dare un grande contributo alla vostra missione. Desidero conoscerla meglio e resto in attesa di una vostra risposta.","Ich bin überzeugt, dass ich einen wertvollen Beitrag zu Ihrer Mission leisten kann. Ich freue mich darauf, mehr darüber zu erfahren, und auf Ihre Antwort."],
  ["Sincerely,","Atentamente,","Cordiali saluti,","Mit freundlichen Grüßen"],

  // ---- Other applicants' mails
  ["Inquiry for available position","Consulta sobre un puesto disponible","Richiesta per una posizione aperta","Anfrage zu einer offenen Stelle"],
  ["Dear hiring manager, I’d like to inquire about a position you have posted on LinkedIn. Please, let me know if its still open.","Estimado responsable de selección: quisiera preguntar por un puesto que han publicado en LinkedIn. Por favor, díganme si sigue abierto.","Gentile responsabile delle assunzioni, vorrei informazioni su una posizione che avete pubblicato su LinkedIn. Fatemi sapere se è ancora aperta.","Sehr geehrte Personalabteilung, ich möchte mich nach einer Stelle erkundigen, die Sie auf LinkedIn ausgeschrieben haben. Bitte lassen Sie mich wissen, ob sie noch offen ist."],
  ["I can start whenever. Monday works but not before 11 because I have a thing.","Puedo empezar cuando sea. El lunes me va bien, pero no antes de las 11 porque tengo una cosa.","Posso iniziare quando volete. Lunedì va bene, ma non prima delle 11 perché ho un impegno.","Ich kann jederzeit anfangen. Montag passt, aber nicht vor 11, weil ich da was habe."],
  ["thx","grax","grz","thx"],
  ["Sent from my phone","Enviado desde mi móvil","Inviato dal mio telefono","Von meinem Handy gesendet"],
  ["yo job??","oye ¿curro??","ehi lavoro??","yo job??"],
  ["hey is this the job thing","hola es esto lo del trabajo","ciao è questa la cosa del lavoro","hey ist das das mit dem job"],
  ["saw ur post. i have tons of leadership experience (guild master for 3 years, 40+ members, zero drama… mostly).","vi tu anuncio. tengo muchísima experiencia de liderazgo (maestro de gremio 3 años, más de 40 miembros, cero dramas… casi).","ho visto il tuo annuncio. ho un sacco di esperienza da leader (capo gilda per 3 anni, più di 40 membri, zero drammi… quasi).","hab deinen post gesehen. ich hab massig führungserfahrung (gildenmeister seit 3 jahren, 40+ mitglieder, null drama … meistens)."],
  ["what does product manager pay? asking for me","¿cuánto cobra un gerente de producto? pregunto por mí","quanto guadagna un responsabile di prodotto? chiedo per me","was verdient ein produktmanager? frag für mich"],
  ["gg","gg","gg","gg"],
  ["My application for the position","Mi candidatura para el puesto","La mia candidatura per la posizione","Meine Bewerbung für die Stelle"],
  ["Hello, I am excited to apply for the position posted on Stepstone. I am super enthusiastic for the chance to contribute!!!","Hola, me hace mucha ilusión postularme para el puesto publicado en Stepstone. ¡¡¡Estoy superentusiasmada con la oportunidad de aportar!!!","Ciao, sono entusiasta di candidarmi per la posizione pubblicata su Stepstone. Non vedo l’ora di dare il mio contributo!!!","Hallo, ich freue mich sehr, mich auf die bei Stepstone ausgeschriebene Stelle zu bewerben. Ich bin superbegeistert von der Chance, etwas beizutragen!!!"],
  ["I don’t have a CV right now but I am a people person and I love good vibes ☀️","Ahora mismo no tengo CV, pero soy muy sociable y me encanta el buen rollo ☀️","Al momento non ho un CV, ma sono una persona socievole e adoro le belle vibrazioni ☀️","Ich habe gerade keinen Lebenslauf, aber ich bin ein Menschenmensch und liebe gute Stimmung ☀️"],
  ["Also is the office dog friendly? My dog Biscuit comes everywhere with me.","Por cierto, ¿se admiten perros en la oficina? Mi perro Biscuit va conmigo a todas partes.","E poi, l’ufficio accetta i cani? Il mio cane Biscuit viene ovunque con me.","Und ist das Büro hundefreundlich? Mein Hund Biscuit begleitet mich überallhin."],
  ["xoxo, Lily","besitos, Lily","baci, Lily","xoxo, Lily"],
  ["Application enclosed","Candidatura adjunta","Candidatura in allegato","Bewerbung anbei"],
  ["To whom it may concern, I am submitting my application for your review. I look forward to the opportunity to discuss my qualifications.","A quien corresponda: les envío mi candidatura para su revisión. Espero tener la oportunidad de hablar de mis cualificaciones.","A chi di competenza, invio la mia candidatura per la vostra valutazione. Spero di avere l’opportunità di parlare delle mie qualifiche.","Sehr geehrte Damen und Herren, anbei sende ich Ihnen meine Bewerbung zur Prüfung. Ich freue mich auf die Gelegenheit, meine Qualifikationen zu besprechen."],
  ["PS: the attachment didn’t upload. I will send it tomorrow.","PD: el adjunto no se subió. Lo envío mañana.","PS: l’allegato non si è caricato. Lo mando domani.","PS: Der Anhang wurde nicht hochgeladen. Ich schicke ihn morgen."],
  ["PPS: or Thursday.","PPD: o el jueves.","PPS: o giovedì.","PPS: oder Donnerstag."],
  ["RE: RE: Fwd: job","RE: RE: RV: curro","RE: RE: I: lavoro","AW: AW: WG: job"],
  ["interested. call me","interesado. llámame","interessato. chiamami","interessiert. ruf mich an"],
  ["not before noon tho","pero no antes de mediodía","ma non prima di mezzogiorno","aber nicht vor mittag"],
  ["Hiring?","¿Contratan?","Assumete?","Stellen Sie ein?"],
  ["To whom it may concern (or whoever reads this),","A quien corresponda (o a quien lea esto):","A chi di competenza (o a chiunque legga),","Sehr geehrte Damen und Herren (oder wer auch immer das liest),"],
  ["I am basically a natural born leader. My friends always say I should be the boss of something, so here I am.","Básicamente soy un líder nato. Mis amigos siempre dicen que debería ser jefe de algo, así que aquí estoy.","In pratica sono un leader nato. I miei amici dicono sempre che dovrei essere il capo di qualcosa, quindi eccomi qui.","Ich bin im Grunde ein geborener Anführer. Meine Freunde sagen immer, ich sollte Chef von irgendwas sein, also bin ich hier."],
  ["Experience: I organized my cousin’s wedding (it rained but still). Skills: Excel (a bit), vibes (a lot).","Experiencia: organicé la boda de mi primo (llovió, pero aun así). Competencias: Excel (un poco), buen rollo (mucho).","Esperienza: ho organizzato il matrimonio di mio cugino (ha piovuto, ma comunque). Competenze: Excel (un po’), buone vibrazioni (tantissime).","Erfahrung: Ich habe die Hochzeit meines Cousins organisiert (es hat geregnet, aber trotzdem). Fähigkeiten: Excel (ein bisschen), Stimmung (sehr viel)."],
  ["Please reply before Friday, I have other offers (not really).","Por favor, respondan antes del viernes, tengo otras ofertas (en realidad no).","Rispondete entro venerdì, ho altre offerte (non è vero).","Bitte antworten Sie vor Freitag, ich habe andere Angebote (nicht wirklich)."],
  ["pls read!!!!","¡¡¡¡lean porfa!!!!","leggete pls!!!!","bitte lesen!!!!"],
  ["I know I don’t have the 5 years of experience you’re asking for, but I watched like 30 hours of YouTube videos about product management so I think that counts.","Sé que no tengo los 5 años de experiencia que piden, pero he visto como 30 horas de vídeos de YouTube sobre gestión de producto, así que creo que cuenta.","So di non avere i 5 anni di esperienza che chiedete, ma ho guardato tipo 30 ore di video su YouTube sulla gestione del prodotto, quindi credo che conti.","Ich weiß, ich habe nicht die 5 Jahre Erfahrung, die Sie verlangen, aber ich habe so 30 Stunden YouTube-Videos über Produktmanagement geschaut, also zählt das, denke ich."],
  ["I also have a podcast idea. Will tell you in the interview.","También tengo una idea para un pódcast. Os la cuento en la entrevista.","Ho anche un’idea per un podcast. Ve la racconto al colloquio.","Ich habe auch eine Podcast-Idee. Erzähle ich Ihnen im Gespräch."],
  ["Application for my son Jake","Candidatura de mi hijo Jake","Candidatura per mio figlio Jake","Bewerbung für meinen Sohn Jake"],
  ["Hello,","Hola:","Salve,","Hallo,"],
  ["I am writing on behalf of my son Jake, who is too shy to apply himself. He is very good with computers and fixed our printer twice.","Les escribo en nombre de mi hijo Jake, que es demasiado tímido para presentarse él mismo. Se le dan muy bien los ordenadores y ha arreglado nuestra impresora dos veces.","Vi scrivo per conto di mio figlio Jake, che è troppo timido per candidarsi da solo. È molto bravo con i computer e ha aggiustato la nostra stampante due volte.","Ich schreibe im Namen meines Sohnes Jake, der zu schüchtern ist, um sich selbst zu bewerben. Er kann sehr gut mit Computern umgehen und hat unseren Drucker zweimal repariert."],
  ["He would be an excellent manager of products. Please call me, not him, he doesn’t answer the phone.","Sería un excelente gerente de productos. Por favor, llámenme a mí, no a él, que no contesta al teléfono.","Sarebbe un ottimo responsabile di prodotti. Per favore chiamate me, non lui, non risponde al telefono.","Er wäre ein ausgezeichneter Manager für Produkte. Bitte rufen Sie mich an, nicht ihn, er geht nicht ans Telefon."],
  ["Kind regards,","Saludos cordiales,","Cordiali saluti,","Viele Grüße"],
  ["Linda (Jake’s mom)","Linda (la madre de Jake)","Linda (la mamma di Jake)","Linda (Jakes Mutter)"],
  ["(no subject)","(sin asunto)","(nessun oggetto)","(kein Betreff)"],
  ["hi","hola","ciao","hi"],
  ["is this still available?","¿esto sigue disponible?","è ancora disponibile?","ist das noch frei?"],

  // ---- Hiring pipeline / calendar
  ["Hiring pipeline","Proceso de selección","Processo di selezione","Auswahlprozess"],
  ["Previous month","Mes anterior","Mese precedente","Vorheriger Monat"],
  ["Next month","Mes siguiente","Mese successivo","Nächster Monat"],
  ["Joe San · all steps completed","Joe San · todos los pasos completados","Joe San · tutte le fasi completate","Joe San · alle Schritte abgeschlossen"],
  ["First Impressions","Primeras impresiones","Prime impressioni","Erster Eindruck"],
  ["Interview","Entrevista","Colloquio","Vorstellungsgespräch"],
  ["Case Study","Caso práctico","Caso di studio","Fallstudie"],
  ["with Recruiter","con el reclutador","con il selezionatore","mit dem Personalvermittler"],
  ["with Sr. Product Manager","con el gerente de producto sénior","con il responsabile di prodotto esperto","mit dem leitenden Produktmanager"],
  ["with Dir. of Product","con la directora de producto","con il direttore di prodotto","mit der Produktdirektorin"],
  ["with COO","con el director de operaciones","con il direttore operativo","mit dem Betriebsleiter"],
  ["Recruiter","Reclutador","Selezionatore","Personalvermittler"],
  ["Sr. Product Manager","Gerente de producto sénior","Responsabile di prodotto esperto","Leitender Produktmanager"],
  ["Dir. of Product","Directora de producto","Direttore di prodotto","Produktdirektorin"],
  ["COO","Director de operaciones","Direttore operativo","Betriebsleiter"],
  ["Video call","Videollamada","Videochiamata","Videoanruf"],
  ["Munich office","Oficina de Múnich","Ufficio di Monaco","Büro München"],
  ["Completed","Completado","Completato","Abgeschlossen"],
  ["Up next","A continuación","Prossimo","Als Nächstes"],
  ["Scheduled","Programado","In programma","Geplant"],
  ["Details","Detalles","Dettagli","Details"],
  ["Agenda","Orden del día","Ordine del giorno","Tagesordnung"],
  ["· Candidate","· Candidato","· Candidato","· Kandidat"],
  ["Introductions and motivation","Presentaciones y motivación","Presentazioni e motivazione","Vorstellung und Motivation"],
  ["Availability and location","Disponibilidad y ubicación","Disponibilità e sede","Verfügbarkeit und Standort"],
  ["Overview of the hiring process","Visión general del proceso de selección","Panoramica del processo di selezione","Überblick über den Auswahlprozess"],
  ["Strong fit for the role. Moved forward to interview.","Encaja muy bien en el puesto. Pasa a la entrevista.","Molto adatto al ruolo. Passa al colloquio.","Passt sehr gut zur Stelle. Weiter zum Vorstellungsgespräch."],
  ["Product sense and discovery","Criterio de producto y descubrimiento","Senso del prodotto e scoperta","Produktgespür und Produktfindung"],
  ["Walk-through of the Cansativa marketplace launch","Repaso del lanzamiento del mercado en línea de Cansativa","Analisi del lancio del mercato in rete di Cansativa","Rückblick auf den Start des Cansativa-Marktplatzes"],
  ["Working with engineering and design","Trabajo con ingeniería y diseño","Lavorare con ingegneria e progettazione","Zusammenarbeit mit Entwicklung und Gestaltung"],
  ["Present a product case (30 min)","Presentar un caso de producto (30 min)","Presentare un caso di prodotto (30 min)","Einen Produktfall vorstellen (30 Min.)"],
  ["Prioritization exercise","Ejercicio de priorización","Esercizio di definizione delle priorità","Übung zur Priorisierung"],
  ["Q&A with the product team","Preguntas y respuestas con el equipo de producto","Domande e risposte con la squadra di prodotto","Fragerunde mit dem Produktteam"],
  ["Role scope and first 90 days","Alcance del puesto y primeros 90 días","Ambito del ruolo e primi 90 giorni","Aufgabenbereich und erste 90 Tage"],
  ["Compensation and benefits","Remuneración y beneficios","Retribuzione e benefici","Vergütung und Zusatzleistungen"],
  ["Start date","Fecha de incorporación","Data di inizio","Eintrittsdatum"]
  ];

  // Templated strings: [English pattern, es, it, de] ($1, $2 = captured parts)
  var PATS=[
    [/^(\d+) mins$/,"$1 min","$1 min","$1 Min."],
    [/^(\d+) hrs$/,"$1 h","$1 h","$1 Std."],
    [/^1 day$/,"1 día","1 giorno","1 Tag"],
    [/^(\d+) days$/,"$1 días","$1 giorni","$1 Tage"],
    [/^(\d+) hrs ago$/,"hace $1 h","$1 ore fa","vor $1 Std."],
    [/^(\d+) days ago$/,"hace $1 días","$1 giorni fa","vor $1 Tagen"],
    [/^(\d+) of (\d+)$/,"$1 de $2","$1 di $2","$1 von $2"],
    [/^1 result$/,"1 resultado","1 risultato","1 Ergebnis"],
    [/^(\d+) results$/,"$1 resultados","$1 risultati","$1 Ergebnisse"],
    [/^Joe San · (\d+) steps · next: (.+)$/,"Joe San · $1 pasos · siguiente: $2","Joe San · $1 fasi · prossima: $2","Joe San · $1 Schritte · als Nächstes: $2"],
    [/^(.+), has appointment$/,"$1, con cita","$1, con appuntamento","$1, mit Termin"],
    [/^No appointments on (.+)$/,"Sin citas el $1","Nessun appuntamento il $1","Keine Termine am $1"],
    [/^No messages match “(.+)”\.$/,"Ningún mensaje coincide con “$1”.","Nessun messaggio corrisponde a “$1”.","Keine Nachricht passt zu „$1“."],
    [/^Beat (.+) to it\. Joe’s email is copied\.$/,"Adelántate a $1. El correo de Joe está copiado.","Anticipa $1. L’indirizzo di Joe è copiato.","Kommen Sie $1 zuvor. Joes E-Mail-Adresse ist kopiert."],
    [/^Beat (.+) to it: (.+)$/,"Adelántate a $1: $2","Anticipa $1: $2","Kommen Sie $1 zuvor: $2"],
    [/^Hiding (.+) won’t make them stop scouting Joe\.$/,"Ocultar a $1 no hará que deje de fijarse en Joe.","Nascondere $1 non gli impedirà di tenere d’occhio Joe.","$1 auszublenden hält sie nicht davon ab, Joe im Blick zu behalten."],
    [/^Email copied: (.+)$/,"Correo copiado: $1","Indirizzo copiato: $1","E-Mail-Adresse kopiert: $1"],
    [/^Phone number copied: (.+)$/,"Teléfono copiado: $1","Numero copiato: $1","Telefonnummer kopiert: $1"],
    [/^(\d+) min$/,"$1 min","$1 min","$1 Min."],
    [/^Rating (.+)$/,"Valoración $1","Valutazione $1","Bewertung $1"],
    [/^(\d)\.(\d) – (\d)\.(\d)$/,"$1,$2 – $3,$4","$1,$2 – $3,$4","$1,$2 – $3,$4"],
    [/^(\+ )?(\d+)\.(\d+)(%?)$/,"$1$2,$3$4","$1$2,$3$4","$1$2,$3$4"]
  ];

  var MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
  function cap(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
  function fmt(d,o){ return new Intl.DateTimeFormat(LOC,o).format(d); }

  // Date helpers used by the app (English keeps Joe's "27 November, 2026" style)
  var F={
    short:function(d){ return lang==='en'? fmt(d,{weekday:'short'})+', '+d.getDate()+' '+fmt(d,{month:'short'}) : fmt(d,{weekday:'short',day:'numeric',month:'short'}); },
    long:function(d){ return lang==='en'? fmt(d,{weekday:'long'})+', '+d.getDate()+' '+fmt(d,{month:'long'}) : fmt(d,{weekday:'long',day:'numeric',month:'long'}); },
    date:function(d){ return lang==='en'? d.getDate()+' '+fmt(d,{month:'long'})+', '+d.getFullYear() : fmt(d,{day:'numeric',month:'long',year:'numeric'}); },
    time:function(d){ return lang==='en'? fmt(d,{hour:'numeric',minute:'2-digit'}) : fmt(d,{hour:'2-digit',minute:'2-digit',hour12:false}); },
    full:function(d){ return F.date(d)+' · '+F.time(d); },
    month:function(d){ return cap(fmt(d,{month:'long',year:'numeric'})); },
    dow:{en:['Mo','Tu','We','Th','Fr','Sa','Su'],es:['Lu','Ma','Mi','Ju','Vi','Sá','Do'],it:['Lu','Ma','Me','Gi','Ve','Sa','Do'],de:['Mo','Di','Mi','Do','Fr','Sa','So']}[lang]
  };
  var SUGG={en:['roadmap','UX','research','Munich','communication','Ken Berklee'],
            es:['hoja de ruta','UX','investigación','Múnich','comunicación','Ken Berklee'],
            it:['tabella di marcia','UX','ricerca','Monaco','comunicazione','Ken Berklee'],
            de:['Fahrplan','UX','Forschung','München','Kommunikation','Ken Berklee']}[lang];

  var DICT={};
  if(COL) ROWS.forEach(function(r){ DICT[r[0].trim()]=r[COL].trim(); });

  function t(s){
    if(!COL||typeof s!=='string') return s;
    var k=s.trim(); if(!k) return s;
    var out=DICT[k];
    if(out===undefined){
      for(var i=0;i<PATS.length;i++){ if(PATS[i][0].test(k)){ out=k.replace(PATS[i][0],PATS[i][COL]); break; } }
    }
    if(out===undefined){
      // static dates: "30 October, 2023"
      var m=k.match(/^(\d{1,2}) ([A-Z][a-z]+), (\d{4})$/), mi=m?MONTHS.indexOf(m[2]):-1;
      if(mi>=0) out=F.date(new Date(+m[3],mi,+m[1]));
      // "Completed · 20 November, 2026" style is not used now, but keep times 24-hour
    }
    if(out===undefined) out=k;
    out=out.replace(/\b(\d{1,2}):(\d{2}) (AM|PM)\b/g,function(_,h,mn,ap){ h=+h%12+(ap==='PM'?12:0); return (h<10?'0':'')+h+':'+mn; });
    if(out===k) return s;
    var lead=s.match(/^\s*/)[0], trail=s.match(/\s*$/)[0];
    return lead+out+trail;
  }
  // translate string values inside app data (mails, interests, radars) so search works too
  function data(o){
    if(!COL||!o) return o;
    if(Array.isArray(o)){ for(var i=0;i<o.length;i++){ if(typeof o[i]==='string') o[i]=t(o[i]); else data(o[i]); } return o; }
    if(typeof o==='object'){ for(var k in o){ if(!o.hasOwnProperty(k)||/^(id|from|name|cover|embed|image|link0)$/.test(k)) continue;
      var v=o[k]; if(typeof v==='string') o[k]=t(v); else if(v&&typeof v==='object') data(v); } }
    return o;
  }

  window.i18n={lang:lang,locale:LOC,t:t,data:data,fmt:F,sugg:SUGG,
    set:function(l){ try{ localStorage.setItem('lang',l); }catch(e){} location.reload(); }};
  if(!COL) return;

  document.documentElement.lang=lang;
  var ATTRS=['aria-label','placeholder','data-tip','title','alt'];
  function skip(el){ return !el||el.closest('script,style,code,.no-i18n'); }
  function textNode(n){ if(skip(n.parentElement)) return; var v=t(n.nodeValue); if(v!==n.nodeValue) n.nodeValue=v; }
  function attrs(el){ for(var i=0;i<ATTRS.length;i++){ var a=ATTRS[i], v=el.getAttribute&&el.getAttribute(a); if(v){ var nv=t(v); if(nv!==v) el.setAttribute(a,nv); } } }
  function walk(root){
    if(root.nodeType===3) return textNode(root);
    if(root.nodeType!==1||skip(root)) return;
    attrs(root);
    var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,null), n;
    while((n=w.nextNode())){ if(n.nodeType===3) textNode(n); else attrs(n); }
  }
  document.title=t(document.title);
  walk(document.body);
  new MutationObserver(function(muts){
    muts.forEach(function(m){
      if(m.type==='characterData') textNode(m.target);
      else if(m.type==='attributes') attrs(m.target);
      else m.addedNodes.forEach(walk);
    });
  }).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:ATTRS});
})();
