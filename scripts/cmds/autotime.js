const moment = require('moment-timezone');


module.exports.config = {

  name: "autotime",

  version: "2.0.0",

  role: 0,

  author: "Karan jalvanshi",//don't change the author kung ayaw mong ma pwetan!! 

  description: "Automatically sends messages based on set times.",

  category: "AutoTime",

  countDown: 3

};


module.exports.onLoad = async ({ api }) => {

  const arrayData = {

  "12:00:00 PM": {

        message: " good afternoon everyone don't forget to eat y'all lunch break🍛"


      },

      "06:00:00 AM": {

        message: "good morning everyone!!, have a nice morning🍞☕🌅"


      },

      "07:00:00 AM": {

        message: "7 𝐁𝐚𝐣 𝐆𝐀𝐘𝐄 𝐉𝐀𝐋𝐃𝐈 𝐔𝐓𝐇 𝐉𝐀𝐎 𝐁𝐀𝐁𝐔 𝐄𝐊 𝐂𝐔𝐏 𝐌𝐄𝐑𝐄 𝐋𝐈𝐘𝐄 𝐁𝐇𝐈 𝐂𝐇𝐀𝐈 𝐁𝐀𝐍𝐀 𝐋𝐎 🍞☕🍛"


      },

      "08:00:00 AM": {

        message: "8 𝐁𝐚𝐣 𝐆𝐀𝐘𝐄 𝐇𝐀𝐈 𝐎𝐑 𝐌𝐄𝐑𝐀 𝐁𝐎𝐒𝐒 𝐀𝐁𝐇𝐈 𝐓𝐀𝐊 𝐒𝐎 𝐑𝐀𝐇𝐀 𝐇𝐀𝐈😘😘 :"


      },

      "01:00:00 PM": {

        message: "dont forget to eat y'all launchbreak"


      },

      "03:00:00 PM": {

        message: "3:00 𝐁𝐀𝐉 𝐆𝐀𝐘𝐄 𝐊𝐀𝐇𝐀 𝐇𝐀𝐈 𝐒𝐀𝐁 𝐋𝐀𝐆𝐓𝐀 𝐇𝐀𝐈 𝐀𝐀𝐀𝐉 𝐁𝐀𝐁𝐔 𝐒𝐇𝐎𝐍𝐀 𝐊𝐀𝐑 𝐑𝐀𝐇𝐄 𝐇𝐀𝐈 𝐈𝐍𝐁𝐎𝐗 𝐌𝐀𝐈𝐍 :"


      },

      "05:00:00 PM": {

        message: "5 𝐁𝐀𝐉 𝐆𝐀𝐘𝐄 𝐉𝐀𝐋𝐃𝐈 𝐉𝐀𝐋𝐃𝐈 𝐂𝐇𝐀𝐈 𝐏𝐈 𝐋𝐎 𝐓𝐄𝐀 𝐓𝐈𝐌𝐄 𝐇𝐎 𝐆𝐀𝐘𝐀  𝐇𝐀𝐈☕☕"


      },

      "06:00:00 PM": {

        message: "𝐓𝐎𝐇 𝐁𝐀𝐓𝐀𝐎 𝐊𝐀𝐈𝐒𝐀 𝐑𝐀𝐇𝐀 𝐀𝐀𝐀𝐉 𝐊𝐀 𝐃𝐈𝐍 𝐀𝐏𝐊𝐀 🤔"


      },

      "08:00:00 PM": {

        message: "08:00 𝐏𝐌 🍲🥣🧆 𝐃𝐈𝐍𝐍𝐄𝐑  𝐓𝐈𝐌𝐄 𝐇𝐎 𝐆𝐀𝐘𝐀 𝐆𝐔𝐘'𝐒 𝐉𝐀𝐋𝐃𝐈 𝐉𝐀𝐋𝐃𝐈 𝐊𝐇𝐀𝐍𝐀 𝐊𝐇𝐀 𝐋𝐎 𝐒𝐀𝐁🍲"


      },

      "10:00:00 PM": {

        message: "𝐆𝐎𝐎𝐃 𝐍𝐈𝐆𝐇𝐓   😪😪"


      },

      "11:00:00 PM": {

        message: " MY OWNER SUHEB KHAN \n\nOWNER SE CONNECT RAHE :- https://www.facebook.com/suheb.khanjii"

      }, 

      "00:05:00": {

      message: "𝚃𝚑𝚒𝚜 𝚒𝚜 𝙰𝚞𝚝𝚘 𝚜𝚎𝚗𝚍 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚎𝚟𝚎𝚛𝚢 𝟻𝚖𝚒𝚗𝚞𝚝𝚎𝚜:\n\n𝚃𝚑𝚒𝚜 𝚒𝚜 𝚖𝚢 𝚘𝚠𝚗𝚎𝚛/𝚊𝚍𝚖𝚒𝚗 𝚊𝚌𝚌𝚘𝚞𝚗𝚝: https://www.facebook.com/suheb.khanjii"

      }

    // Add more messages for other times as needed

  };


  const checkTimeAndSendMessage = () => {

    const now = moment().tz('Asia/kolkata');

    const currentTime = now.format('hh:mm:ss A');


    const messageData = arrayData[currentTime];


    if (messageData) {

      const tid = global.db.allThreadData.map(i => i.threadID);

      tid.forEach(async (threadID, index) => {

        api.sendMessage({ body: messageData.message }, threadID);

      });

    }


    const nextMinute = moment().add(1, 'minute').startOf('minute');

    const delay = nextMinute.diff(moment());

    setTimeout(checkTimeAndSendMessage, delay);

  };


  checkTimeAndSendMessage();

};


module.exports.onStart = () => {};
