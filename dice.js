// 주사위 기능 도배가 심한 관계로 스크립트 분리

const scriptName = "point";

let rusMode = 0;
let tajaFightMode = 0;
let bombMode = 0;
let senderScore = 0;
let receiverScore = 0;
let randomNum = 0;

let fightSender = "";
let fightReceiver = "";
let randomWord = "";

let bombPeopleList = [];
let rusPeopleList = [];
let rusRoomList = [];
let aList = [];
let bList = [];
let cList = [];

let antiList = ["각", "성", "제"];

let petList = ["૮ ･ﻌ･ა", "૮₍ •̀ᴥ•́ ₎ა", "₍ᐢ.ˬ.ᐢ₎", "ฅ^•ﻌ•^ฅ", "ʕ •ᴥ• ʔ", "( •ɞ• )", "˳⚆ɞ⚆˳", "(＼(＼\n(  ･.･ )\n O_(\")(\")"];
let petNameList = ["강아지", "눈썹 강아지", "토끼", "고양이", "곰", "오리", "병아리", "앉아있는 토끼"];
let foodNameList = ["딸기", "포도", "수박", "아보카도"];

let strangeWordList1 = ["가​니다리무바사", "각성제봇​최고", "덳​깃", "자낳​괴", "코카​콜라맛있다", "우랄랄라우​랄라", "뿌링뿌링뿌​리링", "치​피치피차파차파", "패이크가많​운문징", "쁅​껈", "꿻뛣​쓁", "뿡삥빠뿔​라", "두비두비다​바다바", "유링​게슝", "경기북과학고등​학교", "뭉​순임당", "부서지도록나를​꼭안아", "amuge​ona", "으아이건치기매우매우​매우겁나대박최고어려운문장이다", "어떤실수로이토록우리는​함께일까", "라이즈원빈은잘생​겼다", "에스파​카리나최고", "원영이는​신이에요", "빰빰빠바​빰빠바빰빰", "결국그럼에도어째서우​리는함께일까", "영어도섞고english도섞고​~둘ㄷr섞고", "ㅇ", "나는바보​다!!", "부서지도록나를꼭​안아", "동해물과백두산이마르고닳도​록", "응애​응애", "봄바​람", "각성제봇그만하고​자세요!!", "꿀라​라꿀라", "판도를뒤집어​완전히", "힘껏내팽개​친roses", "by the m​orning feel like magic", "perfe​ct energy", "!@#$%​^&*()", "_​+{}", "괜한자존​심때문에", "끝내자고말​을해버린거야", "뛠흺​욗", "너는마치flas​hlight", "자꾸만시선을​뺏겨", "많은사​람속에서", "순간너만​보였어", "처음느낀이​상한떨림", "꿍낄라데​스꿍", "귓가에 ​울린, \"Love is so sweet\"", "니가자꾸궁​금해왠지", "AaBbCcD​dEe", "씨@봉​방거", "_​_>.<__", "안아줘​요", "아잇푸​르르", "갖고​싶어손쉽게", "낭만적​인 fairy-tale", "푸릇 쌉​싸름해", "허나좀더길게​팔을뻗어도", "닿지않아​뒤꿈치를들어도", "도무지가손​에쥘수없는", "계절이 지나가는 하늘에​는 가을로 가득 차 있습니다.", "나는 아무​ 걱정도 없이 가을속의 별들을 다 헤일 듯합니다.", "가슴속에 하나 둘 새겨지는​ 별을", "이제 다 못 헤는 ​것은", "쉬이 아​침이 오는 까닭이요", "내일 밤이 남은 까​닭이요", "아직 나의 청춘​이 다하지 않은 까닭입니다.", "가슴 속에 하나 둘​ 새겨지는 별을 이제 다 못 헤는 것은", "쉬이 아침이 ​오는 까닭이요", "내일 밤이 ​남은 까닭이요", "아직 나의 청춘이 ​다하지 않은 까닭입니다.", "별 하나에 추억과​, 별 하나에 사랑과, 별 하나에 쓸쓸함과, 별 하나에 동경과, 별 하나에 어머니, 어머니", "어머님, ​나는 별 하나에 아름다운 말 한 마디씩 불러봅니다.", "소학교 때 책​상을 같이했던 아이들의 이름과", "패, 경, 옥 ​이런 이국소녀의 이름과", "벌써 애기 어머니 된 계집애들​의 이름과", "가난한​ 이웃사람들의 이름과", "비둘기,​ 강아지, 토끼, 노새, 노루, 프랑시스 잠, 라이너 마리아 릴케 이런 시인의 이름을 불러봅니다.", "이네들​은 너무나 멀리 있습니다", "별이​ 아스라이 멀듯이", "어머님, 그리고 당​신은 멀리 북간도에 계십니다."];
let strangeWordList2 = ["가니다리무바사", "각성제봇최고", "덳깃", "자낳괴", "코카콜라맛있다", "우랄랄라우랄라", "뿌링뿌링뿌리링", "치피치피차파차파", "패이크가많운문징", "쁅껈", "꿻뛣쓁", "뿡삥빠뿔라", "두비두비다바다바", "유링게슝", "경기북과학고등학교", "뭉순임당", "부서지도록나를꼭안아", "amugeona", "으아이건치기매우매우매우겁나대박최고어려운문장이다", "어떤실수로이토록우리는함께일까", "라이즈원빈은잘생겼다", "에스파카리나최고", "원영이는신이에요", "빰빰빠바빰빠바빰빰", "결국그럼에도어째서우리는함께일까", "영어도섞고english도섞고~둘ㄷr섞고", "ㅇ", "나는바보다!!", "부서지도록나를꼭안아", "동해물과백두산이마르고닳도록", "응애응애", "봄바람", "각성제봇그만하고자세요!!", "꿀라라꿀라", "판도를뒤집어완전히", "힘껏내팽개친roses", "by the morning feel like magic", "perfect energy", "!@#$%^&*()", "_+{}", "괜한자존심때문에", "끝내자고말을해버린거야", "뛠흺욗", "너는마치flashlight", "자꾸만시선을뺏겨", "많은사람속에서", "순간너만보였어", "처음느낀이상한떨림", "꿍낄라데스꿍", "귓가에 울린, \"Love is so sweet\"", "니가자꾸궁금해왠지", "AaBbCcDdEe", "씨@봉방거", "__>.<__", "안아줘요", "아잇푸르르", "갖고싶어손쉽게", "낭만적인 fairy-tale", "푸릇 쌉싸름해", "허나좀더길게팔을뻗어도", "닿지않아뒤꿈치를들어도", "도무지가손에쥘수없는", "계절이 지나가는 하늘에는 가을로 가득 차 있습니다.", "나는 아무 걱정도 없이 가을속의 별들을 다 헤일 듯합니다.", "가슴속에 하나 둘 새겨지는 별을", "이제 다 못 헤는 것은", "쉬이 아침이 오는 까닭이요", "내일 밤이 남은 까닭이요", "아직 나의 청춘이 다하지 않은 까닭입니다.", "가슴 속에 하나 둘 새겨지는 별을 이제 다 못 헤는 것은", "쉬이 아침이 오는 까닭이요", "내일 밤이 남은 까닭이요", "아직 나의 청춘이 다하지 않은 까닭입니다.", "별 하나에 추억과, 별 하나에 사랑과, 별 하나에 쓸쓸함과, 별 하나에 동경과, 별 하나에 어머니, 어머니", "어머님, 나는 별 하나에 아름다운 말 한 마디씩 불러봅니다.", "소학교 때 책상을 같이했던 아이들의 이름과", "패, 경, 옥 이런 이국소녀의 이름과", "벌써 애기 어머니 된 계집애들의 이름과", "가난한 이웃사람들의 이름과", "비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠, 라이너 마리아 릴케 이런 시인의 이름을 불러봅니다.", "이네들은 너무나 멀리 있습니다", "별이 아스라이 멀듯이", "어머님, 그리고 당신은 멀리 북간도에 계십니다."];

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

    if (msg.indexOf("ㄱ 주사위") > -1 || msg.indexOf("ㄱ 포인트") > -1 || msg.indexOf("ㄱ 러시안룰렛") > -1 || msg.indexOf("ㄱ 펫") > -1 || msg.indexOf("ㄱ 먹이") > -1 || antiList.indexOf(msg) > -1 || msg === "동의" || strangeWordList2.indexOf(msg) > -1 || msg.indexOf("ㄱ 타자연습") > -1 || msg === "타자연습 그만해" || msg === "ㄱ 폭탄돌리기" || msg === "ㄱ 폭탄 돌리기" || (msg === "참여" && bombMode === 1) || msg.indexOf("포인트 신청") > -1) {


        if (msg === "포인트 신청" && !sender.includes("~~")) {
            replier.reply("포인트 신청이 등록되었으며, 최대 12시간까지 걸릴 수 있어요. 최대한 빠르게 해결해 드릴게요.");
            Api.replyRoom("곽승재~~", sender + "님이 포인트 등록을 신청하였어요.");
        } else if (!sender.includes("~~")) {
            replier.reply(sender.replace("~~", "") + "님은 각성제봇 포인트, 펫 등의 기능 사용 등록이 되지 않은 사용자에요. 각성제봇은 포인트 사용 보안을 위해 수동 등록을 사용하고 있어요.");
            replier.reply("지금 각성제봇 개인톡으로 \"포인트 신청\" 이라고 보내시면 개발자가 직접 확인하고 등록해 드립니다!");
        } else {

            sender = sender.replace("~~", "");

            let pointDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/point.txt"));
            let petDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/pet.txt"));




            // 주사위

            if (msg.indexOf("ㄱ 주사위") > -1) {
                let pointDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/point.txt"));
                if (msg === "ㄱ 주사위") {
                    if (pointDict[sender] === undefined) {
                        replier.reply("ㄱ 주사위 (걸 포인트)와 같이 포인트를 얻어보세요!! 현재 포인트는 100점입니다.");
                        pointDict[sender] = 100;
                    } else {
                        replier.reply(sender + "님의 포인트는 " + pointDict[sender] + "점 입니다.");
                        replier.reply("점수가 0점 미만이라면 ㄱ 주사위 충전이라고 입력해보세요!!");
                    }
                } else if (!isNaN(msg.replace("ㄱ 주사위 ", ""))) {
                    let popo = Number(msg.replace("ㄱ 주사위 ", ""));
                    if (popo < 10 || popo > 10000) {
                        replier.reply("숫자는 10 이상 10000 이하여야 합니다!");
                    } else {
                        if (pointDict[sender] === undefined) {
                            replier.reply("ㄱ 주사위라고 입력해서 먼저 등록을 해주세요!!");
                        } else {
                            replier.reply("🎲 주사위를 굴리고 있어요... 🎲");
                            dice = Math.floor(Math.random() * 6) + 1;
                            if (dice === 1) {
                                pointDict[sender] -= Math.floor(popo * 5);
                                replier.reply("1이 나왔습니다!\n" + sender + "님, 건 포인트의 5배인 " + Math.floor(popo * 5).toString() + "점을 잃어 " + pointDict[sender] + "점이 되었어요...");
                            } else if (dice === 2) {
                                pointDict[sender] -= Math.floor(popo * 3);
                                replier.reply("2가 나왔습니다!\n" + sender + "님, 건 포인트의 3배인 " + Math.floor(popo * 3).toString() + "점을 잃어 " + pointDict[sender] + "점이 되었어요...");
                            } else if (dice === 3) {
                                pointDict[sender] -= Math.floor(popo);
                                replier.reply("3이 나왔습니다!\n" + sender + "님, 건 포인트의 1배인 " + Math.floor(popo).toString() + "점을 잃어 " + pointDict[sender] + "점이 되었어요...");
                            } else if (dice === 4) {
                                pointDict[sender] += Math.floor(popo);
                                replier.reply("4가 나왔습니다!\n" + sender + "님, 건 포인트의 1배인 " + Math.floor(popo).toString() + "점을 얻어 " + pointDict[sender] + "점이 되었어요!!");
                            } else if (dice === 5) {
                                pointDict[sender] += Math.floor(popo * 3);
                                replier.reply("5가 나왔습니다!\n" + sender + "님, 건 포인트의 3배인 " + Math.floor(popo * 3).toString() + "점을 얻어 " + pointDict[sender] + "점이 되었어요!");
                            } else if (dice === 6) {
                                pointDict[sender] += Math.floor(popo * 5);
                                replier.reply("6이 나왔습니다!\n" + sender + "님, 건 포인트의 5배인 " + Math.floor(popo * 5).toString() + "점을 얻어 " + pointDict[sender] + "점이 되었어요!!");
                            }
                        }
                    }
                } else if (pointDict[msg.replace("ㄱ 주사위 ", "")] !== undefined) {
                    replier.reply(msg.replace("ㄱ 주사위 ", "") + "님의 포인트는 " + pointDict[msg.replace("ㄱ 주사위 ", "")] + "점 입니다.");
                }

                if (msg === "ㄱ 주사위 충전") {
                    if (pointDict[sender] < 0 || isNaN(pointDict[sender])) {
                        pointDict[sender] = 1000;
                        replier.reply(sender + "님, 1000점이 되었습니다.");
                    } else {
                        replier.reply("0점 미만이거나 너무 클 때만 충전이 가능합니다!");
                    }
                }

                if (msg.indexOf("ㄱ 주사위 set ") > -1 && sender === "곽승재") {
                    setdi = msg.replace("ㄱ 주사위 set ", "");
                    li = setdi.split(" ");
                    try {
                        pointDict[li[0]] = Number(li[1]);
                        replier.reply("설정되었습니다.");
                    } catch (err) {
                        replier.reply(".");
                    }
                }

                FileStream.write("/storage/emulated/0/msgbot/point.txt", JSON.stringify(pointDict));

            } else if (msg.indexOf("ㄱ 포인트") > -1) {

                let pointDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/point.txt"));

                if (msg === "ㄱ 포인트") {

                    let pointDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/point.txt"));
                    replier.reply(sender + "님의 포인트는 " + pointDict[sender] + "점 입니다.");
                    replier.reply("점수가 -10000점 이하라면 ㄱ 주사위 충전이라고 입력해보세요!!");

                } else if (pointDict[msg.replace("ㄱ 포인트 ", "")] !== undefined) {

                    replier.reply(msg.replace("ㄱ 포인트", "") + "님의 포인트는 " + pointDict[msg.replace("ㄱ 포인트 ", "")] + "점 입니다.");

                } else if (msg === "ㄱ 포인트 선물") {

                    replier.reply("ㄱ 포인트 선물 [사람 이름] [줄 포인트]와 같이 입력하면 다른 사람에게 포인트를 줄 수 있어요! ");

                } else if (msg.indexOf("ㄱ 포인트 선물 ") > -1) {

                    if (msg.replace("ㄱ 포인트 선물 ", "").indexOf(" ") > -1){
                        if (msg.replace("ㄱ 포인트 선물 ", "").split(" ")[0] === sender) {
                            replier.reply("자기 자신에게 포인트를 선물할 수 없어요!")
                        } else {
                            if (pointDict[msg.replace("ㄱ 포인트 선물 ", "").split(" ")[0]] === undefined) {
                                replier.reply("등록이 되지 않은 사용자에요!");
                            } else if (parseInt(msg.replace("ㄱ 포인트 선물 ", "").split(" ")[1]) >= pointDict[sender] || parseInt(pointDict[sender]) < 0 || parseInt(msg.replace("ㄱ 포인트 선물 ", "").split(" ")[1]) < 0 || isNaN(parseInt(msg.replace("ㄱ 포인트 선물 ", "").split(" ")[1]))) {
                                replier.reply("포인트가 부족하거나 유효하지 않아요! 지금 " + sender + "님의 포인트는 " + pointDict[sender].toString() + "점이에요.");
                            } else {
                                pointDict[sender] -= parseInt(msg.replace("ㄱ 포인트 선물 ", "").split(" ")[1]);
                                pointDict[msg.replace("ㄱ 포인트 선물 ", "").split(" ")[0]] += parseInt(msg.replace("ㄱ 포인트 선물 ", "").split(" ")[1]);
                                replier.reply("포인트 선물이 성공적으로 완료되었어요!");
                                replier.reply(sender + " : " + pointDict[sender].toString() + "점,\n" + msg.replace("ㄱ 포인트 선물 ", "").split(" ")[0] + " : " + pointDict[msg.replace("ㄱ 포인트 선물 ", "").split(" ")[0]].toString() + "점");
                            }
                        }
                    }
                }
                FileStream.write("/storage/emulated/0/msgbot/point.txt", JSON.stringify(pointDict));
            }



            // 러시안룰렛

            if ((msg === "ㄱ 러시안룰렛" || msg === "ㄱ 러시안 룰렛") && rusMode === 0) {

                rusMode = 1;

                let pointDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/point.txt"));

                rusPeopleList = [];
                rusRoomList = []
                aList = [];
                bList = [];
                cList = [];

                replier.reply("🔫 지금부터 러시안룰렛을 시작합니다! 🔫\n\n" +
                    "각, 성, 제 세 개의 선택지가 있습니다. 이 중 하나를 고르세요.\n" +
                    "하나를 잘 골랐다면 포인트가 10배가 되지만, 잘못 고르면 1 ~ (가진 포인트 * 1.25) 중 랜덤한 포인트를 잃습니다...!");
                replier.reply("20초를 드립니다! 잘 골라보세요.");

                rusRoomList.push(room);

                let bullet = Math.floor(Math.random() * 3);

                setTimeout(() => {
                    replier.reply("결과가 나왔습니다!! 행운의 문자는 " + antiList[bullet] + "입니다.");

                    let pointDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/point.txt"));

                    let ans = "✨ 포인트 변동을 알려드립니다! ✨\n\n";

                    for (var i of aList) {
                        if (bullet === 0) {
                            ans += i + " : " + pointDict[i] + " -> " + pointDict[i] * 10 + "\n";
                            pointDict[i] = pointDict[i] * 10;
                        } else {
                            let sad = Math.floor(Math.random() * Math.abs(pointDict[i]) * 1.25) + 1;
                            ans += i + " : " + pointDict[i] + " -> " + (pointDict[i] - sad) + "\n";
                            pointDict[i] = pointDict[i] - sad;
                        }
                    }

                    for (var j of bList) {
                        if (bullet === 1) {
                            ans += j + " : " + pointDict[j] + " -> " + pointDict[j] * 10 + "\n";
                            pointDict[j] = pointDict[j] * 10;
                        } else {
                            let sad = Math.floor(Math.random() * Math.abs(pointDict[j]) * 1.25) + 1;
                            ans += j + " : " + pointDict[j] + " -> " + (pointDict[j] - sad) + "\n";
                            pointDict[j] = pointDict[j] - sad;
                        }
                    }

                    for (var k of cList) {
                        if (bullet === 2) {
                            ans += k + " : " + pointDict[k] + " -> " + pointDict[k] * 10 + "\n";
                            pointDict[k] = pointDict[k] * 10;
                        } else {
                            let sad = Math.floor(Math.random() * Math.abs(pointDict[k]) * 1.25) + 1;
                            ans += k + " : " + pointDict[k] + " -> " + (pointDict[k] - sad) + "\n";
                            pointDict[k] = pointDict[k] - sad;
                        }
                    }

                    rusMode = 0;

                    for (var i of rusRoomList) {
                        Api.replyRoom(i, ans);
                    }

                    FileStream.write("/storage/emulated/0/msgbot/point.txt", JSON.stringify(pointDict));

                }, 20000);
            } else if ((msg === "ㄱ 러시안룰렛" || msg === "ㄱ 러시안 룰렛") && rusMode === 1) {
                replier.reply("🔫 다른 방에서 러시안 룰렛을 진행하고 있습니다. 🔫\n\n" +
                    "지금 각, 성, 제 중 하나의 글자를 고르시면 이 방에 알려드리도록 하겠습니다!\n" +
                    "하나를 잘 골랐다면 포인트가 10배가 되지만, 잘못 고르면 1 ~ (가진 포인트 * 1.25) 중 랜덤한 포인트를 잃습니다...!");
                replier.reply("20초를 드립니다! 잘 골라보세요.");

                rusRoomList.push(room);
            }

            if (antiList.indexOf(msg) > -1 && rusMode === 1 && rusPeopleList.indexOf(sender) === -1) {
                replier.reply(sender + "님이 \"" + msg + "\"에 배팅하셨어요! 건투를 빕니다...");

                rusPeopleList.push(sender);

                if (msg === "각") {
                    aList.push(sender);
                } else if (msg === "성") {
                    bList.push(sender);
                } else if (msg === "제") {
                    cList.push(sender);
                }
            }



            // 펫

            if (msg.indexOf("ㄱ 펫") > -1) {
                let petDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/pet.txt"));
                if (msg === "ㄱ 펫") {
                    if (petDict[sender] === undefined) {
                        replier.reply("등록된 펫이 없어요.");
                        replier.reply("🐈🐕 ㄱ 펫 구매라고 쳐서 펫을 구매해 보세요! 펫 구매는 30000포인트를 소비합니다. 🐈🐕");
                    } else {
                        let weight = parseInt(petDict[sender].slice(0, -1));
                        let level = parseInt(Math.sqrt(weight));
                        let where = Math.floor(Math.random() * 3);
                        if (where === 0) {
                            replier.reply(petNum(petDict[sender][petDict[sender].length - 1])[0]);
                            replier.reply(sender + "님의 펫이에요!\n무게는 " + weight.toString() + "g이고, 레벨은 " + level.toString() + "레벨이에요.");
                        } else if (where === 1) {
                            replier.reply(petNum(petDict[sender][petDict[sender].length - 1])[1]);
                            replier.reply(sender + "님의 펫은 지금 자고 있어요...\n무게는 " + weight.toString() + "g이고, 레벨은 " + level.toString() + "레벨이에요.");
                        } else if (where === 2) {
                            replier.reply(petNum(petDict[sender][petDict[sender].length - 1])[2]);
                            replier.reply(sender + "님의 펫은 기분이 좋아 보이네요!\n무게는 " + weight.toString() + "g이고, 레벨은 " + level.toString() + "레벨이에요.");
                        }
                    }
                } else if (msg === "ㄱ 펫 구매") {
                    let pointDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/point.txt"));
                    if (petDict[sender] === undefined && pointDict[sender] >= 30000) {
                        replier.reply("🐈🐕 " + sender + "님의 펫을 고르고 있어요... 🐈🐕");
                        let where = Math.floor(Math.random() * 8);
                        petDict[sender] = "0" + where.toString();
                        FileStream.write("/storage/emulated/0/msgbot/pet.txt", JSON.stringify(petDict));
                        pointDict[sender] = pointDict[sender] - 30000;
                        FileStream.write("/storage/emulated/0/msgbot/point.txt", JSON.stringify(pointDict));
                        replier.reply(sender + "님의 펫은\n\n" + petList[where] + "\n\n짜잔! " + petNameList[where] + "입니다!");
                    } else if (petDict[sender] !== undefined) {
                        replier.reply(sender + "님의 펫은 이미 있어요!");
                    } else if (pointDict[sender] < 30000 || pointDict[sender] === undefined) {
                        replier.reply("포인트가 부족하거나 포인트 등록이 안되어있어요. 펫 구매는 30000포인트를 소비해요.");
                    }


                }
            }


            // 타자연습

            if (msg.indexOf("ㄱ 타자연습") > -1 || msg.indexOf("ㄱ 타자 연습") > -1) {
                pointDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/point.txt"));
                if (pointDict[sender] === undefined) {
                    replier.reply("포인트 등록을 해주세요!");
                } else if (msg === "ㄱ 타자연습" || msg === "ㄱ 타자 연습") {
                    replier.reply("ㄱ 타자연습 [사람 이름]이라고 하여 그 사람과 타자연습 대결을 할 수 있어요!");
                    replier.reply("이긴 사람은 랜덤하게 포인트를 잃고, 진 사람은 그만큼의 포인트를 얻어요.");
                } else if (pointDict[msg.replace("ㄱ 타자연습 ", "")] === undefined && pointDict[msg.replace("ㄱ 타자 연습 ", "")] === undefined) {
                    replier.reply("상대가 포인트 등록이 안 되어 있어요!");
                } else if (tajaFightMode === 0) {

                    fightSender = sender;
                    fightReceiver = msg.replace("ㄱ 타자연습 ", "").replace("ㄱ 타자 연습 ", "");
                    senderScore = 0;
                    receiverScore = 0;
                    randomNum = 0;

                    replier.reply(sender + "님과 " + msg.replace("ㄱ 타자연습 ", "").replace("ㄱ 타자 연습 ", "") + "님의 타자대결이 시작됩니다!");
                    replier.reply("이긴 사람은 랜덤하게 포인트를 잃고, 진 사람은 그만큼의 포인트를 얻어요.");
                    replier.reply(msg.replace("ㄱ 타자연습 ", "").replace("ㄱ 타자 연습 ", "") + "님, 전투에 동의하시면 \"동의\"라고 입력하세요.");

                    tajaFightMode = 1;
                } else if (tajaFightMode !== 0) {
                    replier.reply("다른 타자연습이 진행중이에요! 조금 이후에 다시 시도해 보세요.");
                }
            } else if (msg === "타자연습 그만해" || msg === "타자 연습 그만해") {
                replier.reply("넹...");
                tajaFightMode = 0;
            }

            if (msg === "동의" && tajaFightMode === 1 && fightReceiver === sender) {

                tajaFightMode = 2;

                replier.reply("좋습니다! 타자대결을 시작합니다.");
                replier.reply("이긴 사람은 랜덤하게 포인트를 잃고, 진 사람은 그만큼의 포인트를 얻어요.");
                replier.reply("전투는 참가자가 단어를 5번 받아치고, 빠르면 점수를 얻게 됩니다.");
                replier.reply("아, 참고로 복붙은 막아뒀어요!");
                randomNum = Math.floor(Math.random() * strangeWordList1.length);
                randomWord = strangeWordList1[randomNum];
                setTimeout(() => {replier.reply("치세요!\n\n" + randomWord);}, 500);
            }

            if (msg === strangeWordList2[randomNum] && tajaFightMode === 2 && (sender === fightSender || sender === fightReceiver)) {

                tajaFightMode = 3;

                if (sender === fightSender) { senderScore += 1; }
                else { receiverScore += 1; }

                replier.reply(sender + "님 성공!");
                replier.reply("현재 스코어 " + fightSender + "님 " + senderScore.toString() + "점, \n" + fightReceiver + "님 " + receiverScore.toString() + "점입니다.");
                randomNum = Math.floor(Math.random() * strangeWordList1.length);
                randomWord = strangeWordList1[randomNum];
                setTimeout(() => {replier.reply("치세요!\n\n" + randomWord);}, 500);
            }

            if (msg === strangeWordList2[randomNum] && tajaFightMode === 3 && (sender === fightSender || sender === fightReceiver)) {

                tajaFightMode = 4;

                if (sender === fightSender) { senderScore += 1; }
                else { receiverScore += 1; }

                replier.reply(sender + "님 성공!");
                replier.reply("현재 스코어 " + fightSender + "님 " + senderScore.toString() + "점, \n" + fightReceiver + "님 " + receiverScore.toString() + "점입니다.");
                randomNum = Math.floor(Math.random() * strangeWordList1.length);
                randomWord = strangeWordList1[randomNum];
                setTimeout(() => {replier.reply("치세요!\n\n" + randomWord);}, 500);
            }

            if (msg === strangeWordList2[randomNum] && tajaFightMode === 4 && (sender === fightSender || sender === fightReceiver)) {

                tajaFightMode = 5;

                if (sender === fightSender) { senderScore += 1; }
                else { receiverScore += 1; }

                replier.reply(sender + "님 성공!");
                replier.reply("현재 스코어 " + fightSender + "님 " + senderScore.toString() + "점, \n" + fightReceiver + "님 " + receiverScore.toString() + "점입니다.");
                randomNum = Math.floor(Math.random() * strangeWordList1.length);
                randomWord = strangeWordList1[randomNum];
                setTimeout(() => {replier.reply("치세요!\n\n" + randomWord);}, 500);
            }

            if (msg === strangeWordList2[randomNum] && tajaFightMode === 5 && (sender === fightSender || sender === fightReceiver)) {

                tajaFightMode = 6;

                if (sender === fightSender) { senderScore += 1; }
                else { receiverScore += 1; }

                replier.reply(sender + "님 성공!");
                replier.reply("현재 스코어 " + fightSender + "님 " + senderScore.toString() + "점, \n" + fightReceiver + "님 " + receiverScore.toString() + "점입니다.");
                replier.reply("이제 마지막 경기입니다.");
                randomNum = Math.floor(Math.random() * strangeWordList1.length);
                randomWord = strangeWordList1[randomNum];
                setTimeout(() => {replier.reply("치세요!\n\n" + randomWord);}, 500);
            }

            if (msg === strangeWordList2[randomNum] && tajaFightMode === 6 && (sender === fightSender || sender === fightReceiver)) {

                tajaFightMode = 0;

                if (sender === fightSender) { senderScore += 1; }
                else { receiverScore += 1; }

                replier.reply(sender + "님 성공!");
                replier.reply("마지막 스코어 " + fightSender + "님 " + senderScore.toString() + "점, \n" + fightReceiver + "님 " + receiverScore.toString() + "점입니다.");
                replier.reply("아직 테스트라 포인트가 바뀌진 않아요^^7");

            }



            // 먹이

            if (msg.indexOf("ㄱ 먹이") > -1) {

                let foodDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/food.txt"));
                let pointDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/point.txt"));

                if (msg === "ㄱ 먹이") {
                    if (foodDict[sender] === undefined) {
                        replier.reply("등록된 먹이 정보가 없어요. ㄱ 먹이 구매라고 입력해서 먹이를 구매해보세요!!");
                    } else {
                        replier.reply(sender + "님의 먹이 정보입니다!\n\n🍓 딸기 (1g) : " + foodDict[sender][0] + "개\n🍇 포도 (3g) : " + foodDict[sender][1] + "개\n🍉 수박(4g) : " + foodDict[sender][2] + "개\n🥑 아보카도(5g) : " + foodDict[sender][3] + "개");
                    }
                } else if (msg.indexOf("ㄱ 먹이 구매") > -1) {
                    if (msg === "ㄱ 먹이 구매") {
                        replier.reply("\"ㄱ 먹이 구매 [먹이 종류] (먹이 개수)\"라고 입력해 먹이를 구매해 보세요!\n\n🍓 딸기 (1g) : 5000 포인트\n🍇 포도 (3g) : 10000 포인트\n🍉 수박 (4g) : 15000 포인트\n🥑 아보카도 (5g) : 20000 포인트");
                    } else {
                        if (foodDict[sender] === undefined) {
                            foodDict[sender] = "0000";
                        }
                        if (msg.replace("ㄱ 먹이 구매 ", "") === "딸기") {
                            if (pointDict[sender] >= 5000) {
                                foodDict[sender] = [(Number(foodDict[sender][0]) + 1).toString(), foodDict[sender][1], foodDict[sender][2], foodDict[sender][3]];
                                pointDict[sender] -= 5000;
                                replier.reply("딸기 1개가 구매되었어요!");
                            } else {
                                replier.reply("포인트가 부족해요.");
                            }
                        } else if (msg.replace("ㄱ 먹이 구매 ", "") === "포도") {
                            if (pointDict[sender] >= 10000) {
                                foodDict[sender] = [foodDict[sender][0], (Number(foodDict[sender][1]) + 1).toString(), foodDict[sender][2], foodDict[sender][3]];
                                pointDict[sender] -= 10000;
                                replier.reply("포도 1개가 구매되었어요!");
                            } else {
                                replier.reply("포인트가 부족해요.");
                            }
                        } else if (msg.replace("ㄱ 먹이 구매 ", "") === "수박") {
                            if (pointDict[sender] >= 15000) {
                                foodDict[sender] = [foodDict[sender][0], foodDict[sender][1], (Number(foodDict[sender][2]) + 1).toString(), foodDict[sender][3]];
                                pointDict[sender] -= 15000;
                                replier.reply("수박 1개가 구매되었어요!");
                            } else {
                                replier.reply("포인트가 부족해요.");
                            }
                        } else if (msg.replace("ㄱ 먹이 구매 ", "") === "아보카도") {
                            if (pointDict[sender] >= 20000) {
                                foodDict[sender] = [foodDict[sender][0], foodDict[sender][1], foodDict[sender][2], (Number(foodDict[sender][3]) + 1).toString()];
                                pointDict[sender] -= 20000;
                                replier.reply("아보카도 1개가 구매되었어요!");
                            } else {
                                replier.reply("포인트가 부족해요.");
                            }
                        } else if (msg.replace("ㄱ 먹이 구매 ", "").split(" ")[0] === "딸기" && !isNaN(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1]) && parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1]) > 0) {
                            if (pointDict[sender] >= 5000 * parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1])) {
                                foodDict[sender] = [(Number(foodDict[sender][0]) + parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1])).toString(), foodDict[sender][1], foodDict[sender][2], foodDict[sender][3]];
                                pointDict[sender] -= 5000 * parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1]);
                                replier.reply("딸기 " + msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1] + "개가 구매되었어요!");
                            } else {
                                replier.reply("포인트가 부족해요.");
                            }
                        } else if (msg.replace("ㄱ 먹이 구매 ", "").split(" ")[0] === "포도" && !isNaN(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1]) && parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1]) > 0) {
                            if (pointDict[sender] >= 10000 * parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1])) {
                                foodDict[sender] = [foodDict[sender][0], (Number(foodDict[sender][1]) + parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1])).toString(), foodDict[sender][2], foodDict[sender][3]];
                                pointDict[sender] -= 10000 * parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1]);
                                replier.reply("포도 " + msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1] + "개가 구매되었어요!");
                            } else {
                                replier.reply("포인트가 부족해요.");
                            }
                        } else if (msg.replace("ㄱ 먹이 구매 ", "").split(" ")[0] === "수박" && !isNaN(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1]) && parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1]) > 0) {
                            if (pointDict[sender] >= 15000 * parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1])) {
                                foodDict[sender] = [foodDict[sender][0], foodDict[sender][1], (Number(foodDict[sender][2]) + parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1])).toString(), foodDict[sender][3]];
                                pointDict[sender] -= 15000 * parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1]);
                                replier.reply("수박 " + msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1] + "개가 구매되었어요!");
                            } else {
                                replier.reply("포인트가 부족해요.");
                            }
                        } else if (msg.replace("ㄱ 먹이 구매 ", "").split(" ")[0] === "아보카도" && !isNaN(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1]) && parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1]) > 0) {
                            if (pointDict[sender] >= 20000 * parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1])) {
                                foodDict[sender] = [foodDict[sender][0], foodDict[sender][1], foodDict[sender][2], (Number(foodDict[sender][3]) + parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1])).toString()];
                                pointDict[sender] -= 20000 * parseInt(msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1]);
                                replier.reply("아보카도 " + msg.replace("ㄱ 먹이 구매 ", "").split(" ")[1] + "개가 구매되었어요!");
                            } else {
                                replier.reply("포인트가 부족해요.");
                            }
                        }
                    }
                }

                FileStream.write("/storage/emulated/0/msgbot/food.txt", JSON.stringify(foodDict));
                FileStream.write("/storage/emulated/0/msgbot/point.txt", JSON.stringify(pointDict));
            }

            if (msg.indexOf("ㄱ 먹이주기") > -1) {

                let foodDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/food.txt"));
                let petDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/pet.txt"));

                if (msg === "ㄱ 먹이주기") {
                    replier.reply("ㄱ 먹이주기 [먹이 종류] (먹이 개수)로 펫한테 먹이를 주고 레벨을 올릴 수 있어요!");
                } else {
                    if (foodDict[sender] === undefined) {
                        replier.reply("먹이 정보가 없어요! 먹이를 구매해 보세요..");
                    } else if (petDict[sender] === undefined) {
                        replier.reply("펫이 없어요! 펫을 구매해 보세요...");
                    } else {
                        if (msg.replace("ㄱ 먹이주기 ", "").indexOf(" ") > -1) {
                            if (foodNameList.indexOf(msg.replace("ㄱ 먹이주기 ", "").split(" ")[0]) > -1 && parseInt(msg.replace("ㄱ 먹이주기 ", "").split(" ")[1]) > 0) {
                                if (msg.replace("ㄱ 먹이주기 ", "").split(" ")[0] === "딸기") {
                                    if (parseInt(foodDict[sender][0]) >= parseInt(msg.replace("ㄱ 먹이주기 ", "").split(" ")[1])) {
                                        foodDict[sender][0] = (parseInt(foodDict[sender][0]) - parseInt(msg.replace("ㄱ 먹이주기 ", "").split(" ")[1])).toString();
                                        let weight = parseInt(petDict[sender].slice(0, -1)) + (parseInt(msg.replace("ㄱ 먹이주기 ", "").split(" ")[1]) * 1);
                                        let level = parseInt(Math.sqrt(weight));
                                        petDict[sender] = weight.toString() + petDict[sender][petDict[sender].length - 1];
                                        replier.reply(petList[parseInt(petDict[sender][petDict[sender].length - 1])] + " 🍓\n펫이 딸기를 먹고 " + weight.toString() + "g이 되었어요!\n레벨은 " + level.toString() + "레벨이에요. 다음 레벨까지 " + (Math.pow(level + 1, 2) - weight).toString() + "g 남았어요.");
                                    } else {
                                        replier.reply("먹이가 부족해요!");
                                    }
                                } else if (msg.replace("ㄱ 먹이주기 ", "").split(" ")[0] === "포도") {
                                    if (parseInt(foodDict[sender][1]) >= parseInt(msg.replace("ㄱ 먹이주기 ", "").split(" ")[1])) {
                                        foodDict[sender][1] = (parseInt(foodDict[sender][1]) - parseInt(msg.replace("ㄱ 먹이주기 ", "").split(" ")[1])).toString();
                                        let weight = parseInt(petDict[sender].slice(0, -1)) + (parseInt(msg.replace("ㄱ 먹이주기 ", "").split(" ")[1]) * 3);
                                        let level = parseInt(Math.sqrt(weight));
                                        petDict[sender] = weight.toString() + petDict[sender][petDict[sender].length - 1];
                                        replier.reply(petList[parseInt(petDict[sender][petDict[sender].length - 1])] + " 🍇\n펫이 포도를 먹고 " + weight.toString() + "g이 되었어요!\n레벨은 " + level.toString() + "레벨이에요. 다음 레벨까지 " + (Math.pow(level + 1, 2) - weight).toString() + "g 남았어요.");
                                    } else {
                                        replier.reply("먹이가 부족해요!");
                                    }
                                } else if (msg.replace("ㄱ 먹이주기 ", "").split(" ")[0] === "수박") {
                                    if (parseInt(foodDict[sender][2]) >= parseInt(msg.replace("ㄱ 먹이주기 ", "").split(" ")[1])) {
                                        foodDict[sender][2] = (parseInt(foodDict[sender][2]) - parseInt(msg.replace("ㄱ 먹이주기 ", "").split(" ")[1])).toString();
                                        let weight = parseInt(petDict[sender].slice(0, -1)) + (parseInt(msg.replace("ㄱ 먹이주기 ", "").split(" ")[1]) * 4);
                                        let level = parseInt(Math.sqrt(weight));
                                        petDict[sender] = weight.toString() + petDict[sender][petDict[sender].length - 1];
                                        replier.reply(petList[parseInt(petDict[sender][petDict[sender].length - 1])] + " 🍉\n펫이 수박을 먹고 " + weight.toString() + "g이 되었어요!\n레벨은 " + level.toString() + "레벨이에요. 다음 레벨까지 " + (Math.pow(level + 1, 2) - weight).toString() + "g 남았어요.");
                                    } else {
                                        replier.reply("먹이가 부족해요!");
                                    }
                                } else if (msg.replace("ㄱ 먹이주기 ", "").split(" ")[0] === "아보카도") {
                                    if (parseInt(foodDict[sender][3]) >= parseInt(msg.replace("ㄱ 먹이주기 ", "").split(" ")[1])) {
                                        foodDict[sender][3] = (parseInt(foodDict[sender][3]) - parseInt(msg.replace("ㄱ 먹이주기 ", "").split(" ")[1])).toString();
                                        let weight = parseInt(petDict[sender].slice(0, -1)) + (parseInt(msg.replace("ㄱ 먹이주기 ", "").split(" ")[1]) * 5);
                                        let level = parseInt(Math.sqrt(weight));
                                        petDict[sender] = weight.toString() + petDict[sender][petDict[sender].length - 1];
                                        replier.reply(petList[parseInt(petDict[sender][petDict[sender].length - 1])] + " 🥑\n펫이 아보카도를 먹고 " + weight.toString() + "g이 되었어요!\n레벨은 " + level.toString() + "레벨이에요. 다음 레벨까지 " + (Math.pow(level + 1, 2) - weight).toString() + "g 남았어요.");
                                    } else {
                                        replier.reply("먹이가 부족해요!");
                                    }
                                }
                            } else {
                                replier.reply("잘못된 정보를 입력했어요.");
                            }
                        } else {
                            if (foodNameList.indexOf(msg.replace("ㄱ 먹이주기 ", "")) > -1) {
                                if (msg.replace("ㄱ 먹이주기 ", "") === "딸기") {
                                    if (parseInt(foodDict[sender][0]) >= 1) {
                                        foodDict[sender][0] = (parseInt(foodDict[sender][0]) - 1).toString();
                                        let weight = parseInt(petDict[sender].slice(0, -1)) + 1;
                                        let level = parseInt(Math.sqrt(weight));
                                        petDict[sender] = weight.toString() + petDict[sender][petDict[sender].length - 1];
                                        replier.reply(petList[parseInt(petDict[sender][petDict[sender].length - 1])] + " 🍓\n펫이 딸기를 먹고 " + weight.toString() + "g이 되었어요!\n레벨은 " + level.toString() + "레벨이에요. 다음 레벨까지 " + (Math.pow(level + 1, 2) - weight).toString() + "g 남았어요.");
                                    } else {
                                        replier.reply("먹이가 부족해요!");
                                    }
                                } else if (msg.replace("ㄱ 먹이주기 ", "") === "포도") {
                                    if (parseInt(foodDict[sender][1]) >= 1) {
                                        foodDict[sender][1] = (parseInt(foodDict[sender][1]) - 1).toString();
                                        let weight = parseInt(petDict[sender].slice(0, -1)) + 3;
                                        let level = parseInt(Math.sqrt(weight));
                                        petDict[sender] = weight.toString() + petDict[sender][petDict[sender].length - 1];
                                        replier.reply(petList[parseInt(petDict[sender][petDict[sender].length - 1])] + " 🍇\n펫이 포도를 먹고 " + weight.toString() + "g이 되었어요!\n레벨은 " + level.toString() + "레벨이에요. 다음 레벨까지 " + (Math.pow(level + 1, 2) - weight).toString() + "g 남았어요.");
                                    } else {
                                        replier.reply("먹이가 부족해요!");
                                    }
                                } else if (msg.replace("ㄱ 먹이주기 ", "") === "수박") {
                                    if (parseInt(foodDict[sender][2]) >= 1) {
                                        foodDict[sender][2] = (parseInt(foodDict[sender][2]) - 1).toString();
                                        let weight = parseInt(petDict[sender].slice(0, -1)) + 4;
                                        let level = parseInt(Math.sqrt(weight));
                                        petDict[sender] = weight.toString() + petDict[sender][petDict[sender].length - 1];
                                        replier.reply(petList[parseInt(petDict[sender][petDict[sender].length - 1])] + " 🍉\n펫이 수박을 먹고 " + weight.toString() + "g이 되었어요!\n레벨은 " + level.toString() + "레벨이에요. 다음 레벨까지 " + (Math.pow(level + 1, 2) - weight).toString() + "g 남았어요.");
                                    } else {
                                        replier.reply("먹이가 부족해요!");
                                    }
                                } else if (msg.replace("ㄱ 먹이주기 ", "") === "아보카도") {
                                    if (parseInt(foodDict[sender][3]) >= 1) {
                                        foodDict[sender][3] = (parseInt(foodDict[sender][3]) - 1).toString();
                                        let weight = parseInt(petDict[sender].slice(0, -1)) + 5;
                                        let level = parseInt(Math.sqrt(weight));
                                        petDict[sender] = weight.toString() + petDict[sender][petDict[sender].length - 1];
                                        replier.reply(petList[parseInt(petDict[sender][petDict[sender].length - 1])] + " 🥑\n펫이 아보카도를 먹고 " + weight.toString() + "g이 되었어요!\n레벨은 " + level.toString() + "레벨이에요. 다음 레벨까지 " + (Math.pow(level + 1, 2) - weight).toString() + "g 남았어요.");
                                    } else {
                                        replier.reply("먹이가 부족해요!");
                                    }
                                }
                            } else {
                                replier.reply("먹이 종류를 제대로 입력하세요!");
                            }
                        }
                    }
                }

                FileStream.write("/storage/emulated/0/msgbot/food.txt", JSON.stringify(foodDict));
                FileStream.write("/storage/emulated/0/msgbot/pet.txt", JSON.stringify(petDict));
            }

            if (msg === "ㄱ 폭탄돌리기" || msg === "ㄱ 폭탄 돌리기") {
                if (isGroupChat) {
                    replier.reply("💣 폭탄돌리기를 시작합니다! 💣\n참여를 원하시면 \"참여\"라고 입력해주세요!");
                } else {
                    replier.reply("단체 채팅방에서 시작해 주세요!");
                }
            }
            useAntiBot(sender);
        }
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