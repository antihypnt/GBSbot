// 현재 작동 안함

importClass(org.jsoup.Jsoup);

const scriptName = "autosend";
const Lw = "\u200b".repeat(500);
const M = Bridge.getScopeOf("modules");

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

    sender = sender.replace("~~", "");

    if (msg === "자동전송 확인") {
        replier.reply("정상적으로 작동하고 있어요!");
    }

    if (msg === "자동전송 시작" && sender === "곽승재") {

        Api.replyRoom("관리실", "자동 알림이 시작되었어요!");

        let testInterval = setInterval(function () {

            let today = new Date();
            let hour = today.getHours();
            let minute = today.getMinutes();
            let second = today.getSeconds();

            if (hour === 20 && minute === 24 && second === 0) {

                let weatherDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/weatherROOM.txt"));
                let mealDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/mealROOM.txt"));
                let timetableDict = JSON.parse(FileStream.read("/storage/emulated/0/msgbot/timetableROOM.txt"));

                let userList = Object.keys(weatherDict).concat(Object.keys(mealDict));
                userList = userList.concat(Object.keys(timetableDict));

                userList = userList.filter((element, index) => {
                    return userList.indexOf(element) === index;
                });

                for (let i of userList) {
                    let ans = "아침 7시가 되었습니다!" + Lw + "\n\n";

                    if (i in Object.keys(weatherDict)) {
                        ans += "🌤 오늘의 날씨 : \n" + M.weather(weatherDict[i]) + "\n\n";
                    }

                    if (mealDict[i] === "use") {
                        try {
                            let meal = M.showMeal("ㅇㄴㄱㅅ"); // 아침, 점심, 저녁 정보가 담겨있는 배열
                            ans += "🍚 오늘의 급식 : \n"

                            if (Array.isArray(meal)) {
                                ans += "조식 | " + meal[0] + "\n" +
                                    "점심 | " + meal[1] + "\n" +
                                    "저녁 | " + meal[2] + "\n\n";
                                return;
                            }
                        } catch (e) {
                            replier.reply("급식 정보가 없어요.\n\n");
                        }
                    }

                    if (i in Object.keys(timetableDict)) {
                        ans += "📆 오늘의 시간표 : \n";
                    }

                    Api.replyRoom(i, ans);
                }
            }
        }, 1000);
    }
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