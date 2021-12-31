import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
                        command: "hbd",
                        aliases: ["happy birthday", "hhp"],
			description: "Generally used to check if bot is Up",
			category: "general",
			usage: `${client.config.prefix}hbd`,
			baseXp: 10,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        const user = M.mentioned[0] ? M.mentioned[0] : M.sender.jid
        let username = user === M.sender.jid ? M.sender.username : ''
        if (!username) {
            const contact = this.client.getContact(user)
            username = contact.notify || contact.vname || contact.name || user.split('@')[0]
        }
        let pfp: string
        try {
            pfp = await this.client.getProfilePicture(user)
        } catch (err) {
            M.reply(`Profile Picture not Accessible of ${username}`)
            pfp =
                'https://wallpaperaccess.com/full/5304840.png'
        }
        const exp = (await this.client.getUser(user)).Xp
        let role: string;
				if (exp < 500) {
					role = "🌸 Citizen";
				} else if (exp < 1000) {
					role = "🔎 Cleric";
				} else if (exp < 2000) {
					role = "🔮 Wizard";
				} else if (exp < 5000) {
					role = "♦️ Mage";
				} else if (exp < 10000) {
					role = "🎯 Noble";
				} else if (exp < 25000) {
					role = "✨ Elite";
				} else if (exp < 50000) {
					role = "🔶️ Ace";
				} else if (exp < 75000) {
					role = "🌀 Hero";
				} else if (exp < 100000) {
					role = "💎 Supreme";
				} else {
					role = "❄️ Mystic";
				}

				let level: number;
				if (exp < 500) {
					level = 1;
				} else if (exp < 1000) {
					level = 2;
				} else if (exp < 2000) {
					level = 3;
				} else if (exp < 5000) {
					level = 4;
				} else if (exp < 10000) {
					level = 5;
				} else if (exp < 25000) {
					level = 6;
				} else if (exp < 50000) {
					level = 7;
				} else if (exp < 75000) {
					level = 8;
				} else if (exp < 100000) {
					level = 9;
				} else {
					level = 10;
				}
        await M.reply(
            await request.buffer(
                pfp ||
                    'https://wallpaperaccess.com/full/5304840.png'
            ),
            MessageType.image,
            undefined,
            undefined,🍨🎂🥂
            `✨WISHING YOU A VERY VERY HAPPY BIRTHDAY ${username}*\n\n🎗️ *About: $`
        )
    }
}