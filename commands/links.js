module.exports = {
  trigger: "!links",

  async execute(message) {

    await message.channel.send(
      "https://cdn.discordapp.com/attachments/1505649185997721781/1506000522161688746/linked.gif?ex=6a0cabc8&is=6a0b5a48&hm=e3a275e5ba3ec2366ce6c1e33306aac1a1202788dcc5583227cf4e7c43a1668b"
    );
  }
};
