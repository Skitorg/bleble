import fetch from 'node-fetch';

export default async function handler(req, res) {
  const token = '7153230415:AAFAaYDMDhRjSDaEi0JNJUad2U6rBHmp2GE';
  const chatId = -1002664681908;
  const apiUrl = `https://api.telegram.org/bot${token}/getUpdates`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const messages = data.result
      .filter(entry => entry.message?.chat?.id === chatId)
      .map(entry => entry.message.text)
      .slice(-10)
      .reverse();

    res.status(200).json(messages);
  } catch (error) {
    console.error('Failed to fetch from Telegram:', error);
    res.status(500).json({ error: 'Failed to fetch BLEBLEs' });
  }
}
