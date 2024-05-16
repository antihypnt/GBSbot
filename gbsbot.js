/**
 * 각성제봇 v 1.27.15-beta
 * 경기북과학고등학교 개인톡 / 단체톡방 전용 카톡봇입니다.
 * 제작자 : 경기북과학고등학교 곽승재 (https://github.com/antihypnotic)
 * Copyright 2023. 곽승재 (IG : @anti_hypnotic)
 */

// 코드 많이 난잡함 주의

importClass(org.jsoup.Jsoup);

const scriptName = "gbsbot";

const M = Bridge.getScopeOf("modules");

let ticType = 0;
let ticPan = ["+", "+", "+", "+", "+", "+", "+", "+", "+"];
let ticPanCode = ["A1", "B1", "C1", "A2", "B2", "C2", "A3", "B3", "C3"];

const td = ["ㄱ 오늘급식", "오늘급식", "ㄱ 오늘 급식", "오늘 급식", "ㄱ ㅇㄴㄱㅅ", "ㅇㄴㄱㅅ", "ㄱ ㅇㄴ ㄱㅅ", "ㅇㄴ ㄱㅅ"];
const tm = ["ㄱ 내일급식", "내일급식", "ㄱ 내일 급식", "내일 급식", "ㄱ ㄴㅇㄱㅅ", "ㄴㅇㄱㅅ", "ㄱ ㄴㅇ ㄱㅅ", "ㄴㅇ ㄱㅅ"];
const td_bf = ["ㄱ 오늘아침", "오늘아침", "ㄱ 오늘 아침", "오늘 아침", "ㄱ ㅇㄴㅇㅊ", "ㅇㄴㅇㅊ", "ㄱ ㅇㄴ ㅇㅊ", "ㅇㄴ ㅇㅊ"];
const td_lc = ["ㄱ 오늘점심", "오늘점심", "ㄱ 오늘 점심", "오늘 점심", "ㄱ ㅇㄴㅈㅅ", "ㅇㄴㅈㅅ", "ㄱ ㅇㄴ ㅈㅅ", "ㅇㄴ ㅈㅅ"];
const td_dn = ["ㄱ 오늘저녁", "오늘저녁", "ㄱ 오늘 저녁", "오늘 저녁", "ㄱ ㅇㄴㅈㄴ", "ㅇㄴㅈㄴ", "ㄱ ㅇㄴ ㅈㄴ", "ㅇㄴ ㅈㄴ"];
const tm_bf = ["ㄱ 내일아침", "내일아침", "ㄱ 내일 아침", "내일 아침", "ㄱ ㄴㅇㅇㅊ", "ㄴㅇㅇㅊ", "ㄱ ㄴㅇ ㅇㅊ", "ㄴㅇ ㅇㅊ"];
const tm_lc = ["ㄱ 내일점심", "내일점심", "ㄱ 내일 점심", "내일 점심", "ㄱ ㄴㅇㅈㅅ", "ㄴㅇㅈㅅ", "ㄱ ㄴㅇ ㅈㅅ", "ㄴㅇ ㅈㅅ"];
const tm_dn = ["ㄱ 내일저녁", "내일저녁", "ㄱ 내일 저녁", "내일 저녁", "ㄱ ㄴㅇㅈㄴ", "ㄴㅇㅈㄴ", "ㄱ ㄴㅇ ㅈㄴ", "ㄴㅇ ㅈㄴ"];

let checkMinute = 0;

const Lw = "\u200b".repeat(500);

const count = {};

function petNum(n) {
    if (n === "0") {return ["૮ ･ﻌ･ა", "૮ -ﻌ-ა", "૮ >ﻌ<ა"];}
    else if (n === "1") {return ["૮₍ •̀ᴥ•́ ₎ა", "૮₍ -̀ᴥ-́ ₎ა", "૮₍ >̀ᴥ<́ ₎ა"];}
    else if (n === "2") {return ["₍ᐢ.ˬ.ᐢ₎", "₍ᐢ_ˬ_ᐢ₎", "₍ᐢ>ˬ<ᐢ₎"];}
    else if (n === "3") {return ["ฅ^•ﻌ•^ฅ", "ฅ^-ﻌ-^ฅ", "ฅ^>ﻌ<^ฅ"];}
    else if (n === "4") {return ["ʕ •ᴥ• ʔ", "ʕ -ᴥ- ʔ", "ʕ >ᴥ< ʔ"];}
    else if (n === "5") {return ["( •ɞ• )", "( -ɞ- )", "( >ɞ< )"];}
    else if (n === "6") {return ["˳⚆ɞ⚆˳", "˳-ɞ-˳", "˳>ɞ<˳"];}
    else if (n === "7") {return ["(＼(＼\n(  ･.･ )\n O_(\")(\")", "(＼(＼\n(  -.- )\n O_(\")(\")", "(＼(＼\n(  >.< )\n O_(\")(\")"];}
}

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

    sender = sender.replace("~~", "");

    let now = new Date();
    let day = now.getDay();

    // 기본적인 대화

    if (msg === "각성제 설명" || msg === "각성제봇 설명" || msg === "ㄱ 설명") {
        replier.reply("안녕하세요! 각성제봇입니다.\n" + Lw + "\n" +
            "각성제봇의 기본적 명령어는 ㄱ으로 시작합니다!\n" +
            "() 는 선택, [] 는 필수 항목입니다. 필수 항목을 입력해야 제대로 답변합니다!\n" +
            "괄호는 빼고 명령어를 입력하세요! \"ㄱ 지하철 [한티역]\"이 아니라 \"ㄱ 지하철 한티역\" 이라고 해야 동작합니다.\n" +
            "각성제봇의 기능은 다음과 같습니다.\n\n\n\n" +
            "1. 기본적인 기능\n\n" +
            " - 각성제봇의 개성있는 기능들이에요! 가끔 심심할 때 사용해 보세요.\n\n" +
            " * 각성제 (대화) / 각성제봇 (대화) / 성제야 (대화) : 각성제봇과 대화할 수 있는 기능이에요. 명령어 ㄱ을 빼도 작동해요. (ex.각성제 안녕) (사실상 인사밖에 안되는...)\n" +
            " * 각성제 최신정보 / 각성제봇 최신정보 : 각성제봇의 버전에 따른 최신정보를 확인할 수 있어요. 개발자가 바쁘다면 버전을 바꾸고 있을 가능성이 높으니 가끔 이 기능을 사용해 최신 기능에 대한 정보를 얻어보세요. ㄱ을 빼도 작동하는 기능이에요.\n" +
            " * ㄱ 타이머 [초 수] : 최대 3600초 설정 가능한 타이머를 설정합니다. (ex.ㄱ 타이머 100)\n" +
            " * ㄱ 한강물 : 한강물의 온도를 알 수 있어요! 아직 세상은 살만 한 것 같아요...\n" +
            " * ㄱ 지하철 [역명] : 그 역의 상행, 하행 실시간 열차 정보가 제공됩니다! 지하철 시간이 급할 때 확인해보세요. (ex.ㄱ 지하철 서울)\n" +
            " * ㄱ 지하철 즐겨찾기 [역명] : 역을 즐겨찾기 합니다. 이렇게 하면 ㅈㅎㅊ처럼 초성만 입력해도 해당 역의 지하철 정보를 얻을 수 있어요. (ex.ㄱ 지하철 즐겨찾기 삼성)\n" +
            " * ㄱ 틱택토 : 각성제봇과 틱택토 게임을 할 수 있어요. 각성제봇은 랜덤으로 두기 때문에 이기기 쉬울 거에요.\n" +
            " * ㄱ 마피아 : 각성제봇이 마피아의 사회자가 되어서 마피아 게임을 진행합니다!\n" +
            " * ㄱ 멜론차트 / ㄱ 멜론 / ㄱ 차트 : 실시간 멜론 TOP 100 차트를 10위까지 제공해요.\n" +
            " * ㄱ 개발자의한마디 : 개발자의 기분을 적어두는 곳이에요. 업데이트 될 때마다 확인해 보세요!\n" +
            " * ㄱ 정보 : 메세지를 보낸 유저의 정보(펫, 포인트 등)를 알 수 있어요.\n\n\n\n" +

            "2. 학교 관련 기능\n\n" +
            " - 과거에 있었던 북곽봇처럼, 급식, 시간표, 반 설정 등을 자동으로 지원하는 기능들입니다. 유용하게 쓸 수 있을 거에요!\n\n" +
            " * ㄱ [급식] : ㄱ 오늘급식, ㄱ 오늘저녁 등과 같이 입력해 오늘의 급식을 볼 수 있어요. 각성제봇의 중요한 기능이기 때문에 ㄱ 명령어가 없어도 작동하고, 초성으로 해도 작동합니다! ㅇㄴㄱㅅ, ㅇㄴㅈㄴ과 같이 보내도 작동하는 기능이에요.\n" +
            " * ㄱ 학사일정 (연월일) : 오늘 혹은 특정 날의 학사일정을 보여줍니다. (ex.ㄱ 학사일정 20240303)\n" +
            " * ㄱ 반 설정 [학년-반] : 보낸 사람의 학년과 반을 설정하는 기능이에요. 앞으로 시간표 기능을 사용하거나 반 정보를 알아야 하는 기능을 사용하면 그 사람의 반에 맞게 작동해요. (ex.ㄱ 반 설정 1-5)\n" +
            " * ㄱ 조 [사람 수] [조 수] : 랜덤으로 조를 짤 수 있어요. 수행평가 조를 짤 때 사용해 보세요! (ex. ㄱ 조 20 5)\n\n\n\n" +

            "3. 포인트 관련 기능\n\n" +
            " - 각성제봇을 열심히 사용해 포인트를 얻을 수 있고, 이 포인트로 펫을 사는 등 여러 활동을 할 수 있어요. 각성제봇 포인트, 펫 기능은 등록이 필요하기 때문에 등록을 요청하거나 개발자인 곽승재에게 개인적으로 연락을 줘야 사용할 수 있어요.\n\n" +
            " * ㄱ 출석 : 출석을 할 수 있어요. 출석하면 5000포인트를 얻을 수 있어요.\n" +
            " * ㄱ 주사위 [포인트 수] / ㄱ 포인트 (사람 이름) : 주사위를 이용한 포인트 도박을 할 수 있어요. 포인트의 사용처는 추후에 더 만들 계획이에요. (ex.ㄱ 주사위 5000, ㄱ 포인트 곽승재)\n" +
            " * ㄱ 펫 / ㄱ 펫 구매 : 각성제펫을 구매할 수 있어요. 펫을 키우는 기능은 차차 만들어갈 예정이에요.\n" +
            " * ㄱ 먹이 / ㄱ 먹이 구매 [먹이 종류] (먹이 개수) : 각성제펫에게 줄 수 있는 먹이를 살 수 있어요! (ex. ㄱ 먹이 구매 포도 100)\n" +
            " * ㄱ 먹이주기 [먹이 종류] (먹이 개수) : 각성제펫에게 먹이를 줄 수 있어요! (ex.ㄱ 먹이주기 아보카도 100)\n" +
            " * ㄱ 타자연습 [사람 이름] / ㄱ 타자 연습 [사람 이름] : 그 사람과 포인트를 걸고 타자연습을 할 수 있어요. (ex.ㄱ 타자연습 곽승재)\n" +
            " * ㄱ 러시안룰렛 : 각성제봇과 포인트를 이용한 러시안룰렛 게임을 할 수 있어요.\n\n\n\n" +

            " + 각성제봇이 버스의 실시간 위치를 제공할 수 있게 하는 서비스를 개발하고 있습니다! 조만간 추가될 예정이에요.\n" +
            " + 각성제봇을 이용해 펫을 기르는 각성제펫 서비스를 계속해서 개발중이에요. 혹시나 아이디어가 있다면 개발자 곽승재 (@anti_hypnotic)에게 전달해주면 반영될 수 있어요.\n" +
            " + 학교 도서검색 서비스를 개발하고 있어요. 최대한 빨리 개발해 볼게요.\n" +
            " + 북곽위키 검색 기능은 몇가지 오류가 발생한 관계로 다시 개발하고 있어요. 잠시만 기다려 주세요.\n" +
            " + 시간표 기능에 심한 차질이 생겨 새로 개발중이에요. 어느 정도 시간이 소요될 수 있으니 기다려 주세요.");
        useAntiBot(sender);
    }

    if (msg === "각성제봇" || msg === "각성제" || msg === "성제야") {
        replier.reply("네, 부르셨나요?");
        useAntiBot(sender);
    } else if (msg === "그치 각성제?") {
        replier.reply(room, "네 그렇죠!");
        useAntiBot(sender);
    } else if (msg === "?") {
        replier.reply("?");
        useAntiBot(sender);
    } else if (msg === "나") {
        replier.reply("락");
        useAntiBot(sender);
    } else if (msg === "¿") {
        replier.reply("¿");
        useAntiBot(sender);
    } else if (msg === "각성제 안녕" || msg === "각성제봇 안녕" || msg === "성제봇 안녕" || msg === "성제야 안녕") {
        replier.reply("네 " + sender + "님 안녕하세요!");
        useAntiBot(sender);
    }



    // 출석

    if (msg === "ㄱ 출석") {

        let pointDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/point.txt")); // pointDict는 포인트가 담긴 object

        if (pointDict[sender] !== undefined) { // 만약 포인트 등록이 되어 있는 사람이라면
            let chulseokDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/chulseok.txt")); // 출석 object를 가져옴
            let today = now.toISOString().substring(0, 10).replace(/-/g, '');
            if (chulseokDict[sender] !== today) {
                pointDict[sender] = pointDict[sender] + 5000;
                replier.reply(sender + "님, 출석으로 5000포인트가 추가되어 " + pointDict[sender] + "점이 되었어요!");
                FileStream.write("/storage/emulated/0/msgbot/point.txt", JSON.stringify(pointDict));
                chulseokDict[sender] = today; // 오늘 출석을 했음을 기록
                FileStream.write("/storage/emulated/0/msgbot/chulseok.txt", JSON.stringify(chulseokDict));
            } else {
                replier.reply(sender + "님은 이미 출석을 하셨어요!");
            }
        } else {
            pointDict[sender] = 10000; // 기본 포인트 설정 (등록해줌)
            let chulseokDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/chulseok.txt"));
            let today = now.toISOString().substring(0, 10).replace(/-/g, '');
            if (chulseokDict[sender] !== today) {
                pointDict[sender] = pointDict[sender] + 5000;
                replier.reply(sender + "님, 출석으로 5000포인트가 추가되어 " + pointDict[sender] + "점이 되었어요!");
                FileStream.write("/storage/emulated/0/msgbot/point.txt", JSON.stringify(pointDict));
                chulseokDict[sender] = today;
                FileStream.write("/storage/emulated/0/msgbot/chulseok.txt", JSON.stringify(chulseokDict));
            } else {
                replier.reply(sender + "님은 이미 출석을 하셨어요!");
            }
        }

        useAntiBot(sender);
    }

    else if (msg === "ㄱ 풀석") {
        replier.reply("일어나세요!");
        useAntiBot(sender);
    }

    // 타이머

    else if (msg.indexOf("ㄱ 타이머") > -1) {
        if (msg === "ㄱ 타이머") {
            replier.reply(room, "ㄱ 타이머 (초수)로 타이머를 설정할 수 있습니다! 3600초를 넘어가는 타이머는 지원하지 않습니다.");
            return;
        }
        if (msg === "ㄱ 타이머 설명") {
            replier.reply(room, "ㄱ 타이머 (초수)로 타이머를 설정할 수 있습니다! 3600초를 넘어가는 타이머는 지원하지 않습니다.");
            return;
        }
        if (!isNaN(msg.replace("ㄱ 타이머 ", ""))) {
            a = Number(msg.replace("ㄱ 타이머", ""));
            if (a > 3600 || a < 0) { // 0초 ~ 1시간만 됨
                replier.reply(room, sender + "님, 지원하지 않는 초 수입니다.");
                return;
            } else {
                replier.reply(room, sender + "님의 " + a + "초 타이머가 설정되었습니다.");
                setTimeout(() => replier.reply(room, sender + "님의 " + a + "초 타이머가 종료되었습니다."), a * 1000);
            }
        }
        useAntiBot(sender);
    }

    // 급식

    else if (td.indexOf(msg) > -1 || td_bf.indexOf(msg) > -1 || td_lc.indexOf(msg) > -1 || td_dn.indexOf(msg) > -1 || tm.indexOf(msg) > -1 || tm_bf.indexOf(msg) > -1 || tm_lc.indexOf(msg) > -1 || tm_dn.indexOf(msg) > -1) {
        try {
            meal = M.showMeal(msg); // 아침, 점심, 저녁 정보가 담겨있는 배열
            if (meal === undefined) {
                return;
            }
            if (Array.isArray(meal)) {
                replier.reply("🍚 오늘의 아침은 🍚\n\n" + meal[0] + "\n입니다!");
                replier.reply("🍜 오늘의 점심은 🍜\n\n" + meal[1] + "\n입니다!");
                replier.reply("🍗 오늘의 저녁은 🍗\n\n" + meal[2] + "\n입니다!");
                return;
            } else {
                replier.reply(meal); // ㅇㄴㅇㅊ 처럼 하나의 정보만 원할 경우 (가공을 modules에서 함. 약간 이상하긴 해)
                return;
            }
        } catch (e) {
            replier.reply("급식 정보가 없어요.");
        }
        useAntiBot(sender);
    }

    else if (msg === "오늘금식" || msg === "내일금식") {
        replier.reply("금식하지마세요ㅜㅜ");
        useAntiBot(sender);
    }



    // 반 설정

    else if (msg.indexOf("ㄱ 반 설정") > -1) {
        if (msg === "ㄱ 반 설정") {
            replier.reply("ㄱ 반 설정 1-1과 같이 입력하여 학년과 반을 설정해 보세요.");
        } else if (msg.replace("ㄱ 반 설정 ", "").indexOf("-") > -1) {
            let gradeClass = msg.replace("ㄱ 반 설정 ", "");
            let gradeClassList = ["1-1", "1-2", "1-3", "1-4", "1-5", "2-1", "2-2", "2-3", "2-4", "2-5", "3-1", "3-2", "3-3", "3-4", "3-5"];
            if (gradeClassList.indexOf(gradeClass) > -1) {
                let classJson = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/class.txt"));
                classJson[sender] = gradeClass;
                FileStream.write("/storage/emulated/0/msgbot/class.txt", JSON.stringify(classJson));
                replier.reply(sender + "님의 반이 " + gradeClass + "반으로 설정되었습니다.");
            } else {
                replier.reply("정확한 반을 입력하세요.");
            }
        }
        useAntiBot(sender);
    }

    else if (msg === "ㄱ 반") {
        let classJson = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/class.txt"));
        replier.reply(sender + "님의 반은 " + classJson[sender] + "반입니다.");
        useAntiBot(sender);
    }



    // 시간표

    if (msg === "ㅅㄱㅍ" || msg === "시간표" || msg === "ㄱ 시간표" || msg === "ㄱ ㅅㄱㅍ") {
        replier.reply(" !! 지금 정상적으로 작동하지 않는 기능입니다. 사용을 자제해주세요 !! ");
        // open api가 병신이라 다시 할 방법을 찾아야 할 듯 함
        useAntiBot(sender);
    }

    // 한강물..

    if (msg === "한강" || msg === "한강물" || msg === "ㄱ 한강물" || msg === "한강물 온도" || msg === "ㄱ 한강물 온도" || msg.indexOf("자살") > -1) {
        let hgUrl = "http://openapi.seoul.go.kr:8088/48516b4f48616e7436326766747543/json/WPOSInformationTime/1/1";
        let data = Utils.getWebText(hgUrl);

        data = data.split("<body>")[1];
        data = data.split("</body>")[0];
        data = JSON.parse(data);

        replier.reply("오늘 한강의 수온은 " + data.WPOSInformationTime.row[0].W_TEMP + "도 입니다.");
        replier.reply("괜찮아요... 아직 세상은 살 만 하니까요!");
        useAntiBot(sender);
    }



    // 지하철 (수정예정)

    if (msg.indexOf("ㄱ 지하철") > -1 || msg === "ㄱ ㅈㅎㅊ" || msg === "ㅈㅎㅊ" || msg === "지하철") {
        let metroFavJson = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/metroFav.txt"));
        if (msg === "ㄱ 지하철" || msg === "ㄱ ㅈㅎㅊ" || msg === "ㅈㅎㅊ" || msg === "지하철") {
            if (metroFavJson[sender] !== undefined) { // 즐겨찾기가 되어 있다면?
                let ans = M.metro(metroFavJson[sender].replace("역", ""));

                if (Array.isArray(ans)) {
                    for (var i of ans) {
                        let li = [];

                        li.push(i[0]);
                        try {li.push(i[2]);} catch (e) {}

                        let metroMsg = "🚈" + metroFavJson[sender].replace("역", "").replace("역", "") + "역 열차 운행 정보입니다!🚈\n\n";
                        for (var j of li) {
                            metroMsg = metroMsg + j + "\n";
                        }
                        metroMsg = metroMsg.slice(0, -1);
                        if (metroMsg.indexOf("다.") > -1) { // 제대로 되지 않은 정보가 나오는 경우가 있음. (검증)
                            replier.reply(metroMsg);
                        }
                    }
                } else {
                    replier.reply(ans);
                }
            } else { // 즐겨찾기가 되어 있지 않다면 (설명)
                replier.reply("ㄱ 지하철 (역 이름)으로 해당 역의 지하철 운행 정보를 알 수 있어요.");
                replier.reply("ㄱ 지하철 즐겨찾기 [역 이름]으로 즐겨찾기를 하면 앞으로 ㅈㅎㅊ이라고만 해서 그 역의 정보를 알 수 있어요!");
            }
        } else if (msg.indexOf("ㄱ 지하철 즐겨찾기") === -1) {
            let ans = M.metro(msg.replace("ㄱ 지하철 ", "").replace("역", ""));

            if (Array.isArray(ans)) {
                for (var i of ans) {
                    let li = [];

                    li.push(i[0]);
                    try {li.push(i[2]);} catch (e) {} // 운행정보 중에 2번째 index가 없을 수 있음

                    let metroMsg = "🚈" + msg.replace("ㄱ 지하철 ", "").replace("역", "") + "역 열차 운행 정보입니다!🚈\n\n";
                    for (var j of li) {
                        metroMsg = metroMsg + j + "\n";
                    }
                    metroMsg = metroMsg.slice(0, -1);
                    if (metroMsg.indexOf("다.") > -1) {
                        replier.reply(metroMsg);
                    }
                }
            } else {
                replier.reply(ans);
            }
        } else if (msg.indexOf("ㄱ 지하철 즐겨찾기 ") > -1) {
            metroFavJson[sender] = msg.replace("ㄱ 지하철 즐겨찾기 ", "");
            replier.reply(msg.replace("ㄱ 지하철 즐겨찾기 ", "").replace("역", "") + "역이 " + sender + "님의 즐겨찾기 역으로 설정되었어요!");
            replier.reply("이제 ㅈㅎㅊ, ㄱ ㅈㅎㅊ, 지하철, ㄱ 지하철로 호출하면 즐겨찾기 역의 운행 정보를 바로 볼 수 있어요.");
            FileStream.write("/storage/emulated/0/msgbot/metroFav.txt", JSON.stringify(metroFavJson));
        }
        useAntiBot(sender);
    }



    // 틱택토

    if (msg === "ㄱ 틱택토" && ticType === 0) {
        ticPan = ["+", "+", "+", "+", "+", "+", "+", "+", "+"];
        replier.reply("틱택토 게임을 시작합니다!");
        replier.reply("  ABC\n1+++\n2+++\n3+++");
        replier.reply("다음과 같은 판에서 게임을 진행합니다! 만약 놓고 싶은 칸이 있다면 B2(맨 가운데 칸)라고 입력하면 됩니다.");
        replier.reply("각성제봇이 먼저 시작할게요! 각성제봇의 돌은 X이고, 플레이어의 돌은 O에요.");
        let first = Math.floor(Math.random() * 9);
        ticPan[first] = "X";
        replier.reply("  ABC\n1" + ticPan[0] + ticPan[1] + ticPan[2] + "\n2" + ticPan[3] + ticPan[4] + ticPan[5] + "\n3" + ticPan[6] + ticPan[7] + ticPan[8]);
        ticType = 1;
    }

    else if (ticType !== 0) {
        if (ticPanCode.indexOf(msg) > -1) {
            let where = ticPanCode.indexOf(msg);
            if (ticPan[where] === "O") {
                replier.reply("이미 둔 자리에요.");
            } else if (ticPan[where] === "X") {
                replier.reply("각성제봇이 이미 둔 자리에요.");
            } else {
                ticPan[where] = "O";

                let next = Math.floor(Math.random() * 9);
                while (ticPan[next] !== "+") { // 봇이 고른 자리가 빈 자리여야 함!
                    next = Math.floor(Math.random() * 9);
                }
                ticPan[next] = "X";

                // 가로, 세로, 대각선 빙고가 있는지

                let garo1 = ticPan[0] === ticPan[1] && ticPan[1] === ticPan[2] && ticPan[2] === "O";
                let garo2 = ticPan[3] === ticPan[4] && ticPan[4] === ticPan[5] && ticPan[5] === "O";
                let garo3 = ticPan[6] === ticPan[7] && ticPan[7] === ticPan[8] && ticPan[8] === "O";

                let sero1 = ticPan[0] === ticPan[3] && ticPan[3] === ticPan[6] && ticPan[6] === "O";
                let sero2 = ticPan[1] === ticPan[4] && ticPan[4] === ticPan[7] && ticPan[7] === "O";
                let sero3 = ticPan[2] === ticPan[5] && ticPan[5] === ticPan[8] && ticPan[8] === "O";

                let daegak1 = ticPan[0] === ticPan[4] && ticPan[4] === ticPan[8] && ticPan[8] === "O";
                let daegak2 = ticPan[2] === ticPan[4] && ticPan[4] === ticPan[6] && ticPan[6] === "O";

                let garog1 = ticPan[0] === ticPan[1] && ticPan[1] === ticPan[2] && ticPan[2] === "X";
                let garog2 = ticPan[3] === ticPan[4] && ticPan[4] === ticPan[5] && ticPan[5] === "X";
                let garog3 = ticPan[6] === ticPan[7] && ticPan[7] === ticPan[8] && ticPan[8] === "X";

                let serog1 = ticPan[0] === ticPan[3] && ticPan[3] === ticPan[6] && ticPan[6] === "X";
                let serog2 = ticPan[1] === ticPan[4] && ticPan[4] === ticPan[7] && ticPan[7] === "X";
                let serog3 = ticPan[2] === ticPan[5] && ticPan[5] === ticPan[8] && ticPan[8] === "X";

                let daegakg1 = ticPan[0] === ticPan[4] && ticPan[4] === ticPan[8] && ticPan[8] === "X";
                let daegakg2 = ticPan[2] === ticPan[4] && ticPan[4] === ticPan[6] && ticPan[6] === "X";

                replier.reply("  ABC\n1" + ticPan[0] + ticPan[1] + ticPan[2] + "\n2" + ticPan[3] + ticPan[4] + ticPan[5] + "\n3" + ticPan[6] + ticPan[7] + ticPan[8]);

                if (garo1 || garo2 || garo3 || sero1 || sero2 || sero3 || daegak1 || daegak2) {
                    replier.reply(sender + "님의 승리로 틱택토 게임이 마무리되었어요! 🎉🎉");
                    ticType = 0;
                    let pointDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/point.txt"));
                    pointDict[sender] += 1000;
                    FileStream.write("/storage/emulated/0/msgbot/point.txt", JSON.stringify(pointDict));
                    replier.reply(sender + "님의 포인트에 1000점이 추가되어 " + pointDict[sender] + "점이 되었어요.");
                } else if (garog1 || garog2 || garog3 || serog1 || serog2 || serog3 || daegakg1 || daegakg2) {
                    replier.reply("저의 승리로 게임이 마무리되었어요. 😎");
                    ticType = 0;
                } else if (ticPan.indexOf("+") === -1) {
                    replier.reply("무승부에요 ㅜㅜ... 게임을 종료할게요.");
                    ticType = 0;
                }
            }
        }
        useAntiBot(sender);
    }

    if (msg === "틱택토 그만해") {
        ticType = 0;
        replier.reply("넹...");
        useAntiBot(sender);
    }



    // 멜론차트

    if (msg === "ㄱ 멜론차트" || msg === "ㄱ 멜론 차트" || msg === "ㄱ 멜론" || msg === "ㄱ 멜차" || msg === "ㄱ 차트") {
        replier.reply(M.melonChart());
        useAntiBot(sender);
    }



    // 혹시...정보도...판매합니까..?

    if (msg === "ㄱ 정보") {
        let pointDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/point.txt"));
        let foodDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/food.txt"));
        let petDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/pet.txt"));
        let classJson = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/class.txt"));
        let metroFavJson = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/metroFav.txt"));

        let inf = sender + "님의 정보입니다!" + Lw + "\n\n";

        if (pointDict[sender] === undefined) { inf += " * 포인트 : 등록이 되어있지 않아요!\n"; }
        else { inf += " * 포인트 : " + pointDict[sender].toString() + "점\n"; }

        if (petDict[sender] === undefined) { inf += " * 펫 : 등록이 되어있지 않아요!\n"; }
        else { inf += " * 펫 : " + petNum(petDict[sender][petDict[sender].length - 1])[0] + "\n"; }

        if (foodDict[sender] === undefined) { inf += " * 먹이 : 등록이 되어있지 않아요!\n"; }
        else { inf += " * 먹이 : " + foodDict[sender].join("개, ") + "개\n"; }

        if (classJson[sender] === undefined) { inf += " * 반 : 등록이 되어있지 않아요!\n"; }
        else { inf += " * 반 : " + classJson[sender] + "반\n"; }

        if (metroFavJson[sender] === undefined) { inf += " * 즐겨찾기 역 : 등록이 되어있지 않아요!\n"; }
        else { inf += " * 즐겨찾기 역 : " + metroFavJson[sender].replace("역", "") + "역\n"; }

        replier.reply(inf);
        useAntiBot(sender);
    }



    // 그냥 개발자의 한마디...

    if (msg === "ㄱ 개발자의한마디" || msg === "ㄱ 개발자의 한마디") {
        replier.reply("봇개발힘들어요");
        replier.reply("나도 게임 만들면서 살고싶어...");
        useAntiBot(sender);
    }



    // 날씨 (수정 완)

    if (msg.indexOf("ㄱ 날씨") > -1) {
        let searchWeather = msg.replace("ㄱ 날씨 ", "");
        replier.reply(M.weather(searchWeather));
        useAntiBot(sender);
    }



    // 자동전송

    if (msg.indexOf("ㄱ 자동전송") > -1 || msg.indexOf("ㄱ 자동 전송") > -1) {

        let weatherDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/weatherROOM.txt"));
        let mealDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/mealROOM.txt"));
        let timetableDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/timetableROOM.txt"));

        if (msg === "ㄱ 자동전송" || msg === "ㄱ 자동 전송") {
            replier.reply("ㄱ 자동전송 [기능 이름] 이라고 입력해 아침 7시마다 정보를 받아보세요!");
            replier.reply("기능에는 날씨, 급식, 시간표가 있습니다.");
        } else if (msg.indexOf("ㄱ 자동전송 날씨") > -1 || msg.indexOf("ㄱ 자동 전송 날씨") > -1) {
            if (msg === "ㄱ 자동전송 날씨" || msg === "ㄱ 자동 전송 날씨") {
                replier.reply("ㄱ 자동전송 [기능 이름] [지역 이름] 이라고 입력해 아침 7시마다 정보를 받아보세요!");
            } else if (msg === "ㄱ 자동전송 날씨 취소" || msg === "ㄱ 자동 전송 날씨 취소") {
                if (mealDict[room] !== undefined) {
                    delete weatherDict[room];
                    replier.reply("날씨 자동 전송이 " + room.replace("~~", "") + " 방에서 기능 해제되었어요.");
                } else {
                    replier.reply("날씨 자동전송 등록이 되어있지 않아요!")
                }
            } else {
                if (isGroupChat) {
                    weatherDict[room] = msg.replace("ㄱ 자동전송 날씨 ", "").replace("ㄱ 자동 전송 날씨", "");
                    replier.reply(room.replace("~~", "") + " 방의 날씨 지역이 " + msg.replace("ㄱ 자동전송 날씨 ", "").replace("ㄱ 자동 전송 날씨", "") + "로 설정되었습니다!");
                    replier.reply("매일 아침 7시마다 이 방에서 날씨를 전달받을 수 있어요. 취소하고 싶다면 \"ㄱ 자동전송 날씨 취소\"라고 입력해주세요.");
                } else {
                    replier.reply("개인톡에서는 잘 작동하지 않는 기능이에요.\n단체 톡방에서 자동 전송을 등록해 보세요!");
                }
            }


        } else if (msg === "ㄱ 자동전송 급식" || msg === "ㄱ 자동 전송 급식") {
            if (isGroupChat) {
                mealDict[room] = "use";
                replier.reply(room.replace("~~", "") + " 방에 급식 자동전송 기능이 설정되었습니다!");
                replier.reply("매일 아침 7시마다 이 방에서 급식을 전달받을 수 있어요. 취소하고 싶다면 \"ㄱ 자동전송 급식 취소\"라고 입력해주세요.");
            } else {
                replier.reply("개인톡에서는 잘 작동하지 않는 기능이에요.\n단체 톡방에서 자동 전송을 등록해 보세요!");
            }
        } else if (msg === "ㄱ 자동전송 급식 취소" || msg === "ㄱ 자동 전송 급식 취소") {
            if (mealDict[room] !== undefined) {
                delete mealDict[room];
                replier.reply(room.replace("~~", "") + " 방의 급식 자동전송 기능이 취소되었어요!");
            } else {
                replier.reply("급식 자동전송 등록이 되어있지 않아요!");
            }
        } else if (msg.indexOf("ㄱ 자동전송 시간표") > -1 || msg.indexOf("ㄱ 자동 전송 시간표") > -1) {
            replier.reply("아직 안만듦");
        }

        FileStream.write("/storage/emulated/0/msgbot/weatherROOM.txt", JSON.stringify(weatherDict));
        FileStream.write("/storage/emulated/0/msgbot/mealROOM.txt", JSON.stringify(mealDict));
        FileStream.write("/storage/emulated/0/msgbot/timetableROOM.txt", JSON.stringify(timetableDict));

        useAntiBot(sender);
    }



    // 학사일정 (왜 지금 나옴??????????)

    if (msg.indexOf("ㄱ 학사일정") > -1) {
        if (msg === "ㄱ 학사일정") {

            let today = new Date();

            let year = today.getFullYear();
            let month = ('0' + (today.getMonth() + 1)).slice(-2);
            let day = ('0' + today.getDate()).slice(-2);

            replier.reply(M.SchoolSchedule(year + month + day));

        } else {
            replier.reply(M.SchoolSchedule(msg.replace("ㄱ 학사일정 ", "").replace(/-/g, "")));
        }
        useAntiBot(sender);
    }



    // 사용횟수

    if (msg === "ㄱ 사용횟수" || msg === "ㄱ 사용 횟수" || msg === "ㄱ 사용내역" || msg === "ㄱ 사용 내역") {
        let useAntiBotDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/useantibot.txt"));
        if (useAntiBotDict[sender] === undefined) {
            replier.reply(sender + "님은 아직 각성제봇을 한 번도 사용하지 않았어요!");
        } else {
            replier.reply(sender + "님은 각성제봇을 " + useAntiBotDict[sender] + "번 사용하셨어요!");
            let ans = "현재 각성제봇을 사용한 사람들의 사용 횟수입니다!" + Lw + "\n\n";
            for (var key in useAntiBotDict) {
                ans += key + " : " + useAntiBotDict[key] + "회\n";
            }
            replier.reply(ans);
        }
        useAntiBot(sender);
    }



    // 대충 번역

    if (msg.indexOf("ㄱ 번역") > -1) {
        if (msg === "ㄱ 번역") {
            replier.reply("ㄱ 번역 [도착 언어 (영어 또는 한국어)] [번역할 내용] 이라고 입력하여 번역 기능을 사용해 보세요!");
        } else if (msg.split(" ")[2] === "영어") {
            try {
                replier.reply(Api.papagoTranslate("ko", "en", msg.replace("ㄱ 번역 영어 ", "")));
            } catch (e) {
                replier.reply("정확하게 입력해주세요.");
            }
        } else if (msg.split(" ")[2] === "한국어") {
            try {
                replier.reply(Api.papagoTranslate("en", "ko", msg.replace("ㄱ 번역 한국어 ", "")));
            } catch (e) {
                replier.reply("정확하게 입력해주세요.");
            }
        } else {
            replier.reply("명령어가 정확하게 입력되지 않았습니다.\nㄱ 번역 [도착 언어 (영어 또는 한국어)] [번역할 내용] 이라고 입력하여 번역 기능을 사용해 보세요!");
        }
        useAntiBot(sender);
    }



    // 조 짜기

    if (msg.indexOf("ㄱ 조") > -1) {
        if (msg === "ㄱ 조") {
            replier.reply("ㄱ 조 [사람 수] [조 수] 라고 하여 랜덤으로 조를 짤 수 있어요!");
        } else if (!isNaN(msg.split(" ")[2]) && !isNaN(msg.split(" ")[3])) {
            if (parseInt(msg.split(" ")[2]) > 300 || parseInt(msg.split(" ")[2]) < parseInt(msg.split(" ")[3]) || parseInt(msg.split(" ")[2]) < 1 || parseInt(msg.split(" ")[3]) < 1) {
                replier.reply("사람 수가 300을 넘어가거나 유효하지 않은 숫자에요.")
            } else {
                let peopleNum = parseInt(msg.split(" ")[2]);
                let teamNum = parseInt(msg.split(" ")[3]);
                let nameoji = peopleNum % teamNum;
                let mox = parseInt(peopleNum / teamNum);

                let peopleList = [];

                let ans = "조 편성 결과입니다!\n\n";

                for (let p = 1; p <= peopleNum; p++) {
                    peopleList.push(p.toString());
                    shuffle(peopleList);
                }

                for (let i = 0; i < teamNum - nameoji; i++) {
                    ans += (i + 1).toString() + "조 : " + peopleList.splice(0, mox).join() + " (" + mox.toString() + "명)\n";
                }

                for (let j = 0; j < nameoji; j++) {
                    ans += (teamNum - nameoji + j + 1).toString() + "조 : " + peopleList.splice(0, mox + 1).join() + " (" + (mox + 1).toString() + "명)\n";
                }

                replier.reply(ans);
            }
        }
        useAntiBot(sender);
    }

    if (msg === "ㄱ 이스터에그" || msg === "ㄱ 이스터 에그") {
        replier.reply("그딴건 없단다.");
        useAntiBot(sender);
    }
}

// 섞기

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// 사용한 횟수!

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