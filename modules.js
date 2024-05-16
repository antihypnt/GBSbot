importClass(org.jsoup.Jsoup);
const scriptName = "modules";

let td = ["ㄱ 오늘급식", "오늘급식", "ㄱ 오늘 급식", "오늘 급식", "ㄱ ㅇㄴㄱㅅ", "ㅇㄴㄱㅅ", "ㄱ ㅇㄴ ㄱㅅ", "ㅇㄴ ㄱㅅ"];
let tm = ["ㄱ 내일급식", "내일급식", "ㄱ 내일 급식", "내일 급식", "ㄱ ㄴㅇㄱㅅ", "ㄴㅇㄱㅅ", "ㄱ ㄴㅇ ㄱㅅ", "ㄴㅇ ㄱㅅ"];
let td_bf = ["ㄱ 오늘아침", "오늘아침", "ㄱ 오늘 아침", "오늘 아침", "ㄱ ㅇㄴㅇㅊ", "ㅇㄴㅇㅊ", "ㄱ ㅇㄴ ㅇㅊ", "ㅇㄴ ㅇㅊ"];
let td_lc = ["ㄱ 오늘점심", "오늘점심", "ㄱ 오늘 점심", "오늘 점심", "ㄱ ㅇㄴㅈㅅ", "ㅇㄴㅈㅅ", "ㄱ ㅇㄴ ㅈㅅ", "ㅇㄴ ㅈㅅ"];
let td_dn = ["ㄱ 오늘저녁", "오늘저녁", "ㄱ 오늘 저녁", "오늘 저녁", "ㄱ ㅇㄴㅈㄴ", "ㅇㄴㅈㄴ", "ㄱ ㅇㄴ ㅈㄴ", "ㅇㄴ ㅈㄴ"];
let tm_bf = ["ㄱ 내일아침", "내일아침", "ㄱ 내일 아침", "내일 아침", "ㄱ ㄴㅇㅇㅊ", "ㄴㅇㅇㅊ", "ㄱ ㄴㅇ ㅇㅊ", "ㄴㅇ ㅇㅊ"];
let tm_lc = ["ㄱ 내일점심", "내일점심", "ㄱ 내일 점심", "내일 점심", "ㄱ ㄴㅇㅈㅅ", "ㄴㅇㅈㅅ", "ㄱ ㄴㅇ ㅈㅅ", "ㄴㅇ ㅈㅅ"];
let tm_dn = ["ㄱ 내일저녁", "내일저녁", "ㄱ 내일 저녁", "내일 저녁", "ㄱ ㄴㅇㅈㄴ", "ㄴㅇㅈㄴ", "ㄱ ㄴㅇ ㅈㄴ", "ㄴㅇ ㅈㄴ"];

let imti = "";

function showMeal(msgMeal) {
    let now = new Date();
    let today = new Date().toISOString().substring(0, 10).replace(/-/g,'');

    let urlMeal = "https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=67c2bd83a7e14117a89cd682f1bb8673&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530851&MLSV_YMD=" + today;
    let data = Utils.getWebText(urlMeal);

    try {
        if (td.indexOf(msgMeal) > -1) {

            morning = data.split("<DDISH_NM>")[1];
            morning = morning.split("</DDISH_NM>")[0].replace("<![CDATA[", "").replace("]]>", "").split("<br/>");
            morning = morning.join("\n");

            lunch = data.split("<DDISH_NM>")[2];
            lunch = lunch.split("</DDISH_NM>")[0].replace("<![CDATA[", "").replace("]]>", "").split("<br/>");
            lunch = lunch.join("\n");

            dinner = data.split("<DDISH_NM>")[3];
            dinner = dinner.split("</DDISH_NM>")[0].replace("<![CDATA[", "").replace("]]>", "").split("<br/>");
            dinner = dinner.join("\n");

            return [morning, lunch, dinner];

        } else if (td_bf.indexOf(msgMeal) > -1) {

            morning = data.split("<DDISH_NM>")[1];
            morning = morning.split("</DDISH_NM>")[0].replace("<![CDATA[", "").replace("]]>", "").split("<br/>");
            morning = morning.join("\n");

            return "🍚 오늘의 아침은 🍚\n\n" + morning + "\n입니다!";

        } else if (td_lc.indexOf(msgMeal) > -1) {

            lunch = data.split("<DDISH_NM>")[2];
            lunch = lunch.split("</DDISH_NM>")[0].replace("<![CDATA[", "").replace("]]>", "").split("<br/>");
            lunch = lunch.join("\n");

            return "🍜 오늘의 점심은 🍜\n\n" + lunch + "\n입니다!";

        } else if (td_dn.indexOf(msgMeal) > -1) {

            dinner = data.split("<DDISH_NM>")[3];
            dinner = dinner.split("</DDISH_NM>")[0].replace("<![CDATA[", "").replace("]]>", "").split("<br/>");
            dinner = dinner.join("\n");

            return "🍗 오늘의 저녁은 🍗\n\n" + dinner + "\n입니다!";

        }
    } catch (e) {
        return "급식 정보가 없어요!";
    }
}

function metro(station) {
    try {
        function id(subwayId) {
            if (subwayId === "1001") {
                return "1호선";
            } else if (subwayId === "1002") {
                return "2호선";
            } else if (subwayId === "1003") {
                return "3호선";
            } else if (subwayId === "1004") {
                return "4호선";
            } else if (subwayId === "1005") {
                return "5호선";
            } else if (subwayId === "1006") {
                return "6호선";
            } else if (subwayId === "1007") {
                return "7호선";
            } else if (subwayId === "1008") {
                return "8호선";
            } else if (subwayId === "1009") {
                return "9호선";
            } else if (subwayId === "1061") {
                return "중앙선";
            } else if (subwayId === "1063") {
                return "경의중앙선";
            } else if (subwayId === "1065") {
                return "공항철도";
            } else if (subwayId === "1067") {
                return "경춘선";
            } else if (subwayId === "1075") {
                return "수인분당선";
            } else if (subwayId === "1077") {
                return "신분당선";
            } else if (subwayId === "1092") {
                return "우이신설선";
            } else if (subwayId === "1093") {
                return "서해선";
            } else if (subwayId === "1081") {
                return "경강선";
            }
        }

        function arrivalCode(code) {
            if (code === "0") {
                return "에 진입하고 있습니다.";
            } else if (code === "4") {
                return "(전 역)에 진입하고 있습니다.";
            } else if (code === "1") {
                return "에 도착하였습니다.";
            } else if (code === "5") {
                return "(전 역)에 도착하였습니다.";
            } else if (code === "2") {
                return "을 출발하였습니다.";
            } else if (code === "3") {
                return "(전 역)을 출발하였습니다. 🏃 빨리 달리세요!! 🏃";
            } else if (code === "99") {
                return "에서 운행중입니다.";
            }
        }

        urlMetro = "http://swopenapi.seoul.go.kr/api/subway/727568685a616e7438364d6e616565/json/realtimeStationArrival/0/100/" + station;
        let data = Utils.getWebText(urlMetro);
        data = data.split("<body>")[1];
        data = data.split("</body>")[0];
        data = JSON.parse(data);

        let realtimeArrivalList = data.realtimeArrivalList;
        let lines = [[], [], [], [], [], [], [], []];
        let lineNames = [];

        for (var i of realtimeArrivalList) {
            let a = id(i.subwayId);
            let b = i.trainLineNm;
            let c = i.arvlMsg3;
            let d = arrivalCode(i.arvlCd);

            if (!(i.subwayId in lineNames)) {
                lineNames.push(i.subwayId);
                lines[lineNames.indexOf(i.subwayId)].push(a + " " + b + " 열차는\n" + c + "역" + d);
            } else {
                lines[lineNames.indexOf(i.subwayId)].push(a + " " + b + " 열차는\n" + c + "역" + d);
            }
        }

        return lines;

    } catch (err) {
        return "정확한 정보를 입력하세요.\n운행 정보가 없거나 명령어가 잘못되었습니다.";
    }
}

function melonChart() {

    let melonURL = "https://www.melon.com/chart/index.htm";
    let ans = Jsoup.connect(melonURL).get()
        .select("span");

    ans = ans.toString();

    let ret = "🎧 현재 멜론 TOP100 차트입니다! 🎧\n\n";

    for (var i = 1; i <= 10; i++) {
        if (i === 1) { imti = "🥇 "; }
        else if (i === 2) { imti = "🥈 "; }
        else if (i === 3) { imti = "🥉 "; }
        else { imti = "🎵 "; }

        ret += imti + i.toString() + "등 : " + ans.split("재생\">")[i].split("</a>")[0] + " - " + ans.split("페이지 이동\">")[i].split("</a>")[0] + "\n";
    }

    ret += "\n* 10위까지의 정보만 주어집니다.";

    return ret;
}

function weather(searchWeather) {
    try {
        let weather = Jsoup.connect("https://www.google.com/search?q=" + searchWeather + "+날씨&oq=" + searchWeather + "+날씨&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGD3SAQgxMzc0ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&safe=active&ssui=on").get().text().toString();
        let whereWeather = weather.split("검색 결과: ")[1].split(" ")[0] + " " + weather.split("검색 결과: ")[1].split(" ")[1];
        whereWeather = whereWeather.replace("∙", "");
        whereWeather = whereWeather.replace(" ∙", "");
        whereWeather = whereWeather.replace(" 정확한", "");
        let ondoWeather = weather.split("검색결과 ")[2].split(" ")[0].slice(0, -2);
        let rainWeather = weather.split("강수확률: ")[1].split(" ")[0];
        let seupdoWeather = weather.split("습도: ")[1].split(" ")[0];
        let pungsokWeather = weather.split("풍속: ")[1].split("m/s")[0];

        return "현재 " + whereWeather + "의 날씨입니다!\n\n* 기온 : " + ondoWeather + "°C\n* 강수확률 : " + rainWeather + "\n* 습도 : " + seupdoWeather + "\n* 풍속 : " + pungsokWeather + "m/s\n\n입니다!";
    } catch(e) {
        return "지역을 정확히 입력하세요!";
    }
}

function SchoolSchedule(SchoolScheduleDay) {
    let SSOpenAPI = Utils.getWebText("https://open.neis.go.kr/hub/SchoolSchedule?KEY=8b697bb1d29c4b619c27998861e2bea7&Type=JSON&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530851&AA_YMD=" + SchoolScheduleDay);
    if (SSOpenAPI.indexOf("해당하는 데이터가 없습니다") > -1) {
        return "해당 일의 학사일정이 없어요.";
    } else {
        SSOpenAPI = JSON.parse(SSOpenAPI.split("<body>")[1].split("</body>")[0]);

        let ONE_GRADE_EVENT_YN = SSOpenAPI.SchoolSchedule[1].row[0].ONE_GRADE_EVENT_YN;
        let TW_GRADE_EVENT_YN = SSOpenAPI.SchoolSchedule[1].row[0].TW_GRADE_EVENT_YN;
        let THREE_GRADE_EVENT_YN = SSOpenAPI.SchoolSchedule[1].row[0].THREE_GRADE_EVENT_YN;

        let ans = "🏫 " + SchoolScheduleDay + " 학사일정입니다! 📆\n\n";

        if (ONE_GRADE_EVENT_YN === "Y") {
            ans += "1️⃣ 1학년 : " + SSOpenAPI.SchoolSchedule[1].row[0].EVENT_NM;
        } else {
            ans += "1️⃣ 1학년 : 학사일정이 없습니다.";
        }

        ans += "\n";

        if (TW_GRADE_EVENT_YN === "Y") {
            ans += "2️⃣ 2학년 : " + SSOpenAPI.SchoolSchedule[1].row[0].EVENT_NM;
        } else {
            ans += "2️⃣ 2학년 : 학사일정이 없습니다.";
        }

        ans += "\n";

        if (THREE_GRADE_EVENT_YN === "Y") {
            ans += "3️⃣ 3학년 : " + SSOpenAPI.SchoolSchedule[1].row[0].EVENT_NM;
        } else {
            ans += "3️⃣ 3학년 : 학사일정이 없습니다.";
        }

        return ans;
    }
}