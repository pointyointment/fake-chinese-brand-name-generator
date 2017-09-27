Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

var corpus_Banggood = "Aomway,Anet,ARILUX,ANENG,Astrolux,ALZRC,AOTDDOR,Archeer,AONIJIE,AUDEW,Alocs,ARCHON,Arsuxeo,Aputure,AMKOV,BlitzWolf,Bakeey,BULLCAPTAIN,BROPPE,BIKIGHT,Baseus,Baofeng,BrotherHobby,Broadlink,BOSI,Beelink,BSIDE,BEWELL,Bestrunner,BOYA,BOBING,Blackview,Cube,CHUWI,Charsoon,Convoy,CJMCU,Charmkpr,CURREN,CaseMe,Comfast,Celmia,Caden,CAMTOA,DJI,DANIU,DIGOO,DOOGEE,Drillpro,DYS,DT NO I,DQG,DANCINGNAIL,Eachine,EleksMaker,Emax,EKEN,ECUBEE,Ekphero,ESCAM,Excellway,Egrow,Effetool,ELEGIANT,EDUP,FlySky,FrSky,Fatshark,Foxeer,FNF,Feiyue,Feiyu Tech,Fenix,FXT,Fotga,Geekcreit,GPD,Geeetech,Gemfan,Gaoneng,GitUp,Gracila,GOPHERT,GARMIN,GUANQIN,GOLF,Hubsan,Huawei,Honana,HILDA,Hobbywing,Hawkeye,HANTEK,Hiland,HaikeLite,HOCO,IPRee,ISDT,Immersionrc,iMars,iRangeX,Inbike,IMALENT,INALIS,JJRC,JYE Tech,Jumper,JKM,JAKEMY,JARAGAR,JETBEAM,JASSY,Kingkong,KCASA,KALOAD,Klarus,KZ,Keith,KING DO WAY,KINGMAX,KUNIU,Lenovo,LeTV,Lemfo,Loskii,LUSTREON,Lumintop,LIVOLO,LuckyFine,LD,LEO,Matek,MUSTOOL,MantisTek,MACHIFIT,MOTOSPEED,Mixza,Meco,MEGIR,MASTECH,Mohoo,Mofi,M Way,Meizu,NILLKIN,NITECORE,Naturehike,NAVIFORCE,NightEye Auto Lighting,NORTH,Onda,Onyx Boox,Orange Pi,O NEWE,Orico,OCHSTIN,Onchoice,Orvibo,OHSEN,OUKITEL,Paron,PIPO,Pro sKit,PODOM,Panda,PEAKMETER,Pro biker,Pag,POFAN,Pisen,QCY,QKZ,QIPAI,Racerstar,Realacc,Runcam,Raspberry Pi,Raitool,RadioLink,REMAX,ROCKBROS,RUNDONG AUTO ACCESSORIES,ROCK,SONOFF,Suleve,Skyzone,SJcam,Syma,Soloop,Socofy,Seaknight,SKMEI,SANDA,SANWU,SINOBI,Scoyco,SEWOR,SOOCOO,SKILHUNT,SANRENMU,Sunwayman,Teclast,ThorFire,Tarot,Turbowing,TELESIN,Tenda,UMI,Ulefone,UNI T,VOYO,VIOFO,Vstarcam,Vvcare,Vention,VICTOR,Wltoys,Walkera,Water Ice Levin,Wemos,Wavlink,WINNER,Wanscam,Warsun,Wosawe,WEIDE,XIAOMI,XANES,XK,XF POWER,Y F M,YIHUA,Yani,YAZOLE,YunTeng,Yongnuo,YUEYIN,Yoobao,ZOP Power,Zeblaze,ZANLURE,ZK,ZX LED LIGHT"

function cleanCorpus(corpus) {
    corpus = corpus.toLowerCase();
    return corpus;
}

function generateModel(corpus, n) {
    var ngramsCounted = {};

    // Analyzing per name
    corpus = corpus.split(",");
    for (var i = 0; i < corpus.length; i++) {
        var thisName = corpus[i];
        // console.log(thisName);
        if (thisName.length < n) break;
        for (var j = 0; j < thisName.length - n + 1; j++) {
            var ngram = thisName.substring(j, j + n);
            // console.log(" ", j, ngram);
            if (!ngramsCounted[ngram]) {
                ngramsCounted[ngram] = [];
            }
            ngramsCounted[ngram].push(thisName.charAt(j + n));
        }
    }
    // console.log(ngramsCounted);

    // Old way: Analyzing as one string but rejecting any ngram with a comma in it
    // for (var i = 0; i < corpus.length - n + 1; i++) {
    //     var ngram = corpus.substring(i, i + n);
    //     if (!ngramsCounted[ngram]) {
    //         ngramsCounted[ngram] = [];
    //     }
    //     // if (ngram.split(",") === 1) {
    //         ngramsCounted[ngram].push(corpus.charAt(i+n));
    //     // }
    // }

    return ngramsCounted;
}

function generateText(model, length, start) {
    // TODO: check that start, if it's provided, is long enough for the model

    // Pick a starting string if the caller didn't provide one
    while (!start) {
        var startCandidate = Object.keys(model).randomElement();
        if (startCandidate.split(",").length === 1) {
            start = startCandidate;
        }
        console.log(start);
    }
    // if (!start) {
    //     start = Object.keys(model).randomElement();
    // }
    // console.log(start);

    var currentNgram;
    n = start.length;

    // Initialize the result with the starting string
    var result = start;
    for (var i = 0; i < length; i++) {
        // Take the current ngram (last n letters of the string being built)
        currentNgram = result.substring(result.length - n)

        // Get the possible next letters
        var possibilities = model[currentNgram];
        console.log(possibilities);

        // Pick one
        var next = possibilities.randomElement();

        // Stop when we reach a comma
        if (next === ",") break;

        // Append the chosen letter, if we didn't break
        result = result + next;
    }

    return result;
}

var model = generateModel(cleanCorpus(corpus_Banggood), 3);
