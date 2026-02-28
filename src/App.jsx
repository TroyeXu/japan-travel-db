import { useState, useMemo } from "react";

const DATA = [
  // ===== 大阪景點 =====
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

  // ===== 京都景點 =====
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

  // ===== 宇治 =====
  { name: "平等院", nameEn: "Byōdō-in", category: "景點", area: "宇治", subArea: "宇治", rating: 4.5, reviews: 21408, hours: "8:45-17:30", price: "¥700", tags: ["必去", "世界遺產", "寺廟"], note: "10圓硬幣圖案就是平等院鳳凰堂，倒映池中像極樂世界", lat: 34.8893, lng: 135.8077, placeId: "ChIJqyva4AwRAWARpAf6j5MUhGA" },
  { name: "中村藤吉本店", nameEn: "Nakamura Tokichi", category: "餐廳", area: "宇治", subArea: "宇治", rating: 4.4, reviews: 5111, hours: "10:00-17:30", price: "¥¥", tags: ["必去", "抹茶", "甜點"], note: "宇治最有名的抹茶名店，抹茶聖代必吃，要先拿號碼牌", lat: 34.8895, lng: 135.8018, placeId: "ChIJsY2yLgkRAWARRxd0gBbV7XI" },

  // ===== 奈良 =====


  // ===== 大阪餐廳 =====
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

  // ===== 京都餐廳 =====
  { name: "MACCHA HOUSE 河原町", nameEn: "Maccha House", category: "餐廳", area: "京都", subArea: "河原町", rating: 3.8, reviews: 1625, hours: "11:00-20:00", price: "¥¥", tags: ["抹茶", "甜點"], note: "抹茶提拉米蘇是招牌，霜淇淋也不錯", lat: 35.0045, lng: 135.7695, placeId: "ChIJgQKdEJUIAWARpREaL0Fzy60" },

  // ===== 新增：大阪景點 =====
  { name: "日本環球影城", nameEn: "Universal Studios Japan", category: "景點", area: "大阪", subArea: "此花區", rating: 4.5, reviews: 147971, hours: "依日期不同", price: "¥8600起", tags: ["必去", "主題樂園", "親子"], note: "超級任天堂世界+哈利波特園區最熱門，建議買快速通關", lat: 34.6657, lng: 135.4323, placeId: "ChIJXeLVg9DgAGARqlIyMCX-BTY" },
  { name: "四天王寺", nameEn: "Shitennō-ji", category: "景點", area: "大阪", subArea: "天王寺", rating: 4.3, reviews: 12391, hours: "8:30-16:00", price: "¥300", tags: ["寺廟", "歷史"], note: "日本最古老寺廟之一，遊客少氣氛寧靜，佛教壁畫精美", lat: 34.6545, lng: 135.5165, placeId: "ChIJIVA6O_jdAGARLWCtv8iBqrY" },
  { name: "中之島美術館", nameEn: "Nakanoshima Museum", category: "景點", area: "大阪", subArea: "中之島", rating: 4.4, reviews: 5600, hours: "10:00-17:00（週一休）", price: "依展覽", tags: ["美術館", "建築"], note: "黑色立方體建築超有設計感，有HAY家具店和咖啡廳", lat: 34.6924, lng: 135.4914, placeId: "ChIJa7dX-nLnAGARYuCX2mxyVWA" },
  { name: "天保山摩天輪", nameEn: "Tempozan Ferris Wheel", category: "景點", area: "大阪", subArea: "天保山", rating: 4.5, reviews: 10317, hours: "10:00-20:45", price: "¥800", tags: ["摩天輪", "夜景"], note: "可選全透明車廂，海遊館旁邊很適合一起排，看港灣夜景", lat: 34.6563, lng: 135.4310, placeId: "ChIJQ-VhVYvoAGARJsKgJKTie_4" },
  { name: "大阪生活今昔館", nameEn: "Osaka Housing Museum", category: "景點", area: "大阪", subArea: "天神橋", rating: 4.2, reviews: 8018, hours: "10:00-17:00（週二休）", price: "¥600", tags: ["博物館", "和服體驗"], note: "重現江戶時代街道，可租和服拍照¥1000，大阪周遊卡免費", lat: 34.7103, lng: 135.5113, placeId: "ChIJ7xEdT7nmAGARYQc8ZWRPI5Q" },
  { name: "teamLab 植物園", nameEn: "teamLab Botanical Garden", category: "景點", area: "大阪", subArea: "東住吉", rating: 3.9, reviews: 2262, hours: "18:00-21:30", price: "¥1800", tags: ["夜間", "藝術", "燈光"], note: "夜間限定光影藝術體驗，在自然公園中散步約1-1.5小時", lat: 34.6110, lng: 135.5204, placeId: "ChIJv2BBVszdAGAR-6Cjxyh-sEQ" },

  // ===== 新增：大阪購物 =====
  { name: "心齋橋筋商店街", nameEn: "Shinsaibashi-suji", category: "購物", area: "大阪", subArea: "心齋橋", rating: 4.3, reviews: 20437, hours: "11:00-20:00", price: "免費", tags: ["必去", "購物", "商店街"], note: "大阪最有名的購物街，有頂棚不怕雨，品牌+藥妝+美食", lat: 34.6709, lng: 135.5014, placeId: "ChIJc7M3_BPnAGARI8OZlTnEXGI" },
  { name: "天神橋筋商店街", nameEn: "Tenjinbashisuji", category: "購物", area: "大阪", subArea: "天神橋", rating: 4.2, reviews: 3061, hours: "24hr", price: "免費", tags: ["購物", "在地", "商店街"], note: "日本最長商店街2.5km，在地氛圍濃厚，比心齋橋更接地氣", lat: 34.7025, lng: 135.5115, placeId: "ChIJTW9DUrnmAGARVwa3Ga1U-JI" },
  { name: "Namba Parks", nameEn: "Namba Parks", category: "購物", area: "大阪", subArea: "難波", rating: 4.0, reviews: 15231, hours: "11:00-23:00", price: "免費", tags: ["購物", "建築"], note: "屋頂空中花園超美，建築設計感十足，有電影院和餐廳", lat: 34.6616, lng: 135.5019, placeId: "ChIJ9RFkRWnnAGARZh-hyWjBhtg" },
  { name: "大丸百貨 心齋橋", nameEn: "Daimaru Shinsaibashi", category: "購物", area: "大阪", subArea: "心齋橋", rating: 4.1, reviews: 16298, hours: "10:00-20:00", price: "免費", tags: ["百貨", "購物"], note: "高檔百貨，有寶可夢中心，地下美食街和甜點必逛", lat: 34.6732, lng: 135.5010, placeId: "ChIJZ-xhShHnAGARHwpJWTM60q0" },
  { name: "唐吉訶德 道頓堀", nameEn: "Don Quijote Dotonbori", category: "購物", area: "大阪", subArea: "道頓堀", rating: 3.7, reviews: 9619, hours: "24hr", price: "免費", tags: ["購物", "免稅"], note: "24小時營業，藥妝零食伴手禮一站買齊，有免稅服務", lat: 34.6693, lng: 135.5026, placeId: "ChIJzTcpYBTnAGARRj0CBKJJsSY" },

  // ===== 新增：大阪甜點 =====
  { name: "Pablo起司塔 心齋橋", nameEn: "Pablo Cheese Tart", category: "餐廳", area: "大阪", subArea: "心齋橋", rating: 4.2, reviews: 1436, hours: "10:00-21:00", price: "¥", tags: ["甜點", "起司塔"], note: "現烤起司塔，有焦糖布蕾和抹茶口味，可看現場炙燒", lat: 34.6719, lng: 135.5012, placeId: "ChIJy22lSRHnAGAROpUG_XYSrck" },
  { name: "Rikuro老爺爺起司蛋糕 難波", nameEn: "Rikuro's Cheesecake", category: "餐廳", area: "大阪", subArea: "難波", rating: 4.2, reviews: 4732, hours: "9:00-20:00", price: "¥", tags: ["必吃", "甜點", "起司蛋糕"], note: "大阪名物輕乳酪蛋糕，剛出爐搖搖晃晃超療癒，排隊名店", lat: 34.6661, lng: 135.5016, placeId: "ChIJK2A0qGznAGARxPHcddHFYYA" },

  // ===== 新增：大阪餐廳 =====
  { name: "一蘭拉麵 道頓堀", nameEn: "Ichiran Dotonbori", category: "餐廳", area: "大阪", subArea: "道頓堀", rating: 4.3, reviews: 8465, hours: "24hr", price: "¥¥", tags: ["拉麵"], note: "24hr營業，單人隔間座位，自訂麵硬度湯濃度辣度", lat: 34.6684, lng: 135.5032, placeId: "ChIJK7TL6RTnAGARYiifaSOuOFM" },

  // ===== 新增：京都景點 =====
  { name: "龍安寺", nameEn: "Ryōan-ji", category: "景點", area: "京都", subArea: "右京", rating: 4.5, reviews: 10829, hours: "8:00-17:00", price: "¥600", tags: ["世界遺產", "枯山水", "寺廟"], note: "世界最有名的枯山水石庭，15塊石頭無法同時看見全部", lat: 35.0345, lng: 135.7183, placeId: "ChIJp7ocMCqoAWARQoXXRj4Xq-E" },
  { name: "三十三間堂", nameEn: "Sanjūsangendō", category: "景點", area: "京都", subArea: "東山", rating: 4.7, reviews: 16316, hours: "9:00-16:00", price: "¥600", tags: ["必去", "寺廟"], note: "120m長堂內1001尊千手觀音像整齊排列，震撼度爆表", lat: 34.9879, lng: 135.7717, placeId: "ChIJs4Cbj8oIAWARiBZl2-sBK6o" },
  { name: "京都御所", nameEn: "Kyoto Imperial Palace", category: "景點", area: "京都", subArea: "上京", rating: 4.6, reviews: 1229, hours: "9:00-15:20（週一二休）", price: "免費", tags: ["歷史", "皇室", "庭園"], note: "免費參觀日本天皇舊居，有英語導覽，御苑公園很大", lat: 35.0241, lng: 135.7621, placeId: "ChIJBemVXAAJAWARhkbj_PO6IHw" },
  { name: "醍醐寺", nameEn: "Daigo-ji", category: "景點", area: "京都", subArea: "伏見", rating: 4.4, reviews: 5653, hours: "9:00-16:30", price: "¥600-1500", tags: ["世界遺產", "紅葉", "櫻花"], note: "五重塔配紅楓倒映池中超美，櫻花季也是名所", lat: 34.9511, lng: 135.8194, placeId: "ChIJuXbdnQ0OAWAROvtsCwR08pA" },
  { name: "天龍寺", nameEn: "Tenryū-ji", category: "景點", area: "京都", subArea: "嵐山", rating: 4.4, reviews: 15959, hours: "8:30-17:00", price: "¥500", tags: ["世界遺產", "庭園", "嵐山"], note: "嵐山最重要寺廟，曹源池庭園借景嵐山群山，如活畫", lat: 35.0158, lng: 135.6738, placeId: "ChIJk54PuAGqAWARwEgz_9o-nM0" },
  { name: "渡月橋", nameEn: "Togetsukyō Bridge", category: "景點", area: "京都", subArea: "嵐山", rating: 4.4, reviews: 4964, hours: "24hr", price: "免費", tags: ["必去", "嵐山", "地標"], note: "嵐山地標古橋，橋上看山景河景都美，日落尤其推薦", lat: 35.0129, lng: 135.6778, placeId: "ChIJd2mRAFMHAWARPSiWJOj4FOw" },
  { name: "嵐山猴子公園", nameEn: "Arashiyama Monkey Park", category: "景點", area: "京都", subArea: "嵐山", rating: 4.5, reviews: 13573, hours: "9:00-16:00", price: "¥800", tags: ["嵐山", "動物", "登山"], note: "需爬山30分鐘，山頂可餵猴子+俯瞰京都全景，很值得", lat: 35.0114, lng: 135.6766, placeId: "ChIJvUn7bqsAAWARsjQHQ7CTNBs" },
  { name: "和服森林（嵐電嵐山站）", nameEn: "Kimono Forest", category: "景點", area: "京都", subArea: "嵐山", rating: 4.2, reviews: 2107, hours: "24hr", price: "免費", tags: ["嵐山", "拍照", "燈光"], note: "600根和服布料燈柱，夜晚點燈超夢幻，免費拍照景點", lat: 35.0153, lng: 135.6784, placeId: "ChIJMTtrxv-pAWAR6eEV1vOC2cY" },
  { name: "哲學之道", nameEn: "Philosopher's Path", category: "景點", area: "京都", subArea: "左京", rating: 4.6, reviews: 2776, hours: "24hr", price: "免費", tags: ["散步", "櫻花"], note: "銀閣寺到南禪寺的2km運河步道，櫻花季粉色隧道極美", lat: 35.0266, lng: 135.7955, placeId: "ChIJV_CUrggJAWAR9IBSpzHzepE" },
  { name: "錦天滿宮", nameEn: "Nishiki Tenmangu", category: "景點", area: "京都", subArea: "中京", rating: 4.3, reviews: 4432, hours: "8:00-20:00", price: "免費", tags: ["神社"], note: "錦市場盡頭的學問之神，順路逛完市場可以來參拜", lat: 35.0050, lng: 135.7673, placeId: "ChIJ2XYZP5QIAWARMTCC19cXwjA" },

  // ===== 新增：京都餐廳 =====
  { name: "Kichi Kichi 蛋包飯", nameEn: "Kichi Kichi Omurice", category: "餐廳", area: "京都", subArea: "河原町", rating: 4.1, reviews: 2283, hours: "17:00-20:10", price: "¥¥¥", tags: ["蛋包飯", "表演"], note: "超難預約的網紅蛋包飯，主廚表演切開蛋皮超療癒", lat: 35.0073, lng: 135.7708, placeId: "ChIJ3UELspQIAWARtJN6BkVE3Zg" },

  // ===== 新增：奈良 =====




  { name: "Spa World 世界大溫泉", nameEn: "Spa World", category: "體驗", area: "大阪", subArea: "新世界", rating: 4.0, reviews: 7553, hours: "24hr", price: "¥1500起", tags: ["溫泉"], note: "超大型溫泉主題樂園，亞洲區和歐洲區每月輪替，有岩盤浴", lat: 34.6499, lng: 135.5056, placeId: "ChIJsR9Zt4rdAGARqlF3kRuWnMI" },

  { name: "貴船神社", nameEn: "Kifune Shrine", category: "景點", area: "京都", subArea: "貴船", rating: 4.5, reviews: 11510, hours: "6:00-18:00", price: "免費", tags: ["神社", "近郊"], note: "紅燈籠石階超夢幻，水占卜必試，夏天有川床流水麵", lat: 35.1221, lng: 135.7629, placeId: "ChIJCZEK8wimAWARi1RkteQaAh0" },
  { name: "鞍馬寺", nameEn: "Kurama-dera", category: "景點", area: "京都", subArea: "鞍馬", rating: 4.6, reviews: 5405, hours: "9:00-16:00", price: "¥500", tags: ["寺廟", "登山", "近郊"], note: "可從鞍馬健行到貴船約1.5hr，森林步道非常療癒，有纜車", lat: 35.1181, lng: 135.7709, placeId: "ChIJnTF3sxKmAWAROIRwRX49KFA" },


  // ===== 新增：熱門打卡/街道景點 =====
  { name: "固力果跑跑人看板", nameEn: "Glico Sign", category: "景點", area: "大阪", subArea: "道頓堀", rating: 4.5, reviews: 17301, hours: "24hr（晚上點燈）", price: "免費", tags: ["必去", "地標", "拍照"], note: "大阪最經典打卡點，戎橋上模仿跑跑人姿勢拍照必做", lat: 34.6689, lng: 135.5011, placeId: "ChIJ6XHOkxTnAGARvyn92D4gWVs" },
  { name: "法善寺橫丁", nameEn: "Hōzen-ji Yokochō", category: "景點", area: "大阪", subArea: "難波", rating: 4.4, reviews: 4189, hours: "24hr", price: "免費", tags: ["老街", "寺廟"], note: "道頓堀旁復古石板小巷，青苔不動明王像潑水祈願超有氣氛", lat: 34.6679, lng: 135.5025, placeId: "ChIJI7QyuRTnAGARU28-XLGEOfU" },
  { name: "道頓堀水上觀光船", nameEn: "Tombori River Cruise", category: "體驗", area: "大阪", subArea: "道頓堀", rating: 4.4, reviews: 2098, hours: "11:00-21:00", price: "¥1000", tags: ["遊船", "夜景"], note: "20分鐘水上遊覽道頓堀霓虹，大阪周遊卡免費，建議晚上搭", lat: 34.6691, lng: 135.5027, placeId: "ChIJ2ySFjBTnAGAR3ngfXW-dwaU" },
  { name: "二年坂・三年坂", nameEn: "Ninenzaka & Sannenzaka", category: "景點", area: "京都", subArea: "東山", rating: 4.5, reviews: 10587, hours: "24hr", price: "免費", tags: ["必去", "老街", "拍照"], note: "通往清水寺的石板坡道老街，兩側町屋超美，有星巴克概念店", lat: 34.9982, lng: 135.7809, placeId: "ChIJlwyrGNAIAWARNb5hUHdZruY" },
  { name: "八坂庚申堂", nameEn: "Yasaka Kōshin-dō", category: "景點", area: "京都", subArea: "東山", rating: 4.3, reviews: 2653, hours: "9:00-17:00", price: "免費", tags: ["必去", "拍照", "IG打卡"], note: "彩色猴子許願球超夢幻，穿和服來拍IG爆紅打卡聖地", lat: 34.9983, lng: 135.7787, placeId: "ChIJ6fuSfMUIAWAR-kwXbOvpNZg" },
  { name: "平安神宮", nameEn: "Heian Shrine", category: "景點", area: "京都", subArea: "左京", rating: 4.4, reviews: 15495, hours: "6:00-17:00", price: "免費（神苑¥600）", tags: ["神社", "庭園"], note: "巨大紅色鳥居地標，神苑庭園櫻花季超美值得付費", lat: 35.0160, lng: 135.7824, placeId: "ChIJjch8GOUIAWART0WX2JLZvnU" },
  { name: "下鴨神社", nameEn: "Shimogamo Shrine", category: "景點", area: "京都", subArea: "左京", rating: 4.5, reviews: 14654, hours: "6:00-17:00", price: "免費", tags: ["世界遺產", "神社"], note: "糺之森原始林環繞，12生肖小祠各別參拜，水占卜很特別", lat: 35.0390, lng: 135.7730, placeId: "ChIJf438RkAIAWARzM3lfzI7uAM" },

  // ===== 新增：餐廳 =====
  { name: "道頓堀今井 烏龍麵", nameEn: "Dotonbori Imai Udon", category: "餐廳", area: "大阪", subArea: "道頓堀", rating: 4.3, reviews: 2516, hours: "11:30-21:00（週三休）", price: "¥¥", tags: ["烏龍麵"], note: "大阪老字號，狐烏龍麵（油豆腐）招牌必點，免費抹茶", lat: 34.6686, lng: 135.5027, placeId: "ChIJBYsUkxTnAGARg1G8qmcdWf8" },

  // ===== 補遺：高評論數遺漏景點 =====
  { name: "大阪城公園", nameEn: "Osaka Castle Park", category: "景點", area: "大阪", subArea: "中央區", rating: 4.4, reviews: 49082, hours: "24hr", price: "免費", tags: ["公園", "櫻花", "散步"], note: "大阪城周圍的超大型公園，四季都美，櫻花季名所", lat: 34.6865, lng: 135.5262, placeId: "ChIJVVVld8ngAGARi9mE-a6e9mc" },
  { name: "HEP FIVE 摩天輪", nameEn: "HEP FIVE Ferris Wheel", category: "景點", area: "大阪", subArea: "梅田", rating: 4.4, reviews: 6700, hours: "11:00-22:45", price: "¥600", tags: ["摩天輪", "夜景"], note: "梅田百貨屋頂紅色摩天輪，車廂有藍牙喇叭可放音樂", lat: 34.7038, lng: 135.5000, placeId: "ChIJAQDAo5PmAGARcMqvnh2Reqs" },
  { name: "泡麵發明紀念館", nameEn: "Cup Noodles Museum", category: "景點", area: "大阪", subArea: "池田", rating: 4.4, reviews: 11848, hours: "9:30-16:30（週二休）", price: "免費（體驗另計）", tags: ["博物館", "親子"], note: "免費入館！可自己設計杯麵包裝選配料¥500，池田站步行5分", lat: 34.8179, lng: 135.4266, placeId: "ChIJp2oJD8bwAGARqttJH_AeWA4" },
  { name: "三年坂（產寧坂）", nameEn: "Sannenzaka", category: "景點", area: "京都", subArea: "東山", rating: 4.4, reviews: 15991, hours: "24hr", price: "免費", tags: ["必去", "老街", "拍照"], note: "法觀寺五重塔配町屋街景是京都最經典構圖，日落最美", lat: 34.9967, lng: 135.7810, placeId: "ChIJr_gZonkIAWARB1xyACZNUKM" },
  { name: "法觀寺（八坂塔）", nameEn: "Yasaka Pagoda", category: "景點", area: "京都", subArea: "東山", rating: 4.6, reviews: 5376, hours: "僅週六日10:00-15:00", price: "¥400", tags: ["必去", "地標", "拍照"], note: "東山最經典的五重塔地標，從三年坂拍過去超美", lat: 34.9986, lng: 135.7792, placeId: "ChIJIcT4YMUIAWARSTUi4EEky7E" },
  { name: "建仁寺", nameEn: "Kennin-ji", category: "景點", area: "京都", subArea: "祗園", rating: 4.5, reviews: 9143, hours: "10:00-16:30", price: "¥600", tags: ["寺廟", "枯山水"], note: "京都最古老禪寺，法堂天花板雙龍圖超震撼，花見小路旁", lat: 35.0000, lng: 135.7736, placeId: "ChIJJ3srJMEIAWARUrvFhhmPYH4" },
  { name: "常寂光寺", nameEn: "Jōjakko-ji", category: "景點", area: "京都", subArea: "嵐山", rating: 4.6, reviews: 3349, hours: "9:00-16:30", price: "¥500", tags: ["嵐山", "紅葉", "寺廟"], note: "嵐山山腰的紅葉名所，苔蘚庭園超美，可俯瞰京都全景", lat: 35.0198, lng: 135.6686, placeId: "ChIJHw9S2xqqAWARqO_fgtu1Nz4" },
  { name: "中之島公園", nameEn: "Nakanoshima Park", category: "景點", area: "大阪", subArea: "中之島", rating: 4.2, reviews: 6248, hours: "24hr", price: "免費", tags: ["公園", "散步", "夜景"], note: "夾在兩條河間的都會綠洲，冬季有燈光秀，玫瑰園很美", lat: 34.6925, lng: 135.5073, placeId: "ChIJPXiMg97mAGARsiccqVj_Os8" },
  { name: "京都國立博物館", nameEn: "Kyoto National Museum", category: "景點", area: "京都", subArea: "東山", rating: 4.3, reviews: 7986, hours: "9:30-17:00（週一休）", price: "¥700", tags: ["博物館"], note: "國寶級佛像刀劍收藏，紅磚明治建築本身就很美", lat: 34.9900, lng: 135.7731, placeId: "ChIJt1kBRcoIAWAR00msugECEYw" },

  // ===== 補遺：高評論數遺漏（購物/餐廳）=====
  { name: "阪急百貨 梅田本店", nameEn: "Hankyu Dept Store Umeda", category: "購物", area: "大阪", subArea: "梅田", rating: 4.2, reviews: 36417, hours: "10:00-20:00", price: "免費", tags: ["百貨", "購物", "美食"], note: "梅田地標百貨，地下美食街超強，有獨立設計師pop-up和伴手禮", lat: 34.7028, lng: 135.4985, placeId: "ChIJ67mcWJLmAGARrUf0FlFtm7w" },
  { name: "牛カツ京都勝牛 先斗町本店", nameEn: "Gyukatsu Katsugyu Pontocho", category: "餐廳", area: "京都", subArea: "先斗町", rating: 4.8, reviews: 8798, hours: "11:00-22:30", price: "¥¥", tags: ["必吃", "炸牛排"], note: "京都超人氣炸牛排，自己在石板上烤到喜歡熟度，先斗町小巷氛圍棒", lat: 35.0070, lng: 135.7710, placeId: "ChIJt3Q_tZQIAWARhnwJ7t1qjU0" },
  { name: "牛カツ京都勝牛 寺町京極", nameEn: "Gyukatsu Katsugyu Teramachi", category: "餐廳", area: "京都", subArea: "河原町", rating: 4.8, reviews: 10155, hours: "10:00-22:30", price: "¥¥", tags: ["必吃", "炸牛排"], note: "同品牌寺町分店，評論數更多，抹茶啤酒很特別", lat: 35.0054, lng: 135.7669, placeId: "ChIJF4sjAAEJAWAR_px5vQ7vcOE" },
  { name: "京都 ENGINE 拉麵", nameEn: "Kyoto Engine Ramen", category: "餐廳", area: "京都", subArea: "河原町", rating: 4.5, reviews: 3764, hours: "12:00-22:30", price: "¥¥", tags: ["拉麵", "素食友善"], note: "素食/無麩質友善拉麵名店，錦市場附近，排隊值得", lat: 35.0045, lng: 135.7675, placeId: "ChIJWwNkMLoJAWAR7chswFIMOEI" },
  { name: "Sushi Fukushima", nameEn: "Sushi Fukushima", category: "餐廳", area: "大阪", subArea: "福島", rating: 4.9, reviews: 1335, hours: "18:00-23:00（週六日有午餐）", price: "¥¥¥", tags: ["壽司", "Omakase"], note: "表演型壽司omakase，主廚超有趣會扮裝，融合創意壽司", lat: 34.6943, lng: 135.4878, placeId: "ChIJfzaNbQDnAGARrUgx-dzqWfY" },
  { name: "Gyōza-Oh! 道頓堀", nameEn: "Gyozaoh Dotonbori", category: "餐廳", area: "大阪", subArea: "道頓堀", rating: 4.5, reviews: 1397, hours: "17:00-23:00", price: "¥", tags: ["餃子", "居酒屋"], note: "道頓堀人氣餃子居酒屋，有素食選項，清酒flight很讚", lat: 34.6687, lng: 135.4981, placeId: "ChIJF0VbPRLnAGARcb1Qvy9u4gg" },

  // ===== 補遺：市場/商店街 =====
  { name: "千日前道具屋筋商店街", nameEn: "Doguyasuji Shopping Street", category: "市場", area: "大阪", subArea: "難波", rating: 4.2, reviews: 6074, hours: "10:00-18:00", price: "免費", tags: ["廚具", "購物"], note: "廚房用品天堂！日本刀、陶器、食品模型應有盡有，料理控必逛", lat: 34.6640, lng: 135.5035, placeId: "ChIJfQfezmvnAGARy4Sd3VGFy_A" },
  { name: "生野コリアタウン", nameEn: "Ikuno Korea Town", category: "市場", area: "大阪", subArea: "生野", rating: 4.0, reviews: 8301, hours: "10:00-18:00", price: "免費", tags: ["韓國街", "美食"], note: "日本最大韓國街，韓式炸雞起司熱狗、泡菜、韓系美妝", lat: 34.6606, lng: 135.5379, placeId: "ChIJpzeHBqngAGARO5rRomWgEP8" },
  { name: "ジャンジャン横丁", nameEn: "Janjan Yokocho", category: "市場", area: "大阪", subArea: "新世界", rating: 4.1, reviews: 1771, hours: "10:00-20:00", price: "免費", tags: ["懷舊", "美食街"], note: "新世界旁的昭和風商店街，串炸+將棋+射的，超在地庶民氛圍", lat: 34.6492, lng: 135.5060, placeId: "ChIJ-5_CtYrdAGARtbanSXYA76Y" },
  { name: "新世界市場", nameEn: "Shinsekai Market", category: "市場", area: "大阪", subArea: "新世界", rating: 4.2, reviews: 1233, hours: "店家各異", price: "免費", tags: ["懷舊", "在地"], note: "通天閣旁的復古商店街，近年有藝術家進駐活化，很有味道", lat: 34.6537, lng: 135.5056, placeId: "ChIJx6sIjmDnAGAR6MZeGdLQCi0" },

  // ===== 補遺：高評論景點（神社/寺廟）=====
  { name: "東寺", nameEn: "Tō-ji Temple", category: "景點", area: "京都", subArea: "南區", rating: 4.5, reviews: 18745, hours: "8:00-17:00", price: "¥500", tags: ["世界遺產", "寺廟", "市集"], note: "日本最高五重塔，每月21號有弘法市集（跳蚤市場）超好逛", lat: 34.9803, lng: 135.7477, placeId: "ChIJTar7hQQGAWAREHkXsNkt7tM" },
  { name: "北野天滿宮", nameEn: "Kitano Tenmangu", category: "景點", area: "京都", subArea: "上京", rating: 4.4, reviews: 16229, hours: "7:00-20:00", price: "免費", tags: ["神社", "市集", "梅花"], note: "學問之神，每月25號有天神市集，2月梅花季超美", lat: 35.0312, lng: 135.7351, placeId: "ChIJbeDwe-0HAWARGu4ubMH-Jls" },

  // ===== 補遺：體驗項目 =====
  { name: "大阪水上巴士 Aqua-Liner", nameEn: "Osaka Aqua-Liner", category: "體驗", area: "大阪", subArea: "大阪城", rating: 4.2, reviews: 1011, hours: "10:00-16:00", price: "¥1600", tags: ["遊船", "大阪城"], note: "55分鐘環繞大阪城護城河＋中之島，有多語導覽，大阪周遊卡免費", lat: 34.6896, lng: 135.5330, placeId: "ChIJPajH28_gAGARoxHsReGrEMw" },
  { name: "帆船型觀光船 Santa Maria", nameEn: "Santa Maria Cruise", category: "體驗", area: "大阪", subArea: "天保山", rating: 4.3, reviews: 1377, hours: "11:00-16:00", price: "¥1600", tags: ["遊船", "港灣"], note: "哥倫布帆船造型，45分鐘大阪港灣遊覽，日落時段最美，大阪周遊卡免費", lat: 34.6549, lng: 135.4284, placeId: "ChIJz9jJqvToAGARL5QBJbkhTWA" },
  { name: "鞍馬溫泉", nameEn: "Kurama Onsen", category: "體驗", area: "京都", subArea: "鞍馬", rating: 4.3, reviews: 1574, hours: "11:00-19:00", price: "¥1500", tags: ["溫泉", "山景"], note: "京都近郊露天溫泉，被山林環繞超療癒，可搭配鞍馬寺健行後泡湯", lat: 35.1192, lng: 135.7766, placeId: "ChIJw7KtiW6mAWARuJlq1RoAhlY" },
  { name: "嵐山竹林小徑", nameEn: "Arashiyama Bamboo Grove", category: "體驗", area: "京都", subArea: "嵐山", rating: 4.3, reviews: 20633, hours: "24hr", price: "免費", tags: ["必去", "自然", "拍照"], note: "高聳竹林隧道超夢幻，建議清晨8點前去才能拍到空景", lat: 35.0168, lng: 135.6713, placeId: "ChIJrYtcv-urAWAR3XzWvXv8n_s" },
  { name: "難波八阪神社", nameEn: "Namba Yasaka Shrine", category: "景點", area: "大阪", subArea: "難波", rating: 4.5, reviews: 14090, hours: "6:30-17:00", price: "免費", tags: ["必去", "神社", "拍照"], note: "巨大獅子頭舞台超震撼！吞噬厄運帶來勝運，打卡必訪", lat: 34.6616, lng: 135.4967, placeId: "ChIJQVW9eXLnAGARn-pUdRl0w4A" },
  { name: "吉城園", nameEn: "Yoshikien Garden", category: "景點", area: "奈良", subArea: "奈良公園", rating: 4.6, reviews: 1111, hours: "9:00-17:00", price: "免費", tags: ["庭園", "苔蘚"], note: "外國人免費！三種風格日式庭園（池泉/苔蘚/茶花），東大寺旁的隱藏版", lat: 34.6855, lng: 135.8363, placeId: "ChIJVVXR5I85AWARNCgUmaCemHE" },
  { name: "依水園", nameEn: "Isuien Garden", category: "景點", area: "奈良", subArea: "奈良公園", rating: 4.5, reviews: 1265, hours: "9:30-16:00（週二休）", price: "¥1200", tags: ["庭園", "借景"], note: "奈良唯一迴遊式庭園，以東大寺南大門和若草山為借景，美到不真實", lat: 34.6860, lng: 135.8372, placeId: "ChIJc31a-Y85AWARo70kM5pXEVo" },

  // ===== 補遺：KKday/Klook 活動體驗分類 =====

  // 🏎️ 卡丁車
  { name: "Street Kart Osaka", nameEn: "Street Kart Osaka", category: "體驗", area: "大阪", subArea: "南堀江", rating: 4.8, reviews: 1143, hours: "12:00-21:00", price: "¥8000起", tags: ["卡丁車", "Cosplay"], note: "穿Cosplay服裝開卡丁車上大阪街頭！需國際駕照，超人氣體驗", lat: 34.6717, lng: 135.4943, placeId: "ChIJg4FzwRTmAGARuhguMMvLKfc" },

  // 💆 按摩 / Spa
  { name: "HEAD SPA Kuu 心齋橋", nameEn: "HEAD SPA Kuu Shinsaibashi", category: "體驗", area: "大阪", subArea: "心齋橋", rating: 5.0, reviews: 2831, hours: "10:00-21:00", price: "¥6000起", tags: ["頭皮Spa", "放鬆"], note: "5.0滿分！超人氣頭皮Spa，療程後提供抹茶，旅途疲勞救星", lat: 34.6729, lng: 135.4999, placeId: "ChIJ0SHaFB7nAGARpnQO-aoL6P8" },
  { name: "空庭溫泉 Solaniwa Onsen", nameEn: "Solaniwa Onsen", category: "體驗", area: "大阪", subArea: "弁天町", rating: 3.9, reviews: 4742, hours: "11:00-23:00", price: "¥1500起", tags: ["溫泉", "Spa", "親子"], note: "大阪市區最大日式溫泉主題樂園，可穿浴衣逛安土桃山風街道，有私湯", lat: 34.6704, lng: 135.4595, placeId: "ChIJh2z_4A3nAGARROaafpvGXBQ" },

  // 🎮 室內遊戲
  { name: "Round1 千日前", nameEn: "Round1 Sennichimae", category: "體驗", area: "大阪", subArea: "難波", rating: 3.7, reviews: 5341, hours: "24hr", price: "¥2000起", tags: ["室內遊戲", "保齡球"], note: "超大型室內娛樂中心！保齡球/溜冰/卡丁車/打擊練習/太鼓達人全包", lat: 34.6675, lng: 135.5029, placeId: "ChIJqU3TtxTnAGARbMBactGzXDM" },
  { name: "LEGOLAND Discovery Center", nameEn: "LEGOLAND Discovery Osaka", category: "體驗", area: "大阪", subArea: "天保山", rating: 4.1, reviews: 4451, hours: "10:00-18:00", price: "¥2400", tags: ["親子", "室內遊戲"], note: "天保山的室內樂高樂園，4D電影+小型設施+積木區，雨天親子好去處", lat: 34.6562, lng: 135.4302, placeId: "ChIJU5PSWfPoAGAR1FoZsqOtuu0" },

  // 🏯 主題樂園 / 歷史古蹟
  { name: "東映太秦映畫村", nameEn: "Toei Kyoto Studio Park", category: "體驗", area: "京都", subArea: "太秦", rating: 4.0, reviews: 10286, hours: "10:00-17:00", price: "¥2400", tags: ["主題樂園", "忍者"], note: "江戶時代佈景時代劇片場！忍者體驗、鬼屋、EVA/火影展，嵐山順路", lat: 35.0165, lng: 135.7080, placeId: "ChIJufvfOHEHAWARZ5Yd1oEIuis" },

  // 🎤 演出 & 音樂劇
  { name: "難波花月劇場", nameEn: "Namba Grand Kagetsu", category: "體驗", area: "大阪", subArea: "難波", rating: 4.3, reviews: 18107, hours: "表演場次制", price: "¥4500起", tags: ["搞笑", "表演"], note: "吉本興業大阪搞笑表演聖地！日語為主但肢體搞笑也能感受關西笑點", lat: 34.6650, lng: 135.5037, placeId: "ChIJ5wIvqWvnAGAR5SLNzOrilQE" },

  // 🦌 奈良景點補充
  { name: "若草山", nameEn: "Wakakusayama Hill", category: "景點", area: "奈良", subArea: "奈良公園", rating: 4.5, reviews: 1570, hours: "9:00-17:00（3-12月）", price: "¥150", tags: ["自然", "展望"], note: "可俯瞰整個奈良市的小山丘，山頂有鹿和超美景色，爬30分鐘", lat: 34.6900, lng: 135.8539, placeId: "ChIJjVRjzbs5AWAR8QYRWah8aB8" },

  // ===== 京都餐廳（大補齊）=====
  { name: "拉麵MURAJI", nameEn: "Ramen Muraji", category: "餐廳", area: "京都", subArea: "河原町", rating: 4.6, reviews: 4250, hours: "11:30-22:00", price: "¥¥", tags: ["拉麵", "町家"], note: "京町家改裝的雞白湯拉麵，白湯濃郁清爽，檸檬拉麵超特別", lat: 35.0071, lng: 135.7639, placeId: "ChIJRe4VdeoIAWARdODM6PBbZuM" },
  { name: "麵屋猪一", nameEn: "Menya Inoichi", category: "餐廳", area: "京都", subArea: "四條", rating: 4.4, reviews: 3688, hours: "11:00-14:30/17:30-21:00", price: "¥¥", tags: ["拉麵", "排隊名店"], note: "京都No.1醬油拉麵，出汁湯頭清澈鮮美，要先抽整理券", lat: 35.0013, lng: 135.7670, placeId: "ChIJufyODr4IAWARNVu7xBbRG2w" },
  { name: "中華そば らんたん", nameEn: "Chuka-Soba Rantan", category: "餐廳", area: "京都", subArea: "河原町", rating: 4.8, reviews: 1976, hours: "11:00-15:00/17:00-22:00", price: "¥¥", tags: ["拉麵"], note: "濃厚系拉麵，湯頭超級濃郁，辣味可選等級，女性主廚", lat: 35.0096, lng: 135.7707, placeId: "ChIJIRBJooAJAWARWCSHZcjk2bU" },
  { name: "嵯峨野湯豆腐", nameEn: "Yudofu Sagano", category: "餐廳", area: "京都", subArea: "嵐山", rating: 4.3, reviews: 1188, hours: "11:00-17:30", price: "¥¥", tags: ["豆腐", "素食"], note: "嵐山竹林旁的湯豆腐名店，日式庭園環境，全素食套餐，很京都", lat: 35.0144, lng: 135.6745, placeId: "ChIJ-Q01TwCqAWARfC2BdiI9UDI" },
  { name: "壽司 成田屋 嵐山", nameEn: "Sushi Naritaya Arashiyama", category: "餐廳", area: "京都", subArea: "嵐山", rating: 4.8, reviews: 1256, hours: "11:00-15:00（週三四休）", price: "¥¥", tags: ["壽司", "限量"], note: "嵐山隱藏版壽司，每日限量供應，肥鮪魚超新鮮，要早到", lat: 35.0145, lng: 135.6771, placeId: "ChIJ_9MP7_-pAWARqO1zf37pAIA" },
  { name: "壽司 喜左衛門 先斗町", nameEn: "Sushi Kizaemon", category: "餐廳", area: "京都", subArea: "先斗町", rating: 4.6, reviews: 1446, hours: "17:00-21:30", price: "¥¥", tags: ["壽司", "先斗町"], note: "先斗町的人氣壽司，鰻魚和鮪魚推薦，有素食/無麩質標示", lat: 35.0045, lng: 135.7711, placeId: "ChIJsfHwAE8JAWAR6SMDiGTqKxw" },
  { name: "伏見清酒小鎮", nameEn: "Fushimi Sake Village", category: "餐廳", area: "京都", subArea: "伏見", rating: 4.2, reviews: 2644, hours: "11:00-22:00", price: "¥¥", tags: ["清酒", "美食街"], note: "18種清酒品飲體驗＋多間美食攤位，伏見酒藏區必訪", lat: 34.9325, lng: 135.7606, placeId: "ChIJRwOaco4PAWARzaIhH6-kLG8" },

  // ===== 京都購物（從0開始）=====
  { name: "京都車站大樓", nameEn: "Kyoto Station Building", category: "購物", area: "京都", subArea: "京都站", rating: 4.1, reviews: 19404, hours: "10:00-19:00（餐廳至22:00）", price: "免費", tags: ["購物", "伴手禮", "美食"], note: "京都地標建築！地下美食街+空中迴廊+拉麵小路+伴手禮一站搞定", lat: 34.9860, lng: 135.7590, placeId: "ChIJT5NvX64IAWARRtnsQ_oAekY" },

  // ===== 京都體驗（補齊）=====
  { name: "和服租借 岡本 祇園店", nameEn: "Kimono Okamoto Gion", category: "體驗", area: "京都", subArea: "祇園", rating: 4.9, reviews: 1235, hours: "9:00-18:00", price: "¥4000起", tags: ["和服", "拍照"], note: "京都最老牌和服租借，祇園店走路到清水寺/八坂塔超方便", lat: 35.0017, lng: 135.7807, placeId: "ChIJs-BVzcQIAWARecr0-HpQs38" },
  { name: "和服租借 Aiwafuku 祇園四條", nameEn: "Aiwafuku Kimono Gion", category: "體驗", area: "京都", subArea: "祇園", rating: 5.0, reviews: 1309, hours: "9:00-18:00", price: "¥3500起", tags: ["和服", "拍照"], note: "5.0滿分！含編髮服務，款式多價格親民，河原町站走路3分", lat: 35.0045, lng: 135.7729, placeId: "ChIJrygo2mIRAWAR3zMIQ1cq3Ik" },

  // ===== 大阪購物/景點（補齊）=====
  { name: "日本橋電電城", nameEn: "Denden Town", category: "購物", area: "大阪", subArea: "日本橋", rating: 4.2, reviews: 8900, hours: "11:00-19:00", price: "免費", tags: ["動漫", "電玩", "公仔"], note: "大阪版秋葉原！動漫模型/復古遊戲/扭蛋/女僕咖啡，宅宅天堂", lat: 34.6604, lng: 135.5059, placeId: "ChIJv6w_-2fnAGARH2p9wbwos3c" },
  { name: "美國村", nameEn: "Amerikamura", category: "購物", area: "大阪", subArea: "心齋橋", rating: 3.9, reviews: 2678, hours: "店家各異", price: "免費", tags: ["古著", "潮流"], note: "大阪年輕人潮流聖地，古著店密集、街頭塗鴉、二手名牌，像原宿", lat: 34.6722, lng: 135.4979, placeId: "ChIJ7_ZM7hHnAGARvBkV-jqyz24" },

  // ===== 神戶景點 =====
  { name: "神戶港塔", nameEn: "Kobe Port Tower", category: "景點", area: "神戶", subArea: "港區", rating: 4.2, reviews: 10997, hours: "9:00-23:00", price: "¥1200", tags: ["觀景台", "地標"], note: "神戶地標紅色鼓型塔，頂樓360度港灣夜景超美，有屋頂平台", lat: 34.6826, lng: 135.1867, placeId: "ChIJweTiKACPAGARgqyoB9hC7rc" },
  { name: "美利堅公園", nameEn: "Meriken Park", category: "景點", area: "神戶", subArea: "港區", rating: 4.3, reviews: 11905, hours: "24hr", price: "免費", tags: ["公園", "夜景", "港灣"], note: "神戶港灣最美散步區，有震災遺跡、BE KOBE地標、面海草坪", lat: 34.6823, lng: 135.1886, placeId: "ChIJZVMziP-OAGAR11WzVqBbDIQ" },
  { name: "神戶港 Harborland", nameEn: "Kobe Harborland", category: "景點", area: "神戶", subArea: "港區", rating: 4.3, reviews: 11037, hours: "10:00-21:00", price: "免費", tags: ["購物", "夜景"], note: "神戶港灣購物娛樂區，摩天輪+umie百貨+紅倉庫，夜景必訪", lat: 34.6801, lng: 135.1835, placeId: "ChIJD5fHbgePAGARpXshMiA87rA" },
  { name: "北野異人館街", nameEn: "Kitano Ijinkan-Gai", category: "景點", area: "神戶", subArea: "北野", rating: 4.1, reviews: 5398, hours: "9:00-17:00", price: "¥500-2000", tags: ["歷史建築", "散步"], note: "明治時期外國商人洋房群，歐風建築很好拍，有特色星巴克", lat: 34.7007, lng: 135.1908, placeId: "ChIJT6cViuCOAGARegX_ORkvbs0" },

  // ===== 神戶餐廳（神戶牛）=====
  { name: "Steakland 神戶館", nameEn: "Steakland Kobe", category: "餐廳", area: "神戶", subArea: "三宮", rating: 4.0, reviews: 9136, hours: "11:00-14:00/17:00-21:00", price: "¥¥¥", tags: ["神戶牛", "鐵板燒"], note: "CP值最高的正宗神戶牛鐵板燒，午餐套餐超划算，排隊名店", lat: 34.6930, lng: 135.1917, placeId: "ChIJVVUFoeSOAGAR4_Sbxs2rOzs" },
  { name: "神戶牛 KOJYU", nameEn: "Kobe Beef KOJYU", category: "餐廳", area: "神戶", subArea: "三宮", rating: 4.9, reviews: 2953, hours: "11:00-22:00", price: "¥¥¥¥", tags: ["神戶牛", "鐵板燒"], note: "4.9分！A5神戶牛鐵板燒，廚師表演精彩，CP值高於其他高檔店", lat: 34.6928, lng: 135.1912, placeId: "ChIJXf_JXeOOAGAR4Ll5qg7NJRM" },
  { name: "神戶牛 Mouriya 本店", nameEn: "Kobe Beef Mouriya", category: "餐廳", area: "神戶", subArea: "三宮", rating: 4.8, reviews: 1633, hours: "11:00-21:00（週三休）", price: "¥¥¥¥", tags: ["神戶牛", "鐵板燒"], note: "神戶最老牌牛排名店，冠軍牛等級，入口即化的頂級體驗", lat: 34.6928, lng: 135.1916, placeId: "ChIJrWavoOSOAGARAaIY1inbO1k" },
  { name: "神戶牛 石田屋 本店", nameEn: "Kobe Beef Ishida", category: "餐廳", area: "神戶", subArea: "三宮", rating: 4.8, reviews: 1884, hours: "11:30-15:00/17:00-21:30", price: "¥¥¥¥", tags: ["神戶牛", "鐵板燒"], note: "高評價神戶牛鐵板燒，廚師功力一流，需預約", lat: 34.6942, lng: 135.1925, placeId: "ChIJn-7FjeSOAGARmnYsKmm2xGM" },
  { name: "神戶 Mosaic 摩天輪", nameEn: "Mosaic Ferris Wheel", category: "體驗", area: "神戶", subArea: "港區", rating: 4.3, reviews: 1546, hours: "10:00-22:00", price: "¥800", tags: ["摩天輪", "夜景"], note: "神戶港灣摩天輪，夜間彩虹燈光，可看到港塔+海景，15分鐘", lat: 34.6787, lng: 135.1852, placeId: "ChIJe_sJ76qPAGARXM225Morc5I" },

  // ===== 神戶南京町 =====
  { name: "南京町中華街", nameEn: "Kobe Nankinmachi", category: "市場", area: "神戶", subArea: "元町", rating: 3.9, reviews: 23528, hours: "店家各異", price: "免費", tags: ["中華街", "美食街"], note: "日本三大中華街之一！小籠包/肉包/北京烤鴨，邊走邊吃氛圍好", lat: 34.6882, lng: 135.1881, placeId: "ChIJkaqwvf2OAGARARl_1gEYbx0" },

  // ===== 神戶追加 =====
  { name: "布引香草園＋纜車", nameEn: "Nunobiki Herb Garden & Ropeway", category: "體驗", area: "神戶", subArea: "北野", rating: 4.5, reviews: 6168, hours: "9:30-16:45", price: "¥2000", tags: ["纜車", "花園", "展望"], note: "新神戶站搭纜車上山，俯瞰神戶港灣超美，薰衣草花園很療癒", lat: 34.7044, lng: 135.1939, placeId: "ChIJWapiVtGOAGARVY9nvX-kXII" },
  { name: "有馬溫泉 金之湯", nameEn: "Arima Onsen Kin no Yu", category: "體驗", area: "神戶", subArea: "有馬", rating: 4.0, reviews: 4453, hours: "8:00-22:00", price: "¥800", tags: ["溫泉"], note: "日本三大古湯！鐵鏽色「金泉」很特別，門口有免費足湯", lat: 34.7968, lng: 135.2479, placeId: "ChIJb65UH0KKAGARz_AgIriHO4E" },
  { name: "生田神社", nameEn: "Ikuta Shrine", category: "景點", area: "神戶", subArea: "三宮", rating: 4.3, reviews: 11811, hours: "7:00-17:00", price: "免費", tags: ["神社", "戀愛"], note: "神戶最古老神社，求戀愛運很靈驗，三宮站走路5分鐘", lat: 34.6947, lng: 135.1907, placeId: "ChIJweCflOOOAGARSAhXB35rPCY" },
  { name: "布引瀑布", nameEn: "Nunobiki Falls", category: "景點", area: "神戶", subArea: "新神戶", rating: 4.5, reviews: 1781, hours: "24hr", price: "免費", tags: ["瀑布", "健行"], note: "日本百大瀑布！新神戶站走15分鐘就到，都市秘境", lat: 34.7097, lng: 135.1938, placeId: "ChIJO45pYNqOAGAR4vmoQHxzRgg" },
  { name: "六甲山 Garden Terrace", nameEn: "Rokko Garden Terrace", category: "景點", area: "神戶", subArea: "六甲山", rating: 4.1, reviews: 6721, hours: "9:30-18:00（週末至20:00）", price: "免費", tags: ["展望", "夜景"], note: "六甲山頂觀景台，千萬夜景！可搭纜車到有馬溫泉", lat: 34.7644, lng: 135.2476, placeId: "ChIJlQY4YL6LAGAR4UVwBYhDgbo" },
  { name: "神戶震災紀念公園", nameEn: "Earthquake Memorial Park", category: "景點", area: "神戶", subArea: "港區", rating: 4.2, reviews: 1892, hours: "24hr", price: "免費", tags: ["紀念", "歷史"], note: "保留1995年阪神大地震崩塌的碼頭原貌，很有教育意義", lat: 34.6837, lng: 135.1901, placeId: "ChIJp5aaE_-OAGARR1fFoIAIfQE" },
  { name: "三宮中心街", nameEn: "Sannomiya Center Gai", category: "購物", area: "神戶", subArea: "三宮", rating: 3.9, reviews: 3152, hours: "10:00-21:00", price: "免費", tags: ["購物", "商店街"], note: "神戶最熱鬧商店街，國際品牌+在地小店，三宮站直結", lat: 34.6922, lng: 135.1946, placeId: "ChIJzTIY6PqOAGARCO1VPdaTst4" },
  { name: "元町商店街", nameEn: "Motomachi Shopping Street", category: "購物", area: "神戶", subArea: "元町", rating: 3.9, reviews: 1173, hours: "店家各異", price: "免費", tags: ["購物", "在地"], note: "南京町旁的老商店街，藥妝/雜貨/咖啡，比三宮更有在地感", lat: 34.6881, lng: 135.1864, placeId: "ChIJ-8xjmQKPAGARLnD-uksTTOo" },
  { name: "白鶴酒造資料館", nameEn: "Hakutsuru Sake Museum", category: "體驗", area: "神戶", subArea: "灘", rating: 4.3, reviews: 2637, hours: "9:30-16:30", price: "免費", tags: ["清酒", "博物館"], note: "免費參觀＋免費試飲！了解清酒釀造過程，限定酒款必買", lat: 34.7101, lng: 135.2617, placeId: "ChIJ0UhU3WyPAGAR_XhJ6p0MBos" },
  { name: "神戶酒心館", nameEn: "Kobe Shushinkan", category: "體驗", area: "神戶", subArea: "灘", rating: 4.1, reviews: 2367, hours: "10:00-18:30", price: "免費", tags: ["清酒", "試飲"], note: "灘區酒藏巡禮必訪，免費導覽＋試飲，氣泡清酒很驚艷", lat: 34.7097, lng: 135.2485, placeId: "ChIJLT9UskyMAGARd29rrqJvjQ4" },

  // ===== 奈良追加 =====
  { name: "奈良公園", nameEn: "Nara Park", category: "景點", area: "奈良", subArea: "奈良公園", rating: 4.6, reviews: 71437, hours: "24hr", price: "免費", tags: ["必去", "小鹿", "世界遺產"], note: "超過1000頭野生鹿！買鹿仙貝¥200餵食，春櫻秋楓都超美", lat: 34.6850, lng: 135.8430, placeId: "ChIJYWCMvZY5AWARVnREV_OsbPk" },
  { name: "東大寺", nameEn: "Todai-ji", category: "景點", area: "奈良", subArea: "奈良公園", rating: 4.7, reviews: 29911, hours: "7:30-17:30", price: "¥600", tags: ["必去", "世界遺產", "大佛"], note: "世界最大木造建築！15公尺高大佛超震撼，鑽柱洞求好運", lat: 34.6890, lng: 135.8398, placeId: "ChIJ3XYIepA5AWARjzzVnT-skPg" },
  { name: "春日大社", nameEn: "Kasuga Taisha", category: "景點", area: "奈良", subArea: "奈良公園", rating: 4.5, reviews: 14416, hours: "7:00-17:00", price: "¥500", tags: ["必去", "世界遺產", "神社"], note: "千年石燈籠參道超夢幻，萬燈籠活動（2月/8月）必看", lat: 34.6815, lng: 135.8485, placeId: "ChIJ1Wqwa8A5AWARlpXjgoPnl0w" },
  { name: "法隆寺", nameEn: "Horyu-ji", category: "景點", area: "奈良", subArea: "斑鳩", rating: 4.5, reviews: 7499, hours: "8:00-16:30", price: "¥1500", tags: ["世界遺產", "佛寺"], note: "世界最古老木造建築群！1400年歷史五重塔，奈良站搭JR 15分", lat: 34.6147, lng: 135.7342, placeId: "ChIJT4_DYfUvAWAR_NviFfadTOk" },
  { name: "中谷堂 麻糬", nameEn: "Nakatanidou", category: "餐廳", area: "奈良", subArea: "三條通", rating: 4.3, reviews: 5865, hours: "10:00-18:00（週二休）", price: "¥", tags: ["麻糬", "表演"], note: "超高速搗麻糬表演超吸睛！現搗艾草麻糬軟Q好吃，奈良必吃", lat: 34.6819, lng: 135.8289, placeId: "ChIJmzwHEog5AWARiML9vXtSFso" },

  // ===== 姬路 =====
  { name: "姬路城", nameEn: "Himeji Castle", category: "景點", area: "神戶", subArea: "姬路", rating: 4.6, reviews: 57089, hours: "9:00-16:00", price: "¥1050", tags: ["必去", "世界遺產", "城堡"], note: "白鷺城！日本最美城堡，從大阪搭新幹線1小時，值得一日遊", lat: 34.8394, lng: 134.6939, placeId: "ChIJsyQzogPgVDURsYG6bi-MT3o" },

  // ===== 大阪近郊 =====
  { name: "箕面瀑布公園", nameEn: "Minoh Park", category: "景點", area: "大阪", subArea: "箕面", rating: 4.5, reviews: 2461, hours: "24hr", price: "免費", tags: ["瀑布", "健行", "楓葉"], note: "大阪近郊森林浴，2.8km步道到瀑布，秋天楓葉超美，必吃炸楓葉", lat: 34.8471, lng: 135.4723, placeId: "ChIJWycYzY35AGAR6rz9QCA7shE" },

  // ===== 京都購物＆市場（補齊）=====
  { name: "寺町通商店街", nameEn: "Teramachi Shopping Street", category: "購物", area: "京都", subArea: "河原町", rating: 4.1, reviews: 1471, hours: "店家各異", price: "免費", tags: ["購物", "商店街"], note: "有屋頂拱廊！雜貨/扭蛋/古著/伴手禮，雨天也能逛", lat: 35.0038, lng: 135.7669, placeId: "ChIJDW-ECZIIAWARetuHCbkUwT0" },
  { name: "新京極商店街", nameEn: "Shinkyogoku Shopping Street", category: "購物", area: "京都", subArea: "河原町", rating: 4.2, reviews: 1346, hours: "店家各異", price: "免費", tags: ["購物", "伴手禮"], note: "寺町通隔壁的平行商店街，更多小吃攤/伴手禮/二手衣", lat: 35.0062, lng: 135.7672, placeId: "ChIJT2vDDZQIAWARGs7zLQtvaWk" },
  { name: "先斗町", nameEn: "Pontocho Alley", category: "景點", area: "京都", subArea: "先斗町", rating: 4.5, reviews: 472, hours: "傍晚最美", price: "免費", tags: ["花街", "美食", "夜景"], note: "鴨川旁的石板小巷，提燈+町家餐廳超有京都風情，建議傍晚去", lat: 35.0039, lng: 135.7710, placeId: "ChIJP2DblBgJAWARAgLlF0vWT6o" },
  { name: "ASTY 京都（京都站伴手禮）", nameEn: "ASTY Kyoto", category: "購物", area: "京都", subArea: "京都站", rating: 3.8, reviews: 4306, hours: "5:30-23:30", price: "免費", tags: ["伴手禮", "車站"], note: "京都站內最大伴手禮區！八橋/抹茶/漬物一次買齊，搭車前必逛", lat: 34.9847, lng: 135.7601, placeId: "ChIJN1S5LKwIAWAReFe3pa8irqo" },
  { name: "よーじや 祇園店", nameEn: "Yojiya Gion", category: "購物", area: "京都", subArea: "祇園", rating: 4.0, reviews: 771, hours: "10:30-18:30", price: "¥¥", tags: ["美妝", "伴手禮"], note: "京都百年美妝品牌，吸油面紙超經典，護手霜/防曬也推薦", lat: 35.0040, lng: 135.7752, placeId: "ChIJr_k3jsEIAWARNuD9_cpaMiw" },

  // ===== 大阪補遺 =====
  { name: "Abeno Q's Mall", nameEn: "Abeno Qs Mall", category: "購物", area: "大阪", subArea: "阿倍野", rating: 4.0, reviews: 16468, hours: "10:00-21:00", price: "免費", tags: ["購物中心"], note: "阿倍野HARUKAS旁超大型百貨，Uniqlo/GU/ABC-Mart/美食街", lat: 34.6453, lng: 135.5117, placeId: "ChIJf7da8PHdAGARh2TXdoPIlYk" },

  // ===== 大阪遺漏高評論 =====
  { name: "太陽之塔（萬博紀念公園）", nameEn: "Tower of the Sun", category: "景點", area: "大阪", subArea: "吹田", rating: 4.6, reviews: 7882, hours: "10:00-17:00（週三休）", price: "¥930", tags: ["藝術", "地標"], note: "岡本太郎的傳奇巨作！70公尺高三面臉雕塑，內部生命之樹必看，要預約", lat: 34.8095, lng: 135.5324, placeId: "ChIJcUvtzK38AGARHWY4e3avhGU" },
  { name: "大阪天滿宮", nameEn: "Osaka Tenmangu Shrine", category: "景點", area: "大阪", subArea: "南森町", rating: 4.3, reviews: 10013, hours: "9:00-17:00", price: "免費", tags: ["神社", "學問"], note: "大阪版北野天滿宮，求學業/考試必拜，天神橋筋商店街起點", lat: 34.6961, lng: 135.5127, placeId: "ChIJ7xwqpNvmAGARsm6fpyLvNaE" },
  { name: "Grand Front Osaka", nameEn: "Grand Front Osaka", category: "購物", area: "大阪", subArea: "梅田", rating: 4.0, reviews: 21382, hours: "11:00-21:00", price: "免費", tags: ["購物中心", "美食"], note: "大阪站直結！超大型複合商場，屋頂花園+潮流品牌+高樓層餐廳", lat: 34.7039, lng: 135.4949, placeId: "ChIJAQAAB4_mAGAR1alcFGtOaAo" },
  { name: "臨空城 Premium Outlets", nameEn: "Rinku Premium Outlets", category: "購物", area: "大阪", subArea: "泉佐野", rating: 4.1, reviews: 15257, hours: "10:00-20:00", price: "免費", tags: ["Outlet", "免稅"], note: "關西機場旁！搭機前最後血拚，200+品牌折扣店，超好買", lat: 34.4065, lng: 135.2954, placeId: "ChIJJ9Tyyv63AGARgvCwoRNkP8Q" },
  { name: "天王寺公園", nameEn: "Tennoji Park", category: "景點", area: "大阪", subArea: "天王寺", rating: 4.1, reviews: 8715, hours: "7:00-22:00", price: "免費", tags: ["公園", "野餐"], note: "HARUKAS旁的都市綠洲，慶澤園日式庭園很美，冬天有聖誕市集", lat: 34.6507, lng: 135.5104, placeId: "ChIJ5_QnR_HdAGARMEh6Uhj3FJA" },

  // ===== 京都遺漏高評論 =====
  { name: "永觀堂", nameEn: "Eikando", category: "景點", area: "京都", subArea: "東山", rating: 4.6, reviews: 9415, hours: "9:00-16:00", price: "¥600", tags: ["楓葉", "佛寺"], note: "京都紅葉No.1名所！秋季夜間點燈倒映池中超夢幻，回望阿彌陀佛像獨特", lat: 35.0149, lng: 135.7942, placeId: "ChIJF42zshgJAWARVK2wk6AFlxw" },
  { name: "愛宕念佛寺", nameEn: "Otagi Nenbutsu-ji", category: "景點", area: "京都", subArea: "嵯峨野", rating: 4.7, reviews: 3532, hours: "9:00-16:15（週三六休）", price: "¥500", tags: ["佛寺", "石像"], note: "1200尊表情各異的羅漢石像！嵐山深處的秘境寺院，人少好拍", lat: 35.0311, lng: 135.6616, placeId: "ChIJi3CsmTmqAWAR0pV6QRGvt1c" },
  { name: "嵯峨野觀光小火車", nameEn: "Sagano Scenic Railway", category: "體驗", area: "京都", subArea: "嵐山", rating: 4.1, reviews: 331, hours: "9:00-17:00（週三休）", price: "¥880", tags: ["小火車", "溪谷"], note: "保津峽沿線25分鐘慢速小火車，秋楓春櫻超美，務必提早訂票", lat: 35.0279, lng: 135.6494, placeId: "ChIJyXwHws6rAWARYpAcQutOm0Q" },

  // ===== 奈良遺漏 =====
  { name: "興福寺 五重塔", nameEn: "Kofuku-ji Five Story Pagoda", category: "景點", area: "奈良", subArea: "奈良公園", rating: 4.4, reviews: 933, hours: "外觀24hr", price: "免費（外觀）", tags: ["佛塔", "地標"], note: "奈良地標！日本第二高木造塔，從猿澤池拍倒影超美（2034修復中）", lat: 34.6825, lng: 135.8322, placeId: "ChIJda6wz4g5AWARdmkxdq9-Q_s" },
  { name: "奈良國立博物館", nameEn: "Nara National Museum", category: "景點", area: "奈良", subArea: "奈良公園", rating: 4.4, reviews: 4983, hours: "9:30-17:00（週一休）", price: "¥700", tags: ["博物館", "佛教藝術"], note: "日本頂級佛教藝術博物館，正倉院展（秋季）必看，建築本身也是古蹟", lat: 34.6831, lng: 135.8383, placeId: "ChIJ0St27JE5AWAR7acBmY9MU4Y" },

  // ===== 京都遺漏高評論 =====
  { name: "圓山公園", nameEn: "Maruyama Park", category: "景點", area: "京都", subArea: "祇園", rating: 4.3, reviews: 6590, hours: "24hr", price: "免費", tags: ["賞櫻", "公園"], note: "京都第一賞櫻名所！祇園枝垂櫻夜櫻超浪漫，八坂神社旁", lat: 35.0036, lng: 135.7805, placeId: "ChIJm6JortwIAWARS811J4oNJus" },
  { name: "知恩院", nameEn: "Chion-in Temple", category: "景點", area: "京都", subArea: "東山", rating: 4.5, reviews: 7711, hours: "9:00-16:00", price: "¥500", tags: ["佛寺", "國寶"], note: "日本最大木造山門超壯觀！淨土宗總本山，庭園很美，有免費接駁車上山", lat: 35.0052, lng: 135.7834, placeId: "ChIJuYNCQdwIAWARfPnq0Ktzk2A" },
  { name: "高台寺", nameEn: "Kodai-ji Temple", category: "景點", area: "京都", subArea: "東山", rating: 4.4, reviews: 9633, hours: "9:00-17:00", price: "¥600", tags: ["佛寺", "夜間點燈"], note: "豐臣秀吉正室北政所建的名寺，秋季夜間點燈+光雕投影超夢幻", lat: 35.0008, lng: 135.7813, placeId: "ChIJuU17z9oIAWARgMhsX3kqUSQ" },
  { name: "京都國際漫畫博物館", nameEn: "Kyoto Manga Museum", category: "景點", area: "京都", subArea: "烏丸", rating: 4.2, reviews: 6287, hours: "10:00-17:00（週三休）", price: "¥900", tags: ["漫畫", "博物館"], note: "30萬冊漫畫自由閱讀！舊小學校舍改建，多國語言漫畫，動漫迷天堂", lat: 35.0119, lng: 135.7594, placeId: "ChIJh1qJf4YIAWARTAOFMHrSHvI" },
  { name: "祇園 MAIKOYA 舞妓體驗", nameEn: "Gion Maikoya Geisha Experience", category: "體驗", area: "京都", subArea: "祇園", rating: 4.9, reviews: 1401, hours: "9:00-19:30", price: "¥¥¥", tags: ["舞妓", "茶道", "和服"], note: "4.9★超高分！含和服+茶道+舞妓表演+庭園拍照，體驗正統京都文化", lat: 34.9976, lng: 135.7740, placeId: "ChIJR2I1KZcJAWARvKqCFCkxnuU" },

  // ===== 大阪遺漏高評論 =====
  { name: "神座拉麵 千日前店", nameEn: "Kamukura Ramen Sennichimae", category: "餐廳", area: "大阪", subArea: "道頓堀", rating: 4.1, reviews: 1928, hours: "9:00-翌6:30", price: "¥", tags: ["拉麵"], note: "大阪在地人氣拉麵，白菜豚骨湯頭清爽，份量超大，接近24小時營業", lat: 34.6684, lng: 135.5030, placeId: "ChIJ5Z1H6hTnAGAR6MIF1wLjD5c" },

  // ===== 宇治追加 =====
  { name: "宇治上神社", nameEn: "Ujigami Shrine", category: "景點", area: "宇治", subArea: "宇治", rating: 4.3, reviews: 3042, hours: "9:00-16:00", price: "免費", tags: ["世界遺產", "神社"], note: "日本現存最古老神社建築！世界遺產，平等院對岸，超清幽", lat: 34.8919, lng: 135.8113, placeId: "ChIJYfl6dXMRAWARX1-X0_AOYBE" },

  // ===== 自然景觀・纜車・風景 =====
  // --- 神戶 ---
  { name: "摩耶山 掬星台", nameEn: "Maya Kikuseidai Observatory", category: "景點", area: "神戶", subArea: "摩耶山", rating: 4.5, reviews: 4463, hours: "24hr（纜車~17:40/週末~21:00）", price: "纜車來回¥1560", tags: ["夜景", "纜車", "展望台"], note: "日本三大夜景之一！纜車+索道上山，千萬夜景從神戶到大阪一覽無遺", lat: 34.7342, lng: 135.2063, placeId: "ChIJK9Er5z6JAGAR6-_inZvie2o" },
  { name: "六甲纜車", nameEn: "Rokko Cable Car", category: "體驗", area: "神戶", subArea: "六甲山", rating: 4.3, reviews: 1031, hours: "7:10-21:10", price: "單程¥800", tags: ["纜車", "山景"], note: "10分鐘登上六甲山！可轉乘巴士到Garden Terrace或接六甲有馬索道到有馬溫泉", lat: 34.7373, lng: 135.2335, placeId: "ChIJSQyp4weMAGARqsGwKQYcxcM" },

  // --- 京都 ---
  { name: "保津川遊船", nameEn: "Hozugawa River Boat Ride", category: "體驗", area: "京都", subArea: "嵐山", rating: 4.6, reviews: 5066, hours: "10:00-14:30", price: "¥4500", tags: ["遊船", "溪谷", "自然"], note: "嵐山必搭！2小時保津峽激流泛舟，船夫邊划邊說笑，秋楓春櫻絕美", lat: 35.0172, lng: 135.5869, placeId: "ChIJ5e_0rsRUAGARV6H3azfT3DM" },
  { name: "鞍馬～貴船 木之根道健行", nameEn: "Kurama-Kibune Hiking Trail", category: "體驗", area: "京都", subArea: "鞍馬", rating: 4.5, reviews: 266, hours: "9:00-16:15", price: "¥300（鞍馬寺入山費）", tags: ["健行", "森林", "自然"], note: "京都近郊最美山林步道！穿越原始杉林+巨大樹根，鞍馬寺→貴船約1小時", lat: 35.1189, lng: 135.7680, placeId: "ChIJkQfWGQymAWAR5ugAZ2jhB8A" },

  // --- 大阪 ---
  { name: "萬博紀念公園", nameEn: "Expo 70 Commemorative Park", category: "景點", area: "大阪", subArea: "吹田", rating: 4.3, reviews: 21477, hours: "9:30-17:00（週三休）", price: "¥260", tags: ["公園", "自然", "櫻花"], note: "260公頃超大綠地公園！太陽之塔所在地，櫻花名所+日本庭園+民族學博物館", lat: 34.8084, lng: 135.5324, placeId: "ChIJJ996orT8AGARtNKA2hzqoGY" },
  { name: "勝尾寺", nameEn: "Katsuoji Temple", category: "景點", area: "大阪", subArea: "箕面", rating: 4.5, reviews: 10828, hours: "8:00-17:00", price: "¥500", tags: ["楓葉", "達摩", "自然"], note: "大阪最美楓葉寺！滿山紅葉+數千顆達摩不倒翁，超上鏡，搭巴士前往", lat: 34.8658, lng: 135.4911, placeId: "ChIJtX8053n5AGARND16wXHGXg0" },

  // --- 奈良 ---
  { name: "若草山", nameEn: "Mount Wakakusa", category: "景點", area: "奈良", subArea: "奈良公園", rating: 4.6, reviews: 910, hours: "9:00-17:00（3-12月）", price: "¥150", tags: ["山景", "鹿", "展望"], note: "25分鐘登頂即覽整個奈良市！山上也有鹿，日落時分特別美，1月有燒山祭", lat: 34.6911, lng: 135.8544, placeId: "ChIJLwbhyrs5AWARXrfL75d3_j8" },
];

const CATEGORIES = ["全部", "景點", "餐廳", "市場", "購物", "體驗"];
const AREAS = ["全部", "大阪", "京都", "神戶", "宇治", "奈良"];

export default function App() {
  const [catFilter, setCatFilter] = useState("全部");
  const [areaFilter, setAreaFilter] = useState("全部");
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sortKey, setSortKey] = useState("rating");
  const [sortDir, setSortDir] = useState("desc");

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
        d.name.toLowerCase().includes(q) ||
        d.nameEn.toLowerCase().includes(q) ||
        d.note.toLowerCase().includes(q) ||
        d.subArea.toLowerCase().includes(q) ||
        d.tags.some(t => t.includes(q))
      );
    }
    result = [...result].sort((a, b) => {
      let va = a[sortKey], vb = b[sortKey];
      if (typeof va === "string") { va = va.toLowerCase(); vb = vb.toLowerCase(); }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return result;
  }, [catFilter, areaFilter, tagFilter, search, sortKey, sortDir]);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const sortIcon = (key) => {
    if (sortKey !== key) return " ↕";
    return sortDir === "asc" ? " ↑" : " ↓";
  };

  const areaColor = (area) => {
    const m = { "大阪": "bg-red-100 text-red-700", "京都": "bg-purple-100 text-purple-700", "宇治": "bg-green-100 text-green-700", "奈良": "bg-amber-100 text-amber-700", "神戶": "bg-blue-100 text-blue-700" };
    return m[area] || "bg-gray-100 text-gray-700";
  };

  const catIcon = (cat) => {
    const m = { "景點": "🏯", "餐廳": "🍜", "市場": "🛒", "購物": "🛍️", "體驗": "🎭" };
    return m[cat] || "📍";
  };

  const openGoogleMaps = (item) => {
    if (!item.placeId) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.nameEn)}`;
      window.open(url, "_blank");
      return;
    }
    const url = `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}&query_place_id=${item.placeId}`;
    window.open(url, "_blank");
  };

  const openAllOnMap = () => {
    if (filtered.length === 0) return;
    // Use the first item as center and build a directions-like URL
    const markers = filtered.slice(0, 10).map(d => `${d.lat},${d.lng}`);
    const url = `https://www.google.com/maps/dir/${markers.join("/")}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-purple-600 to-green-600 text-white px-4 py-6">
        <h1 className="text-2xl font-bold text-center">🗾 大阪・京都景點餐廳資料庫</h1>
        <p className="text-center text-sm opacity-80 mt-1">共 {DATA.length} 個地點 ｜ 篩選後顯示 {filtered.length} 個</p>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-10 bg-white shadow-sm border-b px-4 py-3 space-y-2">
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 搜尋景點、餐廳、關鍵字..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {/* Filter row */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex gap-1">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCatFilter(c)}
                className={`px-2 py-1 rounded-full text-xs font-medium transition ${catFilter === c ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {c === "全部" ? "📋 全部" : `${catIcon(c)} ${c}`}
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-gray-300" />
          <div className="flex gap-1">
            {AREAS.map(a => (
              <button key={a} onClick={() => setAreaFilter(a)}
                className={`px-2 py-1 rounded-full text-xs font-medium transition ${areaFilter === a ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {a}
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-gray-300" />
          <select value={tagFilter} onChange={e => setTagFilter(e.target.value)}
            className="text-xs border rounded-lg px-2 py-1 bg-white">
            {allTags.map(t => <option key={t} value={t === "全部" ? "" : t}>{t === "全部" ? "🏷️ 標籤篩選" : `#${t}`}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 sticky top-24 z-5">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-gray-600 cursor-pointer hover:text-purple-600 whitespace-nowrap" onClick={() => handleSort("name")}>
                名稱{sortIcon("name")}
              </th>
              <th className="px-2 py-2 text-left font-semibold text-gray-600 whitespace-nowrap">地區</th>
              <th className="px-2 py-2 text-left font-semibold text-gray-600 whitespace-nowrap">類型</th>
              <th className="px-2 py-2 text-center font-semibold text-gray-600 cursor-pointer hover:text-purple-600 whitespace-nowrap" onClick={() => handleSort("rating")}>
                評分{sortIcon("rating")}
              </th>
              <th className="px-2 py-2 text-center font-semibold text-gray-600 cursor-pointer hover:text-purple-600 whitespace-nowrap" onClick={() => handleSort("reviews")}>
                評論數{sortIcon("reviews")}
              </th>
              <th className="px-2 py-2 text-left font-semibold text-gray-600 whitespace-nowrap">時間</th>
              <th className="px-2 py-2 text-left font-semibold text-gray-600 whitespace-nowrap">價格</th>
              <th className="px-2 py-2 text-left font-semibold text-gray-600 whitespace-nowrap">標籤</th>
              <th className="px-2 py-2 text-left font-semibold text-gray-600">備註</th>
              <th className="px-2 py-2 text-center font-semibold text-gray-600 whitespace-nowrap">地圖</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={i} className={`border-b hover:bg-purple-50 transition ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <td className="px-3 py-2.5">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-400">{item.nameEn}</div>
                </td>
                <td className="px-2 py-2.5">
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${areaColor(item.area)}`}>{item.area}</span>
                  <div className="text-xs text-gray-400 mt-0.5">{item.subArea}</div>
                </td>
                <td className="px-2 py-2.5 whitespace-nowrap">
                  <span className="text-xs">{catIcon(item.category)} {item.category}</span>
                </td>
                <td className="px-2 py-2.5 text-center">
                  {item.rating > 0 ? <>
                    <span className="font-bold text-amber-600">{item.rating}</span>
                    <span className="text-amber-400 text-xs"> ⭐</span>
                  </> : <span className="text-gray-300 text-xs">—</span>}
                </td>
                <td className="px-2 py-2.5 text-center text-xs text-gray-500">
                  {item.reviews > 0 ? (item.reviews >= 1000 ? `${(item.reviews / 1000).toFixed(1)}K` : item.reviews) : "—"}
                </td>
                <td className="px-2 py-2.5 text-xs text-gray-600 whitespace-nowrap">{item.hours}</td>
                <td className="px-2 py-2.5 text-xs font-medium text-gray-700 whitespace-nowrap">{item.price}</td>
                <td className="px-2 py-2.5">
                  <div className="flex flex-wrap gap-0.5">
                    {item.tags.map(t => (
                      <span key={t} className={`px-1 py-0 rounded text-xs ${t === "必去" || t === "必吃" ? "bg-red-100 text-red-600 font-bold" : "bg-gray-100 text-gray-500"}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-2 py-2.5 text-xs text-gray-600 max-w-xs">{item.note}</td>
                <td className="px-2 py-2.5 text-center">
                  <button onClick={() => openGoogleMaps(item)}
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition whitespace-nowrap">
                    📍 開啟
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-2">🔍</p>
          <p>找不到符合條件的地點</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-4 text-xs text-gray-400 border-t mt-4">
        點擊「📍 開啟」可直接在 Google Maps 查看位置
      </div>
    </div>
  );
}
