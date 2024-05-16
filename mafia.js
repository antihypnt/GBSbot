// 마피아 기능 수요가 많을 것 같아서 스크립트 분리. (수요가 없다면 antibot과 통합 예정)

let scriptName = "mafia";

let peopleList = [];
let realPeopleList = [];
let mafiaList = [];
let citizenList = [];
let policeList = [];
let doctorList = [];

let dieList = [];
let killerList = [];
let deadPeople = "";
let curePeople = "";

let rnlcksgdk = false;

let vote = {};

let mafiaMode = 0;
let passNum = 0;
let voteNum = 0;

function mafiaInf(n) {
    if (n === 5) {return "1211";}
    if (n === 6) {return "1311";}
    if (n === 7) {return "2311";}
    if (n === 8) {return "2411";}
    if (n === 9) {return "2421";}
    if (n === 14) {return "3821";}
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

    sender = sender.replace("~~", "");

    if (msg === "ㄱ 마피아") {
        rnlcksgdk = false;
        dieList = [];
        killerList = [];
        deadPeople = "";
        curePeople = "";
        policePeople = "";
        vote = {};
        peopleList = [];
        realPeopleList = [];
        mafiaList = [];
        citizenList = [];
        policeList = [];
        doctorList = [];
        mafiaMode = 0;
        passNum = 0;
        voteNum = 0; // 모든 변수 초기화
        replier.reply("🔪 지금부터 마피아 게임을 시작하겠습니다. 🔪");
        replier.reply("5 ~ 9명까지 참여 가능합니다. 참여를 원하시는 분은 \"마피아 참여\"라고 입력해주세요. 동명이인은 참가가 불가합니다.");
        replier.reply("게임에 참여할 사람이 모두 참여했으면 참가자 중 한명이 \"마피아 참여 완료\" 라고 입력해주세요.");
        mafiaMode = 1; // 참가 모드
        useAntiBot(sender);
    }

    if (msg === "마피아 그만해") {
        mafiaMode = 0; // 초기화
        replier.reply("넹...");
        useAntiBot(sender);
    }

    if (msg === "마피아 참여" && mafiaMode === 1) {
        if (peopleList.indexOf(sender) > -1){
            replier.reply(sender + "님은 이미 게임에 참여하였습니다.");
        } else {
            peopleList.push(sender);
            replier.reply(sender + "님, 게임에 참여하셨습니다.");
        }
        useAntiBot(sender);
    }

    if (msg === "마피아 참여 완료" && mafiaMode === 1 && peopleList.indexOf(sender) > -1) {
        if (peopleList.length < 5) {

            replier.reply("인원이 넘치거나 부족합니다. 다시 게임을 시작해 주세요..");

            mafiaMode = 0 // 초기화

        } else {

            replier.reply("총 인원 " + peopleList.length.toString() + "명으로 게임을 시작하겠습니다.");
            replier.reply("진짜 시작을 원하시면 \"게임 시작\"이라고 입력하세요.")

            mafiaMode = 2 // 선발 모드
            realPeopleList = peopleList.slice(); // 새로운 배열로 깊은 복사

        }
        useAntiBot(sender);
    }

    if (msg === "게임 시작" && mafiaMode === 2) {

        mafiaMode = 3;

        replier.reply("좋습니다... 게임을 시작합니다.");

        let mafiainf = mafiaInf(peopleList.length); // 마피아, 시민, 경찰, 의사가 몇 명인지 반환하는 함수

        replier.reply("총 인원이 " + peopleList.length.toString() + "명이므로, 마피아 " + mafiainf[0] + "명, 시민 " + mafiainf[1] + "명, 경찰 " + mafiainf[2] + "명, 의사 " + mafiainf[3] + "명으로 인원을 선발하겠습니다.");
        replier.reply("무작위로 인원을 선발하고 있습니다...");

        shuffle(peopleList); // 섞고 앞에서부터 차례로 뽑음

        mafiaList = peopleList.splice(0, parseInt(mafiainf[0]));
        citizenList = peopleList.splice(0, parseInt(mafiainf[1]));
        policeList = peopleList.splice(0, parseInt(mafiainf[2]));
        doctorList = peopleList.splice(0, parseInt(mafiainf[3]));

        replier.reply("🔪 선발이 완료되었습니다. 🔪");
        replier.reply("역할은 각성제봇의 갠톡으로 지금 \"역할\"이라고 보내면 알려 드립니다. 여기서 역할이라고 메세지를 보내시면 직업이 노출될 수 있으니 자제해 주세요.");
        replier.reply("아침이 되었습니다. 마피아인 것 같은 사람을 찾아서 투표를 해주세요. 모두가 투표하면 밤이 됩니다. 마피아 투표 [사람이름] 또는 마피아 투표 패스라고 입력하시면 투표가 됩니다.");
        replier.reply("이름이 성을 뺀 이름인 경우가 있습니다. 유효하지 않은 투표라고 나올 시에는 성을 떼고 다시 투표해 보세요.");
        replier.reply("투표가 완료되면 투표한 것들 중에서 랜덤으로 골라 결과를 발표합니다. 즉, 투표 수가 많아질수록 그 사람이 죽을 확률이 높아집니다.");

        useAntiBot(sender);
    }

    if (msg === "역할" && mafiaMode >= 3) {
        if (mafiaList.indexOf(sender) > -1) {
            replier.reply("당신은 마피아입니다.");
            replier.reply("남은 마피아는 " + mafiaList.join(", ") + "님입니다.");
        } else if (citizenList.indexOf(sender) > -1) {
            replier.reply("당신은 시민입니다.");
        } else if (policeList.indexOf(sender) > -1) {
            replier.reply("당신은 경찰입니다.");
        } else if (doctorList.indexOf(sender) > -1) {
            replier.reply("당신은 의사입니다.");
        } else {
            replier.reply("게임에 참여하고 있지 않습니다.");
        }
        useAntiBot(sender);
    }

    if (msg.indexOf("마피아 투표") > -1 && mafiaMode === 3 && realPeopleList.indexOf(sender) > -1) {
        if (msg === "마피아 투표 패스") {
            replier.reply(sender + "님이 패스에 투표하셨습니다.");
            vote[sender] = "패스";
            passNum += 1;
        } else if (realPeopleList.indexOf(msg.replace("마피아 투표 ", "")) > -1 && vote[sender] === undefined) {
            replier.reply(sender + "님이 " + msg.replace("마피아 투표 ", "") + "님에게 투표하였습니다.");
            vote[sender] = msg.replace("마피아 투표 ", "");
        }

        if (Object.keys(vote).length === realPeopleList.length) {

            replier.reply("모든 분들이 투표를 완료해 주셨습니다.");

            let valuesVote = [];
            for (var i of Object.keys(vote)) {
                valuesVote.push(vote[i]);
            }
            let dies = valuesVote[Math.floor(Math.random() * realPeopleList.length)];

            if (dies === "패스") { // 뽑힌 값이 패스라면

                replier.reply("결과가 나왔습니다...");
                replier.reply("패스가 선발되었습니다. 이번 낮은 패스하겠습니다...");

            } else {

                replier.reply("결과가 나왔습니다...");
                replier.reply(dies + "님이 사살되었습니다.");

                if (mafiaList.indexOf(dies) > -1) {

                    replier.reply(dies + "님은 마피아였습니다.");
                    mafiaList.splice(mafiaList.indexOf(dies), 1);

                } else if (citizenList.indexOf(dies) > -1) {

                    replier.reply(dies + "님은 시민이었습니다.");
                    citizenList.splice(citizenList.indexOf(dies), 1);

                } else if (policeList.indexOf(dies) > -1) {

                    replier.reply(dies + "님은 경찰이었습니다.");
                    policeList.splice(policeList.indexOf(dies), 1);

                } else if (doctorList.indexOf(dies) > -1) {

                    replier.reply(dies + "님은 의사였습니다.");
                    doctorList.splice(doctorList.indexOf(dies), 1);

                }
                realPeopleList.splice(realPeopleList.indexOf(dies), 1);
            }

            if (mafiaList.length === citizenList.length + doctorList.length + policeList.length) {
                replier.reply("마피아의 승리로 게임이 종료되었습니다.");
            } else if (mafiaList.length === 0) {
                replier.reply("시민팀의 승리로 게임이 종료되었습니다!!");
            } else {

                mafiaMode = 4;

                replier.reply("다음 밤으로 넘어가겠습니다. 아무나 \"밤\"이라고 쳐주세요.");

                dieList = [];
                killerList = [];
                deadPeople = "";
                curePeople = "";
                policePeople = ""; // 변수 초기화

            }
        }
        useAntiBot(sender);
    }

    if (msg === "밤" && mafiaMode === 4) {

        rnlcksgdk = false;
        mafiaMode = 5;
        vote = {}; // 변수 초기화

        replier.reply("🔪 밤이 되었습니다. 🔪");
        replier.reply("마피아들은 죽이고 싶은 사람의 이름을, 의사는 살리고 싶은 사람의 이름을, 경찰은 마피아일 것 같은 사람 이름을 하나씩 각성제봇의 갠톡으로 보내주세요.");
        replier.reply("30초의 시간을 드립니다.");

        setTimeout(() => { // 뒤에 오는 코드는
            replier.reply("시간이 끝났습니다.");
            shuffle(dieList);
            deadPeople = dieList[0];
            if (deadPeople === undefined) {
                replier.reply("마피아는 아무도 죽이지 않았습니다.");
            } else if (deadPeople !== curePeople) {

                replier.reply("마피아는 " + deadPeople + "님을 살해하였습니다.");
                realPeopleList.splice(realPeopleList.indexOf(deadPeople), 1);

                if (mafiaList.indexOf(deadPeople) > -1) {
                    mafiaList.splice(mafiaList.indexOf(deadPeople), 1);
                } else if (citizenList.indexOf(deadPeople) > -1) {
                    citizenList.splice(citizenList.indexOf(deadPeople), 1);
                } else if (policeList.indexOf(deadPeople) > -1) {
                    policeList.splice(policeList.indexOf(deadPeople), 1);
                } else if (doctorList.indexOf(deadPeople) > -1) {
                    doctorList.splice(doctorList.indexOf(deadPeople), 1);
                }

            } else { // 죽은 사람이 치료한 사람과 같으면
                replier.reply("마피아는 " + deadPeople + "님을 살해하려고 하였으나 의사의 도움으로 살아났습니다.");
            }
            if (mafiaList.length === citizenList.length + doctorList.length + policeList.length) {
                replier.reply("마피아의 승리로 게임이 종료되었습니다.");
                replier.reply("남은 마피아는 " + mafiaList.join(", ") + "님입니다.");
            } else if (mafiaList.length === 0) {
                replier.reply("시민팀의 승리로 게임이 종료되었습니다!!");
            } else {
                replier.reply("다시 아침이 되었습니다. 논의하고 투표를 해주세요.");
                replier.reply("남은 사람은 " + realPeopleList.join(", ") + "님입니다.")
                if (rnlcksgdk) {
                    replier.reply("아, 그리고 좋은 소식이 있습니다. 경찰이 마피아를 찾았습니다...!"); // 변수이름저따구로짓네... 경찰이 마피아를 찾았는지 아닌지에 대한 boolean 값임. (rnlcksgdk)
                }
                mafiaMode = 3;
            }

        }, 30000);
        useAntiBot(sender);
    }

    if (mafiaList.indexOf(sender) > -1 && realPeopleList.indexOf(msg) > -1 && mafiaMode === 5 && killerList.indexOf(sender) === -1) {
        dieList.push(msg);
        killerList.push(sender);
        replier.reply(msg + "님을 살해 리스트에 넣었습니다.");
        useAntiBot(sender);
    }

    if (doctorList.indexOf(sender) > -1 && realPeopleList.indexOf(msg) > -1 && mafiaMode === 5) {
        curePeople = msg;
        killerList.push(sender);
        replier.reply(msg + "님을 치유합니다. 치유할 사람은 밤 시간 이내에 다시 바꿀 수 있습니다.");
        useAntiBot(sender);
    }

    if (policeList.indexOf(sender) > -1 && realPeopleList.indexOf(msg) > -1 && mafiaMode === 5 && policePeople === "") {
        policePeople = msg;
        if (mafiaList.indexOf(msg) > -1) {
            replier.reply(msg + "님은 마피아가 맞습니다.");
            rnlcksgdk = true;
        } else {
            replier.reply(msg + "님은 마피아가 아닙니다.");
        }
        useAntiBot(sender);
    }
}


function useAntiBot(sender) {
    let useAntiBotDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/useantibot.txt"));
    if (useAntiBotDict[sender] === undefined) {
        useAntiBotDict[sender] = 0;
    } else {
        useAntiBotDict[sender] += 1;
    }
    FileStream.write("/storage/emulated/0/msgbot/useantibot.txt", JSON.stringify(useAntiBotDict));
}

function onNotificationPosted(sbn, sm) {
    var packageName = sbn.getPackageName();
    if (!packageName.startsWith("com.kakao.tal")) return;
    var actions = sbn.getNotification().actions;
    if (actions == null) return;
    var userId = sbn.getUser().hashCode();
    for (var n = 0; n < actions.length; n++) {
        var action = actions[n];
        if (action.getRemoteInputs() == null) continue;
        var bundle = sbn.getNotification().extras;

        var msg = bundle.get("android.text").toString();
        var sender = bundle.getString("android.title");
        var room = bundle.getString("android.subText");
        if (room == null) room = bundle.getString("android.summaryText");
        var isGroupChat = room != null;
        if (room == null) room = sender;
        var replier = new com.xfl.msgbot.script.api.legacy.SessionCacheReplier(packageName, action, room, false, "");
        var icon = bundle.getParcelableArray("android.messages")[0].get("sender_person").getIcon().getBitmap();
        var image = bundle.getBundle("android.wearable.EXTENSIONS");
        if (image != null) image = image.getParcelable("background");
        var imageDB = new com.xfl.msgbot.script.api.legacy.ImageDB(icon, image);
        com.xfl.msgbot.application.service.NotificationListener.Companion.setSession(packageName, room, action);
        if (this.hasOwnProperty("responseFix")) {
            responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName, userId != 0);
        }
    }
}