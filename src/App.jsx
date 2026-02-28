import { useState, useMemo } from "react";

const DATA = [
  { name: "大阪城", nameEn: "Osaka Castle", category: "景點", area: "大阪", subArea: "中央區", rating: 4.4, reviews: 92046, hours: "9:00-18:00", price: "¥600", tags: ["必去", "歷史", "城堡"], note: "天守閣可登頂俯瞰全市，公園四季皆美", lat: 34.6873, lng: 135.5259, placeId: "ChIJ_TooXM3gAGARQR6hXH3QAQ8" },
  { name: "道頓堀", nameEn: "Dotonbori", category: "景點", area: "大阪", subArea: "難波", rating: 4.4, reviews: 81593, hours: "24hr", price: "免費", tags: ["必去", "美食街", "夜景"], note: "大阪美食天堂，霓虹燈運河夜景必拍", lat: 34.6687, lng: 135.5013, placeId: "ChIJ_fmKgRPnAGARkKWLtCYTu7g" },
  { name: "海遊館", nameEn: "Kaiyukan Aquarium", category: "景點", area: "大阪", subArea: "天保山", rating: 4.4, reviews: 56403, hours: "10:00-20:00", price: "¥2700", tags: ["必去", "水族館", "親子"], note: "世界級水族館，鯨鯊主缸超震撼，全程3-5小時", lat: 34.6545, lng: 135.4290, placeId: "ChIJzakNjPToAGARzCwIriDFg28" },
  { name: "梅田空中庭園展望台", nameEn: "Umeda Sky Building", category: "景點", area: "大阪", subArea: "梅田", rating: 4.4, reviews: 39850, hours: "9:30-22:00", price: "¥1500", tags: ["必去", "夜景", "展望台"], note: "173m高空庭園，日落時段最推薦，屋頂有夜光步道", lat: 34.7053, lng: 135.4897, placeId: "ChIJbyd0kIjmAGAR_crecCbjwlc" },
  { name: "通天閣", nameEn: "Tsutenkaku", category: "景點", area: "大阪", subArea: "新世界", rating: 4.1, reviews: 40496, hours: "10:00-20:00", price: "¥900", tags: ["地標", "懷舊"], note: "新世界地標，有戶外滑梯體驗，周邊串炸店林立", lat: 34.6525, lng: 135.5063, placeId: "ChIJ_0Lgd2DnAGARV0X03lbPy-U" },
  { name: "新世界", nameEn: "Shinsekai", category: "景點", area: "大阪", subArea: "新世界", rating: 4.2, reviews: 9602, hours: "24hr", price: "免費", tags: ["懷舊", "美食街"], note: "復古街區，霓虹燈+串炸+遊戲機台，白天夜晚氛圍不同", lat: 34.6516, lng: 135.5060, placeId: "ChIJV6JXdmDnAGAR-9a4atjXsTY" },
  { name: "Harukas 300 展望台", nameEn: "Abeno Harukas 300", category: "景點", area: "大阪", subArea: "天王寺", rating: 4.6, reviews: 21623, hours: "9:00-22:00", price: "¥2000", tags: ["展望台", "夜景"], note: "300m日本最高大樓之一，也可去免費樓層咖啡廳看景", lat: 34.6463, lng: 135.5133, placeId: "ChIJ3eA7J_DdAGARil7_EwUaR_I" },
  { name: "住吉大社", nameEn: "Sumiyoshi Taisha", category: "景點", area: "大阪", subArea: "住吉", rating: 4.5, reviews: 13189, hours: "6:00-17:00", price: "免費", tags: ["神社", "歷史"], note: "日本最古老神社之一，紅色太鼓橋很上鏡，遊客少", lat: 34.6124, lng: 135.4938, placeId: "ChIJAQB8xrvnAGARgh8ATf4d9ac" },
  { name: "黑門市場", nameEn: "Kuromon Market", category: "市場", area: "大阪", subArea: "難波", rating: 4.1, reviews: 19917, hours: "9:00-18:00", price: "免費入場", tags: ["必去", "美食", "市場"], note: "大阪的廚房，新鮮海鮮、和牛串燒、當季水果", lat: 34.6654, lng: 135.5062, placeId: "ChIJXSJB5UHnAGARQcEjvngsHaw" },
  { name: "天王寺動物園", nameEn: "Tennoji Zoo", category: "景點", area: "大阪", subArea: "天王寺", rating: 4.1, reviews: 17113, hours: "9:30-17:00（週一二休）", price: "¥500", tags: ["親子", "動物園"], note: "CP值高，小紅熊貓和企鵝很可愛，靠近新世界", lat: 34.6511, lng: 135.5084, placeId: "ChIJVVWVxPXdAGARk6J-88X_gBo" },
  { name: "伏見稻荷大社", nameEn: "Fushimi Inari Taisha", category: "景點", area: "京都", subArea: "伏見", rating: 4.6, reviews: 85174, hours: "24hr", price: "免費", tags: ["必去", "神社", "千本鳥居"], note: "千本鳥居是京都最經典畫面，完整走完約2-3小時", lat: 34.9677, lng: 135.7792, placeId: "ChIJIW0uPRUPAWAR6eI6dRzKGns" },
  { name: "清水寺", nameEn: "Kiyomizu-dera", category: "景點", area: "京都", subArea: "東山", rating: 4.6, reviews: 66882, hours: "6:00-18:00", price: "¥400（僅現金）", tags: ["必去", "世界遺產", "寺廟"], note: "木造舞台不用釘子，俯瞰京都市景，周邊老街必逛", lat: 34.9947, lng: 135.7847, placeId: "ChIJB_vchdMIAWARujTEUIZlr2I" },
  { name: "金閣寺", nameEn: "Kinkaku-ji", category: "景點", area: "京都", subArea: "北區", rating: 4.5, reviews: 65750, hours: "9:00-17:00", price: "¥500", tags: ["必去", "世界遺產", "寺廟"], note: "金碧輝煌倒映鏡湖池，門票以御守形式呈現", lat: 35.0394, lng: 135.7292, placeId: "ChIJvUbrwCCoAWARX2QiHCsn5A4" },
  { name: "嵐山", nameEn: "Arashiyama", category: "景點", area: "京都", subArea: "嵐山", rating: 4.5, reviews: 6986, hours: "全天", price: "免費", tags: ["必去", "竹林", "自然"], note: "竹林步道+渡月橋+天龍寺，建議安排半天", lat: 35.0094, lng: 135.6668, placeId: "ChIJ49PvUVQHAWARTAF7WU_Wqqs" },
  { name: "二條城", nameEn: "Nijō Castle", category: "景點", area: "京都", subArea: "中京", rating: 4.4, reviews: 40732, hours: "8:45-17:00", price: "¥1300", tags: ["必去", "世界遺產", "城堡"], note: "德川幕府權力象徵，鶯聲地板會發出鳥鳴聲", lat: 35.0140, lng: 135.7484, placeId: "ChIJC5srCtQHAWARLy9qkFmHaxA" },
  { name: "銀閣寺", nameEn: "Ginkaku-ji", category: "景點", area: "京都", subArea: "左京", rating: 4.5, reviews: 16683, hours: "8:30-17:00", price: "¥500", tags: ["世界遺產", "寺廟", "庭園"], note: "侘寂美學代表，枯山水庭園和苔蘚花園必看", lat: 35.0270, lng: 135.7982, placeId: "ChIJ4W9CCwUJAWARyauI6BzKiiU" },
  { name: "南禪寺", nameEn: "Nanzen-ji", category: "景點", area: "京都", subArea: "左京", rating: 4.5, reviews: 12082, hours: "8:40-16:30", price: "¥600", tags: ["寺廟", "紅磚水道橋"], note: "京都最重要禪宗寺廟，紅磚水道橋是絕佳拍照點", lat: 35.0114, lng: 135.7945, placeId: "ChIJ_fuXcyEJAWARTQDnx6Q5szg" },
  { name: "東福寺", nameEn: "Tōfuku-ji", category: "景點", area: "京都", subArea: "東山", rating: 4.5, reviews: 10898, hours: "9:00-16:00", price: "¥500", tags: ["寺廟", "紅葉"], note: "通天橋看楓樹谷超壯觀，禪宗庭園很有特色", lat: 34.9760, lng: 135.7738, placeId: "ChIJrZ8NkJJIAWARwRVgbKoRx2I" },
  { name: "八坂神社", nameEn: "Yasaka Shrine", category: "景點", area: "京都", subArea: "東山", rating: 4.4, reviews: 31776, hours: "24hr", price: "免費", tags: ["神社", "祗園"], note: "祗園入口地標，晚上燈籠亮起特別美", lat: 35.0037, lng: 135.7786, placeId: "ChIJqewQoHkIAWAR6RokWp3Iesc" },
  { name: "錦市場", nameEn: "Nishiki Market", category: "市場", area: "京都", subArea: "中京", rating: 4.3, reviews: 49879, hours: "店家各異", price: "免費入場", tags: ["必去", "美食", "市場"], note: "京都的廚房，漬物、抹茶甜點、串燒、刃物專賣店", lat: 35.0050, lng: 135.7647, placeId: "ChIJT8uMzZwIAWARnGzsARCjnrY" },
  { name: "京都塔", nameEn: "Kyoto Tower", category: "景點", area: "京都", subArea: "車站", rating: 4.2, reviews: 17396, hours: "10:00-21:00", price: "¥900", tags: ["展望台"], note: "京都最高建築，就在京都車站對面很方便", lat: 34.9875, lng: 135.7593, placeId: "ChIJd9pWqK8IAWAR1L-X_-4WKew" },
  { name: "平等院", nameEn: "Byōdō-in", category: "景點", area: "宇治", subArea: "宇治", rating: 4.5, reviews: 21408, hours: "8:45-17:30", price: "¥700", tags: ["必去", "世界遺產", "寺廟"], note: "10圓硬幣圖案就是平等院鳳凰堂，倒映池中像極樂世界", lat: 34.8893, lng: 135.8077, placeId: "ChIJqyva4AwRAWARpAf6j5MUhGA" },
  { name: "中村藤吉本店", nameEn: "Nakamura Tokichi", category: "餐廳", area: "宇治", subArea: "宇治", rating: 4.4, reviews: 5111, hours: "10:00-17:30", price: "¥¥", tags: ["必去", "抹茶", "甜點"], note: "宇治最有名的抹茶名店，抹茶聖代必吃，要先拿號碼牌", lat: 34.8895, lng: 135.8018, placeId: "ChIJsY2yLgkRAWARRxd0gBbV7XI" },
  { name: "力丸燒肉 道頓堀", nameEn: "Yakiniku Rikimaru", category: "餐廳", area: "大阪", subArea: "道頓堀", rating: 4.7, reviews: 4410, hours: "11:30-1:00AM", price: "¥¥", tags: ["燒肉", "吃到飽"], note: "90分鐘和牛吃到飽，CP值高，可看道頓堀夜景", lat: 34.6686, lng: 135.5011, placeId: "ChIJCem2DlLnAGAROrtvamZXSI0" },
  { name: "六之宮和牛燒肉 心齋橋", nameEn: "Rokunomiya Yakiniku", category: "餐廳", area: "大阪", subArea: "心齋橋", rating: 4.9, reviews: 12152, hours: "11:00-1:00AM", price: "¥¥", tags: ["燒肉", "和牛", "吃到飽"], note: "A5和牛吃到飽¥7500起，品質驚人", lat: 34.6695, lng: 135.5018, placeId: "ChIJy7m-Q3HnAGARtvQ6Xv3m24I" },
  { name: "白雲台 Grand Front", nameEn: "Yakiniku Hakuundai", category: "餐廳", area: "大阪", subArea: "梅田", rating: 4.5, reviews: 3843, hours: "11:00-23:00", price: "¥¥", tags: ["燒肉", "和牛"], note: "高品質肉品，牛舌必點，有英文菜單", lat: 34.7043, lng: 135.4949, placeId: "ChIJw0LI_YvmAGARhE-psXRydMU" },
  { name: "章魚燒 わなか 千日前", nameEn: "Takoyaki Wanaka", category: "餐廳", area: "大阪", subArea: "難波", rating: 4.3, reviews: 4136, hours: "10:30-21:00", price: "¥", tags: ["章魚燒", "街頭小吃"], note: "4種口味組合可一次嚐遍，有內用座位", lat: 34.6652, lng: 135.5034, placeId: "ChIJY971B2vnAGAR9orLBLBsj8Y" },
  { name: "はなだこ", nameEn: "Hanadako Takoyaki", category: "餐廳", area: "大阪", subArea: "梅田", rating: 4.3, reviews: 4205, hours: "10:00-22:00", price: "¥", tags: ["章魚燒", "街頭小吃"], note: "蔥美乃滋口味是招牌，外酥內軟到流漿", lat: 34.7032, lng: 135.4980, placeId: "ChIJ_5Ip7-zmAGAReRZN8gzci50" },
  { name: "串炸達摩 新世界總本店", nameEn: "Kushikatsu Daruma", category: "餐廳", area: "大阪", subArea: "新世界", rating: 4.1, reviews: 1997, hours: "11:00-22:30", price: "¥¥", tags: ["必吃", "串炸"], note: "串炸發源地，點綜合套餐嚐遍各種口味", lat: 34.6516, lng: 135.5062, placeId: "ChIJ5V4HCWDnAGARd6bIaaK91O4" },
  { name: "味乃家 難波本店", nameEn: "Ajinoya Okonomiyaki", category: "餐廳", area: "大阪", subArea: "難波", rating: 4.3, reviews: 3702, hours: "11:00-22:00（週一休）", price: "¥¥", tags: ["大阪燒"], note: "老店，店員在你面前煎大阪燒，全配料款必點", lat: 34.6681, lng: 135.5010, placeId: "ChIJvRX1cBPnAGARzhcHALQCKbw" },
  { name: "千とせ", nameEn: "Chitose Okonomiyaki", category: "餐廳", area: "大阪", subArea: "西成", rating: 4.7, reviews: 1718, hours: "11:30-14:30, 17:00-20:00", price: "¥", tags: ["大阪燒"], note: "在地人愛店，海鮮大阪燒份量大，要排隊", lat: 34.6475, lng: 135.5047, placeId: "ChIJa8XlHIvdAGARYXnQXLvWN7A" },
  { name: "OKO Fun Okonomiyaki Bar", nameEn: "OKO Okonomiyaki", category: "餐廳", area: "大阪", subArea: "道頓堀", rating: 4.7, reviews: 2292, hours: "18:00-23:00", price: "¥", tags: ["大阪燒", "素食友善"], note: "一人經營的超有趣小店，有無麩質和素食選項", lat: 34.6688, lng: 135.4982, placeId: "ChIJJW6hru3nAGARwQoSCpVqSvg" },
  { name: "遠藤壽司 中央市場", nameEn: "Endō Sushi", category: "餐廳", area: "大阪", subArea: "野田", rating: 4.4, reviews: 2234, hours: "6:15-14:00（週日休）", price: "¥¥", tags: ["壽司", "市場"], note: "中央市場旁早餐壽司，新鮮度極高，當地人也愛", lat: 34.6842, lng: 135.4795, placeId: "ChIJ0RFQL0XmAGARzPLLx2sNlm4" },
  { name: "春駒壽司 本店", nameEn: "Harukoma Sushi", category: "餐廳", area: "大阪", subArea: "天神橋", rating: 4.2, reviews: 3596, hours: "11:00-21:30（週二休）", price: "¥", tags: ["壽司"], note: "天神橋筋商店街的排隊名店，CP值超高，大份量", lat: 34.7077, lng: 135.5116, placeId: "ChIJW7SUt7jmAGARQ_B9JgrRYVw" },
  { name: "MACCHA HOUSE 河原町", nameEn: "Maccha House", category: "餐廳", area: "京都", subArea: "河原町", rating: 3.8, reviews: 1625, hours: "11:00-20:00", price: "¥¥", tags: ["抹茶", "甜點"], note: "抹茶提拉米蘇是招牌，霜淇淋也不錯", lat: 35.0045, lng: 135.7695, placeId: "ChIJgQKdEJUIAWARpREaL0Fzy60" },
  { name: "日本環球影城", nameEn: "Universal Studios Japan", category: "景點", area: "大阪", subArea: "此花區", rating: 4.5, reviews: 147971, hours: "依日期不同", price: "¥8600起", tags: ["必去", "主題樂園", "親子"], note: "超級任天堂世界+哈利波特園區最熱門，建議買快速通關", lat: 34.6657, lng: 135.4323, placeId: "ChIJXeLVg9DgAGARqlIyMCX-BTY" },
  { name: "四天王寺", nameEn: "Shitennō-ji", category: "景點", area: "大阪", subArea: "天王寺", rating: 4.3, reviews: 12391, hours: "8:30-16:00", price: "¥300", tags: ["寺廟", "歷史"], note: "日本最古老寺廟之一，遊客少氣氛寧靜，佛教壁畫精美", lat: 34.6545, lng: 135.5165, placeId: "ChIJIVA6O_jdAGARLWCtv8iBqrY" },
  { name: "心齋橋筋商店街", nameEn: "Shinsaibashi-suji", category: "購物", area: "大阪", subArea: "心齋橋", rating: 4.3, reviews: 20437, hours: "11:00-20:00", price: "免費", tags: ["必去", "購物", "商店街"], note: "大阪最有名的購物街，有頂棚不怕雨，品牌+藥妝+美食", lat: 34.6709, lng: 135.5014, placeId: "ChIJc7M3_BPnAGARI8OZlTnEXGI" },
  { name: "Rikuro老爺爺起司蛋糕 難波", nameEn: "Rikuro's Cheesecake", category: "餐廳", area: "大阪", subArea: "難波", rating: 4.2, reviews: 4732, hours: "9:00-20:00", price: "¥", tags: ["必吃", "甜點", "起司蛋糕"], note: "大阪名物輕乳酪蛋糕，剛出爐搖搖晃晃超療癒，排隊名店", lat: 34.6661, lng: 135.5016, placeId: "ChIJK2A0qGznAGARxPHcddHFYYA" },
  { name: "一蘭拉麵 道頓堀", nameEn: "Ichiran Dotonbori", category: "餐廳", area: "大阪", subArea: "道頓堀", rating: 4.3, reviews: 8465, hours: "24hr", price: "¥¥", tags: ["拉麵"], note: "24hr營業，單人隔間座位，自訂麵硬度湯濃度辣度", lat: 34.6684, lng: 135.5032, placeId: "ChIJK7TL6RTnAGARYiifaSOuOFM" },
  { name: "龍安寺", nameEn: "Ryōan-ji", category: "景點", area: "京都", subArea: "右京", rating: 4.5, reviews: 10829, hours: "8:00-17:00", price: "¥600", tags: ["世界遺產", "枯山水", "寺廟"], note: "世界最有名的枯山水石庭，15塊石頭無法同時看見全部", lat: 35.0345, lng: 135.7183, placeId: "ChIJp7ocMCqoAWARQoXXRj4Xq-E" },
  { name: "三十三間堂", nameEn: "Sanjūsangendō", category: "景點", area: "京都", subArea: "東山", rating: 4.7, reviews: 16316, hours: "9:00-16:00", price: "¥600", tags: ["必去", "寺廟"], note: "120m長堂內1001尊千手觀音像整齊排列，震撼度爆表", lat: 34.9879, lng: 135.7717, placeId: "ChIJs4Cbj8oIAWARiBZl2-sBK6o" },
  { name: "固力果跑跑人看板", nameEn: "Glico Sign", category: "景點", area: "大阪", subArea: "道頓堀", rating: 4.5, reviews: 17301, hours: "24hr（晚上點燈）", price: "免費", tags: ["必去", "地標", "拍照"], note: "大阪最經典打卡點，戎橋上模仿跑跑人姿勢拍照必做", lat: 34.6689, lng: 135.5011, placeId: "ChIJ6XHOkxTnAGARvyn92D4gWVs" },
  { name: "二年坂・三年坂", nameEn: "Ninenzaka & Sannenzaka", category: "景點", area: "京都", subArea: "東山", rating: 4.5, reviews: 10587, hours: "24hr", price: "免費", tags: ["必去", "老街", "拍照"], note: "通往清水寺的石板坡道老街，兩側町屋超美，有星巴克概念店", lat: 34.9982, lng: 135.7809, placeId: "ChIJlwyrGNAIAWARNb5hUHdZruY" },
  { name: "難波八阪神社", nameEn: "Namba Yasaka Shrine", category: "景點", area: "大阪", subArea: "難波", rating: 4.5, reviews: 14090, hours: "6:30-17:00", price: "免費", tags: ["必去", "神社", "拍照"], note: "巨大獅子頭舞台超震撼！吞噬厄運帶來勝運，打卡必訪", lat: 34.6616, lng: 135.4967, placeId: "ChIJQVW9eXLnAGARn-pUdRl0w4A" },
  { name: "大阪城公園", nameEn: "Osaka Castle Park", category: "景點", area: "大阪", subArea: "中央區", rating: 4.4, reviews: 49082, hours: "24hr", price: "免費", tags: ["公園", "櫻花", "散步"], note: "大阪城周圍的超大型公園，四季都美，櫻花季名所", lat: 34.6865, lng: 135.5262, placeId: "ChIJVVVld8ngAGARi9mE-a6e9mc" },
  { name: "牛カツ京都勝牛 先斗町本店", nameEn: "Gyukatsu Katsugyu Pontocho", category: "餐廳", area: "京都", subArea: "先斗町", rating: 4.8, reviews: 8798, hours: "11:00-22:30", price: "¥¥", tags: ["必吃", "炸牛排"], note: "京都超人氣炸牛排，自己在石板上烤到喜歡熟度，先斗町小巷氛圍棒", lat: 35.0070, lng: 135.7710, placeId: "ChIJt3Q_tZQIAWARhnwJ7t1qjU0" },
  { name: "牛カツ京都勝牛 寺町京極", nameEn: "Gyukatsu Katsugyu Teramachi", category: "餐廳", area: "京都", subArea: "河原町", rating: 4.8, reviews: 10155, hours: "10:00-22:30", price: "¥¥", tags: ["必吃", "炸牛排"], note: "同品牌寺町分店，評論數更多，抹茶啤酒很特別", lat: 35.0054, lng: 135.7669, placeId: "ChIJF4sjAAEJAWAR_px5vQ7vcOE" },
  { name: "Sushi Fukushima", nameEn: "Sushi Fukushima", category: "餐廳", area: "大阪", subArea: "福島", rating: 4.9, reviews: 1335, hours: "18:00-23:00（週六日有午餐）", price: "¥¥¥", tags: ["壽司", "Omakase"], note: "表演型壽司omakase，主廚超有趣會扮裝，融合創意壽司", lat: 34.6943, lng: 135.4878, placeId: "ChIJfzaNbQDnAGARrUgx-dzqWfY" },
  { name: "HEAD SPA Kuu 心齋橋", nameEn: "HEAD SPA Kuu Shinsaibashi", category: "體驗", area: "大阪", subArea: "心齋橋", rating: 5.0, reviews: 2831, hours: "10:00-21:00", price: "¥6000起", tags: ["頭皮Spa", "放鬆"], note: "5.0滿分！超人氣頭皮Spa，療程後提供抹茶，旅途疲勞救星", lat: 34.6729, lng: 135.4999, placeId: "ChIJ0SHaFB7nAGARpnQO-aoL6P8" },
  { name: "神戶牛 KOJYU", nameEn: "Kobe Beef KOJYU", category: "餐廳", area: "神戶", subArea: "三宮", rating: 4.9, reviews: 2953, hours: "11:00-22:00", price: "¥¥¥¥", tags: ["神戶牛", "鐵板燒"], note: "4.9分！A5神戶牛鐵板燒，廚師表演精彩，CP值高於其他高檔店", lat: 34.6928, lng: 135.1912, placeId: "ChIJXf_JXeOOAGAR4Ll5qg7NJRM" },
  { name: "奈良公園", nameEn: "Nara Park", category: "景點", area: "奈良", subArea: "奈良公園", rating: 4.6, reviews: 71437, hours: "24hr", price: "免費", tags: ["必去", "小鹿", "世界遺產"], note: "超過1000頭野生鹿！買鹿仙貝¥200餵食，春櫻秋楓都超美", lat: 34.6850, lng: 135.8430, placeId: "ChIJYWCMvZY5AWARVnREV_OsbPk" },
  { name: "東大寺", nameEn: "Todai-ji", category: "景點", area: "奈良", subArea: "奈良公園", rating: 4.7, reviews: 29911, hours: "7:30-17:30", price: "¥600", tags: ["必去", "世界遺產", "大佛"], note: "世界最大木造建築！15公尺高大佛超震撼，鑽柱洞求好運", lat: 34.6890, lng: 135.8398, placeId: "ChIJ3XYIepA5AWARjzzVnT-skPg" },
  { name: "春日大社", nameEn: "Kasuga Taisha", category: "景點", area: "奈良", subArea: "奈良公園", rating: 4.5, reviews: 14416, hours: "7:00-17:00", price: "¥500", tags: ["必去", "世界遺產", "神社"], note: "千年石燈籠參道超夢幻，萬燈籠活動（2月/8月）必看", lat: 34.6815, lng: 135.8485, placeId: "ChIJ1Wqwa8A5AWARlpXjgoPnl0w" },
  { name: "姬路城", nameEn: "Himeji Castle", category: "景點", area: "神戶", subArea: "姬路", rating: 4.6, reviews: 57089, hours: "9:00-16:00", price: "¥1050", tags: ["必去", "世界遺產", "城堡"], note: "白鷺城！日本最美城堡，從大阪搭新幹線1小時，值得一日遊", lat: 34.8394, lng: 134.6939, placeId: "ChIJsyQzogPgVDURsYG6bi-MT3o" },
  { name: "嵐山竹林小徑", nameEn: "Arashiyama Bamboo Grove", category: "體驗", area: "京都", subArea: "嵐山", rating: 4.3, reviews: 20633, hours: "24hr", price: "免費", tags: ["必去", "自然", "拍照"], note: "高聳竹林隧道超夢幻，建議清晨8點前去才能拍到空景", lat: 35.0168, lng: 135.6713, placeId: "ChIJrYtcv-urAWAR3XzWvXv8n_s" },
  { name: "貴船神社", nameEn: "Kifune Shrine", category: "景點", area: "京都", subArea: "貴船", rating: 4.5, reviews: 11510, hours: "6:00-18:00", price: "免費", tags: ["神社", "近郊"], note: "紅燈籠石階超夢幻，水占卜必試，夏天有川床流水麵", lat: 35.1221, lng: 135.7629, placeId: "ChIJCZEK8wimAWARi1RkteQaAh0" },
  { name: "和服租借 Aiwafuku 祇園四條", nameEn: "Aiwafuku Kimono Gion", category: "體驗", area: "京都", subArea: "祇園", rating: 5.0, reviews: 1309, hours: "9:00-18:00", price: "¥3500起", tags: ["和服", "拍照"], note: "5.0滿分！含編髮服務，款式多價格親民，河原町站走路3分", lat: 35.0045, lng: 135.7729, placeId: "ChIJrygo2mIRAWAR3zMIQ1cq3Ik" },
  { name: "祇園 MAIKOYA 舞妓體驗", nameEn: "Gion Maikoya Geisha Experience", category: "體驗", area: "京都", subArea: "祇園", rating: 4.9, reviews: 1401, hours: "9:00-19:30", price: "¥¥¥", tags: ["舞妓", "茶道", "和服"], note: "4.9★超高分！含和服+茶道+舞妓表演+庭園拍照，體驗正統京都文化", lat: 34.9976, lng: 135.7740, placeId: "ChIJR2I1KZcJAWARvKqCFCkxnuU" },
  { name: "中谷堂 麻糬", nameEn: "Nakatanidou", category: "餐廳", area: "奈良", subArea: "三條通", rating: 4.3, reviews: 5865, hours: "10:00-18:00（週二休）", price: "¥", tags: ["麻糬", "表演"], note: "超高速搗麻糬表演超吸睛！現搗艾草麻糬軟Q好吃，奈良必吃", lat: 34.6819, lng: 135.8289, placeId: "ChIJmzwHEog5AWARiML9vXtSFso" },
];

const CATEGORIES = ["全部", "景點", "餐廳", "市場", "購物", "體驗"];
const AREAS = ["全部", "大阪", "京都", "神戶", "宇治", "奈良"];

const catIcon = (cat) => ({ "景點": "⛩️", "餐廳": "🍜", "市場": "🏮", "購物": "🛍️", "體驗": "🎭" })[cat] || "📍";

const areaStyle = (area) => ({
  "大阪": "bg-shu/10 text-shu border-shu/20",
  "京都": "bg-fuji/10 text-fuji border-fuji/20",
  "宇治": "bg-matcha/10 text-matcha border-matcha/20",
  "奈良": "bg-kohaku/10 text-kohaku border-kohaku/20",
  "神戶": "bg-sora/10 text-sora border-sora/20",
})[area] || "bg-gray-100 text-gray-600 border-gray-200";

export default function App() {
  const [catFilter, setCatFilter] = useState("全部");
  const [areaFilter, setAreaFilter] = useState("全部");
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sortKey, setSortKey] = useState("rating");
  const [sortDir, setSortDir] = useState("desc");
  const [expandedIdx, setExpandedIdx] = useState(null);

  const allTags = useMemo(() => {
    const s = new Set();
    DATA.forEach(d => d.tags.forEach(t => s.add(t)));
    return ["全部", ...Array.from(s).sort()];
  }, []);

  const filtered = useMemo(() => {
    let result = DATA;
    if (catFilter !== "全部") result = result.filter(d => d.category === catFilter);
    if (areaFilter !== "全部") result = result.filter(d => d.area === areaFilter);
    if (tagFilter && tagFilter !== "全部") result = result.filter(d => d.tags.includes(tagFilter));
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) || d.nameEn.toLowerCase().includes(q) ||
        d.note.toLowerCase().includes(q) || d.subArea.toLowerCase().includes(q) ||
        d.tags.some(t => t.includes(q))
      );
    }
    return [...result].sort((a, b) => {
      let va = a[sortKey], vb = b[sortKey];
      if (typeof va === "string") { va = va.toLowerCase(); vb = vb.toLowerCase(); }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [catFilter, areaFilter, tagFilter, search, sortKey, sortDir]);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };
  const sortIcon = (key) => sortKey !== key ? " ↕" : sortDir === "asc" ? " ↑" : " ↓";

  const openGoogleMaps = (item) => {
    const url = item.placeId
      ? `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}&query_place_id=${item.placeId}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.nameEn)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-washi">
      {/* Header */}
      <header className="bg-sumi text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E\")", backgroundSize: "60px 60px"}} />
        <div className="relative px-4 py-6 md:py-8 text-center">
          <div className="text-3xl md:text-4xl mb-1">🏮</div>
          <h1 className="text-xl md:text-3xl font-bold">
            <span className="text-shu-light">関西</span>
            <span className="text-kin-light mx-1">旅遊</span>
            <span className="text-white">資料庫</span>
          </h1>
          <p className="text-sm text-white/50 mt-2 tracking-widest">大阪 ・ 京都 ・ 神戶 ・ 奈良 ・ 宇治</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm">
            <span className="text-kin">✦</span>
            <span>共 <b className="text-kin">{DATA.length}</b> 個地點</span>
            <span className="text-white/30">|</span>
            <span>顯示 <b className="text-kin">{filtered.length}</b> 個</span>
          </div>
        </div>
        <div className="wave-divider" />
      </header>

      {/* Filters */}
      <div className="sticky top-0 z-20 bg-washi/95 backdrop-blur-sm border-b border-shu/10 px-3 py-3 space-y-2.5">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-shu/40 text-sm">✦</span>
          <input type="text" placeholder="搜尋景點、餐廳、關鍵字..."
            className="w-full border border-shu/15 bg-white rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-shu/30 focus:border-shu/30 placeholder:text-sumi/30"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${catFilter === c ? "bg-shu text-white border-shu shadow-sm shadow-shu/20" : "bg-white text-sumi-light border-shu/10 hover:border-shu/30 hover:bg-shu/5"}`}>
              {c === "全部" ? "全部" : `${catIcon(c)} ${c}`}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 items-center">
          {AREAS.map(a => (
            <button key={a} onClick={() => setAreaFilter(a)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${areaFilter === a ? "bg-sumi text-white border-sumi" : "bg-white text-sumi-light border-sumi/10 hover:border-sumi/30 hover:bg-sumi/5"}`}>
              {a}
            </button>
          ))}
          <div className="h-5 w-px bg-shu/15 mx-1 hidden sm:block" />
          <select value={tagFilter} onChange={e => setTagFilter(e.target.value)}
            className="text-xs border border-shu/15 rounded-lg px-2.5 py-1.5 bg-white text-sumi-light focus:outline-none focus:ring-1 focus:ring-shu/30">
            {allTags.map(t => <option key={t} value={t === "全部" ? "" : t}>{t === "全部" ? "🏷️ 標籤篩選" : `# ${t}`}</option>)}
          </select>
        </div>
      </div>

      {/* Mobile List */}
      <div className="md:hidden">
        {filtered.map((item, i) => {
          const isExp = expandedIdx === i;
          return (
            <div key={i} className="border-b border-shu/8 bg-white active:bg-kin-light/30 transition-colors"
              onClick={() => setExpandedIdx(isExp ? null : i)}>
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="text-xl w-7 text-center shrink-0">{catIcon(item.category)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sumi text-sm truncate">{item.name}</span>
                    {item.tags.some(t => t === "必去" || t === "必吃") && (
                      <span className="shrink-0 text-[10px] bg-shu text-white px-1.5 py-0.5 rounded font-bold">必訪</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${areaStyle(item.area)}`}>
                      {item.area}・{item.subArea}
                    </span>
                    <span className="text-xs text-sumi/40">{item.price}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-0.5">
                    <span className="text-kin font-bold text-sm">{item.rating}</span>
                    <span className="text-kin text-xs">★</span>
                  </div>
                  <div className="text-[10px] text-sumi/30">{item.reviews >= 1000 ? `${(item.reviews/1000).toFixed(1)}K` : item.reviews}</div>
                </div>
                <div className={`text-sumi/25 text-xs transition-transform ${isExp ? "rotate-180" : ""}`}>▼</div>
              </div>
              {isExp && (
                <div className="px-4 pb-4 pt-0 space-y-2.5 border-t border-shu/5 bg-washi/50">
                  <p className="text-xs text-sumi/40 italic">{item.nameEn}</p>
                  <p className="text-sm text-sumi-light leading-relaxed">{item.note}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map(t => (
                      <span key={t} className={`px-2 py-0.5 rounded-full text-[11px] border ${t === "必去" || t === "必吃" ? "bg-shu/10 text-shu border-shu/20 font-bold" : "bg-white text-sumi/50 border-sumi/10"}`}>{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-sumi/50">
                    <span>🕐 {item.hours}</span>
                    <span className="font-medium text-sumi">{item.price}</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); openGoogleMaps(item); }}
                    className="w-full py-2.5 bg-shu hover:bg-shu-dark text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5">
                    ⛩️ 在 Google Maps 開啟
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-sumi text-white/80 sticky top-[117px] z-10">
              <th className="px-3 py-3 text-left font-medium cursor-pointer hover:text-kin whitespace-nowrap" onClick={() => handleSort("name")}>名稱{sortIcon("name")}</th>
              <th className="px-2 py-3 text-left font-medium whitespace-nowrap">地區</th>
              <th className="px-2 py-3 text-left font-medium whitespace-nowrap">類型</th>
              <th className="px-2 py-3 text-center font-medium cursor-pointer hover:text-kin whitespace-nowrap" onClick={() => handleSort("rating")}>評分{sortIcon("rating")}</th>
              <th className="px-2 py-3 text-center font-medium cursor-pointer hover:text-kin whitespace-nowrap" onClick={() => handleSort("reviews")}>評論{sortIcon("reviews")}</th>
              <th className="px-2 py-3 text-left font-medium whitespace-nowrap">營業時間</th>
              <th className="px-2 py-3 text-left font-medium whitespace-nowrap">價格</th>
              <th className="px-2 py-3 text-left font-medium whitespace-nowrap">標籤</th>
              <th className="px-2 py-3 text-left font-medium">備註</th>
              <th className="px-2 py-3 text-center font-medium whitespace-nowrap">地圖</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={i} className={`border-b border-shu/5 hover:bg-kin-light/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-washi/60"}`}>
                <td className="px-3 py-3"><div className="font-bold text-sumi">{item.name}</div><div className="text-xs text-sumi/35 mt-0.5">{item.nameEn}</div></td>
                <td className="px-2 py-3"><span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${areaStyle(item.area)}`}>{item.area}</span><div className="text-[11px] text-sumi/35 mt-0.5">{item.subArea}</div></td>
                <td className="px-2 py-3 whitespace-nowrap text-xs">{catIcon(item.category)} {item.category}</td>
                <td className="px-2 py-3 text-center"><span className="font-bold text-kin">{item.rating}</span><span className="text-kin text-xs"> ★</span></td>
                <td className="px-2 py-3 text-center text-xs text-sumi/40">{item.reviews >= 1000 ? `${(item.reviews/1000).toFixed(1)}K` : item.reviews}</td>
                <td className="px-2 py-3 text-xs text-sumi/60 whitespace-nowrap">{item.hours}</td>
                <td className="px-2 py-3 text-xs font-medium text-sumi whitespace-nowrap">{item.price}</td>
                <td className="px-2 py-3"><div className="flex flex-wrap gap-0.5">{item.tags.map(t => (<span key={t} className={`px-1.5 py-0 rounded text-[11px] ${t === "必去" || t === "必吃" ? "bg-shu/10 text-shu font-bold" : "bg-sumi/5 text-sumi/40"}`}>{t}</span>))}</div></td>
                <td className="px-2 py-3 text-xs text-sumi/60 max-w-xs">{item.note}</td>
                <td className="px-2 py-3 text-center"><button onClick={() => openGoogleMaps(item)} className="px-3 py-1.5 bg-shu hover:bg-shu-dark text-white rounded text-xs font-medium transition-colors whitespace-nowrap">⛩️ 開啟</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-sumi/30">
          <p className="text-5xl mb-3">🏮</p>
          <p className="text-lg">找不到符合條件的地點</p>
          <p className="text-sm mt-1">試試其他篩選條件吧</p>
        </div>
      )}

      <footer className="text-center py-6 text-xs text-sumi/25 border-t border-shu/8 mt-4">
        <div className="flex items-center justify-center gap-2">
          <span>✦</span><span>關西旅遊資料庫</span><span className="text-shu/20">|</span><span>點擊列表項目展開詳情</span><span>✦</span>
        </div>
      </footer>
    </div>
  );
}
