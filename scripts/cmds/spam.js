module.exports = {
  config: {
    name: "spam",
    aurthor:"Karan jalvanshi",
     role: 2,
    shortDescription: " ",
    longDescription: "",
    category: "sophia",
    guide: "{pn}"
  },

  onStart: async function ({ api, event, args }) {
	const amount = parseInt(args[0]);
	const message = args.slice(1).join(" ");

	if (isNaN(amount) || !message) {
		return api.sendMessage("Invalid usage. Usage: /spam [amount] [message]", event.threadID);
	}

	for (let i = 0; i < amount; i++) {
		api.sendMessage(message, event.threadID);
	}
  },
};