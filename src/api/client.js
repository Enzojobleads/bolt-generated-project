import axios from 'axios'

export const client = axios.create({
  baseURL: 'https://api.bizzy.org',
  headers: {
    'accept': '*/*',
    'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk2NDE2LCJzZXNzaW9uSWQiOjE5MTM4NSwiaWF0IjoxNzMzOTI5ODUyfQ.JTt3aVGJxoik5FAxzET7SYb5u8FM_Z5Q6aJe7CKcy80',
    'content-type': 'application/json',
    'origin': 'https://app.bizzy.org',
    'priority': 'u=1, i',
    'referer': 'https://app.bizzy.org/',
    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'x-device-id': '750ad98b607487ab5b67ee742add05a6'
  }
})
