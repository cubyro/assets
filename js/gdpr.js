var cookieconsent = function(e) {
    var n = {};

    function o(t) {
        if (n[t]) return n[t].exports;
        var i = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(i.exports, i, i.exports, o), i.l = !0, i.exports
    }
    return o.m = e, o.c = n, o.d = function(e, n, t) {
        o.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: t
        })
    }, o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o.t = function(e, n) {
        if (1 & n && (e = o(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var t = Object.create(null);
        if (o.r(t), Object.defineProperty(t, "default", {
                enumerable: !0,
                value: e
            }), 2 & n && "string" != typeof e)
            for (var i in e) o.d(t, i, function(n) {
                return e[n]
            }.bind(null, i));
        return t
    }, o.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return o.d(n, "a", n), n
    }, o.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }, o.p = "", o(o.s = 17)
}([function(e, n, o) {
    "use strict";
    e.exports = function(e) {
        var n = [];
        return n.toString = function() {
            return this.map(function(n) {
                var o = function(e, n) {
                    var o = e[1] || "",
                        t = e[3];
                    if (!t) return o;
                    if (n && "function" == typeof btoa) {
                        var i = (r = t, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */"),
                            c = t.sources.map(function(e) {
                                return "/*# sourceURL=" + t.sourceRoot + e + " */"
                            });
                        return [o].concat(c).concat([i]).join("\n")
                    }
                    var r;
                    return [o].join("\n")
                }(n, e);
                return n[2] ? "@media " + n[2] + "{" + o + "}" : o
            }).join("")
        }, n.i = function(e, o) {
            "string" == typeof e && (e = [
                [null, e, ""]
            ]);
            for (var t = {}, i = 0; i < this.length; i++) {
                var c = this[i][0];
                null != c && (t[c] = !0)
            }
            for (i = 0; i < e.length; i++) {
                var r = e[i];
                null != r[0] && t[r[0]] || (o && !r[2] ? r[2] = o : o && (r[2] = "(" + r[2] + ") and (" + o + ")"), n.push(r))
            }
        }, n
    }
}, function(e, n, o) {
    var t, i, c = {},
        r = (t = function() {
            return window && document && document.all && !window.atob
        }, function() {
            return void 0 === i && (i = t.apply(this, arguments)), i
        }),
        a = function(e) {
            var n = {};
            return function(e, o) {
                if ("function" == typeof e) return e();
                if (void 0 === n[e]) {
                    var t = function(e, n) {
                        return n ? n.querySelector(e) : document.querySelector(e)
                    }.call(this, e, o);
                    if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement) try {
                        t = t.contentDocument.head
                    } catch (e) {
                        t = null
                    }
                    n[e] = t
                }
                return n[e]
            }
        }(),
        s = null,
        l = 0,
        p = [],
        d = o(10);

    function u(e, n) {
        for (var o = 0; o < e.length; o++) {
            var t = e[o],
                i = c[t.id];
            if (i) {
                i.refs++;
                for (var r = 0; r < i.parts.length; r++) i.parts[r](t.parts[r]);
                for (; r < t.parts.length; r++) i.parts.push(k(t.parts[r], n))
            } else {
                var a = [];
                for (r = 0; r < t.parts.length; r++) a.push(k(t.parts[r], n));
                c[t.id] = {
                    id: t.id,
                    refs: 1,
                    parts: a
                }
            }
        }
    }

    function f(e, n) {
        for (var o = [], t = {}, i = 0; i < e.length; i++) {
            var c = e[i],
                r = n.base ? c[0] + n.base : c[0],
                a = {
                    css: c[1],
                    media: c[2],
                    sourceMap: c[3]
                };
            t[r] ? t[r].parts.push(a) : o.push(t[r] = {
                id: r,
                parts: [a]
            })
        }
        return o
    }

    function _(e, n) {
        var o = a(e.insertInto);
        if (!o) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        var t = p[p.length - 1];
        if ("top" === e.insertAt) t ? t.nextSibling ? o.insertBefore(n, t.nextSibling) : o.appendChild(n) : o.insertBefore(n, o.firstChild), p.push(n);
        else if ("bottom" === e.insertAt) o.appendChild(n);
        else {
            if ("object" != typeof e.insertAt || !e.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
            var i = a(e.insertAt.before, o);
            o.insertBefore(n, i)
        }
    }

    function h(e) {
        if (null === e.parentNode) return !1;
        e.parentNode.removeChild(e);
        var n = p.indexOf(e);
        n >= 0 && p.splice(n, 1)
    }

    function m(e) {
        var n = document.createElement("style");
        if (void 0 === e.attrs.type && (e.attrs.type = "text/css"), void 0 === e.attrs.nonce) {
            var t = function() {
                0;
                return o.nc
            }();
            t && (e.attrs.nonce = t)
        }
        return g(n, e.attrs), _(e, n), n
    }

    function g(e, n) {
        Object.keys(n).forEach(function(o) {
            e.setAttribute(o, n[o])
        })
    }

    function k(e, n) {
        var o, t, i, c;
        if (n.transform && e.css) {
            if (!(c = "function" == typeof n.transform ? n.transform(e.css) : n.transform.default(e.css))) return function() {};
            e.css = c
        }
        if (n.singleton) {
            var r = l++;
            o = s || (s = m(n)), t = y.bind(null, o, r, !1), i = y.bind(null, o, r, !0)
        } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (o = function(e) {
            var n = document.createElement("link");
            return void 0 === e.attrs.type && (e.attrs.type = "text/css"), e.attrs.rel = "stylesheet", g(n, e.attrs), _(e, n), n
        }(n), t = function(e, n, o) {
            var t = o.css,
                i = o.sourceMap,
                c = void 0 === n.convertToAbsoluteUrls && i;
            (n.convertToAbsoluteUrls || c) && (t = d(t));
            i && (t += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */");
            var r = new Blob([t], {
                    type: "text/css"
                }),
                a = e.href;
            e.href = URL.createObjectURL(r), a && URL.revokeObjectURL(a)
        }.bind(null, o, n), i = function() {
            h(o), o.href && URL.revokeObjectURL(o.href)
        }) : (o = m(n), t = function(e, n) {
            var o = n.css,
                t = n.media;
            t && e.setAttribute("media", t);
            if (e.styleSheet) e.styleSheet.cssText = o;
            else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(o))
            }
        }.bind(null, o), i = function() {
            h(o)
        });
        return t(e),
            function(n) {
                if (n) {
                    if (n.css === e.css && n.media === e.media && n.sourceMap === e.sourceMap) return;
                    t(e = n)
                } else i()
            }
    }
    e.exports = function(e, n) {
        if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
        (n = n || {}).attrs = "object" == typeof n.attrs ? n.attrs : {}, n.singleton || "boolean" == typeof n.singleton || (n.singleton = r()), n.insertInto || (n.insertInto = "head"), n.insertAt || (n.insertAt = "bottom");
        var o = f(e, n);
        return u(o, n),
            function(e) {
                for (var t = [], i = 0; i < o.length; i++) {
                    var r = o[i];
                    (a = c[r.id]).refs--, t.push(a)
                }
                e && u(f(e, n), n);
                for (i = 0; i < t.length; i++) {
                    var a;
                    if (0 === (a = t[i]).refs) {
                        for (var s = 0; s < a.parts.length; s++) a.parts[s]();
                        delete c[a.id]
                    }
                }
            }
    };
    var v, b = (v = [], function(e, n) {
        return v[e] = n, v.filter(Boolean).join("\n")
    });

    function y(e, n, o, t) {
        var i = o ? "" : t.css;
        if (e.styleSheet) e.styleSheet.cssText = b(n, i);
        else {
            var c = document.createTextNode(i),
                r = e.childNodes;
            r[n] && e.removeChild(r[n]), r.length ? e.insertBefore(c, r[n]) : e.appendChild(c)
        }
    }
}, function(e) {
    e.exports = {
        dialog: {
            active: "Active",
            always_active: "Always active",
            change_settings: "Change my preferences",
            find_out_more: "<p>To find out more, please visit our <a href='%s' target='_blank'>Cookies Policy</a>.</p>",
            i_agree_text: "I agree",
            inactive: "Inactive",
            ok_text: "OK",
            text: "We use cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content and targeted ads, to analyze our website traffic, and to understand where our visitors are coming from. By browsing our website, you consent to our use of cookies and other tracking technologies.<br/>",
            title: "We use cookies"
        },
        level_functionality: {
            content: "<p>These cookies are used to provide you with a more personalized experience on our website and to remember choices you make when you use our website.</p><p>For example, we may use functionality cookies to remember your language preferences or remember your login details.</p>",
            title: "Functionality cookies"
        },
        level_strictly_necessary: {
            content: "<p>These cookies are essential to provide you with services available through our website and to enable you to use certain features of our website.</p><p>Without these cookies, we cannot provide you certain services on our website.</p>",
            title: "Strictly necessary cookies"
        },
        level_targeting: {
            content: "<p>These cookies are used to show advertising that is likely to be of interest to you based on your browsing habits.</p><p>These cookies, as served by our content and/or advertising providers, may combine information they collected from our website with other information they have independently collected relating to your web browser's activities across their network of websites.</p><p>If you choose to remove or disable these targeting or advertising cookies, you will still see adverts but they may not be relevant to you.</p>",
            title: "Targeting and advertising cookies"
        },
        level_tracking: {
            content: "<p>These cookies are used to collect information to analyze the traffic traffic to our website and how visitors are using our website.</p><p>For example, these cookies may track things such as how long you spend on the website or the pages you visit which helps us to understand how we can improve our website site for you.</p><p> The information collected through these tracking and performance cookies do not identify any individual visitor.</p>",
            title: "Tracking and performance cookies"
        },
        preference_center: {
            save: "Save my preferences",
            title: "Cookies Preferences Center"
        },
        preference_center_menu_and_content: {
            more_information_content: "<h1>More information</h1>\n<p>For any queries in relation to our policy on cookies and your choices, please contact us.</p>",
            more_information_title: "More information",
            your_privacy_content: "<h1>Your privacy is important to us</h1>\n<p>Cookies are very small text files that are stored on your computer when you visit a website. We use cookies for a variety of purposes and to enhance your online experience on our website (for example, to remember your account login details).</p><p>You can change your preferences and decline certain types of cookies to be stored on your computer while browsing our website. You can also remove any cookies already stored on your computer, but keep in mind that deleting cookies may prevent you from using parts of our website.</p>",
            your_privacy_title: "Your privacy"
        }
    }
}, function(e) {
    e.exports = {
        dialog: {
            active: "Activo",
            always_active: "Siempre activo",
            change_settings: "Cambia mi preferencias",
            find_out_more: "<p>Para saber más, visita nuestra página sobre la <a href='%s' target='_blank'>Política de Cookies</a>, por favor.</p>",
            i_agree_text: "Estoy de acuerdo",
            inactive: "Inactivo",
            ok_text: "OK",
            text: "Usamos cookies y otras tecnicas de rastreo para mejorar tu experiencia de navegación en nuestra web, para mostrarte contenidos personalizados y anuncios adecuados, para analizar el tráfico en nuestra web y para comprender de donde llegan nuestros visitantes. Navegando en nuestra web tu aceptas el uso de cookies y de otras tecnicas de rastreo.<br/>",
            title: "Utilizamos cookies"
        },
        level_functionality: {
            content: "<p>Estos cookies son utilizados para proveerte una más personalizada experiencia en nuestra web y para recordar tu elecciones en nuestro sitio web.</p><p>Por ejemplo, podemos utilizar cookies de funcionalidad para recordar tu preferencias de idioma o tus detalles de acceso.</p>",
            title: "Cookies de funcionalidad"
        },
        level_strictly_necessary: {
            content: "<p>Estos cookies son esenciales para proveerte los servicios disponibles en nuestra web y para permitirte de utilizar algunas características de nuestra web.</p><p>Sin estos cookies, no podemos proveer algunos servicios de nuestro sitio web.</p>",
            title: "Cookies estrictamente necesarias"
        },
        level_targeting: {
            content: "<p>Estos cookies son utilizados para enseñarte anuncios que pueden ser interesantes sobre la base de tus costumbres de navegación.</p><p>Estos cookies, como servidos por nuestros proveedores de contenido y/o de publicidad, puede combinar la información que ellos recogieron de nuestro sitio web con otra información recopilada por ellos en relación con las actividades de su navegador web a través de su red de sitios web.</p><p>Si tu eliges de cancelar o inhabilitar los cookies de seguimiento y publicidad, seguirás viendo anuncios pero estos podrían no ser de tu interés.</p>",
            title: "Cookies de seguimiento y publicidad"
        },
        level_tracking: {
            content: "<p>Estos cookies  son utilizados para recopilar información para analizar el tráfico en nuestra web y la forma en que los usuarios utilizan nuestra web.</p><p>Por ejemplo, estos cookies pueden recopilar datos como cuanto tiempo llevas navegado en nuestro sitio web o que páginas visitas, cosa que nos ayuda a comprender cómo podemos mejorar nuestra web para ti.</p><p>La información recopilada con estos cookies de rastreo y rendimiento no identifiquen a ningún visitante individual.</p>",
            title: "Cookies de rastreo y rendimiento"
        },
        preference_center: {
            save: "Guardar mi preferencias",
            title: "Centro de Preferencias de Cookies"
        },
        preference_center_menu_and_content: {
            more_information_content: "<h1>Más información</h1><p>Para cualquier pregunta en relación con nuestra política de cookies y tus preferencias, contacta con nosotros, por favor.</p>",
            more_information_title: "Más información",
            your_privacy_content: "<h1>Tu privacidad es importante para nosotros</h1><p>Los cookies son muy pequeños archivos de texto almacenados en tu ordenador cuando visitas nuestra web. Utilizamos cookies para diferentes objetivos y para mejorar tu experiencia en line en nuestro sitio web (por ejemplo, para recordar tu detalles de acceso).</p><p>Puedes cambiar tu preferencias y rechazar que algunos tipos de cookies sean almacenados en tu ordenador mientras estás navegando en nuestra web.</p><p>Puedes también cancelar cualquier cookie ya almacenado en tu ordenador, pero recuerda que cancelar los cookies puede impedirte de utilizar algunas partes de nuestra web.</p>",
            your_privacy_title: "Tu privacidad"
        }
    }
}, function(e) {
    e.exports = {
        dialog: {
            active: "Attivo",
            always_active: "Sempre attivo",
            change_settings: "Cambia le mie impostazioni",
            find_out_more: "<p>Per saperne di più, visita per favore la nostra pagina sulla <a href='%s' target='_blank'>Politica dei Cookies</a>.</p>",
            i_agree_text: "Accetto",
            inactive: "Inattivo",
            ok_text: "OK",
            text: "Noi usiamo i cookies e altre tecniche di tracciamento per migliorare la tua esperienza di navigazione nel nostro sito, per mostrarti contenuti personalizzati e annunci mirati, per analizzare il traffico sul nostro sito, e per capire da dove arrivano i nostri visitatori. Navigando nel nostro sito web, tu accetti il nostro utilizzo dei cookies e di altre tecniche di tracciamento.<br/>",
            title: "Noi usiamo i cookies"
        },
        level_functionality: {
            content: "<p>Questi cookies sono utilizzati per offrirti un’esperienza più personalizzata nel nostro sito e per ricordare le scelte che hai fatto mentre usavi il nostro sito.</p><p>Per esempio, possiamo usare cookies funzionali per memorizzare le tue preferenze sulla lingua o i tuoi dettagli di accesso.</p>",
            title: "Cookies funzionali"
        },
        level_strictly_necessary: {
            content: "<p>Questi cookies sono essenziali per fornirti i servizi disponibili nel nostro sito e per renderti disponibili alcune funzionalità del nostro sito web.</p><p>Senza questi cookies, non possiamo fornirti alcuni servizi del nostro sito.</p>",
            title: "Cookies strettamente necessari"
        },
        level_targeting: {
            content: "<p>Questi cookies sono usati per mostrare annunci pubblicitari che possano verosimilmente essere di tuo interesse in base alle tue abitudini di navigazione.</p><p>Questi cookies, cosí come forniti dai nostri fornitori di  contenuti o annunci pubblicitari, possono combinare le informazioni che raccolgono dal nostro sito web con quelle che hanno indipendentemente raccolto in relazione all’attività del tuo browser attraverso la loro rete di siti web.</p><p>Se scegli di rimuovere o disabilitare questo tipo di cookies di targeting e pubblicità, vedrai ancora annunci pubblicitari ma potrebbero essere irrilevanti per te.</p>",
            title: "Cookies di targeting e pubblicità"
        },
        level_tracking: {
            content: "<p>Questi cookies sono utilizzati per raccogliere informazioni per analizzare il traffico verso il nostro sito e il modo in cui i visitatori utilizzano il nostro sito.</p><p>Per esempio, questi cookies possono tracciare cose come quanto a lungo ti fermi nel nostro sito o le pagine che visiti, cosa che ci aiuta a capire come possiamo migliorare il nostro sito per te.</p><p>Le informazioni raccolte attraverso questi cookies di tracciamento e performance non identificano alcun visitatore individuale.</p>",
            title: "Cookies di targeting e pubblicità"
        },
        preference_center: {
            save: "Salva le mie impostazioni",
            title: "Centro Preferenze sui Cookies"
        },
        preference_center_menu_and_content: {
            more_information_content: "<h1>Più informazioni</h1><p>Per qualsiasi domanda relativa alla nostra politica sui cookies e le tue scelte, per favore contattaci.</p>",
            more_information_title: "Più informazioni",
            your_privacy_content: "<h1>La tua privacy è importante per noi</h1><p>I cookies sono dei piccolissimi file di testo che vengono memorizzati nel tuo computer quando visiti un sito web. Noi usiamo i cookies per una varietà di scopi e per migliorare la tua esperienza online nel nostro sito web (per esempio, per ricordare i tuoi dettagli di accesso).</p><p>Tu puoi cambiare le tue impostazioni e rifiutare che alcuni tipi di cookies vengano memorizzati sul tuo computer mentre stai navigando nel nostro sito web. Puoi anche rimuovere qualsiasi cookie già memorizzato nel tuo computer, ma ricorda che cancellare i cookies può impedirti di utilizzare alcune parti del nostro sito.</p>",
            your_privacy_title: "La tua privacy"
        }
    }
}, function(e) {
    e.exports = {
        dialog: {
            active: "Active",
            always_active: "Întotdeauna active",
            change_settings: "Vreau să schimb setările",
            find_out_more: "<p>Pentru a afla mai multe, te rugăm să citești <a href='%s' target='_blank'>Politica noastră de Cookie-uri</a>.</p>",
            i_agree_text: "Sunt de acord",
            inactive: "Inactive",
            ok_text: "OK",
            text: "Folosim cookie-uri și alte tehnologii de urmărire pentru a îmbunătăți experiența ta de navigare pe website-ul nostru, pentru afișa conținut și reclame personalizate, pentru a analiza traficul de pe website-ul nostru și pentru a înțelege de unde vin vizitatorii noștri. Navigând pe website-ul nostru, ești de acord cu utilizarea cookie-urilor, cât și a altor metode de urmărire folosite.<br/>",
            title: "Folosim cookie-uri"
        },
        level_functionality: {
            content: "<p>Aceste cookie-uri sunt folosite pentru a-ți asigura o experiență personalizată pe website-ul nostru și pentru salvarea alegerilor pe care le faci când folosești website-ul nostru.</p><p>De exemplu, putem folosi cookie-uri funcționale pentru a salva preferințele tale legate de limba website-ului nostru sau datele de logare.</p>",
            title: "Cookie-uri funcționale"
        },
        level_strictly_necessary: {
            content: "<p>Aceste cookie-uri sunt esențiale pentru a putea beneficia de serviciile disponibile pe website-ul nostru.</p><p>Fără aceste cookie-uri nu poți folosi anumite funcționalități ale website-ului nostru.</p>",
            title: "Cookie-uri strict necesare"
        },
        level_targeting: {
            content: "<p>Aceste cookie-uri sunt folosite pentru a-ți afișa reclame cât mai pe interesul tău, în funcție de obiceiurile tale de navigare.</p><p>Aceste cookie-uri, așa cum sunt afișate de furnizori noștri de conținut și/sau publicitate, pot combina informații de pe website-ul nostru cu alte informații pe care furnizori noștri le-au colectat în mod independent cu privire la activitatea ta în rețeaua lor de website-uri.</p><p>Dacă alegi să ștergi sau să dezactivezi aceste cookie-uri tot vei vedea reclame, dar se poate ca aceste reclame să nu fie relevante pentru tine.</p>",
            title: "Cookie-uri pentru marketing și publicitate"
        },
        level_tracking: {
            content: "<p>Acest tip de cookie-uri sunt folosite pentru a colecta informații în vederea analizării traficului pe website-ul nostru și modul în care vizitatorii noștri folosesc website-ul.</p><p>De exemplu, aceste cookie-uri pot urmări cât timp petreci pe website sau paginile pe care le vizitezi, ceea ce ne ajută să înțelegem cum putem îmbunătăți website-ul pentru tine.</p><p>Informațiile astfel colectate nu identifică individual vizitatorii.</p>",
            title: "Cookie-uri de analiză și performanță"
        },
        preference_center: {
            save: "Salvează",
            title: "Preferințe pentru Cookie-uri"
        },
        preference_center_menu_and_content: {
            more_information_content: "<h1>Mai multe informații</h1>\n<p>Pentru mai multe informații cu privire la politica noastră de cookie-uri și preferințele tale, te rugăm să ne contactezi.</p>",
            more_information_title: "Mai multe informații",
            your_privacy_content: "<h1>Confidențialitatea ta este importantă pentru noi</h1>\n<p>Cookie-urile sunt fișiere text foarte mici ce sunt salvate în browser-ul tău atunci când vizitezi un website. Folosim cookie-uri pentru mai multe scopuri, dar și pentru a îți oferi cea mai bună experiență de utilizare posibilă (de exemplu, să reținem datele tale de logare în cont).</p><p>Îți poți modifica preferințele și poți refuza ca anumite tipuri de cookie-uri să nu fie salvate în browser în timp ce navigezi pe website-ul nostru. Deasemenea poți șterge cookie-urile salvate deja în browser, dar reține că este posibil să nu poți folosi anumite părți ale website-ul nostru în acest caz.</p>",
            your_privacy_title: "Confidențialitatea ta"
        }
    }
}, function(e) {
    e.exports = {
        dialog: {
            active: "Aktivni",
            always_active: "Vedno aktivni",
            change_settings: "Spremeni moje nastavitve",
            find_out_more: "<p>Za več informacij si prosim oglejte naš <a href='%s' target='_blank'>Pravilnik o piškotkih</a>.</p>",
            i_agree_text: "Se strinjam",
            inactive: "Neaktivni",
            ok_text: "V redu",
            text: "Piškotke in druge sledilne tehnologije uporabljamo za izboljšanje vaše uporabniške izkušnje med brskanjem po naši spletni strani, za  prikazovanje personaliziranih vsebin oz. targetiranih oglasov, za analizo obiskov naše spletne strani in za vpogled v to, iz kje prihajajo naši gostje. Z brskanjem po naši spletni strani soglašate z našo rabo piškotkov in drugih sledilnih tehnologij.<br/>",
            title: "Uporabljamo piškotke"
        },
        level_functionality: {
            content: "<p>Ti piškotki se uporabljajo za zagotavljanje bolj personalizirane izkušnje na naši spletni strani in za shranjevanje vaših odločitev ob uporabi naše spletne strani.</p><p>Funkcionalne piškotke lahko, na primer, uporabljamo za to, da si zapomnimo vaše jezikovne nastavitve oz. podatke za vpis v vaš račun.</p>",
            title: "Funkcionalni piškotki (ang. functionality cookies)"
        },
        level_strictly_necessary: {
            content: "<p>Ti piškotki so ključnega pomena pri zagotavljanju storitev, ki so na voljo na naši spletni strani, in pri omogočanju določenih funkcionalnosti naše spletne strani.</p><p>Brez teh piškotkov vam ne moremo zagotoviti določenih storitev na naši spletni strani.</p>",
            title: "Nujno potrebni piškotki (ang. strictly necessary cookies)"
        },
        level_targeting: {
            content: "<p>Ti piškotki se uporabljajo za prikazovanje spletnih oglasov, ki vas bodo na podlagi vaših navad pri brskanju verjetno zanimali.</p><p>Ti piškotki, ki jih uporabljajo naši oglaševalski ponudniki oz. ponudniki vsebine, lahko združujejo podatke, ki so jih zbrali na naši spletni strani, z drugimi podatki, ki so jih zbrali neodvisno v povezavi z dejavnostmi vašega spletnega brskalnika na njihovi mreži spletnih mest.</p><p>Če se odločite izbrisati oz. onemogočiti te ciljne in oglaševalske piškotke, boste še vedno videvali oglase, vendar ti morda ne bodo relevantni za vas.</p>",
            title: "Ciljni in oglaševalski piškotki (ang. targeting and advertising cookies)"
        },
        level_tracking: {
            content: "<p>Ti piškotki se uporabljajo za zbiranje podatkov za analizo obiskov naše spletne strani in vpogled v to, kako gostje uporabljajo našo spletno stran.</p><p>Ti piškotki lahko, na primer, spremljajo stvari kot so to, koliko časa preživite na naši spletni strani oz. katere strani obiščete, kar nam pomaga pri razumevanju, kako lahko za vas izboljšamo spletno stran.</p><p>Podatki, ki jih zbirajo ti piškotki, ne identificirajo nobenega posameznega uporabnika.</p>",
            title: "Sledilni in izvedbeni piškotki (ang. tracking and performance cookies)"
        },
        preference_center: {
            save: "Shrani moje nastavitve",
            title: "Nastavitve piškotkov"
        },
        preference_center_menu_and_content: {
            more_information_content: "<h1>Več informacij</h1>\n<p>Če imate kakršnakoli vprašanja v zvezi z našim pravilnikom o piškotkih in vaših izbirah, nas prosim kontaktirajte.</p>",
            more_information_title: "Več informacij",
            your_privacy_content: "<h1>Cenimo vašo zasebnost</h1>\n<p>Piškotki so majhne besedilne datoteke, ki se shranijo na vašo napravo ob obisku spletne strani. Piškotke uporabljamo v več namenov, predvsem pa za izboljšanje vaše spletne izkušnje na naši strani (na primer za shranjevanje podatkov ob vpisu v vaš račun).</p><p>Vaše nastavitve lahko spremenite in onemogočite določenim vrstam piškotkov, da bi se shranili na vašo napravo med brskanjem po naši spletni strani. Poleg tega lahko odstranite katerekoli piškotke, ki so že shranjeni v vaši napravi, a upoštevajte, da vam bo po izbrisu piškotkov morda onemogočeno uporabljati dele naše spletne strani.</p>",
            your_privacy_title: "Vaša zasebnost"
        }
    }
}, function(e) {
    e.exports = {
        dialog: {
            active: "Aktywne",
            always_active: "Zawsze aktywne",
            change_settings: "Zmiana ustawień",
            find_out_more: "<p>Aby dowiedzieć się więcej, odwiedź naszą <a href='%s' target='_blank'>Politykę Cookie (Prywatności)</a>.</p>",
            i_agree_text: "Zgoda",
            inactive: "Nieaktywne",
            ok_text: "OK",
            text: "Używamy plików cookie i innych technologii śledzenia, aby poprawić jakość przeglądania naszej witryny, wyświetlać spersonalizowane treści i reklamy, analizować ruch w naszej witrynie i wiedzieć, skąd pochodzą nasi użytkownicy. Przeglądając naszą stronę, wyrażasz zgodę na używanie przez nas plików cookie i innych technologii śledzenia.<br/>",
            title: "Używamy pliki cookie"
        },
        level_functionality: {
            content: "<p>Te pliki cookie służą do bardziej spersonalizowanego korzystania z naszej strony internetowej i do zapamiętywania wyborów dokonywanych podczas korzystania z naszej strony internetowej.</p><p>Na przykład możemy używać funkcjonalnych plików cookie do zapamiętywania preferencji językowych lub zapamiętywania danych logowania.</p>",
            title: "Funkcjonalne"
        },
        level_strictly_necessary: {
            content: "<p>Te pliki cookie są niezbędne do świadczenia usług dostępnych za pośrednictwem naszej strony internetowej i umożliwienia korzystania z niektórych funkcji naszej strony internetowej.</p><p>Bez tych plików cookie nie możemy zapewnić usług na naszej stronie internetowej.</p>",
            title: "Niezbędne"
        },
        level_targeting: {
            content: "<p>Te pliki cookie służą do wyświetlania reklam, które mogą Cię zainteresować na podstawie Twoich zwyczajów przeglądania.</p><p>Pliki te tworzone przez naszych dostawców treści i/lub reklam, mogą łączyć informacje zebrane z naszej strony z innymi informacjami, które gromadzili niezależnie w związku z działaniami przeglądarki internetowej w ich sieci witryn.</p><p>Jeśli zdecydujesz się usunąć lub wyłączyć te pliki cookie, reklamy nadal będą wyświetlane, ale mogą one nie być odpowiednie dla Ciebie.</p>",
            title: "Targeting i reklama"
        },
        level_tracking: {
            content: "<p>Te pliki cookie służą do zbierania informacji w celu analizy ruchu na naszej stronie internetowej i sposobu, w jaki użytkownicy korzystają z naszej strony internetowej.</p><p>Na przykład te pliki cookie mogą śledzić takie rzeczy, jak czas spędzony na stronie lub odwiedzane strony, co pomaga nam zrozumieć, w jaki sposób możemy ulepszyć naszą witrynę internetową.</p><p>Informacje zebrane przez te pliki nie identyfikują żadnego konkretnego użytkownika.</p>",
            title: "Śledzenie i wydajność"
        },
        preference_center: {
            save: "Zapisz ustawienia",
            title: "Centrum ustawień cookie"
        },
        preference_center_menu_and_content: {
            more_information_content: "<h1>Więcej informacji</h1><p>W przypadku jakichkolwiek pytań dotyczących naszej polityki dotyczącej plików cookie i Twoich wyborów, skontaktuj się z nami.</p>",
            more_information_title: "Więcej informacji",
            your_privacy_content: "<h1>Twoja prywatność jest dla nas ważna.</h1><p>Pliki cookie to bardzo małe pliki tekstowe, które są tworzone i przechowywane na komputerze użytkownika podczas odwiedzania strony internetowej. Używamy plików cookie do różnych celów, w tym do ulepszania obsługi online na naszej stronie internetowej (na przykład, aby zapamiętać dane logowania do konta).</p><p>Możesz zmienić swoje ustawienia i odrzucić niektóre rodzaje plików cookie, które mają być przechowywane na twoim komputerze podczas przeglądania naszej strony. Możesz również usunąć wszystkie pliki cookie już zapisane na komputerze, ale pamiętaj, że usunięcie plików cookie może uniemożliwić korzystanie z części naszej strony internetowej.</p>",
            your_privacy_title: "Twoja prywatność"
        }
    }
}, function(e, n, o) {
    var t = o(9);
    "string" == typeof t && (t = [
        [e.i, t, ""]
    ]);
    var i = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    o(1)(t, i);
    t.locals && (e.exports = t.locals)
}, function(e, n, o) {
    (e.exports = o(0)(!1)).push([e.i, '/*\n*****\nRESET STYLES\n*****\n */\n\n.m-auto {\n  margin: auto !important; }\n\n.mt-auto,\n.my-auto {\n  margin-top: auto !important; }\n\n.mr-auto,\n.mx-auto {\n  margin-right: auto !important; }\n\n.mb-auto,\n.my-auto {\n  margin-bottom: auto !important; }\n\n.ml-auto,\n.mx-auto {\n  margin-left: auto !important; }\n\n.cc_css_reboot {\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -ms-overflow-style: scrollbar;\n  -webkit-tap-highlight-color: transparent;\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  text-align: left;\n  background-color: #fff; }\n  .cc_css_reboot *,\n  .cc_css_reboot *::before,\n  .cc_css_reboot *::after {\n    box-sizing: border-box; }\n  .cc_css_reboot a,\n  .cc_css_reboot li,\n  .cc_css_reboot p,\n  .cc_css_reboot h1,\n  .cc_css_reboot h2,\n  .cc_css_reboot h3,\n  .cc_css_reboot h4,\n  .cc_css_reboot h5,\n  .cc_css_reboot h6,\n  .cc_css_reboot input,\n  .cc_css_reboot button,\n  .cc_css_reboot select {\n    border-style: none;\n    box-shadow: none;\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n    outline: none; }\n\n@-ms-viewport {\n  .cc_css_reboot {\n    width: device-width; } }\n  .cc_css_reboot article, .cc_css_reboot aside, .cc_css_reboot figcaption, .cc_css_reboot figure, .cc_css_reboot footer, .cc_css_reboot header, .cc_css_reboot hgroup, .cc_css_reboot main, .cc_css_reboot nav, .cc_css_reboot section {\n    display: block; }\n  .cc_css_reboot [tabindex="-1"]:focus {\n    outline: 0 !important; }\n  .cc_css_reboot hr {\n    box-sizing: content-box;\n    height: 0;\n    overflow: visible; }\n  .cc_css_reboot h1, .cc_css_reboot h2, .cc_css_reboot h3, .cc_css_reboot h4, .cc_css_reboot h5, .cc_css_reboot h6 {\n    margin-top: 0;\n    margin-bottom: 0.5rem;\n    color: #000; }\n  .cc_css_reboot p {\n    margin-top: 0;\n    margin-bottom: 1rem; }\n  .cc_css_reboot abbr[title],\n  .cc_css_reboot abbr[data-original-title] {\n    text-decoration: underline;\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted;\n    cursor: help;\n    border-bottom: 0; }\n  .cc_css_reboot address {\n    margin-bottom: 1rem;\n    font-style: normal;\n    line-height: inherit; }\n  .cc_css_reboot div {\n    display: block; }\n  .cc_css_reboot ol,\n  .cc_css_reboot ul,\n  .cc_css_reboot dl {\n    margin-top: 0;\n    margin-bottom: 1rem; }\n  .cc_css_reboot ol ol,\n  .cc_css_reboot ul ul,\n  .cc_css_reboot ol ul,\n  .cc_css_reboot ul ol {\n    margin-bottom: 0; }\n  .cc_css_reboot b,\n  .cc_css_reboot strong {\n    font-weight: bolder; }\n  .cc_css_reboot small {\n    font-size: 80%; }\n  .cc_css_reboot sub,\n  .cc_css_reboot sup {\n    position: relative;\n    font-size: 75%;\n    line-height: 0;\n    vertical-align: baseline; }\n  .cc_css_reboot sub {\n    bottom: -.25em; }\n  .cc_css_reboot sup {\n    top: -.5em; }\n  .cc_css_reboot a {\n    color: #007bff;\n    text-decoration: none;\n    background-color: transparent;\n    -webkit-text-decoration-skip: objects; }\n  .cc_css_reboot a:hover {\n    color: #0056b3;\n    text-decoration: underline; }\n  .cc_css_reboot a:not([href]):not([tabindex]) {\n    color: inherit;\n    text-decoration: none; }\n  .cc_css_reboot a:not([href]):not([tabindex]):hover, .cc_css_reboot a:not([href]):not([tabindex]):focus {\n    color: inherit;\n    text-decoration: none; }\n  .cc_css_reboot a:not([href]):not([tabindex]):focus {\n    outline: 0; }\n  .cc_css_reboot img {\n    vertical-align: middle;\n    border-style: none; }\n  .cc_css_reboot svg:not(:root) {\n    overflow: hidden; }\n  .cc_css_reboot table {\n    border-collapse: collapse; }\n  .cc_css_reboot caption {\n    padding-top: 0.75rem;\n    padding-bottom: 0.75rem;\n    color: #6c757d;\n    text-align: left;\n    caption-side: bottom; }\n  .cc_css_reboot th {\n    text-align: inherit; }\n  .cc_css_reboot label {\n    display: inline-block;\n    margin-bottom: 0.5rem; }\n  .cc_css_reboot button {\n    border-radius: 2px;\n    padding: .5rem 1rem;\n    outline: none;\n    background: #dcdae5;\n    color: #111;\n    cursor: pointer;\n    border: none;\n    transition: all ease .3s; }\n    .cc_css_reboot button:focus {\n      outline: none; }\n  .cc_css_reboot select {\n    border-style: none; }\n  .cc_css_reboot input,\n  .cc_css_reboot button,\n  .cc_css_reboot select,\n  .cc_css_reboot optgroup,\n  .cc_css_reboot textarea {\n    margin: 0;\n    font-family: inherit;\n    font-size: inherit;\n    line-height: inherit; }\n  .cc_css_reboot button,\n  .cc_css_reboot input {\n    overflow: visible; }\n  .cc_css_reboot button,\n  .cc_css_reboot select {\n    text-transform: none; }\n  .cc_css_reboot button,\n  .cc_css_reboot html [type="button"],\n  .cc_css_reboot [type="reset"],\n  .cc_css_reboot [type="submit"] {\n    -webkit-appearance: button; }\n  .cc_css_reboot button::-moz-focus-inner,\n  .cc_css_reboot [type="button"]::-moz-focus-inner,\n  .cc_css_reboot [type="reset"]::-moz-focus-inner,\n  .cc_css_reboot [type="submit"]::-moz-focus-inner {\n    padding: 0;\n    border-style: none; }\n  .cc_css_reboot input[type="radio"],\n  .cc_css_reboot input[type="checkbox"] {\n    box-sizing: border-box;\n    padding: 0; }\n  .cc_css_reboot input[type="date"],\n  .cc_css_reboot input[type="time"],\n  .cc_css_reboot input[type="datetime-local"],\n  .cc_css_reboot input[type="month"] {\n    -webkit-appearance: listbox; }\n  .cc_css_reboot textarea {\n    overflow: auto;\n    resize: vertical; }\n  .cc_css_reboot fieldset {\n    min-width: 0;\n    padding: 0;\n    margin: 0;\n    border: 0; }\n  .cc_css_reboot legend {\n    display: block;\n    width: 100%;\n    max-width: 100%;\n    padding: 0;\n    margin-bottom: .5rem;\n    font-size: 1.5rem;\n    line-height: inherit;\n    color: inherit;\n    white-space: normal; }\n  .cc_css_reboot progress {\n    vertical-align: baseline; }\n  .cc_css_reboot [type="number"]::-webkit-inner-spin-button,\n  .cc_css_reboot [type="number"]::-webkit-outer-spin-button {\n    height: auto; }\n  .cc_css_reboot [type="search"] {\n    outline-offset: -2px;\n    -webkit-appearance: none; }\n  .cc_css_reboot [type="search"]::-webkit-search-cancel-button,\n  .cc_css_reboot [type="search"]::-webkit-search-decoration {\n    -webkit-appearance: none; }\n  .cc_css_reboot ::-webkit-file-upload-button {\n    font: inherit;\n    -webkit-appearance: button; }\n  .cc_css_reboot [hidden] {\n    display: none !important; }\n', ""])
}, function(e, n) {
    e.exports = function(e) {
        var n = "undefined" != typeof window && window.location;
        if (!n) throw new Error("fixUrls requires window.location");
        if (!e || "string" != typeof e) return e;
        var o = n.protocol + "//" + n.host,
            t = o + n.pathname.replace(/\/[^\/]*$/, "/");
        return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(e, n) {
            var i, c = n.trim().replace(/^"(.*)"$/, function(e, n) {
                return n
            }).replace(/^'(.*)'$/, function(e, n) {
                return n
            });
            return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(c) ? e : (i = 0 === c.indexOf("//") ? c : 0 === c.indexOf("/") ? o + c : t + c.replace(/^\.\//, ""), "url(" + JSON.stringify(i) + ")")
        })
    }
}, function(e, n, o) {
    var t = o(12);
    "string" == typeof t && (t = [
        [e.i, t, ""]
    ]);
    var i = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    o(1)(t, i);
    t.locals && (e.exports = t.locals)
}, function(e, n, o) {
    (e.exports = o(0)(!1)).push([e.i, '/*\n\nCookie Consent\n\n */\n.cc_overlay_lock {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.8);\n  z-index: 9999999999; }\n  .cc_overlay_lock.hidden {\n    display: none; }\n\n.cc_dialog {\n  background-color: #f2f2f2;\n  color: #111;\n  z-index: 99999999999; }\n  .cc_dialog.hidden {\n    display: none; }\n  .cc_dialog.headline {\n    right: 0;\n    top: 0;\n    bottom: auto;\n    left: 0;\n    max-width: 100%;\n    position: relative; }\n  .cc_dialog.simple {\n    right: 0;\n    top: auto;\n    bottom: 0;\n    left: auto;\n    max-width: 50%;\n    position: fixed; }\n  .cc_dialog.interstitial {\n    right: 3vw;\n    bottom: 3vh;\n    left: 3vw;\n    max-width: 100%;\n    position: fixed; }\n  .cc_dialog.standalone {\n    position: fixed;\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 100%; }\n  .cc_dialog .cc_dialog_headline {\n    font-size: 2rem;\n    font-weight: 600; }\n  .cc_dialog .cc_dialog_text {\n    font-size: 1.5rem; }\n  .cc_dialog button {\n    font-weight: bold;\n    font-size: 1.2rem; }\n    .cc_dialog button.cc_b_ok {\n      background-color: #008000;\n      color: #fff; }\n      .cc_dialog button.cc_b_ok:active {\n        background: #136d13; }\n    .cc_dialog button.cc_b_cp {\n      background-color: #eaeaea;\n      color: #111; }\n      .cc_dialog button.cc_b_cp:active {\n        background: #f2f2f2; }\n\n.cookie-consent-preferences-overlay {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 999999999999;\n  top: 0;\n  left: 0;\n  display: none; }\n  .cookie-consent-preferences-overlay.visible {\n    display: block; }\n  .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog {\n    position: absolute;\n    margin: 30px auto;\n    width: 750px;\n    max-width: 90%;\n    height: auto;\n    left: 0;\n    right: 0; }\n    .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container {\n      width: 100%;\n      display: flex;\n      background: #fff;\n      flex-direction: column; }\n      .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container > div {\n        width: 100%; }\n      .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head {\n        background: #fff;\n        color: #111;\n        display: flex;\n        flex-direction: row;\n        justify-content: space-between; }\n        .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_title {\n          display: flex;\n          padding-left: 15px;\n          flex-direction: column;\n          justify-content: center;\n          align-items: baseline; }\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_title h2,\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_title p {\n            margin: 0; }\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_title p {\n            font-size: 1.2rem;\n            line-height: 1.5; }\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_title h2 {\n            font-size: 1.5rem;\n            font-weight: 600; }\n        .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_lang_selector {\n          display: flex;\n          align-items: center;\n          padding-right: 15px;\n          min-height: 80px;\n          justify-content: center; }\n      .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content {\n        display: flex;\n        flex-direction: row;\n        align-items: stretch;\n        background: #292929;\n        color: #f5f5f5;\n        border-bottom: none; }\n        .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu {\n          font-family: Arial, sans-serif !important;\n          width: 150px;\n          margin: 0;\n          padding: 0;\n          background: #e6e6e6;\n          min-width: 150px; }\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li {\n            margin: 0;\n            padding: 0;\n            float: left;\n            display: block;\n            width: 100%;\n            color: #666;\n            background: #e6e6e6;\n            border-bottom: 1px solid #ccc;\n            border-right: 1px solid #ccc;\n            transition: all ease .1s;\n            box-sizing: content-box; }\n            .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li[active=true] {\n              background: #292929;\n              color: #f5f5f5; }\n            .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li a {\n              text-decoration: none;\n              color: #666;\n              display: block;\n              padding: 10px 5px 10px 10px;\n              font-weight: 700;\n              font-size: 12px;\n              line-height: 19px; }\n        .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content {\n          background: #292929 !important;\n          color: #f5f5f5; }\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content .cc_cp_m_content_entry {\n            width: 100%;\n            display: none;\n            padding: 25px;\n            box-sizing: border-box; }\n            .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content .cc_cp_m_content_entry[active=true] {\n              display: block; }\n            .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content .cc_cp_m_content_entry h1 {\n              font-size: 1.5rem;\n              font-weight: 600; }\n            .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content .cc_cp_m_content_entry p {\n              font-size: 1.2rem;\n              line-height: 1.5; }\n      .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer {\n        background: #f2f2f2;\n        display: flex;\n        flex-direction: row;\n        align-items: center;\n        border-top: 1px solid #ccc;\n        justify-content: space-between; }\n        .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_powered_by {\n          padding: 20px 10px;\n          font-size: 12px;\n          color: #333;\n          display: block !important; }\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_powered_by a {\n            color: #999; }\n        .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_save button {\n          margin-right: 10px;\n          opacity: .9;\n          transition: all ease .3s;\n          font-size: 1rem;\n          font-weight: bold;\n          height: auto; }\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_save button:hover {\n            opacity: 1; }\n  .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent {\n    position: absolute;\n    margin: 2px 0 0 16px;\n    cursor: pointer; }\n    .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent + label {\n      position: relative;\n      padding: 4px 0 0 50px;\n      line-height: 2.0em;\n      cursor: pointer;\n      display: inline; }\n      .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent + label:before {\n        content: "";\n        position: absolute;\n        display: block;\n        left: 0;\n        top: 0;\n        width: 40px;\n        /* x*5 */\n        height: 24px;\n        /* x*3 */\n        border-radius: 16px;\n        /* x*2 */\n        background: #fff;\n        border: 1px solid #d9d9d9;\n        -webkit-transition: all 0.3s;\n        transition: all 0.3s; }\n      .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent + label:after {\n        content: "";\n        position: absolute;\n        display: block;\n        left: 0px;\n        top: 0px;\n        width: 24px;\n        /* x*3 */\n        height: 24px;\n        /* x*3 */\n        border-radius: 16px;\n        /* x*2 */\n        background: #fff;\n        border: 1px solid #d9d9d9;\n        -webkit-transition: all 0.3s;\n        transition: all 0.3s; }\n      .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent + label:hover:after {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); }\n    .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent:checked + label:after {\n      margin-left: 16px; }\n    .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent:checked + label:before {\n      background: #55D069; }\n  .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent-sm {\n    position: absolute;\n    margin: 5px 0 0 10px; }\n    .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent-sm + label {\n      position: relative;\n      padding: 0 0 0 32px;\n      line-height: 1.3em; }\n      .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent-sm + label:before {\n        content: "";\n        position: absolute;\n        display: block;\n        left: 0;\n        top: 0;\n        background: #fff;\n        border: 1px solid #d9d9d9;\n        -webkit-transition: all 0.3s;\n        transition: all 0.3s;\n        width: 25px;\n        /* x*5 */\n        height: 15px;\n        /* x*3 */\n        border-radius: 10px;\n        /* x*2 */ }\n      .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent-sm + label:after {\n        content: "";\n        position: absolute;\n        display: block;\n        left: 0px;\n        top: 0px;\n        background: #fff;\n        border: 1px solid #d9d9d9;\n        -webkit-transition: all 0.3s;\n        transition: all 0.3s;\n        width: 15px;\n        /* x*3 */\n        height: 15px;\n        /* x*3 */\n        border-radius: 10px;\n        /* x*2 */ }\n      .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent-sm + label:hover:after {\n        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); }\n    .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent-sm:checked + label:after {\n      margin-left: 10px; }\n    .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent-sm:checked + label:before {\n      background: #55D069; }\n\n@media screen and (max-width: 600px) {\n  .cookie-consent-preferences-overlay {\n    overflow-y: scroll; }\n    .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head {\n      flex-direction: column; }\n      .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_title {\n        align-items: center;\n        padding: 15px 0 0 0; }\n      .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_lang_selector {\n        padding: 15px 0;\n        min-height: 20px; }\n    .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content {\n      flex-direction: column; }\n      .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu {\n        width: 100%; }\n        .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li {\n          border-right: 0; } }\n', ""])
}, function(e, n, o) {
    var t = o(14);
    "string" == typeof t && (t = [
        [e.i, t, ""]
    ]);
    var i = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    o(1)(t, i);
    t.locals && (e.exports = t.locals)
}, function(e, n, o) {
    (e.exports = o(0)(!1)).push([e.i, ".dark.cc_dialog {\n  background-color: #111;\n  color: #fff; }\n  .dark.cc_dialog .cc_dialog_headline {\n    color: #fff; }\n  .dark.cc_dialog .cc_dialog_text {\n    color: #fff; }\n  .dark.cc_dialog button.cc_b_ok {\n    color: #000;\n    background-color: #ff0; }\n  .dark.cc_dialog button.cc_b_cp {\n    background-color: #eaeaea;\n    color: #111; }\n\n.dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container {\n  background: #212121; }\n  .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head {\n    background: #212121;\n    color: #fff; }\n    .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head h2 {\n      color: #fff; }\n    .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head p {\n      color: #fff; }\n    .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_lang_selector select {\n      color: #212121; }\n  .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content {\n    background: #292929 !important;\n    color: #f5f5f5; }\n    .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu {\n      color: #666;\n      background: #e6e6e6; }\n      .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li {\n        border-right-color: #ccc;\n        border-bottom-color: #ccc; }\n        .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li[active=true] {\n          background: #292929 !important; }\n          .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li[active=true] a {\n            color: #f5f5f5 !important; }\n        .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li a {\n          color: #666; }\n    .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content {\n      background: #292929 !important;\n      color: #f5f5f5; }\n      .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content h1 {\n        color: #fff; }\n      .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content p {\n        color: #fff; }\n      .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content a {\n        color: #cce5ff; }\n  .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer {\n    background: #212121;\n    border-top-color: #111; }\n    .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_powered_by {\n      color: #fff; }\n    .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_save button {\n      background: #ff0;\n      color: #000; }\n", ""])
}, function(e, n, o) {
    var t = o(16);
    "string" == typeof t && (t = [
        [e.i, t, ""]
    ]);
    var i = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    o(1)(t, i);
    t.locals && (e.exports = t.locals)
}, function(e, n, o) {
    (e.exports = o(0)(!1)).push([e.i, ".light.cc_dialog {\n  background-color: #f2f2f2;\n  color: #111; }\n  .light.cc_dialog .cc_dialog_headline {\n    color: #111; }\n  .light.cc_dialog .cc_dialog_text {\n    color: #111; }\n  .light.cc_dialog button.cc_b_ok {\n    color: #fff;\n    background-color: #008000; }\n  .light.cc_dialog button.cc_b_cp {\n    background-color: #eaeaea;\n    color: #111; }\n\n.light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container {\n  background: #fff; }\n  .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head {\n    background: #fff;\n    color: #111;\n    border-bottom: 1px solid #ccc; }\n    .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head h2 {\n      color: #111; }\n    .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head p {\n      color: #111; }\n    .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_lang_selector select {\n      color: #111; }\n  .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content {\n    background: #fbfbfb !important;\n    color: #111111; }\n    .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu {\n      color: #666;\n      background: #e6e6e6; }\n      .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li {\n        border-right-color: #ccc;\n        border-bottom-color: #ccc; }\n        .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li[active=true] {\n          background: #fbfbfb !important; }\n          .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li[active=true] a {\n            color: #111 !important; }\n        .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li a {\n          color: #666; }\n    .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content {\n      background: #fbfbfb !important;\n      color: #111111; }\n      .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content h1 {\n        color: #111; }\n      .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content p {\n        color: #111; }\n      .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content a {\n        color: #007bff; }\n  .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer {\n    background: #f2f2f2;\n    border-top-color: #ccc; }\n    .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_powered_by {\n      color: #111; }\n    .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_save button {\n      background: #008000;\n      color: #FFF; }\n", ""])
}, function(e, n, o) {
    "use strict";
    o.r(n);
    o(8), o(11), o(13), o(15);
    var t = function() {
            function e() {}
            return e.insertCss = function(e) {
                var n = document.querySelector("head"),
                    o = document.createElement("link");
                o.setAttribute("href", e), o.setAttribute("rel", "stylesheet"), o.setAttribute("type", "text/css"), n.appendChild(o)
            }, e.appendChild = function(e, n, o) {
                var t, i;
                return void 0 === o && (o = null), t = "string" == typeof e ? document.querySelector(e) : e, i = "string" == typeof n ? document.querySelector(n) : n, "afterbegin" === o ? t.insertAdjacentElement("afterbegin", i) : t.insertAdjacentElement("beforeend", i), !0
            }, e.setCookie = function(e, n, o) {
                void 0 === o && (o = 62);
                var t = new Date;
                t.setTime(t.getTime() + 24 * o * 60 * 60 * 1e3);
                var i = "; expires=" + t.toUTCString();
                return document.cookie = e + "=" + (n || "") + i + "; path=/", !0
            }, e.getCookie = function(e) {
                for (var n = e + "=", o = document.cookie.split(";"), t = 0; t < o.length; t++) {
                    for (var i = o[t];
                        " " === i.charAt(0);) i = i.substring(1, i.length);
                    if (0 === i.indexOf(n)) return i.substring(n.length, i.length)
                }
                return null
            }, e.removeCookie = function(e) {
                document.cookie = e + "=; Max-Age=-99999999;"
            }, e.registerEvent = function(e) {
                var n = document.createEvent("Event");
                return n.initEvent(e, !0, !0), n
            }, e.searchObjectsArray = function(e, n, o) {
                for (var t in e) {
                    if (e[t][n] === o) return !0
                }
                return !1
            }, e.magicTransform = function(e) {
                return decodeURIComponent(atob(e).split("").map(function(e) {
                    return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
                }).join(""))
            }, e.isValidUrl = function(e) {
                return new RegExp("^(https?:\\/\\/)((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i").test(e)
            }, e
        }(),
        i = o(2),
        c = o(3),
        r = o(4),
        a = o(5),
        s = o(6),
        l = o(7),
        p = o(18),
        d = function() {
            function e(e) {
                this.cookieConsent = e, this.userLang = "en", this.initAvailableLanguages(), this.initDefaultTranslations(), this.detectUserLanguage()
            }
            return e.prototype.detectUserLanguage = function() {
                var e = "en";
                if (void 0 !== (e = void 0 !== navigator.languages ? navigator.languages[0] : navigator.language)) {
                    if (e.indexOf("-") > 0) {
                        var n = e.split("-");
                        e = n[0]
                    }
                    this.cookieConsent.log("[i18n] Detected user default language: " + e, "info")
                } else e = this.cookieConsent.ownerSiteLanguage;
                var o = e.toLowerCase.toString();
                this.availableTranslations[o] ? this.userLang = o : this.availableTranslations[this.cookieConsent.ownerSiteLanguage] ? this.userLang = this.cookieConsent.ownerSiteLanguage : this.userLang = "en"
            }, e.prototype.initDefaultTranslations = function() {
                this.availableTranslations = {
                    en: i,
                    es: c,
                    it: r,
                    ro: a,
                    sl: s,
                    pl: l,
                    cy: p
                }, this.cookieConsent.log("[i18n] Default translations initialized", "info")
            }, e.prototype.initAvailableLanguages = function() {
                this.availableLanguages = [{
                    value: "en",
                    title: "English"
                }, {
                    value: "es",
                    title: "Spanish"
                }, {
                    value: "it",
                    title: "Italian"
                }, {
                    value: "ro",
                    title: "Romanian"
                }, {
                    value: "sl",
                    title: "Slovenian"
                }, {
                    value: "pl",
                    title: "Polish"
                }, {
                    value: "cy",
                    title: "Welsh"
                }], this.cookieConsent.log("[i18n] Default languages initialized", "info")
            }, e.prototype.$t = function(e, n, o) {
                void 0 === o && (o = null);
                var t = this.availableTranslations[this.userLang][e][n];
                return "string" == typeof o ? t = t.replace("%s", o) : Array.isArray(o) && o.map(function(e, n) {
                    var i = o[n];
                    t = t.replace("%s", i)
                }), t || ""
            }, e
        }();
    o.d(n, "run", function() {
        return T
    }), o.d(n, "consentDebugger", function() {
        return f
    });
    var u, f, _ = (u = function(e, n) {
            return (u = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, n) {
                    e.__proto__ = n
                } || function(e, n) {
                    for (var o in n) n.hasOwnProperty(o) && (e[o] = n[o])
                })(e, n)
        }, function(e, n) {
            function o() {
                this.constructor = e
            }
            u(e, n), e.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
        }),
        h = function() {
            function e(e) {
                this.scripts = {}, this.cookieConsent = e, this.cookieConsent.log("Javascript items initialized.", "info"), this.readScripts()
            }
            return e.prototype.readScripts = function() {
                var e = document.querySelectorAll('script[type="text/plain"]');
                for (var n in e) {
                    var o = e[n];
                    "object" == typeof o && this._noticeScriptIfValid(o)
                }
            }, e.prototype._noticeScriptIfValid = function(e) {
                var n = e.getAttribute("cookie-consent");
                !0 === t.searchObjectsArray(this.cookieConsent.cookieLevels.cookieLevels, "id", n) ? (this.cookieConsent.log("Javascript with valid cookie consent found", "info"), this.cookieConsent.log(e, "info"), void 0 === this.scripts[n] && (this.scripts[n] = []), this.scripts[n].push(e)) : this.cookieConsent.log("Invalid cookie consent level for javascript sript: " + n, "warning")
            }, e.prototype.enableScriptsByLevel = function(e) {
                for (var n in this.scripts[e]) {
                    var o = this.scripts[e][n],
                        i = document.createElement("script");
                    i.setAttribute("type", "text/javascript"), i.setAttribute("initial-cookie-consent", o.getAttribute("cookie-consent")), null !== o.getAttribute("src") && i.setAttribute("src", o.getAttribute("src")), i.text = o.innerHTML, t.appendChild("head", i), o.parentNode.removeChild(o), delete this.scripts[e][n]
                }
            }, e
        }(),
        m = function() {
            function e(e) {
                this.acceptedLevels = {}, this.userAccepted = !1, this.consentLevelCookieName = "cookie_consent_level", this.consentAcceptedCookieName = "cookie_consent_user_accepted", this.loadCookiesUntilAndInclude = "strictly-necessary", this.cookieConsent = e, this.cookieConsent.log("UserConsent initialized.", "info"), this.checkIfUserAccepted(), this.getUserLevels()
            }
            return e.prototype.checkIfUserAccepted = function() {
                "true" === t.getCookie(this.consentAcceptedCookieName) && (this.userAccepted = !0)
            }, e.prototype.markUserAccepted = function() {
                this.userAccepted = !0, !1 === this.cookieConsent.isDemo && t.setCookie(this.consentAcceptedCookieName, "true")
            }, e.prototype.getUserLevels = function() {
                var e = t.getCookie(this.consentLevelCookieName),
                    n = {};
                try {
                    n = JSON.parse(decodeURIComponent(e))
                } catch (e) {
                    n = null
                }
                if (null === n) document.dispatchEvent(this.cookieConsent.events.cc_freshUser), this.enableAllCookies();
                else {
                    for (var o in this.cookieConsent.cookieLevels.cookieLevels) {
                        var i = this.cookieConsent.cookieLevels.cookieLevels[o].id;
                        !0 === n[i] ? this.acceptedLevels[i] = !0 : this.acceptedLevels[i] = !1, this.saveCookie()
                    }
                    this.cookieConsent.log(this.acceptedLevels, "info", "table")
                }
            }, e.prototype.enableAllCookies = function() {
                for (var e in this.cookieConsent.cookieLevels.cookieLevels) {
                    var n = this.cookieConsent.cookieLevels.cookieLevels[e].id;
                    this.acceptLevel(n)
                }
            }, e.prototype.loadCookiesUntilMaxLevel = function() {
                var e = !1;
                for (var n in this.cookieConsent.cookieLevels.cookieLevels) {
                    if (e) break;
                    var o = this.cookieConsent.cookieLevels.cookieLevels[n].id;
                    o === this.loadCookiesUntilAndInclude && (e = !0), !1 !== this.acceptedLevels[o] && this.cookieConsent.javascriptItems.enableScriptsByLevel(o)
                }
            }, e.prototype.loadAcceptedCookies = function() {
                for (var e in this.cookieConsent.cookieLevels.cookieLevels) {
                    var n = this.cookieConsent.cookieLevels.cookieLevels[e].id;
                    !1 !== this.acceptedLevels[n] && this.cookieConsent.javascriptItems.enableScriptsByLevel(n)
                }
            }, e.prototype.checkIsAccepted = function(e) {
                var n = !1;
                return e in this.acceptedLevels && !0 === this.acceptedLevels[e] && (n = !0), n
            }, e.prototype.acceptLevel = function(e) {
                return this.cookieConsent.log("Accepted cookie level: " + e, "info"), this.acceptedLevels[e] = !0, this.saveCookie()
            }, e.prototype.rejectLevel = function(e) {
                return this.cookieConsent.log("Rejected cookie level: " + e, "info"), this.acceptedLevels[e] = !1, this.saveCookie()
            }, e.prototype.saveCookie = function() {
                var e = encodeURIComponent(JSON.stringify(this.acceptedLevels));
                return t.setCookie(this.consentLevelCookieName, e), this.cookieConsent.log("Saved cookies containing the user consent level", "info"), !0
            }, e
        }(),
        g = function() {
            return function() {
                this.cc_dialogShown = t.registerEvent("cc_dialogShown"), this.cc_dialogOkPressed = t.registerEvent("cc_dialogOkPressed"), this.cc_dialogPreferencesPressed = t.registerEvent("cc_dialogPreferencesPressed"), this.cc_userLanguageChanged = t.registerEvent("cc_userLanguageChanged"), this.cc_preferencesSavePressed = t.registerEvent("cc_preferencesSavePressed"), this.cc_freshUser = t.registerEvent("cc_freshUser"), this.cc_userChangedConsent = t.registerEvent("cc_userChangedConsent")
            }
        }(),
        k = function() {
            function e(e) {
                this.cookieConsent = e, this.cc_dialogShown(), this.cc_dialogOkPressed(), this.cc_dialogPreferencesPressed(), this.cc_userLanguageChanged(), this.cc_preferencesSavePressed(), this.cc_freshUser(), this.cc_userChangedConsent()
            }
            return e.prototype.cc_dialogShown = function() {
                var e = this;
                window.addEventListener("cc_dialogShown", function() {
                    e.cookieConsent.log("cc_dialogShown triggered", "event")
                })
            }, e.prototype.cc_dialogOkPressed = function() {
                var e = this;
                document.addEventListener("cc_dialogOkPressed", function() {
                    e.cookieConsent.log("cc_dialogOkPressed triggered", "event"), e.cookieConsent.consentType instanceof L ? (e.cookieConsent.userConsent.markUserAccepted(), e.cookieConsent.userConsent.loadAcceptedCookies()) : e.cookieConsent.userConsent.markUserAccepted(), e.cookieConsent.consentBanner.hideDialog();
                    location.reload();
                })
            }, e.prototype.cc_dialogPreferencesPressed = function() {
                var e = this;
                window.addEventListener("cc_dialogPreferencesPressed", function() {
                    e.cookieConsent.log("cc_dialogPreferencesPressed triggered", "event"), e.cookieConsent.consentPreferences.showPreferences()
                })
            }, e.prototype.cc_userLanguageChanged = function() {
                var e = this;
                window.addEventListener("cc_userLanguageChanged", function() {
                    e.cookieConsent.log("cc_userLanguageChanged triggered", "event")
                })
            }, e.prototype.cc_preferencesSavePressed = function() {
                var e = this;
                window.addEventListener("cc_preferencesSavePressed", function() {
                    e.cookieConsent.log("cc_preferencesSavePressed triggered", "event"), e.cookieConsent.userConsent.markUserAccepted(), e.cookieConsent.userConsent.loadAcceptedCookies(), e.cookieConsent.consentPreferences.hidePreferences(), e.cookieConsent.consentBanner.hideDialog();
                    location.reload();
                })
            }, e.prototype.cc_freshUser = function() {
                var e = this;
                window.addEventListener("cc_freshUser", function() {
                    e.cookieConsent.log("cc_freshUser triggered", "event")
                })
            }, e.prototype.cc_userChangedConsent = function() {
                var e = this;
                window.addEventListener("cc_userChangedConsent", function() {
                    e.cookieConsent.log("cc_userChangedConsent triggered", "event")
                })
            }, e
        }(),
        v = function() {
            function e(e) {
                this.cookieConsent = e, this.initDefaultLevels(), this.initPreferenceItems()
            }
            return e.prototype.languageChanged = function() {
                this.initDefaultLevels(), this.initPreferenceItems()
            }, e.prototype.initDefaultLevels = function() {
                this.cookieLevels = [{
                    id: "strictly-necessary",
                    title: this.cookieConsent.i18n.$t("level_strictly_necessary", "title"),
                    content: this.cookieConsent.i18n.$t("level_strictly_necessary", "content")
                }, {
                    id: "functionality",
                    title: this.cookieConsent.i18n.$t("level_functionality", "title"),
                    content: this.cookieConsent.i18n.$t("level_functionality", "content")
                }, {
                    id: "tracking",
                    title: this.cookieConsent.i18n.$t("level_tracking", "title"),
                    content: this.cookieConsent.i18n.$t("level_tracking", "content")
                }, {
                    id: "targeting",
                    title: this.cookieConsent.i18n.$t("level_targeting", "title"),
                    content: this.cookieConsent.i18n.$t("level_targeting", "content")
                }]
            }, e.prototype.initPreferenceItems = function() {
                this.preferenceItems = [{
                    title: this.cookieConsent.i18n.$t("preference_center_menu_and_content", "your_privacy_title"),
                    content_container: "content_your_privacy",
                    content: this.cookieConsent.i18n.$t("preference_center_menu_and_content", "your_privacy_content")
                }];
                for (var e = 0, n = this.cookieLevels; e < n.length; e++) {
                    var o = n[e];
                    this.preferenceItems.push({
                        id: o.id,
                        title: o.title,
                        content_container: "content_" + o.id,
                        content: "\n<h1>" + o.title + "</h1>\n<p>" + o.content + "</p>\n"
                    })
                }
                this.preferenceItems.push({
                    title: this.cookieConsent.i18n.$t("preference_center_menu_and_content", "more_information_title"),
                    content_container: "content_more_information",
                    content: this.cookieConsent.i18n.$t("preference_center_menu_and_content", "more_information_content")
                }), null !== this.cookieConsent.cookiesPolicyUrl && t.isValidUrl(this.cookieConsent.cookiesPolicyUrl) && (this.preferenceItems[this.preferenceItems.length - 1].content = this.preferenceItems[this.preferenceItems.length - 1].content + this.cookieConsent.i18n.$t("dialog", "find_out_more", this.cookieConsent.cookiesPolicyUrl))
            }, e
        }(),
        b = function() {
            function e(e) {
                this.cpOverlay = null, this.cookieConsent = e
            }
            return e.prototype.listenToUserButtonToOpenPreferences = function(e) {
                var n = this,
                    o = document.querySelector(e);
                o && o.addEventListener("click", function() {
                    document.dispatchEvent(n.cookieConsent.events.cc_dialogPreferencesPressed), n.showPreferences()
                })
            }, e.prototype.showPreferences = function() {
                null === this.cpOverlay && (this.cpOverlay = this.createPreferencesOverlayAndDialog(), t.appendChild("body", this.cpOverlay)), this.cpOverlay.classList.add("visible"), this.cookieConsent.log("Cookie preferences dialog was shown", "info")
            }, e.prototype.hidePreferences = function() {
                this.cpOverlay.classList.remove("visible"), this.cookieConsent.log("Cookie preferences dialog was hidden", "info")
            }, e.prototype.refreshPreferences = function() {
                if (null !== this.cpOverlay) return this.cpOverlay.parentNode.removeChild(this.cpOverlay), this.cpOverlay = null, this.showPreferences()
            }, e.prototype.createPreferencesOverlayAndDialog = function() {
                var e = document.createElement("div");
                e.classList.add("cookie-consent-preferences-overlay"), e.classList.add(this.cookieConsent.colorPalette.getClass()), e.classList.add("cc_css_reboot");
                var n = document.createElement("div");
                n.classList.add("cookie-consent-preferences-dialog");
                var o = document.createElement("div");
                o.classList.add("cc_cp_container");
                var i = document.createElement("div");
                i.classList.add("cc_cp_head");
                var c = document.createElement("div");
                if (c.classList.add("cc_cp_head_title"), this.cookieConsent.ownerWebsiteName.length > 2) {
                    var r = document.createElement("p");
                    r.innerText = this.cookieConsent.ownerWebsiteName, t.appendChild(c, r)
                }
                var a = document.createElement("h2");
                a.innerHTML = this.cookieConsent.i18n.$t("preference_center", "title"), t.appendChild(c, a);
                var s = document.createElement("div");
                s.classList.add("cc_cp_head_lang_selector");
                var l = this.obtainLanguageSelector();
                t.appendChild(s, l), t.appendChild(i, c), t.appendChild(i, s);
                var p = document.createElement("div");
                p.classList.add("cc_cp_content");
                var d = this.getMenuContainer(),
                    u = this.getContentContainer();
                t.appendChild(p, d), t.appendChild(p, u);
                var f = this.getFooterContainer();
                return t.appendChild(o, i), t.appendChild(o, p), t.appendChild(o, f), t.appendChild(n, o), t.appendChild(e, n), e
            }, e.prototype.obtainLanguageSelector = function() {
                var e = this,
                    n = document.createElement("select");
                return [].forEach.call(e.cookieConsent.i18n.availableLanguages, function(o) {
                    var t = document.createElement("option");
                    t.text = o.title, t.value = o.value, e.cookieConsent.i18n.userLang === t.value && t.setAttribute("selected", "selected"), n.add(t)
                }), n.addEventListener("change", function() {
                    e.cookieConsent.i18n.userLang = n.value, e.cookieConsent.cookieLevels.languageChanged(), e.refreshPreferences(), document.dispatchEvent(e.cookieConsent.events.cc_userLanguageChanged)
                }), n
            }, e.prototype.getContentContainer = function() {
                var e = this,
                    n = document.createElement("div");
                n.classList.add("cc_cp_m_content");
                var o = 0;
                return e.cookieConsent.cookieLevels.preferenceItems.forEach(function(i) {
                    var c = document.createElement("div");
                    if (c.classList.add("cc_cp_m_content_entry"), c.setAttribute("content_layout", i.content_container), c.setAttribute("active", "false"), c.innerHTML = i.content, 0 === o && c.setAttribute("active", "true"), o++, i.id) {
                        var r = e._getLevelCheckbox(i);
                        t.appendChild(c, r)
                    }
                    t.appendChild(n, c)
                }), n
            }, e.prototype.getMenuContainer = function() {
                var e = this,
                    n = document.createElement("ul");
                n.classList.add("cc_cp_m_menu");
                var o = 0;
                return e.cookieConsent.cookieLevels.preferenceItems.forEach(function(i) {
                    var c = document.createElement("li"),
                        r = document.createElement("a");
                    r.setAttribute("href", "#"), r.setAttribute("t", i.content_container), r.innerHTML = i.title, 0 === o && c.setAttribute("active", "true"), o++, r.addEventListener("click", function(n) {
                        n.preventDefault(), e.cookieConsent.log("Preferences menu item clicked: " + i.title, "info");
                        var o = document.querySelectorAll('li[active="true"]');
                        [].forEach.call(o, function(e) {
                            e.setAttribute("active", "false")
                        }), c.setAttribute("active", "true");
                        try {
                            var t = document.querySelectorAll("div[content_layout]");
                            [].forEach.call(t, function(e) {
                                e.setAttribute("active", "false")
                            }), document.querySelector('div[content_layout="' + i.content_container + '"]').setAttribute("active", "true")
                        } catch (n) {}
                    }), t.appendChild(c, r), t.appendChild(n, c)
                }), n
            }, e.prototype.getFooterContainer = function() {
                var e = this,
                    n = document.createElement("div");
                n.classList.add("cc_cp_footer");
                var o = document.createElement("div");
                o.classList.add("cc_cp_f_powered_by"), o.innerHTML = '&nbsp;';
                var i = document.createElement("div");
                i.classList.add("cc_cp_f_save");
                var c = document.createElement("button");
                return c.innerHTML = e.cookieConsent.i18n.$t("preference_center", "save"), c.addEventListener("click", function() {
                    document.dispatchEvent(e.cookieConsent.events.cc_preferencesSavePressed)
                }), t.appendChild(i, c), t.appendChild(n, o), t.appendChild(n, i), n
            }, e.prototype._getLevelCheckbox = function(e) {
                var n = this,
                    o = document.createElement("div");
                if ("strictly-necessary" !== e.id) {
                    var i = n.cookieConsent.userConsent.acceptedLevels,
                        c = document.createElement("input");
                    c.setAttribute("cookie_consent_toggler", "true"), c.setAttribute("type", "checkbox"), c.setAttribute("class", "checkbox_cookie_consent"), c.setAttribute("id", e.id), c.setAttribute("name", e.id), (r = document.createElement("label")).setAttribute("for", e.id), i[e.id] ? (c.setAttribute("checked", "checked"), r.setAttribute("class", "is-active"), r.innerHTML = n.cookieConsent.i18n.$t("dialog", "active")) : (r.setAttribute("class", "is-inactive"), r.innerHTML = n.cookieConsent.i18n.$t("dialog", "inactive")), c.addEventListener("change", function() {
                        var o = c.checked,
                            t = e.id,
                            i = document.querySelector('label[for="' + t + '"]');
                        n.cookieConsent.log("User changed toggle for cookie level [" + t + "], new status: " + o, "info"), document.dispatchEvent(n.cookieConsent.events.cc_userChangedConsent), !0 === o ? (n.cookieConsent.userConsent.acceptLevel(t), i.innerHTML = n.cookieConsent.i18n.$t("dialog", "active")) : (n.cookieConsent.userConsent.rejectLevel(t), i.innerHTML = n.cookieConsent.i18n.$t("dialog", "inactive"))
                    }), t.appendChild(o, c), t.appendChild(o, r)
                } else {
                    var r, a = document.createElement("input");
                    a.setAttribute("cookie_consent_toggler", "true"), a.setAttribute("type", "checkbox"), a.setAttribute("checked", "checked"), a.setAttribute("disabled", "disabled"), a.setAttribute("class", "checkbox_cookie_consent"), a.setAttribute("id", e.id), a.setAttribute("name", e.id), (r = document.createElement("label")).setAttribute("for", e.id), r.innerHTML = n.cookieConsent.i18n.$t("dialog", "always_active"), t.appendChild(o, a), t.appendChild(o, r)
                }
                return o
            }, e
        }(),
        y = function() {
            function e(e) {
                this.dialog = null, this.dialogOverlay = null, this.dialogExtraCss = [], this.cookieConsent = e, this.dialogExtraCss.push(e.colorPalette.getClass())
            }
            return e.prototype.initDialog = function() {
                return null === this.dialog && (this.dialog = this.createDialog()), t.appendChild("body", this.dialog, "afterbegin"), this.cookieConsent.log("Consent dialog shown", "info"), document.dispatchEvent(this.cookieConsent.events.cc_dialogShown), !0
            }, e.prototype.hideDialog = function() {
                try {
                    this.dialog.classList.add("hidden"), this.cookieConsent.log("Consent dialog hidden", "info")
                } catch (e) {}
            }, e.prototype.createDialog = function() {
                var e = document.createElement("div");
                if (e.classList.add("cc_css_reboot"), e.classList.add("cc_dialog"), this.dialogExtraCss.length)
                    for (var n = 0, o = this.dialogExtraCss; n < o.length; n++) {
                        var i = o[n];
                        e.classList.add(i)
                    }
                if (t.appendChild(e, this.createDialogContent()), "interstitial" === this.cookieConsent.userNoticeType) {
                    var c = document.createElement("div");
                    return c.classList.add("cc_overlay_lock"), t.appendChild(c, e), c
                }
                return e
            }, e.prototype.createDialogContent = function() {
                var e = this,
                    n = document.createElement("div"),
                    o = document.createElement("h1");
                o.classList.add("cc_dialog_headline"), o.innerText = e.cookieConsent.i18n.$t("dialog", "title");
                var i = document.createElement("div"),
                    c = document.createElement("p");
                c.classList.add("cc_dialog_text"), c.innerHTML = e.cookieConsent.i18n.$t("dialog", "text"), t.appendChild(i, c);
                var r = document.createElement("button");
                r.classList.add("cc_b_ok"), "express" == e.cookieConsent.userConsentType ? r.innerHTML = e.cookieConsent.i18n.$t("dialog", "i_agree_text") : r.innerHTML = e.cookieConsent.i18n.$t("dialog", "ok_text"), r.addEventListener("click", function() {
                    document.dispatchEvent(e.cookieConsent.events.cc_dialogOkPressed)
                });
                var a = document.createElement("button");
                a.classList.add("cc_b_cp"), a.classList.add("ml-10"), a.innerHTML = e.cookieConsent.i18n.$t("dialog", "change_settings"), a.addEventListener("click", function() {
                    document.dispatchEvent(e.cookieConsent.events.cc_dialogPreferencesPressed)
                });
                var s = document.createElement("div");
                return t.appendChild(s, r), t.appendChild(s, a), t.appendChild(n, o), t.appendChild(n, i), t.appendChild(n, s), n
            }, e
        }(),
        w = function(e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.dialogExtraCss.push("simple"), o.dialogExtraCss.push("pt-10"), o.dialogExtraCss.push("py-5"), o
            }
            return _(n, e), n
        }(y),
        C = function(e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.dialogExtraCss.push("headline"), o.dialogExtraCss.push("px-5"), o.dialogExtraCss.push("py-5"), o
            }
            return _(n, e), n
        }(y),
        z = function(e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.dialogExtraCss.push("interstitial"), o.dialogExtraCss.push("ptb-20"), o.dialogExtraCss.push("pl-20"), o.dialogExtraCss.push("pr-20"), o
            }
            return _(n, e), n
        }(y),
        x = function(e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.dialogExtraCss.push("standalone"), o.dialogExtraCss.push("px-5"), o.dialogExtraCss.push("py-5"), o
            }
            return _(n, e), n
        }(y),
        j = function() {
            function e(e) {
                e.log("ConsentType main class initialized", "info")
            }
            return e.prototype.loadInitialCookies = function() {}, e
        }(),
        L = function(e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.cookieConsent = n, o
            }
            return _(n, e), n.prototype.loadInitialCookies = function() {
                var e = this.cookieConsent.cookieLevels.cookieLevels[0].id;
                this.cookieConsent.userConsent.loadCookiesUntilAndInclude = e.toString(), this.cookieConsent.userConsent.loadCookiesUntilMaxLevel()
            }, n
        }(j),
        E = function(e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.cookieConsent = n, o
            }
            return _(n, e), n.prototype.loadInitialCookies = function() {
                var e = this.cookieConsent.cookieLevels.cookieLevels.length,
                    n = this.cookieConsent.cookieLevels.cookieLevels[e - 1].id;
                this.cookieConsent.userConsent.loadCookiesUntilAndInclude = n.toString(), this.cookieConsent.userConsent.loadCookiesUntilMaxLevel()
            }, n
        }(j),
        P = function() {
            function e(e) {
                this.cookieConsent = e
            }
            return e.prototype.getClass = function() {
                return "light"
            }, e
        }(),
        A = function(e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.cookieConsent = n, o
            }
            return _(n, e), n.prototype.getClass = function() {
                return "dark"
            }, n
        }(P),
        U = function(e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.cookieConsent = n, o
            }
            return _(n, e), n.prototype.getClass = function() {
                return "light"
            }, n
        }(P),
        S = function() {
            function e(e) {
                switch (this.debug = !1, this.ownerWebsiteName = e.website_name || "", this.cookiesPolicyUrl = e.cookies_policy_url || null, this.userConsentType = e.consent_type || "express", this.userNoticeType = e.notice_banner_type || "headline", this.userColorPalette = e.palette || "light", this.ownerSiteLanguage = e.language || "en", this.userLanguageStrings = e.language_overwrite || {}, this.changePreferencesSelector = e.change_preferences_selector || null, this.isDemo = "true" == e.demo, this.userConsentType) {
                    default:
                        case "express":
                        this.consentType = new L(this);
                    break;
                    case "implied":
                            this.consentType = new E(this)
                }
                switch (this.userColorPalette) {
                    default:
                        case "dark":
                        this.colorPalette = new A(this);
                    break;
                    case "light":
                            this.colorPalette = new U(this)
                }
                switch (this.userNoticeType) {
                    default:
                        case "simple":
                        this.consentBanner = new w(this);
                    break;
                    case "headline":
                            this.consentBanner = new C(this);
                        break;
                    case "interstitial":
                            this.consentBanner = new z(this);
                        break;
                    case "standalone":
                            this.consentBanner = new x(this)
                }
                this.events = new g, this.eventsListeners = new k(this), this.i18n = new d(this), this.cookieLevels = new v(this), this.userConsent = new m(this), this.javascriptItems = new h(this), this.consentPreferences = new b(this), null !== this.changePreferencesSelector && this.consentPreferences.listenToUserButtonToOpenPreferences(this.changePreferencesSelector), !0 === this.userConsent.userAccepted ? (this.userConsent.loadAcceptedCookies(), !0 === this.isDemo && this.consentBanner.initDialog()) : (this.consentBanner.initDialog(), this.consentType.loadInitialCookies())
            }
            return e.prototype.log = function(e, n, o) {
                void 0 === o && (o = "log"), !0 === this.debug && ("log" === o ? console.log("[" + n + "]", e) : "table" === o && console.log("[" + n + "]", e))
            }, e
        }(),
        T = function(e) {
            return f = new S(e)
        }
}, function(e) {
    e.exports = {
        dialog: {
            active: "Gweithredol",
            always_active: "Yn weithredol bob tro",
            change_settings: "Newid fy newisiadau",
            find_out_more: "<p>I ganfod mwy, ewch at ein <a href='%s' target='_blank'>Polisi Cwcis</a>.</p>",
            i_agree_text: "Rwy'n cytuno",
            inactive: "Anweithredol",
            ok_text: "Iawn",
            text: "Rydym yn defnyddio cwcis a thechnolegau tracio eraill i wella eich profiad o bori ar ein gwefan, i ddangos cynnwys wedi ei bersonoli a hysbysebion wedi'u targedu, i ddadansoddi traffig ar ein gwefan ac i ddeall o ble daw ein hymwelwyr. Trwy bori ar ei gwefan, rydych yn cytuno y cawn ddefnyddio cwcis a thechnolegau tracio eraill.<br/>",
            title: "Rydym yn defnyddio cwcis"
        },
        level_functionality: {
            content: "<p>Mae'r cwcis yma yn cael eu defnyddio i ddarparu profiad mwy personol ichi ar ein gwefan, ac i gofio dewisiadau a wnewch wrth ddefnyddio ein gwefan.</p><p>Er enghraifft, gallem ddefnyddio cwcis swyddogaeth i gofio'ch dewis iaith neu gofio'ch manylion mewngofnodi.</p>",
            title: "Cwcis swyddogaeth"
        },
        level_strictly_necessary: {
            content: "<p>Mae'r cwcis yma yn hanfodol er mwyn ichi dderbyn gwasanaethau drwy ein gwefan a'ch galluogi i ddefnyddio nodweddion penodol ar ein gwefan.</p><p>Heb y cwcis yma, ni fedrwn ddarparu rhai gwasanaethau penodol ichi ar ein gwefan.</p>",
            title: "Cwcis hollol hanfodol"
        },
        level_targeting: {
            content: "<p>Mae'r cwcis yma yn cael eu defnyddio i ddangos hysbysebion sydd yn debygol o fod o ddiddordeb i chi yn seiliedig ar eich arferion pori.</p><p>Gall y cwcis yma, fel y'u gweinyddir gan ein darparwyr cynnwys a/neu hysbysebion, gyfuno gwybodaeth a gasglwyd ganddynt o'n gwefan gyda gwybodaeth arall maent wedi ei chasglu'n annibynnol yn seiliedig ar eich gweithgareddau pori ar y rhyngrwyd ar draws eu rhwydweithiau o wefannau.</p><p>Os byddwch yn dewis tynnu neu atal y cwcis targedu neu hysbysebu yma, byddwch yn parhau i weld hysbysebion ond mae'n bosib na fyddant yn berthnasol i chi. </p>",
            title: "Cwcis targedu a hysbysebu"
        },
        level_tracking: {
            content: "<p>Mae'r cwcis yma yn cael eu defnyddio i gasglu gwybodaeth a dadansoddi traffig i'n gwefan a sut mae ymwelwyr yn defnyddio'n gwefan.</p><p>Er enghraifft, gall y cwcis yma dracio faint o amser rydych yn ei dreulio ar y wefan neu'r tudalennau rydych yn ymweld â hwy a'n cynorthwyo i ddeall sut y gallwn wella ein gwefan ar eich cyfer.<p>Nid yw'r wybodaeth a gesglir drwy'r cwcis tracio a pherfformiad yn adnabod unrhyw ymwelydd unigol.</p>",
            title: "Cwcis tracio a pherfformiad"
        },
        preference_center: {
            save: "Cadw fy newisiadau",
            title: "Canolfan Dewisiadau Cwcis"
        },
        preference_center_menu_and_content: {
            more_information_content: "<h1>Rhagor o wybodaeth.</h1><p>Os oes gennych chi unrhyw ymholiadau yn ymwneud â'n polisi cwcis a'ch dewisiadau, a wnewch chi gysylltu â ni.</p>",
            more_information_title: "Rhagor o wybodaeth",
            your_privacy_content: "<h1>Mae eich preifatrwydd yn bwysig i ni.</h1><p>Ffeiliau testun bach eu maint yw cwcis sydd yn cael eu storio ar eich cyfrifiadur wrth ichi ymweld â gwefan. Rydym yn defnyddio cwcis i sawl diben ac i wella eich profiad ar-lein ar ein gwefan (er enghraifft, cofio eich manylion mewngofnodi i'ch cyfrif).</p><p>Gallwch newid eich dewisiadau ac atal rhai mathau o gwcis rhag cael eu storio ar eich cyfrifiadur. Gallwch hefyd dynnu unrhyw gwcis sydd eisoes wedi eu storio ar eich cyfrifiadur, ond cofiwch y gall.</p>",
            your_privacy_title: "Eich preifatrwydd"
        }
    }
}]);