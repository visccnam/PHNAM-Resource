// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: book-open;

// =============================================================
//  TỪ VỰNG TRÊN MÀN HÌNH KHÓA - script cho app Scriptable (iOS)
//
//  Widget màn hình khóa:
//    • Chữ nhật                      → từ vựng, nghĩa, giải thích
//    • Chữ nhật, Parameter "tiendo"  → thanh tiến độ
//    • Tròn                          → vòng tiến độ
//    • Một dòng (phía trên giờ)      → từ và nghĩa
//  Widget màn hình chính (nhỏ, vừa, lớn) cũng dùng được.
//
//  Chạm vào widget để mở phần ôn tập và bấm "Nhớ rồi" hoặc
//  "Chưa nhớ". Từ chưa nhớ sẽ hiện lại thường xuyên hơn.
// =============================================================

// ---------- Cài đặt ----------
const ROTATE_MINUTES = 15     // Giữ một từ ít nhất bấy nhiêu phút rồi mới đổi
const SESSION_SIZE = 10       // Số từ trong một lượt ôn tập
const SERIF_FONT = true       // true: font có chân như ảnh mẫu, false: font hệ thống
const LOCK_BACKGROUND = false // true: thêm nền mờ phía sau widget màn hình khóa

// Số ngày chờ trước khi ôn lại, theo mức nhớ 0 → 5
const INTERVAL_DAYS = [0, 1, 3, 7, 14, 30]
const LEARNED_LEVEL = 3       // Đạt mức này thì coi là đã thuộc

// ---------- Bộ từ có sẵn ----------
// Mỗi dòng: [từ, loại từ, nghĩa, giải thích, câu ví dụ]
// Sửa trực tiếp ở đây, hoặc thêm từ trong app (mục "Thêm từ mới").
const WORDS = [
  ["ostensibly", "adv.", "được cho là", "Có vẻ đúng, nhưng có lẽ không phải vậy.", "He was ostensibly on a business trip, but spent most of it at the beach."],
  ["ubiquitous", "adj.", "có mặt khắp nơi", "Xuất hiện ở mọi nơi, rất phổ biến.", "Smartphones have become ubiquitous in modern life."],
  ["meticulous", "adj.", "tỉ mỉ, kỹ lưỡng", "Rất chú ý đến từng chi tiết nhỏ.", "She keeps meticulous records of her spending."],
  ["resilient", "adj.", "kiên cường, mau hồi phục", "Nhanh chóng lấy lại sức sau khó khăn.", "Children are often more resilient than adults think."],
  ["ambiguous", "adj.", "mơ hồ, nước đôi", "Có thể hiểu theo nhiều cách khác nhau.", "The ending of the film is deliberately ambiguous."],
  ["pragmatic", "adj.", "thực tế, thực dụng", "Giải quyết vấn đề dựa trên thực tế, không theo lý thuyết suông.", "We need a pragmatic approach to this problem."],
  ["mitigate", "v.", "giảm nhẹ", "Làm cho điều xấu bớt nghiêm trọng.", "Planting trees can help mitigate the effects of climate change."],
  ["scrutinize", "v.", "xem xét kỹ lưỡng", "Kiểm tra rất cẩn thận từng chi tiết.", "Lawyers scrutinized the contract before it was signed."],
  ["alleviate", "v.", "làm dịu, giảm bớt", "Làm cho cơn đau hoặc vấn đề bớt đi.", "This medicine should alleviate the pain."],
  ["inevitable", "adj.", "không thể tránh khỏi", "Chắc chắn sẽ xảy ra.", "Some mistakes are inevitable when you learn something new."],
  ["elusive", "adj.", "khó nắm bắt", "Khó tìm, khó đạt được hoặc khó nhớ.", "Success proved elusive for the team this season."],
  ["candid", "adj.", "thẳng thắn", "Nói thật, không che giấu.", "Thank you for being so candid with me."],
  ["diligent", "adj.", "siêng năng, cần cù", "Làm việc chăm chỉ và cẩn thận.", "She is a diligent student who never misses a class."],
  ["eloquent", "adj.", "hùng hồn, có tài ăn nói", "Diễn đạt trôi chảy và thuyết phục.", "He gave an eloquent speech at the ceremony."],
  ["ephemeral", "adj.", "phù du, chóng tàn", "Chỉ tồn tại trong thời gian rất ngắn.", "Fame on social media is often ephemeral."],
  ["frugal", "adj.", "tiết kiệm, đạm bạc", "Chi tiêu dè sẻn, không lãng phí.", "They live a frugal life to save for a house."],
  ["gregarious", "adj.", "hòa đồng, thích giao du", "Thích ở cùng và trò chuyện với người khác.", "He's a gregarious person who loves parties."],
  ["hinder", "v.", "cản trở", "Làm cho việc gì khó tiến triển.", "Bad weather hindered the rescue efforts."],
  ["imminent", "adj.", "sắp xảy ra", "Đến rất gần, thường là điều không hay.", "The storm is imminent, so stay indoors."],
  ["jeopardize", "v.", "gây nguy hại", "Đặt vào tình thế có thể bị mất hoặc hỏng.", "Missing the deadline could jeopardize the whole project."],
  ["lucid", "adj.", "rõ ràng, mạch lạc", "Trình bày dễ hiểu, dễ theo dõi.", "She gave a lucid explanation of a complex topic."],
  ["mundane", "adj.", "tầm thường, nhàm chán", "Bình thường, lặp lại hằng ngày, không thú vị.", "I spent the day on mundane tasks like laundry."],
  ["nuance", "n.", "sắc thái", "Khác biệt rất nhỏ về ý nghĩa, cảm xúc hay màu sắc.", "A good translator understands the nuances of both languages."],
  ["obsolete", "adj.", "lỗi thời", "Không còn được dùng vì đã có thứ mới hơn.", "Fax machines are almost obsolete."],
  ["plausible", "adj.", "hợp lý, nghe có vẻ đúng", "Đủ hợp lý để người khác tin.", "Her excuse sounded plausible, so we believed her."],
  ["reluctant", "adj.", "miễn cưỡng, ngần ngại", "Không muốn làm việc gì đó.", "He was reluctant to admit his mistake."],
  ["subtle", "adj.", "tinh tế, khó nhận ra", "Nhẹ nhàng, không lộ rõ ngay.", "There is a subtle difference between the two colors."],
  ["tedious", "adj.", "tẻ nhạt, chán ngắt", "Kéo dài và nhàm chán.", "Filling in forms is a tedious job."],
  ["versatile", "adj.", "đa năng, linh hoạt", "Có thể làm tốt nhiều việc khác nhau.", "Eggs are a versatile ingredient."],
  ["vivid", "adj.", "sống động, rõ nét", "Rất rõ ràng, như đang thấy trước mắt.", "I have vivid memories of my first day at school."],
  ["advocate", "v.", "ủng hộ, chủ trương", "Công khai ủng hộ một ý tưởng hay chính sách.", "Many doctors advocate regular exercise."],
  ["benevolent", "adj.", "nhân từ, rộng lượng", "Tốt bụng và muốn giúp đỡ người khác.", "The old man was a benevolent figure in the village."],
  ["coherent", "adj.", "mạch lạc", "Các ý liên kết chặt chẽ, dễ theo dõi.", "Your essay needs a more coherent structure."],
  ["deteriorate", "v.", "xấu đi, suy giảm", "Trở nên tệ hơn theo thời gian.", "His health deteriorated rapidly last winter."],
  ["exacerbate", "v.", "làm trầm trọng thêm", "Làm cho vấn đề vốn đã xấu càng xấu hơn.", "Stress can exacerbate skin problems."],
  ["feasible", "adj.", "khả thi", "Có thể thực hiện được.", "Is it feasible to finish the project by Friday?"],
  ["hypothetical", "adj.", "giả định", "Dựa trên giả thuyết, chưa xảy ra thật.", "Let's consider a hypothetical situation."],
  ["inherent", "adj.", "vốn có, cố hữu", "Là một phần tự nhiên, không tách rời.", "There are risks inherent in any investment."],
  ["lethargic", "adj.", "uể oải, lờ đờ", "Mệt mỏi, thiếu năng lượng.", "I always feel lethargic after a big lunch."],
  ["novice", "n.", "người mới vào nghề", "Người còn ít kinh nghiệm trong một lĩnh vực.", "This course is designed for complete novices."],
  ["prevalent", "adj.", "phổ biến, thịnh hành", "Xảy ra hoặc tồn tại rộng rãi.", "This disease is more prevalent in hot countries."],
  ["redundant", "adj.", "thừa, dư", "Không cần thiết, có thể bỏ đi.", "Delete any redundant words from your essay."],
  ["sustainable", "adj.", "bền vững", "Có thể duy trì lâu dài mà không gây hại.", "We need more sustainable sources of energy."],
  ["tentative", "adj.", "tạm thời, chưa chắc chắn", "Chưa phải quyết định cuối cùng.", "We made tentative plans to meet next week."],
  ["undermine", "v.", "làm suy yếu", "Làm yếu dần, thường một cách từ từ hoặc lén lút.", "Constant criticism can undermine a child's confidence."],
  ["vulnerable", "adj.", "dễ bị tổn thương", "Dễ bị tấn công hoặc bị ảnh hưởng xấu.", "Old people are more vulnerable to the flu."],
  ["arbitrary", "adj.", "tùy tiện", "Dựa trên ý thích, không theo lý do hay quy tắc nào.", "The rules seem completely arbitrary."],
  ["conscientious", "adj.", "tận tâm, chu đáo", "Làm việc cẩn thận và có trách nhiệm.", "She is a conscientious worker who double-checks everything."],
  ["discrepancy", "n.", "sự chênh lệch", "Sự khác biệt giữa hai thứ lẽ ra phải khớp nhau.", "There is a discrepancy between the two reports."],
  ["procrastinate", "v.", "trì hoãn, chần chừ", "Để việc cần làm sang sau.", "Stop procrastinating and start your homework!"],
  ["serendipity", "n.", "sự tình cờ may mắn", "Tìm thấy điều tốt đẹp một cách ngẫu nhiên.", "Meeting my best friend was pure serendipity."],
  ["unprecedented", "adj.", "chưa từng có", "Chưa bao giờ xảy ra trước đây.", "The pandemic caused unprecedented disruption."],
  ["comprehensive", "adj.", "toàn diện", "Bao gồm đầy đủ mọi khía cạnh.", "The guide gives a comprehensive overview of the city."],
  ["ambivalent", "adj.", "phân vân, lưỡng lự", "Có cảm xúc trái ngược về cùng một việc.", "I feel ambivalent about moving abroad."],
  ["empathy", "n.", "sự đồng cảm", "Khả năng hiểu và chia sẻ cảm xúc của người khác.", "Good nurses show empathy towards their patients."],
  ["integrity", "n.", "sự chính trực", "Trung thực và giữ vững nguyên tắc đạo đức.", "He is a man of great integrity."],
  ["perseverance", "n.", "sự kiên trì", "Tiếp tục cố gắng dù gặp khó khăn.", "Learning a language takes perseverance."],
  ["skeptical", "adj.", "hoài nghi", "Không dễ tin, hay nghi ngờ.", "Scientists remain skeptical about the claim."],
  ["trivial", "adj.", "vặt vãnh, không quan trọng", "Nhỏ nhặt, không đáng bận tâm.", "Don't worry about such trivial matters."],
  ["profound", "adj.", "sâu sắc", "Rất lớn hoặc rất sâu về cảm xúc, ý nghĩa.", "The book had a profound effect on me."],
]

// ---------- Phần dưới không cần sửa ----------
const DAY = 24 * 60 * 60 * 1000
const MAX_LEVEL = INTERVAL_DAYS.length - 1
const YELLOW = "#F2C94C"
const GRAY = "#9AA0AC"
const fm = FileManager.local()
const DATA_PATH = fm.joinPath(fm.documentsDirectory(), "tuvung-data.json")

let state = loadState()
let words = loadWords()

if (config.runsInWidget) {
  Script.setWidget(buildWidget(config.widgetFamily, normalize(args.widgetParameter), true))
} else {
  await runApp(args.queryParameters || {})
}
Script.complete()

// ---------- Dữ liệu ----------

function loadState() {
  let saved = null
  try {
    if (fm.fileExists(DATA_PATH)) saved = JSON.parse(fm.readString(DATA_PATH))
  } catch (e) {
    saved = null
  }
  if (!saved || typeof saved !== "object") saved = {}
  if (!saved.cards || typeof saved.cards !== "object") saved.cards = {}
  if (!Array.isArray(saved.custom)) saved.custom = []
  return saved
}

function saveState() {
  fm.writeString(DATA_PATH, JSON.stringify(state))
}

function loadWords() {
  const byKey = new Map()
  const add = (row, custom) => {
    const [w = "", pos = "", vi = "", note = "", ex = ""] = row
    const key = String(w).trim().toLowerCase()
    if (key) byKey.set(key, { key, w: String(w).trim(), pos, vi, note, ex, custom })
  }
  WORDS.forEach(row => add(row, false))
  state.custom.forEach(row => add(row, true))
  return Array.from(byKey.values())
}

function card(key) {
  if (!state.cards[key]) state.cards[key] = { level: 0, due: 0, shown: 0, reviewed: 0 }
  return state.cards[key]
}

// Nhớ: lên một mức và hẹn ngày ôn lại. Quên: về mức 0 và hiện lại ngay.
// Bấm "Nhớ" nhiều lần khi chưa đến hạn thì không lên mức thêm.
function grade(word, remembered) {
  const c = card(word.key)
  const now = Date.now()
  if (!remembered) {
    c.level = 0
    c.due = now
  } else if (c.due <= now) {
    c.level = Math.min(c.level + 1, MAX_LEVEL)
    c.due = now + INTERVAL_DAYS[c.level] * DAY
  }
  c.reviewed = (c.reviewed || 0) + 1
  saveState()
}

// Thứ tự ưu tiên của các từ đến hạn: từ đã ôn trước từ mới, mức nhớ thấp trước.
function byPriority(a, b) {
  const ca = card(a.key)
  const cb = card(b.key)
  return (ca.reviewed ? 0 : 1) - (cb.reviewed ? 0 : 1) || ca.level - cb.level
}

// Chọn ngẫu nhiên trong 5 từ ưu tiên nhất, trong đó ưu tiên từ lâu chưa hiện.
function pickNext(exclude) {
  const now = Date.now()
  const others = words.filter(x => x !== exclude)
  if (!others.length) return words[0]
  let pool = others
    .filter(x => card(x.key).due <= now)
    .sort((a, b) => byPriority(a, b) || card(a.key).shown - card(b.key).shown)
  if (!pool.length) pool = others.sort((a, b) => card(a.key).due - card(b.key).due)
  const top = pool.slice(0, 5)
  return top[Math.floor(Math.random() * top.length)]
}

function showWord(word) {
  state.current = word.key
  state.changedAt = Date.now()
  card(word.key).shown = state.changedAt
  saveState()
  return word
}

function currentWord(rotate) {
  const word = words.find(x => x.key === state.current)
  const expired = Date.now() - (state.changedAt || 0) >= ROTATE_MINUTES * 60 * 1000
  if (word && !(rotate && expired)) return word
  return showWord(pickNext(word))
}

// Tiến độ tính theo mức nhớ, mỗi từ đủ điểm khi đạt LEARNED_LEVEL.
function stats() {
  const now = Date.now()
  const s = { total: words.length, learned: 0, learning: 0, fresh: 0, due: 0, percent: 0 }
  let points = 0
  for (const x of words) {
    const c = state.cards[x.key]
    if (!c || !c.reviewed) {
      s.fresh++
      continue
    }
    points += Math.min(c.level, LEARNED_LEVEL)
    if (c.level >= LEARNED_LEVEL) s.learned++
    else s.learning++
    if (c.due <= now) s.due++
  }
  if (s.total) s.percent = Math.round(points * 100 / (LEARNED_LEVEL * s.total))
  return s
}

// ---------- Chữ ----------

function normalize(text) {
  return String(text || "").toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d").replace(/\s+/g, "")
}

function cap(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : ""
}

function heading(word) {
  return word.w.toUpperCase() + (word.pos ? ` (${word.pos.toUpperCase()})` : "")
}

function details(word) {
  return [cap(word.vi), word.note, word.ex ? `“${word.ex}”` : ""].filter(Boolean).join("\n")
}

function status(word) {
  const c = card(word.key)
  if (!c.reviewed) return "Từ mới, chưa ôn lần nào"
  const days = Math.ceil((c.due - Date.now()) / DAY)
  return `Mức nhớ ${c.level}/${MAX_LEVEL} · ` + (days > 0 ? `ôn lại sau ${days} ngày` : "cần ôn lại")
}

function runURL(params) {
  const base = URLScheme.forRunningScript()
  const query = Object.keys(params).map(k => `${k}=${encodeURIComponent(params[k])}`).join("&")
  return base + (base.includes("?") ? "&" : "?") + query
}

// ---------- Widget ----------

function buildWidget(family, param, rotate) {
  const w = new ListWidget()
  w.refreshAfterDate = new Date(Date.now() + ROTATE_MINUTES * 60 * 1000)
  if (!words.length) {
    w.addText("Chưa có từ nào. Mở Scriptable để thêm từ.")
    return w
  }
  const lock = Boolean(family && family.startsWith("accessory"))
  if (family === "accessoryCircular" || (lock && param === "tiendo")) {
    w.url = runURL({ view: "stats" })
    w.addAccessoryWidgetBackground = LOCK_BACKGROUND || family === "accessoryCircular"
    if (family === "accessoryCircular") drawCircle(w)
    else drawProgressRect(w)
    return w
  }
  const word = currentWord(rotate)
  w.url = runURL({ word: word.key })
  if (family === "accessoryInline") w.addText(`${word.w} · ${word.vi}`)
  else if (lock) drawWordRect(w, word)
  else drawHome(w, word, family || "medium")
  return w
}

// Màn hình khóa chỉ hiển thị một màu, nên dùng độ đậm nhạt thay cho màu sắc.
function drawWordRect(w, word) {
  w.addAccessoryWidgetBackground = LOCK_BACKGROUND
  w.spacing = 1
  addText(w, heading(word), font(14, "bold"), { scale: 0.6 })
  addText(w, cap(word.vi), font(12.5, "bold"), { scale: 0.7 })
  if (word.note) addText(w, word.note, font(11.5), { lines: 2, opacity: 0.85 })
}

function drawProgressRect(w) {
  const s = stats()
  addText(w, `Tiến độ ${s.percent}%`, font(12, "bold"))
  w.addSpacer(4)
  const bar = w.addImage(barImage(s.percent / 100, 110, 14, Color.white()))
  bar.imageSize = new Size(110, 14)
  w.addSpacer(4)
  addText(w, `Đã thuộc ${s.learned}/${s.total} từ`, font(10.5), { opacity: 0.8 })
}

function drawCircle(w) {
  const img = w.addImage(ringImage(stats().percent / 100, 60))
  img.imageSize = new Size(60, 60)
  img.centerAlignImage()
}

function drawHome(w, word, family) {
  const big = family !== "small"
  const gradient = new LinearGradient()
  gradient.colors = [new Color("#232734"), new Color("#12141B")]
  gradient.locations = [0, 1]
  w.backgroundGradient = gradient
  w.setPadding(14, 16, 14, 16)

  const head = w.addStack()
  head.centerAlignContent()
  addText(head, word.w.toUpperCase(), font(big ? 20 : 17, "bold"), { scale: 0.5, color: "#FFFFFF" })
  if (big && word.pos) {
    head.addSpacer(6)
    addText(head, word.pos, font(12, "italic"), { color: GRAY })
  }
  if (!big && word.pos) addText(w, word.pos, font(11, "italic"), { color: GRAY })

  w.addSpacer(4)
  addText(w, cap(word.vi), font(big ? 16 : 14, "bold"), { lines: 2, scale: 0.7, color: YELLOW })
  if (word.note) addText(w, word.note, font(big ? 13 : 12), { lines: 2, scale: 0.8, color: "#D8DBE2" })
  if (big && word.ex) {
    w.addSpacer(4)
    addText(w, `“${word.ex}”`, font(12, "italic"), { lines: family === "large" ? 4 : 1, scale: 0.8, color: GRAY })
  }
  w.addSpacer()

  const percent = stats().percent
  const width = big ? 220 : 90
  const row = w.addStack()
  row.centerAlignContent()
  const bar = row.addImage(barImage(percent / 100, width, 10, new Color(YELLOW)))
  bar.imageSize = new Size(width, 10)
  row.addSpacer(8)
  addText(row, `${percent}%`, font(11, "bold"), { color: GRAY })
}

function addText(parent, text, textFont, opts = {}) {
  const t = parent.addText(text)
  t.font = textFont
  t.lineLimit = opts.lines || 1
  if (opts.scale) t.minimumScaleFactor = opts.scale
  if (opts.opacity) t.textOpacity = opts.opacity
  if (opts.color) t.textColor = new Color(opts.color)
  return t
}

function font(size, style = "regular") {
  if (SERIF_FONT) {
    const names = { regular: "TimesNewRomanPSMT", bold: "TimesNewRomanPS-BoldMT", italic: "TimesNewRomanPS-ItalicMT" }
    return new Font(names[style], size)
  }
  if (style === "bold") return Font.boldSystemFont(size)
  if (style === "italic") return Font.italicSystemFont(size)
  return Font.systemFont(size)
}

function barImage(fraction, width, height, color) {
  const ctx = new DrawContext()
  ctx.size = new Size(width, height)
  ctx.opaque = false
  ctx.respectScreenScale = true
  const line = 1.5
  const outlineRadius = (height - line) / 2
  const outline = new Path()
  outline.addRoundedRect(new Rect(line / 2, line / 2, width - line, height - line), outlineRadius, outlineRadius)
  ctx.addPath(outline)
  ctx.setStrokeColor(color)
  ctx.setLineWidth(line)
  ctx.strokePath()
  const inset = 3
  const fillHeight = height - inset * 2
  const fillWidth = (width - inset * 2) * Math.max(0, Math.min(1, fraction))
  if (fillWidth >= 1) {
    const radius = Math.min(fillHeight, fillWidth) / 2
    const fill = new Path()
    fill.addRoundedRect(new Rect(inset, inset, fillWidth, fillHeight), radius, radius)
    ctx.addPath(fill)
    ctx.setFillColor(color)
    ctx.fillPath()
  }
  return ctx.getImage()
}

function ringImage(fraction, size) {
  const ctx = new DrawContext()
  ctx.size = new Size(size, size)
  ctx.opaque = false
  ctx.respectScreenScale = true
  const line = 5
  const radius = (size - line) / 2
  const center = size / 2
  const done = Math.max(0, Math.min(1, fraction))
  ctx.setLineWidth(line)
  ctx.setStrokeColor(new Color("#FFFFFF", 0.3))
  ctx.strokeEllipse(new Rect(line / 2, line / 2, size - line, size - line))
  if (done > 0) {
    const arc = new Path()
    const steps = Math.max(2, Math.ceil(120 * done))
    for (let i = 0; i <= steps; i++) {
      const angle = -Math.PI / 2 + 2 * Math.PI * done * i / steps
      const point = new Point(center + radius * Math.cos(angle), center + radius * Math.sin(angle))
      if (i === 0) arc.move(point)
      else arc.addLine(point)
    }
    ctx.addPath(arc)
    ctx.setStrokeColor(Color.white())
    ctx.strokePath()
  }
  const fontSize = size * 0.28
  ctx.setFont(Font.boldRoundedSystemFont(fontSize))
  ctx.setTextColor(Color.white())
  ctx.setTextAlignedCenter()
  ctx.drawTextInRect(`${Math.round(done * 100)}%`, new Rect(0, (size - fontSize * 1.2) / 2, size, fontSize * 1.2))
  return ctx.getImage()
}

// ---------- Trong app ----------

async function runApp(query) {
  if (!words.length) return addWord()
  if (query.view === "stats") return showStats()
  const key = String(query.word || "").toLowerCase()
  let word = words.find(x => x.key === key) || currentWord(false)
  while (word) {
    const a = new Alert()
    a.title = heading(word)
    a.message = `${details(word)}\n\n${status(word)}\nTiến độ chung: ${stats().percent}%`
    const menu = ["✅ Nhớ rồi", "❌ Chưa nhớ", `📚 Ôn tập ${SESSION_SIZE} từ`, "➕ Thêm từ mới", "📖 Danh sách từ", "📊 Tiến độ", "👀 Xem trước widget"]
    menu.forEach(item => a.addAction(item))
    a.addCancelAction("Đóng")
    const choice = await a.presentSheet()
    if (choice === -1) break
    if (choice === 0 || choice === 1) {
      grade(word, choice === 0)
      showWord(pickNext(word))
    } else if (choice === 2) await reviewSession()
    else if (choice === 3) await addWord()
    else if (choice === 4) await listWords()
    else if (choice === 5) await showStats()
    else if (choice === 6) await previewWidget()
    word = words.length ? currentWord(false) : null
  }
}

async function reviewSession() {
  const now = Date.now()
  // Từ vừa thấy trên màn hình khóa được ôn trước.
  const queue = words
    .filter(x => card(x.key).due <= now)
    .sort((a, b) => byPriority(a, b) || card(b.key).shown - card(a.key).shown)
    .slice(0, SESSION_SIZE)
  if (!queue.length) return notify("Chưa có từ cần ôn", "Bạn đã ôn hết các từ đến hạn. Quay lại sau nhé!")
  let done = 0
  let remembered = 0
  for (const word of queue) {
    const ask = new Alert()
    ask.title = heading(word)
    ask.message = `Từ ${done + 1}/${queue.length}. Bạn còn nhớ nghĩa của từ này không?`
    ask.addAction("Xem nghĩa")
    ask.addCancelAction("Dừng")
    if (await ask.presentAlert() === -1) break
    const answer = new Alert()
    answer.title = heading(word)
    answer.message = details(word)
    answer.addAction("✅ Nhớ")
    answer.addDestructiveAction("❌ Quên")
    answer.addCancelAction("Dừng")
    const choice = await answer.presentAlert()
    if (choice === -1) break
    grade(word, choice === 0)
    done++
    if (choice === 0) remembered++
  }
  if (done) await notify("Xong lượt ôn", `Nhớ ${remembered}/${done} từ. Tiến độ chung: ${stats().percent}%`)
}

async function addWord() {
  const a = new Alert()
  a.title = "Thêm từ mới"
  a.message = "Cần nhập ít nhất từ và nghĩa."
  const fields = ["Từ (vd: ostensibly)", "Loại từ (vd: adv.)", "Nghĩa (vd: được cho là)", "Giải thích", "Câu ví dụ"]
  fields.forEach(f => a.addTextField(f))
  a.addAction("Lưu")
  a.addCancelAction("Hủy")
  if (await a.presentAlert() === -1) return
  const row = fields.map((_, i) => a.textFieldValue(i).trim())
  if (!row[0] || !row[2]) return notify("Chưa lưu", "Cần nhập ít nhất từ và nghĩa.")
  const key = row[0].toLowerCase()
  state.custom = state.custom.filter(r => String(r[0]).trim().toLowerCase() !== key)
  state.custom.push(row)
  saveState()
  words = loadWords()
  await notify("Đã thêm", `${heading(words.find(x => x.key === key))}: ${row[2]}`)
}

async function listWords() {
  const table = new UITable()
  table.showSeparators = true
  const fill = () => {
    table.removeAllRows()
    const s = stats()
    const header = new UITableRow()
    header.isHeader = true
    header.addText(`${s.total} từ · đã thuộc ${s.learned} · tiến độ ${s.percent}%`)
    table.addRow(header)
    for (const word of words) {
      const row = new UITableRow()
      row.height = 64
      row.dismissOnSelect = false
      const cell = row.addText(word.w + (word.custom ? " ✎" : ""), `${word.vi} · ${status(word)}`)
      cell.subtitleColor = Color.gray()
      row.onSelect = async () => {
        await wordActions(word)
        fill()
        table.reload()
      }
      table.addRow(row)
    }
  }
  fill()
  await table.present()
}

async function wordActions(word) {
  const a = new Alert()
  a.title = heading(word)
  a.message = `${details(word)}\n\n${status(word)}`
  a.addAction("✅ Nhớ rồi")
  a.addAction("❌ Chưa nhớ")
  if (word.custom) a.addDestructiveAction("🗑 Xóa từ này")
  a.addCancelAction("Đóng")
  const choice = await a.presentAlert()
  if (choice === 0 || choice === 1) grade(word, choice === 0)
  if (choice === 2) deleteWord(word)
}

function deleteWord(word) {
  state.custom = state.custom.filter(r => String(r[0]).trim().toLowerCase() !== word.key)
  delete state.cards[word.key]
  if (state.current === word.key) delete state.current
  saveState()
  words = loadWords()
}

async function showStats() {
  const s = stats()
  const a = new Alert()
  a.title = `Tiến độ ${s.percent}%`
  a.message = [
    `Tổng số từ: ${s.total}`,
    `Đã thuộc: ${s.learned}`,
    `Đang học: ${s.learning}`,
    `Chưa học: ${s.fresh}`,
    `Cần ôn lại: ${s.due}`,
  ].join("\n")
  a.addAction(`📚 Ôn tập ${SESSION_SIZE} từ`)
  a.addDestructiveAction("Đặt lại tiến độ")
  a.addCancelAction("Đóng")
  const choice = await a.presentAlert()
  if (choice === 0) await reviewSession()
  if (choice === 1) {
    const confirm = new Alert()
    confirm.title = "Đặt lại tiến độ?"
    confirm.message = "Mọi mức nhớ sẽ về 0. Các từ bạn tự thêm vẫn được giữ."
    confirm.addDestructiveAction("Đặt lại")
    confirm.addCancelAction("Hủy")
    if (await confirm.presentAlert() === 0) {
      state.cards = {}
      saveState()
    }
  }
}

async function previewWidget() {
  const options = [
    ["Màn hình khóa: từ vựng", "accessoryRectangular", "", "presentAccessoryRectangular"],
    ["Màn hình khóa: tiến độ", "accessoryRectangular", "tiendo", "presentAccessoryRectangular"],
    ["Màn hình khóa: vòng tròn", "accessoryCircular", "", "presentAccessoryCircular"],
    ["Màn hình chính: cỡ nhỏ", "small", "", "presentSmall"],
    ["Màn hình chính: cỡ vừa", "medium", "", "presentMedium"],
  ]
  const a = new Alert()
  a.title = "Xem trước widget"
  options.forEach(o => a.addAction(o[0]))
  a.addCancelAction("Hủy")
  const choice = await a.presentSheet()
  if (choice === -1) return
  const [, family, param, method] = options[choice]
  const widget = buildWidget(family, param, false)
  if (typeof widget[method] === "function") await widget[method]()
  else await widget.presentSmall()
}

async function notify(title, message) {
  const a = new Alert()
  a.title = title
  a.message = message
  a.addAction("OK")
  await a.presentAlert()
}
