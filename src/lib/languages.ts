export type LanguageId = "fa" | "ckb" | "ar" | "en" | "es" | "tr";

export interface LanguageCopy {
  chooseLanguage: string;
  continue: string;
  phoneTitle: string;
  phoneHint: string;
  sendCode: string;
  changeLanguage: string;
  invalidPhone: string;
  practiceCode: string;
  previewNote: string;
}

export interface Language {
  id: LanguageId;
  nativeName: string;
  englishName: string;
  dir: "rtl" | "ltr";
  image: string;
  sceneCaption: string;
  copy: LanguageCopy;
}

/** Order comes from the brief: Persian, Kurdish (Sorani), Arabic, English, Spanish, Turkish. */
export const LANGUAGES: Language[] = [
  {
    id: "fa",
    nativeName: "فارسی",
    englishName: "Persian",
    dir: "rtl",
    image: "/illustrations/fa.svg",
    sceneCaption: "Isfahan-inspired square at sunset",
    copy: {
      chooseLanguage: "زبان خود را انتخاب کنید",
      continue: "ادامه",
      phoneTitle: "شماره موبایل خود را وارد کنید",
      phoneHint: "یک کد شش رقمی برای شما فرستاده می‌شود.",
      sendCode: "ارسال کد",
      changeLanguage: "تغییر زبان",
      invalidPhone: "شماره موبایل معتبر نیست.",
      practiceCode: "کد تمرینی",
      previewNote: "پیش‌نمایش — پیامک وصل نیست.",
    },
  },
  {
    id: "ckb",
    nativeName: "کوردی",
    englishName: "Kurdish (Sorani)",
    dir: "rtl",
    image: "/illustrations/ckb.svg",
    sceneCaption: "Stepped mountain village in the Zagros",
    copy: {
      chooseLanguage: "زمانەکەت هەڵبژێرە",
      continue: "بەردەوام بە",
      phoneTitle: "ژمارەی مۆبایلەکەت بنووسە",
      phoneHint: "کۆدێکی شەش ژمارەیی بۆت دەنێردرێت.",
      sendCode: "ناردنی کۆد",
      changeLanguage: "گۆڕینی زمان",
      invalidPhone: "ژمارەی مۆبایل دروست نییە.",
      practiceCode: "کۆدی ڕاهێنان",
      previewNote: "پێشاندان — SMS نەبەستراوە.",
    },
  },
  {
    id: "ar",
    nativeName: "العربية",
    englishName: "Arabic",
    dir: "rtl",
    image: "/illustrations/ar.svg",
    sceneCaption: "Old desert town at twilight",
    copy: {
      chooseLanguage: "اختر لغتك",
      continue: "متابعة",
      phoneTitle: "أدخل رقم هاتفك المحمول",
      phoneHint: "سنرسل إليك رمزًا من ستة أرقام.",
      sendCode: "إرسال الرمز",
      changeLanguage: "تغيير اللغة",
      invalidPhone: "رقم الهاتف غير صالح.",
      practiceCode: "رمز تجريبي",
      previewNote: "معاينة — الرسائل النصية غير متصلة.",
    },
  },
  {
    id: "en",
    nativeName: "English",
    englishName: "English",
    dir: "ltr",
    image: "/illustrations/en.svg",
    sceneCaption: "London-inspired riverside",
    copy: {
      chooseLanguage: "Choose your language",
      continue: "Continue",
      phoneTitle: "Enter your mobile number",
      phoneHint: "We will send you a six-digit code.",
      sendCode: "Send code",
      changeLanguage: "Change language",
      invalidPhone: "That mobile number does not look right.",
      practiceCode: "Practice code",
      previewNote: "Preview — SMS is not connected.",
    },
  },
  {
    id: "es",
    nativeName: "Español",
    englishName: "Spanish",
    dir: "ltr",
    image: "/illustrations/es.svg",
    sceneCaption: "Andalusian hill town",
    copy: {
      chooseLanguage: "Elige tu idioma",
      continue: "Continuar",
      phoneTitle: "Introduce tu número de móvil",
      phoneHint: "Te enviaremos un código de seis dígitos.",
      sendCode: "Enviar código",
      changeLanguage: "Cambiar idioma",
      invalidPhone: "Ese número de móvil no es válido.",
      practiceCode: "Código de práctica",
      previewNote: "Vista previa: los SMS no están conectados.",
    },
  },
  {
    id: "tr",
    nativeName: "Türkçe",
    englishName: "Turkish",
    dir: "ltr",
    image: "/illustrations/tr.svg",
    sceneCaption: "Istanbul-inspired skyline over the Bosphorus",
    copy: {
      chooseLanguage: "Dilinizi seçin",
      continue: "Devam et",
      phoneTitle: "Cep telefonu numaranızı girin",
      phoneHint: "Size altı haneli bir kod göndereceğiz.",
      sendCode: "Kod gönder",
      changeLanguage: "Dili değiştir",
      invalidPhone: "Bu cep telefonu numarası geçerli değil.",
      practiceCode: "Deneme kodu",
      previewNote: "Önizleme: SMS bağlı değil.",
    },
  },
];

export function getLanguage(id: LanguageId): Language {
  return LANGUAGES.find((language) => language.id === id) ?? LANGUAGES[0];
}

export const CONSTRUCTION_FRAMES = [
  { src: "/illustrations/construction-0.svg", title: "Survey" },
  { src: "/illustrations/construction-1.svg", title: "Foundation" },
  { src: "/illustrations/construction-2.svg", title: "Frame" },
  { src: "/illustrations/construction-3.svg", title: "Floors" },
  { src: "/illustrations/construction-4.svg", title: "Facade" },
  { src: "/illustrations/construction-5.svg", title: "Landup" },
];

export const CONSTRUCTION_BACKGROUND = CONSTRUCTION_FRAMES[CONSTRUCTION_FRAMES.length - 1].src;
