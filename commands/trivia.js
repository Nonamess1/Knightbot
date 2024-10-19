from telegram import Update
from telegram.ext import Updater, CommandHandler, CallbackContext

# Bot Token
TOKEN = 'YOUR_BOT_TOKEN_HERE'

# Function to remove members
def kill_members(update: Update, context: CallbackContext) -> None:
    if update.message.chat.type == "group" or update.message.chat.type == "supergroup":
        for member in update.message.chat.get_members():
            try:
                context.bot.kick_chat_member(update.message.chat.id, member.user.id)
                print(f"Removing {member.user.username}")
            except Exception as e:
                print(f"Error removing {member.user.username}: {e}")

# Main function
def main() -> None:
    updater = Updater(TOKEN)

    # Handler for the /kill command
    updater.dispatcher.add_handler(CommandHandler('kill', kill_members))

    # Start the bot
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()

